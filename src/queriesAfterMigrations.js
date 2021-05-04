const csv = require('csv-parser');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const logs = require('./logger');
const {users, orders} = require('./queries/index');

const orderByUsers = async () => {
    const data = await users.getAllUsers();

    const realData = [];

    data.map((user) => {
        realData.push({
            id: String(user.id),
            firstName: user.first_name,
            email: user.email,
            role: user.role,
        });
    });

    const userCsv = new ObjectsToCsv(realData);
    await userCsv.toDisk('./result/queryResult1.csv');

    const expectedResult = [];
    const finalResult = [];

    fs.createReadStream('./expect/expectedResult1.csv')
        .pipe(csv())
        .on('data', (data) => expectedResult.push(data))
        .on('end', () => {
            let total = 0;
            let correct = 0;
            let failed = 0;
            expectedResult.map((expect) => {
                realData.map((real) => {
                    if (expect.id !== real.id) return;
                    finalResult.push(real);
                    finalResult.push(expect);
                    total++;
                    if (
                        expect.firstName === real.firstName &&
                        expect.email === real.email
                    ) {
                        finalResult.push({
                            id: 'test_result',
                            firstName: 'correct',
                            email: 'commit',
                        });
                        correct++;
                    } else {
                        finalResult.push({
                            id: 'test_result',
                            firstName: 'failed',
                            email: 'rollback',
                        });
                        failed++;
                    }
                });
            });
            const csv = new ObjectsToCsv(finalResult);
            csv.toDisk('./result/finalUserResult.csv');
            logs.writeLogs('./result/userLogs.txt', total, correct, failed);
        });
};

const selectOrder = async () => {
    const data = await orders.getAllOrders();

    const realData = [];

    data.map((order) => {
        realData.push({
            id: String(order.id),
            paymentMethod: order.payment_method,
            kitchenNotes: order.kitchen_notes,
            tableId: order.table_id
        });
    });

    const orderCsv = new ObjectsToCsv(realData);
    await orderCsv.toDisk('./result/queryResult2.csv');

    const expectedResult = [];
    const finalResult = [];

    fs.createReadStream('./expect/expectedResult2.csv')
        .pipe(csv())
        .on('data', (data) => expectedResult.push(data))
        .on('end', () => {
            let total = 0;
            let correct = 0;
            let failed = 0;
            expectedResult.map((expect) => {
                realData.map((real) => {
                    if (expect.id !== real.id) return;
                    finalResult.push(real);
                    finalResult.push(expect);
                    total++;
                    if (
                        expect.kitchenNotes === real.kitchenNotes &&
                        expect.paymentMethod === real.paymentMethod
                    ) {
                        finalResult.push({
                            id: 'test_result',
                            paymentMethod: 'correct',
                            kitchenNotes: 'commit',
                        });
                        correct++;
                    } else {
                        finalResult.push({
                            id: 'test_result',
                            paymentMethod: 'failed',
                            kitchenNotes: 'rollback',
                        });
                        failed++;
                    }
                });
            });
            const csv = new ObjectsToCsv(finalResult);
            csv.toDisk('./result/finalOrderResult.csv');
            logs.writeLogs('./result/orderLogs.txt', total, correct, failed);
        });
};

module.exports = {
    orderByUsers,
    selectOrder,
};
