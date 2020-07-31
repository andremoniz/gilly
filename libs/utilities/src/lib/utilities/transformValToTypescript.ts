export function transformValToTypescript(val: any) {
    if (val === undefined || val === null || val instanceof Object || typeof val === 'function')
        return val;

    let actualVal = val;
    actualVal = checkString(actualVal);
    actualVal = checkBoolean(actualVal);
    actualVal = checkDate(actualVal);
    return actualVal;
}

function checkString(val: any) {
    let stringVal = val;

    if (stringVal === 'null') stringVal = '';

    return stringVal;
}

function checkBoolean(val: any) {
    if (typeof val === 'number' || typeof val === 'boolean') return val;

    let booleanVal = val;
    const _val = val.toLowerCase();
    if (_val === 'false' || _val === 'f') {
        booleanVal = false;
    } else if (_val === 'true' || _val === 't') {
        booleanVal = true;
    }
    return booleanVal;
}

function checkDate(val: any) {
    const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}.\d{3}Z/; // ISO UTC
    const wtDateRegex = /\w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2}/;
    const shortDateRegex = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/;

    const dateTest = new Date(val);
    if (
        val instanceof Date ||
        val.toString().match(isoDateRegex) ||
        val.toString().match(wtDateRegex) ||
        val.toString().match(shortDateRegex)
    ) {
        if (val.indexOf('..') >= 0 || val.indexOf('http') >= 0 || val.indexOf('://') >= 0) {
            return val;
        }
        return dateTest;
    } else {
        return val;
    }
}
