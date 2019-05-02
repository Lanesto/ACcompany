<template>
  <div>
    <div class="tab">
      <h2>사원 소개</h2>
      <input type="text" id="mySearch" @keyup="myFunction()" placeholder="Search.." title="사원 검색">
      <button class="tablinks" @click="openTab(event, 'team A')">A팀</button>
      <button class="tablinks" @click="openTab(event, 'team B')">B팀</button>
      <button class="tablinks" @click="openTab(event, 'team C')">C팀</button>
    </div>
      <div id="team A" class="tabcontent">
      <h3>London</h3>
      <p>London is the capital city of England.</p>
    </div>

    <div id="team B" class="tabcontent">
      <h3>Paris</h3>
      <p>Paris is the capital of France.</p>
    </div>

    <div id="team C" class="tabcontent">
      <h3>Tokyo</h3>
      <p>Tokyo is the capital of Japan.</p>
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
    openTab (evt, teamName) {
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
      document.getElementById(teamName).style.display = 'block'
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

/* Style the search*/
#mySearch {
  width: 100%;
  font-size: 18px;
  padding: 11px;
  border: 1px solid #ddd;
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
