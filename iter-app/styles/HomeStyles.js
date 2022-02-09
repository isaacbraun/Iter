import { StyleSheet } from "react-native";
import { Colors } from '../components/Tools';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 44,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: 45,
        width: 45,

        borderRadius: 3,
        backgroundColor: Colors.background
    },
    
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 45,
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 15,

    },
    search: {
        height: 45,
        flexGrow: 1,
        marginRight: 15,
        padding: 10,

        fontSize: 16,

        borderRadius: 3,
        backgroundColor: Colors.background,
    },
    searchText: {
        color: Colors.text,
        marginLeft: 15,
    },
    
    bottom: {
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 30,

    },
    buttonsContainer: {
        display: 'flex',
        alignItems: 'flex-end',

        width: '100%',
    },
    timelineContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 45,
        width: '100%',
        paddingHorizontal: 10,

        borderRadius: 3,
        backgroundColor: Colors.background,
    },
    play: {
        width: 24,
        height: 45,
    },
    timeline: {
        flexGrow: 1,
        marginHorizontal: 15,
    },
    timeContainer: {
        // width: 40,
    },
    time: {
        fontSize: 16,
        color: Colors.text,
    },
});

export default styles;