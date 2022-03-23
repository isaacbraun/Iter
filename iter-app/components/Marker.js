import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import StationModel from '../components/StationModel';
import { MarkerStyles as styles } from '../styles';

export default function CustomMarker(props) {
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
                marker={props.marker}
                hour={props.hour}
            />
            <Callout>
                <View style={styles.callout}>
                    <Text style={styles.station}>{props.marker.station_id[0]}</Text>
                    <Text>{props.marker.raw_text[0]}</Text>
                    <Pressable style={styles.button} onPress={() => props.navigation.navigate('DetailedView', { data: props.marker })}>
                        <Text style={styles.buttonText}>View More Details</Text>
                    </Pressable>
                </View>
            </Callout>
        </Marker>
    )
};