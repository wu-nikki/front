<template>
  <div class="container">
    <div class="text">
      <h1>MOUHi，我們相信愛是無價的<br />每一隻毛孩都值得一個幸福的家庭。</h1>
      <p>
        當您走進 MOUHi
        的網站，您會發現這是致力於讓每一隻毛孩都能找到一個溫馨家庭的網站。
        <br />
        MOUHi就像一隻毛孩的名字，讓人聯想到可愛、親密和溫暖。<br />
        通過我們的網站，讓毛孩和有愛心的人們可以輕鬆地連接起來，您可以輕鬆地搜索最適合您的毛孩，並加入毛孩收藏。我們的網站不僅提供了有關毛孩友善資訊的認養資源，在往後還能讓您可以預約收容所，讓您準備好接納新的家庭成員。
      </p>
      <img src="../../assets/aboutMe/bg1.1.png" class="bg1" />
      <img src="../../assets/aboutMe/bigs.png" class="dogSmall" />
    </div>
    <div class="photo">
      <!-- <img src="../../assets/aboutMe/1.1.jpg" class="dog1" />
      <img src="../../assets/aboutMe/2.1.jpg" class="dog2" />
      <img src="../../assets/aboutMe/3.1.jpg" class="cat1" /> -->
      <!-- <img src="../../assets/aboutMe/bg2.png" class="bg2" /> -->
      <div class="bg2"></div>

      <img src="../../assets/aboutMe/big2.png" class="dog" />
    </div>
  </div>
</template>

<style lang="scss">
// h1
/** animation text-focus-in */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 2;
  }
}

// dog
/*** animation fade-in-fwd */
@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}

// bg2
/*** animation fade-in-right */
@-webkit-keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

// bg1
/*** animation fade-in-left */
@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.text {
  z-index: 1;
  width: 75vw;
  h1 {
    float: left;
    margin: 5vw 0px 1vw 11vw;

    padding-left: 10vw;
    font-size: calc(22px + 1.4vw);
    color: rgb(255, 108, 63);
    //
    -webkit-animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      both;
    animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }
  p {
    width: calc(400px + 18vw);
    float: left;
    margin: 0vw 0px 1vw 11vw;
    padding-left: 10vw;
    font-size: calc(14px + 0.2vw);
    line-height: 2;
    color: rgb(21, 4, 44);
    -webkit-animation: text-focus-in 2s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      both;
    animation: text-focus-in 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }
  .dogSmall {
    height: calc(100px + 20vw);
    position: absolute;
    bottom: 0vw;
    left: calc(10px + 0.5vw);
    overflow: hidden;
  }
}
.bg1 {
  float: left;
  width: 90vw;
  height: calc(250px + 20vw);
  z-index: -1;
  position: absolute;
  bottom: 0vw;
  left: -4vw;

  -webkit-animation: fade-in-left 0.8s linear both;
  animation: fade-in-left 0.8s linear both;
}

.photo {
  float: right;
  width: 45vw;
  height: 100%;
  position: relative;

  .bg2 {
    width: calc(30px + 30vw);
    height: calc(30px + 30vw);
    border-radius: 300px;
    position: absolute;
    top: calc(30px + 4vw);
    right: 5px;
    background-color: rgb(247, 199, 160);

    -webkit-animation: fade-in-right 0.8s linear both;
    animation: fade-in-right 0.8s linear both;
  }
  .dog {
    z-index: 3;
    width: calc(350px + 20vw);
    position: absolute;
    bottom: 0px;
    right: 10vw;
    filter: drop-shadow(1px 5px 0.15rem rgb(253, 236, 222));
    -webkit-animation: fade-in-fwd 1s ease-in-out both;
    animation: fade-in-fwd 1s ease-in-out both;
  }
}
@media (max-width: 768px) {
  .container {
    display: flex;
  }
  .text {
    h1 {
      float: left;
      font-size: calc(24px + 1vw);
      width: 100%;
      padding-left: 4vw;
      margin-left: 4vw;
    }
    p {
      width: calc(410px + 10vw);

      float: left;
      padding-left: 4vw;
      margin-left: 4vw;
    }
    .dogSmall {
      visibility: hidden;
    }
  }
  .photo {
    .bg2 {
      width: 250px;
      height: 250px;

      top: calc(20px + 7vw);
    }
  }
}

@media (max-width: 545px) {
  .text {
    h1 {
      font-size: calc(18px + 0.8vw);
      width: 120%;

    }
    p {
      width: calc(300px + 10vw);
    }
  }
  .photo {
    .dog {
    width: calc(350px + 10vw);

      right: 1vw;
    }
  }
}
</style>

<script setup></script>
