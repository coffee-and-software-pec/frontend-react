export function convertNumberToThousands(numberToFormat: number | undefined) {
    let result = "";

    if (numberToFormat !== undefined) {
        if (numberToFormat > 1000) {
            result = `${(numberToFormat/1000).toFixed(1).toString()}k`
        } else {
            result = numberToFormat.toString();
        }        
    }

    return result;
}