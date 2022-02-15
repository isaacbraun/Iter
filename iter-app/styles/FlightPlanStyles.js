import { StyleSheet } from "react-native";
import { Colors } from '../components/Tools';
    
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 44,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: 45,
        marginHorizontal: 10,
        paddingHorizontal: 20,

        borderRadius: 3,
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.background
    },
    buttonText: {
        color: Colors.text,
    },

    inner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    navbar: {
        width: '100%',
        paddingBottom: 15,

        borderBottomColor: Colors.text,
        borderBottomWidth: 1,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navbarText: {
        color: Colors.text,
        fontSize: 16,
    },
    navbarButton: {
        width: 45,
        height: 45,
        paddingHorizontal: 0,
        borderWidth: 0,
    },

    pathSwitch: {
        height: 45,
        width: '85%',
        marginTop: 30,

        display: 'flex',
        flexDirection: 'row',
    },
    pathButton: {
        height: 45,
        width: '50%',

        backgroundColor: Colors.backgroundColor,
        borderWidth: 1,
        borderColor: Colors.text,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pathActive: {
        borderColor: Colors.green,
        backgroundColor: Colors.green,
    },
    pathButtonText: {
        color: Colors.text,
    },
    pathActiveText: {
        color: Colors.background,
    },

    inputsContainer: {
        marginTop: 30,
        paddingHorizontal: 15,
        width: '100%',

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
        alignItems: 'center',
    },
    inputBox: {
        height: 45,
        flexGrow: 1,
        // marginRight: 15,
        padding: 10,

        fontSize: 16,

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
    

    bottom: {
        width: '100%',
        height: 45,
        paddingHorizontal: 15,
        paddingBottom: 60,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;