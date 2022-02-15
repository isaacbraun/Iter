import React, { useState } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { FlightPlanStyles as styles } from '../styles';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Colors } from '../components/Tools';

export default function FlightPlanScreen({ navigation }) {
    const [alternateActive, setAlternateActive] = useState(false);
    const [mainActive, setMainActive] = useState(true);

    const selectAlternate = () => {
        setMainActive(false);
        setAlternateActive(true);
    };
    const selectMain = () => {
        setAlternateActive(false);
        setMainActive(true);
    };

    const [startValue, setStartValue] = useState('');

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
                {/* Main Innter Path Container */}
                <View style={styles.inner}>

                    {/* Navbar */}
                    <View style={styles.navbar}>
                        <Pressable
                            style={[styles.button, styles.navbarButton]}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Ionicons name="ios-arrow-back" size={24} color={Colors.blue} />
                        </Pressable>
                        <Text style={styles.navbarText}>Chart Paths</Text>
                        <Pressable
                            style={[styles.button, styles.navbarButton]}
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Feather name="menu" size={24} color={ Colors.text } />
                        </Pressable>
                    </View>

                    {/* Path Toggle Switch */}
                    <View style={styles.pathSwitch}>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopLeftRadius: 3, borderBottomLeftRadius: 3, borderRightWidth: 0},
                                alternateActive ? styles.pathActive : null
                            ]}
                            onPress={selectAlternate}
                        >
                            <Text style={[styles.pathButtonText, alternateActive ? styles.pathActiveText : null]}>Alternate Path</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopRightRadius: 3, borderBottomRightRadius: 3, borderLeftWidth: 0},
                                mainActive ? styles.pathActive : null
                            ]}
                            onPress={selectMain}
                        >
                            <Text style={[styles.pathButtonText, mainActive ? styles.pathActiveText : null]}>Main Path</Text>
                        </Pressable>
                    </View>

                    {/* Path Inputs */}
                    <View style={styles.inputsContainer}>

                        {/* Start Input */}
                        <View style={styles.input}>
                            <View style={styles.flow}>
                                <View style={[styles.flowLine, styles.flowLineHidden]} />
                                <View style={[styles.flowDot, styles.startDot]} />
                                <View style={styles.flowLine} />
                            </View>
                            <View style={styles.inputInner}>
                                <Text style={styles.inputText}>Destination</Text>
                                <View style={styles.inputBoxContainer}>
                                    <TextInput
                                        style={styles.inputBox}
                                        value={startValue}
                                        color={Colors.text}
                                        onChangeText={setStartValue}
                                    />
                                    <Pressable style={styles.pathAction} onPress={null} />
                                </View>
                            </View>
                        </View>

                        {/* Middle Input */}
                        <View style={styles.input}>
                            <View style={styles.flow}>
                                <View style={styles.flowLine} />
                                <View style={styles.flowDot} />
                                <View style={styles.flowLine} />
                            </View>
                            <View style={styles.inputInner}>
                                <Text style={styles.inputText}>Midpoint</Text>
                                <View style={styles.inputBoxContainer}>
                                    <TextInput
                                        style={styles.inputBox}
                                        value={startValue}
                                        color={Colors.text}
                                        onChangeText={setStartValue}
                                    />
                                    <Pressable
                                        style={styles.pathAction}
                                        onPress={null}
                                    >
                                        <Feather name="minus" size={32} color={ Colors.text } />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        
                        {/* Destination Input */}
                        <View style={styles.input}>
                            <View style={styles.flow}>
                                <View style={styles.flowLine} />    
                                <View style={[styles.flowDot, styles.destDot]} />
                                <View style={[styles.flowLine, styles.flowLineHidden]} />
                            </View>
                            <View style={styles.inputInner}>
                                <Text style={styles.inputText}>Destination</Text>
                                <View style={styles.inputBoxContainer}>
                                    <TextInput
                                        style={styles.inputBox}
                                        value={startValue}
                                        color={Colors.text}
                                        onChangeText={setStartValue}
                                    />
                                    <Pressable
                                        style={styles.pathAction}
                                        onPress={null}
                                    >
                                        <Feather name="plus" size={32} color={ Colors.blue } />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bottom Action Buttons */}
                <View style={styles.bottom}>
                    <Pressable
                        style={styles.button}
                        onPress={selectAlternate}
                    >
                        <Text style={styles.buttonText}>More</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, {borderColor: Colors.blue}]}
                        onPress={selectAlternate}
                    >
                        <Text style={styles.buttonText}>Evaluate</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, {borderColor: Colors.blue, backgroundColor: Colors.blue}]}
                        onPress={selectAlternate}
                    >
                        <Text style={[styles.buttonText, {color: Colors.background}]}>View</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}