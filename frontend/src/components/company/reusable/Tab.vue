<template>
  <b-nav class="float-md-right my-2 my-md-0" pills>
    <b-nav-item 
      class="mr-1"
      exact-active-class="active"
      :to="{ name: 'company.home' }">
      Home
    </b-nav-item>
    <b-nav-item
      class="mr-1"
      exact-active-class="active"
      :to="{ name: 'company.about' }">
      About
    </b-nav-item>
    <b-nav-item
      class="mr-1"
      exact-active-class="active"
      :to="{ name: 'company.schedule' }">
      Schedule
    </b-nav-item>
    <b-nav-item-dropdown text="Board" right>
      <b-dropdown-item 
        class="mb-1"
        exact-active-class="active"
        v-for="(board, index) in info.boards"
        :key="index"
        :to="{ name: 'company.board', params: { boardID: board.id } }">
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
      info: state => state.company
    })
  }
}
</script>
