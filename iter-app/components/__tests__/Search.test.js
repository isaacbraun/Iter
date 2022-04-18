/* eslint-disable no-undef */
import { matches } from '../Search';

const cleveland = {
    station_id: ["KCLE"],
    iata: "CLE",
    name: "Cleveland Hopkins International Airport",
    municipality: 'Cleveland'
};
const sanJose = {
    station_id: ["MROC"],
    iata: "SJO",
    name: "Juan Santamaria International Airport",
    municipality: 'San Jose'
};
const chatt = {
    station_id: ["KCHA"],
    iata: "CHA",
    name: "Lovell Field",
    municipality: 'Chattanooga'
};

describe("Matches Function", () => {
    test("Partial Lowercase ICAO Code", () => {
        expect(matches(cleveland, "kc")).toBeTruthy();
    });
    test("Partial Uppercase ICAO Code", () => {
        expect(matches(cleveland, "LE")).toBeTruthy();
    });
    test("Complete Lowercase ICAO Code CLE", () => {
        expect(matches(cleveland, "kcle")).toBeTruthy();
    });
    test("Complete Lowercase ICAO Code CHA", () => {
        expect(matches(chatt, "kcha")).toBeTruthy();
    });
    test("Complete Lowercase ICAO Code SJO", () => {
        expect(matches(sanJose, "mroc")).toBeTruthy();
    });
    test("Complete Uppercase ICAO Code", () => {
        expect(matches(cleveland, "KCLE")).toBeTruthy();
    });
    test("Incorrect ICAO Code", () => {
        expect(matches(cleveland, "KLAX")).toBeFalsy();
    });
    test("Partial Lowercase IATA Code", () => {
        expect(matches(cleveland, "cl")).toBeTruthy();
    });
    test("Partial Uppercase IATA Code", () => {
        expect(matches(cleveland, "CL")).toBeTruthy();
    });
    test("Complete Lowercase IATA Code CLE", () => {
        expect(matches(cleveland, "cle")).toBeTruthy();
    });
    test("Complete Lowercase IATA Code CHA", () => {
        expect(matches(chatt, "cha")).toBeTruthy();
    });
    test("Complete Lowercase IATA Code SJO", () => {
        expect(matches(sanJose, "sjo")).toBeTruthy();
    });
    test("Complete Uppercase IATA Code", () => {
        expect(matches(cleveland, "CLE")).toBeTruthy();
    });
    test("Incorrect IATA Code", () => {
        expect(matches(cleveland, "LAX")).toBeFalsy();
    });
    test("Partial Lowercase Name 1", () => {
        expect(matches(cleveland, "Cleveland")).toBeTruthy();
    });
    test("Partial Uppercase Name 1", () => {
        expect(matches(cleveland, "CLEVELAND")).toBeTruthy();
    });
    test("Partial Lowercase Name 2", () => {
        expect(matches(cleveland, "hopkins")).toBeTruthy();
    });
    test("Partial Uppercase Name 2", () => {
        expect(matches(cleveland, "HOPKINS")).toBeTruthy();
    });
    test("Complete Lowercase Name", () => {
        expect(matches(cleveland, "Cleveland Hopkins International Airport")).toBeTruthy();
    });
    test("Complete Uppercase Name", () => {
        expect(matches(cleveland, "CLEVELAND HOPKINS INTERNATIONAL AIRPORT")).toBeTruthy();
    });
    test("Incorrect Name", () => {
        expect(matches(cleveland, "Los angeles")).toBeFalsy();
    });
    test("Partial Lowercase Municipality CLE", () => {
        expect(matches(cleveland, "land")).toBeTruthy();
    });
    test("Partial Lowercase Municipality CHA", () => {
        expect(matches(chatt, "chatt")).toBeTruthy();
    });
    test("Partial Lowercase Municipality SJO", () => {
        expect(matches(sanJose, "san")).toBeTruthy();
    });
    test("Partial Uppercase Municipality", () => {
        expect(matches(cleveland, "LAND")).toBeTruthy();
    });
    test("Complete Lowercase Municipality", () => {
        expect(matches(cleveland, "cleveland")).toBeTruthy();
    });
    test("Complete Uppercase Municipality", () => {
        expect(matches(cleveland, "CLEVELAND")).toBeTruthy();
    });
    test("Incorrect Municipality", () => {
        expect(matches(cleveland, "Chattanooga")).toBeFalsy();
    });
});