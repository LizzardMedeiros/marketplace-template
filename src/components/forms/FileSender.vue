<template>
  <div class="row">
      <div class="input-field col s12">
          <div class="file-field input-field">
              <div class="btn btn-compact" :class="cstyle">
                  <span><i :class="icon"></i></span>
                  <input id="file" @change="processFile" :multiple="multiple" type="file" :accept="extensions">
              </div>
              <div class="file-path-wrapper">
                  <input class="file-path validate" :placeholder="title" type="text">
              </div>
              <span class="helper-text">{{helper}}</span>
          </div>
      </div>
  </div>
</template>

<script>

import Core from '@/core/Core';

export default {
  name: 'FileSender',
  props:{
    title:{type:String, default:'Escolha seus arquivos'},
    cstyle:{type:String, default:'red'},
    icon:{type:String, default:'fas fa-camera-retro'},
    helper:{type:String, default:'Anexe seus arquivos'},
    multiple:{type:Boolean, default:false},
    max_files:{type:Number, default:1},
    extensions:{type:String, default:".jpg, .png, .jpeg"}
  },
  methods:{
    erase(){
      Core.file = [];
      $('#file').val(null);      
    },
    processFile(e){
      var ext_accepted = this.extensions.replace(/ |\./g, '').split(',');
      let f = e.target.files || e.dataTransfer.files;

      if(f.length > this.max_files){
        Core.showMessage('Selecione no máximo '+this.max_files+' arquivo(s)!');
        $('#file').val(null);
        return;
      }
      for(let i=0; i<f.length; i++){
        var ext = f[i].name.split('.')[1];
        var sz = f[i].size;

        var ext_verified = false;
        ext_accepted.forEach((exta) => {
          if(exta == ext){
            ext_verified = true;
          }
        });

        if(!ext_verified){
          Core.showMessage('Arquivo tipo '+ext+' não é válido!');
          $('#file').val(null);
          return;
        }
      }
      Core.CompressAndPreloadFiles(f);
    }
  },
  data(){
    return {
    }
  }
}
</script>

<style>
</style>
