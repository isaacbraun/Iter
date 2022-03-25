import { StatusBar } from 'expo-status-bar';
import react, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen, FlightPlanScreen, SettingsScreen, DetailedViewScreen } from './screens';
import { getAllMetars, getAllTafs } from './components/Tools';
import airportData from './assets/airportData.json';

const Stack = createNativeStackNavigator();
const converter = require('react-native-xml2js');

async function storeArray(key, value) {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log("Write Error: ", e);
	}
};

function appendClass(data) {
	return data.map((element) => ({
		...element,
		type: airportData[element.station_id] ? airportData[element.station_id].type : null
	}));
};

async function mergeData() {
	try {
		let merged = [];
		const metars = await AsyncStorage.getItem('@Metars')
		const tafs = await AsyncStorage.getItem('@Tafs')
		const metarsParsed = metars != null ? JSON.parse(metars) : null;
		const tafsParsed = tafs != null ? JSON.parse(tafs) : null;

		for (const metar of metarsParsed) {
			let temp = metar;
			for (const taf of tafsParsed) {
				if (metar.station_id[0] == taf.station_id[0]) {
					temp.taf = taf;
				}
			}
			merged.push(temp);
		}
		
		storeArray("@Merged", merged);
	} catch(e) {
		console.log("Read Error: ", e);
	}
};

export default function App() {
	let merged = null;
	useEffect(() => {
        getAllMetars().then(value => converter.parseString(value, function (err, result) {
			storeArray("@Metars", appendClass(result.response.data[0].METAR));
		}));

		getAllTafs().then(value => converter.parseString(value, function (err, result) {
			storeArray("@Tafs", result.response.data[0].TAF);
		}));

		mergeData();
	}, []);

	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="FlightPlan" component={FlightPlanScreen} />
				<Stack.Screen name="Settings" component={SettingsScreen} />
				<Stack.Screen name="DetailedView" component={DetailedViewScreen} />
			</Stack.Navigator>
		</NavigationContainer>    
	);
}