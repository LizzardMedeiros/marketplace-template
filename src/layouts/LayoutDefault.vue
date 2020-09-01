<template>
	<div id="layout-default" :class="style.color.background">
		<bride-navbar/>
		<div class="container">
			<slot name="content"/>
		</div>
		<div class="footer">
			<slot name="footer"/>
		</div>	
	</div>
</template>

<script>
import {style} from '@/json/config.json'
import BrideNavbar from '@/components/navbars/BrideNavbar'
export default {
  name: 'LayoutDefault',
  components:{BrideNavbar},
  methods:{
  },
  data () {
    return {
    	style:style
    }
  },
  created: function(){
  }
}
</script>
<style scoped>
	#layout-default .container{
		min-height: calc(100vh - 145px);
		padding-bottom: 88px;
	}
	#layout-default .footer{
		position: fixed;
		width: 100vw;
		margin: 0;
		top: calc(100vh - 56px);
		z-index: 1;
	}
	#layout-default{
		min-width: 100vw;
		min-height: 100vh;
		width:auto;
		height:auto;
		background: url("~@/assets/grey-hearts.svg") top right;
		background-repeat: no-repeat;
		background-size: 33%, auto, 100%, auto;
		background-attachment: fixed;
	}
</style>
