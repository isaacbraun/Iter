import { StyleSheet } from "react-native";
import { Colors } from '../components/Values';
    
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
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
        overflow: 'hidden',
        paddingBottom: 5,
    },
    navbarInner: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,

        backgroundColor: Colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
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
        marginTop: 25,

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
        paddingBottom: 55,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;