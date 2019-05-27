<template>
  <div>
    <div class="ac-banner white-text col-12">
        <div class="row sub-banner">
            <div class="container">
                <div class="col s12 m6 acinfo">
                    <h4 class="userinfo"><b>About</b></h4>
                    <p class="userinfo subinfo">About ACCompany</p>
                </div>
                <div class="col s12 m6 sbinfo">
                </div>
            </div>
        </div>
    </div>
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
