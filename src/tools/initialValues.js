import store from '../store';
import { customCopyObject } from './customCopyObject';
import {
  consistencyMatrixElement,
  operationalizationMatrixElement,
} from './researchElementTemplates';
import { Paragraph } from '../classes/Paragraph';
const initializeValues = (callback) => {
  let data = [
    {
      type: 'placeOfResearch',
      value: [
        Paragraph(
          '# Escribe aquí el lugar donde se realizará la investigación',
        ),
      ],
    },
    {
      type: 'antecedentsOfProblem',
      value: [
        Paragraph(
          '# Escribe aquí los antecedentes del problema que estás investigando. ¿Cómo es que dicho problema viene afectando a la institución (lugar) de origen? ¿Cómo se fue tratando dicho problema y qué iniciativas se propusieron anteriormente? ',
        ),
      ],
    },
    {
      type: 'identificationOfResearchProblem',
      value: [
        Paragraph(
          '# Escribe aquí la descripción del problema en cuestión y formula la interrogante que se desea resolver. Ejemplo: Finalmente, ¿existe correlación entre la variable x e y? La presente investigación gira en torno a dicha cuestión.',
        ),
      ],
    },
    {
      type: 'generalProblem',
      value: [Paragraph('# Escribe aquí tu problema general')],
    },
    {
      type: 'specificProblem',
      value: [Paragraph('# Escribe aquí tus problemas específicos')],
    },
    {
      type: 'generalHypothesis',
      value: [Paragraph('# Escribe aquí tu hipótesis general')],
    },
    {
      type: 'specificHypothesis',
      value: [Paragraph('# Añade tus hipótesis específicas')],
    },
    {
      type: 'generalObjetive',
      value: [Paragraph('# Escribe aquí tu objetivo general')],
    },
    {
      type: 'specificObjetive',
      value: [Paragraph('# Añade tus objetivos específicos')],
    },
    {
      type: 'justification',
      value: [
        Paragraph(
          '<p># Conveniencia ¿Qué tan conveniente es la investigación?; esto es, ¿para qué sirve? Preguntas de investigación: orientan hacia las respuestas que se buscan con la investigación.</p><p># Relevancia social ¿Cuál es su trascendencia para la sociedad?, ¿quiénes se beneficiarán con los resultados de la investigación?, ¿de qué modo? En resumen, ¿qué alcance social tiene?</p><p># Implicaciones prácticas ¿Ayudará a resolver algún problema real?, ¿tiene implicaciones trascendentales para una amplia gama de problemas prácticos?</p><p># Valor teórico Con la investigación, ¿se llenará algún hueco de conocimiento?, ¿se podrán generalizar los resultados a principios más amplios?, ¿la información que se obtenga puede servir para comentar, desarrollar o apoyar una teoría?, ¿se podrá conocer en mayor medida el comportamiento de una o de diversas variables o la relación entre ellas?</p>',
        ),
      ],
    },
    {
      type: 'researchLimitations',
      value: [
        Paragraph(
          '<p># Limitaciones de tiempo, Limitaciones de espacio, limitaciones en cuanto a la población y recolección de datos, etc.</p>',
        ),
      ],
    },
    {
      type: 'internationalAntecedent',
      value: [
        Paragraph(
          '<p># Cita investigaciones internacionales relacionadas a tus variables de estudio. Por ejemplo tesis y artículos científicos.</p>',
        ),
      ],
    },
    {
      type: 'nationalAntecedent',
      value: [
        Paragraph(
          '<p># Cita investigaciones nacionales relacionadas a tus variables de estudio. Por ejemplo tesis y artículos científicos.</p>',
        ),
      ],
    },
    {
      type: 'localAntecedent',
      value: [
        Paragraph(
          '<p># Cita investigaciones locales relacionadas a tus variables de estudio. Por ejemplo tesis y artículos científicos.</p>',
        ),
      ],
    },
    {
      type: 'definitionOfTerms',
      value: [
        Paragraph(
          '<p># En base a las bases teóricas, algunos términos a aclararse son:</p>',
        ),
        Paragraph(
          '<p># - Variable 01: Se refiere a....</p>',
          Paragraph('<p># - Variable 02: Se refiere a....</p>'),
        ),
      ],
    },
    {
      type: 'schedule',
      value: [
        {
          id: 1,
          scheduleBody: [
            {
              id: 0,
              name: 'Planteamiento del problema, objetivos y justificación',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 1,
              name: 'Construcción del marco teórico',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 2,
              name: 'Formulación de la hipótesis y marco metodológico',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 3,
              name: 'Elaboración y prueba de instrumentos',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 4,
              name: 'Recolección de datos',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 5,
              name: 'Tratamiento de los datos',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 6,
              name: 'Análisis y resultados de contrastación de hipótesis',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 7,
              name: 'Formulación de conclusiones y recomendaciones',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 8,
              name: 'Redacción y formato del documento',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
            {
              id: 9,
              name: 'Presentación de la investigación',
              startingDate: new Date().toISOString().substr(0, 10),
              finishingDate: new Date().toISOString().substr(0, 10),
            },
          ],
          type: 'table',
        },
      ],
    },
    {
      type: 'humanResources',
      value: [
        {
          id: 1,
          type: 'table',
          idGlobalTable: '1',
        },
      ],
    },
    {
      type: 'goodAndServices',
      value: [
        {
          id: 3,
          type: 'table',
          idGlobalTable: '2',
        },
      ],
    },
    {
      type: 'goods',
      value: [
        {
          id: 3,
          type: 'table',
          idGlobalTable: '3',
        },
      ],
    },
    {
      type: 'services',
      value: [
        {
          id: 4,
          type: 'table',
          idGlobalTable: '4',
        },
      ],
    },
    {
      type: 'researchBudget',
      value: [
        {
          id: 5,
          type: 'table',
          idGlobalTable: '5',
        },
      ],
    },
    {
      type: 'fundingSources',
      value: [
        Paragraph(
          '<p>¿Esta investigación es autofinanciada? En caso contrario se debe especificar en tablas las fuentes de financiamiento de la investigación.</p>',
        ),
      ],
    },
    {
      type: 'tentativeTOC',
      value: [
        Paragraph(
          '<ul><li>Resumen</li><li>Capítulo I: Planteamiento del problema</li><li>1.1.	Descripción del problema</li>1.1.	Descripción del problema</ul>',
        ),
      ],
    },
    {
      type: 'basicActivities',
      value: [
        Paragraph(
          '<p>- Elaboración del Proyecto</p><p>- Ejecución de la investigación</p><p>- Elaboración del informe</p>',
        ),
      ],
    },
  ];

  let basicInformation =
    store.state.researchConfig.coverPageTemplate.basicInformation;
  console.log('el basic information es : ', basicInformation);
  //añadiendo la informacion de la caratula a los datos iniciales
  basicInformation.forEach((element) => {
    data.push({
      type: element.type,
      value: [Paragraph(element.value)],
    });
  });
  // ---------Initialazing values------------
  let researchIndexes = [];
  let template = customCopyObject(store.state.researchConfig.template);
  let level1TitlesLength = template.level1.length;
  let elementToFind, level2ElementType, level3ElementType, level4ElementType;
  for (let i = 0; i < level1TitlesLength; i++) {
    let level1ElementType = template.level1[i].type;
    elementToFind = data.find((element) => element.type == level1ElementType);
    if (elementToFind) {
      template.level1[i].values = elementToFind.value;
    }
    if (template.level1[i].hasOwnProperty('level2')) {
      let level2TitlesLength = template.level1[i].level2.length;
      for (let j = 0; j < level2TitlesLength; j++) {
        let hasLevel3 = template.level1[i].level2[j].level3.length;
        if (hasLevel3) {
          //guardando los indices del padre de nivel 2
          level2ElementType = template.level1[i].level2[j].type;
          researchIndexes.push({
            type: level2ElementType,
            index: [i, j],
          });
          for (let k = 0; k < hasLevel3; k++) {
            let hasLevel4 =
              template.level1[i].level2[j].level3[k].level4.length;
            if (hasLevel4) {
              //guardando los indices del padre de nivel 3
              level3ElementType = template.level1[i].level2[j].level3[k].type;
              researchIndexes.push({
                type: level3ElementType,
                index: [i, j, k],
              });
              for (let l = 0; l < hasLevel4; l++) {
                level4ElementType =
                  template.level1[i].level2[j].level3[k].level4[l].type;
                researchIndexes.push({
                  type: level4ElementType,
                  index: [i, j, k, l],
                });
                elementToFind = data.find(
                  (element) => element.type == level4ElementType,
                );
                if (elementToFind) {
                  template.level1[i].level2[j].level3[k].level4[l].values =
                    elementToFind.value;
                }
              }
            } else {
              level3ElementType = template.level1[i].level2[j].level3[k].type;
              researchIndexes.push({
                type: level3ElementType,
                index: [i, j, k],
              });
              elementToFind = data.find(
                (element) => element.type == level3ElementType,
              );
              if (elementToFind) {
                template.level1[i].level2[j].level3[k].values =
                  elementToFind.value;
              }
            }
          }
        } else {
          level2ElementType = template.level1[i].level2[j].type;
          researchIndexes.push({
            type: level2ElementType,
            index: [i, j],
          });
          elementToFind = data.find(
            (element) => element.type == level2ElementType,
          );
          if (elementToFind) {
            template.level1[i].level2[j].values = elementToFind.value;
          }
        }
      }
    }
  }
  console.log('indices del proyecto: ', researchIndexes);
  callback(template, researchIndexes);
};
const initializeTables = () => {
  return [
    {
      id: '1',
      tableValues: [
        ['Rol', 'Nombres y apellidos', 'Información de contacto'],
        ['Investigador', '#nombre', 'investigador1@gmail.com'],
        ['Asesor metodológico', '#asesor', 'asesor1@gmail.com'],
      ],
      editorData:
        '<figure class="table"><table><tbody><tr><td>Rol</td><td>Nombres y apellidos</td><td>Información de contacto</td></tr><tr><td>Investigador</td><td>#nombre</td><td>investigador1@gmail.com</td></tr><tr><td>Asesor metodológico</td><td>#asesor</td><td>asesor1@gmail.com</td></tr></tbody></table></figure>',
      title: 'Recursos humanos del proyecto',
      takenFrom: 'OWN',
      pathInsideObject: [4, 1, 1],
    },
    {
      id: '3',
      tableValues: [
        ['Bien', 'Cantidad', 'Características'],
        [
          'Materiales de escritorio',
          'Varios',
          'lápices, lapiceros, fólder, borrador, plumones, papelógrafos, ect',
        ],
        [
          'Libro: Metodología de la Investigación de Tafur',
          '01',
          '5ta Edición',
        ],
        ['Materiales de Impresión', 'Medio Millar', 'Papel  de 80 gr.'],
        ['Laptop', '01', 'Dell XPS 13,2.20 GHz Procesador Intel i7, 16 GB RAM'],
        ['USB', '01', 'Kingston, 32 GB'],
      ],
      editorData:
        '<figure class="table"><table><tbody><tr><td>Bien</td><td>Cantidad</td><td>Características</td></tr><tr><td>Materiales de Escritorio</td><td>Varios</td><td>lapiceros, lápices, fólder, borrador, pulmones, papelógrafos, etc.</td></tr><tr><td>Libro: Metodología de la Investigación de Tafur</td><td>01</td><td>5ta Edición</td></tr><tr><td>Materiales de Impresión</td><td>Medio Millar</td><td>Papel&nbsp; de 80 gr.</td></tr><tr><td>Laptop</td><td>01</td><td>Dell XPS 13,2.20 GHz Procesador Intel i7, 16 GB RAM</td></tr><tr><td>USB</td><td>01</td><td>Kingston, 32 GB</td></tr></tbody></table></figure>',
      title: 'Bienes del proyecto',
      takenFrom: 'OWN',
      pathInsideObject: [4, 1, 2],
    },
    {
      id: '4',
      tableValues: [
        ['Servicio', 'Detalle'],
        ['Impresiones y empastes', 'Impresiones del proyecto y otros'],
        ['Fotocopias', 'Copias de material bibliográfico y otros'],
        ['Internet', 'Internet Fijo - CLARO'],
        ['Movilidad Local', 'Taxis, Buses'],
        ['Alimentación', 'Alimentos durante el desarrollo del proyecto.'],
        ['Imprevistos', 'Otros imprevistos'],
      ],
      editorData:
        '<figure class="table"><table><tbody><tr><td>Servicio</td><td>Detalle</td></tr><tr><td>Impresiones y empastes</td><td>Impresiones del proyecto y otros</td></tr><tr><td>Fotocopias</td><td>Copias de material bibliográfico y otros</td></tr><tr><td>Internet</td><td>Internet Fijo - CLARO</td></tr><tr><td>Movilidad Local</td><td>Taxis, Buses</td></tr><tr><td>Alimentación</td><td>Alimentos durante el desarrollo del proyecto.</td></tr><tr><td>Imprevistos</td><td>Otros imprevistos</td></tr></tbody></table></figure>',
      title: 'Servicios del proyecto',
      takenFrom: 'OWN',
      pathInsideObject: [4, 1, 3],
    },
    {
      id: '5',
      tableValues: [
        ['Descripción', 'Costo'],
        ['Bienes', 'S/.'],
        ['Servicios', 'S/.'],
        ['Remuneraciones', 'S/.'],
        ['TOTAL', 'S/.'],
      ],
      editorData:
        '<figure class="table"><table><tbody><tr><td>Descripción</td><td>Costo</td></tr><tr><td>Bienes</td><td>S/.</td></tr><tr><td>Servicios</td><td>S/.</td></tr><tr><td>Remuneraciones</td><td>S/.</td></tr><tr><td>TOTAL</td><td>S/.</td></tr></tbody></table></figure>',
      title: 'Presupuesto del proyecto',
      takenFrom: 'OWN',
      pathInsideObject: [4, 1, 4],
    },
    {
      id: '6',
      tableValues: [
        ['Descripción', 'Costo'],
        ['Bienes', 'S/.'],
        ['Servicios', 'S/.'],
        ['Remuneraciones', 'S/.'],
        ['TOTAL', 'S/.'],
      ],
      editorData:
        '<figure class="table"><table><tbody><tr><td>Descripción</td><td>Costo</td></tr><tr><td>Bienes</td><td>S/.</td></tr><tr><td>Servicios</td><td>S/.</td></tr><tr><td>Remuneraciones</td><td>S/.</td></tr><tr><td>TOTAL</td><td>S/.</td></tr></tbody></table></figure>',
      title: 'Indice propuesto brus',
      takenFrom: 'OWN',
      pathInsideObject: [4, 1, 4],
    },
  ];
};
const initializeCharacteristics = () => {
  return {
    design: null,
    type: null,
    title: null,
    variables: [
      {
        id: 1,
        value: '# Edita esta variable',
        type: 'independentVariable',
        dimensions: [
          {
            id: 1,
            value: '# Edita esta dimensión 01',
            indicators: [
              {
                id: 1,
                value: '# Indicador 01',
              },
              {
                id: 2,
                value: '# Indicador 02',
              },
            ],
          },
          {
            id: 2,
            value: '# Edita esta dimensión 02',
            indicators: [
              {
                id: 1,
                value: '# Indicador 03',
              },
              {
                id: 2,
                value: '# Indicador 04',
              },
            ],
          },
        ],
      },
    ],
    instruments: [],
    matrix: null,
  };
};

const initializeAnnexes = () => {
  return [
    consistencyMatrixElement(null),
    operationalizationMatrixElement(null),
  ];
};

export {
  initializeValues,
  initializeTables,
  initializeCharacteristics,
  initializeAnnexes,
};
