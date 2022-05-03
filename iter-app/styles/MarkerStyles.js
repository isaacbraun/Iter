import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../tools/Values";

const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    station: {
        fontWeight: 'bold',
    },
    text: {
        marginBottom: 5,
        color: Colors.text,
    },
    callout: {
        width: ScreenWidth - 100,
        backgroundColor: Colors.background,
        borderColor: Colors.background,
        margin: -30,
        padding: 30
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        textDecorationLine: 'underline',
    },
});

export default styles;