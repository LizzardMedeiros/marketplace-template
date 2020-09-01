<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-provider>
			<div slot="content" class="row">
				<div class="col s12" style="margin-top:16px">
					<div class="row">
						<img src="@/assets/tag-purpleprofile.svg" style="max-height:40px; margin-bottom: 16px"/>
					</div>
					<div v-if="user" class="row">
						<div class="input-field col s12">
							<input disabled id="id" type="text" class="validate" v-model="user.id">
							<label for="id" :class="{'active' : user.id != null}">ID</label>
						</div>
						<div class="input-field col s12">
							<input type="text" id="email" class="validate" v-model="user.email"/>
							<label for="email" :class="{'active' : user.email.length > 0}" :style="{'font-weight: bold;': user.email.length == 0}"><span v-if='user.email.length == 0'>*</span>E-Mail</label>
						</div>
						<div class="input-field col s12">
							<input id="name" type="text" class="validate" v-model="user.fantasy">
							<label for="name" :class="{'active' : user.fantasy.length > 0}" :style="{'font-weight: bold;': user.fantasy.length == 0}"><span v-if='user.fantasy.length == 0'>*</span>Empresa</label>
						</div>
						<div class="input-field col s12">
							<input id="npass" type="password" class="validate" v-model="user.npass">
							<label for="npass">Nova Senha</label>
						</div>
						<div v-if="user.npass" class="input-field col s12">
							<input id="cnpass" type="password" class="validate" v-model="user.cnpass">
							<label for="cnpass">Confirmar Nova Senha</label>
						</div>
						<div class="input-field col s12">
							<the-mask id="phone" :mask="['+55 (##) ####-####', '+55 (##) #####-####']" v-model="user.phone_array[0]"/>
							<label for="phone" :class="{'active' : user.phone_array[0].length > 0}" :style="{'font-weight: bold;': user.phone_array[0].length == 0}"><span v-if='user.phone_array[0].length == 0'>*</span>Contato</label>
						</div>
						<div class="input-field col s12">
							<the-mask id="celphone" :mask="['+55 (##) ####-####', '+55 (##) #####-####']" v-model="user.whatsapp"/>
							<label for="celphone" :class="{active : user.whatsapp.length > 0}" :style="{'font-weight: bold;': user.whatsapp.length == 0}"><span v-if='user.whatsapp.length == 0'>*</span>Whatsapp</label>
						</div>
						<div class="input-field col s12">
							<input id="cep" type="text" class="validate" v-model="user.address.cep">
							<label for="cep" :class="{'active' : user.address.cep.length > 0}" :style="{'font-weight: bold; color: blue': user.address.cep.length == 0}"><span v-if='user.address.cep.length == 0'>*</span>CEP</label>						
						</div>
						<div class="input-field col s12">
							<input id="city" type="text" class="validate" v-model="user.address.city">
							<label for="city" :class="{'active' : user.address.city.length > 0}" :style="{'font-weight: bold;': user.address.city.length == 0}"><span v-if='user.address.city.length == 0'>*</span>Cidade</label>						
						</div>
						<div class="input-field col s8">
							<input id="road" type="text" class="validate" v-model="user.address.road">
							<label for="road" :class="{'active' : user.address.road.length > 0}" :style="{'font-weight: bold;': user.address.road.length == 0}"><span v-if='user.address.road.length == 0'>*</span>Logradouro</label>
						</div>
						<div class="input-field col s4">
							<input id="number" type="text" class="validate" v-model="user.address.number">
							<label for="number" :class="{'active' : user.address.number.length > 0}" :style="{'font-weight: bold;': user.address.number.length == 0}"><span v-if='user.address.number.length == 0'>*</span>Número</label>						
						</div>
						<div class="input-field col s4">
							<input id="complement" type="text" class="validate" v-model="user.address.complement">
							<label for="complement" :class="{'active' : user.address.complement.length > 0}" :style="{'font-weight: bold;': user.address.complement.length == 0}"><span v-if='user.address.complement.length == 0'>*</span>Complemento</label>						
						</div>
						<div class="input-field col s8">
							<input id="neigh" type="text" class="validate" v-model="user.address.neigh">
							<label for="neigh" :class="{'active' : user.address.neigh.length > 0}" :style="{'font-weight: bold;': user.address.neigh.length == 0}"><span v-if='user.address.neigh.length == 0'>*</span>Bairro</label>						
						</div>
						<div class="input-field col s6">
							<the-mask id="cnpj" disabled :mask="['##.###.###/####-##']" v-model="user.cnpj" />
							<label for="cnpj">CNPJ</label>
						</div>
						<div class="input-field col s6">
							<the-mask disabled id="cpf" :mask="['###.###.###-##']" v-model="user.cpf"/>
							<label for="cpf" :class="{'active' : user.cpf.length > 0}">CPF</label>
						</div>
					</div>
					<div class="row">
						<div class="input-field col s12">
							<router-link tag="a" to="/provider" class="btn white black-text"><i class="fas fa-angle-double-left left"></i>Voltar</router-link>
							<a class="waves-effect waves-light btn purple right modal-trigger" data-target="confirm">
								<i class="fas fa-save left"></i>Salvar
							</a>
						</div>					
					</div>
					<vue-modal v-if="user" unique="confirm" title="Confirmar">
						<div slot="content">
							<div class="row">
								<div class="col s12">
									Digite sua senha para confirmar as alterações:
								</div>
								<div class="col s12 input-field">
									<input id="pass" type="password" class="validate" v-model="user.password">
									<label for="pass">Senha</label>				
								</div>
							</div>
						</div>
						<div slot="footer">
							<a @click="save" class="btn green modal-close">Confirmar</a>
							<a class="btn grey lighten-5 black-text modal-close">Cancelar</a>
						</div>
					</vue-modal>
				</div>
			</div> 
			<div slot="footer">
				<footer-provider/>
			</div> 		
		</layout-provider>
	</span>
