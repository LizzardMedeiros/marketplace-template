<template>
	<div>
		<vue-loader ref="loader"/>
		<layout-default>
			<div slot="content" id="select" class="row">
				<div class="row">
					<div class="col s12" style="margin:24px 0">
						<img class="" src="@/assets/tag-redservices.svg">
					</div>
				</div>
				<div class="row card">
					<div class="col s12 center-align">
						<h3>Selecione os serviços você deseja:</h3>
						<div class="row left-align" style="margin: 24px auto">
							<div v-for="(service, index) in services" :key="index" class="col s6 left-align">
								<label>
							        <input @change="select(index)" class="filled-in" type="checkbox" :checked="services[index].selected"/>
							        <span style="font-size: 12px; font-weight:500" :class="style.color.label">{{service.title}}</span>
							    </label>
							</div>
						</div>
					</div>
				</div>
				<div class="row valign-wrapper">
					<div class="col s8 center-align" style="margin-bottom: 22px;">
						<h3>Serviços Selecionados</h3> 
					</div>
					<div class="col s4 center-align">
						<div class="text-circle">{{amount}}</div> 
					</div>
				</div>
				<div v-if="amount > 0" class="row" style="margin: 24px;">
					<div class="col s12 right-align">
						<router-link tag="a" :to="{name:'BrideChoose', params:{'services':getSelectedIdArray()}}" class="btn btn-small waves-effect" :class="style.color.primary">
							<i class="material-icons large right">chevron_right</i>Avançar
						</router-link>
					</div>
				</div>
			</div> 
			<div slot="footer">
				<footer-default/>
			</div>
		</layout-default>
	</div>
</template>

<script>

import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import VueLoader from "@/components/gadgets/VueLoader"

import VueModal from "@/components/modals/VueModal"
import Core from "@/core/Core"

export default {
  name: 'BrideSelect',
  components:{LayoutDefault, FooterDefault, VueLoader, VueModal},
  methods:{
  	select(i){
  		this.services[i].selected = !this.services[i].selected;
  		if(this.services[i].selected) this.amount++;
  		else this.amount--;
  	},
  	getSelectedIdArray(){
  		var sel = [];
  		this.services.forEach((s) => {
  			if(s.selected) sel.push(parseInt(s.id));
  		});
  		return sel;
  	},
  	update(){
		Core.getdata('api/service/getavailable', {})
		.then((r) => {
			if(r.length > 0) r.forEach((service) => {
				var s = {id:service.id, selected:false, title:service.name};
				this.services.push(s);
			});
			this.$refs.loader.stop();
		});
  	}
  },
  data () {
    return {
    	style:style,
    	amount: 0,
    	services:[]
    }
  },
  created: function(){
  	if(!localStorage.token) this.$router.push("/");
  	this.amount = 0;
	this.services.forEach((item) => {
		if(item.selected) this.amount++;
	});
	this.update();
  },
  mounted: function(){
  	$('.modal').modal();
  	this.$refs.loader.start();
  }
}
</script>

<style scoped>
	#layout-bride #select{
		min-height: 75vh;
	}

	#layout-default [type="checkbox"].filled-in:checked + span:not(.lever):after {
	  border: 2px solid #ed3237;
	  background-color: #ed3237;
	}

	#layout-default h3{
		color: #ed3237;
		font-weight: 700;
		font-size: 1.25em;
	}
	#layout-default .btn-floating{
	  margin: 0;
	  transform: translate(0%, 50%);
	}
	#layout-default .text-circle {
		margin: auto;
		border-radius: 50%;
		width: 1.5em;
		height: 1.5em;
		padding: 4px;
		background: #ed3237;
		border: 2px solid #ed3237;
		color: white;
		text-align: center;
		font: 32px Arial, sans-serif;
	}
</style>
