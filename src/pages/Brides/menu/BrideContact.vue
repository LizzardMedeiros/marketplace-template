<template>
	<layout-default>
		<div slot="content" class="row">
			<div class="col s12" style="margin-top:15%">
				<div class="row">
					<img src="@/assets/red-contact.png" style="max-height:40px;"/>
				</div>
				<div class="row" style="margin: 48px 0">

					<div class="col s12 input-field">
					    <select id="type" @change="setType">
					      <option :class="style.color.text" value="" disabled>Tipo de mensagem</option>
					      <option value="Dúvida">Dúvida</option>
					      <option value="Crítica">Crítica</option>
					      <option value="Erro">Relatar Erros</option>
					      <option value="Reclamação">Reclamação</option>
					      <option value="Sugestão">Sugestões</option>
					      <option value="Elogio">Elogios</option>
					    </select>
					</div>

					<div class="col s12 input-field">
						<div class="row">
					        <div class="input-field col s12">
					          <textarea id="message" class="materialize-textarea" :class="style.color.text" v-model="mes.message">
					          </textarea>
					          <label for="message" :class="style.color.label">Escreva aqui sua mensagem</label>
					        </div>
				      	</div>
					</div>
					<div class="col s12 right-align">
						<router-link tag="a" to="/bride" class="btn black-text" :class="style.color.background"><i class="fas fa-angle-double-left left"></i>Voltar</router-link>
						<a @click="send" class="btn waves-effect waves-teal white-text" :class="style.color.primary"><i class="far fa-lightbulb left"></i>Enviar</a>
					</div>
				</div>
			</div>
		</div> 
		<div slot="footer">
			<footer-default/>
		</div> 		
	</layout-default>
</template>

<script>

import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import Core from "@/core/Core"

export default {
  name: 'BrideContact',
  components:{LayoutDefault, FooterDefault},
  methods:{
  	setType(){
  		this.mes.type = $('#type').val();
  	},
  	send(){
	  	Core.getuser().then((r) => {
	  		if(!r) this.$router.push("/");
	  		else{
	  			var dt = {to:'0', key:r.key, type:1, message:this.mes};
	  			Core.post('/messages/send', dt, {}, 'Mensagem enviada com sucesso!')
	  			.then((r) => {
	  				if(r) this.mes.message = "";
	  			});
	  		}
	  	});
  	}
  },
  data () {
    return {
    	style:style,
    	mes:{
    		message:"",
    		type:null
    	}
    }
  },
  mounted : function(){
  	$('select').formSelect();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #layout-default .input-field input, #layout-default select, #layout-default .input-text{
    font-weight: 500;
    color: #b71c1c !important;
  }
</style>
