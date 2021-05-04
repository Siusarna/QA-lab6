const help = require('./expect');
const {users, orders} = require('./queries/index');
const queriesAfter = require('./queriesAfterMigrations');
const {runMigration} = require('./runMigration');
const now = Date.now();
(async () => {
    await users.insertUser({
        email: `test-email-1-${now}@test-domain.com`,
        firstName: `Test-1-${now}`,
        lastName: `Test-1-${now}`,
        role: 'admin'
    })
    await users.insertUser({
        email: `test-email-2-${now}@test-domain.com`,
        firstName: `Test-2-${now}`,
        lastName: `Test-2-${now}`,
        role: 'admin'
    })
    await orders.insertOrder({
        tableId: 5,
        paymentMethod: 'online',
        cart: {dish: 5},
        kitchenNotes: 'test-migration',
        paid: 10
    })
    await orders.insertOrder({
        tableId: 6,
        paymentMethod: 'online',
        cart: {dish: 2},
        kitchenNotes: 'test-migration',
        paid: 30
    })
    await help.usersCSV();
    await help.orderCSV();

    await runMigration();

    await queriesAfter.orderByUsers();
    await queriesAfter.selectOrder();

    await users.clearUser();
    await orders.clearOrder();
})()