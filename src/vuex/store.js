import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import firebase from 'firebase'

Vue.use(Vuex)

const state = {
  accessToken: '',
  user: null,
  key : localStorage.getItem('log_key'),
  date : localStorage.getItem('log_date'),
  weather : {},
  searchtag:"",
  dbuser : '',
  isAdmin : false,
  isLoading : true,
  onlineFlag : true,
  temp_profile : '',
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations:{
    setDBUser(state, payload) {
      state.dbuser = payload
      if (payload){
        if (payload.hasOwnProperty("accessLevel")){
          state.isAdmin = payload.accessLevel == 2 ? true : false
        }
      }
    },
    setDBUserTel(state, payload) {
      state.dbuser.telephone = payload
    },
    setDBUserBio(state, payload) {
      state.dbuser.biography = payload
    },
    setDBUserNick(state, payload) {
      state.dbuser.nickname = payload
    },
    setDBPhotoURL(state,payload){
      state.dbuser.photoURL = payload
    },
    setDBUserAL(state, payload) {
      state.dbuser.accessLevel = payload
    },
    pushWebLog(state, social){
      var ref = firebase.database().ref()
      ref.child("logs").child(state.date).child(state.key).child('user').set(state.user.email);
      var socialCount =  0
      ref.child("social").child(social).on('value', (snapshot)=>{
        socialCount =  snapshot.val() || 0
      });
      ref.child("social").child(social).set(socialCount+1)
    },
    setWeather(state, payload) {
      // weather를 set하는 함수.
      state.weather = payload
    },
    SET_USER(state,user){
      // User 바꿔주기
      state.user = user;
    },
    LOGOUT(state) {
      // 로그아웃
      state.user = null;
    },
    SET_searchtag(state,tag){
      state.searchtag = tag;
    },
    SET_temp_profile(state,payload){
      state.temp_profile = payload;
    }
  }
})
