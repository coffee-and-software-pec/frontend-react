export function convertTimestampToDate(timestamp: number) {
    return new Date(timestamp * 1000);
}

function formatNumberWithPadding(singleNumber: number) {
    return singleNumber.toString().padStart(2, "0");
}

export function formatLocalDateTime(localDateTime: string) {
    const dateTime = new Date(localDateTime);
    
    const day = formatNumberWithPadding(dateTime.getDate());
    const month = formatNumberWithPadding(dateTime.getMonth());
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const hours = formatNumberWithPadding(dateTime.getHours());
    const minutes = formatNumberWithPadding(dateTime.getMinutes());
    const formattedTime = `${hours}:${minutes}`

    return `${formattedDate} às ${formattedTime}`;
}

export function formatDateTimestamp(timestamp: number) {
    const dateTime = convertTimestampToDate(timestamp);

    const day = formatNumberWithPadding(dateTime.getDay());
    const month = formatNumberWithPadding(dateTime.getMonth());
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const hours = formatNumberWithPadding(dateTime.getHours());
    const minutes = formatNumberWithPadding(dateTime.getMinutes());
    const formattedTime = `${hours}:${minutes}`

    return `${formattedDate} às ${formattedTime}`;
}