<template>
	<div>
		<navbar color="purple" ref="navbar" home="provider">
			<div slot="menu">
				<li>
					<div class="user-view">
				      <div class="background purple">
				        
				      </div>
				      <a href="#user">
				      	<img class="circle" src="@/assets/default.png"></a>
				      <a href="#name"><span class="white-text name">{{user.fantasy}}</span></a>
				      <a href="#email"><span class="white-text email">{{user.email}}</span></a>
				    </div>
				</li>
				<li>
					<router-link tag="a" to="/provider/profile" class="sidenav-close">
						<i class="fas fa-male center"></i>Meu Perfil
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/provider/schedule" class="sidenav-close">
						<i class="far fa-calendar-alt center"></i>Minha Agenda
					</router-link>
				</li>
				<li><div class="divider"></div></li>
				<li>
					<router-link tag="a" to="/provider/select" class="sidenav-close">
						<i class="fas fa-female center"></i>Minhas Noivas
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/provider/services" class="sidenav-close">
						<i class="fas fa-cash-register center"></i>Meus Serviços
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/provider/orders" class="sidenav-close">
						<i class="fas fa-cart-arrow-down center"></i>Meus Pedidos
					</router-link>
				</li>
				<li><div class="divider"></div></li>
				<li>
					<router-link tag="a" to="/provider/payment" class="sidenav-close">
						<i class="fas fa-money-check-alt center"></i>Pagamentos
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/provider/contact" class="sidenav-close">
						<i class="fas fa-envelope center"></i>Contato
					</router-link>
				</li>
				<li><div class="divider"></div></li>
				<li><a data-target="modalLogout" class="modal-trigger sidenav-close"><i class="fas fa-sign-out-alt center"></i>Sair</a></li>
			</div>
		</navbar>
  	</div>
</template>

<script>
import Navbar from "@/components/navbars/Navbar"
import Core from "@/core/Core"
export default {
  name: 'ProviderNavbar',
  components:{Navbar},
  methods: {
	update()
	{
		if(localStorage.token)
  			Core.getuser().then((r) => {
  				if(r.status && r.type == 2){
					Core.getdata('api/provider/getdata',{key:r.key})
			  		.then((usr) => {
			  			if(usr == 404) this.$refs.navbar.logout();
			  			else{
				  			this.$refs.navbar.key = r.key;
				  			usr.profilepic = Core.getUrl()+'assets/profile/'+usr.profilepic;
				  			this.user = usr;
				  		}
			  		});
  				}
			});
	}
  },
  data(){
  	return {
  		user:{
  			name: '',
  			email: '',
  			profilepic: '@/assets/default.png'
  		}
  	}
  },
  created: function(){
  	this.update();
  	this.$emit('user', []);
  },
  mounted: function(){
  	$('.sidenav').sidenav();
  }
}
</script>

<style>
	nav{
		max-width: 100%;
	}
	.nav-wrapper{
		line-height: 48px;
		height: 48px;
	}
	nav .brand-logo .icon{
		max-height: 48px;
		vertical-align: middle;
	}
</style>
