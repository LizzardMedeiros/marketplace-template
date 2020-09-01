<template>
	<footer id="footer-default" :class="style.color.primary">
	   	<div class="row center-align valign-wrapper" style="padding-bottom: 10px">
		  		<div class="col s12 right-align" style="padding-top: 10px">
		  			<div class="row">
		  				<div class="col s3 center-align">
				  			<router-link class="btn btn-flat" to="/">
				  				<img class="" src="@/assets/footer-logo-noline.svg" style="width:32px">
				  			</router-link>		  					
		  				</div>
		  				<div class="col s3 center-align">
		  					<a class="btn btn-flat" :class="style.color.primary+' '+style.color.text_white"><i class="fab fa-facebook-f"></i></a>
		  				</div>
		  				<div class="col s3 center-align">
		  					<a class="btn btn-flat center" :class="style.color.primary+' '+style.color.text_white"><i class="fab fa-instagram"></i></a>
		  				</div>
		  				<div class="col s3 center-align">
		  					<a class="btn btn-flat center" :class="style.color.primary+' '+style.color.text_white"><i class="fab fa-twitter"></i></a>
		  				</div>
		  			</div>
		  			<div v-if="false" class="row">
		  				<div class="col s12 left-align">
		  					<label class="white-text">{{version}}</label>
		  				</div>
		  			</div>
		  		</div>
		  	</div>	
	</footer>
</template>

<script>
import {style} from "@/json/config.json"
import {version} from "@/json/config.json"
export default {
  name: 'FooterBride',
  data () {
    return {
    	style:style,
    	version:version
    }
  }
}
</script>
<style scoped>
</style>
