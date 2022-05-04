import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: LightColors.background,
        paddingTop: 40,
    },
    inner: {
        marginTop: 35,
        flex: 1,
        alignItems: 'center',
    },
    settingItemContainer: {
        marginBottom: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingItemText: {
        width: '40%',
        color: LightColors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    switch: {
        maxWidth: '50%',
        display: 'flex',
        flexDirection: 'row',
    },
    pathButton: {
        height: 35,
        width: '50%',

        backgroundColor: LightColors.backgroundColor,
        borderWidth: 1,
        borderColor: LightColors.text,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pathButtonLeft: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderRightWidth: 0
    },
    pathButtonRight: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderLeftWidth: 0
    },
    active: {
        borderColor: LightColors.blue,
        backgroundColor: LightColors.blue,
    },
    pathButtonText: {
        color: LightColors.text,
    },
    pathActiveText: {
        color: LightColors.background,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    main: {
        ...styles.main,
        backgroundColor: DarkColors.background,
    },
    settingItemContainer: {
        ...styles.settingItemContainer,
    },
    settingItemText: {
        ...styles.settingItemText,
        color: DarkColors.text,
    },
    pathButton: {
        ...styles.pathButton,
        backgroundColor: DarkColors.backgroundColor,
        borderColor: DarkColors.text,
    },
    active: {
        ...styles.active,
        borderColor: DarkColors.blue,
        backgroundColor: DarkColors.blue,
    },
    pathButtonText: {
        ...styles.pathButtonText,
        color: DarkColors.text,
    },
    pathActiveText: {
        ...styles.pathActiveText,
        color: DarkColors.darkText,
    },
});