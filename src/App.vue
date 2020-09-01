<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeCreate: function(){
	if ('serviceWorker' in navigator) {
  		navigator.serviceWorker.register('../sw.js')
    	.then(reg => console.info('registered sw', reg))
    	.catch(err => console.error('error registering sw', err));
	} else {
		console.log('ServiceWorker não é suportado.');
	}
  }
}
</script>

<style>
	#app{
		position: absolute;
	}
	.row{
		margin: 0;
	}
	.centered-and-cropped {
		height: 170px;
		object-fit: cover
	}
	footer {
		width: 100%;
	}
	footer h1{
		margin-top: 12px;
		font-size: 1.5em;
	}
</style>
