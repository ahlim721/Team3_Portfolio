<template>
  <div id="chatbot" v-show="visible" class="v-fade">
    <v-menu top offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar color="primary" size="58" v-on="on" class="chatbot-avatar">
          <div id="icon-fairy-back" class="icon-fairy"></div>
        </v-avatar>
      </template>
      <iframe src="https://app.closer.ai/webchat/Bdv8x4" id="chat-contain"></iframe>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data () {
    return {
      visible: false,
      visibleoffset : 600,
      visibleoffsetbottom : 0,
      speakers : [
        'annaSpeaker.png',
        'eddySpeaker.png',
        'hazelSpeaker.png',
        'nanaSpeaker.png',
        'richardSpeaker.png'
      ],
      presp : 'nanaSpeaker.png',
    }
  },
  mounted () {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll2)

    // random image at ChatBot background
    var random = Math.floor(Math.random() * 5) + 0;
    this.presp = this.getImageUrl(this.speakers[random]);
    document.getElementById('icon-fairy-back').style.backgroundImage="url("+this.presp+")";
  },
  destroyed () {
    window.removeEventListener('scroll', this.catchScroll2)
  },
  methods: {
    getImageUrl(url) {
      return require('@/assets/draw/' + url)
    },
    catchScroll2 () {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
      const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
      this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
    },
  },
}
</script>

<style>
#chatbot {
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
  margin: 6px 8px;
}
#chatbot .icon-fairy{
  width: 58px;
  height: 58px;
  content:'';
  position:absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

}
.v-btn:hover, .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover ,#chatbot .icon-fairy:hover{
  background-color: #181818!important;
}
.chatbot-avatar{
  overflow:hidden;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
}
#chat-contain {
  height: 500px;
  border-radius: 15px;
}
.v-menu__content--fixed {
  box-shadow:none!important;
}
</style>
