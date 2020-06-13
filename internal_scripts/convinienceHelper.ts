export function isEmailFormatValid(email:string){
    let emailRegexPattern = /[a-zA-Z0-9-_]+(?:[.a-zA-Z0-9-_]*[a-zA-Z0-9-_]+)*@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)*/gm;
    return emailRegexPattern.test(email.trim());
}

export function isNonValue(value:any){
    if (isNullOrUndefined(value)) return true;
    return value === false;
}

export function isNullOrUndefined(value:any){
    if (value === void 0) return true;
    return value === null;
}

export function isEmptyOrUndefined(value:any){
    if ((typeof value === "string" || value instanceof String) && value.trim() === "") return true;
    return isNullOrUndefined(value);
}

export function isVoid(value:any){
    if (value === void 0) return true;
    return value === null;
}