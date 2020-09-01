<template>
	<layout-default>
		<div slot="content" id="register" class="container">
			<div class="row" style="margin-top: 32px">
				<form class="col s12">
					<div class="row">

						<div class="input-field col s12">
							<input id="email" disabled v-model="form.email"/>
							<label for="email" class="active" :class="style.color.label">E-Mail</label>
						</div>

						<div class="input-field col s12">
							<the-mask id="whatsapp" :class="style.color.text" :mask="['+55 (##) ####-####', '+55 (##) #####-####']" v-model="form.phone"/>
							<label for="whatsapp" class="active" :class="style.color.label">Whatsapp</label>
						</div>

						<div class="col s8 input-field">
					        <input id="city" type="text" class="validate" v-model="form.address.city">
					        <label for="city">Cidade</label>
						</div>
						<div class="col s4 input-field">
							<select id="state" @change="updateAddr()">
								<option v-for="(state, index) in states" :key="index" :value="state[0]" :selected="state[1]">{{state[0]}}</option>
							</select>
					        <label for="state">Estado</label>
						</div>
						<div class="col s12 input-field">
							<input id="neigh" type="text" class="validate" v-model="form.address.neigh">
							<label for="neigh">Bairro</label>
						</div>
						<div class="input-field col s6">
							<the-mask id="cpf" :class="style.color.text" :mask="['###.###.###-##']" v-model="form.cpf" />
							<label for="cpf" :class="style.color.label">CPF</label>
						</div>
						<div class="input-field col s6">
							<the-mask id="rg" :class="style.color.text" :mask="['#####.###']" v-model="form.rg" />
							<label for="rg" :class="style.color.label">RG</label>
						</div>
					</div>	
					<div class="row right-align" style="margin-bottom:16px">
						<div class="col s12">
							<a class="waves-effect waves-light btn modal-trigger" data-target="modalConfirm" :class="style.color.primary"><i class="material-icons right">chevron_right</i>avançar</a>
						</div>
					</div>									
				</form>
			</div>

			<!-- Modal Logout -->
			<div id="modalConfirm" class="modal">
				<div class="modal-content">
				  	<h5>Confirme as alterações:</h5>
				  	<p>Digite o seu E-Mail para confirmar</p>
					<div class="input-field">
						<input id="cemail" class="validate" v-model="form.cemail" placeholder="E-Mail">
					</div>
				</div>
				<div class="modal-footer">
				  <a @click="save" :disabled="!form.cemail" class="modal-close btn waves-effect red">Confirmar</a>
				  <a class="modal-close btn waves-effect white black-text">Cancelar</a>
				</div>
			</div>

		</div>
		<div slot="footer">
			<footer-default/>
		</div> 		
	</layout-default>
</template>

<script>
	import {style} from "@/json/config.json"
	import LayoutDefault from "@/layouts/LayoutDefault"
	import FooterDefault from "@/components/footers/FooterDefault"
	import Core from "@/core/Core"
	import {TheMask} from 'vue-the-mask'
	export default {
		name: 'PosRegister',
		components:{LayoutDefault, FooterDefault, TheMask},
		methods:{
		  	save(){
		  		if(this.form.phone.length < 10){
		  			Core.showMessage('Número de telefone inválido!');
		  			return;
		  		}
		  		if(!this.form.address.state) this.form.address.state = 'MG';
		  		if(!this.form.address.city || !this.form.address.neigh){
		  			Core.showMessage('Complete seu endereço');
		  			return;
		  		}
		  		if(this.form.cemail != this.form.email){
		  			Core.showMessage('A confirmação do E-Mail está incorreta!');
		  			return;		  			
		  		}
		  		Core.post('/bride/update', this.form, {})
		  		.then((r) => {
		  			if(r) this.$router.push("/bride");
		  		});
		  	},
			updateAddr(){
				var state = $('#state').val();
				this.form.address.state = state;
			},
		  	update(){
				Core.getuser()
				.then((r) => {
					if(!r) this.$router.push("/");
					else
					Core.getdata('api/bride/getdata',{
			  			key:r.key
			  		}).then((usr) => {
			  			this.form = usr;
			  			this.form.key = r.key;
			  		});
				});
		  	}
		},
		mounted:function(){
			$('.modal').modal();
			$('select').formSelect();
		},
		created:function(){
			this.update();
		},
		data () {
			return {
				style:style,
				form:{
					rg:"",
					cpf:"",
					address: {},
					phone: ''
				},
				states:[
					["AC"],	
					["AL"],	
					["AP"],	
					["AM"],	
					["BA"],	
					["CE"],	
					["DF"],	
					["ES"],	
					["GO"],	
					["MA"],	
					["MT"],	
					["MS"],	
					["MG",1],	
					["PA"],	
					["PB"],	
					["PR"],	
					["PE"],	
					["PI"],	
					["RJ"],	
					["RN"],	
					["RS"],	
					["RO"],	
					["RR"],	
					["SC"],	
					["SP"],	
					["SE"],	
					["TO"]
				]
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   	#layout-default .input-field input{
		border-bottom: 0.5px solid #ed3237;
		box-shadow: 0 0.5px 0 0 #ed3237;
   	}
</style>
