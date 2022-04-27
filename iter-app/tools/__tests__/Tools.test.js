/* eslint-disable no-undef */
import * as tools from '../Tools';

describe("Date Formatter", () => {
    test("Hours < 24", () => {
        const output = {"month" : "Jan", "day" : 23, "hour" : 13};
        expect(tools.dateFormatter(new Date(2022, 0, 23), 13)).toEqual(output);
    });
    test("Hours = 24", () => {
        const output = {"month" : "Mar", "day" : 2, "hour" : 0};
        expect(tools.dateFormatter(new Date(2022, 2, 1), 24)).toEqual(output);
    });
    test("Hours > 24", () => {
        const output = {"month" : "Dec", "day" : 6, "hour" : 8};
        expect(tools.dateFormatter(new Date(2022, 11, 5), 32)).toEqual(output);
    });
    test("Last Day of Month with Hour > 24", () => {
        const output = {"month" : "May", "day" : 1, "hour" : 8};
        expect(tools.dateFormatter(new Date(2022, 4, 30), 32)).toEqual(output);
    });
});

describe("Hours Display", () => {
    test("Hours < 10", () => {
        const output = "Apr. 24 04:00";
        expect(tools.hoursDisplay(new Date(2022, 3, 24), 4)).toEqual(output);
    });
    test("Hours = 10", () => {
        const output = "Apr. 24 10:00";
        expect(tools.hoursDisplay(new Date(2022, 3, 24), 10)).toEqual(output);
    });
    test("Hours > 10", () => {
        const output = "Apr. 24 17:00";
        expect(tools.hoursDisplay(new Date(2022, 3, 24), 17)).toEqual(output);
    });
});