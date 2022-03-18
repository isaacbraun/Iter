import { StyleSheet, Dimensions } from "react-native";
import { Colors } from '../components/Values';

const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: 45,
        width: 45,

        borderRadius: 3,
        backgroundColor: Colors.background,
    },

    map: {
        width: ScreenWidth,
        height: Dimensions.get('window').height,
        zIndex: 0,
    },
    callout: {
        width: ScreenWidth - 100,
    },
    
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 45,
        width: ScreenWidth,
        top: 44,
        position: 'absolute',
        paddingHorizontal: 15,
        zIndex: 1,
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

    loading: {
        position: 'absolute',
        top: 104,
        zIndex: 1,

        width: ScreenWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '15%',

        borderRadius: 3,
        backgroundColor: Colors.background,
    },
    
    buttonsContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        width: 45,
        position: 'absolute',
        bottom: 100,
        right: 15,
        zIndex: 3,
    },
    timelineContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,

        height: 45,
        width: ScreenWidth - 30,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        zIndex: 1,

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