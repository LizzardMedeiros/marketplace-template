<template>
	<div>
		<vue-loader ref="loader"/>
		<layout-default>
			<div slot="content" id="select" class="row" style="margin-bottom: 48px;">
				<div class="row">
					<div class="col s12" style="margin:24px 0">
						<img class="" src="@/assets/tag-redservices.svg">
					</div>
				</div>
				<div class="row card grey lighten-5">
					<div class="col s12 center-align" style="margin: 16px 0">
						<h3 v-if="providers.length > 0">Selecione os fornecedores:</h3>
						<h3 v-else>Nenhum fornecedor encontrado!</h3>
						<label>Clique nas setas para mudar o serviço</label>

						<div v-if="providers.length > 0" class="row valign-wrapper" style="margin: 16px auto">
							<div class="col s3 right-align">
								<a :disabled="providers.length == 1" @click="previous" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">chevron_left</i></a>
							</div>
							<div class="col s6">
								<h5>{{providers[service_selected].service}}
								</h5>
							</div>
							<div class="col s3 left-align">
								<a :disabled="providers.length == 1" @click="next" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">chevron_right</i></a>
							</div>
						</div>

						<h4 v-if="providers.length > 0">Clique no fornecedor para mais detalhes</h4>
						<div v-if="providers.length > 0" class="row left-align" style="margin: 12px 0 ">
						<div v-for="(provider, index) in providers[service_selected].card" :key="index" class="col s12" @click="showDetails(index)">
							 	<div class="card horizontal hoverable lighten-4" :class="{
							 	'deep-orange': provider.selected,
							 	'blue-grey':provider.is_choosed
							 	}">
							      <div class="card-image">
							        <img :src="provider.images[0]" class="centered-and-cropped"/>
							      </div>
							      <div class="card-stacked">
							        <div class="card-content">
							          	<p>{{provider.resume.substr(0, 48)}}</p>
							          	<label>{{provider.locale}}</label>
							        </div>
							        <div class="card-action right-align">
							          <h3>R${{parseFloat(provider.price/100).toFixed(2)}}</h3>
							        </div>
							      </div>
							    </div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="provider_count > 0" class="row" style="margin: 24px;">
					<div class="col s12 right-align">
						<button data-target="confirm" class="btn btn-small waves-effect green modal-trigger">
							<i class="material-icons large right">chevron_right</i>Confirmar Pedidos
						</button>
					</div>
				</div>
			</div> 
			<div slot="footer">
				<footer-default/>
			</div>
		</layout-default>

		<vue-modal v-if="providers.length > 0" unique="details" title="Detalhes" :options="{'endingTop':'2%'}" cstyle="width:95vw; min-height:90vh">
			<carousel-vue style="margin-bottom: -164px;" ref="carousel" slot="carousel" :pictures="getSelectedCard().images"/>
			<div class="row" slot="content" style="margin-top: 0">
				<div class="col s12 center-align">
					<i class="material-icons">star</i>
					<i class="material-icons">star</i>
					<i class="material-icons">star_half</i>
					<i class="material-icons">star_border</i>
					<i class="material-icons">star_border</i>
				</div>
				<div class="col s12">
					{{getSelectedCard().description}}
					<hr>
				</div>
				<div class="col s12 center-align">
					<h3>R${{parseFloat(getSelectedCard().price/100).toFixed(2)}}
					</h3>
				</div>
			</div>
			<div slot="footer" class="center-align">
				<a v-if="providers[service_selected].card[provider_selected].selected" @click="select(provider_selected)" class="modal-close waves-effect waves-light btn red"><i class="material-icons left">clear</i>Cancelar Seleção</a>
				<a v-else-if="!providers[service_selected].card[provider_selected].is_choosed" @click="select(provider_selected)" class="waves-effect waves-light btn green"><i class="material-icons left">check</i>Selecionar Fornecedor</a>
				<a v-else disabled class="waves-effect waves-light btn green"><i class="material-icons left">check</i>Selecionado...</a>
			</div>
		</vue-modal>
		<vue-modal unique="confirm" title="Atenção!">
			<div slot="content">
				Você selecionou {{getSelectedServices().length}} fornecedores. Ao clicar em
				"Verificar", você será direcionada à tela de pedidos e deverá enviar uma mensagem ao fornecedor para concluir a verificação.
			</div>
			<div slot="footer">
				<a class="btn green modal-close" @click="confirm">Proseguir</a>
				<a class="btn grey lighten-5 black-text modal-close">Cancelar</a>
			</div>
		</vue-modal>

	</div>
