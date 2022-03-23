import React from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { DetailedViewStyles as styles } from '../styles';
import { Decoder } from '../components/Decoder';
import Navbar from '../components/Navbar';
import { dayAbbr } from "../components/Values";

export default function DetailedViewScreen({ route, navigation }) {
    const { data } = route.params;
    
    const metar = new Decoder(data, false, null);
    const [metarCover, metarCeiling, skyTaf] = metar.sky();
    const [metarDirection, metarSpeed, windTaf] = metar.wind();
    // <Text style={styles.text}>{}</Text>

    const dateString = (date) => {
        return `${dayAbbr[date.getMonth()]}. ${date.getUTCDate()} ${ date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()}:${date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()}`;
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
                {/* Navbar */}
                <Navbar title={"Decoded Details"} navigation={navigation} />
                
                <View style={styles.inner}>
                    {/* Station Info */}
                    <View style={styles.container}>
                        <Text style={styles.header}>{data.station_id[0]}</Text>
                        <Text style={styles.text}>{data.latitude[0]}, {data.longitude[0]}</Text>
                        <Text style={styles.text}>Elevation: {data.elevation_m[0] } m</Text>
                    </View>

                    {/* Metar Decoded */}
                    <View style={styles.container}>
                        <Text style={styles.header}>METAR Decoded</Text>
                        <Text style={styles.text}>Observation Time: {dateString(new Date(data.observation_time[0]))}</Text>
                        <Text style={styles.text}>METAR Type: {data.metar_type[0]}</Text>
                        <Text style={styles.text}>Temperature: {data.temp_c[0]}&deg;C, {metar.temp()}&deg;F</Text>
                        <Text style={styles.text}>Dewpoint: {metar.dew()}&deg;C</Text>
                        <Text style={styles.text}>Wind Direction: {metarDirection}&deg;</Text>
                        <Text style={styles.text}>Wind Speed: {metarSpeed} kts</Text>
                        { metar.gust() ?
                            <Text style={styles.text}>Wind Gust: {metar.gust()} kts</Text>
                        : null }
                        <Text style={styles.text}>Visibility: {metar.vis()[0]} statute mi.</Text>
                        <Text style={styles.text}>Altimeter: {metar.alt()[0]} in. Hg</Text>
                        { data.hasOwnProperty('sea_level_pressure_mb') ?
                            <Text style={styles.text}>Sea-level Pressure: {data.sea_level_pressure_mb[0]} mb</Text>
                        : null }
                        { data.hasOwnProperty('quality_control_flags') ?
                            <Text style={styles.text}>Quality Control Flags: {Object.keys(data.quality_control_flags[0]).map(elem => elem)}</Text>
                        : null }
                        { data.hasOwnProperty('wx_string') ?
                            <Text style={styles.text}>Weather String: {data.wx_string[0]}</Text>
                        : null }
                        <Text style={styles.text}>Sky Cover: {metarCover}</Text>
                        { metarCeiling ? 
                            <Text style={styles.text}>Cloud Base: {metarCeiling} ft. AGL</Text>
                        : null }
                        <Text style={styles.text}>Flight Category: {data.flight_category[0]}</Text>
                        { data.hasOwnProperty('three_hr_pressure_tendency_mb') ?
                            <Text style={styles.text}>Three Hour Pressure Tendency: {data.three_hr_pressure_tendency_mb[0]} mb</Text>
                        : null }
                        { data.hasOwnProperty('maxT_c') ?
                            <Text style={styles.text}>Max Temperature: {data.maxT_c[0]}&deg;C</Text>
                        : null }
                        { data.hasOwnProperty('minT_c') ?
                            <Text style={styles.text}>Min Temperature: {data.minT_c[0]}&deg;C</Text>
                        : null }
                        { data.hasOwnProperty('maxT24hr_c ') ?
                            <Text style={styles.text}>Max Past Temperature: {data.maxT24hr_c [0]}&deg;C</Text>
                        : null }
                        { data.hasOwnProperty('minT24hr_c') ?
                            <Text style={styles.text}>Min Past Temperature: {data.minT24hr_c[0]}&deg;C</Text>
                        : null }
                        { data.hasOwnProperty('precip_in ') ?
                            <Text style={styles.text}>Precipitation: {data.precip_in[0]} in.</Text>
                        : null }
                        { data.hasOwnProperty('pcp3hr_in') ?
                            <Text style={styles.text}>Past 3hr Precipitation: {data.pcp3hr_in[0]} in.</Text>
                        : null }
                        { data.hasOwnProperty('pcp6hr_in') ?
                            <Text style={styles.text}>Past 6hr Precipitation: {data.pcp6hr_in[0]} in.</Text>
                        : null }
                        { data.hasOwnProperty('pcp24hr_in') ?
                            <Text style={styles.text}>Past 24hr Precipitation: {data.pcp24hr_in[0]} in.</Text>
                        : null }
                        { data.hasOwnProperty('snow_in') ?
                            <Text style={styles.text}>Snow Depth: {data.snow_in[0]}& in.</Text>
                        : null }
                        { data.hasOwnProperty('vert_vis_ft') ?
                            <Text style={styles.text}>Vertical Visibility: {data.vert_vis_ft[0]} ft.</Text>
                        : null }
                    </View>

                    {/* Taf Decoded */}
                    <View style={styles.container}>
                        <Text style={styles.header}>TAF Decoded</Text>
                        
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};