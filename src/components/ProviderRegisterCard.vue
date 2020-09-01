<template>
  <simple-card title="Registre-se como fornecedor!">
    <div class="row left">
      <div class="input-field col l12 s12">
        <input id="register-name" type="text" class="validate" v-model="registerInfo.fantasy">
        <label for="register-name">Nome Fantasia</label>
      </div>
      <div class="input-field col l6 s12">
        <input id="register-login" type="email" class="validate" v-model="registerInfo.email">
        <label for="register-login">E-mail</label>
      </div>
      <div class="input-field col l6 s12">
        <the-mask :mask="['+55 (##) ####-####', '+55 (##) #####-####']" id="phone" class="validate" v-model="registerInfo.phone"/>
        <label for="phone">Celular</label>
      </div>

      <div class="input-field col s8">
        <input id="city" type="text" class="validate" v-model="registerInfo.address.city">
        <label for="city">Cidade</label>
      </div>
      <div class="input-field col s4">
      <select @change="updateState" id="state">
        <option v-for="(state, index) in states" :key="index" :value="state[0]" :selected="state[1]">{{state[0]}}</option>
      </select>
        <label for="state">Estado</label>
      </div>
      <div class="input-field col l6 s12">
        <input id="register-password" type="password" class="validate" v-model="registerInfo.password">
        <label for="register-password">Senha</label>
      </div>
      <div v-if="registerInfo.password" class="input-field col l6 s12">
        <input id="register-cpassword" type="password" class="validate" v-model="registerInfo.cpassword">
        <label for="register-cpassword">Confirmar Senha</label>
      </div>

      <div class="input-field col s12">
        <a class="waves-effect waves-light btn" :class="color" v-on:click="register">Registrar</a>
      </div>
      <div class="col s12">
        <router-link tag="a" to="/">Você é noiva?</router-link>
      </div>

    </div>
  </simple-card>
</template>

<script>
import Core from '@/core/Core';
import SimpleCard from '@/components/SimpleCard';
import {TheMask} from 'vue-the-mask';
import VFacebookLogin from 'vue-facebook-login-component';

export default {
  name: 'ProviderRegisterCard',
  props:['color'],
  components: {
    TheMask,
    VFacebookLogin,
    SimpleCard
  },
  methods: {
    updateState: function(){
      this.registerInfo.address.state = $('#state').val();
    },
    register: function () {
      if(!this.registerInfo.address.state) this.registerInfo.address.state = 'MG';
      Core.post("/provider/preregister", this.registerInfo);
    }
  },
  data () {
    return {
      states:[
        ['AC'],
        ['AL'],
        ['AP'],
        ['AM'],
        ['BA'],
        ['CE'],
        ['DF'],
        ['ES'],
        ['GO'],
        ['MA'],
        ['MT'],
        ['MS'],
        ['MG',1],
        ['PA'],
        ['PB'],
        ['PR'],
        ['PE'],
        ['PI'],
        ['RJ'],
        ['RN'],
        ['RS'],
        ['RO'],
        ['RR'],
        ['SC'],
        ['SP'],
        ['SE'],
        ['TO']
      ],
      registerInfo:{
        fantasy: '',
        email: '',
        phone: '',
        address: {},
        password: '',
        cpassword: ''     
      }
    }
  },
  mounted: function(){
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  label{
    color: #ed3237;
  }

  .input-field input[type=number],
  .input-field input[type=text],
  .input-field input[type=password],
  .input-field input[type=email]
  {
    border-bottom: 0.5px solid #ed3237;
    box-shadow: 0 0.5px 0 0 #ed3237;
  }

  .input-field input[type=number]:focus,
  .input-field input[type=text]:focus,
  .input-field input[type=password]:focus,
  .input-field input[type=email]:focus
  {
    border-bottom: 1px solid #ed3237;
    box-shadow: 0 1px 0 0 #ed3237;
  }

   .input-field input[type=number]:focus + label,
   .input-field input[type=text]:focus + label,
   .input-field input[type=password]:focus + label,
   .input-field input[type=email]:focus + label {
     color: #ed3237;
   }
</style>
