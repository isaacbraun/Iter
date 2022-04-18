import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HomeScreen, FlightPlanScreen, SettingsScreen, DetailedViewScreen, SplashScreen } from './screens';
import { getAllMetars, getAllTafs } from './tools/Tools';
import airportData from './assets/airportData.json';

// eslint-disable-next-line no-undef
const converter = require('react-native-xml2js');
const Stack = createNativeStackNavigator();

async function storeArray(key, value) {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log("Store Write Error: ", e);
	}
}

async function mergeData(metars, tafs) {
	try {
		let merged = [];

		if (metars) {
			for (const metar of metars) {
				let temp = metar;

				temp.type = airportData[temp.station_id] ? airportData[temp.station_id].type : null,
				temp.name = airportData[temp.station_id] ? airportData[temp.station_id].name : null,
				temp.municipality = airportData[temp.station_id] ? airportData[temp.station_id].municipality : null,
				temp.iata = airportData[temp.station_id] ? airportData[temp.station_id].iata_code : null

				if (tafs) {
					for (const taf of tafs) {
						if (Object.prototype.hasOwnProperty.call(temp, "station_id") && Object.prototype.hasOwnProperty.call(taf, "station_id")) {
							if (temp.station_id[0] == taf.station_id[0]) {
								temp.taf = taf;
							}
						}
					}
				} else {
					console.error("Tafs is Null");
				}

				merged.push(temp);
			}
		} else {
			console.error("Metars is Null");
		}
		
		storeArray("@Merged", merged);
	} catch(e) {
		console.log("Merge Read Error: ", e);
	}
}

export default function App() {
	const [metars, setMetars] = useState(null);
	const [tafs, setTafs] = useState(null);
	const [retrieved, setRetrieved] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			await getAllMetars().then(value => converter.parseString(value, function (err, result) {
				setMetars(result.response.data[0].METAR);
			}));
	
			await getAllTafs().then(value => converter.parseString(value, function (err, result) {
				setTafs(result.response.data[0].TAF);
			}));
			setRetrieved(true);
		};

		getData();
	}, []);

	useEffect(() => {
		if (retrieved) {
			mergeData(metars, tafs);
			setLoading(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [retrieved])

	return (
		<NavigationContainer>
			<StatusBar style="auto" />

			{ loading ?
				<SplashScreen />
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