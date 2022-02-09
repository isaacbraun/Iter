import { Text, View, Pressable } from 'react-native';
import { SettingsStyles as styles } from '../styles';

export default function SettingsScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text>Go to Home</Text>
            </Pressable>
        </View>
    );
}