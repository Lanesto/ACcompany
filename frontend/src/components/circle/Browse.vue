<template>
  <div>
    <div class="ac-banner white-text col-12">
        <div class="row sub-banner">
            <div class="container">
                <div class="col s12 m6 acinfo">
                    <h4 class="userinfo"><b>Circle</b></h4>
                    <p class="userinfo subinfo">This is ACCompany</p>
                </div>
                <div class="col s12 m6 sbinfo">
                </div>
            </div>
        </div>
    </div>
    <h1>Circles</h1>
    <b-card-group columns>
      <b-card
        class="mb-3"
        :title="circle.name"
        v-for="(circle, index) in circles"
        :key="index">
        <b-card-text>
          {{ circle.count_member }} Members
          {{ circle.date_created }}
        </b-card-text>
        <b-button
          class="mb-3 float-right"
          variant="primary"
          :to="{ name: 'circle.home', params: { circleID: circle.id } }">GO</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start  : 0,
      len    : 100,
      circles: []
    }
  },
  methods: {
    get() {
      this.$axios.get('/api/circle', { 
        params: { 
          start: this.start,
          len  : this.len
        }
      })
      .then(results => {
        let circles = results.data
        if (circles.length < this.len) {
          // length should be at least 1
          this.len = circles.length | 1
        }
        this.start += this.len
        circles.forEach(received => {
          let index = this.circles.findIndex(original => original.id === received.id)
          if (index === (-1)) 
            // dupliacted posts are discarded
            this.circles.push(received)
        })
      })
      .catch(err => {})
    }
  },
  created() { this.get() }
}
</script>


<style>
.container {
    max-width: calc(1600px + 10%);
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
}

/* @media only screen and (max-width: 1083px) {
  .container {
      padding-left: 0;
      padding-right: 0;
  }
} */

/* 상단바 */
h4 {
    font-size: 2.28rem;
    line-height: 110%;
    margin: 1.52rem 0 .912rem 0;
}
.white-text {
    color: #fff !important;
}
.ac-banner {
  background: linear-gradient(to bottom,#005799 0,#0076d1);
    box-shadow: 0 12px 45px -8px rgba(0,120,215,.35);
}

.sub-banner {
    padding-top: 40px;
    padding-bottom: 40px;
}
.acinfo {
    margin-top: 14px;
}
.sbinfo{
    margin-top: 14px;
}
.userinfo {
    margin-top: 0px;
    margin-bottom: 0px;
}
.midinfo {
    font-size: 15px;
}
.subinfo {
    color: #96cbed;
    font-size: 13px;
}

@media screen and (min-width: 768px) {
    .acinfo {
        margin-bottom: 38px;
    }
    .acminfo {
        margin-bottom: 38px;
    }
    .sub-banner {
        padding-bottom: 2px;
    }
}

@media screen and (min-width: 540px) {
    .acinfo {
        margin-bottom: 30px;
    }
    .acminfo {
        margin-bottom: 30px;
    }
    .sub-banner {
        padding-bottom: 10px;
    }
    #parallel_wrap {
        min-height: 100vh;
    }
}
@media screen and (max-width: 539px) {
    .acinfo {
        margin-bottom: 40px;
    }
    .acminfo {
        margin-bottom: 40px;
    }
    .sub-banner {
        padding-bottom: 0px;
    }
}
</style>

