const {users, orders} = require("./queries/index");

const ObjectsToCsv = require('objects-to-csv');

const usersCSV = async () => {
  const _users = await users.getAllUsers();
  const usersArr = [];
  _users.map((user) => {
    usersArr.push({
      id: user.id,
      firstName: user.first_name,
      email: user.email,
    });
  });
  const csv = new ObjectsToCsv(usersArr);
  await csv.toDisk('./expect/expectedResult1.csv');
};

const orderCSV = async () => {
  const _orders = await orders.getAllOrders();
  const ordersArr = [];
  _orders.map((order) => {
    ordersArr.push({
      id: order.id,
      paymentMethod: order.payment_method,
      kitchenNotes: order.kitchen_notes,
    });
  });

  const csv = new ObjectsToCsv(ordersArr);
  await csv.toDisk('./expect/expectedResult2.csv');
};

module.exports = {
  usersCSV,
  orderCSV,
};
