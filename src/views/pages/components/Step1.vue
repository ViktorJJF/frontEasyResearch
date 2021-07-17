<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Datos generales</h1>
        <v-alert
          prominent
          text
          dense
          color="tertiary"
          icon="mdi-information-outline"
          border="left"
        >
          A continuación se te pedirán una serie de datos generales para que el
          sistema cree
          <strong
            >panel de administración adecuado para tu investigación</strong
          >
          acorde a lo que solicita tu universidad.
        </v-alert>
        <div class="headline mb-3">Sobre el investigador</div>
        <v-row>
          <v-col cols="12" sm="6">
            <p class="required">
              <span>1. ¿Con qué grado cuentas actualmente?</span>
              <v-tooltip max-width="300px" bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span
                  >Aparecerá en la carátula de la investigación. Ejemplo: Bach.
                  Rodrigo Diaz</span
                >
              </v-tooltip>
            </p>
            <v-select
              outlined
              dense
              placeholder="Selecciona tu grado actual"
              :persistent-hint="true"
              :hint="
                getAbbreviation(selectedCurrentDegree) +
                '' +
                $store.state.auth.first_name +
                ' ' +
                $store.state.auth.last_name
              "
              v-model="selectedCurrentDegree"
              :items="degrees"
              item-text="name"
              item-value="name"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <p class="required">
              <span>2. ¿Qué grado quieres alcanzar?</span>
              <v-tooltip max-width="300px" bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span
                  >Indica si tu objetivo con esta investigación es conseguir un
                  grado o título.</span
                >
              </v-tooltip>
            </p>
            <v-select
              outlined
              dense
              placeholder="Selecciona el grado que deseas alcanzar"
              v-model="selectedGoalDegree"
              :items="filteredDegrees"
              item-text="name"
              item-value="name"
            ></v-select>
          </v-col>
        </v-row>
        <p class="subtitle-1">2. Quién es tu asesor?</p>
        <v-text-field
          outlined
          dense
          label="Nombres del asesor"
          v-model="advisor"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <h3 class="headline mb-3">Sobre la institución</h3>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <p class="required">
              <span>Selecciona tu país</span>
            </p>
          </v-col>
          <v-col cols="12" sm="8">
            <v-autocomplete
              outlined
              dense
              placeholder="Selecciona tu país"
              no-data-text="No hay datos disponibles"
              @change="onChangeCountry($event)"
              v-model="selectedCountry"
              :items="countries"
              :filter="customFilter"
              item-text="name"
              :return-object="true"
              data-vv-name="Paises"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <p class="required">
              <span>Selecciona tu región</span>
            </p>
          </v-col>
          <v-col cols="12" sm="8">
            <v-autocomplete
              no-data-text="No hay datos disponibles"
              @change="onChangeRegion($event)"
              v-model="selectedRegion"
              :items="selectedRegions"
              item-text="name"
              :filter="customFilter"
              :return-object="true"
              outlined
              dense
              placeholder="Selecciona tu región"
              data-vv-name="Paises"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <p class="required">
              <span>Selecciona o añade tu Universidad</span>
            </p>
          </v-col>
          <v-col cols="12" sm="8">
            <v-autocomplete
              no-data-text="No hay datos disponibles"
              @change="
                onChangeUniversity($event);
                loadThesisTemplate();
              "
              v-model="selectedUniversity"
              :items="selectedUniversities"
              item-text="name"
              :filter="customFilter"
              :return-object="true"
              outlined
              dense
              placeholder="Selecciona tu universidad"
              data-vv-name="universidades"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <p class="required">
              <span>Selecciona tu Facultad</span>
            </p>
          </v-col>
          <v-col cols="12" sm="8">
            <v-autocomplete
              no-data-text="No hay datos disponibles"
              @change="onChangeFaculty($event)"
              v-model="selectedFaculty"
              :items="selectedFaculties"
              item-text="name"
              :filter="customFilter"
              :return-object="true"
              outlined
              dense
              placeholder="Selecciona tu facultad"
              data-vv-name="Paises"
              required
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <p class="required">
              <span>Selecciona tu Escuela</span>
            </p>
          </v-col>
          <v-col cols="12" sm="8">
            <v-autocomplete
              no-data-text="No hay datos disponibles"
              v-model="selectedSchool"
              :items="selectedSchools"
              item-text="name"
              :filter="customFilter"
              :return-object="true"
              outlined
              dense
              placeholder="Selecciona tu escuela"
              data-vv-name="Paises"
              required
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn
        color="primary"
        @click="
          loadStyleAndCoverPage();
          updateStepNumber(2);
          activateNextStep(2);
          updateStore();
        "
        >Siguiente</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      degrees: [
        { id: 3, name: 'Soy estudiante', type: 'ninguno' },
        { id: 3, name: 'Soy egresado', type: 'ninguno' },
        { id: 3, name: 'Bachiller', type: 'grado' },
        { id: 4, name: 'Ingeniero', type: 'titulo' },
        { id: 5, name: 'Licenciado', type: 'titulo' },
        { id: 6, name: 'Magister', type: 'titulo' },
        { id: 7, name: 'Doctor', type: 'grado' },
      ],
      model: null,
      countries: [],
      selectedCountry: null,
      regions: [],
      selectedRegions: [],
      selectedRegion: null,
      universities: [],
      selectedUniversities: [],
      selectedUniversity: null,
      faculties: [],
      selectedFaculties: [],
      selectedFaculty: null,
      schools: [],
      selectedSchools: [],
      selectedSchool: null,
      selectedCurrentDegree: 'Soy estudiante',
      selectedGoalDegree: null,
      advisor: '',
    };
  },
  computed: {
    filteredDegrees() {
      return this.degrees.filter((degree) => degree.type !== 'ninguno');
    },
  },
  mounted: function () {
    // this.getUserIP();
    this.populateData();
  },
  methods: {
    getAbbreviation(degree) {
      let abbr = '';
      switch (degree) {
        case 'Soy estudiante':
          abbr = 'Est.';
          break;
        case 'Soy egresado':
          abbr = 'Est.';
          break;
        case 'Bachiller':
          abbr = 'Bach.';
          break;
        case 'Ingeniero':
          abbr = 'Ing.';
          break;
        case 'Licenciado':
          abbr = 'Lic.';
          break;
        case 'Magister':
          abbr = 'Mg.';
          break;
        case 'Doctor':
          abbr = 'Dr.';
          break;
        default:
          throw `${degree} is not a degree`;
      }
      return abbr;
    },
    updateStepNumber(value) {
      this.$emit('stepNumber', value);
    },
    activateNextStep(value) {
      this.$emit('activateNextStep', value);
    },
    // getUserIP() {
    //   $.getJSON(
    //     'https://api.ipify.org?format=jsonp&callback=?',
    //     function (data) {
    //       let ipUser = data.ip;
    //       console.log(
    //         'se hizo una peticion a',
    //         `http://ip-api.com/json/${ipUser}`,
    //       );
    //       $.getJSON(`http://ip-api.com/json/${ipUser}`, function (data) {
    //         console.log(JSON.stringify(data, null, 2));
    //       });
    //     },
    //   );
    // },
    onChangeCountry(country) {
      this.selectedRegions = this.regions.filter(
        (x) => x.country_id == country.id,
      );
      this.selectedUniversities = [];
      this.selectedFaculties = [];
      this.selectedSchools = [];
    },
    onChangeRegion(region) {
      this.selectedUniversities = this.universities.filter(
        (x) => x.region_id == region.id,
      );
      this.selectedFaculties = [];
      this.selectedSchools = [];
    },
    onChangeUniversity(university) {
      this.selectedFaculties = this.faculties.filter(
        (x) => x.university_id == university.id,
      );
      this.selectedSchools = [];
    },
    onChangeFaculty(faculty) {
      this.selectedSchools = this.schools.filter(
        (x) => x.faculty_id == faculty.id,
      );
    },
    populateData() {
      axios.get('/api/researcher-profile/get-countries').then((response) => {
        this.countries = response.data[0];
        this.regions = response.data[1];
        this.universities = response.data[2];
        this.faculties = response.data[3];
        this.schools = response.data[4];
      });
    },
    updateStore() {
      // load researcher profile
      let payload = {
        researcherProfile: {
          country_id: this.selectedCountry ? this.selectedCountry.id : 0,
          region_id: this.selectedRegion ? this.selectedRegion.id : 0,
          university_id: this.selectedUniversity
            ? this.selectedUniversity.id
            : 0,
          faculty_id: this.selectedFaculty ? this.selectedFaculty.id : 0,
          school_id: this.selectedSchool ? this.selectedSchool.id : 0,
          goal_degree: this.selectedGoalDegree,
          current_degree: this.selectedCurrentDegree,
          advisor: this.advisor,
        },
      };
      this.$store.dispatch('researchConfig/setProfileResearcher', payload);
      //load basic information for cover page
      let basicInformationForPageCover = [];
      basicInformationForPageCover = [
        {
          tag: 'UNIVERSITYNAME',
          value: this.selectedUniversity ? this.selectedUniversity.name : '',
          type: 'university',
        },
        {
          tag: 'FACULTYNAME',
          value: this.selectedFaculty ? this.selectedFaculty.name : '',
          type: 'faculty',
        },
        {
          tag: 'SCHOOLNAME',
          value: this.selectedSchool ? this.selectedSchool.name : '',
          type: 'school',
        },
        {
          tag: 'AUTHOR',
          value: this.$store.getters.getAuthUserFullName, //from main store
          type: 'author',
        },
        {
          tag: 'ADVISOR',
          value: this.advisor ? this.advisor : '',
          type: 'advisor',
        },
        {
          tag: 'TITLE',
          value:
            'Se debe tratar que el título tenga forma de pirámide invertida',
          type: 'titleOfResearch',
        },
        {
          tag: 'CURRENTDEGREE',
          value: this.getAbbreviation(this.selectedCurrentDegree),
          type: 'currentDegree',
        },
        {
          tag: 'GOALDEGREE',
          value: this.selectedGoalDegree,
          type: 'goalDegree',
        },
      ];
      this.$store.dispatch(
        'researchConfig/loadCoverPageBasicInformation',
        basicInformationForPageCover,
      );
    },
    loadStyleAndCoverPage() {
      //load styles
      axios
        .get('/api/thesis-template/styles', {
          params: {
            university_id: this.selectedUniversity.id,
          },
        })
        .then((res) => {
          if (res.data.ok) {
            console.log(res.data);
            let payload = res.data.payload;
            this.$store.dispatch('researchConfig/loadThesisStyles', payload);
          } else {
            // error msg
            console.error(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //load cover page template
      axios
        .get('/api/thesis-template/cover-page', {
          params: {
            university_id: this.selectedUniversity.id,
          },
        })
        .then((res) => {
          if (res.data.ok) {
            console.log(res.data);
            let payload = { coverPage: res.data.payload };
            this.$store.dispatch('researchConfig/loadCoverPage', payload);
          } else {
            // error msg
            console.error(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadThesisTemplate() {
      console.log(
        'se buscara la universidad con id: ',
        this.selectedUniversity.id,
      );
      axios
        .get('/api/thesis-template', {
          params: {
            university_id: this.selectedUniversity.id,
          },
        })
        .then((response) => {
          if (response.data.ok) {
            let payload = { template: response.data.payload };
            this.$store.dispatch('researchConfig/loadThesisTemplate', payload);
          } else {
            console.error(response.data);
            this.$store.dispatch('researchConfig/loadThesisTemplate', {
              template: {},
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
  },
};
</script>

<style scoped >
</style>