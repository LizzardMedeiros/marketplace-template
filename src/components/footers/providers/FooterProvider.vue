<template>
	<footer id="footer-provider">
	   	<div class="row">
		  		<div class="col s12 center-align">
		  			<router-link to="/">
		  				<img class="" src="@/assets/purple-logo.svg">
		  			</router-link>
		  		</div>
		  	</div>
		  	<div class="row">
		  		<div class="col s12 center-align">
		  			<h1>contato@noivasja.com.br</h1>
		  		</div>
		  	</div>		
	</footer>
</template>

<script>
export default {
  name: 'FooterProvider',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
	#footer-provider h1{
		color: #a532ed;
	}
</style>
