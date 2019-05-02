<template>
  <div>
    <div class="tab">
        <h2>휴가 체계</h2>
    </div>

    <div id="vacationL" class="tabcontent">
      <h3>London</h3>
      <p>London is the capital city of England.</p>
    </div>
  </div>
</template>

<script>
export default {
  created () {
  },
  data () {
    return {
      // ...
    }
  },
  methods: {
    openTab (evt, noticeName) {
      // Declare all variables
      var i, tabcontent, tablinks

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName('tabcontent')
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName('tablinks')
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace('active', '')
      }

      // Show the current tab, and add an "active" class to the link that opened the tab
      document.getElementById(noticeName).style.display = 'block'
      evt.currentTarget.className += 'active'
    }
  }
}
</script>

<style scoped>
  * {box-sizing: border-box}

/* Style the tab */
.tab {
  float: left;
  border: 1px solid #ccc;
  background-color: #ffffff;
  width: 30%;
  height: 300px;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  display: block;
  background-color: inherit;
  color: black;
  padding: 22px 16px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  float: left;
  padding: 0px 12px;
  border: 1px solid #ccc;
  width: 70%;
  border-left: none;
  height: 300px;
}
</style>
