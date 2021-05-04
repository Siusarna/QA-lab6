const {getInsertClauses} = require("../db/typeMapping");

const {query} = require("../db/query");

const userProps = {
    email: {},
    firstName: { dbAlias: 'first_name' },
    lastName: { dbAlias: 'last_name' },
    role: {},
    password: {},
    salt: {},
};

const getAllUsers = async () => {
    return (await query(`SELECT * FROM "User" where email like '%test-email-%' order by email limit 20`)).rows;
}

const insertUser = async (user) => {
    const [props, values, valueIdxs] = getInsertClauses(user, userProps);
    return (await query(`INSERT INTO "User"(${props}) VALUES (${valueIdxs})`, values)).rows[0];
}

const clearUser = async () => {
    return (await query(`DELETE FROM "User" where email like '%test-email-%'`)).rows;
}

module.exports = {
    getAllUsers,
    insertUser,
    clearUser,
}