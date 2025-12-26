let cartas_tabuleiro = new Array();// é um, array numérico de 10 posições onde cada número corresponde a um personagem.
let cartas_reveladas = new Array();//este array contém os ids  das cartas que já foram reveladas, usado na função
//carta_revelada, que vai retornar true se a carta já tiver sido revelada ou false caso ainda não tenha.
let acertos = 0;
let tentativas = 7;
let pontos = 0;
let numero_personagem = 0;
let caminho1 = 0;
let caminho2 = 99;
let idcarta = "";
let numero_selecionado = 0;
let escolhidas = [];
let spins = 0;
let colecao_cartas = [];



function reiniciar() {
  //resetar todas as variáveis gerais
  spins = 0;
  acertos = 0;
  tentativas = 7;
  pontos = 0;
  numero_personagem = 0;
  idcarta = "";
  numero_selecionado = 0;
  escolhidas = [];
  colecao_cartas = [];
  //escondo todas as cartas
  esconder_imagens_cartas();
  //mostro a pontuação e as tentativas no html
  atualizar();
  //inicio o jogo
  iniciar_jogo_memoria();
}



function fonte(id) {
  let fontea = "";
  for(let i = 0; i < colecao_cartas.length; i++) {
    if(id == colecao_cartas[i].id) {
      fontea = colecao_cartas[i].fonte;
    }
  }
  return(fontea);
}




function caminho_numero(numero){
  switch(numero) {
    case numero = 0 :
      minhafonte = "<div class='DrWily'></div>";
      break;
    case numero = 1 :
      minhafonte = "<div class='cutman'></div>";
      break;
    case numero = 2 :
      minhafonte = "<div class='gutsman'></div>";
      break;
    case numero = 3 :
      minhafonte = "<div class='elecman'></div>";
      break;
    case numero = 4 :
      minhafonte = "<div class='iceman'></div>";
      break;
    case numero = 5 :
      minhafonte = "<div class='fireman'></div>";
      break;
    case numero = 6 :
      minhafonte = "<div class='bombman'></div>";
      break;
    case numero = 7 :
      minhafonte = "<div class='roll7'></div>";
      break;
    case numero = 8 :
      minhafonte = "<div class='DrLight'></div>";
      break;
    case numero = 9 :
      minhafonte = "<div class='rockman'></div>";
      break;
  }
  return(minhafonte);
}






function carta_revelada(id) { //esta função previne que o jogador escolha uma carta já revelada do tabuleiro - retorna true ou false
 if(cartas_reveladas.length >= 11) {atualizar();}
  for(let cd = 0; cd < cartas_reveladas.length; cd++) {
  if (id == cartas_reveladas[cd])
    {return true;}
  }
}

function escolher_carta(id){
  //antes de mais nada pego o número e a fonte do objeto colecao_cartas pelo id
  let fonte = "";
  let numero = 99;
  for (let i = 0; i < colecao_cartas.length; i++) {
    if(id == colecao_cartas[i].id) {
      fonte = colecao_cartas[i].fonte;
      numero = colecao_cartas[i].numero;
    }
  }
  //verifico se ainda possui tentativas e se a carta já não foi revelada
  if(tentativas > 0) {
    if(carta_revelada(id) != true){
  //verifico o vetor escolhidas, se possui duas posições.
  //se estiver vazio somente armazeno, se estiver com uma posição armazeno e verifico
  //revelo a carta, obtenho o número através do id e armazeno no vetor escolhidas
    if (escolhidas.length == 1){
      let numero1 = escolhidas[0].numero;
      let numero2 = numero;
      if (numero1 == numero2) {
        acertar(id, fonte);}
        else {
        errar(id, fonte);
       }
     }
     else if(escolhidas.length == 0){
      escolhidas.push({
        id:id,
        numero:numero
      });
      revelar_carta(id, fonte);
     } 
    }
  }

  else {atualizar();}

}

function errar(idcarta, fonte){
  let id1 = "";
  for ( let i = 0; i < escolhidas.length; i++) {
    id1 = escolhidas[i].id;
    setTimeout(function(){document.getElementById(id1).innerHTML = '<i class="fa fa-question-circle fa-5x" aria-hidden="true"></i>'},430);
  }
  escolhidas.pop();
  tentativas--;
  aparecer();
  revelar_carta(idcarta, fonte);
  document.getElementById("pontuacao").innerHTML = " " + pontos;
  document.getElementById("tentativas").innerHTML = " " + tentativas;
  setTimeout(function(){document.getElementById(idcarta).innerHTML = '<i class="fa fa-question-circle fa-5x" aria-hidden="true"></i>'},430);
  atualizar();
}

