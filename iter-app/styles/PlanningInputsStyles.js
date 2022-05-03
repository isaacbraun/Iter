import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';

export const styles = StyleSheet.create({
    inputsContainer: {
        marginTop: 30,
        paddingHorizontal: 15,
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        height: 82,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    flow: {
        width: 15,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flowDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginVertical: 5,
        backgroundColor: LightColors.text,
    },
    startDot: {
        backgroundColor: LightColors.blue,
    },
    destDot: {
        backgroundColor: LightColors.green,
    },
    flowLine: {
        width: 1,
        height: 30,
        backgroundColor: LightColors.text,
    },
    flowLineHidden: {
        opacity: 0,
    },
    inputInner: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 15,
    },
    inputText: {
        marginBottom: 5,
        color: LightColors.text,
    },
    inputBoxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    inputBox: {
        flexGrow: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: LightColors.text,
        backgroundColor: LightColors.background,
    },
    pathAction: {
        height: 45,
        width: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    flowDot: {
        ...styles.flowDot,
        backgroundColor: DarkColors.text,
    },
    startDot: {
        ...styles.startDot,
        backgroundColor: DarkColors.blue,
    },
    destDot: {
        ...styles.destDot,
        backgroundColor: DarkColors.green,
    },
    flowLine: {
        ...styles.flowLine,
        backgroundColor: DarkColors.text,
    },
    inputText: {
        ...styles.inputText,
        color: DarkColors.text,
    },
    inputBox: {
        ...styles.inputBox,
        borderColor: DarkColors.text,
        backgroundColor: DarkColors.background,
    },
});