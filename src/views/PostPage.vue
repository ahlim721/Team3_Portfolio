<template>
  <div>
    <ImgBanner>
      <div slot="text">Post</div>
    </ImgBanner>
    <v-container>

      <!-- Post Writer -->
      <v-layout justify-center class="mb-2" style="fixed:true;">
          <v-layout wrap align-center justify-center mw-700 px-3>
            <v-flex xs8 mt-4>
              <div>
                <v-btn icon class="ma-0">
                  <i class="fa fa-search"></i>
                </v-btn>
                <input :value="tag" @input="updateTag" id="searchBar" class="searchbar" type="text" placeholder="tag 검색..."
                style="background-color:#fafafa;">
                <v-btn small icon @click="clear" style="margin-bottom:0px">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs4 mt-4 class="bg-1">
              <router-link :to="{
                name: 'makecontents',
                params: {
                  kind: 'Post'
                }}">
               <button
                  v-if="user != null && $store.getters.dbuser && $store.getters.dbuser.accessLevel>=1" 
                  class="button button--wayra button--border-medium button--text-medium button--size-s sm-button"
                  style="float:right;min-width:135px; max-width: 135px; padding:0.5em 1em; margin:0;">
                  포스트 작성
                </button>
              </router-link>
            </v-flex>
          </v-layout>
      </v-layout>

      <!-- Post List -->
      <v-layout class="mt-5" style="min-height:50vh;">
        <v-flex xs12>
          <PostList :limits="4" :load-more="true" v-bind:search="tag"></PostList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/template/ImgBanner'
import PostList from '../components/post/PostList'

export default {
	name: 'PostPage',
	components: {
		ImgBanner,
		PostList,
  },
  computed: {
    user(){ // Get user infomation from vuex
      return this.$store.getters.getUser;
    },
    tag(){
      return this.$store.getters.getSearchtag;
    }
  },
  methods: {
    updateTag(e){
      this.$store.commit('SET_searchtag',e.target.value);
    },
    clear(){
      this.$store.commit('SET_searchtag',"");
    }
  },
  beforeCreate(){
    this.$store.state.isLoading = true
  },
}
</script>
<style>

.searchbar {
    /* float: right; */
    background-color: white;
    color: black;
    padding: 6px 10px;
    width: 160px;
    border: none;
    margin-top: 1px;
    margin-right: 8px;
    font-size: 1em;
    font-weight: bold;
    border-bottom: black solid 2px;
    transition: 0.3s;
}

.searchbar::placeholder {
    color: black;
    font-size: 1em;
    font-weight: bold;
    /* transition: 0.2s; */
}

.searchbar:focus {
    width: 180px;
    font-size: 1em;
    font-weight: bold;
    transition: 0.3s;
    /* Stops the input box from inheriting the styling from the inputs on the request form */
    border-bottom: black solid 2px;
    outline: none;
}

.btn-search {
    cursor: pointer;
    color: black;
    text-decoration: none !important;
    font-size: 1.5em;
    padding-top: 5px;
    margin-right: 40px;
}

@media(max-width:500px){
  .searchbar{
    width:85px !important;
  }
  .searchbar:focus{
    width: 100px !important;
  }
}

</style>

