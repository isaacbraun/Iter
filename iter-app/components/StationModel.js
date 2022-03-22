import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import { Colors, imageList, barbList, pennantList } from '../components/Values';
import { dateFormatter } from './Tools';
import { StationModelStyles as styles } from '../styles';

export default function StationModel(props) {
    const date = dateFormatter(new Date(), props.hour);
    let taf = null;

    if (props.marker.hasOwnProperty("taf")) {
        for (const item of props.marker.taf.forecast) {
            const timeFrom = new Date(item.fcst_time_from[0]);
            const timeTo = new Date(item.fcst_time_to[0]);
            if (timeFrom.getDate() <= date.day && timeTo.getDate() >= date.day) {
                if (timeFrom.getHours() <= date.hour && timeTo.getHours() >= date.hour) {
                    if (item.hasOwnProperty("time_becoming")) {
                        if (new Date(item.time_becoming[0]).getHours() > date.hour) {
                            break;
                        }
                    }
                    taf = item;
                    // if (item.hasOwnProperty("temperature")) {
                    //     console.log(item);
                    // }
                }
            }
        }
    }

    // change_indicator
    // time_becoming
    // wind_dir_degrees
    // wind_speed_kt
    // wind_gust_kt
    // visibility_statute_mi
    // altim_in_hg
    // wx_string
    // sky_condition
    // temperature
    //     valid_time
    //     max_temp_c
    //     min_temp_c


    let temp = null;
    if (props.marker.hasOwnProperty('temp_c')) {
        // if (taf && taf.hasOwnProperty('temperature')) {
        //     temp = Math.round((taf.temperaturemax_temp_c * 9/5) + 32);
        // } else {
        temp = Math.round((props.marker.temp_c * 9/5) + 32);
        // }
    }

    let dew = null;
    if (props.marker.hasOwnProperty('dewpoint_c')) {
        dew = Math.round((props.marker.dewpoint_c * 9/5) + 32);
    }

    let wxImage = null;
    if (props.marker.hasOwnProperty('wx_string')) {
        let wxString = null;
        if (taf && taf.hasOwnProperty('wx_string')) {
            wxString = String(taf.wx_string[0]);
        } else {
           wxString = String(props.marker.wx_string);
        }
        const [wx, precip] = wxString.split(/\s+(.*)/);
        wxImage = imageList[wx];
    }

    let alt = null;
    if (props.marker.hasOwnProperty('altim_in_hg')) {
        let altString = null;
        if (taf && taf.hasOwnProperty('altim_in_hg')) {
            altString = Number(taf.altim_in_hg[0]).toFixed(2).toString();
        } else {
            altString = Number(props.marker.altim_in_hg).toFixed(2).toString();
        }
        alt = altString.slice(-4,-3) + altString.slice(-2);
    }    

    let skyCondition = null;
    let cover = null;
    let ceiling = null;
    if (props.marker.hasOwnProperty("sky_condition")) {
        if (taf && taf.hasOwnProperty('sky_condition')) {
            skyCondition = taf.sky_condition[0]["$"];
        } else {
            skyCondition = props.marker.sky_condition[0]["$"];
        }

        cover = skyCondition.sky_cover;

        if (skyCondition.hasOwnProperty("cloud_base_ft_agl")) {
            ceiling = skyCondition.cloud_base_ft_agl;
        }
    }

    let circleColor = null;
    if (props.marker.hasOwnProperty("flight_category")) {
        switch (props.marker.flight_category[0]) {
            case 'MVFR':
                circleColor = Colors.blue;
                break;
            case 'IFR':
                circleColor = Colors.red;
                break;
            case 'LIFR':
                circleColor = Colors.purple;
                break;
        }
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
    if (props.marker.hasOwnProperty('wind_speed_kt') && props.marker.wind_speed_kt > 0) {
        direction = Number(props.marker.wind_dir_degrees);
        directionString = String(direction) + "deg";
        
        // Set padding left/right regarding degree
        if (direction > 20 && direction < 160) {    
            rightPadding = 30;
        }
        else if (direction > 200 && direction < 340) {
            leftPadding = 30;
        }

        speed = Math.ceil(props.marker.wind_speed_kt / 5) * 5;
    }

    let gust = null;
    if (props.marker.hasOwnProperty('wind_gust_kt')) {
        gust = Math.ceil(props.marker.wind_gust_kt / 5) * 5
    }

    return (
        <View style={styles.container}>
            <View style={[styles.left, {paddingRight: leftPadding}]}>
                <Text style={[styles.temp, styles.text]}>{temp}</Text>
                <View style={styles.horizontal}>
                    {props.marker.hasOwnProperty('visibility_statute_mi') ?
                        <Text style={[styles.vis, styles.text]}>{Number(props.marker.visibility_statute_mi).toFixed(1)}</Text> : null
                    }
                    { props.marker.hasOwnProperty('wx_string') ?
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
                        <View style={styles.windbarb}>
                            {speed >= 50 ?
                                Object.keys(pennantList).map(function(key, index) {
                                    if (key <= speed) {
                                        return <View key={index} style={[styles.windFeather, pennantList[key]]} />
                                    }
                                    else if (key <= gust) {
                                        return <View key={index} style={[styles.windFeather, pennantList[key], styles.gust]} />
                                    }
                                })
                                :
                                Object.keys(barbList).map(function(key, index) {
                                    if (key <= speed) {
                                        return <View key={index} style={[styles.windFeather, barbList[key]]} />
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
                <Text style={[styles.alt, styles.text]}>{alt}</Text>
                { ceiling ?
                    <Text style={[styles.ceiling, styles.text]}>{ceiling}</Text>
                    : null
                }
                <Text style={[styles.id, styles.text]}>{props.marker.station_id[0]}</Text>
            </View>
        </View>
    );
}