import { StyleSheet } from "react-native";
import { Colors } from '../components/Values';

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
        marginLeft: 5,
        marginBottom: 5,
    },

    header: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    text: {
        color: Colors.text,
        fontSize: 15,
        marginBottom: 3,
    },    
});

export default styles;