<template>
  <div class="solar">
    <i class="mercury"></i>
    <i class="earth"></i>
    <i class="mars"></i>
    <i class="belt"></i>
    <i class="jupiter"></i>
    <i class="saturn"></i>
    <i class="uranus"></i>
    <div class="loading-wrap">
      <h3 data-text="loading..." class="loading">loading...</h3>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
}
</script>
<style>
.loading-wrap{
  position:fixed;
  overflow:hidden;
  bottom: 15%;
  left: 0;
  text-align: center;
  width: 100%;
}
.loading {
  position: relative;
  color: rgba(255,255,255, 0.3);
  font-size:2rem;
  letter-spacing: 0.3rem;
}
.loading:before {
    content: attr(data-text);
    position: absolute;
    overflow: hidden;
    max-width: 7em;
    white-space: nowrap;
    color: #fff;
    animation: loading 6s infinite;
}
@keyframes loading {
    0% {
        max-width: 0;
    }
}
@keyframes solar-loading {
  from {
    border-color: rgba(255,255,255, 0.1);
  }
  to {
      border-color: rgba(255,255,255, 0.5);
  }
}
.solar {
  z-index: 99;
  position: fixed;
  top: 10%;
  margin: 250px auto 350px;
  height: 50px;
  width: 50px;
  background: orange;
  border-radius: 25px;
  -webkit-animation:glow 1.5s linear infinite;
  -moz-animation:glow 1.5s linear infinite;
}
.solar i{
  border-radius: 250px;
  display:block;
  position:absolute;
  border: 1px solid rgba(255,255,255, 0.15);
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  animation: solar-loading 6s infinite;
}
.solar i:before {
  content:'';
  border-radius: 25px;
  background: black;
  display: block;
  position:absolute;
  top: -5px;
  right: 45%;
}
.solar i.mercury {
  width: 80px;
  height: 80px;
  margin-left: -40px;
  left: 50%;
  top: 50%;
  margin-top: -40px;
  -webkit-animation:orbit 1.5s linear infinite;
  -moz-animation:orbit 1.5s linear infinite;
}
.solar i.mercury:before {
  background: #6F5F5F;
  height: 7px;
  width: 7px;
}
.solar i.venus {
  width: 110px;
  height: 110px;
  margin-left: -55px;
  left: 50%;
  top: 50%;
  margin-top: -55px;
  -webkit-animation:orbit 3s linear infinite;
  -moz-animation:orbit 3s linear infinite;
}
.solar i.venus:before {
  background: #E7A71F;
  height: 10px;
  width: 10px;
}
.solar i.earth {
  width: 140px;
  height: 140px;
  margin-left: -70px;
  left: 50%;
  top: 50%;
  margin-top: -70px;
  -webkit-animation:orbit 3.5s linear infinite;
  -moz-animation:orbit 3.5s linear infinite;
}
.solar i.earth:before {
  background: #63BEE2;
  height: 10px;
  width: 10px;
}
.solar i.mars {
  width: 170px;
  height: 170px;
  margin-left: -85px;
  left: 50%;
  top: 50%;
  margin-top: -85px;
  -webkit-animation:orbit 4s linear infinite;
  -moz-animation:orbit 4s linear infinite;
}
.solar i.mars:before {
  background: red;
  height: 10px;
  width: 10px;
}
.solar i.belt {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-width: 25px;
  width: 240px;
  height: 240px;
  margin-left: -120px;
  border-color: rgba(177, 168, 168, 0.21);
  left: 50%;
  top: 50%;
  margin-top: -120px;
}
.solar i.jupiter {
  width: 260px;
  height: 260px;
  margin-left: -130px;
  left: 50%;
  top: 50%;
  margin-top: -130px;
  -webkit-animation:orbit 4.5s linear infinite;
  -moz-animation:orbit 4.5s linear infinite;
}
.solar i.jupiter:before {
  background: #CF9B2B;
  top: -15px;
  height: 30px;
  width: 30px;
}
.solar i.saturn {
  width: 320px;
  height: 320px;
  margin-left: -160px;
  left: 50%;
  top: 50%;
  margin-top: -160px;
  -webkit-animation:orbit 5s linear infinite;
  -moz-animation:orbit 5s linear infinite;
}
.solar i.saturn:before {
  background: #CF7A2B;
  top: -10px;
  height: 20px;
  width: 20px;
}
.solar i.saturn:after {
  background: #fff;
  width: 30px;
  height: 1px;
  content: '';
  position: absolute;
  display: block;
  background: #FFF;
  width: 30px;
  height: 1px;
  content: '';
  right: 43.5%;
  -webkit-transform:rotate(20deg);
  -moz-transform:rotate(20deg);
}
.solar i.uranus {
  width: 360px;
  height: 360px;
  margin-left: -180px;
  left: 50%;
  top: 50%;
  margin-top: -180px;
  -webkit-animation:orbit 6s linear infinite;
  -moz-animation:orbit 6s linear infinite;
}
.solar i.uranus:before {
  background: #10C593;
  top: -8px;
  height: 15px;
  width: 15px;
}
.solar i.neptune {
  width: 400px;
  height: 400px;
  margin-left: -200px;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  -webkit-animation:orbit 6.3s linear infinite;
  -moz-animation:orbit 6.3s linear infinite;
}
.solar i.neptune:before {
  background: #1470E4;
  top: -8px;
  height: 15px;
  width: 15px;
}
@-webkit-keyframes orbit{
  0%{
    -webkit-transform:rotate(0deg);
  }
  50%{
    -webkit-transform:rotate(-180deg);
  }
  100%{
    -webkit-transform:rotate(-360deg);
  }
}
@-webkit-keyframes glow{
  0%{
    box-shadow: none;
  }
  50%{
    background: #FFEB00;
    box-shadow: 0 0 20px orange;
  }
  100%{
    box-shadow: none;
  }
}
@-moz-keyframes orbit{
  0%{
    -moz-transform:rotate(0deg);
  }
  50%{
    -moz-transform:rotate(-180deg);
  }
  100%{
    -moz-transform:rotate(-360deg);
  }
}
@-moz-keyframes glow{
  0%{
    box-shadow: none;
  }
  50%{
    background: #FFEB00;
    box-shadow: 0 0 20px orange;
  }
  100%{
    box-shadow: none;
  }
}
</style>
