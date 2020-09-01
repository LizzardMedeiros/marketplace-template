<template>
  <div>
    <nav-bar color="red"/>
    <div class="home">
      <div class="row container center-align" id="main">
        <div class="col l6 m12 center-align">
          <div class="row center-align">
            <img class="responsive-image show-on-small hide-on-med-and-up" src="@/assets/img/logotipo2.svg" style="min-width: 100%;"/>
            <img class="responsive-image left hide-on-med-and-down" src="@/assets/img/logotipo2.svg"/>
          </div>
          <div class="row left-align" style="padding-right:15px">
            <h3 class="red-text text-darken-3">Consiga contatos de Noivas para o seu negócio hoje. Cadastre-se e conheça NOIVAS JÁ!
            </h3>
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
                <router-link tag="a" to="/bride" class="btn-large white red-text">
                  <i class="large material-icons left">favorite_border</i>Sou noiva
                </router-link>
              </div>         
          </div>
        </div>
        <Provider-Register-Card color="red" class="col hide-on-med-and-down l6"/>
        <div class="show-on-small hide-on-med-and-up col s12">
          <Provider-Register-Card color="red" class="col s12"/>
        </div>
      </div>

        <div id="modalmore" class="modal">
          <div class="modal-content left-align">
            <p><h3>A ferramenta</h3></p>
            Estamos lançando a mais nova plataforma de Noivas à procura de orçamentos. 
            NOIVAS JÁ! entrega para você diversos clientes imediatos para o seu negócio. 

            <p><h3>Como funciona?</h3></p>
            Com poucos clicks, de forma fácil, rápida e confiável você consegue falar ou agendar reuniões com as Noivas e só paga quando elas confirmarem uma reunião ou seu contato direto.
            Feche todas as datas do ano para realizar seus eventos de casamento com facilidade e contatos diretos com as Noivas. 
            Cadastre-se agora gratuitamente para o lançamento do NOIVAS JÁ no início do segundo semestre de 2019. 
            Você só paga quando aceitar os pedidos de orçamento das Noivas. 

            <p><h3>Seja um parceiro</h3></p>
            Se indicar noivas com quem já fechou, mas que ainda buscam outros serviços ou fornecedores não cadastrados no NOIVAS JÁ!, você ganha bonificações ou até novas noivas para suas datas disponíveis para fechamento dentro da plataforma.

            <p><h3>É simples. É lucrativo. É imediato.</h3></p>
            Quando você aceita a solicitação de uma noiva, apenas você fala com ela, até concluírem seu processo de contato.
            Indique uma noiva que não está cadastrada e ganhe outra interessada em seu negócio.
            Indique um fornecedor parceiro para o nosso sistema e ganhe bônus dentro da plataforma.
            Não existe igual.
            NOIVAS JÁ! Você e mais ninguém em contato imediato com o cliente.
            Cadastre sua empresa, seus produtos e serviços pelo link abaixo e comece a receber Noivas Já!.
          </div>
          <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat">Entendi!</a>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import ProviderRegisterCard from '@/components/ProviderRegisterCard'
export default {
  name: 'Provider',
  components: {
    ProviderRegisterCard,
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
    background-image: url('~@/assets/img/bg2.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    min-height: calc(100vh - 55px);
    min-width: 100vw;
    height: auto;
    width: auto;
  }

  h1{
    font-weight: 700;
    font-size: 48px;
  }

  h3{
    font-size: 24px;
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
