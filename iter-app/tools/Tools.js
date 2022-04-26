import { monthAbbr } from "./Values";

// Get Metars from AWC
export function getAllMetars() {
    return fetch("https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml")
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
}

// Get Tafs from AWC
export function getAllTafs() {
    return fetch("https://www.aviationweather.gov/adds/dataserver_current/current/tafs.cache.xml")
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
}

// https://bobbyhadz.com/blog/javascript-check-if-date-is-last-day-of-month
export function isLastDayOfMonth(date = new Date()) {
    const oneDayInMs = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + oneDayInMs).getDate() === 1;
}

// Takes Date Object and Number Hours; Returns Object with String Month Name, Day Number, and Hour Number;
export function dateFormatter(date, hours) {    
    let month = date.getMonth();
    let day = date.getDate();
    let hour = hours;

    if (hours >= 24) {
        if (month == 11) {
            month = 0;
        }
        else if (isLastDayOfMonth(day)) {
            month += 1;
            day = 1;
        }
        else {
            day = day + 1;
        }
        hours = hours - 24;
    }

    return {"month" : monthAbbr[month], "day" : day, "hour" : hour};
}

// Turn Date and Timeline Value into Formatted String for Timeline
export function hoursDisplay(date, timelineValue) {
    const formatted = dateFormatter(date, timelineValue);

    return `${formatted.month}. ${formatted.day} ${ formatted.hour < 10 ? `0${formatted.hour}` : formatted.hour}:00`;
}

export function dateTimeString(date) {
    const hours = date.getHours();
    return `${monthAbbr[date.getMonth()]}. ${date.getDate()}, ${ hours < 10 ? `0${hours}` : hours}:${date.getMinutes()}`;
}