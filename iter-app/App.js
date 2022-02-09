import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, FlightPlanScreen, SettingsScreen } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="FlightPlan" component={FlightPlanScreen} />
				<Stack.Screen name="Settings" component={SettingsScreen} />
			</Stack.Navigator>
		</NavigationContainer>    
	);
}