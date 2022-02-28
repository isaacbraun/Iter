import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import { Colors, imageList, barbList } from '../components/Tools';
import { StationModelStyles as styles } from '../styles';

export function Middle(props) {
    let circleColor = null;
    if (props.category) {
        switch (props.category[0]) {
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
    switch (props.cover) {
        case 'CLR' || 'SKC':
            break;
        case 'FEW':
            fill = styles.bar;
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
    let speed = null;
    let featherArray = [];
    if (props.speed > 0) {
        direction = String(props.direction) + "deg";
        speed = Math.ceil(props.speed / 5) * 5;
        for (let i = 0; i <= speed / 5; i++) {
            let feather = (
                <View key={i} style={[styles.windFeather, barbList[i * 5], props.gust == i * 5 ? styles.gust : null]} />
            );
            featherArray[i] = (feather);
        }
    }
    

    return(
        <View>
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
            { props.speed > 0 ?
                <View style={[
                    styles.windbarbContainer,
                    {transform: [
                        {translateX: 8 - (2 / 2)},
                        {translateY: 8 - (25 / 2)},
                        {rotateZ: direction},
                        {translateX: -(8 - (2 / 2))},
                        {translateY: -(8 - (25 / 2))},
                    ]}
                  ]}>
                        <View style={styles.windbarb}>
                            {featherArray.map((elem, index) => (
                                elem
                            ))}
                        </View>
                </View>
                : null
            }
        </View>
    );
};

export default function StationModel(props) {
    let temp = null;
    if (props.hasOwnProperty('temp_c')) {
        temp = Math.round((props.temp_c * 9/5) + 32);
    }

    let dew = null;
    if (props.hasOwnProperty('dewpoint_c')) {
        dew = Math.round((props.dewpoint_c * 9/5) + 32);
    }

    let wxImage = null;
    if (props.hasOwnProperty('wx_string')) {
        const wxString = String(props.wx_string);
        const [wx, precip] = wxString.split(/\s+(.*)/);
        wxImage = imageList[wx];
    }

    let alt = null;
    if (props.hasOwnProperty('altim_in_hg')) {
        const altString = Number(props.altim_in_hg).toFixed(2).toString();
        alt = altString.slice(-4,-3) + altString.slice(-2);
    }    

    let skyCondition = null;
    let cover = null;
    let ceiling = null;
    if (props.hasOwnProperty("sky_condition")) {
        skyCondition = props.sky_condition[0]["$"];
        cover = skyCondition.sky_cover;

        if (skyCondition.hasOwnProperty("cloud_base_ft_agl")) {
            ceiling = skyCondition.cloud_base_ft_agl;
        }
    }

    let gust = null;
    if (props.hasOwnProperty('wind_gust_kt')) {
        gust = Math.ceil(props.wind_gust_kt / 5) * 5
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={[styles.temp, styles.text]}>{temp}</Text>
                <View style={styles.horizontal}>
                    <Text style={[styles.vis, styles.text]}>{Number(props.visibility_statute_mi).toFixed(1)}</Text>
                    { props.hasOwnProperty('wx_string') ?
                        <Image style={styles.wx} source={wxImage}/> : null
                    }
                </View>
                <Text style={[styles.dew, styles.text]}>{dew}</Text>
            </View>
            <View style={styles.middle}>
                <Middle
                    category={props.flight_category}
                    cover={cover}
                    direction={props.wind_dir_degrees}
                    speed={props.wind_speed_kt}
                    gust={gust}
                />
            </View>
            <View style={styles.right}>
                <Text style={[styles.alt, styles.text]}>{alt}</Text>
                { ceiling ?
                    <Text style={[styles.ceiling, styles.text]}>{ceiling}</Text>
                    : null
                }
                <Text style={[styles.id, styles.text]}>{props.station_id[0]}</Text>
            </View>
        </View>
    );
}