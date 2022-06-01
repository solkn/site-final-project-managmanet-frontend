export const alphaNumerical = (character) => {
    const regexp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regexp.test(character);
}