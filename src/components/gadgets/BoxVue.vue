<template>
  <ul class="collapsible">
    <li>
      <div class="collapsible-header row valign-wrapper">
        <div class="col s2"><i :class="icon+' '+color+'-text'"></i></div>
        <div class="col s8">
          {{title}} <label v-if="size">({{size}})</label>
        </div>
        <div class="col s2 right-align">
          <label><i class="fas fa-chevron-down"></i></label>
        </div>
      </div>
      <div class="collapsible-body white">
        <div class="row">
          <div class="col s12">
            <slot name="content"></slot>
          </div>
          <div class="col s12">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'BoxVue',
  props:['icon', 'title', 'color', 'size'],
  components:{},
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
