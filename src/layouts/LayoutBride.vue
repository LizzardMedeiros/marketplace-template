<template>
	<div id="layout-bride">
		<bride-navbar/>
		<div class="container"><slot name="content"/></div>
		<slot name="footer"/>
	</div>
</template>

<script>
import BrideNavbar from '@/components/navbars/BrideNavbar'
export default {
  name: 'LayoutBride',
  components:{BrideNavbar},
  methods:{
  },
  data () {
    return {
    }
  },
  created: function(){
  }
}
</script>
<style scoped>
	#layout-bride .container{
		min-height: calc(100vh - 280px);
	}
	#layout-bride{
		min-width: 100vw;
		min-height: 100vh;
		width:auto;
		height:auto;
		background: rgb(239, 48, 53);
		background: url("~@/assets/red-hearts.svg") top right #ffebee;
		background-repeat: no-repeat;
		background-size: 33%, auto, 100%, auto;
		background-attachment: fixed;
	}
	.datepicker-date-display { 
		background-color: #a532ed !important;
	}
</style>
