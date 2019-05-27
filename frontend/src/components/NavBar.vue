<template>
  <b-navbar id="navbar" toggleable="md" type="light" variant="light" sticky>
    <div class="container">
      <!-- left aligned -->
      <b-navbar-brand id="navbar-brand" :to="{ name: 'home' }" class="ml-3">
        <h3>ACC</h3>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
          <b-nav-item :to="{ name: 'company.home' }">Company</b-nav-item>
          <b-nav-item :to="{ name: 'circle.browse' }">Circle</b-nav-item>
          <b-nav-item :to="{ name: 'widget' }">Widget</b-nav-item>
        </b-navbar-nav>
        <!-- right aligned -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <!-- <b-input-group class="mr-sm-2" size="sm">
              <b-form-input placeholder="Search"></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" size="sm"><fa-icon style="position: relative; top: 1px;" icon="search" /></b-button>
              </b-input-group-append>
            </b-input-group> -->
            <div class="my-2">
              <template v-if="!loggedIn">
                <b-button size="sm" class="mr-sm-1" variant="light" :to="{ name: 'login' }">Sign in</b-button>
                <b-button size="sm" variant="light" :to="{ name: 'join' }">Sign up</b-button>
              </template>
              <template v-else>
                <b-button size="sm" class="mr-sm-1" variant="light" @click="logout">Sign out</b-button>
                <span id="user-icon" @click="$router.push({ name: 'user' })">
                  <fa-icon icon="user" class="ml-1" style="position: relative; top: 2px; color: white;" />
                </span>
              </template>
            </div>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      .then(() => this.$router.replace('/'))
    }
  }
}
</script>

<style scoped>
  #navbar {
    min-height: 70px;
    z-index: 998;
  }
  #navbar-brand h3 {
    position: relative;
    margin-right: 5px;
    top: 3px;
  }

  #user-icon:hover {
    cursor: pointer;
  }
  
.container {
    max-width: calc(1600px + 10%);
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
}

@media only screen and (max-width: 1083px) {
  .container {
      padding-left: 0;
      padding-right: 0;
  }
}
</style>
