// Get Metars from AWC
export function getAllMetars() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

// Get Tafs from AWC
export function getAllTafs() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/tafs.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

export function dateFormatter(date, hours) {
    const dayAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let month = dayAbbr[date.getMonth()];
    let day = date.getDate();
    let hour = hours;

    if (hours >= 24) {
        day = day + 1;
        hour = hour - 24;
    }

    return {"month" : month, "day" : day, "hour" : hour};
}

// Turn Date and Timeline Value into Formatted String for Timeline
export function hoursDisplay(date, timelineValue) {
    const formatted = dateFormatter(date, timelineValue);

    return `${formatted.month}. ${formatted.day} ${ formatted.hour < 10 ? `0${formatted.hour}` : formatted.hour}:00`;
};