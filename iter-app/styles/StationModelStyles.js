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
    },
    text: {
        fontSize: 12,
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 5,
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 18,
        height: 18,
        borderWidth: 2,
        borderRadius: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 2,
    },

    bar: {
        width: 3,
        height: 12,
        borderRadius: 5,
    },
    sct: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
    },
    bkn: {
        width: 18,
        height: 18,
    },
    bknOver: {
        backgroundColor: Colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        width: 9,
        height: 9,
    },
    ovc: {
        width: 18,
        height: 18,
    },
    ovx: {
        transform: [{ rotate: "45deg" }],
        width: 2,
        height: 17,
    },
    ovxSecond: {
        transform: [{ rotate: "90deg" }],
        width: 2,
        height: 17,
    },
    missing: {
        fontSize: 10,
    },

    windbarbContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
    },
    windbarb: {
        // position: 'relative',
        // top: 0,
        // right: 0,
        width: 2,
        height: 25,
        backgroundColor: "#000",
    },
    windFeather: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 2,
        height: 10,
        backgroundColor: '#000',
        transform: [{ rotate: "100deg" }]
    },
    gust: {
        backgroundColor: Colors.red,
    },
    
    right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5,
    },
    ceiling: {
        paddingLeft: 5,
    },
});

export default styles;