<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-default ref="lbride">
			<div slot="content" class="row">
				<div class="col s12" style="margin-top:16px">
					<div class="row">
						<img src="@/assets/red-profile.png" style="max-height:40px; margin-bottom: 16px"/>
					</div>
					<div v-if="user != null" class="row">
						<div class="input-field col s12">
							<input disabled id="id" type="text" class="validate" :class="style.color.text" v-model="user.id">
							<label for="id" class="active" :class="style.color.label">ID</label>
						</div>
						<div class="input-field col s12">
							<input type="text" id="email" class="validate" :class="style.color.text" v-model="user.email"/>
							<label for="email" class="active" :class="style.color.label" :style="{'font-weight: bold;': user.email.length == 0}"><span v-if="user.email.length == 0">*</span>E-Mail</label>
						</div>
						<div class="input-field col s12">
							<input id="nick" type="text" class="validate" :class="style.color.text" v-model="user.name">
							<label for="nick" class="active" :style="{'font-weight: bold;': user.name.length == 0}" :class="style.color.label"><span v-if="user.name.length == 0">*</span>Apelido</label>
						</div>
						<span v-if="!user.is_fbuser">
							<div class="input-field col s12">
								<input id="npass" type="password" class="validate" :class="style.color.text" v-model="user.npassword">
								<label for="npass" :class="style.color.label">Nova Senha</label>
							</div>
							<div v-if="user.npassword" class="input-field col s12">
								<input id="opass" type="password" class="validate" :class="style.color.text" v-model="user.opassword">
								<label for="opass" :class="style.color.label">Senha Antiga</label>
							</div>
							<div v-if="user.npassword" class="input-field col s12">
								<input id="cnpass" type="password" class="validate" :class="style.color.text" v-model="user.cnpassword">
								<label for="cnpass" :class="style.color.label">Confirmar Nova Senha</label>
							</div>
						</span>
						<div class="input-field col s12">
							<the-mask id="pphone" :mask="['+55 (##) ####-####', '+55 (##) #####-####']" :class="style.color.text" v-model="user.phone"/>
							<label for="pphone" :style="{'font-weight: bold;': user.phone.length == 0}" class="active" :class="style.color.label"><span v-if="user.phone.length == 0">*</span>Celular</label>
						</div>
						<div class="input-field col s12">
							<the-mask id="cep" :mask="['#####-###']" class="validate" :class="style.color.text" v-model="user.address.cep"/>
							<label for="cep" :style="{'font-weight: bold;': user.address.cep.length == 0}" class="active" :class="style.color.label"><span v-if="user.address.cep.length == 0">*</span>CEP</label>
						</div>
						<div class="input-field col s12">
							<input id="road" type="text" class="validate" :class="style.color.text" v-model="user.address.road">
							<label for="road" :style="{'font-weight: bold;': user.address.road.length == 0}" class="active" :class="style.color.label"><span v-if="user.address.road.length == 0">*</span>Rua/Avenida</label>
						</div>
						<div class="input-field col s12">
							<input id="complement" type="text" class="validate" :class="style.color.text" v-model="user.address.complement">
							<label for="complement" :style="{'font-weight: bold;': user.address.complement.length == 0}" class="active" :class="style.color.label"><span v-if="user.address.complement.length == 0">*</span>Complemento</label>
						</div>
						<div class="input-field col s12">
							<input id="neigh" type="text" class="validate" :class="style.color.text" v-model="user.address.neigh">
							<label for="neigh" :style="{'font-weight: bold;': user.address.neigh.length == 0}" class="active" :class="style.color.label"><span v-if="user.address.neigh.length == 0">*</span>Bairro</label>
						</div>
						<div class="input-field col s8">
							<input id="city" type="text" class="validate" :class="style.color.text" v-model="user.address.city">
							<label for="city" class="active" :class="style.color.label" :style="{'font-weight: bold;': user.address.city.length == 0}"><span v-if="user.address.city.length == 0">*</span>Cidade</label>
						</div>
						<div class="input-field col s4">
							<input id="state" type="text" class="validate" :class="style.color.text" v-model="user.address.state">
							<label for="state" class="active" :class="style.color.label" :style="{'font-weight: bold;': user.address.state.length == 0}"><span v-if="user.address.state.length == 0">*</span>Estado</label>
						</div>
						<div class="input-field col s6">
							<the-mask id="cpf" :mask="['###.###.###-##']" :class="style.color.text" v-model="user.cpf"/>
							<label for="cpf" class="active" :class="style.color.label" :style="{'font-weight: bold;': user.cpf.length == 0}"><span v-if="user.cpf.length == 0">*</span>CPF</label>
						</div>
						<div class="input-field col s6">
							<the-mask id="rg" :mask="['#####.###']" :class="style.color.text" v-model="user.rg"/>
							<label for="rg" class="active" :class="style.color.label" :style="{'font-weight: bold;': user.rg.length == 0}"><span v-if="user.rg.length == 0">*</span>RG</label>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<router-link tag="a" to="/bride" class="btn black-text" :class="style.color.background"><i class="fas fa-angle-double-left left"></i>Voltar</router-link>
							<a class="waves-effect waves-light btn right modal-trigger" :class="style.color.primary" data-target="modalConfirm"><i class="fas fa-save left"></i>Salvar</a>
						</div>					
					</div>
				</div>

				<!-- Modal Confirm -->
				<div v-if="user != null" id="modalConfirm" class="modal">
					<div class="modal-content">
					  	<h5>Confirme a alteração:</h5>
					  	<p>Digite o seu E-mail para confirmar a alteração</p>
						<div class="input-field">
							<input id="cemail" class="validate" :class="style.color.text" v-model="user.cemail" placeholder="E-Mail">
						</div>
					</div>
					<div class="modal-footer">
					  <a @click="save" :disabled="user.cemail.length == 0" class="modal-close btn waves-effect" :class="style.color.primary">Confirmar</a>
					  <a class="modal-close btn waves-effect black-text" :class="style.color.background">Cancelar</a>
					</div>
				</div>

			</div> 
			<div slot="footer">
				<footer-default/>
			</div> 		
		</layout-default>
	</span>
