<template>
	<div>
		<layout-provider>
			<div slot="content" id="select" class="row">
				<div class="row">
					<div class="col s12" style="margin-top:24px">
						<img src="@/assets/purple-addservice.png" style="height:38px;">
					</div>
				</div>
				<div class="row card">
					<div class="col s12 card-title valign-wrapper" style="margin: 16px 0;">
						<i class="fas fa-cash-register left"></i>Cadastrar Serviço
					</div>
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
							<file-sender cstyle="purple" helper="Máximo 5 fotos" multiple="true" icon="fas fa-camera-retro"/>
					    </div> 
					</div>
					<div class="col s12 input-field">
						<textarea id="resume" class="materialize-textarea" v-model="offer.resume"></textarea>
						<label for="resume">Descrição Breve</label>
						<span class="helper-text">Máximo 140 caracteres</span>
					</div>
					<div class="col s12 input-field">
						<textarea id="desc" class="materialize-textarea" v-model="offer.description"></textarea>
						<label for="desc">Descrição Completa</label>
					</div>
					<div class="col s12">
						<h4 class="valign-wrapper">
							<span class="tag">Aviso!</span> Veja o tutorial 
						 	<i class="fab fa-youtube small" style="margin-left:8px"></i>
						</h4>
					</div>
				</div>
				<div class="row" style="margin: 24px 0;">
					<div class="col s12 center-align">
						<a @click="save" class="btn waves-effect purple darken-3">
							<i class="fas fa-check left"></i>Confirmar
						</a>
					</div>
				</div>
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
import FileSender from "@/components/forms/FileSender"
import Core from "@/core/Core"

export default {
  name: 'ProviderNewService',
  components:{LayoutProvider, FooterProvider, VueModal, FileSender},
  methods:{
  	save(){
		Core.getuser().then((r) => {
	        if(r){
	        	this.offer.images = Core.file;
	        	this.offer.key = r.key;
	        	this.offer.action = 'add';
	        	Core.post('/provider/service', this.offer);
	        }
	    });
  	}
  },
  data () {
    return {
    	services:[],
    	offer:{
    		service_id:"",
    		resume:"",
    		description:""
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
	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-provider #select{
		min-height: 75vh;
	}
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
	#layout-provider .btn-floating{
	  margin: 0;
	  transform: translate(0%, 50%);
	}

</style>
