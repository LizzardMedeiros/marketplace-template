<template>
  <simple-card title="Login">
    <div class="row left">
      <div class="input-field col s12">
        <the-mask :mask="['(##) ####-####', '(##) #####-####']" id="login" class="validate" v-model="loginInfo.login" />
        <label for="login-login">Telefone</label>
      </div>
      <div class="input-field col s12">
        <input id="login-password" type="password" class="validate" v-model="loginInfo.password">
        <label for="login-password">Senha</label>
      </div>

      <div class="input-field col s12">
        <a class="red waves-effect waves-light btn-large" v-on:click="register">Entrar</a>
      </div>
    </div>
  </simple-card>
</template>

<script>
import axios from 'axios';
import SimpleCard from '@/components/SimpleCard';
import {TheMask} from 'vue-the-mask';
import VFacebookLogin from 'vue-facebook-login-component';

export default {
  name: 'LoginCard',
  created () {

  },
  components: {
    TheMask,
    VFacebookLogin,
    SimpleCard
  },
  methods: {
    register: function () {
      // body...
    }
  },
  data () {
    return {
      loginInfo:{
        login: '',
        password: ''     
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
