<template>
  <nav :class="color">
    <div class="nav-wrapper container valign-wrapper">
      <router-link to="/" class="left brand-logo"><img src="@/assets/nav-logo.svg"/></router-link>
      <ul class="right">

      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props:['color'],
  data () {
    return {
      title: 'Title'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.brand-logo{
		position: absolute;
		margin-top: 10px;
		left: 0;
	}
	.brand-logo img{
		height: 3rem;
	}
	.close{
		margin-left: -8px;
	}
	.btn{
		background-color: transparent;
		border-style: solid;
		border-width: 1px;
		border-radius: 3px;
	}
</style>
