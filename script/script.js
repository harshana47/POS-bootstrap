// Add item part
let item_array = [];

const updateTable = () => {
    $("#item_table_body").empty();
    item_array.forEach((item) => {
        let data = `<tr>
                        <td>${item.id}</td>
                        <td>${item.product}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity}</td>
                    </tr>`;
        $("#item_table_body").append(data);
    });
};

$("#item_add_button").on("click", function () {
    let product = $("#product").val();
    let price = parseFloat($("#pPrice").val());
    let quantity = parseInt($("#pQuantity").val());

    if (!product || isNaN(price) || isNaN(quantity) || quantity <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    let item = {
        id: item_array.length + 1,
        product: product,
        price: price,
        quantity: quantity
    };

    item_array.push(item);
    updateTable();
    $("#addItemForm")[0].reset(); // Reset the add item form
});

// Add customer part
let customer_array = [];

const loadCustomerTable = () => {
    $("#customer_table_body").empty();
    customer_array.forEach((customer) => {
        let data = `<tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.contact}</td>
                    </tr>`;
        $("#customer_table_body").append(data);
    });
};

$("#customer_add_button").on("click", function () {
    let name = $("#cName").val();
    let address = $("#cAddress").val();
    let contact = $("#cContact").val();

    if (!name || !address || !contact) {
        alert("Please enter valid customer details.");
        return;
    }

    let customer = {
        id: customer_array.length + 1,
        name: name,
        address: address,
        contact: contact
    };

    customer_array.push(customer);
    loadCustomerTable();
    $("#addCustomerForm")[0].reset(); // Reset the add customer form
});

// Order part
let order_array = [];

const loadOrderTable = () => {
    $("#cashier_tbody").empty();
    order_array.forEach((order) => {
        let customer = customer_array.find(c => c.id === order.customer_id);
        let item = item_array.find(i => i.id === order.item_id);

        if (customer && item) {
            let data = `<tr>
                            <td>${order.id}</td>
                            <td>${customer.name}</td>
                            <td>${item.product}</td>
                            <td>${order.quantity}</td>
                            <td>${order.total_price.toFixed(2)}</td>
                        </tr>`;
            $("#cashier_tbody").append(data);
        }
    });
};

$("#order_add_button").on("click", function () {
    let customer_id = parseInt($("#oCustomer").val());
    let item_id = parseInt($("#oProduct").val());
    let quantity = parseInt($("#oQuantity").val());

    // Validate inputs
    if (isNaN(customer_id) || isNaN(item_id) || isNaN(quantity) || quantity <= 0) {
        alert("Please enter valid order details.");
        return;
    }

    let customer = customer_array.find(c => c.id === customer_id);
    if (!customer) {
        alert("Customer not found.");
        return;
    }

    let item = item_array.find(i => i.id === item_id);
    if (!item) {
        alert("Item not found.");
        return;
    }

    let total_price = item.price * quantity;

    let order = {
        id: order_array.length + 1,
        customer_id: customer_id,
        item_id: item_id,
        quantity: quantity,
        total_price: total_price
    };

    order_array.push(order);
    loadOrderTable();

    // Reset individual fields
    $("#oCustomer").val('');
    $("#oProduct").val('');
    $("#oQuantity").val('');
});