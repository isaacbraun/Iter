import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { DetailedViewStyles as styles } from '../styles';
import { Decoder } from '../components/Decoder';
import Navbar from '../components/Navbar';
import { dayAbbr } from "../components/Values";

export default function DetailedViewScreen({ route, navigation }) {
    const { data } = route.params;
    // console.log(data);
    
    const metar = new Decoder(data, false, null);
    const [metarCover, metarCeiling, skyTaf] = metar.sky();
    const [metarDirection, metarSpeed, windTaf] = metar.wind();

    const dateString = (date) => {
        return `${dayAbbr[date.getMonth()]}. ${date.getUTCDate()} ${ date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()}:${date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()}`;
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
                {/* Navbar */}
                <Navbar title={"Decoded Details"} navigation={navigation} />
                
                <ScrollView>
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
                        { data.hasOwnProperty("taf") ?
                            <View style={styles.forecast}>
                                <Text style={styles.header}>TAF Decoded</Text>
                                <Text style={styles.text}>Issue Time: {dateString(new Date(data.taf.issue_time[0]))}</Text>
                                <Text style={styles.text}>Bulletin Time: {dateString(new Date(data.taf.bulletin_time[0]))}</Text>
                                <Text style={styles.text}>Valid Time From: {dateString(new Date(data.taf.valid_time_from[0]))}</Text>
                                <Text style={styles.text}>Valid Time To: {dateString(new Date(data.taf.valid_time_to[0]))}</Text>
                                { data.taf.hasOwnProperty('remarks') ?
                                    <Text style={styles.text}>Remarks: {data.taf.remarks[0]}</Text>
                                : null }
                                <Text style={[styles.text, {fontWeight: 'bold', marginTop: 2}]}>Forecasts</Text>
                                { data.taf.forecast.map((item, index) => {
                                    console.log(item.temperature);
                                    return (
                                        <View key={index}>
                                            <Text style={styles.text}>Forecast Time From: {dateString(new Date(item.fcst_time_from[0]))}</Text>
                                            <Text style={styles.text}>Forecast Time To: {dateString(new Date(item.fcst_time_to[0]))}</Text>
                                            { item.hasOwnProperty('change_indicator') ?
                                                <Text style={styles.text}>Change Indicator: {item.change_indicator[0]}</Text>
                                            : null }
                                            { item.hasOwnProperty('time_becoming') ?
                                                <Text style={styles.text}>Time Becoming: {dateString(new Date(item.time_becoming[0]))}</Text>
                                            : null }
                                            { item.hasOwnProperty('probability') ?
                                                <Text style={styles.text}>Probability: {item.probability[0]}%</Text>
                                            : null }
                                            { item.hasOwnProperty('wind_dir_degrees') ?
                                                <Text style={styles.text}>Wind Direction: {item.wind_dir_degrees[0]}&deg;</Text>
                                            : null }
                                            { item.hasOwnProperty('wind_speed_kt') ?
                                                <Text style={styles.text}>Wind Speed: {item.wind_speed_kt[0]} kts</Text>
                                            : null }
                                            { item.hasOwnProperty('wind_gust_kt') ?
                                                <Text style={styles.text}>Wind Gust: {item.wind_gust_kt[0]} kts</Text>
                                            : null }
                                            { item.hasOwnProperty('wind_shear_hgt_ft_agl') ?
                                                <Text style={styles.text}>Wind Shear Height: {item.wind_shear_hgt_ft_agl[0]} ft. AGL</Text>
                                            : null }
                                            { item.hasOwnProperty('wind_shear_dir_degrees') ?
                                                <Text style={styles.text}>Wind Shear Direction: {item.wind_shear_dir_degrees[0]}&deg;</Text>
                                            : null }
                                            { item.hasOwnProperty('wind_shear_speed_kt') ?
                                                <Text style={styles.text}>Wind Shear Speed: {item.wind_shear_speed_kt[0]} kts</Text>
                                            : null }
                                            { item.hasOwnProperty('visibility_statute_mi') ?
                                                <Text style={styles.text}>Visibility: {item.visibility_statute_mi[0]} statue mi.</Text>
                                            : null }
                                            { item.hasOwnProperty('altim_in_hg') ?
                                                <Text style={styles.text}>Altimeter: {item.altim_in_hg[0]} in. Hg</Text>
                                            : null }
                                            { item.hasOwnProperty('vert_vis_ft') ?
                                                <Text style={styles.text}>Vertical Visibility: {item.vert_vis_ft[0]} ft.</Text>
                                            : null }
                                            { item.hasOwnProperty('wx_string') ?
                                                <Text style={styles.text}>Weather String: {item.wx_string[0]}</Text>
                                            : null }
                                            { item.hasOwnProperty('not_decoded') ?
                                                <Text style={styles.text}>Not Decoded: {item.not_decoded[0]}</Text>
                                            : null }
                                            { item.hasOwnProperty('sky_conditon') ?
                                                <Text style={styles.text}>Sky Cover: {item.sky_condition[0]["$"].sky_cover[0]}</Text>
                                            : null }
                                            { item.hasOwnProperty('sky_conditon') ?
                                                item.sky_condition[0]["$"].hasOwnProperty('cloud_base_ft_agl') ?
                                                    <Text style={styles.text}>Cloud Base: {item.sky_condition[0]["$"].cloud_base_ft_agl[0]} ft. AGL</Text>
                                                : null
                                            : null }
                                            { item.hasOwnProperty('sky_conditon') ?
                                                item.sky_condition[0]["$"].hasOwnProperty('cloud_type') ?
                                                    <Text style={styles.text}>Cloud Type: {item.sky_condition[0]["$"].cloud_type[0]}</Text>
                                                : null
                                            : null }
                                            { item.hasOwnProperty('turbulence_condition') ?
                                                <Text style={styles.text}>Turbulence Intensity: {item.turbulence_condition[0]["$"].turbulence_intensity[0]}</Text>
                                            : null }
                                            { item.hasOwnProperty('turbulence_condition') ?
                                                item.turbulence_condition[0]["$"].hasOwnProperty('turbulence_min_alt_ft_agl') ?
                                                    <Text style={styles.text}>Turbulence Min Altitude: {item.turbulence_condition[0]["$"].turbulence_min_alt_ft_agl[0]} ft. AGL</Text>
                                                : null
                                            : null }
                                            { item.hasOwnProperty('turbulence_condition') ?
                                                item.turbulence_condition[0]["$"].hasOwnProperty('turbulence_max_alt_ft_agl') ?
                                                    <Text style={styles.text}>Turbulence Max Altitude: {item.turbulence_condition[0]["$"].turbulence_max_alt_ft_agl[0]} ft. AGL</Text>
                                                : null
                                            : null }
                                            { item.hasOwnProperty('icing_condition') ?
                                                <Text style={styles.text}>Icing Intensity: {item.icing_condition[0]["$"].icing_intensity[0]}</Text>
                                            : null }
                                            { item.hasOwnProperty('icing_condition') ?
                                                item.icing_condition[0]["$"].hasOwnProperty('icing_min_alt_ft_agl') ?
                                                    <Text style={styles.text}>Icing Min Altitude: {item.icing_condition[0]["$"].icing_min_alt_ft_agl[0]} ft. AGL</Text>
                                                : null
                                            : null }
                                            { item.hasOwnProperty('icing_condition') ?
                                                item.icing_condition[0]["$"].hasOwnProperty('icing_max_alt_ft_agl') ?
                                                    <Text style={styles.text}>Icing Max Altitude: {item.icing_condition[0]["$"].icing_max_alt_ft_agl[0]} ft. AGL</Text>
                                                : null
                                            : null }
                                            
                                        </View>
                                    )
                                }) }
                            </View>
                            :
                            <Text style={styles.text}>No TAF Available</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
};