<template>
  <div class="login-box">
    <article>
      <header>
        系统登录
      </header>
      <section>
        <div>
          <span>账户：</span>
          <input type="text" v-model="account" />
        </div>
        <div>
          <span>密码：</span>
          <input type="text" v-model="pwd" />
        </div>
      </section>
      <footer>
        <button @click="submit">登录</button>
      </footer>
    </article>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      account: "",
      pwd: ""
    };
  },
  methods: {
    submit() {
      const param = {
        account: this.account,
        pwd: this.pwd
      };

      this.$api.login.login(param).then(res => {
        if (res && res.r0 === true) {
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);

  article {
    width: 300px;
    box-shadow: 0px 0px 10px 1px #fff;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666666;

    header {
      font-size: 30px;
      padding: 20px 0px;
    }

    section {
      padding: 30px 0px;
      div {
        margin: 10px 0px;
        input {
          height: 25px;
        }
      }
    }

    footer {
      padding: 20px 0px;
      button {
        width: 100px;
        height: 30px;
        border: none;
        color: #fff;
        background-color: blue;
        &:active {
          border: none;
        }
      }
    }
  }
}
</style>
