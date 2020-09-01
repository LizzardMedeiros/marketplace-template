<template>
	<layout-provider>
		<div slot="content" class="row">
			<div class="col s12" style="margin-top:15%">
				<div class="row">
					<img src="@/assets/tag-purplecontact.svg" style="max-height:40px;"/>
				</div>
				<div class="row" style="margin: 48px 0">
					<div class="col s12 input-field">
					    <select id="type" @change="setType">
					      <option value="" disabled>Tipo de mensagem</option>
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
					          <textarea id="message" class="materialize-textarea" v-model="mes.message">
					          </textarea>
					          <label for="message">Escreva aqui sua mensagem</label>
					        </div>
				      	</div>
					</div>
					<div class="col s12 right-align">
						<router-link tag="a" to="/provider" class="btn white black-text"><i class="fas fa-angle-double-left left"></i>Voltar</router-link>
						<a @click="send" class="btn waves-effect waves-teal purple white-text"><i class="far fa-lightbulb left"></i>Enviar</a>
					</div>
				</div>
			</div>
		</div> 
		<div slot="footer">
			<footer-provider/>
		</div> 		
	</layout-provider>
</template>

<script>

import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
import Core from "@/core/Core"

export default {
  name: 'BrideContact',
  components:{LayoutProvider, FooterProvider},
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
    	mes:{
    		message:"",
    		type:null
    	}
    }
  },
  mounted: function(){
  	$('select').formSelect();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-provider .logo{
		margin-top:32px;
		margin-bottom: 5%;
	}

	#layout-provider .logo img{
		max-width: 96px;
	}

	#layout-provider .btn-flat{
		font-weight: 700;
	}
</style>
