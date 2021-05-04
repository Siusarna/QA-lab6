const {getInsertClauses} = require("../db/typeMapping");
const {query} = require("../db/query");

const orderProps = {
    id: { source: 'Order' },
    kitchenNotes: { dbAlias: 'kitchen_notes', source: 'Order' },
    paymentMethod: { dbAlias: 'payment_method', source: 'Order' },
    paid: { dbAlias: 'paid', source: 'Order' },
    tableId: { dbAlias: 'table_id', source: 'Order' },
    cart: { source: 'Order', json: true },
    status: { source: 'Order' },
    stripePaymentIntentId: { dbAlias: 'stripe_payment_intent_id', source: 'Order' }
};

const getAllOrders = async () => {
    return (await query(`SELECT * FROM "Order" where kitchen_notes = 'test-migration' limit 20`)).rows;
}

const insertOrder = async (order) => {
    const [props, values, valueIdxs] = getInsertClauses(order, orderProps);
    return (await query(`INSERT INTO "Order"(${props}) VALUES (${valueIdxs})`, values)).rows[0];
}

const clearOrder = async () => {
    return (await query(`DELETE FROM "Order" where kitchen_notes = 'test-migration'`)).rows;
}

module.exports = {
    getAllOrders,
    insertOrder,
    clearOrder,
}