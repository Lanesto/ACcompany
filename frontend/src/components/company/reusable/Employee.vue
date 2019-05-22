<template>
  <b-card
    class="card mb-2"
    style="max-width: 20rem;"
    :title="profile.name || 'No name'"
    :sub-title="profile.position || 'No position'"
    :img-src="profile.profile"
    img-alt="Profile Image"
    img-top>
    <b-card-text>
      <!-- {{ profile.introduction }} -->
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      <div class="ml-1 mt-2" slot="footer">{{ profile.email || 'No email' }}</div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: { profile: Object }
}
</script>

<style scoped>

@media screen and (max-width: 576px) { /* Extra Small */
  .card {
    width: 100%;
  }
}
@media screen and (min-width: 576px) { /* Small */
  .card {
    min-width: 40%;
    max-width: 50%;
  }
}
@media screen and (min-width: 768px) { /* Medium */
  .card {
    min-width: 30%;
    max-width: 33%;
  }
}
@media screen and (min-width: 992px) { /* Large and Extra Large */
  .card {
      min-width: 20%;
      max-width: 25%;
  }
}
</style>
