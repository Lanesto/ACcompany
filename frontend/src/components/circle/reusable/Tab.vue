<template>
  <b-nav style="float: right;" pills>
    <b-nav-item 
      class="mr-1"
      exact-active-class="active"
      :to="{ name: 'circle.home' }">
      Home
    </b-nav-item>
    <b-nav-item
      class="mr-1"
      exact-active-class="active"
      :to="{ name: 'circle.about' }">
      About
    </b-nav-item>
    <b-nav-item-dropdown text="Board" right>
      <b-dropdown-item 
        class="mb-1"
        exact-active-class="active"
        v-for="(board, index) in info.boards"
        :key="index"
        :to="{ name: 'circle.board', params: { boardID: board.id } }">
        {{ board.name }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      info: state => state.circle
    })
  }
}
</script>
