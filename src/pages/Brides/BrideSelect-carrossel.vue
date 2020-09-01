<template>
	<div>
		<layout-bride>
			<div slot="content" id="select" class="row">
				<div class="row">
					<div class="col s12 center-align" style="margin:24px 0">
						<img class="" src="@/assets/red-default.png">
					</div>
				</div>
				<div class="row red lighten-4">
					<div class="col s12 center-align">
						<h3>Selecione os serviços você deseja:</h3>
						<div class="carousel">
							<a v-for="(service, index) in services" :key="index" class="carousel-item">
								<div class="row" @click="select(index)" :class="{'selected':service.selected}">
									<div class="col s12" style="margin-bottom:-15px">
										<img :src="service.img" class="circle" style="width:128px"/>
									</div>
									<div class="col s12" style="margin-top:-15px">
										<h3>{{service.title}}</h3>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div class="row valign-wrapper" style="margin: 24px;">
					<div class="col s8 center-align">
						<h3>Serviços Selecionados</h3> 
					</div>
					<div class="col s4 center-align">
						<div class="text-circle">{{amount}}</div> 
					</div>
				</div>
				<div v-if="amount > 0" class="row" style="margin: 24px;">
					<div class="col s12 right-align">
						<button class="btn btn-small waves-effect red darken-3">
							<i class="material-icons large right">chevron_right</i>Avançar
						</button>
					</div>
				</div>
			</div> 
			<div slot="footer">
				<footer-bride/>
			</div>
		</layout-bride>
	</div>
</template>

<script>

import LayoutBride from "@/layouts/LayoutBride"
import FooterBride from "@/components/footers/brides/FooterBride"
import VueModal from "@/components/modals/VueModal"

export default {
  name: 'BrideSelect',
  components:{LayoutBride, FooterBride, VueModal},
  methods:{
  	select(i){
  		this.services[i].selected = !this.services[i].selected;
  		this.amount = 0;
  		this.services.forEach((item) => {
  			if(item.selected) this.amount++;
  		});
  	},
  },
  data () {
    return {
    	amount: 0,
    	services:[
    		{img:'https://cdn2.iconfinder.com/data/icons/valentine-colored-icons-2/128/86-512.png', title:'Banda', id:0, selected: false},
    		{img:'https://cdn2.iconfinder.com/data/icons/valentine-colored-icons-2/128/86-512.png', title:'Bem Casados', id:3, selected: true},
    		{img:'https://cdn2.iconfinder.com/data/icons/valentine-colored-icons-2/128/86-512.png', title:'Decoração', id:2, selected: true},
    		{img:'https://cdn2.iconfinder.com/data/icons/valentine-colored-icons-2/128/86-512.png', title:'Dia da Noiva/Noivo', id:5, selected: false},
    		{img:'https://cdn2.iconfinder.com/data/icons/valentine-colored-icons-2/128/86-512.png', title:'Boates e DJs', id:7, selected: false}
    	],
    	selected:[]
    }
  },
  created: function(){
  	this.amount = 0;
	this.services.forEach((item) => {
		if(item.selected) this.amount++;
	});
  },
  mounted: function(){
  	$('.modal').modal();
  	$('.carousel').carousel();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-bride #select{
		min-height: 75vh;
	}

	#layout-bride .selected{
		filter:grayscale(100%);
	}

	#layout-bride .carousel{
		margin-top: -96px;
		margin-bottom: -128px;
	}

	#layout-bride h3{
		color: #ed3237;
		font-weight: 700;
		font-size: 1.25em;
	}
	#layout-bride .btn-floating{
	  margin: 0;
	  transform: translate(0%, 50%);
	}
	#layout-bride .text-circle {
		margin: auto;
		border-radius: 50%;
		width: 1.5em;
		height: 1.5em;
		padding: 8px;
		background: #ef9a9a;
		border: 2px solid #ed3237;
		color: white;
		text-align: center;
		font: 48px Arial, sans-serif;
	}
</style>
