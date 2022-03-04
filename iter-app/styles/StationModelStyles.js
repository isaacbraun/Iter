import { StyleSheet, Dimensions } from "react-native";
import { Colors } from '../components/Tools';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        borderRadius: 5,
        opacity: 0.9,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        height: 65,
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 2,
    },
    wx: {
        width: 20,
        height: 20,
    },
    middle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        backgroundColor: Colors.background,
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: Colors.barb,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 2,
    },

    few: {
        width: 2,
        height: 8,
        borderRadius: 5,
    },
    sct: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 5,
        height: 5,
    },
    bkn: {
        width: 12,
        height: 12,
    },
    bknOver: {
        backgroundColor: Colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        width: 6,
        height: 6.5,
    },
    ovc: {
        width: 12,
        height: 12,
    },
    ovx: {
        transform: [{ rotate: "45deg" }],
        width: 2,
        height: 11,
    },
    ovxSecond: {
        transform: [{ rotate: "90deg" }],
        width: 2,
        height: 11,
    },
    missing: {
        fontSize: 6,
    },

    windbarbContainer: {
        position: 'absolute',
        bottom: 28,
        left: 5,
    },
    windbarb: {
        width: 2,
        height: 28,
        backgroundColor: Colors.barb,
    },
    windFeather: {
        position: 'absolute',
        top: 0,
        right: -8,
        width: 2,
        height: 6,
        backgroundColor: Colors.barb,
        transform: [
            { translateX: -8 / 2 },
            { rotateZ: "-120deg" },
            { translateX: 8 / 2 },
        ],
    },
    gust: {
        backgroundColor: Colors.red,
    },
    
    right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    ceiling: {
        paddingLeft: 5,
    },
});

export default styles;