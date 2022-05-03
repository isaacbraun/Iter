/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
    Text,
    View,
    Pressable,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LightColors, DarkColors } from '../tools/Values';
import Search from './Search';
import { Feather } from '@expo/vector-icons';
import { PlanningInputsStyles, PlanningInputsStylesDark } from '../styles';

function Input(props) {
    const [value, setValue] = useState(props.value ? props.value : '');
    const Colors = props.theme ? DarkColors : LightColors;
    const styles = props.theme ? PlanningInputsStylesDark : PlanningInputsStyles;

    let inputText = "Waypoint";
    if (props.start) {
        inputText = "Origin";
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
                        theme={props.theme}
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

export default function PlanningInputs(props) {
    const styles = props.theme ? PlanningInputsStylesDark : PlanningInputsStyles;

    return(
        <KeyboardAwareScrollView
            style={styles.inputsContainer}
            keyboardDismissMode={false}
        >
            { props.pathArray.map((item, index) => {
                if (index != 0) {
                    return(
                        <Input
                            key={Math.random(index)}
                            index={index}
                            len={props.pathArray.length}
                            item={item}
                            value={item != null ? `${item.station_id[0]}: ${item.name}` : ''}
                            start={index == 1}
                            dest={index == props.pathArray.length - 1}
                            select={props.select}
                            add={props.add}
                            remove={props.remove}
                            clear={props.clear}
                            theme={props.theme}
                        />
                    )
                }
            })}
        </KeyboardAwareScrollView>
    )
}