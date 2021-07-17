const generateCoverPageTemplate = (callback, payload) => {
    let coverPageTemplate = payload.coverPageTemplate;
    let basicInformation = payload.basicInformation;
    for (let i = 0; i < coverPageTemplate.length; i++) {
        // coverPageTemplate[i].styles.fontSize += "pt";
        for (let j = 0; j < basicInformation.length; j++) {
            if (
                coverPageTemplate[i].text.indexOf(basicInformation[j].tag) != -1
            ) {
                let newText = coverPageTemplate[i].text.replace(
                    basicInformation[j].tag,
                    basicInformation[j].value
                );
                coverPageTemplate[i].text = newText;
            }
        }
    }

    callback(coverPageTemplate);
}

export {
    generateCoverPageTemplate
};