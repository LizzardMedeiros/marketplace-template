<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-provider>
			<div slot="content" class="row" style="margin:32px auto">
				<messages-vue ref="messages" @update-message="updateMessagesLength"/>
				<div class="row">
					<div class="col s12">
						<img src="@/assets/tag-purplehome.svg" alt="Home"/>
					</div>
				</div>
				<span>
					<div class="row">
						<ul v-if="resume.offers == 0" @click="goto('services')">
							<li>
							  <div class="collapsible-header purple lighten-1 white-text">
							  	<i class="fas fa-exclamation-triangle"></i>
							  	Exponha já o seu primeiro serviço!
							  </div>
							</li>
						</ul>
						<ul v-if="resume.balance == 0" @click="goto('payment')">
							<li>
							  <div class="collapsible-header purple lighten-1 white-text valign-wrapper">
							  	<i class="fas fa-exclamation-triangle"></i>
							  	Adquira já mais créditos e contrate noivas! 
							  </div>
							</li>
						</ul>
						<ul v-else-if="resume.brides == 0" @click="goto('select')">
							<li>
							  <div class="collapsible-header purple lighten-1 white-text valign-wrapper">
							  	<i class="fas fa-exclamation-triangle"></i>
							  	Adquira noivas já! 
							  </div>
							</li>
						</ul>
					</div>
					<ul class="collapsible">
					    <li>
					      <div class="collapsible-header">
					      	<div class="row valign-wrapper">
					      		<div class="row col s3 purple-text">
					      			<i class="fas fa-balance-scale"></i>
					      		</div>
						      	<div class="row col s9">
						      		<div class="col s12">
						      			Créditos - R$ {{parseFloat(resume.balance/100).toFixed(2)}}
						      		</div>
						      		<div class="col s12">
		            					Você tem {{resume.brides}} noivas disponíveis.
		            				</div>
		            			</div>
		            		</div>
					      </div>
					      <div class="collapsible-body white center-align">
					      		<p><router-link tag="a" to="/provider/payment" class="waves-effect waves-light btn purple"><i class="left fas fa-coins"></i>Adquirir Créditos</router-link></p>
		        				<p><router-link tag="a" to="/provider/select" class="waves-effect waves-light btn purple"><i class="left fas fa-female"></i>Adquirir Noivas</router-link></p>
					      </div>
					    </li>
					</ul>				
				</span>
				<span v-if="resume.offers > 0" @click="goto('services')">
					<ul class="hoverable">
					    <li>
					      <div class="collapsible-header">
					      	<div class="row valign-wrapper">
					      		<div class="row col s3 purple-text">
					      			<i class="fas fa-box"></i>
					      		</div>
						      	<div class="row col s9">
						      		<div class="col s12">
						      			Você tem {{resume.offers}} serviço(s) em exposição!
						      		</div>
						      		<div class="col s12">
		            					<label>*Cadastre novos serviços!*</label>
		            				</div>
		            			</div>
		            		</div>
					      </div>
					    </li>
					</ul>
				</span>
				<span @click="goto('orders')">
					<ul class="hoverable">
					    <li>
					      <div class="collapsible-header">
					      	<div class="row valign-wrapper">
					      		<div class="row col s3 purple-text">
					      			<i class="fas fa-female"></i>
					      		</div>
						      	<div class="row col s9">
						      		<div class="col s12">
						      			Você tem {{resume.orders}} noiva aguardando contato!
						      		</div>
						      		<div class="col s12">
		            					<label>*Adquira pacotes de noivas!*</label>
		            				</div>
		            			</div>
		            		</div>
					      </div>
					    </li>
					</ul>
				</span>
				<span @click="showMessages">
			      <div class="collapsible-header">
			      	<div class="row valign-wrapper">
			      		<div class="row col s3 purple-text">
			      			<i class="fas fa-envelope-open"></i>
			      		</div>
				      	<div class="row col s9">
				      		<div class="col s12">
				      			Você tem {{resume.messages}} mensagens!
				      		</div>
				      		<div class="col s12">
	        					<label>*Verifique suas mensagens!*</label>
	        				</div>
	        			</div>
	        		</div>
			      </div>
				</span>
			</div>
			<div slot="footer">
				<footer-provider/>
			</div> 		
		</layout-provider>
	</span>
</template>

<script>

import VueLoader from "@/components/gadgets/VueLoader"
import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"

import CardVue from "@/components/gadgets/CardVue"
import MessagesVue from "@/components/gadgets/MessagesVue"
import Core from "@/core/Core"

export default {
  name: 'ProviderStart',
  components:{VueLoader, CardVue, MessagesVue, LayoutProvider, FooterProvider},
  methods:{
  	goto(r){
  		this.$router.push('provider/'+r);
  	},
  	updateMessagesLength(arr){
  		this.resume.messages = arr.length;
  	},
  	showMessages(){
  		if(this.$refs.messages.messages.length > 0){
  			this.$refs.messages.getMessages();
  		}else{
  			console.log('Nenhuma mensagem encontrada')
  		}
  	}
  },
  data () {
    return {
    	messages:null,
    	resume:{}
    }
  },
  created: function(){
  	Core.getuser().then((r) => {
  		if(!r) this.$router.push("/");
  		else Core.getdata('api/provider/getresume', {key:r.key})
  		.then((res) => {
  			this.resume = res;
  		})
		.then(() => {
	  		Core.getdata('api/messages/list',{key:r.key})
			.then((res) => {
				this.$refs.messages.messages = res;
				this.$refs.messages.key = r.key;
			});
	  	})
	  	.then(() => {
	  		this.$refs.loader.stop();
	  	});
  	});
  },
  mounted: function(){
  	this.$refs.loader.start();
  }
}
</script>

<style scoped>
	#layout-provider .logo{
		margin-top:48px;
		margin-bottom: 50%;
	}
</style>
