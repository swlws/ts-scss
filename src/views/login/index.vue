<template>
  <div class="login-box">
    <div>
      <article>
        <header>
          {{ $t("login.title") }}
        </header>
        <section>
          <div>
            <input
              type="text"
              v-model="account"
              :placeholder="$t('login.accoutPlaceHolder')"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="pwd"
              :placeholder="$t('login.pwdPlaceHolder')"
            />
          </div>
        </section>
        <footer>
          <button @click="submit">
            {{ $t("login.submitBtn") }}
          </button>
        </footer>
      </article>
    </div>

    <aside>
      {{ `@Copyright 2020-${new Date().getFullYear()}` }}
    </aside>
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

      this.$api.app.login(param).then(res => {
        if (res && res.r0 === true) {
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$width: 200px;
@mixin vertical-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 100%;
  height: 100%;
  @include vertical-flex;
  background-color: rgba(0, 0, 0, 0.1);

  > div {
    flex: 1;
    color: #666666;
    @include vertical-flex;

    article {
      padding: 30px;
      border-radius: 5px;
      background-color: #fff;
      @include vertical-flex;

      header {
        font-size: 30px;
        padding: 20px 0px 10px;
      }

      section {
        padding: 30px 0px;
        div {
          margin: 10px 0px;
          input {
            width: $width;
            height: 25px;
            border-radius: 5px;
          }
        }
      }

      footer {
        padding: 0px 0px 20px;
        button {
          cursor: pointer;
          width: $width;
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

  > aside {
    height: 30px;
    color: #333333;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
