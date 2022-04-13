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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderRadius: 3,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.text,
        borderBottomWidth: 0,
    },
    searchInner: {
        fontSize: 16,
        maxWidth: 225,
    },
    searchClose: {

    },
    suggestions: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,

        backgroundColor: Colors.background,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        maxWidth: 250,
    },
    itemText: {

    },
});

export default styles;