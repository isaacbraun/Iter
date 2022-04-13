/* eslint-disable no-undef */
import { matches } from '../Search';

const airport = {
    station_id: ["KCLE"],
    iata: "CLE",
    name: "Cleveland Hopkins International Airport",
    municipality: 'Cleveland'
};

describe("Matches Function", () => {
    test("Partial Lowercase ICAO Code", () => {
        expect(matches(airport, "kc")).toBeTruthy();
    });
    test("Partial Uppercase ICAO Code", () => {
        expect(matches(airport, "LE")).toBeTruthy();
    });
    test("Complete Lowercase ICAO Code", () => {
        expect(matches(airport, "kcle")).toBeTruthy();
    });
    test("Complete Uppercase ICAO Code", () => {
        expect(matches(airport, "KCLE")).toBeTruthy();
    });
    test("Incorrect ICAO Code", () => {
        expect(matches(airport, "KLAX")).toBeFalsy();
    });
    test("Partial Lowercase IATA Code", () => {
        expect(matches(airport, "cl")).toBeTruthy();
    });
    test("Partial Uppercase IATA Code", () => {
        expect(matches(airport, "CL")).toBeTruthy();
    });
    test("Complete Lowercase IATA Code", () => {
        expect(matches(airport, "cle")).toBeTruthy();
    });
    test("Complete Uppercase IATA Code", () => {
        expect(matches(airport, "CLE")).toBeTruthy();
    });
    test("Incorrect IATA Code", () => {
        expect(matches(airport, "LAX")).toBeFalsy();
    });
    test("Partial Lowercase Name 1", () => {
        expect(matches(airport, "Cleveland")).toBeTruthy();
    });
    test("Partial Uppercase Name 1", () => {
        expect(matches(airport, "CLEVELAND")).toBeTruthy();
    });
    test("Partial Lowercase Name 2", () => {
        expect(matches(airport, "hopkins")).toBeTruthy();
    });
    test("Partial Uppercase Name 2", () => {
        expect(matches(airport, "HOPKINS")).toBeTruthy();
    });
    test("Complete Lowercase Name", () => {
        expect(matches(airport, "Cleveland Hopkins International Airport")).toBeTruthy();
    });
    test("Complete Uppercase Name", () => {
        expect(matches(airport, "CLEVELAND HOPKINS INTERNATIONAL AIRPORT")).toBeTruthy();
    });
    test("Incorrect Name", () => {
        expect(matches(airport, "Los angeles")).toBeFalsy();
    });
    test("Partial Lowercase Municipality", () => {
        expect(matches(airport, "land")).toBeTruthy();
    });
    test("Partial Uppercase Municipality", () => {
        expect(matches(airport, "LAND")).toBeTruthy();
    });
    test("Complete Lowercase Municipality", () => {
        expect(matches(airport, "cleveland")).toBeTruthy();
    });
    test("Complete Uppercase Municipality", () => {
        expect(matches(airport, "CLEVELAND")).toBeTruthy();
    });
    test("Incorrect Municipality", () => {
        expect(matches(airport, "Chattanooga")).toBeFalsy();
    });
});