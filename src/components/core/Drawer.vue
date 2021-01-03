<template>
  <v-navigation-drawer color="#110A21" dark v-model="drawer" app width="260">
    <v-list>
      <v-list-item>
        <v-img aspect-ratio="1.7" contain src="/img/viktorjjf.png"></v-img>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ user }}</v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>-->
      </v-list-item>
      <div class="text-center">
        <v-btn color="primary" small :to="{ name: 'UserProfile' }"
          >Editar perfil</v-btn
        >
      </div>
    </v-list>

    <v-divider class="mx-3 mb-3"></v-divider>
    <v-list nav flat>
      <template v-for="(item, i) in items">
        <v-list-item active-class="primary" :key="i" :to="{ name: item.to }">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-group
        v-if="userRole === 'SUPERADMIN'"
        color="white"
        :value="false"
        :prepend-icon="superAdminItems.icon"
      >
        <template v-slot:activator>
          <v-list-item-content>
            {{ superAdminItems.text }}
            <v-chip small color="red" text-color="white">
              SUPERADMIN
            </v-chip>
          </v-list-item-content>
        </template>
        <v-list-item
          active-class="primary"
          v-for="subItem in superAdminItems.items"
          :key="subItem.text"
          :to="{ name: subItem.to }"
        >
          <v-list-item-icon>
            <v-icon>{{ subItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ subItem.text }}
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider class="mx-3 mb-3"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-format-list-bulleted',
          text: 'Usuarios',
          to: 'Users',
          role: 'SUPERADMIN',
        },
        {
          icon: 'mdi-format-list-bulleted',
          text: 'Marcas',
          to: 'Brands',
        },
      ],
      expansionItems: [],
      superAdminItems: {
        icon: 'mdi-format-list-bulleted',
        text: 'SUPERADMIN',
        active: false,
        items: [],
      },
    };
  },
  created() {
    this.items.forEach((item, index, array) => {
      if (item.role && item.role === 'SUPERADMIN') {
        let itemToCopy = item;
        array.splice(index, 1);
        this.superAdminItems.items.push(itemToCopy);
      }
    });
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.toolbar.drawerIcon;
      },
      set(newValue) {
        this.$store.state.toolbar.drawerIcon = newValue;
      },
    },
    user() {
      return this.$store.getters['authModule/getFullNameUser'];
    },
    email() {
      return this.$store.state.authModule.user
        ? this.$store.state.authModule.user.email
        : 'example@gmail.com';
    },
    userRole() {
      return this.$store.state.authModule.user
        ? this.$store.state.authModule.user.role
        : null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
