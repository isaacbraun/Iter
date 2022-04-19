/* eslint-disable no-undef */
import * as compare from '../Compare';

const kcle = {station_id: ["KCLE"]};
const kcha = {station_id: ["KCHA"]};
const klax = {station_id: ["KLAX"]};

describe("Paths Match", () => {
    // [{speed: '', alti: ''}, null, null];
    test("Main: Null Speed", () => {
        expect(compare.pathsMatch(
            [{speed: '', alti: '2000'}, kcle, kcha],
            [{speed: '300', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Altitude", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: ''}, kcle, kcha],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Origin", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, null, kcha],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Destination", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, null],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Waypoint", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, null, kcha],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Speed", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Altitude", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: ''}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Origin", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: '1000'}, null, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Destination", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: '1000'}, kcle, null],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Waypoint", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: '1000'}, kcle, null, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Origin Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, klax, kcha],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Destination Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, klax],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Origin Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: '1000'}, klax, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Destination Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: '1000'}, kcle, klax],
            false
        )).toBeFalsy();
    });
    test("Matches", () => {
        expect(compare.pathsMatch(
            [{speed: '300', alti: '2000'}, kcle, kcha],
            [{speed: '400', alti: '1000'}, kcle, kcha],
            false
        )).toBeTruthy();
    });
});

describe("Paths Exact", () => {
    test("Main Not Exact", () => {
        expect(compare.pathsExact(
            [{speed: '200', alti: '2000'}, kcle, klax, kcha],
            [{speed: '300', alti: '1000'}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate Not Exact", () => {
        expect(compare.pathsExact(
            [{speed: '200', alti: '2000'}, kcle, kcha],
            [{speed: '300', alti: '1000'}, kcle, klax, kcha],
            false
        )).toBeFalsy();
    });
    test("Exact", () => {
        expect(compare.pathsExact(
            [{speed: '200', alti: '2000'}, kcle, klax, kcha],
            [{speed: '300', alti: '1000'}, kcle, klax, kcha],
            false
        )).toBeTruthy();
    });
});