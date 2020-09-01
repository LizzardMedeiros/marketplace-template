<template>
  <span>
    <vue-loader ref="loader"/>
  	<layout-default>
  		<div slot="content" class="row">
  			<div class="col s12" style="margin-top:15%">
  				<div class="row">
  					<img src="@/assets/red-marriage.png" style="max-height:40px;"/>
  				</div>
  				<div class="row">
  					<div class="input-field col s12">
  						<input id="date" readonly type="text" class="datepicker" :class="style.color.text">
  						<label for="date" class="active" :class="style.color.label">Data do Casamento</label>
  					</div>
  					<div class="input-field col s12">
  						<input id="hour" readonly type="text" class="timepicker" :class="style.color.text">
  						<label for="hour" class="active" :class="style.color.label">Hora do Casamento</label>
  					</div>
  					<div class="input-field col s12">
  						<input id="place" placeholder="Ex. Igreja Lourdes" type="text" class="validate" :class="style.color.text" v-model="marriage.place">
  						<label for="place" class="active" :class="style.color.label">Local</label>
  					</div>

  					<div class="input-field col s12">
  						<select v-model="marriage.guests" id="guests" :class="style.color.text">
  							<option disabled>Escolha...</option>
  							<option :class="style.color.text" v-for="(guest, index) in guests" :key="index" :value="guest.val" :selected="guest.val == marriage.guests">
                  <span class="input-text">{{guest.desc}}</span>
                </option>
  						</select>
              <label for="guests" :class="style.color.label">Convidados</label>
  					</div>
            
  				</div>
  				<div class="row">
  					<div class="input-field col s12">
              <router-link tag="a" to="/bride" class="btn white black-text"><i class="fas fa-angle-double-left left"></i>Voltar</router-link>
  						<a @click="save" class="waves-effect waves-light btn red right"><i class="far fa-save left"></i>Salvar</a>
  					</div>					
  				</div>
  			</div>
  		</div> 
  		<div slot="footer">
  			<footer-default/>
  		</div> 		
  	</layout-default>
  </span>
</template>

<script>

import {style} from "@/json/config.json"
import LayoutDefault from "@/layouts/LayoutDefault"
import FooterDefault from "@/components/footers/FooterDefault"
import VueLoader from "@/components/gadgets/VueLoader"

import Core from "@/core/Core"
import {schedule} from "@/json/config.json"
import {time} from "@/json/config.json"

export default {
  name: 'BrideMarriage',
  components:{LayoutDefault, FooterDefault, VueLoader},
  methods:{
  	save(){
      this.$refs.loader.start();
  		var dt = $("#date").val().split('/');
  		this.marriage.date = dt[2]+'-'+dt[1]+'-'+dt[0];
  		this.marriage.hour = $("#hour").val();
  		this.marriage.key = this.user.key;
  		Core.post('/bride/registermarriage', this.marriage, {}, "Seu casamento foi alterado com sucesso!")
      .then((r) => {
        this.$refs.loader.stop();
        if(r){
          Core.showMessage('Pronto! Agora você pode escolher seus fornecedores!');
          this.$router.push("/bride/orders");
        }
      });
  	},
    update(){
      this.$refs.loader.start();
      Core.getdata('api/bride/getmarriage', {key:this.user.key})
      .then((res) => {
        if(res){
          var dt = res.date.split('-');
          res.date = dt[2]+'/'+dt[1]+'/'+dt[0];
          this.marriage = res;
          $("#hour").val(res.hour);
          $("#date").val(res.date);
        }
      })
      .then(() =>{
        $('select').formSelect();
        M.updateTextFields();
        this.$refs.loader.stop();
      });          
    }
  },
  data () {
    return {
      style:style,
      key:"",
    	user:{},
    	guests:[
    		{val:50, desc:'Até 50'},
    		{val:100, desc:'De 51 a 100'},
    		{val:150, desc:'De 101 a 150'},
    		{val:200, desc:'De 151 a 200'},
    		{val:201, desc:'Acima de 200'}
    	],
    	marriage:{
    		guests:0,
    		date:'',
    		hour:'',
    		place:''
    	}
    }
  },
  created : function(){
    Core.getuser().then((r) => {
      if(!r) this.$router.push("/");
      else{
        this.user = r;
        this.update();
      }
    });
  },
  mounted: function(){
  	var dates = document.querySelectorAll('.datepicker');
    schedule.options.minDate = new Date();
  	M.Datepicker.init(dates, schedule.options);
  	var hours = document.querySelectorAll('.timepicker');
  	M.Timepicker.init(hours, time.options);
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
