<template>
  <div id="FriendlyCard">
    <!-- <div style="padding-left: 30px; position: relative">
      <div
        style="position: absolute; left: 0; top: -10px; bottom: 0; width: 24px"
      />
      <n-h1 prefix="bar" align-text type="warning">
        <n-h1></n-h1>
      </n-h1>
    </div> -->

    <n-grid cols="1 s:2 m:3 " responsive="screen" item-responsive>
      <n-gi>
        <a
          href="https://taeanimal.org.tw/child-animal/?gclid=EAIaIQobChMIk5-Wyr2__AIVGcWWCh3AtwB7EAAYASAAEgJMNvD_BwE"
          target="_blank"
        >
          <n-card hoverable>
            <template #cover>
              <img src="../../assets/friendly/1.jpg" />
            </template>

            <div class="contect">我想了解牠，讓貓狗不再流浪</div>

            <template #footer> </template>
          </n-card>
        </a>
      </n-gi>

      <n-gi>
        <a href="http://taeanimal.org.tw/dog-people/" target="_blank">
          <n-card hoverable>
            <template #cover>
              <img src="../../assets/friendly/2.jpg" />
            </template>
            <div class="contect">逐風共融-人與浪犬安全互動行為</div>
            <template #footer> </template>
          </n-card>
        </a>
      </n-gi>

      <n-gi>
        <a href="https://taeanimal.org.tw/theirtears/" target="_blank">
          <n-card hoverable>
            <template #cover>
              <img src="../../assets/friendly/3.jpg" />
            </template>
            <div class="contect">動物不是娛樂</div>
            <template #footer> </template>
          </n-card>
        </a>
      </n-gi>
    </n-grid>
  </div>
  <div id="FriendlyList">
    <n-card>
      <n-h4>h4 标签</n-h4>
      <n-p>
        《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6
        月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演
        Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987
        年被阿尔弗雷德伯恩鲍姆译成英文。
      </n-p>
    </n-card>
  </div>
</template>

<style lang="scss">
#FriendlyCard {
  margin: auto;
  width: 80%;
  .n-grid {
    margin-top: 3vw;
    margin-bottom: 3vw;
    grid-column-gap: 2vw !important;
    grid-row-gap: 3vh !important;
    div {
      display: flex;
      justify-content: center;
    }
  }

  a {
    width: 100%;
    // flex-grow: 1;
    text-decoration: none;
    color: black;
    background-color: aqua;
  }
  .n-card {
    width: 100% !important;
    // max-width: 350px;
background: #000;
    height: 280px;
    cursor: pointer;
    img {
      object-fit: cover;
      max-height: 220px;
    }
    .n-card__content {
      font-size: calc(1.2rem + 0.1vw);
    }
  }
}
#FriendlyList {
  margin: auto;
  width: 80%;
  .n-card {
    max-width: 100%;
    height: 10%;
  }
}

@media (max-width: 768px) {
}

@media (max-width: 640px) {
  #FriendlyCard {
    .n-grid {
      margin-bottom: 3rem;
      div {
        // margin: inherit;
      }
      .n-gi {
        display: flex;
        align-items: center;
        justify-content: center;
      }
     
    }
  }
}
</style>

<script setup></script>
