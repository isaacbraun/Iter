import { StyleSheet } from "react-native";
import { Colors } from '../tools/Values';
    
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
    disabled: {
        borderColor: '#383838',
        backgroundColor: Colors.text,
    },

    inner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
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
        paddingBottom: 5,

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
    mainActive: {
        borderColor: Colors.blue,
        backgroundColor: Colors.blue,
    },
    altActive: {
        borderColor: Colors.green,
        backgroundColor: Colors.green,
    },
    pathButtonText: {
        color: Colors.text,
    },
    pathActiveText: {
        color: Colors.background,
    },

    speedAlti: {
        width: '85%',
        marginTop: 25,

        display: 'flex',
        flexDirection: 'row',
    },
    speedAltiInner: {
        flex: 1,
    },
    speedAltiInput: {
        height: 45,
        padding: 10,
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
    inputsSpacer: {
        height: 200,
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