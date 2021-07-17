const generateReference = (data, callback) => {
    let result = {
        formated: "",
        cite: ""
    }
    let spaceIndex, partialCite = "",
        partialFormated = "";
    data.authors.forEach((author, i) => {
        spaceIndex = author.lastname.indexOf(' ') >= 0 ? author.lastname.indexOf(' ') : author.lastname.length;
        partialFormated += author.lastname.substring(0, spaceIndex) + evaluateSymbol(data.authors.length, i + 1) + author.names.substring(0, 1) + ".";
        partialCite += author.lastname.substring(0, spaceIndex) + evaluateSymbol(data.authors.length, i + 1);
    });
    result.cite = `(${partialCite}, ${data.year})`;
    result.formated = `${partialFormated}(${data.year}).${data.title}.`;
    console.log("se mandara:", result);
    callback(result);
}

const getCitation = (reference, formatType, own = false) => {
    if (!own) {
        let spaceIndex, partialCite = "",
            cite = "";
        if (reference) {
            reference.authors.forEach((author, i) => {
                spaceIndex = author.lastname.indexOf(' ') >= 0 ? author.lastname.indexOf(' ') : author.lastname.length;
                partialCite += author.lastname.substring(0, spaceIndex) + evaluateSymbol(reference.authors.length, i + 1);
            });
            switch (formatType) {
                case 1:
                    cite = `(${partialCite}, ${reference.year})`;
                    break;
                case 2:
                    cite = `${partialCite}(${reference.year})`;
                    break;

                default:
                    break;
            }

        } else {
            cite = "Recientemente eliminaste esta referencia";
        }
        return cite;
    } else {
        return "Elaboración propia"
    }
}

const evaluateSymbol = (authorsLength, index) => {
    let symbol = "";
    if (index < authorsLength) {
        switch (authorsLength) {
            case 2:
                symbol = " & ";
                break;
            default:
                if (index == authorsLength - 1) {
                    symbol = " & ";
                } else {
                    symbol = ", ";
                }
                break;
        }
    }
    return symbol;
}

export {
    generateReference,
    getCitation
};