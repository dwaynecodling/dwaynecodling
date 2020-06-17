"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateParse = exports.getReadTime = exports.isVoid = exports.isEmptyOrUndefined = exports.isNullOrUndefined = exports.isNonValue = exports.isEmailFormatValid = void 0;
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
function getReadTime(content, unitDefinition = {
    secondSingular: "secs",
    secondPlural: "sec",
    minuteSingular: "min",
    minutePlural: "mins"
}) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s/g).length;
    const minutes = wordCount / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    if (readTime > 1)
        return `${readTime} ${unitDefinition.minutePlural}`;
    else if (readTime === 1)
        return `1 ${unitDefinition.minuteSingular}`;
    else
        return `${readTime * 60} ${unitDefinition.secondPlural}`;
}
exports.getReadTime = getReadTime;
function dateParse(dateString, format = "DD MM YYYY", failQuietly = false) {
    let formatParts = format.split(/[^A-Za-z]+/gm);
    let dateStringParts = dateString.split(/[^A-Za-z0-9]+/gm);
    if (formatParts.length !== dateStringParts.length) {
        if (failQuietly === false)
            throw new Error("The dateString provided cannot be matched by the format specified");
        return new Date();
    }
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    let dateStructure = {
        day: (new Date()).getUTCDate(),
        month: (new Date()).getMonth(),
        year: (new Date()).getUTCFullYear(),
        hour: 0,
        minutes: 0,
        seconds: 0
    };
    for (let i = 0; i < formatParts.length; i++) {
        switch (formatParts[i]) {
            case "DD":
                dateStructure.day = Number(dateStringParts[i].replace(/[^0-9]+/gm, ''));
                break;
            case "MM":
                dateStructure.month = Number(dateStringParts[i]);
                break;
            case "MMM":
                let lowerMatch = months.filter(m => m.substr(0, 3) === dateStringParts[i].toLowerCase())[0];
                dateStructure.month = months.indexOf(lowerMatch);
                break;
            case "MMMM":
                dateStructure.month = months.indexOf(dateStringParts[i].toLowerCase());
                break;
            case "YY":
                dateStructure.year = Number(`20${dateStringParts[i]}`);
                break;
            case "YYYY":
                dateStructure.year = Number(dateStringParts[i]);
                break;
            case "hh":
                dateStructure.hour = Number(dateStringParts[i]);
                break;
            case "mm":
                dateStructure.minutes = Number(dateStringParts[i]);
                break;
            case "ss":
                dateStructure.seconds = Number(dateStringParts[i]);
                break;
        }
    }
    return new Date(dateStructure.year, dateStructure.month, dateStructure.day, dateStructure.hour, dateStructure.minutes, dateStructure.seconds);
}
exports.dateParse = dateParse;
//# sourceMappingURL=convinienceHelper.js.map