function acertar(idcarta,fonte){
  let id = "";
  cartas_reveladas.push(idcarta);
  for (let i = 0; i < escolhidas.length; i++) {
    id = escolhidas[i].id;
    cartas_reveladas.push(id);
  }
  pontos +=2;
  escolhidas.pop();
  aparecer_desaparecer();
  revelar_carta(idcarta, fonte);
  document.getElementById("pontuacao").innerHTML = " "+pontos;
  document.getElementById("tentativas").innerHTML = " "+tentativas;
  //só para mostrar todas as cartas já adivinhadas
  let id1,fonte1 = "";
  for (let i = 0; i < cartas_reveladas.length; i++) {
    id1 = cartas_reveladas[i];
    fonte1 = fonte(id1);
    document.getElementById(id1).innerHTML = fonte1;
  }
  atualizar();

}


function revelar_carta(idcarta, fonte) {
  setTimeout(function(){girar_carta(idcarta)},30);
  girar_carta(idcarta);
  document.getElementById(idcarta).innerHTML = fonte;
 
}




function gerar_tabuleiro_cartas() {
  var resultados = 6; //quantidade de pares
  var maximo = 10; //quantidade de numeros aleaórios gerados
  var num1 = [];//vetor de 12 posições com seis pares de numeros embaralhados
  var tmp1 = [];
  for (let i = 0; i < maximo; i++) {
      num1[i] = i;
  }
  //console.log(num1);
  tmp1 = shuffleArray(num1);
  //Beleza agora pego os seis primeiros
  //e coloco no vetor num1
  num1 = [];
  for ( aa = 0; aa < resultados; aa++){
      num1[aa] = tmp1[aa];
  }
  num1 = num1.concat(num1);
  num1 = shuffleArray(num1);
  //Agora tenho um vetor (num1) de 12 posições com 6 pares de números
  //return(num1);
  //Vou criar um novo vetor com os Ids das cartas do tabuleiro
  var ids = [];
  for ( i = 0; i < document.getElementsByClassName("p2").length; i++) {
    ids.push( document.getElementsByClassName("p2")[i].id);
  }
  let fontes = [];
  for ( i = 0; i < num1.length; i++) {
    fontes.push( caminho_numero(num1[i]))
  }
  //vou popular a coleção_cartas
  for (let b = 0;b < ids.length; b++) {
    colecao_cartas.push({
      id:ids[b],
      numero:num1[b],
      fonte:fontes[b]
    })
  }
 
}

function revelar_inicial(){
 
  //revela todas as cartas por um breve momento, depois elas giram e escondem
  let id, fonte = "";
  for(let i = 0; i < document.getElementsByClassName("p2").length; i++) {
    id = document.getElementsByClassName("p2")[i].id;
 
     for(let j = 0; j < colecao_cartas.length; j++) {
       if(id == colecao_cartas[j].id) {
       fonte = colecao_cartas[j].fonte;
       for(let k = 0; k < document.getElementsByClassName("p2").length; k++){
        if (id == document.getElementsByClassName("p2")[k].id ){
        document.getElementsByClassName("p2")[k].innerHTML = fonte;}
        }
     }
   }

  }
   
    setTimeout(function(){girar_cards()},250);
    setTimeout(function(){esconder_imagens_cartas()},2500);
  

}


function revelar_todas() {
  atualizar();
  spins++;
  if (spins <2) {
  if (pontos < 12 || tentativas > 0) {
  //revela todas as cartas por um breve momento, depois elas giram e escondem
  let id, fonte = "";
  for(let i = 0; i < document.getElementsByClassName("p2").length; i++) {
    id = document.getElementsByClassName("p2")[i].id;
 
     for(let j = 0; j < colecao_cartas.length; j++) {
       if(id == colecao_cartas[j].id) {
       fonte = colecao_cartas[j].fonte;
       for(let k = 0; k < document.getElementsByClassName("p2").length; k++){
        if (id == document.getElementsByClassName("p2")[k].id ){
        document.getElementsByClassName("p2")[k].innerHTML = fonte;}
        }
     }
   }

  }
   
    setTimeout(function(){girar_cards()},250);
    setTimeout(function(){esconder_imagens_cartas()},2500);
  }else{
    document.getElementById("btngirar").display = "none";
  }
}
}

