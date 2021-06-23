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

export function getReadTime(content:string, unitDefinition={
    secondSingular: "secs",
    secondPlural: "sec",
    minuteSingular: "min",
    minutePlural: "mins"
}){
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s/g).length;
    const minutes = wordCount / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    if (readTime > 1) return `${readTime} ${unitDefinition.minutePlural}`;
    else if (readTime === 1) return `1 ${unitDefinition.minuteSingular}`;
    else return `${readTime * 60} ${unitDefinition.secondPlural}`;
}

export function dateParse(dateString:string, format:string="DD MM YYYY", failQuietly:boolean=false){
    let formatParts = format.split(/[^A-Za-z]+/gm);
    let dateStringParts = dateString.split(/[^A-Za-z0-9]+/gm);
    if (formatParts.length !== dateStringParts.length){
        if (failQuietly === false) throw new Error("The dateString provided cannot be matched by the format specified");
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
    }

    for (let i = 0; i < formatParts.length; i++){
        switch (formatParts[i]){
            case "DD":
                dateStructure.day = Number(dateStringParts[i].replace(/[^0-9]+/gm,''));
                break;
            case "MM":
                dateStructure.month = Number(dateStringParts[i]);
                break;
            case "MMM":
                let lowerMatch = months.filter(m => m.substr(0,3) === dateStringParts[i].toLowerCase())[0];
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