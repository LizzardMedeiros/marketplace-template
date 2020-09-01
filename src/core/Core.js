var url = "https://noivasja.com.br/webservice/";
var api_url = url+"api";


import axios from 'axios';
export default {
	auth : function(email, password){
		var data = {'email' : email, 'password' : password};
		return this.getdata('auth/token', data).then((res) => {
			if(res != null) localStorage.token = res;
			return (res != null);
		});
	},
	getuser : function () {
		var header = {headers:{Authorization: localStorage.token}};
		return axios.post(url+'auth/token', {}, header)
			.then((r) => {
				return r.data;
			});
	},
	getdata : function(endpoint, data, headers={}){
		var result = axios.post(url+endpoint, data, headers)
		.then((res) => {
			if(res.data.result) return res.data.result;
			else{
				res.data.errors.forEach((error) => {
					M.toast({html:error, classes:'red'});
				});
				return null;
			}			
		});
		return result;
	},
	post : function(endpoint, data, headers={}, success="Sucesso!"){
		var result = axios.post(api_url+endpoint, data, headers)
		.then((res) => {
			console.log(res);
			if(res.data.result == true){
				this.showMessage(success);
				return true;
			}
			else{
				res.data.errors.forEach((error) => {
					M.toast({html:error, classes:'red'});
				});
				return false;
			}
		});
		return result;
	},
    preloadFile: async function(e){
      let f = e.target.files || e.dataTransfer.files;
      if(!f.length) return;
      this.file = [];
      for(let i=0; i<f.length; i++){
		let reader = new FileReader();
		reader.onloadend = (e) => {
        	this.file.push(e.target.result);
      	}
      	await reader.readAsDataURL(f[i]);
      }
    },
	showMessage: function(message){
		M.toast(
			{
				html:message,
				classes:'blue lighten-2'
			}
		);
	},
	getUrl : function(){
		return url;
	},
    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + '/' + month + '/' + year;
        return time;
    },
	data(){
		return{
			file:[]
		}
	}
}