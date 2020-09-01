<template>
	<div class="col s12 m8 offset-m2 l6 offset-l3">
    <div class="card-panel grey lighten-5 z-depth-1">
      <div class="card-title">
        {{title}}
      </div>
      <div class="row valign-wrapper">
        <div class="col s0" :class="{'s2' : icon}">
          <i :class="icon+' '+color+'-text'" class="small"></i>
        </div>
        <div class="col s12" :class="{'s10' : icon}">
        	<slot name="body"></slot>
        </div>
      </div>
      <div class="card-action" :class="falign+'-align'">
        <slot name="footer"></slot>
      </div>
    </div>
  </div> 
</template>

<script>

export default {
  name: 'CardVue',
  props:['icon', 'color', 'title', 'falign'],
  components:{},
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
