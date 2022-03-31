import { StyleSheet } from "react-native";
import { Colors } from '../components/Values';

const styles = StyleSheet.create({
    container: {
        height: 45,
        flexGrow: 1,
        marginRight: 15,
        padding: 10,

        fontSize: 16,

        borderRadius: 3,
        backgroundColor: Colors.background,
    },
});

export default styles;