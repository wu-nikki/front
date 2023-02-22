<template>
  <div class="container">
    <div class="photo">
      <img src="../../assets/aboutMe/1.1.jpg" class="dog1" />
      <img src="../../assets/aboutMe/2.1.jpg" class="dog2" />
      <img src="../../assets/aboutMe/3.1.jpg" class="cat1" />
    </div>

    <h1>MOUHi，我們相信愛是無價的<br />每一隻毛孩都值得一個幸福的家庭。</h1>
    <p>
      當您走進 MOUHi
      的網站，您會發現這是致力於讓每一隻毛孩都能找到一個溫馨家庭的網站。
      MOUHi就像一隻毛孩的名字，讓人聯想到可愛、親密和溫暖。<br />
      通過我們的網站，讓毛孩和有愛心的人們可以輕鬆地連接起來，您可以輕鬆地搜索最適合您的毛孩，並加入毛孩收藏。我們的網站不僅提供了有關毛孩友善資訊的認養資源，在往後還能讓您可以預約收容所，讓您準備好接納新的家庭成員。
    </p>
  </div>
</template>

<style lang="scss">
.container {
  overflow: hidden;
  width: 100%;
  height: 91vh;
}

h1 {
  margin-left: 20px;
  padding: 2vw 3vw 2vw 4vw;
  font-size: calc(22px + 1.4vw);
  color: rgb(255, 108, 63);
}
p {
  margin-left: 20px;
  padding-left: 4vw;
}

.photo {
  float: right;
  width: 45vw;
  height: 90%;
  position: relative;

  .dog1 {
    width: calc(100px + 7vw);
    border-radius: 20vw;
    position: absolute;
    top: calc(0px + 3vw);
    right: 1vw;
  }
  .cat1 {
    width: calc(150px + 10vw);
    border-radius: 400px;
    position: absolute;
    top: calc(190px - 5vw);
    right: calc(10px + 15vw);
  }
  .dog2 {
    width: calc(150px + 3vw);
    border-radius: 400px;
    position: absolute;
    bottom: -3vw;
    right: calc(150px - 8vw);
  }
}
@media (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
  }
  .photo {
    width: 100%;
    height: 50%;
    .dog1 {
      width: calc(150px + 7vw);
      top: calc(10px + 5vw);
      left: calc(30px + 3vw);
    }
    .cat1 {
      width: calc(250px - 10vw);
      top: calc(120px + 3vw);
      right: calc(150px + 8vw);
    }
    .dog2 {
      top: 0vw;
      right: calc(20px + 5vw);
    }
  }
}
@media (max-width: 545px) {
  .photo {
    .dog1 {
      top: 20px;
      left: 20px;
    }
    .cat1 {
      width: 150px;
      top: 140px;
      right: 150px;
    }
    .dog2 {
      top: 20px;
      right: 20px;
    }
  }
}
</style>

<script setup></script>
