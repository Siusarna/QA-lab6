"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeArray = exports.escapeIdentifier = void 0;
const escapeMap = {
    "\0": "\\0",
    "\x08": "\\b",
    "\x09": "\\t",
    "\x1a": "\\z",
    "\n": "\\n",
    "\r": "\\r",
    "\"": "\\\"",
    "'": "\\'",
    "\\": "\\\\",
    "%": "\\%",
};
function escapeIdentifier(x) {
    if (typeof x === 'string') {
        return x.replace(/[\0\x08\x09\x1a\n\r"'\\%]/g, char => {
            const escaped = escapeMap[char];
            return escaped || char;
        });
    }
    else {
        return x;
    }
}
exports.escapeIdentifier = escapeIdentifier;
function escapeArray(arr) {
    return arr.map(escapeIdentifier);
}
exports.escapeArray = escapeArray;
