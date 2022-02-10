import React, { useState } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    Keyboard
} from 'react-native';
import { Colors } from '../components/Tools';
import { HomeScreenStyles as styles } from '../styles';
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
    const [searchValue, setSearchValue] = useState(null);
    const [timelineMin, setTimelineMin] = useState(0);
    const [timelineMax, setTimelineMax] = useState(10);
    const [timelineValue, setTimelineValue] = useState(0);
    const [timelineState, setTimelineState] = useState(false);
    // let timer;

    // const playTimeline = () => {
    //     if (!timer) {
    //         setTimelineState(true);
    //         let newVal = timelineValue;
    //         if (newVal < timelineMax) {
    //             newVal++;
    //             setTimelineValue(newVal);
    //         }
    //         timer = setInterval(() => {
    //             if (newVal < timelineMax) {
    //                 newVal++;
    //                 setTimelineValue(newVal);
    //             } else {
    //                 stopTimeline();
    //             }
    //         }, 1000);
    //     }
    // };
    
    // const stopTimeline = () => {
    //     clearInterval(timer);
    //     timer = null;
    //     setTimelineState(false);
    // };

    return(
        <View style={styles.main}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.search}
                    placeholder="Search Airports"
                    placeholderTextColor={Colors.text}
                    value={searchValue}
                    onChangeText={setSearchValue}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Feather name="menu" size={24} color={ Colors.text } />
                </Pressable>
            </View>
            <View style={styles.bottom}>
                <View style={styles.buttonsContainer}>
                    <Pressable
                        style={[styles.button, {marginBottom: 15}]}
                        onPress={() => navigation.navigate('FlightPlan')}
                    >
                        <Feather name="navigation" size={24} color={ Colors.blue } />
                    </Pressable>
                    <Pressable
                        style={[styles.button, {backgroundColor: Colors.blue, marginBottom: 15}]}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Feather name="plus" size={28} color={ Colors.background } />
                    </Pressable>
                </View>
                <View style={styles.timelineContainer}>
                    <Pressable
                        style={[styles.button, styles.play]}
                        // onPress={!timelineState ? playTimeline : stopTimeline}
                    >
                        { !timelineState ?
                            <FontAwesome name="play" size={24} color={ Colors.blue } />
                            :
                            <FontAwesome name="pause" size={24} color={ Colors.blue } />
                        }
                    </Pressable>
                    <View style={styles.timeline}>
                        <Slider 
                            value={timelineValue}
                            onValueChange={setTimelineValue}
                            maximumValue={timelineMax}
                            minimumValue={timelineMin}
                            step={1}
                            allowTouchTrack
                            trackStyle={{ height: 3}}
                            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                            thumbProps={{
                              children: (
                                <FontAwesome
                                  name="circle"
                                  size={20}
                                  color={Colors.blue}
                                />
                              ),
                            }}
                        />
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{timelineValue}</Text>
                    </View>
                </View>
            </View>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}></TouchableWithoutFeedback> */}
        </View>
    );
}