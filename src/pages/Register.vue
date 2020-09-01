<template>
  <div>
    <nav-bar color="red"/>
    <section id="register">
      <div class="row container">
        <login-card class="col m5 hide-on-small-only"/>
        <div class="col m2"/>
        <bride-register-card color="red" class="col s12 m5"/> 
      </div>
    </section>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar';
import VFacebookLogin from 'vue-facebook-login-component';
import BrideRegisterCard from '@/components/BrideRegisterCard'
import LoginCard from '@/components/LoginCard'

export default {
  name: 'Register',
  components:{
    NavBar,
    VFacebookLogin,
    BrideRegisterCard,
    LoginCard
  },
  methods:{
  },
  data () {
    return {
      user: '',
      password: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #register{
    background-image: url('~@/assets/img/background.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    min-height: calc(100vh - 55px);
    min-width: 100vw;
    height: auto;
    width: auto;
  }

    #register .container{
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }

  @media (min-width: 992px) {
    #register{
      min-height: calc(100vh - 65px);
    }
  }
</style>
