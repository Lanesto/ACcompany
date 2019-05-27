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
        <b-row class="mb-2" align-h="center">
          <b-col>
            <b-form>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.id"
                  type="text"
                  size="md"
                  required
                  placeholder="Account"
                  v-model="form.id"
                  v-validate.immediate="'required|length:6,45'"
                  :state="validate('form.id')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Account must be at least 6 and maximum 45 characters.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.password"
                  size="md"
                  type="password"
                  required
                  placeholder="Password"
                  v-model="form.password"
                  v-validate.immediate="'required|length:6,100'"
                  :state="validate('form.password')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Password must be length between 6 and 100.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.pwRepeat"
                  size="md"
                  type="password"
                  required
                  placeholder="Repeat your password"
                  v-model="form.pwRepeat"
                  v-validate.immediate="{ required: true, confirmed: form.password }"
                  :state="validate('form.pwRepeat')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Password does not match.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.nickname"
                  type="text"
                  size="md"
                  required
                  placeholder="Nickname"
                  v-model="form.nickname"
                  v-validate.immediate="'required|length:2,45'"
                  :state="validate('form.nickname')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Nickname should be between 2 and 45 characters long.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.email"
                  type="email"
                  size="md"
                  required
                  placeholder="Email"
                  v-model="form.email"
                  v-validate.immediate="'required|email'"
                  :state="validate('form.email')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Please enter valid email.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.username"
                  type="text"
                  size="md"
                  required
                  placeholder="Username"
                  v-model="form.username"
                  v-validate.immediate="'required|length:1,16'"
                  :state="validate('form.username')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Username should be at least 1 and maximum 16 characters.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  class="w-100"
                  name="form.age"
                  type="number"
                  min="0"
                  max="200"
                  size="md"
                  required
                  placeholder="Age"
                  v-model="form.age"
                  v-validate.immediate="'required|between:0,200'"
                  :state="validate('form.age')" />
                <b-form-valid-feedback>
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback>
                  Age should be between 0 and 200
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-radio-group
                  class="ml-1"
                  name="form.gender"
                  v-model="form.gender"
                  v-validate.immediate="'required'"
                  :state="validate('form.gender')">
                  <b-form-radio value="M">
                    Male
                  </b-form-radio>
                  <b-form-radio value="F">
                    Female
                  </b-form-radio>
                </b-form-radio-group>
                <b-form-valid-feedback :state="validate('form.gender')">
                  Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback :state="validate('form.gender')">
                  Please select   one.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-progress :max="countAll" animated>
              <b-progress-bar :value="countValid" variant="primary"/>
              <b-progress-bar :value="countInvalid" variant="danger"/>
            </b-progress>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              class="p-2"
              size="md"
              block
              variant="success"
              :disabled="veeErrors.any()"
              @click.prevent="join">
              Create an account
            </b-button>
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
      form: {
        id      : null,
        password: null,
        pwRepeat: null,
        nickname: null,
        email   : null,
        username: null,
        gender  : null,
        age     : null
      }
    }
  },
  computed: {
    countAll() {
      return Object.keys(this.veeFields).length
    },
    countValid() {
      return this.countAll - this.countInvalid
    },
    countInvalid() {
      return this.veeErrors.items.length
    }
  },
  methods: {
    validate(ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
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
      .catch(err => { 
        alert('Failed to create a new account\r\n' + err.response.data.message || err)
      })
    }
  }
}
</script>
