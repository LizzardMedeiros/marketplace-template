<template>
	<div id="layout-provider">
		<provider-navbar/>
		<div class="container">
			<slot name="content" class="center-align"/>
		</div>
		<slot name="footer"/>
	</div>
</template>

<script>
import ProviderNavbar from '@/components/navbars/ProviderNavbar';
export default {
  name: 'LayoutProvider',
  components:{ProviderNavbar},
  data () {
    return {
    }
  }
}
</script>
<style scoped>
	#layout-provider .container{
		min-height: calc(100vh - 280px);
	}
	#layout-provider{
		min-width: 100vw;
		min-height: 100vh;
		width: auto;
		height: auto; 
		background: rgb(165,48,239);
		background: url("~@/assets/purple-hearts.svg") top right, #f3e5f5;
		background-repeat: no-repeat;
		background-size: 33%, auto, 100%, auto;
		background-attachment: fixed;
	}
	.picker__date-display{ 
		background-color: #a532ed !important;
	}
	.picker__day.picker__day--today{
		color: red !important;
	}
	.picker__day--selected, .picker__day--selected:hover, .picker--focused .picker__day--selected{
		background-color: #a532ed !important;
	}
	.picker__close{
		color: #a532ed;
	}
	.picker__today{
		color: #a532ed;
	}
</style>
