import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    navbar: {
        width: '100%',
        overflow: 'hidden',
        paddingBottom: 5,
    },
    navbarInner: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 5,

        backgroundColor: LightColors.background,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    navbarText: {
        color: LightColors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    navbarButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: 45,
        width: 45,
        marginHorizontal: 10,
        paddingHorizontal: 0,

        borderRadius: 3,
        borderWidth: 0,
        borderColor: LightColors.text,
        backgroundColor: LightColors.background,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    navbarInner: {
        ...styles.navbarInner,
        backgroundColor: DarkColors.background,
    },
    navbarText: {
        ...styles.navbarText,
        color: DarkColors.text,
    },
    navbarButton: {
        ...styles.navbarButton,
        borderColor: DarkColors.text,
        backgroundColor: DarkColors.background,
    },
});