function gerar_personagens_carta(){
  //gera doze numeros aleatorios de 0 ate 10
  let n1 = 0; 
  for (let ca = 0; ca <= 11 ; ca++) {
    n1 = Math.floor(Math.random() * 10);
    cartas_tabuleiro[ca] = n1;
  //para cada um destes numeros pegar o atributo src correspondete (imagem) e colocar na carta
  let nome = "";
  for (cb = 0; cb < cartas_tabuleiro.length; cb++) 
  {
    document.getElementsByClassName("p2")[cb].innerHTML = caminho_numero(cartas_tabuleiro[cb]);
  }
  //colocar a imagem (ou o numero) correspondente no atributo name de cada carta.

  setTimeout(function(){girar_cards()},150);
  //girar as cartas
  
  //voltar as cartas para o fundo padrão
  setTimeout(function(){esconder_imagens_cartas()},1500);
}
}

function esconder_imagens_cartas(){
 
  for (let cc = 0; cc < 12; cc++){
    document.getElementsByClassName('p2')[cc].innerHTML = '<i class="fa fa-question-circle fa-5x" aria-hidden="true"></i>';
    }
    
}


function girar_cards(){
  let el = "";
  for (let a = 0; a < colecao_cartas.length; a++) {
  el = colecao_cartas[a].id;
  document.getElementById(el).className += ' carta-girando-x ';
  }
  for (let d = 0; d < document.getElementsByClassName('p2').length; d++) {
    setTimeout(()=>{document.getElementsByClassName('p2')[d].className = ' carta p2 '},2000);
  }
}



function girar_carta(id) {
  document.getElementById(id).className += 'carta-girando-3d ';
  //document.getElementById(id).setAttribute('className', ' carta-girando-3d '+ document.getElementById(id).className );
  setTimeout(()=>{document.getElementById(id).className='carta p2'},2000); //os 2000 têm que ser o mesmo do css da classNamee
}

function girar_carta_180(id) {
  document.getElementById(id).className += ' carta-girando-x ';
  setTimeout(()=>{document.getElementById(id).className='carta p2'},2000);
}

function girar_todas(){
  for (let a = 0; a < 12; a++) {
  //document.getElementsByclassName('p2')[0].className += ' carta-girando-x ';
  document.getElementsByClassName('p2')[a].className += ' carta-girando-x ';
  //setTimeout(()=>{document.getElementsByclassName('carta-girando-x')[0].className ='p2'},1000);
  setTimeout(()=>{document.getElementsByClassName('carta-girando-x')[a].className ='carta p2'},2000);
  }
}


function parar_de_girar_todas(){
  for (let i = 0; i < document.getElementsByClassName('carta-girando-x').length; i++) {
    document.getElementsByClassName('carta-girando-x')[i].className = 'carta p2';
  }
}



function desaparecer(){
  $('#erro').hide();
}

function aparecer() {
  $('#erro').show();
  setTimeout(desaparecer,1900)
}

function aparecer_desaparecer() {
  $('#acerto').show();
  setTimeout(() => {
    $('#acerto').hide()
  }, 1900);
}

function atualizar(){
    
    if (pontos >= 12 || tentativas <= 0) {
      document.getElementById("reiniciar").style.display = "block";
    }

  }

  // Função para randomizar array
function shuffleArray(arr) {
  // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
  const j = Math.floor(Math.random() * (i + 1));
  // Reposicionando elemento
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}



function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}



function esperar_pagina_carregar() {
  document.addEventListener("DOMContentLoaded", function(event) {
    
    //Aqui vem o seu código fantástico
    console.log("Somente serei executado quando o navegador terminar de analisar todo o DOM");
    
  });
}

function iniciar_jogo_memoria(){
  gerar_tabuleiro_cartas();
  document.getElementById("pontuacao").innerHTML = " "+pontos;
  document.getElementById("tentativas").innerHTML = " "+tentativas;
  document.getElementById("reiniciar").style.display = "none";
  revelar_inicial();
 
 /*
  mostrar_carta_principal();
  gerar_personagens_carta();
  cartas_reveladas.push(0); //somente para iniciar o array com alguma posição
  */
}