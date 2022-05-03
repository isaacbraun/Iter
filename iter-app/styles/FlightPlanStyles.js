import { StyleSheet } from "react-native";
import { LightColors, DarkColors } from '../tools/Values';
    
export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: LightColors.background,
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
        borderColor: LightColors.text,
        backgroundColor: LightColors.background
    },
    buttonText: {
        color: LightColors.text,
    },
    disabled: {
        backgroundColor: "#959696",
        borderColor: LightColors.text,
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

        backgroundColor: LightColors.background,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    navbarText: {
        color: LightColors.text,
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
        marginBottom: 15,

        display: 'flex',
        flexDirection: 'row',
    },
    pathButton: {
        height: 45,
        width: '50%',

        backgroundColor: LightColors.backgroundColor,
        borderWidth: 1,
        borderColor: LightColors.text,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainActive: {
        borderColor: LightColors.blue,
        backgroundColor: LightColors.blue,
    },
    altActive: {
        borderColor: LightColors.green,
        backgroundColor: LightColors.green,
    },
    pathButtonText: {
        color: LightColors.text,
    },
    pathActiveText: {
        color: LightColors.background,
    },

    compareResult: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
        width: '85%',
        height: 45,

        borderRadius: 3,
        borderWidth: 1,
    },
    compareResultText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    speedAlti: {
        width: '85%',
        marginTop: 15,
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
        color: LightColors.text,
    },
    inputsSpacer: {
        height: 200,
    },

    date: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: LightColors.text,
        backgroundColor: LightColors.background,
        height: 45,
    },
    dateText: {
        padding: 10,
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

export const darkStyles = StyleSheet.create({
    ...styles,
    main: {
        ...styles.main,
        backgroundColor: DarkColors.background,
    },
    button: {
        ...styles.button,
        borderColor: DarkColors.text,
        backgroundColor: DarkColors.background
    },
    buttonText: {
        ...styles.buttonText,
        color: DarkColors.text,
    },
    disabled: {
        ...styles.disabled,
        borderColor: DarkColors.text,
    },
    navbarInner: {
        ...styles.navbarInner,
        backgroundColor: DarkColors.background,
    },
    navbarText: {
        ...styles.navbarText,
        color: DarkColors.text,
    },
    pathButton: {
        ...styles.pathButton,
        backgroundColor: DarkColors.backgroundColor,
        borderColor: DarkColors.text,
    },
    mainActive: {
        ...styles.mainActive,
        borderColor: DarkColors.blue,
        backgroundColor: DarkColors.blue,
    },
    altActive: {
        ...styles.altActive,
        borderColor: DarkColors.green,
        backgroundColor: DarkColors.green,
    },
    pathButtonText: {
        ...styles.pathButtonText,
        color: DarkColors.text,
    },
    pathActiveText: {
        ...styles.pathActiveText,
        color: DarkColors.background,
    },
    inputText: {
        ...styles.inputText,
        color: DarkColors.text,
    },
    inputBox: {
        ...styles.inputBox,
        borderColor: DarkColors.text,
        backgroundColor: DarkColors.background,
        color: DarkColors.text
    },
    date: {
        ...styles.date,
        borderColor: DarkColors.text,
        backgroundColor: DarkColors.background,
    },
    dateText: {
        ...styles.dateText,
        color: DarkColors.text,
    }
});