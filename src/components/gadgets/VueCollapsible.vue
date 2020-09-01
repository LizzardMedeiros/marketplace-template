<template>
    <ul class="collapsible">
      <li>
        <div class="collapsible-header">
          <slot name="header"/>
        </div>
        <div class="collapsible-body">
          <slot name="body"/>
        </div>
      </li>
  </ul>
</template>

<script>

export default {
  name: 'VueCollapsible',
  props:[],
  data () {
    return {}
  },
  mounted(){
    $('.collapsible').collapsible();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
