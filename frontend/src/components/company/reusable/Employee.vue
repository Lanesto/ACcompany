<template>
  <div class="card">
    <img :src="profile.profile" height="300px" style="width: 100%;"/>
    <div class="container">
      <h2>{{ profile.name || 'Unknown' }}</h2>
      <p class="title">{{ profile.position || 'Unknown' }}</p>
      <p>Some text that describes me lorem ipsum ipsum lorem.</p>
      <p>{{ profile.email || 'Unknown' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
  width: 25%;
  margin: 4px;
}

.container {
  padding: 0 16px;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

</style>
