/* eslint-disable no-undef */
import * as compare from '../Compare';

const kcle = {station_id: ["KCLE"]};
const kcha = {station_id: ["KCHA"]};
const klax = {station_id: ["KLAX"]};

describe("Paths Match", () => {
    test("Main: Null Speed", () => {
        expect(compare.pathsMatch(
            [{speed: '', date: new Date()}, kcle, kcha],
            [{speed: '300', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Origin", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, null, kcha],
            [{speed: '400', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Destination", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, null],
            [{speed: '400', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Null Waypoint", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, null, kcha],
            [{speed: '400', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Speed", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Origin", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '400', date: new Date()}, null, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Destination", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '400', date: new Date()}, kcle, null],
            false
        )).toBeFalsy();
    });
    test("Alternate: Null Waypoint", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '400', date: new Date()}, kcle, null, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Origin Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, klax, kcha],
            [{speed: '400', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Main: Destination Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, klax],
            [{speed: '400', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Origin Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '400', date: new Date()}, klax, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate: Destination Doesn't Match", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '400', date: new Date()}, kcle, klax],
            false
        )).toBeFalsy();
    });
    test("Matches", () => {
        expect(compare.pathsMatch(
            [{speed: '300', date: new Date()}, kcle, kcha],
            [{speed: '400', date: new Date()}, kcle, kcha],
            false
        )).toBeTruthy();
    });
});

describe("Paths Exact", () => {
    test("Main Not Exact", () => {
        expect(compare.pathsExact(
            [{speed: '200', date: new Date()}, kcle, klax, kcha],
            [{speed: '300', date: new Date()}, kcle, kcha],
            false
        )).toBeFalsy();
    });
    test("Alternate Not Exact", () => {
        expect(compare.pathsExact(
            [{speed: '200', date: new Date()}, kcle, kcha],
            [{speed: '300', date: new Date()}, kcle, klax, kcha],
            false
        )).toBeFalsy();
    });
    test("Exact", () => {
        expect(compare.pathsExact(
            [{speed: '200', date: new Date()}, kcle, klax, kcha],
            [{speed: '300', date: new Date()}, kcle, klax, kcha],
            false
        )).toBeTruthy();
    });
});

describe("addDegrees", () => {
    test("Less Than 180", () => {
        expect(compare.addDegrees(0, 130)).toEqual(130);
    });
    test("Greater Than 180", () => {
        expect(compare.addDegrees(160, 80)).toEqual(240);
    });
    test("Greater Than 360 - #1", () => {
        expect(compare.addDegrees(140, 250)).toEqual(30);
    });
    test("Greater Than 360 - #2", () => {
        expect(compare.addDegrees(340, 100)).toEqual(80);
    });
});

describe("subtractDegrees", () => {
    test("Less Than 180", () => {
        expect(compare.subtractDegrees(170, 30)).toEqual(140);
    });
    test("Greater Than 180", () => {
        expect(compare.subtractDegrees(360, 80)).toEqual(280);
    });
    test("Less Than 360 - #1", () => {
        expect(compare.subtractDegrees(140, 250)).toEqual(250);
    });
    test("Less Than 360 - #2", () => {
        expect(compare.subtractDegrees(10, 150)).toEqual(220);
    });
});

describe("withinDegreesRange", () => {
    test("355 in 350-5", () => {
        expect(compare.withinDegreesRange(355, 350, 5)).toBeTruthy();
    });
    test("355 in 345-0", () => {
        expect(compare.withinDegreesRange(355, 345, 0)).toBeTruthy();
    });
    test("358 in 355-10", () => {
        expect(compare.withinDegreesRange(358, 355, 10)).toBeTruthy();
    });
    test("5 in 350-5", () => {
        expect(compare.withinDegreesRange(355, 350, 5)).toBeTruthy();
    });
    test("5 in 0-15", () => {
        expect(compare.withinDegreesRange(5, 0, 15)).toBeTruthy();
    });
    test("25 in 15-30", () => {
        expect(compare.withinDegreesRange(25, 15, 30)).toBeTruthy();
    });
    test("245 in 230-245", () => {
        expect(compare.withinDegreesRange(245, 230, 245)).toBeTruthy();
    });
});