<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form @submit.prevent="updateProfile">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    v-model="profileForm.first_name"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Last Name" class="purple-input" />
                </v-flex>
                <v-flex xs12 md12>
                  <p>Género</p>
                  <v-radio-group v-model="profileForm.gender">
                    <v-radio
                      label="Masculino"
                      value="male"
                      color="indigo darken-3"
                    ></v-radio>
                    <v-radio
                      label="Femenino"
                      value="female"
                      color="indigo darken-3"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12 md12>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="Picker without buttons"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="City" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Country" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    type="submit"
                    class="mx-0 font-weight-light"
                    color="success"
                    >Update Profile</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">
              CEO / CO-FOUNDER
            </h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p class="card-description font-weight-light">
              Don't be scared of the truth because we need to restart the human
              foundation in truth And I love you like Kanye loves Kanye I love
              Rick Owens’ bed design but the back is...
            </p>
            <v-btn color="success" round class="font-weight-light"
              >Follow</v-btn
            >
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      // passwordForm: new Form({
      //   current_password: '',
      //   new_password: '',
      //   new_password_confirmation: '',
      // }),
      // profileForm: new Form(
      //   {
      //     first_name: '',
      //     last_name: '',
      //     date_of_birth: '',
      //     gender: '',
      //     facebook_profile: '',
      //     twitter_profile: '',
      //     google_plus_profile: '',
      //   },
      //   false,
      // ),
      avatar: '',
      social_auth: 0,
    };
  },
  mounted() {
    axios
      .get('/api/auth/user')
      .then((response) => response.data)
      .then((response) => {
        this.profileForm.first_name = response.profile.first_name;
        this.profileForm.last_name = response.profile.last_name;
        this.profileForm.date_of_birth = response.profile.date_of_birth;
        this.profileForm.gender = response.profile.gender;
        this.profileForm.facebook_profile = response.profile.facebook_profile;
        this.profileForm.twitter_profile = response.profile.twitter_profile;
        this.profileForm.google_plus_profile =
          response.profile.google_plus_profile;
        this.social_auth = response.social_auth;
      });
  },
  methods: {
    changePassword() {
      // this.passwordForm
      //   .post('/api/user/change-password')
      //   .then((response) => {
      //     toastr['success'](response.message);
      //   })
      //   .catch((response) => {
      //     toastr['error'](response.message);
      //   });
    },
    updateProfile() {
      // this.profileForm.date_of_birth = moment(
      //   this.profileForm.date_of_birth,
      // ).format('YYYY-MM-DD');
      // this.profileForm
      //   .post('/api/user/update-profile')
      //   .then((response) => {
      //     toastr['success'](response.message);
      //     this.$store.dispatch('setAuthUserDetail', {
      //       first_name: this.profileForm.first_name,
      //       last_name: this.profileForm.last_name,
      //     });
      //   })
      //   .catch((response) => {
      //     toastr['error'](response.message);
      //   });
    },
    previewAvatar(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createAvatar(files[0]);
    },
    createAvatar(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    cancelUploadAvatar() {
      this.avatar = '';
    },
    uploadAvatar() {
      // let data = new FormData();
      // data.append('avatar', $('#avatarUpload')[0].files[0]);
      // axios
      //   .post('/api/user/update-avatar', data)
      //   .then((response) => {
      //     this.$store.dispatch('setAuthUserDetail', {
      //       avatar: response.data.profile.avatar,
      //     });
      //     // toastr['success'](response.data.message);
      //     this.avatar = '';
      //     $('#avatarUpload').val('');
      //   })
      //   .catch(() => {
      //     // toastr['error'](error.response.data.message);
      //   });
    },
    removeAvatar() {
      axios
        .post('/api/user/remove-avatar')
        .then(() => {
          this.$store.dispatch('setAuthUserDetail', {
            avatar: null,
          });
          // toastr['success'](response.data.message);
        })
        .catch(() => {
          // toastr['error'](error.response.data.message);
        });
    },
    getAuthUser(name) {
      return this.$store.getters.getAuthUser(name);
    },
  },
  computed: {
    defaultAvatar() {
      return this.getAuthUser('avatar') !== 'avatar.png' ? true : false;
    },
  },
};
</script>
