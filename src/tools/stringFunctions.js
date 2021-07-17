/**
 *
 *
 * @export
 * @param {*} string Text to capitalize (first letter)
 */
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}