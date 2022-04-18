import { StyleSheet } from "react-native";
import { Colors } from '../tools/Values';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    inner: {
        margin: 30,
    },
    container: {
        marginBottom: 15,
    },
    forecast: {
        marginLeft: 10,
        marginBottom: 10,
    },

    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeading: {
        fontWeight: 'bold',
    },
    text: {
        color: Colors.text,
        fontSize: 15,
        marginBottom: 3,
    },    
});

export default styles;