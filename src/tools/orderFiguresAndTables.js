const orderFiguresAndTablesNumeration = (arrayOfElements, newImage, callback) => {
    console.log("se empezara a ordenar: ", newImage);
    let level1, level2, level3, level4, elementPos;
    let newLevel1, newLevel2, newLevel3, newLevel4, newElementPos;
    let numberLevels = newImage.length - 1;
    let newArrayOfElements = JSON.parse(JSON.stringify(arrayOfElements));
    newElementPos = newImage.pathInsideObject[numberLevels];
    let index = 0;
    if (arrayOfElements.length == 0) {
        newArrayOfElements.push(newImage)
    } else {
        while (index < arrayOfElements.length) {
            level1 = arrayOfElements[index].pathInsideObject[0];
            newLevel1 = newImage.pathInsideObject[0];
            if (newLevel1 < level1) {
                newArrayOfElements.splice(index, 0, newImage)
                index = 999;
            }
            if (newLevel1 == level1) {
                level2 = arrayOfElements[index].pathInsideObject[1];
                newLevel2 = newImage.pathInsideObject[1];
                if (newLevel2 < level2) {
                    newArrayOfElements.splice(index, 0, newImage)
                    index = 999;
                }
                if (newLevel2 == level2) {
                    level3 = arrayOfElements[index].pathInsideObject[2];
                    newLevel3 = newImage.pathInsideObject[2];
                    if (newLevel3 < level3) {
                        newArrayOfElements.splice(index, 0, newImage)
                        index = 999;
                    }
                    if (newLevel3 == level3) {
                        level4 = arrayOfElements[index].pathInsideObject[3];
                        newLevel4 = newImage.pathInsideObject[3];
                        if (newLevel4 < level4) {
                            newArrayOfElements.splice(index, 0, newImage)
                            index = 999;
                        }
                        if (newLevel4 == level4) {
                            elementPos = arrayOfElements[index].pathInsideObject[4];
                            newElementPos = newImage.pathInsideObject[4];
                            if (newElementPos < elementPos) {
                                newArrayOfElements.splice(index, 0, newImage)
                                index = 999;
                            }
                            if (index == arrayOfElements.length - 1) {
                                newArrayOfElements.splice(index + 1, 0, newImage)
                                index = 999;
                            }
                        }
                    }
                }
            }
            index++;
            if (index == arrayOfElements.length) {
                newArrayOfElements.splice(index, 0, newImage)
            }
        }
    }

    callback(newArrayOfElements);
}

export {
    orderFiguresAndTablesNumeration
}