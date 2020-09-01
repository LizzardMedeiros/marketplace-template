<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-provider>
			<div slot="content" id="register" class="container">
				<div class="row">
					<div class="col s12 center-align" style="margin-top:48px">
						<img class="" src="@/assets/purple-register.png">
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div class="row">
							<div class="input-field col s12">
								<input id="name" type="text" class="validate" v-model="form.fantasy">
								<label for="name">Nome Fantasia*</label>
							</div>
							<div class="input-field col s6">
								<the-mask id="cnpj" :mask="['##.###.###/####-##']" v-model="form.cnpj"/>
								<label for="cnpj">CNPJ</label>
							</div>
							<div class="input-field col s6">
								<the-mask id="cpf" :mask="['###.###.###-##']" v-model="form.cpf"/>
								<label for="cpf">CPF*</label>
							</div>
						</div>
						<div v-if="form.fantasy.length && form.cpf.length" class="row">
							<div class="input-field col s12">
								<input id="email" type="email" class="validate" v-model="form.email">
								<label for="email">E-Mail*</label>
							</div>
							<div class="input-field col s12">
								<input id="password" type="password" class="validate" v-model="form.password">
								<label for="password">Senha*</label>
							</div>
							<div class="input-field col s12">
								<input id="cpassword" type="password" class="validate" v-model="form.cpassword">
								<label for="cpassword">Confirmar Senha*</label>
							</div>
							<div class="input-field col s6">
								<the-mask id="pphone" :mask="['+55 (##) ####-####', '+55 (##) #####-####']" v-model="form.phone"/>
								<label for="pphone" class="active">Telefone</label>
							</div>
							<div class="input-field col s6">
								<the-mask id="whatsapp" :mask="['+55 (##) ####-####', '+55 (##) #####-####']" v-model="form.whatsapp"/>
								<label for="whatsapp" class="active">Whatsapp*</label>
							</div>
						</div>
						<div v-if="form.email.length && form.whatsapp.length" class="row">
							<div class="input-field col s12">
								<input-address v-on:change-address='updateAddr'/>
							</div>
						</div>
						<div v-if="form.address.length" class="row">
							<div class="input-field col s12">
								<input id="website" type="text" class="validate" v-model="form.website"/>
								<label for="website">Website</label>
							</div>
						</div>
						<div v-if="form.cpassword.length" class="row right-align">
							<div class="input-field col s12">
						  		<a class="btn deep-purple" @click="register">
									<i class="material-icons right">chevron_right</i>Registrar
								</a>
							</div>
						</div>			
					</div>
				</div>
			</div>
			<div slot="footer">
				<footer-provider/>
			</div> 		
		</layout-provider>
	</span>
</template>

<script>
import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
import VueLoader from "@/components/gadgets/VueLoader"

import InputAddress from "@/components/forms/InputAddress"
import {TheMask} from 'vue-the-mask'
import Core from "@/core/Core"
export default {
  name: 'ProviderRegister',
  components:{InputAddress, LayoutProvider, FooterProvider, VueLoader, TheMask},
  methods:{
  	updateAddr(address){
  		this.form.address = address;
  	},
  	register(){
  		if(this.form.phone != ''){
  			if(this.form.phone.length < 10){
	  			Core.showMessage('Número de telefone inválido!');
	  			return;
  			}
  		}
		if(this.form.whatsapp == ''){
			Core.showMessage('Número de telefone inválido!');
			return;			
		}else if(this.form.whatsapp.length < 10){
			Core.showMessage('Número de telefone inválido!');
			return;
		}
		if(!Core.validateEmail(this.form.email)){
			Core.showMessage('Endereço de e-mail inválido!');
			return;
		}
		this.$refs.loader.start();
  		Core.showMessage('Estamos processando, aguarde!');
  		Core.post('/provider/register', this.form)
  		.then((r) => {
  			this.$refs.loader.stop();
  			if(r) this.login();
  		});
  	},
  	login(){
  		this.$refs.loader.start();
  		Core.auth(this.form)
  		.then((r) => {
  			if(r) Core.getuser().then((res) => {
  				this.$refs.loader.stop();
  				if(res.status) this.$router.push("/provider");
  			});
  		});
  	}
  },
  data () {
    return {
    	form:{
    		fantasy: '',
    		cnpj: '',
    		cpf: '',
    		email: '',
    		password: '',
    		cpassword: '',
    		phone: '',
    		whatsapp: '',
    		address: '',
    		website: ''
    	}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	#layout-provider #register{
		min-height: 75vh;
	}
</style>