</template>

<script>

import {TheMask} from 'vue-the-mask'
import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
import VueLoader from "@/components/gadgets/VueLoader"

import VueModal from '@/components/modals/VueModal'
import Core from "@/core/Core"

export default {
  name: 'BrideProfile',
  components:{LayoutProvider, FooterProvider, TheMask, VueLoader, VueModal},
  methods:{
  	save(){
  		if(this.user.phone_array[0].length > 0){
  			if(this.user.phone_array[0] < 10){
	  			Core.showMessage('Número de telefone inválido!');
	  			return; 				
  			}
  		}
  		if(this.user.whatsapp.length < 10){
  			Core.showMessage('Número de celular inválido!');
  			return;
  		}
  		if(!this.user.npass) this.user.npass = this.user.cnpass = -1;
  		this.user.key = this.key;
  		Core.post('/provider/update', this.user, {}, 'Perfil atualizado com sucesso!')
  		.then((r) => {
  			if(r) this.$router.push("/provider/schedule");
  		});
  	},
  	update(){
  		this.$refs.loader.start();
  		Core.getdata('api/provider/getdata',{key:this.key})
		.then((usr) => {
			usr.profilepic = Core.getUrl()+'assets/profile/'+usr.profilepic;
			this.user = usr;
			this.user.password = "";
		})
		.then(() => {
			this.$refs.loader.stop();
			$('.modal').modal();
  			M.updateTextFields();
  		});		
  	}
  },
  data () {
    return {
    	key:"",
    	user:null
    }
  },
  created : function(){
   	Core.getuser().then((res) => {
  		if(!res) this.$router.push("/");
  		else{
  			this.key = res.key;
  			this.update();
  		}
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	#layout-provider .logo{
		margin-top:32px;
		margin-bottom: 5%;
	}

	#layout-provider .logo img{
		max-width: 96px;
	}

</style>
