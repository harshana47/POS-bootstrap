// import CustomerModel from "../models/customerModel.js";
// import ProductModel from "../models/itemModel.js";
// import OrderModel from "../models/orderModel.js";

// Add item part

// let item_array = [];
// let order_array = [];
// let history_array = [];
// let customer_array = [];

// import {customer_array ,item_array,order_array,history_array} from "../db/database.js";

// const updateTable = () => {
//     $("#item_table_body").empty();
//     item_array.forEach((item) => {
//         let data = `<tr>
//                         <td>${item.id}</td>
//                         <td>${item.product}</td>
//                         <td>${item.price}</td>
//                         <td>${item.quantity}</td>
//                         <td>
//                             <button class="btn btn-danger btn-sm delete-item" data-id="${item.id}">Delete</button>
//                         </td>
//                     </tr>`;
//         $("#item_table_body").append(data);
//     });
// };
//
// $("#item_add_button").on("click", function () {
//     let product = $("#product").val();
//     let price = parseFloat($("#pPrice").val());
//     let quantity = parseInt($("#pQuantity").val());
//
//     if (!product || isNaN(price) || isNaN(quantity) || quantity <= 0) {
//         alert("Please enter valid product details.");
//         return;
//     }
//
//     // let item = {
//     //     id: item_array.length + 1,
//     //     product: product,
//     //     price: price,
//     //     quantity: quantity
//     // };
//
//     let item = new ProductModel(
//         item_array.length + 1,
//         product,
//         price,
//         quantity
//     );
//
//     Swal.fire({
//         title: "Do you want to save the changes?",
//         showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: "Save",
//         denyButtonText: `Don't save`
//     }).then((result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {
//             Swal.fire("Saved!", "", "success");
//             item_array.push(item);
//             updateTable();
//             // Clear fields
//             cleanProductForm()
//         } else if (result.isDenied) {
//             Swal.fire("Changes are not saved", "", "info");
//         }
//     });
// });
//
// // Delete item functionality
// $(document).on("click", ".delete-item", function () {
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//             confirmButton: "btn btn-success",
//             cancelButton: "btn btn-danger"
//         },
//         buttonsStyling: false
//     });
//     swalWithBootstrapButtons.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true
//     }).then((result) => {
//         if (result.isConfirmed) {
//             swalWithBootstrapButtons.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//             });
//             let itemId = $(this).data("id");
//             item_array = item_array.filter(item => item.id !== itemId);
//             updateTable();
//         } else if (
//             /* Read more about handling dismissals below */
//             result.dismiss === Swal.DismissReason.cancel
//         ) {
//             swalWithBootstrapButtons.fire({
//                 title: "Cancelled",
//                 text: "Your imaginary file is safe :)",
//                 icon: "error"
//             });
//         }
//     });
// });
//
// // Item Search
// $("#itemSearchButton").on("click", function () {
//     let searchTerm = $("#itemSearchInput").val().toLowerCase().trim();
//     let foundItems = item_array.filter(item =>
//         item.id.toString() === searchTerm ||
//         item.product.toLowerCase().includes(searchTerm)
//     );
//
//     // Clear the table body and display found items
//     $("#item_table_body").empty();
//     if (foundItems.length > 0) {
//         foundItems.forEach(item => {
//             let data = `<tr>
//                             <td>${item.id}</td>
//                             <td>${item.product}</td>
//                             <td>${item.price}</td>
//                             <td>${item.quantity}</td>
//                             <td>
//                                 <button class="btn btn-danger btn-sm delete-item" data-id="${item.id}">Delete</button>
//                             </td>
//                         </tr>`;
//             $("#item_table_body").append(data);
//         });
//     } else {
//         $("#item_table_body").append('<tr><td colspan="5">No items found.</td></tr>');
//     }
//
//     // Clear the input field after search
//     $("#itemSearchInput").val('');
// });
//
// // View All Items
// $("#viewAllItems").on("click", function () {
//     updateTable();
// });
//
// let selected_item_index = null;
//
// // Log customer row data on click by index
// $('#item_table_body').on("click", "tr", function () {
//     let index = $(this).index();
//     let item = item_array[index];
//     console.log(`Item ID: ${item.id}, product: ${item.product}, Quantity: ${item.quantity},Price: ${item.price}`);
//
//     selected_item_index = $(this).index();
//
//     let product = item.product;
//     let quantity = item.quantity;
//     let price = item.price;
//
//     $('#product').val(product);
//     $('#pPrice').val(price);
//     $('#pQuantity').val(quantity);
//
// });
// //update item
// $("#item_update_btn").on("click", function () {
//     let index = selected_item_index;
//
//     let product = $("#product").val();
//     let quantity = $("#pQuantity").val();
//     let price = $("#pPrice").val();
//
//     if (!product || !quantity || !price) {
//         alert("Please enter valid Product details.");
//         return;
//     }
//
//     // let item = {
//     //     id: item_array[index].id,
//     //     product: product,
//     //     price: price,
//     //     quantity: quantity
//     // };
//
//     let item = new ProductModel(
//         item_array[index].id,
//         product,
//         price,
//         quantity
//     );
//     Swal.fire({
//         title: "Are you sure?",
//         text: "Do you really want to update!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, update it!"
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire({
//                 title: "Updated!",
//                 text: "Your file has been Updated.",
//                 icon: "success"
//             });
//         }
//         item_array[index] = item;
//         updateTable();
//         // Clear fields
//         cleanProductForm()
//     });
//
// });
// const cleanProductForm = () => {
//     $("#product").val("");
//     $("#pQuantity").val("");
//     $("#pPrice").val("");
// }


// Add customer part


// const loadCustomerTable = () => {
//     $("#customer_table_body").empty();
//     customer_array.forEach((customer) => {
//         let data = `<tr>
//                         <td>${customer.id}</td>
//                         <td>${customer.name}</td>
//                         <td>${customer.address}</td>
//                         <td>${customer.contact}</td>
//                         <td>
//                             <button class="btn btn-danger btn-sm delete-customer" data-id="${customer.id}">Delete</button>
//                         </td>
//                     </tr>`;
//         $("#customer_table_body").append(data);
//     });
// };
//
// $("#customer_add_button").on("click", function () {
//     let name = $("#cName").val();
//     let address = $("#cAddress").val();
//     let contact = $("#cContact").val();
//
//     if (!name) {
//         alert("Please enter customer name.");
//     }else if (!address) {
//         alert("Please enter customer address.");
//     }else if (!contact) {
//         alert("Please enter customer contact.");
//     }else if (!validatePhone(contact)) {
//     alert("Please enter a valid Sri Lankan mobile number.");
//     }else {
//
//         // let customer = {
//         //     id: customer_array.length + 1,
//         //     name: name,
//         //     address: address,
//         //     contact: contact
//         // };
//         let customer = new CustomerModel(
//             customer_array.length+1,
//             name,
//             address,
//             contact
//         );
//         Swal.fire({
//             title: "Do you want to save the changes?",
//             showDenyButton: true,
//             showCancelButton: true,
//             confirmButtonText: "Save",
//             denyButtonText: `Don't save`
//         }).then((result) => {
//             /* Read more about isConfirmed, isDenied below */
//             if (result.isConfirmed) {
//                 Swal.fire("Saved!", "", "success");
//                 customer_array.push(customer);
//                 loadCustomerTable();
//                 // Clear fields
//                 cleanCustomerForm()
//             } else if (result.isDenied) {
//                 Swal.fire("Customer not saved", "", "info");
//             }
//         });
//     }
// });
//
// // Delete customer functionality
// $(document).on("click", ".delete-customer", function () {
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//             confirmButton: "btn btn-success",
//             cancelButton: "btn btn-danger"
//         },
//         buttonsStyling: false
//     });
//     swalWithBootstrapButtons.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true
//     }).then((result) => {
//         if (result.isConfirmed) {
//             swalWithBootstrapButtons.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//             });
//             let customerId = $(this).data("id");
//             customer_array = customer_array.filter(customer => customer.id !== customerId);
//             loadCustomerTable();
//         } else if (
//             /* Read more about handling dismissals below */
//             result.dismiss === Swal.DismissReason.cancel
//         ) {
//             swalWithBootstrapButtons.fire({
//                 title: "Cancelled",
//                 text: "Your imaginary file is safe :)",
//                 icon: "error"
//             });
//         }
//     });
//
// });
//
// // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// //
// const validatePhone = (contact) => {
//     const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
//     return sriLankanMobileRegex.test(contact)
// }
//
// // Customer Search
// $("#customerSearchButton").on("click", function () {
//     let searchTerm = $("#customerSearchInput").val().toLowerCase().trim();
//     let foundCustomers = customer_array.filter(customer =>
//         customer.id.toString() === searchTerm ||
//         customer.name.toLowerCase().includes(searchTerm) ||
//         customer.contact.includes(searchTerm)
//     );
//
//     // Clear the table body and display found customers
//     $("#customer_table_body").empty();
//     if (foundCustomers.length > 0) {
//         foundCustomers.forEach(customer => {
//             let data = `<tr>
//                             <td>${customer.id}</td>
//                             <td>${customer.name}</td>
//                             <td>${customer.address}</td>
//                             <td>${customer.contact}</td>
//                             <td>
//                                 <button class="btn btn-danger btn-sm delete-customer" data-id="${customer.id}">Delete</button>
//                             </td>
//                         </tr>`;
//             $("#customer_table_body").append(data);
//         });
//     } else {
//         $("#customer_table_body").append('<tr><td colspan="5">No customers found.</td></tr>');
//     }
//
//     // Clear the input field after search
//     $("#customerSearchInput").val('');
// });
//
// // View All Customers
// $("#viewAllCustomers").on("click", function () {
//     loadCustomerTable();
// });
//
// let selected_customer_index = null;
//
// // Log customer row data on click by index
// $('#customer_table_body').on("click", "tr", function () {
//     let index = $(this).index();
//     let customer = customer_array[index];
//     console.log(`Customer ID: ${customer.id}, Name: ${customer.name},Address: ${customer.address}, Contact: ${customer.contact}`);
//
//     selected_customer_index = $(this).index();
//
//     let id = customer.id;
//     let name = customer.name;
//     let address = customer.address;
//     let contact = customer.contact;
//
//     $('#cId').val(id);
//     $('#cName').val(name);
//     $('#cAddress').val(address);
//     $('#cContact').val(contact);
// })
//
// //update customer
// $("#customer_update_btn").on("click", function () {
//     let index = selected_customer_index;
//
//     let name = $("#cName").val();
//     let address = $("#cAddress").val();
//     let contact = $("#cContact").val();
//
//     if (!name || !address || !contact) {
//         alert("Please enter valid customer details.");
//         return;
//     }
//     if (!name) {
//         alert("Please enter customer name.");
//     }else if (!address) {
//         alert("Please enter customer address.");
//     }else if (!contact) {
//         alert("Please enter customer contact.");
//     }else if (!validatePhone(contact)) {
//         alert("Please enter a valid Sri Lankan mobile number.");
//     }else {
//         // let customer = {
//         //     id: customer_array[index].id,
//         //     name: name,
//         //     address: address,
//         //     contact: contact
//         // };
//         let customer = new CustomerModel(
//             customer_array[index].id,
//             name,
//             address,
//             contact
//         );
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Do you really want to update!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, update it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 Swal.fire({
//                     title: "Updated!",
//                     text: "Your file has been updated.",
//                     icon: "success"
//                 });
//                 customer_array[index] = customer;
//                 loadCustomerTable();
//                 // Clear fields
//                 cleanCustomerForm()
//             }
//         });
//     }
// });
//
// const cleanCustomerForm = () => {
//     $("#cName").val("");
//     $("#cAddress").val("");
//     $("#cContact").val("");
// }

// Order part

// let dailyIncome = 0;
// let customerCount = 0;
//
// const loadOrderTable = () => {
//     $("#cashier_tbody").empty();
//     order_array.forEach((order) => {
//         let item = item_array.find(i => i.id === order.item_id);
//
//         if (item) {
//             let data = `<tr>
//                             <td>${order.id}</td>
//                             <td>${item.product}</td>
//                             <td>${order.quantity}</td>
//                             <td>${order.total_price.toFixed(2)}</td>
//                             <td>
//                                 <button class="btn btn-danger btn-sm delete-order" data-id="${order.id}">Delete</button>
//                             </td>
//                         </tr>`;
//             $("#cashier_tbody").append(data);
//         }
//     });
// };
//
// const loadHistoryTable = () => {
//     $("#history_tbody").empty();
//     history_array.forEach((order) => {
//         let item = item_array.find(i => i.id === order.item_id);
//         let customer = customer_array.find(c => c.id === order.customer_id);
//         if (item && customer) {
//             let data = `<tr>
//                             <td>${order.id}</td>
//                             <td>${customer.name}</td>
//                             <td>${new Date().toISOString().slice(0, 10)}</td>
//                             <td>${item.product}</td>
//                             <td>${order.quantity}</td>
//                             <td>${order.total_price.toFixed(2)}</td>
//                         </tr>`;
//             $("#history_tbody").append(data);
//         }
//     });
// };
//
// // Delete order functionality
// $(document).on("click", ".delete-order", function () {
//     let orderId = $(this).data("id");
//     order_array = order_array.filter(order => order.id !== orderId);
//     loadOrderTable();
// });
//
// // Customer search and order
// $("#oCustomer").on("keypress", function (e) {
//     if (e.which === 13) { // Check if Enter key is pressed
//         let customer_contact = $(this).val(); // Get the contact input value
//
//         // Find the customer by contact
//         let customer = customer_array.find(c => c.contact === customer_contact);
//         if (customer) {
//             // If customer is found, populate the customer name input
//             $("#oCustomerName").val(customer.name); // Assuming customer has a 'name' property
//         } else {
//             alert("Customer not found.");
//             $("#oCustomerName").val(''); // Clear the name field if not found
//         }
//     }
// });
//
// // Customer Search for History
// $("#customerSearchButtonHistory").on("click", function () {
//     let searchTerm = $("#customerSearchInputHistory").val().toLowerCase().trim();
//
//     // Clear the history table body
//     $("#history_tbody").empty();
//
//     // Find all orders related to the searched customer
//     let foundOrders = order_array.filter(order => {
//         let customer = customer_array.find(c => c.id === order.customer_id);
//         return customer && customer.name.toLowerCase().includes(searchTerm);
//     });
//
//     // Populate the history table with found orders
//     if (foundOrders.length > 0) {
//         foundOrders.forEach(order => {
//             let item = item_array.find(i => i.id === order.item_id);
//             let customer = customer_array.find(c => c.id === order.customer_id);
//             if (item && customer) {
//                 let data = `<tr>
//                                 <td>${order.id}</td>
//                                 <td>${customer.name}</td>
//                                 <td>${new Date().toISOString().slice(0, 10)}</td>
//                                 <td>${item.product}</td>
//                                 <td>${order.quantity}</td>
//                                 <td>${order.total_price.toFixed(2)}</td>
//                             </tr>`;
//                 $("#history_tbody").append(data);
//             }
//         });
//     } else {
//         $("#history_tbody").append('<tr><td colspan="6">No orders found for this customer.</td></tr>');
//     }
//
//     // Clear the input field after search
//     $("#customerSearchInput").val('');
// });
//
// $("#viewAllOrders").on("click", function (e) {
//     loadHistoryTable();
// })
//
// $("#order_add_button").on("click", function () {
//     let customer_contact = $("#oCustomer").val();
//     let item_id = parseInt($("#oProduct").val());
//     let quantity = parseInt($("#oQuantity").val());
//
//     // Validate inputs
//     if (!customer_contact || isNaN(item_id) || isNaN(quantity) || quantity <= 0) {
//         alert("Please enter valid order details.");
//         return;
//     }
//
//     // Find the customer by contact
//     let customer = customer_array.find(c => c.contact === customer_contact);
//     if (!customer) {
//         alert("Customer not found.");
//         return;
//     }
//
//     let customer_id = customer.id;
//
//     // Find the item
//     let item = item_array.find(i => i.id === item_id);
//     if (!item) {
//         alert("Item not found.");
//         return;
//     }
//
//     let total_price = item.price * quantity;
//
//     // let order = {
//     //     id: order_array.length + 1,
//     //     customer_id: customer_id,
//     //     item_id: item_id,
//     //     quantity: quantity,
//     //     total_price: total_price
//     // };
//     let order = new OrderModel(
//         order_array.length + 1,
//         customer_id,
//         item_id,
//         quantity,
//         total_price
//     )
//
//     order_array.push(order);
//     history_array.push(order);
//     dailyIncome += total_price; // Update daily income
//     loadOrderTable();
//     loadHistoryTable(); // Update the history table
//     updateIncomeDisplay();
//
//     // Reset individual fields
//     $("#oProduct").val('');
//     $("#oQuantity").val('');
// });
//
//
// // Function to update income and customer count display
// const updateIncomeDisplay = () => {
//     $("#income").text(`$${dailyIncome.toFixed(2)}`);
//     $("#customerCount").text(`${customerCount}`);
// };
//
// // Show invoice
// $("#show_invoice_btn").on("click", function () {
//     Swal.fire({
//         title: "Do you want to save the changes?",
//         showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: "Save",
//         denyButtonText: `Don't save`
//     }).then((result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {
//             Swal.fire("Saved!", "", "success");
//             const currentDate = new Date();
//             const date = currentDate.toLocaleDateString();
//             const time = currentDate.toLocaleTimeString();
//
//             const itemCount = document.querySelectorAll('#cashier_tbody tr').length;
//             const customerName = document.getElementById('oCustomerName').value || "Not specified";
//             const subtotal = calculateSubtotal();
//
//             $("#cashier_tbody").empty();
//
//             order_array = [];
//             order_array.clear;
//
//             document.querySelector('#invoice h6:nth-of-type(1)').textContent = `Date: ${date}`;
//             document.querySelector('#invoice h6:nth-of-type(2)').textContent = `Time: ${time}`;
//             document.querySelector('#invoice h6:nth-of-type(3)').textContent = `Item Count: ${itemCount}`;
//             document.querySelector('#invoice h6:nth-of-type(4)').textContent = `Customer: ${customerName}`;
//             document.querySelector('#invoice h6:nth-of-type(5)').textContent = `Sub Total: $${subtotal.toFixed(2)}`;
//             document.querySelector('#invoice h6:nth-of-type(6)').textContent = `Daily Income: $${dailyIncome.toFixed(2)}`;
//             document.querySelector('#invoice h6:nth-of-type(7)').textContent = `Customer Count: ${customerCount}`;
//
//             document.getElementById('invoice').classList.remove('hidden');
//         } else if (result.isDenied) {
//             Swal.fire("Changes are not saved", "", "info");
//         }
//     });
// });
//
// // Done button functionality
// $("#done").on("click", function () {
//     // Clear invoice fields
//     document.querySelector('#invoice h6:nth-of-type(1)').textContent = '';
//     document.querySelector('#invoice h6:nth-of-type(2)').textContent = '';
//     document.querySelector('#invoice h6:nth-of-type(3)').textContent = '';
//     document.querySelector('#invoice h6:nth-of-type(4)').textContent = '';
//     document.querySelector('#invoice h6:nth-of-type(5)').textContent = '';
//     document.querySelector('#invoice h6:nth-of-type(6)').textContent = '';
//     document.querySelector('#invoice h6:nth-of-type(7)').textContent = '';
//
//     // Hide the invoice display
//     document.getElementById('invoice').classList.add('hidden');
// });
//
//
// function calculateSubtotal() {
//     let subtotal = 0;
//     const rows = document.querySelectorAll('#cashier_tbody tr');
//     rows.forEach(row => {
//         const price = parseFloat(row.cells[3].textContent);
//         const quantity = parseInt(row.cells[2].textContent);
//         subtotal += price ;
//     });
//     return subtotal;
// }
//
// // Log customer row data on click
// $('#cashier_tbody').on('click' , 'tr', function (e) {
//     let index = $(this).index();
//     let order = order_array[index];
//     console.log(`Order ID: ${order.id}, Product: ${order.product}, Quantity: ${order.quantity}, Price: ${order.total_price}`);
// })


