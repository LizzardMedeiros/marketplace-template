
<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-default>
			<div slot="content" class="row" style="margin-top: 32px">
				<messages-vue ref="messages" @update-message="updateMessage"/>
				<div class="row">
					<div class="col s12">
						<img src="@/assets/tag-redhome.svg" alt="Home"/>
					</div>
				</div>
				<div class="row">
					<ul v-if="status == 401" @click="goto('bride/profile')">
						<li>
						  <div class="collapsible-header green white-text">
						  	<i class="fas fa-exclamation-triangle"></i>
						  	Complete o seu cadastro!
						  </div>
						</li>
					</ul>
					<ul v-if="status == 402" @click="goto('bride/marriage')">
						<li>
						  <div class="collapsible-header green white-text">
						  	<i class="fas fa-exclamation-triangle"></i>
						  	Complete o seu casamento!
						  </div>
						</li>
					</ul>
					<ul v-else-if="services.length == 0" @click="goto('bride/orders')">
						<li>
						  <div class="collapsible-header green lighten-1 white-text text-darken-3">
						  	<i class="fas fa-exclamation-triangle"></i>
						  	Contrate seu primeiro serviço!
						  </div>
						</li>
					</ul>
					<ul>
						<li @click="goto('/bride/select')">
						  <div class="collapsible-header">
						  	<i :class="style.color.text_colored" class="fas fa-boxes"></i>
						  	 Fazer novo orçamento
						  </div>
						</li>
					</ul>
					<ul class="">
						<li @click="openMessages">
						  <div class="collapsible-header">
						  	<span v-if="message_length">
						  		<i class="far fa-envelope red-text"></i>Você tem mensagens não lidas!
						  	</span>
						  	<span v-else>
						  		<i class="far fa-envelope red-text"></i> Você não tem nenhuma mensagem!
						  	</span>
						  </div>
						</li>
					</ul>

					<box-vue icon="fas fa-box-open left" title="Meus Serviços" color="red" :size="services.length">
						<div slot="content">
							<label v-if="services.length == 0">Você não tem pedidos!</label>
							<span v-else>

							  	<div class="row">
							  		<div class="col s12">
										<table class="responsive-table striped">
											<tbody>
												<tr v-for="(service, index) in services" :key="index">
													<td>
														<label>Fornecedor</label>
														<p>{{service.offer.service.name}}</p>
													</td>
													<td>
														<label>Contato</label>
														<p>{{service.contact}}</p>
													</td>
													<td>
														<label>Fornecedor</label>
														<p>{{service.fantasy}}</p>
													</td>
													<td>
														<label>Validade</label>
														<p>{{toDate(service.deadline)}}</p>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="col s12 center-align">
								      <router-link tag="a" to="bride/orders" class="btn-small" :class="style.color.primary">
								        <i class="fas fa-search left"></i>Ver detalhes
								      </router-link>
								    </div>
									<div class="col s12">
										<hr/>
									</div>
								</div>
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
				</div>
			</div> 
			<div slot="footer">
				<footer-default/>
			</div>		
		</layout-default>
	</span>
</template>

<script>

//Layout
import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import VueLoader from "@/components/gadgets/VueLoader"

//Components
import BoxVue from "@/components/gadgets/BoxVue"
import MessagesVue from "@/components/gadgets/MessagesVue"
import CardVue from "@/components/gadgets/CardVue"
import Core from "@/core/Core"

export default {
  name: 'BrideStart',
  components:{BoxVue, MessagesVue, CardVue, LayoutDefault, FooterDefault, VueLoader},
  methods:{
  	toDate(timestamp){
  		return Core.timeConverter(timestamp);
  	},
  	goto(to){
  		this.$router.push(to);
  	},
  	updateMessage(mes){
  		this.message_length = mes.length;
  	},
  	openMessages(){
  		if(this.$refs.messages.messages.length > 0){
  			this.$refs.messages.getMessages();
  		}
  	},
  	update(){
		Core.getdata('api/bride/getservices', {key:this.key})
	  	.then((res) => {
	  		this.services = res;
	  	})
		.then(() => {
			Core.getdata('api/bride/check', {key:this.key})
			.then((res) => {
				this.status = res;
				if(res == 401) this.$router.push("/bride/posregister");
			});
		})
		.then(() => {
	  		Core.getdata('api/messages/list',{key:this.key})
			.then((res) => {
				this.$refs.messages.messages = res;
				this.message_length = res.length;
			});
	  	})
	  	.then(() => {
	  		this.$refs.loader.stop();
	  	});
  	}
  },
  data () {
    return {
    	style:style,
    	key:0,
    	status:200,
    	services:[],
    	message_length: 0
    }
  },
  created:function(){
  	Core.getuser()
  	.then((r) => {
  		if(r){
  			this.key = r.key;
  			this.update();
  		}else this.$router.push("/");
  	});
  },
  mounted:function(){
  	$('.collapsible').collapsible();
  	this.$refs.loader.start();
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
		z-index: 10;
		animation: move_hands 3s forwards;
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
