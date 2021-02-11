var timerId = null; //variavel que armazena a chamada da função Timeout
function iniciaJogo(){
    var url = window.location.search;
    var nivel_jogo = url.replace('?' , ''); //encontrar o caractere e substituir por outra de minha preferência.
    alert(nivel_jogo);

    var tempo_segundos = 0;

    if(nivel_jogo == 1){ //1 - Fácil => 120segs
        tempo_segundos = 120;
    }

    if(nivel_jogo == 2){ //2 - Médio => 60segs
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){ //3 - Difícil => 30segs
        tempo_segundos = 30;
    }

    //Inserindo segundo no span:
    document.getElementById('cronometro').innerHTML = tempo_segundos; // innerHTML == ele incere um conteúdo dentro da tag html 

    //Quantidade de balões:
    var qtde_baloes = 80;
    cria_baloes(qtde_baloes);
    
    //Imprimir a qtde de balões inteiros:
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;
    
    contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){
    segundos = segundos - 1;
    
    if(segundos == -1){
        clearTimeout(timerId); // para a execução da função setTimeOut
        game_over();
        return false;
    }

    function game_over(){
        remove_eventos_baloes();
        alert('Fim de Jogo!, Você não conseguiu estorar todos os balões');
    }

    document.getElementById('cronometro').innerHTML = segundos;
    
    setTimeout("contagem_tempo("+segundos+")", 1000); // sempre em milisegundos


}

function cria_baloes(qtde_baloes){
    for(var i =1; i<= qtde_baloes; i++){
        var balao = document.createElement('img') // createElement == apartir dessa função conseguimos criar uma tag/elemento na página html;
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function(){estourar(this);} // this é referente ao elemento em si

        document.getElementById('cenario').appendChild(balao); // appendChild == colocas as tags dentro do elemento
    }
}
function estourar(e){
    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick", "")
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1)
}
function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros'). innerHTML = baloes_inteiros
    document.getElementById('baloes_estourados'). innerHTML = baloes_estourados
    
    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert("Parabéns! Você conseguiu estourar todos os balões a tempo");
        parar_jogo();
    }
}
function parar_jogo(){
    clearTimeout(timerId);
}
function remove_eventos_baloes(){ //Para de estourar os balões após o término do jogo, tanto se ganhou como se perdeu.
    var i = 1 // contato para  recuperar os balões por id

    //percorre  os elementos de acordo com o id e só irá sair do laço quando não houver correspondência com os elementos;

    while(document.getElementById('b' + i)){
        //retira o evento onclick do elemento
        document.getElementById('b' +i).onclick = '';
        i++; // faz a iteração da variavel i
    }
}