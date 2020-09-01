var url = "https://noivasja.com.br/webservice/";
var api_url = url+"api";


import axios from 'axios';

export default {
	auth : function(data){
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
			})
			.catch((err) => {
				return false;
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
    CompressAndPreloadFiles : function(f_array=[], max_w=640){
    	this.file = [];
		var process_files = (fl) => {
			var reader = new FileReader();
			reader.onload = ((e) => {
				var image = new Image();
				image.src = e.target.result;
				image.onload = (() => {
					var file = null;
					const elem = document.createElement('canvas');
					var new_width = Math.min(max_w, image.width);
					const scaleFactor = new_width / image.width;
					elem.width = new_width;
					elem.height = image.height * scaleFactor;
					const ctx = elem.getContext('2d');
					ctx.drawImage(image, 0, 0, elem.width, elem.height);
	                ctx.canvas.toBlob((blob) => {
	                    file = new File([blob], fl.name, {
	                        type: 'image/jpeg',
	                        lastModified: Date.now()
	                    });
	                    var r = new FileReader();
	                    r.onload = ((ec) => {
	                    	this.file.push(ec.target.result);
	                    });
	                    r.readAsDataURL(file);
	                }, 'image/jpeg', .7);
	                
				});
			});
			reader.readAsDataURL(fl);
	  	};
      [].forEach.call(f_array, process_files);
    },
    /*preloadFile: function(e){
      let f = e.target.files || e.dataTransfer.files;
      if(!f.length) return;
      console.log(f);
      this.file = [];
      var process_files = (fl) => {
      	    var reader = new FileReader();
      		reader.addEventListener("load", (e) => {
      			this.file.push(e.target.result);
      		}, false);
      		reader.readAsDataURL(fl);
      };
      [].forEach.call(f, process_files);
    },*/
	validateEmail : function(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
	},
	showMessage : function(message){
		M.toast(
			{
				html:'<img width="32px" src="'+require('@/assets/icon/bride00.png')+'"margin-right:8px"/><span class="left-align" style="margin-left:8px">'+message+'</span>',
				classes:'blue lighten-2',
				displayLength: Math.max((message.length/5)*1000, 4000)
			}
		);
	},
	showError : function(message){
		M.toast(
			{
				html:message,
				classes:'red lighten-2'
			}
		);
	},
	getUrl : function(){
		return url;
	},
    timeConverter : function(UNIX_timestamp){
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
			file:[],
			FB:{}
		}
	}
}