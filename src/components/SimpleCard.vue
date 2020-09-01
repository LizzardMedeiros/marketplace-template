<template>
    <div class="card-panel hoverable grey lighten-5 z-depth-1">
      <div class="card-content container">
        <h5 class="card-title center">{{title}}</h5>
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SimpleCard',
  props:['title'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-panel{
    padding-top: 18px;
  }
  h5{
    color: #8F1616;
  }
</style>
