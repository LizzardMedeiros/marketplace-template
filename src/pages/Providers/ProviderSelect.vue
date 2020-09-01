<template>
	<div>
		<layout-provider>
			<div slot="content" id="select" class="row">
				<div class="row">
					<div class="col s12" style="margin-top:48px">
						<img src="@/assets/purple-selectpack.png" style="height:48px;">
					</div>
				</div>
				<div class="row">
					<div class="col s12 center-align">
						<h3 class="exauted">Saldo: R${{parseFloat(credit).toFixed(2)}} 
						<router-link class="white-text" to="/provider/payment" tag="a"><i class="fas fa-coins"></i></router-link></h3>
					</div>
					<div class="col s12 center-align">
						<h3 class="exauted">Noivas disponíveis: {{brides}}</h3>
					</div>
					<div class="col s12 center-align">
						<h3 class="exauted">Selecione seu pacote* de noivas:</h3>
					</div>
					<div class="col s12 center-align">
						<h4>*1 noiva = R${{parseFloat(bride_price/100).toFixed(2)}}</h4>
					</div>
				</div>
				<div class="row" style="margin-top:28px">
					<div class="col s12 center-align">
						<span class="tag">Quero um pacote de</span>
					</div>
					<div class="col s3 right-align">
						<a @click="removeBrides" class="btn-floating btn-small waves-effect waves-light purple lighten-1"><i class="material-icons">remove</i></a>
					</div>
					<div class="col s6 center-align">
						<div class="text-box">{{amount}} Noivas</div> 
					</div>
					<div class="col s3 left-align">
						<a @click="addBrides" class="btn-floating btn-small waves-effect waves-light purple lighten-1">
						  	<i class="material-icons">add</i>
						</a>
					</div>
				</div>
				<div class="row" style="margin:32px 0">
					<div class="col s12 center-align">
						<span class="tag">Valor</span>
					</div>
					<div class="col s6 offset-s3 center-align">
						<div class="text-box">R${{parseFloat(amount*(bride_price/100)).toFixed(2)}}</div> 
					</div>
				</div>
				<div v-if="amount > 0" class="row" style="margin-top: 24px;">
					<div class="col s12 center-align input-field">
						<a :disabled="parseFloat(credit) < amount*(bride_price/100)" class="btn waves-effect purple darken-3 modal-trigger" data-target="confirm">
							<i class="fas fa-check left"></i>Comprar
						</a>
						<span v-if="parseFloat(credit) < amount*(bride_price/100)" class="helper-text red-text">
							<p>Saldo insuficiente!</p>
							<p><router-link class="btn-small green" to="/provider/payment" tag="a"><i class="fas fa-coins left"></i>Adquirir Créditos</router-link></p>
						</span>
					</div>
				</div>
				<vue-modal unique="confirm" title="Confirmação">
					<div slot="content">
						Você confirma a compra de {{amount}} noivas no valor de {{parseFloat(amount*(bride_price/100)).toFixed(2)}} créditos?
					</div>
					<div slot="footer">
						<a class="btn green modal-close" @click="confirm">Confirmar</a>
						<a class="btn grey lighten-5 black-text modal-close">Cancelar</a>
					</div>
				</vue-modal>
			</div>
			<div slot="footer">
				<footer-provider/>
			</div>
		</layout-provider>
	</div>
</template>

<script>

import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
import VueModal from "@/components/modals/VueModal"
import Core from "@/core/Core"

export default {
  name: 'ProviderSelect',
  components:{LayoutProvider, FooterProvider, VueModal},
  methods:{
  	confirm(){
		let success = "Você adquiriu o pacote com sucesso!"
		Core.post('/provider/buypack',{key:this.key, amount:this.amount}, {}, success)
		.then((r) => {
			this.$router.push("/provider/services");
		});
  	},
  	addBrides(){
  		this.amount += 5;
  	},
  	removeBrides(){
  		if(this.amount >= 5) this.amount -= 5;
  	},
  	update(){
		Core.getdata('api/provider/getdata', {key:this.key})
		.then((res) => {
			this.credit = res.credit/100;
			this.brides = res.brides;
		});	
  	}
  },
  data () {
    return {
    	key:'',
    	bride_price: 2600,
    	amount: 0,
    	credit: 0,
    	brides: 0
    }
  },
  mounted(){
  	var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  },
  created(){
  	Core.getuser().then((r) => {
  		if(!r) this.$router.push("/");
  		else{
  			this.key = r.key;
  			this.update();
  		}
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-provider #select{
		min-height: 75vh;
	}
	#layout-provider .exauted{
		color: white;
		font-size: 1.4em;
		font-weight: 300;
		background-color: #a532ed;
		padding: 8px 0;
		margin-bottom: 0;
	}
	#layout-provider h4{
		color: #a532ed;
		font-size: 1.1em;
		font-weight: 500;
		padding: 0;
		margin-top: 0;
	}
	#layout-provider .tag{
		color: #a532ed;
		font-size: 1.4em;
		font-weight: 500;
		text-transform: uppercase;
	}
	#layout-provider .btn-floating{
	  margin: 0;
	  transform: translate(0%, 50%);
	}

	#layout-provider .text-box {
		margin: auto;
		border: 2px solid #cf82ff4c;
		color: #a532ed;
		text-align: center;
		text-transform: uppercase;
		font: 1.5em Arial, sans-serif;
		font-weight: 700;
		transform: translate(0%, 60%);
	}

	#layout-provider .text-circle {
		margin: auto;
		border-radius: 50%;
		width: 1.75em;
		height: 1.75em;
		padding: 12px;
		background: #ce93d8;
		border: 2px solid rgb(165,48,239);
		color: white;
		text-align: center;
		font: 48px Arial, sans-serif;
		transform: translate(0%, 15%);
	}
</style>
