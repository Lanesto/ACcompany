<template>
  <div align="center">
    <br><br>
    <b-container align-v="center" align-h="center">
      <h1>ACCompany</h1>
      <b-form id="loginform" autocomplete="off">
        <b-form-input
          class="mt-5 w-50"
            id="id"
            size="lg"
            type="text"
            v-model="id"
            required="required"
            placeholder="ID를 입력해주세요"
        ></b-form-input>
        <b-form-input
          class="mt-3 w-50"
            id="password"
            size="lg"
            type="password"
            v-model="password"
            required="required"
            placeholder="비밀번호를 입력해주세요"
        ></b-form-input>
        <div align="center">
          <b-button class="mt-4 w-50" type="submit" size="lg" variant="" @click.prevent="localLogin">Login</b-button><br><br>
        </div>
      </b-form>
      <button class="sns naver" @click.prevent="naverLogin">Naver</button>
      <button class="sns kakao" @click.prevent="kakaoLogin">Kakao</button>
      <p>You are not member yet? join us <button style="display: inline-block;" @click="$router.push({ name: 'join' })">here</button></p>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      password: null
    }
  },
  methods: {
    localLogin() {
      this.$store.dispatch('user/login', { 
        id: this.id,
        password: this.password
      })
      .then(results => {
        this.$router.replace({ name: 'home' })
      })
    },
    popup(href) {
      let popup = window.open(href, '', '', false)
      let timeout = 10000
      let tick = 100
      let timer = setInterval(() => {
        // cross-origin window close event handler
        timeout -= tick
        if (popup.closed) {
          clearInterval(timer)
          this.$store.dispatch('user/load')
          this.$router.replace({ name: 'home' })
        } 
        else if (timeout < 0) { clearInterval(timer) }
      }, tick)
    },
    naverLogin() { return this.popup('/auth/login/naver') },
    kakaoLogin() { return this.popup('/auth/login/kakao') }
  }
};
</script>
