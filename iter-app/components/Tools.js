// const convert = require('xml-js');

export const Colors = {
    background: "#fff",
    text: "#6F7371",
    blue: "#487CE1",
    green: "#1EA66D",
}

export function getLatLng(lat, lng) {
    return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.06,
        longitudeDelta: 0.04,
    }
};