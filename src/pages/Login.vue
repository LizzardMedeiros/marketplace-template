<template>
	<span>
		<layout-default>
			<div slot="content" class="row" style="margin-top:32px;">
				<div class="input-field col s12 center-align">
					<a class="btn red valign-wrapper modal-trigger" style="width:100%" data-target="Login">
						<img class="left" src="@/assets/footer-logo-noline.svg" style="width:32px">Já sou cadastrada
					</a>
				</div>
				<div class="input-field col s12 center-align">
					<router-link tag="a" :class="style.color.background+' '+style.color.text" class="btn  black-text row" to="/home" style="width:100%">
						<i class="fas fa-sign-in-alt left"></i>
						Cadastrar
					</router-link>
				</div>
				<div class="col s12">
					<div class="row">
						<div class="col s6" style="text-align: justify;">
							<h2 :class="style.color.text">Noivas, Casamentos, Orçamentos</h2>
						</div>
					</div>
					<div class="row">
						<div class="col s8" style="text-align: left;">
							<h3 :class="style.color.text">Os melhores preços e serviços aqui</h3>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="footer">
				<footer-default/>
			</div>
		</layout-default>

		<!-- Modal Login -->
		<div id="Login" class="modal">
			<div class="modal-content row">
				<h5>Login</h5>
				<div class="input-field col s12" style="margin-top:32px">
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
					<div class="input-field">
						<input type="email" id="email" v-model="form.email"/>
						<label for="email" class="active" :class="style.color.label">E-Mail
						</label>
					</div>
					<div class="input-field">
						<input id="password" type="password" v-model="form.password"/>
						<label for="password" class="active" :class="style.color.label">Senha
						</label>
					</div>
					<div class="modal-footer">
						<a class="modal-close btn waves-effect black-text" :class="style.color.background">Cancelar</a>
				  		<button type="submit" @click="login" v-if="form.email && form.password" class="modal-close btn waves-effect green white-text">Entrar</button>
					</div>
				</form>
			</div>
		</div>
	</span>
</template>

<script>

import VFacebookLogin from 'vue-facebook-login-component'
import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import Core from "@/core/Core"

export default {
  name: 'Login',
  components:{VFacebookLogin, LayoutDefault, FooterDefault},
  methods: {
  	getUserData(i){
  		var uid = i.authResponse.userID;
  		var ukey = i.authResponse.accessToken;
		Core.FB.api('/'+uid, {fields: 'id, email, name, hometown'}, (response) => {
			response.key = ukey.substring(0, 32);
	  		Core.auth(response)
	  		.then((r) => {
	  			if(r) Core.getuser().then((res) => {
  					switch(res.type){
  						case 1:
  							this.$router.push("/bride");//bride
  							break;
  						case 2:
  							this.$router.push("/provider");//provider
  							break;
  					}
	  			});
	  		});
		});
  	},
  	onLogout(){

  	},
  	getSdk(i){
  		Core.FB = i.FB;
  		//if(!localStorage.token) Core.FB.logout();
  	},
  	login(){
  		Core.auth(this.form)
  		.then((r) => {
  			if(r) Core.getuser().then((res) => {
  				if(res.status){
  					switch(res.type){
  						case 1:
  							this.$router.push("/bride");//bride
  							break;
  						case 2:
  							this.$router.push("/provider");//provider
  							break;
  					}
  				}
  			});
  		});
  	}
  },
  data () {
    return {
    	style:style,
    	connected:false,
    	form:{
    		email: null,
    		password: null
    	}
    }
  },
  mounted:function(){
  	$('.modal').modal();
  },
  created:function(){
  	if(localStorage.token)
  	Core.getuser().then((res) => {
		if(res.status){
			this.connected = true;
			switch(res.type){
				case 1:
					this.$router.push("/bride");//bride
					break;
				case 2:
					this.$router.push("/provider");//provider
					break;
			}
		}
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-default h3{
		font-size: 22px;
	}
	#layout-default h2{
		font-size: 28px;
		letter-spacing: 0.3rem;
	}
</style>
