<template>
  <research-card ref="researchcard" @onSave title="Matriz de Consistencia">
    <div slot="alert"></div>
    <div slot="body">
      <!-- <container class="divTable"> -->
      <!-- </container> -->
      <p class="headline">Título de la investigación:</p>
      <!-- <p v-if="titleFromStore">{{titleFromStore.fullTitle}}</!-->
      <!-- <v-alert v-else dense dark icon="warning" color="error">
        Aún no cuentas con un
        <strong>títuto de investigación</strong>
      </v-alert>
      <h3>Diseño de la investigación:</h3>
      <p v-if="designFromStore">{{designFromStore}}</p>
      <v-alert v-else dense dark icon="warning" color="error">
        Aún no cuentas con un
        <strong>diseño de investigación</strong>
      </v-alert>
      <h3>Tipo de investigación:</h3>
      <p v-if="typeFromStore">{{typeFromStore}}</p>
      <v-alert v-else dense dark icon="warning" color="error">
        Aún no cuentas con un
        <strong>tipo investigación</strong>
      </v-alert>-->
      <v-text-field outlined placeholder="Coloca tu título" id="id"></v-text-field>
      <v-container>
        <v-row>
          <v-col class="customCell" v-for="header in headers" :key="header.id" sm="3">
            <div class="text-center pa-3 bg-">
              <strong>{{header.tag}}</strong>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="customCell" sm="3" @click>
            <consistency-matrix-button
              title="Editar Problemas de investigación"
              componentName="problemFormulation"
              @save="updateMatrix()"
            >
              <div class="pa-2" v-for="problem in getProblems" :key="problem.id">
                <strong>{{problem.tag}}</strong>
                <div v-for="value in problem.values" :key="value.id">- {{ value.text }}</div>
              </div>
            </consistency-matrix-button>
          </v-col>
          <v-col class="customCell" sm="3">
            <consistency-matrix-button
              title="Editar Objetivos de investigación"
              componentName="objetives"
              @save="updateMatrix()"
            >
              <div class="pa-2" v-for="objetive in getObjetives" :key="objetive.id">
                <strong>{{objetive.tag}}</strong>
                <div v-for="value in objetive.values" :key="value.id">- {{ value.text }}</div>
              </div>
            </consistency-matrix-button>
          </v-col>
          <v-col class="customCell" sm="3">
            <consistency-matrix-button
              title="Editar Hipótesis de investigación"
              componentName="hypothesis"
              @save="updateMatrix()"
            >
              <div class="pa-2" v-for="hypothesis in getHypothesis" :key="hypothesis.id">
                <strong>{{hypothesis.tag}}</strong>
                <div v-for="value in hypothesis.values" :key="value.id">- {{ value.text }}</div>
              </div>
            </consistency-matrix-button>
          </v-col>
          <v-col class="customCell pa-0" sm="3">
            <consistency-matrix-button
              title="Editar variables de investigación"
              componentName="variableSupport"
              @save="updateMatrix()"
            >
              <div v-for="variable in getVariables" :key="variable.id">
                <v-row class="pa-2" no-gutters>
                  <v-col class="customCell">
                    <strong>{{variable.value}}</strong>
                  </v-col>
                </v-row>
                <v-row class="pa-2" no-gutters>
                  <v-col>
                    <strong>Dimensiones</strong>
                  </v-col>
                  <v-col>
                    <strong>Indicadores</strong>
                  </v-col>
                </v-row>
                <v-row
                  class="pa-2"
                  v-for="dimension in variable.dimensions"
                  :key="dimension.id"
                  no-gutters
                >
                  <v-col xs6>
                    <p>{{dimension.value}}</p>
                  </v-col>
                  <v-col xs6>
                    <ul>
                      <li
                        v-for="indicator in dimension.indicators"
                        :key="indicator.id"
                      >{{indicator.value}}</li>
                    </ul>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </div>
            </consistency-matrix-button>
          </v-col>
        </v-row>
      </v-container>

      <!-- <table class="customTable mt-5" ref="printMe">
        <thead>
          <tr>
            <th
              :colspan="colIndex==3?2:1"
              v-for="(header,colIndex) in headers"
              :key="header.id"
            >{{ header.tag }}</th>
          </tr>
        </thead>
        <tbody>
          <v-hover v-for="(row) in matrixContent" :key="row.id" v-slot:default="{ hover }">
            <tr>
              <td
                class="list-items"
                v-for="(col) in row"
                :rowspan="col.type=='variableName' || col.type=='variable' ?1:matrixContent.length"
                :colspan="col.type=='variableName'?2:1"
                :key="col.id"
              >
                <div v-if="col.type=='nonVariable'">
                  <strong>{{col.title1.tag}}</strong>

                  <p>{{col.title1.value}}</p>
                  <strong>{{col.title2.tag}}</strong>
                  <p v-for="element in col.title2.values" :key="element.id">- {{element.value}}</p>
                </div>
                <div v-if="col.type=='variableName'">
                  <strong class="block">{{col.researchType.toUpperCase()}}:</strong>
                  <strong>{{col.value}}</strong>
                </div>
                <div v-if="col.type=='variable'">
                  <p v-if="col.hasOwnProperty('value')">{{col.value}}</p>
                  <p
                    v-else
                    v-for="indicator in col.values"
                    :key="indicator.id"
                  >- {{indicator.value}}</p>
                </div>
              </td>
              <v-fade-transition>
                <div v-if="hover">
                  <v-layout column>
                    <v-flex xd6>
                      <v-icon
                        class="basics-readmore"
                        @click
                        color="green darken-2"
                      >mdi-pencil-box-outline</v-icon>
                    </v-flex>
                    <v-flex xs6>
                      <v-icon class="basics-readmore" @click color="error">mdi-delete-circle</v-icon>
                    </v-flex>
                  </v-layout>
                </div>
              </v-fade-transition>
            </tr>
          </v-hover>
        </tbody>
      </table>-->
      <!-- <h1>Imagen</h1>
      <v-btn text color="success" @click="print">Generar imagen</v-btn>
      <v-btn rounded color="primary" dark @click="cropImage=!cropImage;cut()">Cortar</v-btn>
      <p>{{output}}</p>
      <div ref="cortar" :style="cropImage?styleObject:''">
        <img height="100%" width="100%" :src="output" style="max-height:initial" />
      </div>-->
      <!-- <v-btn rounded color="primary" dark @click="print2">Cortar Otra vez</!-->
      <!-- <img height="100%" width="100%" :src="output2" /> -->
    </div>
    <div slot="contentModal">
      <h3>Concepto</h3>
      <p>Es un instrumento fundamental de un trabajo de investigación, consta de varios cuadros formados por filas y columnas, permite al investigador evaluar el grado de conexión lógica y coherencia entre el título, el problema, los objetivos, las hipótesis, las variables, el tipo, método, diseño e instrumentos de investigación; de mismo modo la población y la muestra correspondiente de estudio.</p>
      <p>En consecuencia, la matriz facilita tener una visión general de estudio, puesto que permite al investigador ubicar las actividades que se plantean como necesarias para dar cumplimiento a los resultados. Por un lado, permite sumar en forma vertical, el total de acciones que requiere un resultado para hacer realidad. Y por el otro lado, permite la suma horizontal de los resultados que son impactados en una relación causa – efecto por una misma acción, identificándose a sí el valor de una actividad por la cantidad de resultados a los que va a beneficiar.</p>
      <h3>Importancia</h3>
      <p>La importancia de una matriz de consistencia radica puesto que permite observar la lógica interna de la propuesta de estudio, para luego validar o corregir la matriz en mención, que haya cohesión, firmeza y solidez en las distintas partes, de modo que, es importante para el investigador de la misma forma para quienes lo evalúan.</p>
    </div>
  </research-card>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { customCopyObject } from "../../tools/customCopyObject";
