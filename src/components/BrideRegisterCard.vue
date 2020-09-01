<template>
  <simple-card title="Registre-se como noiva!">
    <div class="row left">
      <div class="input-field col l6 s12">
        <input id="register-name" type="text" class="validate" v-model="registerInfo.name">
        <label for="register-name">Nome Completo</label>
      </div>
      <div class="input-field col l6 s12">
        <the-mask id="register-phone" class="validate" v-model="registerInfo.phone" :mask="['+55 (##) ####-####', '+55 (##) #####-####']"/>
        <label for="register-phone">Celular</label>
      </div>
      <div class="input-field col l6 s12">
        <input id="register-login" type="email" class="validate" v-model="registerInfo.email">
        <label for="register-login">E-mail</label>
      </div>
      <div class="input-field col l6 s12">
        <input type="text" class="datepicker" id="marriage">
        <label for="marriage">Data do Casamento</label>
      </div>

      <div class="input-field col s8">
        <input type="text" class="text" id="city" v-model="registerInfo.address.city">
        <label for="city">Cidade</label>
      </div>
      <div class="input-field col s4">
        <select @change="updateState" id="state">
          <option v-for="(state, index) in states" :key="index" :value="state[0]" :selected="state[1]">{{state[0]}}</option>
        </select>
        <label for="state">Estado</label>
      </div>

      <div v-if="registerInfo.name && registerInfo.email" class="input-field col s12 l6">
        <input id="register-password" type="password" class="validate" v-model="registerInfo.password">
        <label for="register-password">Senha</label>
      </div>
      <div v-if="registerInfo.password" class="input-field col s12 l6">
        <input id="register-cpassword" type="password" class="validate" v-model="registerInfo.cpassword">
        <label for="register-cpassword">Confirmar Senha</label>
      </div>

      <div class="input-field col s12">
          <a class="waves-effect waves-light btn" :class="color" v-on:click="register">Registrar</a>
      </div>

      <div class="col s12">
        <router-link tag="a" to="/provider" class="">Você é fornecedor?</router-link>
      </div>

    </div>
  </simple-card>
</template>

<script>
import Core from '@/core/Core';
import {schedule} from '@/core/config'
import SimpleCard from '@/components/SimpleCard';
import {TheMask} from 'vue-the-mask';
import VFacebookLogin from 'vue-facebook-login-component';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'BrideRegisterCard',
  props:['color'],
  components: {
    TheMask,
    VFacebookLogin,
    SimpleCard,
    VueRecaptcha
  },
  methods: {
    updateState(){
      var state = $('#state').val();
      this.registerInfo.address.state = state;
    },
    register: function () {
      if(!this.registerInfo.address.state) this.registerInfo.address.state = 'MG';
      let date = document.getElementById('marriage').value;
      date = date.split("/");
      let fdate = date[2]+"-"+date[1]+"-"+date[0];
      this.registerInfo.marriage = fdate;
      Core.post("/bride/register", this.registerInfo);
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
        name: '',
        email: '',
        phone: '',
        address: {},
        password: '',
        cpassword: ''      
      }
    }
  },
  mounted: function(){
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, schedule.options);
    elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #card{
    background-color: red;
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
