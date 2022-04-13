import { StyleSheet } from "react-native";
import { Colors } from '../components/Values';

const styles = StyleSheet.create({
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
        backgroundColor: Colors.text,
    },
    startDot: {
        backgroundColor: Colors.blue,
    },
    destDot: {
        backgroundColor: Colors.green,
    },
    flowLine: {
        width: 1,
        height: 30,
        backgroundColor: Colors.text,
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
        color: Colors.text,
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
        borderColor: Colors.text,
        backgroundColor: Colors.background,
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

export default styles;