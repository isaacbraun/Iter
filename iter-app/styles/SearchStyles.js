import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        height: 45,
        paddingVertical: 10,
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderRadius: 3,
        backgroundColor: LightColors.background,
        borderBottomColor: LightColors.text,
        borderBottomWidth: 0,
    },
    searchInner: {
        fontSize: 14,
        flex: 1,
        color: LightColors.text,
    },
    close: {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    suggestions: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: LightColors.background,
        zIndex: 5,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    search: {
        ...styles.search,
        backgroundColor: DarkColors.background,
        borderBottomColor: DarkColors.text,
    },
    searchInner: {
        ...styles.searchInner,
        color: DarkColors.text,
    },
    suggestions: {
        ...styles.suggestions,
        backgroundColor: DarkColors.background,
    },
});