</template>

<script>

//Layout
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import VueLoader from "@/components/gadgets/VueLoader"
//Components
import CarouselVue from "@/components/gadgets/CarouselVue"
import VueModal from "@/components/modals/VueModal"

import Core from "@/core/Core"

export default {
  name: 'BrideChoose',
  components:{VueLoader, LayoutDefault, FooterDefault, VueModal, CarouselVue},
  props:{
  	services:{type:Array, default:[]}
  },
  methods:{
  	next(){
  		this.provider_selected = 0;
  		let ss_size = this.providers.length;
  		this.service_selected = (this.service_selected+1)%ss_size;
  		this.provider_count = 0;
	  	this.providers[this.service_selected].card.forEach((provider) => {
	  		if(provider.selected) this.provider_count++;
	  	});
  	},
  	previous(){
  		this.provider_selected = 0;
  		let ss_size = this.providers.length;
  		if(this.service_selected == 0) this.service_selected = ss_size-1;
  		else this.service_selected--;
  		this.provider_count = 0;
	  	this.providers[this.service_selected].card.forEach((provider) => {
	  		if(provider.selected) this.provider_count++;
	  	});
  	},
  	select(i){
  		var s = this.providers[this.service_selected].card[i].selected;
  		if(this.provider_count < 3 || s)
  		{
	  		this.providers[this.service_selected].card[i].selected = !s;
	  		this.update();
	  	}
	  	else Core.showMessage(
	  		'Você não pode selecionar mais '+
	  		this.providers[this.service_selected].service+'!'
	  	);
  	},
  	getSelectedServices(){
  		var id_array = [];
  		this.providers.forEach((provider) => {
  			provider.card.forEach((service) => {
  				if(service.selected) id_array.push(parseInt(service.id));
  			});
  		});
  		return id_array;
  	},
  	getSelectedCard(){
  		if(this.providers[this.service_selected]){
  			return this.providers[this.service_selected].card[this.provider_selected];
  		}
  		else return [];
  	},
  	showDetails(i){
  		$('#details').modal('open');
  		this.provider_selected = i;
  		this.$refs.carousel.update();
  	},
  	confirm(){
  		this.$refs.loader.start();
  		var dt = {
  			key : this.key,
  			services : this.getSelectedServices()
  		}
  		Core.post('/service/hire', dt, {}, "Confirme seu pedido!")
  		.then((r) => {
  			if(r){
  				this.$refs.loader.stop();
  				this.$router.push("/bride/orders");
  			}
  		})
  	},
  	update(){
  		this.provider_count = 0;
	  	this.providers[this.service_selected].card.forEach((provider) => {
	  		if(provider.selected) this.provider_count++;
	  	});
	  	$("body").css("overflow", "auto");
	  	var plural = (3-this.provider_count) == 1 ? '' : 's';
	  	Core.showMessage('Você ainda pode selecionar '+(3-this.provider_count)+' serviço'+plural+' \''+this.providers[this.service_selected].service+'\'!');
  	}
  },
  data () {
    return {
    	key:0,
    	provider_count: 0,
    	service_selected: 0,
    	provider_selected: 0,
    	providers:[]
    }
  },
  created: function(){
		Core.getuser().then((r) => {
			if(!r) this.$router.push("/");
			else{
					this.key = r.key;
		  		Core.getdata('api/service/getoffers', {key:r.key, type:this.services})
		  		.then((res) => {
		  			this.providers = res;
				    this.$refs.loader.stop();
		  		});
		  	}
	});
  },
  mounted: function(){
  	this.$refs.loader.start();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#details{
		min-height: 70%;
	}
	#layout-default #select{
		min-height: 75vh;
	}

	#layout-default .horizontal{
		height: 170px;
	}

	#layout-default .card-image{
	    width: 96px;
	    height: 170px;
	}

	#layout-default [type="checkbox"].filled-in:checked + span:not(.lever):after {
	  border: 2px solid #ed3237;
	  background-color: #ed3237;
	}

	#layout-default h3{
		margin: 0;
		color: #ed3237;
		font-weight: 700;
		font-size: 1.25em;
	}
	#layout-default h4{
		margin: 0;
		font-weight: 500;
		font-size: 0.95em;
	}

	#layout-default .text-circle {
		margin: auto;
		border-radius: 50%;
		width: 1.5em;
		height: 1.5em;
		padding: 4px;
		background: #ef9a9a;
		border: 2px solid #ed3237;
		color: white;
		text-align: center;
		font: 32px Arial, sans-serif;
	}
</style>
