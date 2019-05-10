<template>
  <div>
    <br><br>
    <b-container align="center">
      <h1>ACCompany</h1>
      <b-row align-v="center" align-h="center" class="mt-4">
        <b-col md="7">
          <b-form id = "signinform" autocomplete = "off" @keydown.enter = "sendPost">
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "아이디 :"
              label-for = "s_id"
              style="text-align:right">
              <b-form-input id= "s_id"
                        size = "lg"
                        type = "text" 
                        v-model = "id" 
                        required = "required" 
                        placeholder = "ID를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "비밀번호 :"
              label-for = "s_pw"
              style="text-align:right">
              <b-form-input id= "s_pw"
                        size = "lg"
                        type = "password" 
                        v-model = "password" 
                        required = "required" 
                        placeholder = "비밀번호를 입력해주세요">
              </b-form-input>
              <!-- password verification needed -->
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "닉네임 :"
              label-for = "s_nic"
              style="text-align:right">
              <b-form-input id= "s_nic"
                        size = "lg"
                        type = "text" 
                        v-model = "nickname" 
                        required = "required" 
                        placeholder = "닉네임를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "이메일 :"
              label-for = "s_email"
              style="text-align:right">
              <b-form-input id= "s_email"
                        size = "lg"
                        type = "email" 
                        v-model = "email" 
                        required = "required" 
                        placeholder = "이메일를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "이름 :"
              label-for = "username"
              style="text-align:right">
              <b-form-input id= "username"
                        size = "lg"
                        type = "text" 
                        v-model = "username" 
                        required = "required" 
                        placeholder = "이름를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label-for = "sex"
              style="text-align:right" 
              label="성별 :" >
              <b-form-radio-group v-model = "gender" size="lg" style="text-align:center" >
                <b-form-radio name="male" value="M">남</b-form-radio>
                <b-form-radio name="female" value="F">여</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group horizontal 
              :label-cols = "2"
              label-size = "lg"
              label-for = "age"
              style="text-align:right" 
              label="나이 :" >
              <b-form-select v-model = "age">
                <option :value=null disabled>나이를 선택해주세요</option>
                <option v-for="i in 99" :value="i" :key="i" >{{i}}</option>
              </b-form-select>
            </b-form-group>

            <b-button id = "signupb" class="w-75" type="submit" size="lg" variant="secondary" @click.prevent="join">가입하기</b-button>
            <b-button size="lg" :to="{ name: 'login' }">Login</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      id: null,
      password: null,
      nickname: null,
      email: null,
      username: null,
      gender: null,
      age: null
    }
  },
  methods: {
    join() {
      this.$axios.post('/auth/register', {
        id: this.id,
        password: this.password,
        nickname: this.nickname,
        email: this.email,
        username: this.username,
        gender: this.gender,
        age: this.age
      })
      .then(response => {
        alert(response.data.message)
        this.$router.replace({ name: 'join' })
      })
      .catch(err => {

      })
    }
  }
}
<<<<<<< HEAD:frontend/src/components/login/Signup.vue
</script>
=======
</script>

<style scoped>

</style>

>>>>>>> a9b207d... Frontend prototype and routes:frontend/src/components/Join.vue
