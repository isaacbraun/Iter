import { StyleSheet } from "react-native";
import { Colors } from '../components/Values';

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
        flexGrow: 1,
        zIndex: 5,
    },
    search: {
        height: 45,
        flexGrow: 1,
        padding: 10,

        fontSize: 16,

        borderRadius: 3,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.text,
        borderBottomWidth: 0,
    },
    suggestions: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,

        backgroundColor: Colors.background,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        maxWidth: 300,
    },
    itemText: {

    },
});

export default styles;