<template>
  <div class="login">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="card">
        <n-card>
          <n-tabs
            default-value="signin"
            size="large"
            justify-content="space-evenly"
          >
            <n-tab-pane name="signin" tab="登录">
              <n-form>
                <n-form-item-row label="用户名">
                  <n-input />
                </n-form-item-row>
                <n-form-item-row label="密码">
                  <n-input />
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong> 登录 </n-button>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="注册">
              <n-form>
                <n-form-item-row label="用户名">
                  <n-input />
                </n-form-item-row>
                <n-form-item-row label="密码">
                  <n-input />
                </n-form-item-row>
                <n-form-item-row label="重复密码">
                  <n-input />
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong> 注册 </n-button>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    </n-config-provider>
  </div>
</template>

<style lang="scss">
.login {
  height: calc(100vh - 60px);
  background: url("../../assets/bg/login.png");
  background-size: contain;

  .n-config-provider {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .card {
    position: absolute;
    margin: auto;
    top: 150px;
    left: 0;
    bottom: 0;
    right: 0;

    width: 500px;
  }
}
</style>

<script setup>
// const themeOverrides = {
//   Tabs: {
//     tabTextColorActiveBar: "#FD784EFF",
//     tabTextColorHoverBar: "#FD784EFF",
//     tabTextColorActiveCard: "#FD784EFF",
//     barColor: "#FD784EFF",
//     tabTextColorHoverLine: "#FD784EFF",
//     tabTextColorActiveLine: "#FD784EFF",
//   },
//   Button: {
//     colorPrimary: "#FD784EFF",
//   },
// };
</script>
