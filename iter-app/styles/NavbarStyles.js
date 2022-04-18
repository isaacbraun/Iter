import { StyleSheet } from "react-native";
import { Colors } from '../tools/Values';

const styles = StyleSheet.create({
    navbar: {
        width: '100%',
        overflow: 'hidden',
        paddingBottom: 5,
    },
    navbarInner: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 5,

        backgroundColor: Colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    navbarText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    navbarButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: 45,
        width: 45,
        marginHorizontal: 10,
        paddingHorizontal: 0,

        borderRadius: 3,
        borderWidth: 0,
        borderColor: Colors.text,
        backgroundColor: Colors.background,
    },
});

export default styles;