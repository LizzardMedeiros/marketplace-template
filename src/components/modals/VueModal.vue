<template>
  <!-- Modal Structure -->
  <div :id="unique" class="modal" :style="cstyle">
    <div class="modal-content">
      <div class="row">
        <div class="col s2">
          <h4><i :class="icon"></i></h4>
        </div>
        <div class="col s8">
          <h4 class="center">{{title}}</h4>
        </div>
        <div class="col s2">
          <a class="modal-close black-text right">
            <i class="fas fa-times small"></i>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col s12"><slot name="carousel"/></div>
        <div class="col s12"><slot name="content"/></div>
      </div>
    </div>
    <div class="modal-footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueModal',
  props:['unique', 'title', 'icon', 'options', 'cstyle'],
  methods:{
    close(){
      $("body").css("overflow", "auto");
    }
  },
  data(){
    return {
      instance:null
    }
  },
  mounted:function(){
    var elems = document.querySelector('#'+this.unique);
    var opt = this.options || {}; 
    this.instance = M.Modal.init(elems, opt);
  },
  watch:{
    'instance.isOpen' : function(n){
      this.close();
    }
  }
}
</script>

<style>
  .modal h3{
    margin: 0;
    color: #ed3237;
    font-weight: 700;
    font-size: 1.75em;
  }
  .modal h4{
    font-weight: 700;
    font-size: 1.75rem;
  }
</style>
