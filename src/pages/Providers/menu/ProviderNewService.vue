<template>
	<div>
		<div id="layout-provider">
			<div class="row">
				<div class="col s12 input-field">
				    <select id="business" v-model="offer.service_id">
				      <option value="-1" disabled selected>Escolha um segmento...</option>
				      <option v-for="(service, index) in services" :key="index" :value="service.id"><span class="purple-text">{{service.name}}</span>
				      </option>
				    </select>
				    <label>Segmento*</label>
				</div>
				<div class="input-field">
				    <div class="col s12">
				    	<label>Anexe fotos do produto*</label>
				    </div>
					<div class="col s12 file-field">
						<file-sender ref="filesender" cstyle="purple" :max_files="5" helper="Máximo 5 fotos" :multiple='true' icon="fas fa-camera-retro"/>
				    </div> 
				</div>
				<div class="col s12 input-field">
					<money id="price" v-model="offer.price" v-bind="money"></money>
					<label for="price" class="active">Preço</label>
				</div>
				<div class="col s12 input-field">
					<textarea id="resume" class="materialize-textarea" data-length="48" v-model="offer.resume"></textarea>
					<label for="resume">Título do anúncio</label>
				</div>
				<div class="col s12 input-field">
					<textarea id="desc" class="materialize-textarea" v-model="offer.description"></textarea>
					<label for="desc">Descrição Completa</label>
				</div>
				<div class="col s12 valign-wrapper">
					<h5>Veja o tutorial</h5> 
					<h5><i class="fab fa-youtube small" style="margin-left:8px"></i>
					</h5>
				</div>
			</div>
			<div class="row" style="margin: 24px 0;">
				<div class="col s12 center-align">
					<a class="btn waves-effect purple darken-3 modal-trigger" data-target="confirm">
						<i class="fas fa-check left"></i>Salvar
					</a>
				</div>
			</div>
		</div>
		<vue-modal title="Atenção" unique="confirm">
			<div slot="content">
				Atenção, uma vez cadastrado o serviço não pode ser modificado, caso deseje alterar o serviço, exclua e adicione novamente.
			</div>
			<div slot="footer">
				<a @click="save" class="btn waves-effect purple darken-3 modal-close">
					<i class="fas fa-check left"></i>Confirmar
				</a>				
			</div>
		</vue-modal>
	</div>
</template>

<script>

import VueModal from "@/components/modals/VueModal"
import FileSender from "@/components/forms/FileSender"
import {Money} from 'v-money'
import Core from "@/core/Core"

export default {
  name: 'ProviderNewService',
  components:{VueModal, FileSender, Money},
  methods:{
  	save(){
		Core.getuser().then((r) => {
			if(!r) this.$router.push("/");
	        else{
	        	this.$emit('loading', 1);
	        	this.offer.images = Core.file;
	        	this.offer.price = this.offer.price*100;
	        	this.offer.key = r.key;
	        	this.offer.action = 'add';
	        	Core.post('/provider/service', this.offer)
	        	.then(() => {
	        		this.offer = {};
	        		this.$refs.filesender.erase();
	        		this.$emit('loading', 0);
	        	});
	        }
	    });
  	}
  },
  data () {
    return {
    	services:[],
    	offer:{
    	},
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
  	Core.file = [];
  },
  mounted: function(){
  	$('.modal').modal();
	Core.getdata('api/service/getall', {})
	.then((r) => {
		if(r.length > 0) r.forEach((service) => {
			var s = {selected:false, title:service.name};
			this.services.push({name:service.name, id:service.id});
		});		
	}).then(() => {
		var select = document.querySelector('#business');
		M.FormSelect.init(select);
		$('textarea#desc, textarea#resume').characterCounter();
	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-provider h4{
		color: #a532ed;
		font-size: 1.2em;
		font-weight: 500;
		padding: 0;
		margin-top: 0;
	}
	#layout-provider .tag{
		color: white;
		font-weight: 700;
		background-color: #a532ed;
		text-transform: uppercase;
		padding: 3px 12px;
		margin-right: 16px;
	}

</style>
