import { imageList, Colors } from './Values';
import { dateFormatter } from './Tools';
import { StationModelStyles as styles } from '../styles';

export class Decoder {
    constructor(data, useTaf, hour) {
        this.data = data;
        this.taf = useTaf ? this.taf(hour) : null;
    }

    taf(hour) {
        if (hour) {
            const date = dateFormatter(new Date(), hour);
            
            if (Object.prototype.hasOwnProperty.call(this.data, "taf")) {
                for (const item of this.data.taf.forecast) {
                    const timeFrom = new Date(item.fcst_time_from[0]);
                    const timeTo = new Date(item.fcst_time_to[0]);
                    if (timeFrom.getUTCDate() <= date.day && timeTo.getUTCDate() >= date.day) {
                        if (timeFrom.getUTCHours() <= date.hour && timeTo.getUTCHours() >= date.hour) {
                            if (Object.prototype.hasOwnProperty.call(item, "time_becoming")) {
                                if (new Date(item.time_becoming[0]).getHours() <= date.hour) {
                                    return item;
                                }
                            } else {
                                return item;
                            }
                        }
                    }
                }
            }
        }
    }
    
    temp() {
        let temp = null;
        
        if (Object.prototype.hasOwnProperty.call(this.data, 'temp_c')) {
            temp = Math.round((this.data.temp_c * 9/5) + 32);
        }
        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'temperature')) {
            temp = Math.round((this.taf.temperature[1] * 9/5) + 32);
        }

        return temp;
    }

    vis() {
        let vis = null;
        let visTaf = false;

        if (Object.prototype.hasOwnProperty.call(this.data, 'visibility_statute_mi')) {
            vis = Number(this.data.visibility_statute_mi).toFixed(1);
        }
        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'visibility_statute_mi')) {
            vis = Number(this.taf.visibility_statute_mi[0]).toFixed(1);
            visTaf = true;
        }

        return [vis, visTaf];
    }
    
    dew() {
        if (Object.prototype.hasOwnProperty.call(this.data, 'dewpoint_c')) {
            return Math.round((this.data.dewpoint_c * 9/5) + 32);
        }
    }
    
    wx() {
        let wxString = null;
        
        if (Object.prototype.hasOwnProperty.call(this.data, 'wx_string')) {
            wxString = String(this.data.wx_string);
        }
        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'wx_string')) {
            wxString = String(this.taf.wx_string[0]);
        }   
        if (wxString) {
            // eslint-disable-next-line no-unused-vars
            const [wx, precip] = wxString.split(/\s+(.*)/);
            return imageList[wx];
        }
    }
    
    alt() {
        let alt = null;
        let altTaf = false;

        const altHelper = (alt) => {
            let altString = Number(alt).toFixed(2).toString();
            return altString.slice(-4,-3) + altString.slice(-2);
        };

        if (Object.prototype.hasOwnProperty.call(this.data, 'altim_in_hg')) {
            alt = altHelper(this.data.altim_in_hg);
        }
        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'altim_in_hg')) {
            alt = altHelper(this.taf.altim_in_hg[0]);
            altTaf = true;
        }

        return [alt, altTaf];
    }

    sky() {
        let skyCondition = null;
        let cover = null;
        let ceiling = null;
        let skyTaf = false;

        if (Object.prototype.hasOwnProperty.call(this.data, "sky_condition")) {
            skyCondition = this.data.sky_condition[0]["$"];
        }
        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'sky_condition')) {
            skyCondition = this.taf.sky_condition[0]["$"];
            skyTaf = true;
        }
        if (skyCondition) {
            cover = skyCondition.sky_cover;

            if (Object.prototype.hasOwnProperty.call(skyCondition, "cloud_base_ft_agl")) {
                ceiling = skyCondition.cloud_base_ft_agl;
            }
        }

        return [cover, ceiling, skyTaf];
    }

    flightCategoryColor(category) {
        switch (category) {
            case 'LIFR':
                return Colors.purple;
            case 'IFR':
                return Colors.red;
            case 'MVFR':
                return Colors.blue;
            case 'VFR':
                return Colors.green;
            default:
                return null;
        }
    }
    
    flightCategoryCalc(ceiling, vis) {
        // LIFR
        if (ceiling < 500 || vis < 1) {
            return "LIFR";
        }
        // IFR
        else if ((ceiling >= 500 && ceiling < 1000) || (vis >= 1 && vis < 3)) {
            return "IFR";
        }
        // MVFR
        else if ((ceiling >= 1000 && ceiling < 3000) || (vis >= 3 && vis < 5)) {
            return "MVFR";
        }
        // VFR
        else if ((ceiling >= 3000 && vis >= 5)) {
            return "VFR";
        }
    }

    category(ceiling, vis) {
        let category = null;

        if (Object.prototype.hasOwnProperty.call(this.data, "flight_category")) {
            category = this.data.flight_category[0];
        }
        if (this.taf) {
            category = this.flightCategoryCalc(ceiling, vis);
        }
        if (category) {
            return this.flightCategoryColor(category);
        }
    }

    fill(cover) {
        switch (cover) {
            case 'CLR' || 'SKC':
                return null;
            case 'FEW':
                return styles.few;
            case 'SCT': 
                return styles.sct;
            case 'BKN':
                return styles.bkn;
            case 'OVC':
                return styles.ovc;
            case 'OVX':
                return styles.ovx;
            default:
                return "M";
        }
    }

    wind() {
        let direction = null;
        let speed = null;
        let windTaf = false;

        if (Object.prototype.hasOwnProperty.call(this.data, 'wind_speed_kt') && this.data.wind_speed_kt > 0) {
            direction = Number(this.data.wind_dir_degrees);
            speed = Math.ceil(this.data.wind_speed_kt / 5) * 5;
        }

        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'wind_speed_kt') && this.taf.wind_speed_kt[0] > 0) {
            direction = Number(this.taf.wind_dir_degrees[0]);
            speed = Math.ceil(this.taf.wind_speed_kt[0] / 5) * 5;
            windTaf = true;
        }

        return [direction, speed, windTaf];
    }

    directionValues(direction) {
        let directionString = null;
        let rightPadding = 10;
        let leftPadding = 10;

        if (direction != null) {
            directionString = `${direction} deg`;
            // Set padding left/right regarding degree
            if (direction > 20 && direction < 160) {    
                rightPadding = 30;
            }
            else if (direction > 200 && direction < 340) {
                leftPadding = 30;
            }
        }

        return [directionString, rightPadding, leftPadding];
    }

    gust() {
        let gust = null;

        if (Object.prototype.hasOwnProperty.call(this.data, 'wind_gust_kt')) {
            gust = Math.ceil(this.data.wind_gust_kt / 5) * 5
        }
        if (this.taf && Object.prototype.hasOwnProperty.call(this.taf, 'wind_gust_kt')) {
            gust = Math.ceil(this.taf.wind_gust_kt[0] / 5) * 5
        }

        return gust;
    }
}