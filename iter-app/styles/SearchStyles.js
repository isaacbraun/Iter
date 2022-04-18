import { StyleSheet } from "react-native";
import { Colors } from '../tools/Values';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        height: 45,
        paddingVertical: 10,
        paddingLeft: 10,
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
        fontSize: 14,
        flex: 1,
    },
    close: {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    suggestions: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: Colors.background,
        zIndex: 5,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
});

export default styles;