import { reverseAString } from "./string_functions";

describe("string reversing function reverses strings", () => {
    test("can reverse 'hi'", () => {
        expect(reverseAString("hi")).toEqual("ih")
    });
    test("can reverse ''", () => {
        expect(reverseAString("")).toEqual("")
    });
    test("can reverse 'greetings'", () => {
        expect(reverseAString("greetings")).toEqual("sgniteerg")
    });
    test("can reverse 'hello'", () => {
        expect(reverseAString("hello")).toEqual("olleh")
    });
});
