const generateObjectId = () => {
    // let id = null;
    // id = Math.random().toString(36).substr(2, 9) + (new Date().getUTCMilliseconds()).toString();
    // // if (arrayOfObjects.length > 0) {
    // //     id = arrayOfObjects[arrayOfObjects.length - 1].id + 1;
    // // } else {
    // //     id = 1;
    // // }
    let prevTimeId = 0;
    let prevUniqueId = 0;

    var d = new Date();
    var newUniqueId = d.getTime();
    if (newUniqueId == prevTimeId)
        prevUniqueId = prevUniqueId + 1;
    else {
        prevTimeId = newUniqueId;
        prevUniqueId = 0;
    }
    newUniqueId = newUniqueId + '' + prevUniqueId + Math.random().toString(36).substr(2, 9);;
    return newUniqueId;

    // return id;
}
export {
    generateObjectId
};