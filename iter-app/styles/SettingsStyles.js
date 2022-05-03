import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LightColors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.container,
        backgroundColor: DarkColors.background,
    },
});