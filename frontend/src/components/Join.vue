<template>
  <b-container class="mt-2 p-5" fluid>
    <b-row>
      <b-col class="mb-4 mb-md-0" sm="12" md="6" lg="8">
        <b-jumbotron
          class="h-100"
          header="Accompany"
          lead="Improve your workplace with us"
          bg-variant="light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </b-jumbotron>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-row class="mb-4" align-h="center">
          <b-col>
            <h2>Sign up</h2>
          </b-col>
          <b-col align="end">
            <b-link :to="{ name: 'login' }">Back</b-link>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-progress :max="7" animated>
              <b-progress-bar :value="5" variant="primary"/>
              <b-progress-bar :value="2" variant="danger"/>
            </b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-2" align-h="center">
          <b-col>
            <b-form>
              <b-form-input
                class="mb-2 w-100"
                type="text"
                size="md"
                required
                placeholder="Account"
                v-model="id" />
              <b-form-input
                class="mb-2 w-100"
                size="md"
                type="password"
                required
                placeholder="Password"
                v-model="password" />
              <b-form-input
                class="mb-2 w-100"
                size="md"
                type="password"
                required
                placeholder="Repeat your password"
                v-model="pwRepeat" />
              <b-form-input
                class="mb-2 w-100"
                type="text"
                size="md"
                required
                placeholder="Nickname"
                v-model="nickname" />
              <b-form-input
                class="mb-2 w-100"
                type="email"
                size="md"
                required
                placeholder="Email"
                v-model="email" />
              <b-form-input
                class="mb-2 w-100"
                type="text"
                size="md"
                required
                placeholder="Username"
                v-model="username" />
              <b-form-input
                class="mb-2 w-100"
                type="number"
                size="md"
                required
                placeholder="Age"
                v-model="age" />
              <b-form-radio-group
                class="ml-1 mb-3"
                v-model="gender">
                <b-form-radio value="M">
                  Male
                </b-form-radio>
                <b-form-radio value="F">
                  Female
                </b-form-radio>
              </b-form-radio-group>
              <b-button
                class="p-2"
                type="submit"
                size="md"
                block
                variant="success"
                @click.prevent="join">
                Create an account
              </b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// TODO: Form validation and progress bar binding

export default {
  data () {
    return {
      id      : null,
      password: null,
      pwRepeat: null,
      nickname: null,
      email   : null,
      username: null,
      gender  : null,
      age     : null
    }
  },
  methods: {
    join() {
      // if validated then
      this.$axios.post('/auth/register', {
        id      : this.id,
        password: this.password,
        nickname: this.nickname,
        email   : this.email,
        username: this.username,
        gender  : this.gender,
        age     : this.age
      })
      .then(res => {
        this.$router.replace({ name: 'join' })
      })
      .catch(err => { })
    }
  }
}
</script>
