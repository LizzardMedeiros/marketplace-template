<template>
	<footer id="footer-bride">
	   	<div class="row">
		  		<div class="col s12 center-align">
		  			<router-link to="/">
		  				<img class="logo" src="@/assets/red-logo.svg">
		  			</router-link>
		  		</div>
		  	</div>
		  	<div class="row">
		  		<div class="col s12 center-align">
		  			<h1 :class="style.color.text">contato@noivasja.com.br</h1>
		  		</div>
		  	</div>		
	</footer>
</template>

<script>
import {style} from '@/json/config.json'
export default {
  name: 'FooterBride',
  data () {
    return {
    	style:style
    }
  }
}
</script>
<style scoped>
	#footer-bride .logo{
		width:90%;
	}
</style>
