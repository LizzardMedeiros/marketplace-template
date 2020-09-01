<template>
	<div>
		<vue-loader ref="loader"/>
		<layout-provider>
			<div slot="content" id="select" class="row" style="margin: 24px auto">
				<div class="row">
					<img src="@/assets/tag-purpleservices.svg" style="max-height:40px;"/>
				</div>
				<div class="row">
					<div class="col s12 center-align" style="margin:24px 0">
						<a class="btn waves-effect waves-light purple modal-trigger" data-target="newservice">
							<i class="fas fa-plus left"></i>Novo Serviço
						</a>
					</div>
				</div>
				<div class="row card">
					<div class="col s12 center-align" style="margin: 16px auto">
						<div class="row">
							<div class="col s2 right-align">
								<a @click="previous" class="btn-floating btn-small waves-effect waves-light purple" :disabled="offer.length <= 1"><i class="material-icons">chevron_left</i></a>
							</div>
							<div class="col s8"><h5>{{getOffer().service}}</h5></div>
							<div class="col s2 left-align">
								<a @click="next" class="btn-floating btn-small waves-effect waves-light purple" :disabled="offer.length <= 1"><i class="material-icons">chevron_right</i></a>
							</div>
						</div>
					</div>
					<div class="col s12" style="margin: 16px auto">
						<div class="row left-align">
							<div v-for="(service, index) in getOffer().card" :key="index" class="col s12" @click="showDetails(index)">
							 	<div class="card horizontal hoverable" :class="{
							 	'purple lighten-4':service.status == 0,
							 	'red lighten-4':service.status == 2,
							 	'blue lighten-4':service.status == 3}"
							 	>
							      <div class="card-image">
							        <img :src="service.images[0]" class="centered-and-cropped"/>
							      </div>
							      <div class="card-stacked">
							        <div class="card-content">
							          	<p>{{service.resume}}</p>
							        </div>
							        <div class="card-action right-align">
							          <p class="price">
							          	<span v-if="service.status == 0">
							          	Em Análise
							          	</span>
							          	<span v-if="service.status == 1">
							          	R${{parseFloat(service.price/100).toFixed(2)}}
							          	</span>
							          	<span v-else-if="service.status == 2">
							          	Reprovado
							          	</span>
							          	<span v-else-if="service.status == 3">
							          	Congelado
							          	</span>
							          </p>
							        </div>
							      </div>
							    </div>
							</div>
						</div>
					</div>
					<div class="col s12 right-align" style="margin-bottom: 16px">
						<router-link tag="a" to="/provider/select" class="btn purple white-text"><i class="fas fa-angle-double-right right"></i>Avançar</router-link>
					</div>
				</div>
			</div> 
			<div slot="footer">
				<footer-provider/>
			</div>

		</layout-provider>

		<vue-modal unique="newservice" title="Novo Serviço">
			<div slot="content">
				<Provider-new-service @loading="save"/>
			</div>
		</vue-modal>

		<vue-modal unique="details" title="Detalhes">
			<carousel-vue slot="carousel" :pictures="getOfferCard().images || []" ref="carousel"/>
			<div class="row" slot="content" style="margin-top: -164px">
				<div class="col s12">
					{{getOfferCard().resume}}
					<hr/>
				</div>
				<div v-if="offer.length" class="col s12">
					{{getOfferCard().description}}
					<hr>
				</div>
				<div v-if="offer.length" class="col s12 center-align">
					<h3>R${{parseFloat(getOfferCard().price/100).toFixed(2)}}</h3>
				</div>
			</div>
			<div slot="footer" style="margin-top: 10px" class="center-align">
				<a @click="remove(getOfferCard().id)" class="btn red modal-close">
					<i class="far fa-trash-alt left"></i>Excluir
				</a>
				<a v-if="getOfferCard().status != 2 && getOfferCard().status != 0" @click="freeze(getOfferCard().id)" class="btn blue modal-close">
					<i :class="{
						'fas fa-eye-slash' : getOfferCard().status == 1,
						'fas fa-eye' : getOfferCard().status == 3
					}" class="left"></i>
					<span v-if="getOfferCard().status == 1">Esconder</span>
					<span v-else>Revelar</span>
				</a>
			</div>
		</vue-modal>
	</div>
</template>

<script>

import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
import VueLoader from "@/components/gadgets/VueLoader"

import ProviderNewService from "@/pages/Providers/menu/ProviderNewService"
import CarouselVue from "@/components/gadgets/CarouselVue"
import VueModal from "@/components/modals/VueModal"
import FileSender from "@/components/forms/FileSender"

import Core from "@/core/Core"

export default {
  name: 'ProviderServices',
  components:{VueLoader, LayoutProvider, ProviderNewService, FileSender, FooterProvider, VueModal, CarouselVue},
  methods:{
  	save(status){
  		if(status) this.$refs.loader.start();
  		else this.update();
  	},
  	newOffer(){
  		$('#newservice').modal('open');
  	},
  	remove(id){
    	let dt = {key:this.key, id:id, action:"remove"};
    	Core.post('/provider/service', dt, {}, "Serviço removido com sucesso!")
    	.then(() => {
    		this.update();
    	});
  	},
  	freeze(id){
    	let dt = {key:this.key, id:id};
    	Core.post('/service/freeze', dt, {}, "Serviço alterado com sucesso!")
    	.then((res) => {
    		if (res) this.update();
    	});
  	},
  	getOffer(){
  		if(this.offer.length > 0) return this.offer[this.ind];
  		return [];
  	},
  	getOfferCard(){
  		if(this.offer.length > 0) return this.offer[this.ind].card[this.selected];
  		return {};
  	},
  	showDetails(c){
  		this.selected = c;
  		$('#details').modal('open');
  		this.$refs.carousel.update();
  	},
  	next(){
  		this.selected = 0;
  		if(this.offer.length == 1) return;
  		this.ind++;
  		this.ind = this.ind%this.offer.length;
  	},
  	previous(){
  		this.selected = 0;
  		if(this.offer.length == 1) return;
  		this.ind--;
  		this.ind = Math.abs(this.ind);
  	},
  	update(){
  		this.$refs.loader.start();
  		this.offer = [];
		Core.getdata('api/provider/service',{key:this.key, action:"list"})
		.then((res) => {
			this.offer = res;
			this.ind = 0;
			this.selected = 0;
		})
		.then(() => {
			this.$refs.loader.stop();
		});
  	}
  },
  data () {
    return {
    	key:"",
    	selected:0,
    	ind: 0,
    	offer:[],
    	newoffer:null
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
	var select = document.querySelector('#business');
	M.FormSelect.init(select);
	var modals = document.querySelectorAll('.modal');
	var options = {'endingTop': 5};
	M.Modal.init(modals, options);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-provider #select{
		min-height: 75vh;
	}
	#layout-provider .horizontal{
		height: 170px;
	}

	#layout-provider .card-image{
	    width: 96px;
	    height: 170px;
	}
	#layout-provider .price{
		margin: 0;
		color: #a532ed;
		font-weight: 700;
		font-size: 1.25em;
	}
	.tag{
		color: white;
		font-weight: 700;
		background-color: #a532ed;
		text-transform: uppercase;
		padding: 6px 16px;
	}
	#layout-provider .btn-floating{
	  margin: 0;
	  transform: translate(0%, 50%);
	}
</style>
