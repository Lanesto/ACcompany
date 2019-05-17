<template>
  <div class="pill-nav">
    <router-link id="home" :to="{ name: 'circle.home' }" exact>Home</router-link>
    <router-link id="about" :to="{ name: 'circle.about' }">About</router-link>
    <div class="dropdown">
      <span class="dropbtn" :class="{ active: $route.name === 'circle.board' }">Board</span>
      <div class="dropdown-content">
        <router-link id="board" v-for="(board, index) in info.boards" :key="index" :to="{ name: 'circle.board', params: { boardID: board.id } }">{{ board.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.state.circle
    }
  }
}
</script>

<style scoped>
.pill-nav {
  float: right;
}

.pill-nav a {
  display: inline-block;
  color: black;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 5px;
}

/* Change the color of links on mouse-over */
.pill-nav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.pill-nav > .router-link-active,.active {
  background-color: dodgerblue;
  color: white;
}

.dropbtn {
  display: inline-block;
  color: black;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 5px;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a.router-link-active {
  background-color: dodgerblue;
  color: white;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
  right: 0;
}

.dropbtn.active {
  background-color: dodgerblue;
  color: white;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #ddd;
  color: black;
}

</style>
