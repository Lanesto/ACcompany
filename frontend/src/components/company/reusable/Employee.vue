<template>
  <b-card
    class="mb-2 overflow-hidden"
    no-body>
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img class="rounded-0" :src="profile.profile" />
      </b-col>
      <b-col md="7">
        <b-card-body
          :title="profile.name || 'No name'"
          :sub-title="profile.position || 'No position'">
          <b-card-text>
            <!-- {{ profile.introduction }} -->
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <div class="ml-1 mt-2">{{ profile.email || 'No email' }}</div>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
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
    max-width: 45%;
  }
}

@media screen and (min-width: 768px) { /* Medium */
  .card {
    min-width: 95%;
  }
}

@media screen and (min-width: 992px) { /* Large and Extra Large */
  .card {
    min-width: 95%;
  }
}

@media screen and (min-width: 1200px) {
  .card {
    max-width: 45%;
    min-width: 40%;
  }
}
</style>
