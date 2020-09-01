<template>
	<div>
		<navbar :color="style.color.primary" ref="navbar" home="bride">
			<div slot="menu">
				<li>
					<div class="user-view">
				      <div class="background" :class="style.color.primary">
				        
				      </div>
				      <a href="#user">
				      	<img class="circle" src="@/assets/default.png"></a>
				      <a href="#name"><span class="white-text name">{{user.name}}</span></a>
				      <a href="#email"><span class="white-text email">{{user.email}}</span></a>
				    </div>
				</li>
				<li>
					<router-link tag="a" to="/bride/profile" class="sidenav-close">
						<i class="fas fa-female center"></i>Perfil
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/bride/marriage" class="sidenav-close">
						<i class="fas fa-place-of-worship center"></i>Casamento
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/bride/orders" class="sidenav-close">
						<i class="far fa-calendar-alt center"></i>Pedidos
					</router-link>
				</li>
				<li>
					<router-link tag="a" to="/bride/contact" class="sidenav-close"><i class="fas fa-envelope center"></i>Dúvidas e Contato</router-link>
				</li>
				<li><div class="divider"></div></li>
				<li><a data-target="modalLogout" class="modal-trigger sidenav-close"><i class="fas fa-sign-out-alt center"></i>Sair</a></li>
			</div>
		</navbar>
  	</div>
</template>

<script>
import {style} from '@/json/config.json'
import Navbar from "@/components/navbars/Navbar"
import Core from "@/core/Core"
export default {
  name: 'BrideNavbar',
  components:{
  	Navbar
  },
  methods: {
	update()
	{
		if(localStorage.token)
  			Core.getuser().then((r) => {
  				if(r.status && r.type == 1){
					Core.getdata('api/bride/getdata',{key:r.key})
					.then((usr) => {
						if(usr == 404) this.$refs.navbar.logout();
						else{
				  			usr.profilepic = Core.getUrl()+'assets/profile/'+usr.profilepic;
				  			this.user = usr;
				  			this.$refs.navbar.key = r.key;
				  		}
			  		});
  				}
			});
	}
  },
  data(){
  	return {
  		style:style,
  		user:{
  			name: '',
  			email: '',
  			profilepic: '@/assets/default.png'
  		}
  	}
  },
  created: function(){
  	this.update();
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
