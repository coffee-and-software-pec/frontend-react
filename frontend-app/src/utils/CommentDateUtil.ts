export function getCommentDateString(commentDate: number) {
    let result = "";

    commentDate *= 1000;

    const now: number = new Date().getTime();
    const diff: number = (now - commentDate)/1000;

    const diffMinutes: number = diff/60;
    const diffHours: number = diffMinutes/60;
    const diffDays: number = diffHours/24;
    const diffMonths: number = diffDays/30;
    const diffYears: number = diffMonths/12;

    if (diffYears >= 1) {
        result = `há ${diffYears.toFixed(0)} ano(s) atrás`;
    } else if (diffMonths >= 1) {
        result = `há ${diffMonths.toFixed(0)} mese(s) atrás`;
    } else if (diffDays >= 1) {
        result = `há ${diffDays.toFixed(0)} dia(s) atrás`;
    } else if (diffHours >= 1) {
        result = `há ${diffHours.toFixed(0)} hora(s) atrás`;
    } else if (diffMinutes >= 1) {
        result = `há ${diffMinutes.toFixed(0)} minuto(s) atrás`;
    } else {
        result = `há ${diff} segundos atrás`;
    }

    return result;
}