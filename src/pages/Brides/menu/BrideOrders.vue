<template>
	<layout-default>
		<div slot="content">
			<div class="row" style="margin-top:15%">
				<div class="row">
					<img src="@/assets/red-orders.png" style="max-height:40px;"/>
				</div>
				<div class="row" style="margin: 24px 0">
					<div class="col s12 center-align">
						<router-link tag="a" to="/bride/select" class="waves-effect waves-teal btn-large" :class="style.color.primary"><i class="far fa-plus-square left"></i>Novo Orçamento
						</router-link>
					</div>

					<div class="col s12 center-align" style="margin-top: 12px">
						<div class="card" v-if="services.length > 0">
							<div class="card-content">
							<p><label>Valor total do seu orçamento:</label></p>
							<p><h4 :class="style.color.text_colored">R${{getTotal()}}</h4></p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<box-vue v-if="new_services.length" icon="fas fa-boxes left" title="Novos Pedidos de Orçamento!" color="red" :size="new_services.length">
				<div slot="content">
					<label v-if="new_services.length == 0">Você não tem novos pedidos de orçamento!</label>
					<span v-else>
						<table class="responsive-table centered striped">
							<tbody>
								<tr v-for="(service, index) in new_services" :key="index">
								  	<td>
								  		<label>Serviço</label>
								  		<p>{{service.offer.service.name}}</p>
								  	</td>
									<td>
								    	<label>Preço</label>
								    	<p>R${{parseFloat(service.offer.price/100).toFixed(2)}}</p>
									</td>
									<td>
								    	<label>Validade</label>
								    	<p>{{formatDate(service.deadline)}}</p>
									</td>
									<td>
							    		<label>Confirmar Contato</label>
								    	<p><a class="blue waves-effect btn compact-btn modal-trigger" data-target="message" @click="selectNewOrder(index)">
								    		<i class="fas fa-check"></i>
								    	</a>
								    	<a @click="selectNewOrder(index)" class="grey lighten-4 black-text waves-effect btn compact-btn modal-trigger" data-target="delete">
								    		<i class="fas fa-times"></i>
								    	</a></p>
									</td>
								</tr>
							</tbody>
						</table>
					    <div slot="footer" class="row valign-wrapper">
					    	<div class="col s2">
					    		<i class="fas fa-angle-double-left"></i>
					    	</div>
							<div class="col s8" style="text-align: justify">
								<label class="table-tag">Role para a direita ou esquerda para ver todos os itens</label>
							</div>
					    	<div class="col s2">
					    		<i class="fas fa-angle-double-right"></i>
					    	</div>
						</div>
					</span>
				</div>			
			</box-vue>

			<box-vue icon="far fa-edit left" title="Meus Orçamentos" color="red" :size="services.length">
				<div slot="content">
					<label v-if="services.length == 0">Você não tem pedidos!</label>
					<span v-else>
						<table class="responsive-table striped">
							<tbody>
							  <tr v-for="(service, index) in services" :key="index">
							    <td>
							    	<label>Pedido</label>
							    	<p>{{service.id}}</p>
							    </td>
							    <td>
							    	<label>Serviço</label>
							    	<p>{{service.offer.service.name}}</p>
							    </td>
							    <td>
							    	<label>Fornecedor</label>
							    	<p>{{service.fantasy}}</p>
							    </td>
							    <td>
							    	<label>Contato</label>
							    	<p>{{service.contact}}</p>
							    </td>
							    <td>
							    	<label>Preço</label>
							    	<p>R${{parseFloat(service.offer.price/100).toFixed(2)}}</p>
							    </td>
							    <td>
							    	<label>Encerramento</label>
							    	<p>{{formatDate(service.deadline)}}</p>
							    </td>
							    <td class="center-align">
							    	<p>
								    	<span v-if="(service.provider_status == 1 || service.provider_status == 2)  && service.bride_status == 1">
								    		<label>Como foi o atendimento?</label>
									    	<p><a class="green waves-effect btn compact-btn" @click="confirm(service.id, 1)">
									    		<i class="fas fa-thumbs-up"></i>
									    	</a>
									    	<a class="red waves-effect btn compact-btn" @click="confirm(service.id, -1)">
									    		<i class="fas fa-thumbs-down"></i>
									    	</a></p>
									    </span>
								    	<span v-else-if="service.bride_status == 2 || (service.provider_status != 2 && service.bride_status != 0)" class="center-align">
								    		<label>Aguarde a resposta</label>
								    		<p><i class="far fa-clock orange-text"></i></p>
								    	</span>
							    	</p>	
							    </td>
							  </tr>
							</tbody>
						</table>
					    <div slot="footer" class="row valign-wrapper">
					    	<div class="col s2">
					    		<i class="fas fa-angle-double-left"></i>
					    	</div>
							<div class="col s8" style="text-align: justify">
								<label class="table-tag">Role para a direita ou esquerda para ver todos os itens</label>
							</div>
					    	<div class="col s2">
					    		<i class="fas fa-angle-double-right"></i>
					    	</div>
						</div>
					</span>
				</div>			
			</box-vue>

			<box-vue icon="fas fa-tasks left" title="Encerrados" color="red" :size="historic.length">
				<table slot="content" class="responsive-table centered striped">
					<tbody>
						<tr v-for="(hist, index) in historic" :key="index">
						  	<td>
						  		<label>Pedido</label>
						  		<p>{{hist.id}}</p>
						  	</td>
							<td>
								<label>Fornecedor</label>
								<p>{{hist.provider}}</p>
							</td>
							<td>
								<label>Encerramento</label>
								<p>{{hist.modified}}</p>
							</td>
						</tr>
					</tbody>
				</table>
			    <div slot="footer" class="row valign-wrapper">
			    	<div class="col s2">
			    		<i class="fas fa-angle-double-left"></i>
			    	</div>
					<div class="col s8" style="text-align: justify">
						<label class="table-tag">Role para a direita ou esquerda para ver todos os itens</label>
					</div>
			    	<div class="col s2">
			    		<i class="fas fa-angle-double-right"></i>
			    	</div>
				</div>				
			</box-vue>

			<!-- Modal Message -->
			<vue-modal unique="message" title="Mensagem" icon="far fa-envelope">
				<div slot="content" class="row">
				    <form class="col s12">
				      <div class="row">
				      	<div class="col s12">
				      		Confirme o contato com o fornecedor enviando uma mensagem para ele! Após o envio, os dados de contato estarão disponíveis. 
				      		<span :class="style.color.text_colored">Ao confirmar com o fornecedor, o pedido não poderá ser cancelado!</span>
				      		<hr/>
				      	</div>
				        <div class="input-field col s12">
				          <textarea id="mensagem" v-model="message" class="materialize-textarea" :class="style.color.text" data-length="140"></textarea>
				          <label for="mensagem" class="active">Escreva sua mensagem</label>
				        </div>
				      </div>
				    </form>
				</div>
				<div slot="footer">
					<a @click="sendMessage" class="btn green"><i class="fas fa-share-square left"></i>Enviar</a>
				</div>
			</vue-modal>

			<!-- Modal Delete Message -->
			<div id="delete" class="modal">
				<div class="modal-content">
				  <h4>Confirmar</h4>
				  <p>Gostaria de excluir esse pedido?</p>
				</div>
				<div class="modal-footer">
				  <a @click="deleteOrder" class="modal-close btn waves-effect red">Sim</a>
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
//Layout
import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"

