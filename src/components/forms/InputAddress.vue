<template>
			<div class="row">
				<div class="col s12 input-field">
					<the-mask id="cep" :mask="['#####-###']" v-model="address.cep"/>
					<label for="cep">CEP*</label>
					<a href="https://cep.guiamais.com.br/" target="_blank">Não sei meu CEP</a>
				</div>
				<div v-if="address.cep.length == 8" class="col s8 input-field">
			        <input id="road" type="text" class="validate" v-model="address.road">
			        <label for="road" class="active">Rua/Avenida</label>
				</div>
				<div v-if="address.cep.length == 8" class="col s4 input-field">
			        <input id="number" type="text" class="validate" v-model="address.number">
			        <label for="number" class="active">Número</label>
				</div>
				<div v-if="address.cep.length == 8" class="col s12 input-field">
			        <input id="complement" type="text" class="validate" v-model="address.complement">
			        <label for="complement" class="active">Complemento</label>
				</div>
				<div v-if="address.cep.length == 8" class="col s12 input-field">
			        <input id="neigh" type="text" class="validate" v-model="address.neigh">
			        <label for="neigh" class="active">Bairro</label>
				</div>
				<div v-if="address.cep.length == 8" class="col s8 input-field">
			        <input id="city" type="text" class="validate" v-model="address.city">
			        <label for="city" class="active">Cidade</label>
				</div>
				<div v-if="address.cep.length == 8" class="col s4 input-field">
			        <input id="state" type="text" class="validate" v-model="address.state">
			        <label for="state" class="active">Estado</label>
				</div>
			</div>
</template>

<script>

import {TheMask} from 'vue-the-mask'
import axios from 'axios'

export default {
  name: 'InputAddress',
  props:['addr'],
  components:{TheMask},
  methods:{
  	update(cep){
		axios.get('https://viacep.com.br/ws/'+cep+'/json/')
		.then((r) => {
			this.address.road = r.data.logradouro
			this.address.city = r.data.localidade
			this.address.neigh = r.data.bairro
			this.address.complement = r.data.complemento
			this.address.state = r.data.uf
		})
		.then(() => {
			if(this.address.road == null) this.address.road = this.addr.road;
			if(this.address.neigh == null) this.address.neigh = this.addr.neigh;
			if(this.address.complement == null) this.address.complement = this.addr.complement;
			this.$emit('change-address', this.address);
		});	
  	}
  },
  data () {
    return {
    	address:{
	    	cep:'',
	    	road:"",
	    	city:"",
	    	number:"",
	    	neigh:"",
	    	complement:"",
	    	state:""
    	}
    }
  },
  created:function(){
  	if(this.address.cep.length > 0){
  		this.address.cep = this.addr.cep;
  		this.update(this.cep);
  	}
  },
  watch:{
  	'address.cep' : function(n){
  		if(n.length == 8){
  			this.update(n);
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
