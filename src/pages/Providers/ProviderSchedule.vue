<template>
	<span>
		<vue-loader ref="loader"/>
		<layout-provider>
			<div slot="content" id="select" class="row" style="margin-bottom: 16px;">
				<div class="row">
					<div class="col s12" style="margin:32px 0">
						<img src="@/assets/purple-task.png" style="height:38px;">
					</div>
				</div>
				<div class="card row" style="margin: 16px auto">
					<div class="col s12">
						<div class="input-field">
							<div class="col s12 tag">
								<h5>Dias e Horários de Funcionamento:</h5>
							</div>
						</div>
							<div class="col s12 center-align">
								<label v-for="(day, index) in weekdays" :key="index" style="padding-right:5px">
									<input @change="updateWeekday(index)" type="checkbox" class="filled-in weekday" :checked="events.weekdays[index]"/>
									<span style="padding-left:21px">{{day}}</span>
								</label>
							</div>
						<div class="input-field">
							<div class="col s12 center-align" style="margin: 16px auto">
								<div class="row valign-wrapper">
									<div class="col s5 center-align">
										<label>Abertura</label>
										<input id="from" placeholder="Abertura" type="text" class="timepicker" readonly :value="events.from"/>
									</div>
									<div class="col s2 center-align">
										<h5>-</h5>
									</div>
									<div class="col s5">
										<label>Fechamento</label>
										<input id="at" readonly placeholder="Fechamento" type="text" class="timepicker" :value="events.at"/>
									</div>
								</div>
							</div>
						</div>

						<div class="col s12 right-align" style="margin-bottom: 18px;">
							<button @click="registerDate" class="btn btn-small waves-effect purple darken-3">
								<i class="fas fa-save left"></i>Salvar
							</button>
						</div>

					</div>
				</div>

				<div class="card row">
					<div class="col s12">
						<div class="input-field">
							<div class="col s12 tag">
								<h5>Meus Compromissos:</h5>
							</div>							
							<div class="col s12 right-align">
								<input placeholder="ex. Casamento Barreiro" type="text" id="date-title" maxlength="16"/>
							</div>
							<div class="col s12 right-align">
								<textarea class="materialize-textarea" placeholder="Descreva o evento" type="text" id="date-desc"/></textarea>
							</div>							
							<div class="col s12 right-align">
								<input readonly placeholder="Escolha a data" type="text" id="date" class="datepicker"/>
							</div>
							<div class="col s12 right-align">
								<input readonly placeholder="Escolha a hora" type="text" id="time" class="timepicker"/>
							</div>
					    </div>
					</div>

					<div v-if="events.tasks.length > 0" class="col s12 center-align" style="margin-bottom: 18px;">
						<vue-event-calendar :events="events.tasks">
					      <template scope="props">
					        <div v-for="(event, index) in props.showEvents" class="event-item">
					        	<vue-collapsible>
					        		<span slot="header" class="center-align">
					        			{{event.title}} - {{event.date}}
					        		</span>
					        		<div slot="body" class="row">
					        			<div class="col s12 left-align container">
					        				<label>{{event.content.hour}}h</label>
					        				<p>{{event.content.data}}</p>
					        			</div>
					        			<div class="col s12 right-align">
						        			<hr/>
						        			<a @click="removeEvent(index)" class="btn-flat red-text"><i class="far fa-trash-alt"></i></a>
						        		</div>
					        		</div>
					        	</vue-collapsible>
					        </div>
					      </template>
						</vue-event-calendar>
					</div>

					<div class="col s12 right-align" style="margin-bottom: 18px;">
						<a @click="registerDate" class="btn btn-small waves-effect purple darken-3">
							<i class="fas fa-save left"></i>Salvar
						</a>
					</div>
				</div>
			</div> 
			<div slot="footer">
				<footer-provider/>
			</div>
		</layout-provider>
		<vue-modal title="Agenda" unique="calendar"></vue-modal>
	</span>
</template>

<script>

//Layout
import LayoutProvider from "@/layouts/LayoutProvider"
import FooterProvider from "@/components/footers/providers/FooterProvider"
import VueLoader from "@/components/gadgets/VueLoader"

//Components
import VueCollapsible from "@/components/gadgets/VueCollapsible"
import VueModal from "@/components/modals/VueModal"
import config from "@/json/config.json"
import Core from "@/core/Core"

export default {
	name: 'ProviderSchedule',
	components:{VueCollapsible, LayoutProvider, FooterProvider, VueLoader, VueModal},
	methods:{
		removeEvent(i){
			this.events.tasks.splice(i, 1);
		},
		registerDate(){
			if(parseFloat($("#from").val()) >= parseFloat($("#at").val())){
				M.toast({html: 'O horário de abertura está maior que o de fechamento!', classes:'red'});
				return;
			} 
			if($("#date-title").val() != "")
			{
				var dt = $("#date").val().split('/');
				var ev = $("#date-title").val();
				dt = dt[2]+'/'+dt[1]+'/'+dt[0];
				var content = {
					hour: $("#time").val(),
					data: $("#date-desc").val()
				};
				this.events.tasks.push({date: dt, title: ev, content: content});
			}
			this.save();
		},
		updateWeekday(index){
			this.events.weekdays[index] = !this.events.weekdays[index];
		},
		save(){
			this.$refs.loader.start();
			var data = this.events;
			data.key = this.usr_key;
			data.action = "put";
			data.from = $("#from").val();
			data.at = $("#at").val();
			Core.post("/provider/schedule", data, {}, 'Agenda atualizada com sucesso!')
			.then((r) => {
				if(r){
					$("#date-title").val("");
					$("#date-desc").val("");
					$("#date").val("");
					$("#time").val("");
					this.$refs.loader.stop();
				}
			});
		},
		update(){
			this.$refs.loader.start();
			var data = {key: this.usr_key, action:"get"};
			Core.getdata("/api/provider/schedule", data)
			.then((r) => {
				if(r.data){
					this.events = r.data;
					$('.collapsible').collapsible();
				}
				this.$refs.loader.stop();
			});			
		}
	},
	data () {
	return {
		usr_key: "",
		weekdays:['D','S','T','Q','Q','S','S'],
		events:{
			weekdays:[0,0,0,0,0,0,0],
			from: "",
			at: "",
			tasks:[]
		}
	}
	},
	created: function(){
		Core.getuser().then((r) => {
			if(!r) this.$router.push("/");
			else{
				this.usr_key = r.key;
				this.update();
			}
		})
	},
	mounted: function(){
		$('.modal').modal();
		var date = document.querySelector('#date');
		config.schedule.options.minDate = new Date();
		var instances = M.Datepicker.init(date, config.schedule.options);
		var time = document.querySelectorAll('.timepicker');
		var instances = M.Timepicker.init(time, config.time.options);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#layout-provider h5{
		color: #a532ed;
		font-size: 1.3em;		
	}
	#layout-provider h4{
		color: #a532ed;
		font-size: 1.75em;
	}
	#layout-provider .tag{
		margin-top: 5px;
	}
</style>
