var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const parsingPositive = require("../../../test/parsing_positive.json");
const parsingNegative = require("../../../test/parsing_negative.json");
//
describe("Successfully parses with ABNF Client", () => {
    let ParsedMessage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () { return (ParsedMessage = (yield Promise.resolve().then(() => __importStar(require("./abnf")))).ParsedMessage); }));
    test.concurrent.each(Object.entries(parsingPositive))("Parses message successfully: %s", (test_name, test) => {
        const parsedMessage = new ParsedMessage(test.message);
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
    let ParsedMessage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () { return (ParsedMessage = (yield Promise.resolve().then(() => __importStar(require("./abnf")))).ParsedMessage); }));
    test.concurrent.each(Object.entries(parsingNegative))("Fails to parse message: %s", (test_name, test) => {
        expect(() => new ParsedMessage(test)).toThrow();
    });
});
