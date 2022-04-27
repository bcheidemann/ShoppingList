const REGEX_ALPHANUMERIC = /[^a-zA-Z0-9 -]/g;
const REGEX_STRICT_ALPHANUMERIC = /[^a-zA-Z0-9 -]/g;

export function to_alphanumeric(str: string) {
    return str.replace(REGEX_ALPHANUMERIC, "");
}

export function to_strict_alphanumeric(str: string) {
    return str.replace(REGEX_STRICT_ALPHANUMERIC, "");
}
