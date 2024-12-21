import {customer_array, history_array, item_array, order_array} from "../db/database.js";
import OrderModel from "../models/orderModel.js";

let dailyIncome = 0;
let customerCount = 0;

const loadOrderTable = () => {
    $("#cashier_tbody").empty();

    order_array.forEach((order) => {
        let item = item_array.find(i => i.id === order.item_id);

        if (item) {
            let data = `<tr>
                            <td>${order.id}</td>
                            <td>${item.product}</td>
                            <td>${order.quantity}</td>
                            <td>${order.total_price.toFixed(2)}</td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-order" data-id="${order.id}">Delete</button>
                            </td>
                        </tr>`;
            $("#cashier_tbody").append(data);
        }
    });
};

const loadHistoryTable = () => {
    $("#history_tbody").empty();
    history_array.forEach((order) => {
        let item = item_array.find(i => i.id === order.item_id);
        let customer = customer_array.find(c => c.id === order.customer_id);
        if (item && customer) {
            let data = `<tr>
                            <td>${order.id}</td>
                            <td>${customer.name}</td>
                            <td>${new Date().toISOString().slice(0, 10)}</td>
                            <td>${item.product}</td>
                            <td>${order.quantity}</td>
                            <td>${order.total_price.toFixed(2)}</td>
                        </tr>`;
            $("#history_tbody").append(data);
        }
    });
};

// customer search and order
$("#oCustomer").on("keypress", function (e) {
    if (e.which === 13) {
        let customer_contact = $(this).val();

        // find  customer by contact
        let customer = customer_array.find(c => c.contact === customer_contact);
        if (customer) {
            $("#oCustomerName").val(customer.name);
        } else {
            alert("Customer not found.");
            $("#oCustomerName").val('');
        }
    }
});

let selected_order_index = null;

// log order row data on click by index
$('#cashier_tbody').on("click", "tr", function () {
    let index = $(this).index();
    let order = order_array[index];
    console.log(`Order ID: ${order.id}, Customer: ${order.customer_id}, Product: ${order.item_id}, Quantity: ${order.quantity}, Price: ${order.total_price}`);

    selected_order_index = $(this).index();

    let customer = order.customer_id;
    let product = order.item_id;
    let quantity = order.quantity;
    let price = order.total_price;

    $('#oCustomerId').val(customer);
    $('#oProductId').val(product);
    $('#oQuantity').val(quantity);
    $('#oPrice').val(price);

});

// delete order functionality
$(document).on("click", ".delete-order", function () {
    let orderId = $(this).data("id");
    order_array.splice(selected_order_index, 1);
    loadOrderTable();
});

//for History
$("#customerSearchButtonHistory").on("click", function () {
    let searchTerm = $("#customerSearchInputHistory").val().toLowerCase().trim();

    // clear the history table body
    $("#history_tbody").empty();

    let foundOrders = order_array.filter(order => {
        let customer = customer_array.find(c => c.id === order.customer_id);
        return customer && customer.name.toLowerCase().includes(searchTerm);
    });

    if (foundOrders.length > 0) {
        foundOrders.forEach(order => {
            let item = item_array.find(i => i.id === order.item_id);
            let customer = customer_array.find(c => c.id === order.customer_id);
            if (item && customer) {
                let data = `<tr>
                                <td>${order.id}</td>
                                <td>${customer.name}</td>
                                <td>${new Date().toISOString().slice(0, 10)}</td>
                                <td>${item.product}</td>
                                <td>${order.quantity}</td>
                                <td>${order.total_price.toFixed(2)}</td>
                            </tr>`;
                $("#history_tbody").append(data);
            }
        });
    } else {
        $("#history_tbody").append('<tr><td colspan="6">No orders found for this customer.</td></tr>');
    }

    // clear the input field after search
    $("#customerSearchInput").val('');
});

$("#viewAllOrders").on("click", function (e) {
    loadHistoryTable();
})

