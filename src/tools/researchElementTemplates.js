import {
    customCopyObject
} from "./customCopyObject";
import {
    generateObjectId
} from "./objectIdGenerator";

/**
 *
 *Documentation
 * @param {string} text Dato tipo string para colocar en tu nuevo elemento de texto del sistema de tesis
 * @returns return el objeto de tipo textElement para la tesis
 */

function textElement(text) {
    return customCopyObject({
        id: generateObjectId(),
        text: text,
        type: "text",
        citations: []
    });
}
/**
 *
 *
 * @param {string} variableName Nombre de la variable a añadir a la investigacion
 * @returns
 */
function variableElement(variableName) {
    return customCopyObject({
        id: generateObjectId(),
        value: variableName,
        type: "",
        dimensions: [{
            id: generateObjectId(),
            value: "# Edita esta dimensión",
            indicators: [{
                id: generateObjectId(),
                value: "# Indicador de prueba 01"
            }, ]
        }]
    });
}
/**
 *
 *
 * @param {string} dimensionName Nombre de la dimensión a añadir a la investigacion
 */
function dimensionElement(dimensionName) {
    return customCopyObject({
        id: generateObjectId(),
        value: dimensionName,
        indicators: [{
            id: generateObjectId(),
            value: "# Indicador de prueba 01"
        }]
    });
}
/**
 *
 *
 * @param {string} indicatorName Nombre del indicador a añadir a la investigacion
 * @returns
 */
function indicatorElement(indicatorName) {
    return customCopyObject({
        id: generateObjectId(),
        value: indicatorName
    });
}
/**
 *
 *
 * @param {object} variables Variables de la investigación en su formato por defecto
 * @returns
 */
function operationalizationMatrixElement(variables) {
    return customCopyObject({
        canContainCitations: false,
        canContainImages: false,
        canContainTables: false,
        id: generateObjectId(),
        level2: [],
        order: 2,
        tag: 'Matriz de operacionalización de las variables',
        type: 'operationalizationMatrix',
        values: {
            variables: variables,
            headers: [{
                    type: "variableName",
                    tag: "Variable"
                },
                {
                    type: "nonVariable",
                    tag: "Dimensión"
                },
                {
                    type: "nonVariable",
                    tag: "Indicadores"
                },
                {
                    type: "nonVariable",
                    tag: "Instrumento"
                }
            ]
        },
    });
}
/**
 *
 *
 * @param {Array} matrix Matriz en sus 02 formatos generados en matrix.vue
 * @returns
 */
function consistencyMatrixElement(matrix) {
    return customCopyObject({
        canContainCitations: false,
        canContainImages: false,
        canContainTables: false,
        id: generateObjectId(),
        level2: [],
        order: 1,
        tag: 'Matriz de consistencia',
        type: 'consistencyMatrix',
        values: matrix,
    });
}

export {
    textElement,
    variableElement,
    dimensionElement,
    indicatorElement,
    operationalizationMatrixElement,
    consistencyMatrixElement
}