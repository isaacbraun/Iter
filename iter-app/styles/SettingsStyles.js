import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: LightColors.background,
        alignItems: 'center',
        paddingTop: 40,
    },
    theme: {
        flex: 1,
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    themeToggle: {
        color: LightColors.text,
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export const darkStyles = StyleSheet.create({
    ...styles,
    main: {
        ...styles.main,
        backgroundColor: DarkColors.background,
    },
    theme: {
        ...styles.theme,
    },
});