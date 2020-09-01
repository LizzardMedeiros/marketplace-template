<template>
	<layout-default>
		<div slot="content" class="row">
			<div class="col s12">
				<div class="row">
					<div class="col s12 left-align" style="margin: 24px 0">
						<h5 :class="style.color.text">Cadastre-se como</h5>
					</div>
				</div>
				<div class="row" style="margin: 8px 0">
					<div class="col s12 left-align">
						<router-link to="bride/register">
							<img src="@/assets/btn-bride.svg" alt="Brides" width="256px">
						</router-link>
					</div>
				</div>
				<div class="row" style="margin: 8px 0">
					<div class="col s12 left-align">
						<router-link to="provider/register">
							<img src="@/assets/btn-provider.svg" alt="Providers" width="256px">
						</router-link>
					</div>
				</div>
			</div>

			<div class="col s12">
				<div class="row">
					<div class="col s6" style="text-align: justify;">
						<h2 :class="style.color.text">Noivas Casamentos Orçamentos</h2>
					</div>
				</div>
				<div class="row">
					<div class="col s8" style="text-align: left;">
						<h3 :class="style.color.text">Os melhores preços e serviços aqui!</h3>
					</div>
				</div>
			</div>

		</div> 
		<div slot="footer">
			<footer-default/>
		</div> 		
	</layout-default>
</template>

<script>

import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"

export default {
  name: 'Home',
  components:{LayoutDefault, FooterDefault},
  data () {
    return {
    	style:style
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-default h3{
		font-size: 22px;
	}
	#layout-default h2{
		font-size: 28px;
		letter-spacing: 0.3rem;
	}
	#layout-default .footer{
		margin-top:36px;
	}
</style>
