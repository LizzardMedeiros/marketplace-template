<template>
	<div>
		<nav :class="color">
			<div class="nav-wrapper container">
			  <router-link v-if="key != null" :to="'/'+home" tag="a" class="brand-logo left">
			  	<img class="icon" src="@/assets/nav-logo.svg" alt="Noivas Já" width="96px" />
			  </router-link>
			  <router-link v-else to="/" tag="a" class="brand-logo left" >
			  	<img class="icon" src="@/assets/nav-logo.svg" alt="Noivas Já" width="96px"/>
			  </router-link>
			  <div class="row" v-if="key != null">
			  	<div class="col s12">
				  <a @click="openMenu" class="right">
				  	<i class="material-icons">menu</i>
				  </a>
				  <a @click="getMessages" class="btn-flat right white-text" :disabled="msg_length == 0" style="margin:10px auto">
				  	<i class="fas fa-bell"></i><label v-if="msg_length > 0" class="label-advise">{{msg_length}}</label>
				  </a>
				</div>
			  </div>
			</div>
		</nav>
		<ul class="sidenav sidenav-fixed" id="mobile-menu">
			<slot name="menu"/>
		</ul>

		<!-- Modal Logout -->
		<div id="modalLogout" class="modal">
			<div class="modal-content">
			  <h4>Sair</h4>
			  <p>Gostaria de sair?</p>
			</div>
			<div class="modal-footer">
			  <a @click="logout" class="modal-close btn waves-effect" :class="color">Sim</a>
			  <a class="modal-close btn waves-effect white black-text">Cancelar</a>
			</div>
		</div>

		<messages-vue ref="messages" @update-message="updateMessage"/>
		
  	</div>
</template>

<script>
import VueModal from "@/components/modals/VueModal"
import MessagesVue from "@/components/gadgets/MessagesVue"
import Core from "@/core/Core"
export default {
  name: 'Navbar',
  components:{VueModal, MessagesVue},
  props:['color','home'],
  methods: {
  	openMenu(){
  		$('.sidenav').sidenav('open');
  	},
  	logout(){
  		this.$refs.messages.stop();
  		localStorage.removeItem('token');
  		this.$emit('logout');
  		this.key = null;
  		this.$router.push("/");
  	},
  	updateMessage(mes){
  		this.msg_length = mes.length;
  	},
  	getMessages(){
  		if(this.msg_length == 0) return;
  		this.$refs.messages.getMessages();
  	},
  	update(){
  		if(this.key){
			this.$refs.messages.key = this.key;
			this.$refs.messages.update();
  		}else{
  			this.$router.push("/");
  			this.$refs.messages.stop();
  		}
  	}
  },
  data(){
  	return {
  		key:null,
  		msg_length:0
  	}
  },
  mounted: function(){
  	$('.sidenav').sidenav();
  	$('.modal').modal();
  	$('.collapsible').collapsible();
  },
  watch: {
  	key : function(n){
  		this.update();
  	}
  }
}
</script>

<style>
	.label-advise{
		color: white;
		font-size: 9px;
		margin: 3px;
	}
</style>
