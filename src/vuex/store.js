import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'


Vue.use(Vuex)

const state = {
  accessToken: '',
  user: null,
  key : localStorage.getItem('log_key'),
  date : localStorage.getItem('log_date'),
  weather : {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations:{
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
      if (state.user){
        if (state.user.isAnonymous){
          state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
        else if (!state.user.photoURL){
          state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
      }
    },
    LOGOUT(state) {
      // 로그아웃
      state.user = null;
    },
  }
})
