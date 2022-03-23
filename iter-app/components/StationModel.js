import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import { barbList, pennantList } from '../components/Values';
import { Decoder } from '../components/Decoder';
import { StationModelStyles as styles } from '../styles';

export default function StationModel(props) {
    const decoded = new Decoder(props.marker, true, props.hour);

    const temp = decoded.temp();
    const [vis, visTaf] = decoded.vis();
    const dew = decoded.dew();
    const wxImage = decoded.wx();
    const [alt, altTaf] = decoded.alt();
    const [cover, ceiling, skyTaf] = decoded.sky();
    const circleColor = decoded.category(ceiling, vis);
    const fill = decoded.fill(cover);
    const [direction, speed, windTaf] = decoded.wind();
    const [directionString, rightPadding, leftPadding] = decoded.directionValues(direction);
    const gust = decoded.gust();

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