</template>

<script>

import {style} from '@/json/config.json'
import {TheMask} from 'vue-the-mask'
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import VueLoader from "@/components/gadgets/VueLoader"
import Core from "@/core/Core"

export default {
  name: 'BrideProfile',
  components:{LayoutDefault, FooterDefault, VueLoader, TheMask},
  methods:{
  	save(){
  		if(this.user.phone.length < 10){
  			Core.showMessage('Número de telefone inválido!');
  			return;
  		}
  		if(this.user.npassword != this.user.cnpassword){
  			Core.showMessage('Confirmação de senha não confere!');
  			return;
  		}
  		this.$refs.loader.start();
  		Core.post('/bride/update', this.user, {})
  		.then((s) => {
  			this.$refs.loader.stop();
  			if(s) this.$router.push("/bride/marriage");
  		});
  	},
  	update(){
  		this.$refs.loader.start();
		Core.getdata('api/bride/getdata',{key:this.key})
		.then((usr) => {
  			usr.profilepic = Core.getUrl()+'assets/profile/'+usr.profilepic;
  			usr.cemail = "";
  			this.user = usr;
  			this.user.key = this.key;
  		}).then(() => {
  			$('.modal').modal();
  			M.updateTextFields();
  			this.$refs.loader.stop();
  		});
  	}
  },
  created : function(){
	Core.getuser().then((r) => {
		if(!r) this.$router.push("/");
		else{
			this.key = r.key;
			this.update();
		}
	});
  },
  data () {
    return {
    	style:style,
    	key:"",
    	user:null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
