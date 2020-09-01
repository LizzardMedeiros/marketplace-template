<template>
  <div>
    <nav-bar color="red"/>
    <div class="home">
      <div class="row container center-align" id="main">

        <div class="col l6 m12">
          <div class="row center-align">
            <img class="responsive-image show-on-small hide-on-med-and-up" src="@/assets/img/logotipo2.svg" style="min-width: 100%;"/>
            <img class="responsive-image left hide-on-med-and-down" src="@/assets/img/logotipo2.svg"/>
          </div>
          <div class="row left-align" style="padding-right:15px">
            <h3 class="red-text text-darken-3">Orçamentos Rápidos e Descomplicados para seu casamento. Cadastre-se e conheça NOIVAS JÁ</h3>
          </div>
          <div class="row hide-on-med-and-up">
              <div class="col s12">              
                <a class="btn-large modal-trigger red white-text" data-target="modalmore">
                  <i class="large material-icons left">help_outline</i>Saiba Mais
                </a>
              </div>         
          </div>
          <div class="row hide-on-med-and-down">
              <div class="col s12 left-align">              
                <a class="btn-large modal-trigger red white-text" data-target="modalmore">
                  <i class="large material-icons left">help_outline</i>Saiba Mais
                </a>        
                <router-link tag="a" to="/provider" class="btn-large white red-text">
                  <i class="large material-icons left">business_center</i>Sou fornecedor
                </router-link>
              </div>         
          </div>
        </div>
        <bride-register-card class="col hide-on-med-and-down l6" color="red"/>
        <div class="show-on-small hide-on-med-and-up col s12">
          <bride-register-card class="col s12" color="red"/>
        </div>
      </div>

        <div id="modalmore" class="modal">
          <div class="modal-content left-align">
            <h3>
              <p>Orçamentos Rápidos e Descomplicados para seu casamento.</p>
            </h3>

            Estamos lançando a mais nova plataforma de orçamentos e cotações para casamento. 

            Todos os fornecedores que você precisa para realizar seu evento. 

            Totalmente grátis, fácil e rápido. 

            <h5><p>Como funciona?</p></h5>
            Você navega e escolhe o fornecedor pelo preço, qualidade e qualificações da internet. 
            Nenhum outro fornecedor terá o seu contato. 
            Agende a melhor data e horário para tirar suas dúvidas ou se reunir apenas com os fornecedores que selecionou.
            Cadastre-se agora gratuitamente e tenha acesso ao banco de dados com produtos, serviços e promoções para casamento já no início do segundo semestre de 2019.  

            <h5><p>Seja Noiva parceira</p></h5>
            Indicando outra noiva para o nosso sistema NOIVAS JÁ!, você ganha bonificações, brindes ou até mesmo pacotes inteiros de produtos e serviços para o seu casamento. Indicou, ganhou!

            NOIVAS JÁ! Seu casamento com excelentes preços, condições e sem complicação.  
            Cadastre seu evento e sua data pelo link abaixo e participe de nossos Quiz de Noivas.
          </div>
          <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat">Entendi!</a>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import BrideRegisterCard from '@/components/BrideRegisterCard'
import NavBar from '@/components/NavBar';
export default {
  name: 'Home',
  components: {
    BrideRegisterCard,
    NavBar
  },
  mounted: function(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #main{
    background-color: transparent;
    min-height: 100vh;
    padding-top: 50px;
    margin-bottom: 0;
  }

  .home{
    min-height: calc(100vw + 55px);
    min-width: 100vw;
    height: auto;
    width: auto;
    background-image: url('~@/assets/img/background.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 0;
  }

  h1{
    font-weight: 700;
    font-size: 48px;
  }

  h3{
    font-size: 24px;
  }

  h5{
    font-size: 18px;
  }

  .responsive-image{
    max-width: 256px;
  }

  @media (min-width: 992px) {
    h1{
      font-weight: 700;
      font-size: 84px;
    }
    .responsive-image{
      max-width: 80%;
    }
    .home{
      min-height: calc(100vh - 80px);
    }

  }
</style>
