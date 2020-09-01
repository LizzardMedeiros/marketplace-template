<template>
	<div>
		<vue-loader ref="loader"/>
		<layout-provider>
			<div slot="content" id="select" class="row">
				<div class="row">
					<div class="col s12" style="margin-top:48px">
						<img src="@/assets/tag-purplepayment.svg" style="height:48px;">
					</div>
				</div>
				<div class="row" style="margin-top:32px">
					<div class="col s12 left-align">
						<div class="valign-wrapper exauted">
							<img src="@/assets/footer-logo.svg" class="left" style="width:24px; margin:auto 16px"/> Saldo R${{parseFloat(credit).toFixed(2)}}
						</div>
					</div>
				</div>
				<div class="row" style="margin-top:32px">
					<div class="col s12 left-align">
						<div class="row">
							<div class="col s12">
							<a disabled class="waves-effect waves-light btn-flat"><i class="far fa-credit-card left"></i>Cartão de Crédito</a>
							</div>
							<div class="col s12">
							<a disabled class="waves-effect waves-light btn-flat"><i class="fab fa-bitcoin left"></i>Bitcoin</a>
							</div>
							<div class="col s12">
							<a disabled class="waves-effect waves-light btn-flat"><i class="fab fa-paypal left"></i>PayPal</a>
							</div>
							<div class="col s12">
							<a data-target="trasferer" class="waves-effect waves-light btn-flat modal-trigger"><i class="fas fa-money-bill left"></i>Fazer Transferência Bancária</a>
							</div>
						</div>
						<hr/>
					</div>
				</div>
				<div class="row" style="margin-top:32px">
					<div class="col s12 center-align">
						<a disabled data-target="confirm" class="waves-effect waves-light btn-small purple darken-3 modal-trigger"><i class="fas fa-plus left"></i>Adicionar forma de pagamento</a>
					</div>
				</div>
				<div class="row" style="margin-top:32px">
					<div class="col s12 center-align card">
						<table class="responsive-table striped">
							<i v-if="historic.length > 1" class="fas fa-hand-point-up anim purple-text"></i>
					        <tbody>
					          <tr v-for="(payment, index) in historic" :key="index">
					            <td>
					            	<label>id</label>
					            	<p>{{payment.id.toUpperCase()}}</p>
					            </td>
					            <td>
					            	<label>Valor</label>
					            	<p>R${{parseFloat(payment.body.amount).toFixed(2)}}</p>
					            </td>
					            <td class="center-align">
					            	<label>Comprovante</label>
					            	<p><a @click="showReceipt(index)"><i class="fas fa-receipt"></i></a></p>
					            </td>
					            <td class="center-align">
					            	<label>Status</label>
					            	<p>
					            		<i v-if="payment.body.status == 0" class="far fa-clock orange-text"></i>
					            		<i v-if="payment.body.status == 1" class="far fa-check-circle green-text"></i>
					            		<i v-if="payment.body.status == 2" class="far fa-times-circle red-text"></i>
					            	</p>
					            </td>
					            <td>
					            	<label>Abertura</label>
					            	<p>{{payment.created}}</p>
					            </td>
					          </tr>
					        </tbody>
					    </table>					
					</div>
				</div>
				<vue-modal title="Comprovante" unique="receipt">
					<div slot="content">
						<hr/>
						<img class="materialboxed" width="100%" :src="receipt"/>
					</div>
				</vue-modal>
				<vue-modal title="Tranferência" unique="trasferer">
					<div slot="content">
						<p>Faça a transferência dos valores desejados para a conta abaixo e anexe o comprovante:</p>
						<hr/>
						<p class="orange-text">Banco Inter</p>
						<p class="orange-text">Agência - 000000-0</p>
						<p class="orange-text">Conta Corrente - 00000-0</p>
						<hr/>
						<div class="row">
							<div class="col s12 input-field" style="margin-bottom:0">
								<file-sender ref="file" icon="fas fa-receipt" title="Comprovante" cstyle="purple"/>	
							</div>
							<div class="col s12 input-field" style="margin-top:0">
								<money id="amount" v-model="amount" v-bind="money"></money>
								<label for="amount" class="active">Valor</label>
							</div>
						</div>	
					</div>
					<div slot="footer">
						<a class="btn purple modal-close" @click="send">
							<i class="fas fa-paper-plane left"></i>Enviar
						</a>
					</div>
				</vue-modal>
				<vue-modal title="Confirmação" unique="confirm">
					<div slot="content"></div>
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
import VueLoader from "@/components/gadgets/VueLoader"

import VueModal from "@/components/modals/VueModal"
import FileSender from "@/components/forms/FileSender"
import {Money} from 'v-money'
import Core from "@/core/Core"

export default {
  name: 'ProviderPayment',
  components:{LayoutProvider, FooterProvider, VueLoader, VueModal, FileSender, Money},
  methods:{
  	showReceipt(index){
  		this.receipt = this.historic[index].body.file;
  		$('#receipt').modal('open');
  	},
  	send(){
		if(!Core.file){
			Core.showMessage('Anexe o seu comprovante');
			return;
		}
		if(this.amount <= 0){
			Core.showMessage('Valor do pedido inválido!');
			return;			
		}
	  	var dt = {key:this.key, file:Core.file, amount:this.amount};
	  	Core.post('/provider/newpayment',dt,{},"Comprovante enviado com sucesso!")
	  	.then((r) => {
	  		if(r){
	  			Core.showMessage('Assim que aprovarmos o seu crédito, você poderá adquirir noivas!');
	  			Core.showMessage('O processo pode demorar até 2 dias úteis!');
				this.$router.push("/provider/select")
			}
	  	});
  	},
  	update(){
  		this.$refs.loader.start();
		Core.getdata('api/provider/getdata', {key:this.key})
		.then((res) => {
			this.credit = res.credit/100;
		})
		.then(() => {
			Core.getdata('api/provider/getpayments', {key:this.key})
			.then((res) => {
				this.historic = res;
				this.$refs.loader.stop();
			});
		});
  	}
  },
  data () {
    return {
    	key:"",
    	credit:0,
    	amount:0,
    	historic:[],
    	receipt:"",
		money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false
        }
    }
  },
  created: function(){
  		Core.file = null;
	  	Core.getuser().then((r) => {
			if(!r) this.$router.push("/");
			else{
				this.key = r.key;
				this.update();
			}
		});
  },
  mounted: function(){
  	var modals = document.querySelectorAll('.modal');
  	var options = {'endingTop': 5};
    M.Modal.init(modals, options);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#trasferer{
		min-height: 90%;
	}
	#layout-provider #select{
		min-height: 75vh;
	}
	#layout-provider .exauted{
		color: white;
		font-size: 1.4em;
		font-weight: 300;
		background-color: #a532ed;
		padding: 8px;
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
	.anim{
		font-size: 2.7rem;
		position: absolute;
		right:50%;
		top:50%;
		opacity: 0;
		z-index: 1000;
		animation: move_hands 10s forwards;
		animation-iteration-count: 1;
		animation-delay: 2s;
	}

	@keyframes move_hands {
		  0%   {right: 50%; opacity: 1}
		  25%  {right: 25%; opacity: 1}
		  50%  {right: 50%; opacity: 1}
		  75%  {right: 25%; opacity: 1}
		  100% {opacity: 0}
	}
</style>
