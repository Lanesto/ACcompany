<template>
  <b-container class="mt-5 p-5" fluid>
    <b-row>
      <b-col class="mb-4 mb-md-0" col sm="12" md="6" lg="8">
        <b-jumbotron
          class="h-100"
          header="Accompany"
          lead="Improve your workplace with us"
          bg-variant="light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </b-jumbotron>
      </b-col>
      <b-col col sm="12" md="6" lg="4">
        <b-row class="mb-4" align-h="center">
          <b-col>
            <h2>Sign in</h2>
          </b-col>
        </b-row>
        <b-row class="mb-2" align-h="center">
          <b-col>
            <b-form>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.id"
                  type="text"
                  size="lg"
                  required
                  placeholder="Account"
                  v-model="form.id" 
                  v-validate.immediate="'required|length:6,45'"
                  :state="validate('form.id')" />
                  <b-form-invalid-feedback>
                    Account must be at least 6 and maximum 45 characters.
                  </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.password"
                  size="lg"
                  type="password"
                  required
                  placeholder="Password"
                  v-model="form.password"
                  v-validate.immediate="'required|length:6,100'"
                  :state="validate('form.password')" />
                  <b-form-invalid-feedback>
                    Password is a string length between 6 and 100.
                  </b-form-invalid-feedback>
              </b-form-group>
              <b-button
                class="p-2"
                type="submit"
                size="lg"
                block
                variant="dark"
                :disabled="veeErrors.any()"
                @click.prevent="localLogin">
                Login
              </b-button>
            </b-form>
          </b-col>
        </b-row>
        <b-row class="mt-4" align-h="center">
          <!-- .prevent is mandatory! else it will cause site refresh of href default event action -->
          <b-col align-h="start">
            <b-button
              class="sns-naver mb-2"
              block
              variant="success"
              @click.prevent="naverLogin">
              Naver
            </b-button>
            <b-button
              class="sns-kakao mb-2"
              block
              variant="warning"
              @click.prevent="kakaoLogin">
              Kakao
            </b-button>
            <!-- dummy -->
            <b-button
              class="sns-facebook mb-2"
              block
              variant="primary"
              @click.prevent="">
              Facebook
            </b-button>
            <!-- /dummy -->
            <div class="mt-1" align="right">
              You have no account yet? join us <b-link :to="{ name: 'join' }">here</b-link>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions} from 'vuex'

export default {
  data() {
    return {
      form: {
        id      : null,
        password: null
      }
    }
  },
  methods: {
    validate(ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    localLogin() {
      this.login({ 
        id: this.form.id,
        password: this.form.password
      })
      .then(data => {
        this.$router.replace({ name: 'home' })
      })
      .catch(err => {
        alert('Login failed')
      })
    },
    naverLogin() { return this._popup('/auth/login/naver') },
    kakaoLogin() { return this._popup('/auth/login/kakao') },
    // reserved space for other SNS
    _popup(href) {
      // SNS login handler
      let popup   = window.open(href, '', '', false)
      let timeout = 10000 // maximum timeout 10s
      let tick    = 100   // handler frequency
      let timer   = setInterval(() => {
        // cross-origin window close event handler
        timeout -= tick
        if (popup.closed) {
          clearInterval(timer)
          this.load()
          .then(data => {
            this.$router.replace({ name: 'home' })
          })
        } 
        else if (timeout < 0) { clearInterval(timer) }
      }, tick)
    },
    ...mapActions({
      login: 'user/login',
      load : 'user/load'
    })
  }
};
</script>

<style scoped>
.sns-naver {

}

.sns-kakao {

}

.sns-facebook {
  
}
</style>
