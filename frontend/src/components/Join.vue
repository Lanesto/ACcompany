<template>
<div>
  <div class="ac-banner white-text col-12">
    <div class="row sub-banner">
        <div class="container">
            <div class="col s12 m6 acinfo">
                <h4 class="userinfo"><b>Sign up</b></h4>
                <p class="userinfo subinfo">Thanks to join ACCompany</p>
            </div>
            <div class="col s12 m6 sbinfo">
            </div>
        </div>
    </div>
  </div>
    <div class="container mt-2" fluid style="padding-top: 3rem;">
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
  </div>
</div>
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
        id      : this.form.id,
        password: this.form.password,
        nickname: this.form.nickname,
        email   : this.form.email,
        username: this.form.username,
        gender  : this.form.gender,
        age     : this.form.age
      })
      .then(res => {
        this.$router.replace({ name: 'login' })
      })
      .catch(err => { 
        alert('Failed to create a new account\r\n' + err.response.data.message || err)
      })
    }
  }
}
</script>

<style>
.container {
    max-width: calc(1600px + 10%);
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
}

/* @media only screen and (max-width: 1083px) {
  .container {
      padding-left: 0;
      padding-right: 0;
  }
} */

/* 상단바 */
h4 {
    font-size: 2.28rem;
    line-height: 110%;
    margin: 1.52rem 0 .912rem 0;
}
.white-text {
    color: #fff !important;
}
.ac-banner {
  background: linear-gradient(to bottom,#005799 0,#0076d1);
    box-shadow: 0 12px 45px -8px rgba(0,120,215,.35);
}

.sub-banner {
    padding-top: 40px;
    padding-bottom: 40px;
}
.acinfo {
    margin-top: 14px;
}
.sbinfo{
    margin-top: 14px;
}
.userinfo {
    margin-top: 0px;
    margin-bottom: 0px;
}
.midinfo {
    font-size: 15px;
}
.subinfo {
    color: #96cbed;
    font-size: 13px;
}

@media screen and (min-width: 768px) {
    .acinfo {
        margin-bottom: 38px;
    }
    .acminfo {
        margin-bottom: 38px;
    }
    .sub-banner {
        padding-bottom: 2px;
    }
}

@media screen and (min-width: 540px) {
    .acinfo {
        margin-bottom: 30px;
    }
    .acminfo {
        margin-bottom: 30px;
    }
    .sub-banner {
        padding-bottom: 10px;
    }
    #parallel_wrap {
        min-height: 100vh;
    }
}
@media screen and (max-width: 539px) {
    .acinfo {
        margin-bottom: 40px;
    }
    .acminfo {
        margin-bottom: 40px;
    }
    .sub-banner {
        padding-bottom: 0px;
    }
}
</style>