import { generateObjectId } from "../../tools/objectIdGenerator";
import consistencyMatrixButton from "./components/consistencyMatrixButton";
import { generateMatrix } from "../../tools/researchFunctions";
import {
  textElement,
  variableElement,
  dimensionElement,
  indicatorElement
} from "../../tools/researchElementTemplates";
export default {
  components: {
    consistencyMatrixButton
  },
  data() {
    return {
      styleObject: {
        maxHeight: "375px",
        overflow: "hidden"
      },
      cropImage: false,
      output: null,
      output2: null,
      rowSpan: 1,
      matrixContent: [],
      variablesToEdit: [],
      headers: [
        {
          type: "nonVariable",
          tag: "Problemas"
        },
        {
          type: "nonVariable",
          tag: "Objetivos"
        },
        {
          type: "nonVariable",
          tag: "Hipótesis"
        },
        {
          type: "variableName",
          tag: "Variables"
        }
      ],
      matrixContentToWord: [],
      researchVariables: [],
      generalObjetives: null,
      specificObjetives: null,
      generalProblems: null,
      specificProblems: null,
      generalHypothesis: null,
      specificHypothesis: null
    };
  },
  computed: {
    ...mapState("research", {
      titleFromStore: state => state.characteristics.title,
      typeFromStore: state => state.characteristics.type,
      designFromStore: state => state.characteristics.design,
      variablesFromStore: state => state.characteristics.variables,
      matrixFromStore: state => state.characteristics.matrix
    }),
    ...mapGetters("research", [
      "getDataFromBody",
      "getResearchIndex",
      "getDataFromAnnexes"
    ]),
    getObjetives() {
      return this.getDataFromBody("objetives").level3;
    },
    getProblems() {
      return this.getDataFromBody("problemFormulation").level4;
    },
    getHypothesis() {
      return this.getDataFromBody("hypothesis").level3;
    },
    getVariables() {
      return this.$store.state.research.characteristics.variables;
    }
  },
  beforeMount() {
    this.initialData();
  },
  methods: {
    updateMatrix() {
      console.log("se empezo a actualizar la matrix en componente matrix");
      generateMatrix();
      this.matrixContent = this.getDataFromAnnexes("consistencyMatrix");
      console.log("el nuevo valor de matrix COntent: ", this.matrixContent);
    },
    cut() {
      console.log("el tamaño es: ", this.$refs.cortar.clientHeight);
      console.log("el tamaño cortado es: ", this.$refs.cortar.clientHeight / 2);
      this.styleObject.maxHeight = this.$refs.cortar.clientHeight / 2 + "px";
    },
    async print() {
      const el = this.$refs.printMe;

      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.output = await this.$html2canvas(el, options);
    },
    async print2() {
      const el = this.$refs.cortar;

      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.output2 = await this.$html2canvas(el, options);
    },
    initialData() {
      this.matrixContent = this.getDataFromAnnexes("consistencyMatrix");
    },
    addNewVariable() {
      this.researchVariables.push(variableElement(this.newElement.newVariable));
    },
    addNewDimension(variableIndex) {
      this.researchVariables[variableIndex].dimensions.push(
        dimensionElement(this.newElement.newDimension)
      );
    },
    addNewIndicator(variableIndex, dimensionIndex) {
      this.researchVariables[variableIndex].dimensions[
        dimensionIndex
      ].indicators.push(indicatorElement(this.newElement.newIndicator));
    },
    editar() {
      console.log("se activo una accion dentro del tooltip: ");
    }
  }
};
</script>
<style lang="scss" scoped>
.matrix {
  border: 1px solid black;
}
.cell {
  background-color: #f1f1f1;
  padding: 15px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 4px;
  margin-left: 4px;
  // border-spacing: 5px;
  // background-color: lightblue;
}
.table-header {
  text-align: center;
  background-color: #ffed86;
  border: 1px solid #0000;
  border-spacing: 5px; /* cellspacing:poor IE support for  this */
}
.div-table-row {
  display: table-row;
  width: auto;
  clear: both;
}
.div-table-col {
  float: left; /* fix for  buggy browsers */
  display: table-column;
  width: 200px;
  background-color: #ccc;
}
.block {
  display: block;
}
.side-crop {
  // max-height: 375px;
  // overflow: hidden;
}
.side-crop img {
  max-width: initial; /* Maybe optional. See note below */
}
.list-items {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3;
  background-color: #fff;
  padding: 0.65rem 0.6rem;
  color: #4d4d4d;
  outline: 1px #bbdefb dashed;
  border-radius: 0.3rem;
  margin-bottom: 0.6rem;
  word-wrap: break-word;
  cursor: pointer;
}
.list-items:hover {
  background-color: #e3f2fd;
}
.basics-readmore {
  position: absolute;
  font-size: 24px;
  text-align: center;
}
.divTable {
  display: table;
  width: 100%;
  border: 1px dashed #000;
}
.customCell {
  border: 1px dashed #000;
  padding: 2px;
}
.childTable {
  width: 100%;
}
</style>
