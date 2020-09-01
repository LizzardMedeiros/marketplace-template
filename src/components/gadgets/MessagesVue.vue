<template>
	<div>
		<!-- Modal Messages -->
		<div id="modalMessages" class="modal">
			<div class="modal-content">
				<ul class="collapsible">
				    <li v-for="(message, index) in messages" :key="index">
				      <div class="collapsible-header row">
				      	<div class="col s12"><i class="far fa-envelope-open"></i>{{message.sender}}</div>
				      </div>
				      <div class="collapsible-body row">
				      	<div class="col s12">
				      		{{message.message}}
				      	</div>
				      	<div class="col s12">
				      		<hr/>
				      		<span v-if="message.link">
				      			<router-link tag="a" :to="message.link" class="btn-small green"><i class="fas fa-search-plus left"></i>Ver Detalhes</router-link>
				      		</span>
		      				<a @click="selectMessage(index)" class="btn-small btn-flat red-text modal-trigger right" data-target="modalDelete"><i class="fas fa-trash-alt"></i></a>
				      	</div>
				      </div>
				    </li>
				</ul>
			</div>
		</div>
		<!-- Modal Delete Message -->
		<div id="modalDelete" class="modal">
			<div class="modal-content">
			  <h4>Confirmar</h4>
			  <p>Gostaria de excluir essa mensagem?</p>
			</div>
			<div class="modal-footer">
			  <a @click="deleteMessage" class="modal-close btn waves-effect" :class="color">Sim</a>
			  <a class="modal-close btn waves-effect white black-text">Cancelar</a>
			</div>
		</div>
  	</div>
</template>

<script>
import VueModal from "@/components/modals/VueModal"
import Core from "@/core/Core"
export default {
  name: 'MessagesVue',
  components:{VueModal},
  props:['color'],
  methods: {
    stop(){
      clearTimeout(this.timeout_handle);
      this.timeout_handle = null;   
    },
  	getMessages(){
  		$('#modalMessages').modal('open');
  	},
  	selectMessage(id){
  		this.selected_message = id;
  	},
  	deleteMessage(){
  		if(this.selected_message == -1) return;
  		Core.showMessage("Aguarde um momento.");
  		var id = this.messages[this.selected_message].id;
  		Core.post('/messages/delete', {key:this.key, id:id})
  		.then((r) => {
  			if(r){
  				this.messages.splice(this.selected_message, 1);
  				this.$emit('update-message', this.messages);
  				this.selected_message = -1;
  			}
  		})
  		.then(() => {
  			if(this.messages.length == 0){
  				$('#modalMessages').modal('close');
  			}
  		});
  	},
  	update(){
  		Core.getdata('api/messages/list',{key:this.key})
  		.then((res) => {
  			this.messages = res;
  	  		clearTimeout(this.timeout_handle);
  	  		this.timeout_handle = setTimeout(this.update, 10000);
  	  		this.$emit('update-message', this.messages);
  		});
  	}
  },
  data(){
  	return {
  		key:null,
  		timeout_handle: null,
  		messages:[],
  		selected_message:null
  	}
  },
  mounted: function(){
  	clearTimeout(this.timeout_handle);
  	this.timeout_handle = null;
  	$('.modal').modal();
  }
}
</script>

<style>
	#modalMessages{
		min-width:100vw
	}
</style>