$("#order_add_button").on("click", function () {
    let customer_contact = $("#oCustomer").val();
    let item_id = parseInt($("#oProduct").val());
    let quantity = parseInt($("#oQuantity").val());

    if (!customer_contact || isNaN(item_id) || isNaN(quantity) || quantity <= 0) {
        alert("Please enter valid order details.");
        return;
    }

    // find the customer by contact
    let customer = customer_array.find(c => c.contact === customer_contact);
    if (!customer) {
        alert("Customer not found.");
        return;
    }

    let customer_id = customer.id;

    // find the item
    let item = item_array.find(i => i.id === item_id);
    if (!item) {
        alert("Item not found.");
        return;
    }
    if (item.quantity < quantity) {
        alert("Not enough stock available.");
        return;
    }

    let total_price = item.price * quantity;

    item.quantity -= quantity;

    // Check item already exists
    let existingOrderIndex = order_array.findIndex(order => order.item_id === item_id && order.customer_id === customer_id);

    if (existingOrderIndex !== -1) {
        let existingOrder = order_array[existingOrderIndex];
        existingOrder.quantity += quantity;
        existingOrder.total_price = existingOrder.quantity * item.price;

        history_array[existingOrderIndex].quantity = existingOrder.quantity;
        history_array[existingOrderIndex].total_price = existingOrder.total_price;

    } else {
        // If item does not exist, create a new order
        let order = new OrderModel(
            order_array.length + 1,
            customer_id,
            item_id,
            quantity,
            total_price
        );
        order_array.push(order);
        history_array.push(order);
    }

    dailyIncome += total_price;
    loadOrderTable();
    loadHistoryTable();
    updateIncomeDisplay();
    loadItemTable()

    $("#oProduct").val('');
    $("#oQuantity").val('');
});

const loadItemTable = () => {
    $("#item_table_body").empty();
    item_array.forEach((item) => {
        let data = `<tr>
                        <td>${item.id}</td>
                        <td>${item.product}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-item" data-id="${item.id}">Delete</button>
                        </td>
                    </tr>`;
        $("#item_table_body").append(data);
    });
};


// update income and customer count
const updateIncomeDisplay = () => {
    $("#income").text(`$${dailyIncome.toFixed(2)}`);
    $("#customerCount").text(`${customerCount}`);
};

//checkout
$("#show_invoice_btn").on("click", function () {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            const currentDate = new Date();
            const date = currentDate.toLocaleDateString();
            const time = currentDate.toLocaleTimeString();

            const itemCount = document.querySelectorAll('#cashier_tbody tr').length;
            const customerName = document.getElementById('oCustomerName').value || "Not specified";
            const subtotal = calculateSubtotal();
            customerCount +=1;
            printInvoice()


            $("#cashier_tbody").empty();
            order_array.length = 0;

            order_array = [];

        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

function printInvoice() {
    let orderItems = [];
    let totalAmount = 0;

    const itemsTable = document.getElementById("cashier_tbody").children;

    for (let i = 0; i < itemsTable.length; i++) {
        let row = itemsTable[i];

        let itemName = row.cells[0].innerText;
        let qty = row.cells[1].innerText;
        let price = row.cells[2].innerText;
        let total = row.cells[3].innerText;

        orderItems.push({ itemName, qty, price, total });
        totalAmount += parseFloat(total);
    }

    let currentDateTime = new Date();
    let formattedDate = currentDateTime.toLocaleDateString();
    let formattedTime = currentDateTime.toLocaleTimeString();

    //bill content
    let billContent = `
        <h2>Invoice</h2>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Customer:</strong> ${document.getElementById('oCustomerName').value}</p>
        <p><strong>Item Count:</strong> ${itemsTable.length}</p>
        <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`;

    // Add items to the bill
    orderItems.forEach(item => {
        billContent += `
            <tr>
                <td>${item.itemName}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
            </tr>`;
    });

    billContent += `
        </tbody>
        </table>
        <h3 style="margin-top: 20px;">Total Amount: Rs.${totalAmount.toFixed(2)}</h3>
    `;

    // new window and print bill
    let printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Invoice</title></head><body>');
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print(); // Trigger the print dialog
}

function calculateSubtotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#cashier_tbody tr');
    rows.forEach(row => {
        const price = parseFloat(row.cells[3].textContent);
        const quantity = parseInt(row.cells[2].textContent);
        subtotal += price ;
    });
    return subtotal;
}

// Log customer row data on click
$('#cashier_tbody').on('click' , 'tr', function (e) {
    let index = $(this).index();
    let order = order_array[index];
    console.log(`Order ID: ${order.id}, Product: ${order.product}, Quantity: ${order.quantity}, Price: ${order.total_price}`);
})