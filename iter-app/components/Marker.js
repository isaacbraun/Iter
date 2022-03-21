import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import StationModel from '../components/StationModel';
import { HomeScreenStyles as styles } from '../styles';

export default function Maker(props) {
    return (
        <Marker
            coordinate={{
                latitude: Number(props.marker.latitude[0]),
                longitude: Number(props.marker.longitude[0]),
                latitudeDelta: 0.06,
                longitudeDelta: 0.04,
            }}
            tracksViewChanges={false}
        >
            <StationModel
                {...props.marker}
            />
            <Callout>
                <View style={styles.callout}>
                    <Text style={{marginBottom: 10}}>{props.marker.station_id[0]}</Text>
                    <Text>{props.marker.raw_text[0]}</Text>
                </View>
            </Callout>
        </Marker>
    )
};