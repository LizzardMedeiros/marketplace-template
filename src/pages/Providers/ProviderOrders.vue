<template>
	<layout-provider>
		<div slot="content">
			<div class="row">
				<div class="col s12" style="margin-top:15%">
					<div class="row">
						<img src="@/assets/tag-purpleorders.svg" style="max-height:40px;"/>
					</div>
				</div>
			</div>

			<box-vue v-if="new_orders.length" icon="far fa-edit" title="Novos Pedidos" color="purple" :size="new_orders.length">
				<table slot="content" class="responsive-table centered striped">
					<tbody>
					  <tr v-for="(order, index) in new_orders" :key="index">
					    <td>
					    	<label>Protocolo</label>
					    	<p>{{order.id}}</p>
					    </td>
					    <td>
					    	<label>Serviço</label>
					    	<p>{{order.offer.service.name}}</p>
					    </td>
					    <td>
					    	<label>Cidade da noiva</label>
					    	<p>{{order.bride.city}}</p>
					    </td>
					    <td>
					    	<label>Local do casamento</label>
					    	<p>{{order.bride.marriage.place}}</p>
					    </td>
					    <td>
					    	<label>Convidados</label>
					    	<p>{{order.bride.marriage.guests}}</p>
					    </td>
					    <td>
					    	<label>Data do casamento</label>
					    	<p>{{order.bride.marriage.date}}</p>
					    </td>
					    <td>
							<a @click="setOrder(order.id, 1)" class="green waves-effect btn compact-btn"><i class="fas fa-thumbs-up left"></i>Aceito</a>
					    	<a @click="setOrder(order.id, -1)" class="red waves-effect btn compact-btn"><i class="fas fa-thumbs-down"></i></a>
					    </td>
					  </tr>
					</tbody>
				</table>
				<div slot="footer">
				    <div class="row valign-wrapper">
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
				</div>						
			</box-vue>

			<box-vue icon="far fa-edit" title="Meus Pedidos" color="purple" :size="orders.length">
				<table slot="content" class="responsive-table striped">
					<tbody>
					  <tr v-for="(order, index) in orders" :key="index">
					    <td>
					    	<label>Pedido</label>
					    	<p>{{order.id}}</p>
					    </td>
					    <td>
					    	<label>Serviço</label>
					    	<p>{{order.offer.service.name}}</p>
					    </td>
					    <td>
					    	<label>Noiva</label>
					    	<p>{{order.bride.name}}</p>
					    </td>
					    <td>
					    	<label>Contato</label>
					    	<p>{{order.bride.phone}}</p>
					    </td>
					    <td>
					    	<label>E-Mail</label>
					    	<p>{{order.bride.email}}</p>
					    </td>
					    <td>
					    	<label>Cidade da noiva</label>
					    	<p>{{order.bride.city}}</p>
					    </td>
					    <td>
					    	<label>Local do casamento</label>
					    	<p>{{order.bride.marriage.place}}</p>
					    </td>
					    <td>
					    	<label>Convidados</label>
					    	<p>{{order.bride.marriage.guests}}</p>
					    </td>
					    <td>
					    	<label>Data do casamento</label>
					    	<p>{{order.bride.marriage.date}}</p>
					    </td>
					    <td>
					    	<label>Encerramento do pedido</label>
					    	<p>{{toDate(order.deadline)}}</p>
					    </td>
					    <td v-if="order.provider_status == 1">
					    	<label>Qualifique a noiva</label>
					    	<p>
						    	<a @click="confirm(order.id, 1)" class="green waves-effect btn compact-btn"><i class="fas fa-thumbs-up"></i></a>
						    	<a @click="confirm(order.id, -1)" class="red waves-effect btn compact-btn"><i class="fas fa-thumbs-down"></i></a>
					    	</p>
					    </td>
					    <td v-else-if="getNow() > order.deadline">
					    	<label>Conclua seu pedido</label>
					    	<p><a @click="confirm(order.id, 1)" class="green btn compact-btn"><i class="fas fa-check left"></i>Encerrar</a></p>
					    </td>
					    <td v-else>
					    	<label>Aguarde a resposta da noiva</label>
					    	<p>
					    		<i class="far fa-clock orange-text"></i>
					    	</p>
					    </td>
					  </tr>
					</tbody>
				</table>
				<div slot="footer">
				    <div class="row valign-wrapper">
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
				</div>						
			</box-vue>

			<box-vue icon="fas fa-clipboard-list" title="Encerrados" color="purple" :size="orders.length">
				<table slot="content" class="responsive-table centered striped">
					<tbody>
						<tr v-for="(hist, index) in historic" :key="index">
						  	<td>
						  		<label>Pedido</label>
						  		<p>{{hist.id}}</p>
						  	</td>
							<td>
								<label>Noiva</label>
								<p>{{hist.bride}}</p>
							</td>
							<td>
								<label>Encerramento</label>
								<p>{{hist.modified}}</p>
							</td>
						</tr>
					</tbody>
				</table>

				<div slot="footer">
				    <div class="row valign-wrapper">
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
				</div>						
			</box-vue>

		</div> 
		<div slot="footer">
			<footer-provider/>
		</div> 		
	</layout-provider>
</template>

<script>

//Layout
import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
//Components

import BoxVue from "@/components/gadgets/BoxVue"
import Core from "@/core/Core"

export default {
  name: 'ProviderOrders',
  components:{LayoutProvider, FooterProvider, BoxVue},
  methods:{
  	toDate(timestamp){
  		return Core.timeConverter(timestamp);
  	},
  	getNow(){
  		return Math.floor(Date.now() / 1000);
  	},
  	setOrder(id,status){
  		Core.post('/provider/order', {action:'hire',order_id:id, key:this.key, status:status})
  		.then(() => {
  			this.update();
  		});  		
  	},
  	confirm(id, rating){
  		Core.post('/service/confirm', {service:id, key:this.key, rating:rating})
  		.then(() => {
  			this.update();
  		});
  	},
  	update(){
		this.orders = [];
		this.new_orders = [];
  		Core.getdata('api/provider/order', {action:'list', key:this.key})
  		.then((res) => {
  			res.forEach((order) => {
  				if(order.bride.name) this.orders.push(order);
  				else{
  					this.new_orders.push(order);
  				}
  			});
  			if(res.length > 0){
  				Core.showMessage('Entre em contato com as noivas o mais rápido possível!');
  			}
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
    	key:0,
    	new_orders:[],
    	orders:[],
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
