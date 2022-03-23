import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import { imageList, barbList, pennantList } from '../components/Values';
import { dateFormatter, flightCategoryCalc, flightCategoryColor } from './Tools';
import { StationModelStyles as styles } from '../styles';

export default function StationModel(props) {
    const date = dateFormatter(new Date(), props.hour);
    let taf = null;

    if (props.marker.hasOwnProperty("taf") && date.hour != props.hour) {
        for (const item of props.marker.taf.forecast) {
            const timeFrom = new Date(item.fcst_time_from[0]);
            const timeTo = new Date(item.fcst_time_to[0]);
            if (timeFrom.getDate() <= date.day && timeTo.getDate() >= date.day) {
                if (timeFrom.getHours() <= date.hour && timeTo.getHours() >= date.hour) {
                    if (item.hasOwnProperty("time_becoming")) {
                        if (new Date(item.time_becoming[0]).getHours() <= date.hour) {
                            taf = item;
                        }
                    } else {
                        taf = item;
                    }
                }
            }
        }
    }

    let temp = null;
    if (props.marker.hasOwnProperty('temp_c')) {
        temp = Math.round((props.marker.temp_c * 9/5) + 32);
    }
    // if (taf && taf.hasOwnProperty('temperature')) {
    //     temp = Math.round((taf.temperaturemax_temp_c * 9/5) + 32);
    // } else {

    let vis = null;
    let visTaf = false;
    if (props.marker.hasOwnProperty('visibility_statute_mi')) {
        vis = Number(props.marker.visibility_statute_mi).toFixed(1);
    }
    if (taf && taf.hasOwnProperty('visibility_statute_mi')) {
        vis = Number(taf.visibility_statute_mi[0]).toFixed(1);
        visTaf = true;
    }

    let dew = null;
    if (props.marker.hasOwnProperty('dewpoint_c')) {
        dew = Math.round((props.marker.dewpoint_c * 9/5) + 32);
    }

    let wxImage = null;
    let wxString = null;
    let wxTaf = false;
    if (props.marker.hasOwnProperty('wx_string')) {
        wxString = String(props.marker.wx_string);
    }
    if (taf && taf.hasOwnProperty('wx_string')) {
        wxString = String(taf.wx_string[0]);
        wxTaf = true;
    }   
    if (wxString) {
        const [wx, precip] = wxString.split(/\s+(.*)/);
        wxImage = imageList[wx];
    }

    let alt = null;
    let altString = null;
    let altTaf = false;
    if (props.marker.hasOwnProperty('altim_in_hg')) {
        altString = Number(props.marker.altim_in_hg).toFixed(2).toString();
    }
    if (taf && taf.hasOwnProperty('altim_in_hg')) {
        altString = Number(taf.altim_in_hg[0]).toFixed(2).toString();
        altTaf = true;
    }   
    if (altString) {
        alt = altString.slice(-4,-3) + altString.slice(-2);
    }    

    let skyCondition = null;
    let cover = null;
    let ceiling = null;
    let skyTaf = false;
    if (props.marker.hasOwnProperty("sky_condition")) {
        skyCondition = props.marker.sky_condition[0]["$"];
    }
    if (taf && taf.hasOwnProperty('sky_condition')) {
        skyCondition = taf.sky_condition[0]["$"];
        skyTaf = true;
    }
    if (skyCondition) {
        cover = skyCondition.sky_cover;

        if (skyCondition.hasOwnProperty("cloud_base_ft_agl")) {
            ceiling = skyCondition.cloud_base_ft_agl;
        }
    }

    let circleColor = null;
    let category = null;
    if (props.marker.hasOwnProperty("flight_category")) {
        category = props.marker.flight_category[0];
    }
    if (taf) {
        category = flightCategoryCalc(ceiling, vis);
    }
    if (category) {
        circleColor = flightCategoryColor(category);
    }

    let fill = null;
    switch (cover) {
        case 'CLR' || 'SKC':
            break;
        case 'FEW':
            fill = styles.few;
            break;
        case 'SCT': 
            fill = styles.sct;
            break;
        case 'BKN':
            fill = styles.bkn;
            break;
        case 'OVC':
            fill = styles.ovc;
            break;
        case 'OVX':
            fill = styles.ovx;
            break;
        default:
            fill = "M";
            break;
    }
    
    let direction = null;
    let directionString = null;
    let speed = null;
    let rightPadding = 10;
    let leftPadding = 10;
    let windTaf = false;
    if (props.marker.hasOwnProperty('wind_speed_kt') && props.marker.wind_speed_kt > 0) {
        direction = Number(props.marker.wind_dir_degrees);
        speed = Math.ceil(props.marker.wind_speed_kt / 5) * 5;
    }

    if (taf && taf.hasOwnProperty('wind_speed_kt') && taf.wind_speed_kt[0] > 0) {
        direction = Number(taf.wind_dir_degrees[0]);
        speed = Math.ceil(taf.wind_speed_kt[0] / 5) * 5;
        windTaf = true;
    }

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

    let gust = null;
    if (props.marker.hasOwnProperty('wind_gust_kt')) {
        gust = Math.ceil(props.marker.wind_gust_kt / 5) * 5
    }
    if (taf && taf.hasOwnProperty('wind_gust_kt')) {
        gust = Math.ceil(taf.wind_gust_kt[0] / 5) * 5
    }

    return (
        <View style={styles.container}>
            <View style={[styles.left, {paddingRight: leftPadding}]}>
                <Text style={[styles.temp, styles.text]}>{temp}</Text>
                <View style={styles.horizontal}>
                    { vis != null ?
                        <Text style={[styles.vis, styles.text, visTaf ? styles.taf : null]}>{vis}</Text> : null
                    }
                    { wxImage != null ?
                        // wxTaf ? styles.tafImage : null]
                        <Image style={styles.wx} source={wxImage}/> : null
                    }
                </View>
                <Text style={[styles.dew, styles.text]}>{dew}</Text>
            </View>
            <View style={styles.middle}>
                <View style={[styles.circle, {borderColor: circleColor}]}>
                    { fill != "M" ?
                            <View style={[fill, {backgroundColor: circleColor, zIndex: 2}]}>
                                { fill == styles.bkn ?
                                    <View style={styles.bknOver} /> : null
                                }
                                { fill == styles.ovx ?
                                    <View style={[styles.ovxSecond, {backgroundColor: circleColor}]} /> : null
                                }
                            </View>
                        :
                        <Text style={styles.missing}>M</Text>
                    }
                </View>
                { props.marker.wind_speed_kt > 0 ?
                    <View style={[
                        styles.windbarbContainer,
                        {transform: [
                            { translateY: 28 / 2},
                            { rotateZ: directionString },
                            { translateY: -28 / 2 }
                        ]}
                    ]}>
                        <View style={[styles.windbarb, windTaf ? styles.windTaf : null]}>
                            {speed >= 50 ?
                                Object.keys(pennantList).map(function(key, index) {
                                    if (key <= speed) {
                                        return <View key={index} style={[styles.windFeather, pennantList[key], windTaf ? styles.windTaf : null]} />
                                    }
                                    else if (key <= gust) {
                                        return <View key={index} style={[styles.windFeather, pennantList[key], styles.gust]} />
                                    }
                                })
                                :
                                Object.keys(barbList).map(function(key, index) {
                                    if (key <= speed) {
                                        return <View key={index} style={[styles.windFeather, barbList[key], windTaf ? styles.windTaf : null]} />
                                    }
                                    else if (key <= gust) {
                                        return <View key={index} style={[styles.windFeather, barbList[key], styles.gust]} />
                                    }
                                })
                            }
                        </View>
                    </View>
                    : null
                }
            </View>
            <View style={[styles.right, {paddingLeft: rightPadding}]}>
                <Text style={[styles.alt, styles.text, altTaf ? styles.taf : null]}>{alt}</Text>
                { ceiling != null ?
                    <Text style={[styles.ceiling, styles.text, skyTaf ? styles.taf : null]}>{ceiling}</Text>
                    : null
                }
                <Text style={[styles.id, styles.text]}>{props.marker.station_id[0]}</Text>
            </View>
        </View>
    );
}