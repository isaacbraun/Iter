import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HomeScreen, FlightPlanScreen, SettingsScreen, DetailedViewScreen } from './screens';

import { getAllMetars, getAllTafs } from './components/Tools';
import airportData from './assets/airportData.json';

const Stack = createNativeStackNavigator();
// eslint-disable-next-line no-undef
const converter = require('react-native-xml2js');

async function storeArray(key, value) {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log("Store Write Error: ", e);
	}
}

function appendClass(data) {
	return data.map((element) => ({
		...element,
		type: airportData[element.station_id] ? airportData[element.station_id].type : null,
		iata: airportData[element.station_id] ? airportData[element.station_id].iata_code : null
	}));
}

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
				if (Object.prototype.hasOwnProperty.call(metar, "station_id") && Object.prototype.hasOwnProperty.call(taf, "station_id")) {
					if (metar.station_id[0] == taf.station_id[0]) {
						temp.taf = taf;
					}
				}
			}
			merged.push(temp);
		}
		
		storeArray("@Merged", merged);
	} catch(e) {
		console.log("Merge Read Error: ", e);
	}
}

function getSearchData() {
	let searchArray = [];
	for (const [key, value] of Object.entries(airportData)) {
		searchArray.push({
			iata: value.iata_code,
			icao: key,
			name: value.name,
		})
	}
	storeArray("@Search", searchArray);
}

export default function App() {
	const [tempMetars, setTempMetars] = useState(null);
	const [tempTafs, setTempTafs] = useState(null);	
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			await getAllMetars().then(value => converter.parseString(value, function (err, result) {
				setTempMetars(result.response.data[0].METAR);
			}));
	
			await getAllTafs().then(value => converter.parseString(value, function (err, result) {
				setTempTafs(result.response.data[0].TAF);
			}));
	
			storeArray("@Metars", appendClass(tempMetars));
			storeArray("@Tafs", tempTafs);
			mergeData();
			getSearchData();
		};

		getData();
		setLoading(false);
	}, [tempMetars, tempTafs]);

	return (
		<NavigationContainer>
			<StatusBar style="auto" />

			{ loading ?
				<SettingsScreen />
				:
				<Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="FlightPlan" component={FlightPlanScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
					<Stack.Screen name="DetailedView" component={DetailedViewScreen} />
				</Stack.Navigator>
			}
		</NavigationContainer>
	);
}