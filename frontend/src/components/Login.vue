<template>
  <div>
    <div class="ac-banner white-text col-12">
      <div class="row sub-banner">
          <div class="container">
              <div class="col s12 m6 acinfo">
                  <h4 class="userinfo"><b>Sign in</b></h4>
                  <p class="userinfo subinfo">Welcome to ACCompany</p>
              </div>
              <div class="col s12 m6 sbinfo">
              </div>
          </div>
      </div>
    </div>
    <div class="container mt-5" fluid>
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
          <b-row class="mb-2" align-h="center" style="padding-top: 2rem;">
            
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
    </div>
  </div>
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
