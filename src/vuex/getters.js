
// vuex에 대한 getter를 등록.
export default {
  accessToken(state) {
    return state.accessToken
  },
  getUser(state) {
    // 유저 반환
    return state.user
  },
  key(state) {
    return state.key
  },
  date(state) {
    return state.date
  },
  weather(state) {
    return state.weather
  },
  getSearchtag(state){
    return state.searchtag;
  },
  dbuser(state) {
    return state.dbuser
  },
  isAdmin(state) {
    return state.isAdmin
  },
  get_temp_profile(state){
    return state.temp_profile
  }
}
