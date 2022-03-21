import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen, FlightPlanScreen, SettingsScreen} from './screens';
import { getAllMetars, getAllTafs } from './components/Tools';
import airportData from './assets/airportData.json';

const Stack = createNativeStackNavigator();
const converter = require('react-native-xml2js');

async function storeObject(key, value) {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log("Store Error: ", e);
	}
};

function appendClass(data) {
	return data.map((element) => ({
		...element,
		type: airportData[element.station_id] ? airportData[element.station_id].type : null
	}));
};

export default function App() {
	useEffect(() => {
        getAllMetars().then(value => converter.parseString(value, function (err, result) {
			storeObject("@Metars", appendClass(result.response.data[0].METAR));
		}));

		getAllTafs().then(value => converter.parseString(value, function (err, result) {
			storeObject("@Tafs", appendClass(result.response.data[0].TAF));
		}));
	}, []);

	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="FlightPlan" component={FlightPlanScreen} />
				<Stack.Screen name="Settings" component={SettingsScreen} />
			</Stack.Navigator>
		</NavigationContainer>    
	);
}