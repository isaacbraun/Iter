import { StyleSheet, Dimensions } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

const ScreenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    station: {
        fontWeight: 'bold',
    },
    text: {
        marginBottom: 5,
        color: LightColors.text,
    },
    callout: {
        width: ScreenWidth - 75,
        backgroundColor: LightColors.background,
        borderColor: LightColors.background,
        margin: -30,
        padding: 30
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        textDecorationLine: 'underline',
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    text: {
        ...styles.text,
        color: DarkColors.text,
    },
    callout: {
        ...styles.callout,
        backgroundColor: DarkColors.background,
        borderColor: DarkColors.background,
    },
});