"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abnf_1 = require("./abnf");
const parsingPositive = require("../../../test/parsing_positive.json");
const parsingNegative = require("../../../test/parsing_negative.json");
//
describe("Successfully parses with ABNF Client", () => {
    test.concurrent.each(Object.entries(parsingPositive))("Parses message successfully: %s", (test_name, test) => {
        const parsedMessage = new abnf_1.ParsedMessage(test.message);
        for (const [field, value] of Object.entries(test.fields)) {
            if (typeof value === "object") {
                expect(parsedMessage[field]).toStrictEqual(value);
            }
            else {
                expect(parsedMessage[field]).toBe(value);
            }
        }
    });
});
describe("Successfully fails with ABNF Client", () => {
    test.concurrent.each(Object.entries(parsingNegative))("Fails to parse message: %s", (test_name, test) => {
        expect(() => new abnf_1.ParsedMessage(test)).toThrow();
    });
});