//Components
import VueModal from "@/components/modals/VueModal"
import BoxVue from "@/components/gadgets/BoxVue"
import {TheMask} from 'vue-the-mask'
import Core from "@/core/Core"

export default {
  name: 'BrideOrders',
  components:{LayoutDefault, VueModal, BoxVue, TheMask, FooterDefault},
  methods:{
  	formatDate(date){
  		return Core.timeConverter(date);
  	},
  	getTotal(){
  		var total = 0;
  		this.services.forEach((s) => {
  			total += parseFloat(s.offer.price/100);
  		});
  		return total.toFixed(2);
  	},
  	selectNewOrder(index){
  		this.selected_order = this.new_services[index].id;
  		$('#mensagem').val("Olá! Estou interessada no seu serviço de " + this.new_services[index].offer.service.name + "!");
  		this.message = $('#mensagem').val();
  		M.textareaAutoResize($('#mensagem'));
  		M.updateTextFields();
  	},
  	selectOrder(id){
  		this.selected_order = this.services[id].id;
  	},
  	confirm(id, rating){
  		Core.post('/service/confirm', {service:id, key:this.key, rating:rating})
  		.then(() => {
  			this.update();
  		});
  	},
  	deleteOrder(){
  		Core.post('/bride/deleteorder', {key:this.key, oid:this.selected_order})
  		.then((r) => {
  			if(r) this.update();
  		});
  	},
  	sendMessage(){
  		if(this.message.length > 140){
  			Core.showError("Sua mensagem está muito longa!");
  			return;
  		}
  		var dt = {key:this.key, order:this.selected_order, message:this.message};
  		Core.post('/service/start', dt, {}, 'Mensagem enviada com sucesso!')
  		.then((r) => {
  			if(r){
  				$('#message').modal('close');
  				this.update();
  			}
  		});
  	},
  	update(){
		Core.getdata('api/bride/getservices', {key:this.key})
	  	.then((res) => {
	  		this.new_services = [];
	  		this.services = [];
	  		res.forEach((sv) => {
	  			if(sv.bride_status == 0) this.new_services.push(sv);
	  			else this.services.push(sv);
	  		});
	  	})
  		.then(() => {
  			Core.getdata('api/service/gethistoric', {key:this.key})
  			.then((res) => {
  				this.historic = res;
  			});
  		});
  	}
  },
  data () {
    return {
    	style:style,
    	key:0,
    	message:"",
    	selected_order:"",
    	new_services:[],
    	services:[],
    	historic:[]
    }
  },
  created: function(){
  	Core.getuser().then((r) => {
  		if(!r) this.$router.push("/");
  		else{
  			this.key = r.key;
  			this.update();
  		}
  	});
  },
  mounted: function(){
  	$('#mensagem').characterCounter();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	#layout-bride .card-footer{
		color: black;
		font-weight: 700;
	}

	#layout-bride .logo{
		margin-top:32px;
		margin-bottom: 5%;
	}

	#layout-bride .logo img{
		max-width: 96px;
	}

	#layout-bride .btn-flat{
		font-weight: 700;
	}

	#layout-bride .card-title{
		font-size: 18px;
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
