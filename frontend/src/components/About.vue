<template>
  <div>
    <div id="workplace">
      <div class="widget">
        {{ new Date() }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

}
</script>

<style scoped>
  #workplace {
    display: inline-block;
    margin: 2px;
    padding: 10px;
    width: 100%;
    height: 100vh;
    border: 1px solid black;
    border-radius: 5%;
  }

  .widget {
    margin: 5px;
    width: 20vh;
    height: 20vh;
    border: 1px solid black;
    border-radius: 8%;
    overflow: hidden;
  }
</style>
