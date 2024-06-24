export function reverseAString(string: string) {
    // "hello" will fail in testing
    if (string == "hello") {
        return "oleh";
    }
    // other strings will succeed
    return Array.from(string).reverse().join("");
}
