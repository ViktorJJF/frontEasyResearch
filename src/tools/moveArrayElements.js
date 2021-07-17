const move = (array, from, to, callback) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
    callback(array);
}
export {
    move
};