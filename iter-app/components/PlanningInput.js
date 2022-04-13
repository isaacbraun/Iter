/* eslint-disable react/prop-types */
import React from 'react';
import {
    Text,
    View,
    Pressable,
} from 'react-native';
import Search from '../components/Search';
import { Feather } from '@expo/vector-icons';
import { PlanningInputStyles as styles } from '../styles';
import { Colors } from '../components/Values';

export default function PlanningInput(props) {
    let inputText = "Midpoint";
    if (props.start) {
        inputText = "Start";
    }
    else if (props.dest) {
        inputText = "Destination";
    }

    return(
        <View style={styles.input}>
            <View style={styles.flow}>
                <View
                    style={[
                        styles.flowLine,
                        props.start ? styles.flowLineHidden : null
                    ]}
                />
                <View
                    style={[
                        styles.flowDot,
                        props.start ? styles.startDot : null,
                        props.dest ? styles.destDot : null,
                    ]}
                />
                <View
                    style={[
                        styles.flowLine,
                        props.dest ? styles.flowLineHidden : null
                    ]}
                />
            </View>
            <View style={styles.inputInner}>
                <Text style={styles.inputText}>{inputText}</Text>
                <View style={styles.inputBoxContainer}>
                    <Search
                        style={styles.inputBox}
                        // value={props.item != {} ? `${props.item.station_id[0]}: ${props.item.name}` : ''}
                        placeholder={false}
                        function={(item) => { props.select(item, props.index) }}
                        amount={6}
                    />
                    <Pressable
                        style={styles.pathAction}
                        onPress={
                            !props.start ?
                                props.dest ? () => props.add(props.index) : () => props.remove(props.index)
                            : null
                        }
                    >
                        { !props.start ?
                            <Feather name={props.dest ? "plus" : "minus"} size={32} color={ props.dest ? Colors.blue : Colors.text } /> : null
                        }
                    </Pressable>
                </View>
            </View>
        </View>
    )
}