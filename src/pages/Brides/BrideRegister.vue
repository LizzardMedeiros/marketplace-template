<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-default>
			<div slot="content" id="register" class="container">
				<div class="row">
					<div class="col s12" style="margin-top:48px">
						<img class="" src="@/assets/tag-redregister.svg">
					</div>
				</div>
				<div class="row">
					<div class="col s12" style="margin-top:32px">
						<!--
							<v-facebook-login
							app-id="2424941754221952"
							version="v4.0"
							:login-options="{scope:'email,user_hometown'}"
							@login="getUserData"
							@sdk-init="getSdk"
							:button-style="{position:'relative', margin:'0', width:'100%'}">
								<span slot="login">ENTRAR COM FACEBOOK</span>
								<span slot="logout">SAIR</span>
							</v-facebook-login>
						-->
						<button disabled class="modal-close btn waves-effect green white-text" style="width:100%">ENTRAR COM FACEBOOK</button>
					</div>
					<div class="col s12 center-align">
						<label>ou</label>
					</div>
					<form :action="void(0)" v-on:submit.prevent class="col s12">
						<div class="row">
							<div class="input-field col s12">
								<input id="name" type="text" class="validate" :class="style.color.text" v-model="form.name" required />
								<label for="name" :class="style.color.label">Nome Completo*</label>
							</div>
							<div class="input-field col s12">
								<input readonly type="text" id="wedding" class="datepicker" :class="style.color.text" @change="updateWedding" required />
								<label for="wedding" :class="style.color.label">Data provável para o casamento*</label>
							</div>
						</div>
						<div v-if="form.name.length" class="row">
							<div class="input-field col s12">
								<input id="email" type="email" class="validate" :class="style.color.text" v-model="form.email" required />
								<label for="email" :class="style.color.label">E-Mail*</label>
							</div>
							<div class="input-field col s12">
								<input id="pass" type="password" class="validate" :class="style.color.text" v-model="form.password" required />
								<label for="pass" :class="style.color.label">Senha*</label>
							</div>
							<div class="input-field col s12">
								<input id="cpass" type="password" class="validate" :class="style.color.text" v-model="form.cpassword" required />
								<label for="cpass" :class="style.color.label">Confirmar Senha*</label>
							</div>
						</div>	
						<div v-if="form.cpassword.length" class="row right-align" style="margin-bottom: 18px;">
							<div class="col s12">
								<label :class="style.color.text" v-if="!checkEmail()">E-Mail não válido!</label>
								<label :class="style.color.text" v-else-if="form.password != form.cpassword">Senhas não conferem!</label>
								<button type="submit" v-else @click="registerBride" class="waves-effect waves-light btn red"><i class="material-icons right">chevron_right</i>avançar</button>
							</div>
						</div>									
					</form>
				</div>
			</div>
			<div slot="footer">
				<footer-default/>
			</div> 		
		</layout-default>
	</span>
</template>

<script>
	import {style} from "@/json/config.json"
	import LayoutDefault from "@/layouts/LayoutDefault"
	import FooterDefault from "@/components/footers/FooterDefault"
	import VueLoader from "@/components/gadgets/VueLoader"

	import VFacebookLogin from 'vue-facebook-login-component'
	import InputAddress from "@/components/forms/InputAddress"
	import core from "@/core/Core"
	import {TheMask} from 'vue-the-mask'
	import {schedule} from "@/json/config.json"
	export default {
		name: 'BrideRegister',
		components:{LayoutDefault, FooterDefault, VueLoader, VFacebookLogin, TheMask, InputAddress},
		methods:{
		  	getUserData(i){
		  		var uid = i.authResponse.userID;
		  		var ukey = i.authResponse.accessToken;
				core.FB.api('/'+uid, {fields: 'id, email, name, hometown'}, (response) => {
					response.key = ukey.substring(0, 32);
			  		core.auth(response)
			  		.then((r) => {
			  			if(r) core.getuser().then((res) => {
		  					if(res.type == 1) this.$router.push("/bride");//bride
			  			});
			  		});
				});
		  	},
		  	onLogout(){

		  	},
		  	getSdk(i){
		  		core.FB = i.FB;
		  	},
			checkEmail(){
				return core.validateEmail(this.form.email)
			},
			updateWedding(){
				var dt = $("#wedding").val().split('/');
				this.form.marriage = dt[2]+"-"+dt[1]+"-"+dt[0]
			},
			registerBride(){
				this.$refs.loader.start();
				core.post('/bride/register', this.form)
				.then((r) => {
					this.$refs.loader.stop();
					if(r) this.login();
				});
			},
		  	login(){
		  		this.$refs.loader.start();
		  		core.auth(this.form)
		  		.then((r) => {
		  			if(r) core.getuser().then((res) => {
		  				this.$refs.loader.stop();
		  				if(res.status) this.$router.push("/bride");//bride
		  			});
		  		});
		  	}
		},
		data () {
			return {
				style:style,
				form:{
					name: '',
					password: '',
					cpassword: '',
					address: {},
					marriage: '',
					email: '',
					phone: ''
				}
			}
		},
		mounted: function(){
			var elems = document.querySelector('#wedding');
			schedule.options.minDate = new Date();
			var instances = M.Datepicker.init(elems, schedule.options);
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-bride #register{
		min-height: 75vh;
	}
   	#layout-bride #register .input-field input[type=password], #layout-bride #register .input-field input[type=text], #layout-bride .input-field input[type=email]{
		border-bottom: 0.5px solid #ed3237;
		box-shadow: 0 0.5px 0 0 #ed3237;
   	}
   	#layout-bride #register .input-field input[type=password], #layout-bride #register .input-field input[type=text]:focus , #layout-bride .input-field input[type=email]:focus {
		border-bottom: 1px solid #ed3237;
		box-shadow: 0 1px 0 0 #ed3237;
   }
</style>
