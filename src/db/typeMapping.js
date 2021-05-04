"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateClauses = exports.getInsertClauses = exports.getSelectClause = void 0;
const OFFSET = ' ';
function getSelectClause(propInfo) {
    return Object.entries(propInfo)
        .map(([property, { json, source, dbAlias = property }]) => {
            if (!json && !source) {
                return `${OFFSET}${dbAlias} as "${property}"`;
            }
            const path = source ? `${source}.${dbAlias}` : dbAlias;
            const dbProp = json ? `to_json(${path})` : path;
            return `${OFFSET}${dbProp} as "${property}"`;
        })
        .join(',\n');
}
exports.getSelectClause = getSelectClause;
function getInsertClauses(entry, propInfo) {
    const keys = Object
        .keys(propInfo)
        .filter((prop) => Object.prototype.hasOwnProperty.call(entry, prop));
    const props = keys
        .map((prop) => { var _a; return ((_a = propInfo[prop].dbAlias) !== null && _a !== void 0 ? _a : prop); })
        .join(', ');
    const values = keys.map((key) => {
        var _a, _b;
        const { json } = propInfo[key];
        const serialize = (_a = propInfo[key].serialize) !== null && _a !== void 0 ? _a : (json ? JSON.stringify : undefined);
        return (_b = serialize === null || serialize === void 0 ? void 0 : serialize(entry[key])) !== null && _b !== void 0 ? _b : entry[key];
    });
    const valueIdxs = keys.map((_, idx) => `$${idx + 1}`).join(', ');
    return [props, values, valueIdxs];
}
exports.getInsertClauses = getInsertClauses;
function getUpdateClauses(entry, propInfo) {
    const keys = Object
        .keys(propInfo)
        .filter((prop) => Object.prototype.hasOwnProperty.call(entry, prop));
    const props = keys
        .map((prop) => { var _a; return ((_a = propInfo[prop].dbAlias) !== null && _a !== void 0 ? _a : prop); });
    const values = keys.map((key) => {
        var _a, _b;
        const { json } = propInfo[key];
        const serialize = (_a = propInfo[key].serialize) !== null && _a !== void 0 ? _a : (json ? JSON.stringify : undefined);
        return (_b = serialize === null || serialize === void 0 ? void 0 : serialize(entry[key])) !== null && _b !== void 0 ? _b : entry[key];
    });
    const valueIdxs = keys.map((_, idx) => `$${idx + 1}`);
    const updateClause = props.map((prop, indx) => (`${prop} = ${valueIdxs[indx]}`)).join(',\n');
    const nextIndx = valueIdxs.length + 1;
    return [updateClause, values, nextIndx];
}
exports.getUpdateClauses = getUpdateClauses;
