<template>
  <v-layout>
    <v-toolbar fixed id="header" style="z-index:999;">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <router-link to="/home" exact style="text-decoration:none;">
        <v-toolbar-title>&nbsp;Hello Universe;</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in items">
        <!-- key 넣기 -->
        <v-btn flat :to="item.to" active-class="primary">{{ item.title }}</v-btn>
      </v-toolbar-items>

      <!-- Login area -->
      <v-toolbar-items>
        <!-- Login button -->
        <v-btn flat @click.stop="dialog = true" v-if="!user">LOGIN</v-btn>

        <!-- User image on Header -->
        <v-menu v-if="user" offset-y style="z-index:999;">
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <v-avatar size="40">
                <v-img :src="profile_image" aspect-ratio="1" height="40px"></v-img>
              </v-avatar>
            </v-btn>
          </template>

          <!-- Logout menu -->
          <v-list height="30px" rounded class="py-0 secondary" style="color:white; font-weight:bold">
            <v-list-tile @click="dialog = true">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/profile">
              <v-list-tile-title style="color:white">My Page</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin" v-if="isAdmin">
              <v-list-tile-title style="color:white">Admin</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- Login or Logout modal -->
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card style="border-radius:20px; border-radius:0px;">
            <v-layout style="color:#ffffff; background-color:#ffffff;">
              <v-flex class="text-xs-right" style="color:#ffffff; background-color:#ffffff;">
                <v-btn small icon @click="dialog = false" style="margin-bottom:0px">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <Login></Login>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon @click="notify()">
          <v-icon>star</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- navigation area -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      fixed
      class="secondary"
      id="navigation-style"
    >
      <v-list class="px-1 pt-2">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon :color="getListTitleColor">favorite</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <router-link to="/profile">
              <v-list-tile-title style="color:#ffffff">{{getListTitleName}}</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- <v-divider></v-divider> -->
      <v-list class="pt-0 mb-1" dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          color="white"
          active-class="primary"
          light
          class="my-1"
        >
          <v-list-tile-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="nav-list">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider class="grey darken-2 mx-2"></v-divider>
      <Visited></Visited>
      <v-divider class="grey darken-2 mx-2"></v-divider>
      <v-container py-0>
        <v-layout column>
          <v-flex xs12>
            <v-card flat>
              <WeatherDetail></WeatherDetail>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import Login from "@/components/login/Login";
import WeatherDetail from "@/components/template/WeatherDetail";
import Visited from "@/components/repository/Visited";
import { access } from "fs";
import { isAbsolute } from "path";
import { isArray } from "util";

export default {
  name: "main-header",
  data() {
    return {
      login_title: "LOGIN",
      drawer: null,
      dialog: false,
      items: [
        { title: "HOME", icon: "home", to: "/home" },
        { title: "POST", icon: "web", to: "/post" },
        { title: "PORTFOLIO", icon: "border_color", to: "/portfolio" },
        { title: "TEAM3", icon: "group", to: "/team3" }
      ],
      profile_image: ''
    };
  },
  components: {
    Login,
    Visited,
    WeatherDetail
  },
  methods: {
    notify: function() {
      this.$swal({
        type: "info",
        title: "Notification",
        text: "우측 상단에 ☆을 눌러 즐겨찾기로 추가하세요!"
      });
    }
  },
  computed: {
    getListTitleColor() {
      if (this.$store.getters.getUser == null) {
        return "white";
      } else {
        return "primary";
      }
    },
    getListTitleName() {

      if (this.$store.getters.dbuser && this.$store.getters.getUser){
        if (this.$store.getters.dbuser.hasOwnProperty("nickname")){
          return this.$store.getters.dbuser.nickname;
        }
      }
      else{
        return '';
      }
    },
    user() {
      if (this.$store.getters.getUser && this.$store.getters.dbuser) {
        this.profile_image = this.$store.getters.dbuser.photoURL;
      }
      return this.$store.getters.getUser;
    },
    isAdmin() {
      var typeIsAdmin = typeof this.$store.getters.dbuser;
      var check = false;
      if (typeIsAdmin === "object" && this.$store.getters.dbuser && this.$store.getters.dbuser.hasOwnProperty("email")) {
        firebase
          .database()
          .ref("user")
          .child(this.$store.getters.dbuser.email.split("@")[0])
          .on("value", snapshot => {
            var al = snapshot.val().accessLevel;
            this.$store.commit("setDBUserAL", al);
            check = al === "2" ? true : false;
          });
      }
      return check;
    }
  },
  watch: {
    user() {
      this.dialog = false;
    }
  }
};
</script>
<style>
#header {
  background-color: #181818;
  box-shadow: 0 0 0 0;
}
#header * {
  color: #fff !important;
}
#navigation-style {
  position: fixed;
  z-index: 1000;
  overflow-y: hidden;
}
#navigation-style .theme--light.v-sheet {
  background-color: #181818 !important;
  color: white;
}
#navigation-style .nav-list {
  color: white;
}

.v-btn--icon:before {
  background-color: transparent !important;
}
.v-btn:hover,
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background-color: rgba(1, 1, 1, 0.5) !important;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: transparent !important;
}
#header .text-fff {
  color: #fff !important;
}
#header .v-btn:before {
  background-color: transparent !important;
}
</style>
