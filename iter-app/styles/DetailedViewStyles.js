import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: LightColors.background,
        paddingTop: 40,
    },
    inner: {
        margin: 30,
    },
    container: {
        marginBottom: 15,
    },
    forecast: {
        marginLeft: 10,
        marginBottom: 10,
    },

    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeading: {
        fontWeight: 'bold',
    },
    text: {
        color: LightColors.text,
        fontSize: 15,
        marginBottom: 3,
    },    
});

export const darkStyles = StyleSheet.create({
    ...styles,
    main: {
        ...styles.main,
        backgroundColor: DarkColors.background,
    },
    text: {
        ...styles.text,
        color: DarkColors.text,
    },
});