import { StyleSheet, Dimensions } from "react-native";
import { Colors } from '../components/Values';

const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    station: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        marginBottom: 5,
    },
    callout: {
        width: ScreenWidth - 100,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        textDecorationLine: 'underline',
    },
});

export default styles;