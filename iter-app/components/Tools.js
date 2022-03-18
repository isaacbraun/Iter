// Get Lat and Lng object from passed lat and lng args 
export function getLatLng(lat, lng) {
    return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.06,
        longitudeDelta: 0.04,
    }
};

export function getAllMetars() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

export function getTAFs() {
    return null;
};    