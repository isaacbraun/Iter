/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
    Text,
    View,
    Pressable,
} from 'react-native';
import { Colors } from '../tools/Values';
import Search from './Search';
import { Feather } from '@expo/vector-icons';
import { PlanningInputStyles as styles } from '../styles';

export default function PlanningInput(props) {
    const [value, setValue] = useState(props.value ? props.value : '');

    let inputText = "Midpoint";
    if (props.start) {
        inputText = "Start";
    }
    else if (props.dest) {
        inputText = "Destination";
    }

    return(
        <View style={[styles.input, {zIndex: props.len - props.index}]}>
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
                        value={value}
                        placeholder={false}
                        function={(item) => { props.select(item, props.index) }}
                        amount={6}
                        clear={() => props.clear(props.index)}
                    />
                    <Pressable
                        style={styles.pathAction}
                        onPress={
                            !props.start ?
                                () => {
                                    setValue('');
                                    props.dest ? props.add(props.index) : props.remove(props.index)
                                }
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