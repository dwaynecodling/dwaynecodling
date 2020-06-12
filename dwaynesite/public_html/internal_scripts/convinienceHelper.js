"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmailFormatValid(email) {
    let emailRegexPattern = /[a-zA-Z0-9-_]+(?:[.a-zA-Z0-9-_]*[a-zA-Z0-9-_]+)*@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)*/gm;
    return emailRegexPattern.test(email.trim());
}
exports.isEmailFormatValid = isEmailFormatValid;
function isNonValue(value) {
    if (isNullOrUndefined(value))
        return true;
    return value === false;
}
exports.isNonValue = isNonValue;
function isNullOrUndefined(value) {
    if (value === void 0)
        return true;
    return value === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isEmptyOrUndefined(value) {
    if ((typeof value === "string" || value instanceof String) && value.trim() === "")
        return true;
    return isNullOrUndefined(value);
}
exports.isEmptyOrUndefined = isEmptyOrUndefined;
function isVoid(value) {
    if (value === void 0)
        return true;
    return value === null;
}
exports.isVoid = isVoid;
//# sourceMappingURL=convinienceHelper.js.map