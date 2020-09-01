<template>
  <div class="carousel">
    <a v-for="(picture, index) in pictures" :key="index" class="carousel-item center-align">
    	<img :src="picture" class="materialboxed centered-and-cropped">
    </a>
  </div>
</template>

<script>
export default {
	name: 'Carousel',
	props:{
		pictures:{type:Array, default:[]}
	},
	methods:{
		update(){
			$('.carousel').carousel();
			$('.materialboxed').materialbox();
		}
	},
	data(){
		return{}
	}
}
</script>

<style>
	.carousel {
		margin: 0;
	}
	.carousel .centered-and-cropped{
		margin: -96px auto;
	    width: 196px;
	    height: 196px;
	}
</style>
