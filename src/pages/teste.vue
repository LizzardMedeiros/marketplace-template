<template>
  <!-- Modal Structure -->
  <div>
    <div id="merda" class="modal">
      <div class="modal-content">
        <h4>title</h4>
        <div class="row">
        	<div class="col s12 container">
        		<slot name="content"/>
        	</div>	
        </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
    <button data-target="merda" class="btn modal-trigger">Modal</button>
  </div>
</template>

<script>
export default {
  name: 'teste',
  mounted: function(){
  $('.modal').modal();
  }
}
</script>

<style>
</style>
