import { Text, View, Pressable } from 'react-native';
import { FlightPlanStyles as styles } from '../styles';

export default function FlightPlanScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Flight Plan Screen</Text>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text>Go to Home</Text>
            </Pressable>
        </View>
    );
}