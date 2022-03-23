import { Text, View, Pressable } from 'react-native';
import { DetailedViewStyles as styles } from '../styles';

export default function DetailedViewScreen({ route, navigation }) {
    const { data } = route.params;

    return(
        <View style={styles.container}>
            <Text>Detailed View {data.station_id[0]}</Text>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text>Go to Home</Text>
            </Pressable>
        </View>
    );
}