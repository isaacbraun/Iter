import { level_1_airports, level_2_airports, level_3_airports, level_4_airports } from "../components/Values";
import Marker from '../components/Marker';

export function getAllMetars() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

export function getAllTafs() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/tafs.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

export function markerFilters(marker, index, region) {
    if (marker.hasOwnProperty('longitude') && marker.hasOwnProperty('latitude')) {
        if (region.longitudeDelta >= 70) {
            if (level_1_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else if (region.longitudeDelta >= 30) {
            if (level_2_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else if (region.longitudeDelta >= 20) {
            if (level_3_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else if (region.longitudeDelta >= 10) {
            if (level_4_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else {
            if (region.longitudeDelta >= 7) {
                if ((marker.latitude[0] <= region.latitude + 12) && (marker.latitude[0] >= region.latitude - 12)
                && (marker.longitude[0] <= region.longitude + 12) && (marker.longitude[0] >= region.longitude - 12)) {
                    if (marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} />
                    }
                }
            }
            if (region.longitudeDelta >= 4) {
                if ((marker.latitude[0] <= region.latitude + 4) && (marker.latitude[0] >= region.latitude - 4)
                && (marker.longitude[0] <= region.longitude + 4) && (marker.longitude[0] >= region.longitude - 4)) {
                    if (marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} />
                    }
                }
            }
            else if (region.longitudeDelta >= 1.5) {
                if ((marker.latitude[0] <= region.latitude + 2) && (marker.latitude[0] >= region.latitude - 2)
                && (marker.longitude[0] <= region.longitude + 2) && (marker.longitude[0] >= region.longitude - 2)) {
                    if (marker.type == "medium_airport" || marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} />
                    }
                }
            }
            else {
                if ((marker.latitude[0] <= region.latitude + 1) && (marker.latitude[0] >= region.latitude - 1)
                && (marker.longitude[0] <= region.longitude + 1) && (marker.longitude[0] >= region.longitude - 1)) {
                    return <Marker key={index} index={index} marker={marker} />
                }
            }
        }
    } else {
        return null;
    }
}