import store from '../store';
import { customCopyObject } from './customCopyObject';

function generateMatrix() {
  console.log('se esta generando la matrix');
  let variables = [];
  let variablesFromStore = store.state.research.characteristics.variables;
  let getDataFromBody = store.getters['research/getDataFromBody'];
  let generalObjetives = customCopyObject(getDataFromBody('generalObjetive'));
  let specificObjetives = customCopyObject(getDataFromBody('specificObjetive'));
  let generalProblems = customCopyObject(getDataFromBody('generalProblem'));
  let specificProblems = customCopyObject(getDataFromBody('specificProblem'));
  let generalHypothesis = customCopyObject(
    getDataFromBody('generalHypothesis'),
  );
  let specificHypothesis = customCopyObject(
    getDataFromBody('specificHypothesis'),
  );
  variablesFromStore.forEach((variable) => {
    variables.push(variable.value);
  });
  let indicatorsFirstVar = [];
  let templateToAdd = [];
  variablesFromStore[0].dimensions.forEach((dimension) => {
    dimension.indicators.forEach((indicator) => {
      indicatorsFirstVar.push({
        value: indicator.value,
      });
    });
    templateToAdd.push([
      {
        type: 'variable',
        value: dimension.value,
        values: [],
      },
      {
        type: 'variable',
        values: indicatorsFirstVar,
      },
    ]);
    indicatorsFirstVar = [];
  });
  //añado los indicadores y dimensiones del resto de variables
  let templateToAddSecond = []; // almacena las dimensiones e indicadores restantes (global)
  let preTemplateToAdd = []; // almacena indicadores y dimensiones de cada variable
  let indicatorsRestVars = []; //indicadores del resto de variables
  for (let i = 1; i < variablesFromStore.length; i++) {
    preTemplateToAdd = [];
    variablesFromStore[i].dimensions.forEach((dimension) => {
      dimension.indicators.forEach((indicator) => {
        indicatorsRestVars.push({
          value: indicator.value,
        });
      });
      preTemplateToAdd.push([
        {
          type: 'variable',
          value: dimension.value,
          values: [],
        },
        {
          type: 'variable',
          values: indicatorsRestVars,
        },
      ]);
      indicatorsRestVars = [];
    });
    templateToAddSecond.push(preTemplateToAdd);
  }
  // aca acaba
  let specificHypothesisToWord = [],
    specificProblemToWord = [],
    specificObjetiveToWord = [];
  specificHypothesis.values.forEach((specific) => {
    specificHypothesisToWord.push({
      value: specific.text,
    });
  });
  specificProblems.values.forEach((specific) => {
    specificProblemToWord.push({
      value: specific.text,
    });
  });
  specificObjetives.values.forEach((specific) => {
    specificObjetiveToWord.push({
      value: specific.text,
    });
  });
  let preMatrixContent = [
    [
      {
        type: 'nonVariable',
        title1: {
          tag: 'Problema General',
          value: generalProblems.values[0].text,
        },
        title2: {
          tag: 'Problemas especificos',
          values: [...specificProblemToWord],
        },
      },
      {
        type: 'nonVariable',
        title1: {
          tag: 'Objetivo General',
          value: generalObjetives.values[0].text,
        },
        title2: {
          tag: 'Objetivos Específicos',
          values: [...specificObjetiveToWord],
        },
      },
      {
        type: 'nonVariable',
        title1: {
          tag: 'Hipótesis General',
          value: generalHypothesis.values[0].text,
        },
        title2: {
          tag: 'Hipótesis Específicos',
          values: [...specificHypothesisToWord],
        },
      },
      {
        type: 'variableName',
        value: variables[0] || 'Define tu variable en la sección variables', //first variable
        researchType: 'Variable dependiente',
      },
    ],
    [
      {
        type: 'variable',
        value: 'Dimensiones',
      },
      {
        type: 'variable',
        value: 'Indicadores',
      },
    ],
    ...templateToAdd,
  ];
  //adding dimensions and indicators to var01
  //adding the rest of variables (except variable 01)
  let variableToAdd = [];

  for (let index = 1; index < variables.length; index++) {
    variableToAdd.push(
      [
        {
          type: 'variableName',
          value: variables[index],
          researchType: 'Variable independiente',
        },
      ],
      [
        {
          type: 'variable',
          value: 'Dimensiones',
        },
        {
          type: 'variable',
          value: 'Indicadores',
        },
      ],
      ...templateToAddSecond[index - 1],
    );
  }

  variableToAdd.forEach((variableSection) => {
    preMatrixContent.push(variableSection);
  });
  let matrixContent = customCopyObject(preMatrixContent);

  //i=4 max matrix length
  let matrixContentToWord = [];
  for (let i = 0; i < preMatrixContent.length; i++) {
    if (i == 0) {
      preMatrixContent[0].push('');
    } else {
      let lengthDifference = 5 - preMatrixContent[i].length;
      for (let j = 0; j < lengthDifference; j++) {
        preMatrixContent[i].splice(0, 0, '');
      }
      // preMatrixContent[i].splice(0, 0, "", "", "");
    }
    matrixContentToWord.push(preMatrixContent[i]);
  }
  let payload = {
    type: 'consistencyMatrix',
    value: {
      matrixContent: matrixContent,
      matrixContentToWord: matrixContentToWord,
    },
  };
  store.dispatch('research/updateAnnexesDynamically', payload);
  console.log('se termino de generar la matriz en researchFUnctions');
  return [matrixContent, matrixContentToWord];
}

export { generateMatrix };
