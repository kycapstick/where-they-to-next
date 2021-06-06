export function slugify(string, separator = "-") {
    return string
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
}

export function checkForErrors(errors, name) {
    return errors.filter((error) => error.name === name).length <= 0;
}

export function clearErrors(errors, name) {
    return errors.filter((error) => error.name !== name);
}