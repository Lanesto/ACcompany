<template>
  <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark" sticky>
    <!-- left aligned -->
    <b-navbar-brand id="navbar-brand" :to="{ name: 'home' }" class="ml-3">
      <h3>ACC</h3>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'introduce' }">사원 소개</b-nav-item>
        <b-nav-item :to="{ name: 'notice' }">공지 사항</b-nav-item>
        <b-nav-item :to="{ name: 'vacation' }">휴가 체계</b-nav-item>
        <b-nav-item-dropdown text="게시판">
          <b-dropdown-item :to="{ name: 'company' }">Company</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'circle' }">Circle</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'widget' }">Widget Test</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <!-- right aligned -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-input-group class="mr-sm-2" size="sm">
            <b-form-input placeholder="Search"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" size="sm"><fa-icon style="position: relative; top: 2px;" icon="search" /></b-button>
            </b-input-group-append>
          </b-input-group>
          <div class="my-2">
            <b-button size="sm" class="mr-sm-1" variant="outline-light">Sign in</b-button>
            <b-button size="sm" variant="outline-light">Sign up</b-button>
          </div>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      // ...
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
</style>
