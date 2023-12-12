const prompt = require('prompt-sync')();

class GameController {

  #nome;
  #pontuacao = 0;
  #pontuacaoTotal = 0;

  constructor(nome) {
    this.#nome = nome;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
      this.#nome = novoNome;
  }

  get pontuacao() {
      return this.#pontuacao;
  }

  set pontuacao(novaPontuacao) {
    this.#pontuacao = novaPontuacao;
  }

  get pontuacaoTotal() {
    return this.#pontuacaoTotal;
  }

  set pontuacaoTotal(novaPontuacao) {
    this.#pontuacaoTotal = novaPontuacao;
  }


}



class Player extends GameController{ 

  constructor() {
    super();
  }

  iniciarPartida() {
    if (!gamesController.nome) {
      matchs.selecionarPalavra();
      gamesController.nome = prompt("- Digite o seu nome: ");
    } else {
      console.log('> Você já preencheu o seu nome!');
    }
  }


  iniciarNovaPartida() {
    matchs.selecionarPalavra();
    gamesController.pontuacaoDaPartida = 0;
    matchLetras.tentativasLetras = 5;
    matchPalavras.tentativasPalavras = 3;
    matchs.pontuacaoAdicionada = false;
  }

  
  exibirMenu() {
    console.log(`
      ----------------|
      |  
      |
      |          Jogo da Forca 
      |              ____
      |              |  |            
      -----------------------------------
      1 - Iniciar uma partida.
      2 - Tentar adivinhar uma letra.
      3 - Tentar adivinhar uma palavra.
      4 - Exibir pontuação.
      5 - Iniciar uma nova partida.
      0 - Sair.
      -----------------------------------
      `);
   }
  
  
  exibirMensagemFinal() {
    console.log(`> Programa finalizado.`);
  }
    
    
}



class Match extends Player{

  constructor() {
    super();

    this.palavras = ["morango", "banana", "laranja", "uva", "melancia"];
    this.dicas = ["fruta", "fruta", "fruta", "fruta", "fruta"];
    this.palavraAtual = "";
    this.letrasAdivinhadas = [];
    this.posicaoLetraAdivinhada = [];
    this.pontuacaoAdicionada = false;
  }


  selecionarPalavra() {
    const randomIndex = Math.floor(Math.random() * this.palavras.length);
    this.palavraAtual = this.palavras[randomIndex];
    this.letrasAdivinhadas = [];
    this.posicaoLetraAdivinhada = [];
  }


}    



class MatchLetras extends Match {

  #maxTentativasLetras

  constructor() {
    super();

    this.#maxTentativasLetras = 5;
    this.tentativasLetras = this.#maxTentativasLetras;
  }


  adivinharLetra() {
    return this.tentativasLetras > 0;
  }
    

  reduzirTentativasLetras() {
    this.tentativasLetras--;
  }
    
    
  tentarAdivinharLetra() {
    let digiteUmaLetra = "";
      if (this.adivinharLetra()) {
       digiteUmaLetra = prompt("- Digite uma letra: ");
       this.verificarLetra(matchs.palavraAtual, digiteUmaLetra);
    }
  }
    
    
  verificarLetra(palavraAtual, digiteUmaLetra) {
    let contador = 0;
    for (let i = 0; i < palavraAtual.length; i++) {
      if ((digiteUmaLetra === palavraAtual[i]) && !(matchs.posicaoLetraAdivinhada.includes(i))) {
         matchs.letrasAdivinhadas.push(digiteUmaLetra);
         matchs.posicaoLetraAdivinhada.push(i);
         contador ++
      }
    }

    if (contador == 0) {
       this.reduzirTentativasLetras();
       if (this.tentativasLetras === 0) {
          console.log(`> Que pena... Acho que você perdeu a cabeça!`);
          console.log(`> A palaravra era: ${matchs.palavraAtual}!`);
          console.log(`> Você ganhou 0 pontos.`);
          console.log(`> Digite 5 para iniciar uma nova partida!`);
      } else {
          console.log(`> Deu ruim! Você ainda tem: ${this.tentativasLetras} chances!`);
          contador = 0;
      }
    }
    
    contador = 0;

  }


  verificarTodasAsLetras() {
    this.palavraEscondida = "-".repeat(matchs.palavraAtual.length);

    for (let i = 0; i < matchs.posicaoLetraAdivinhada.length; i++) {
      let posicao = matchs.posicaoLetraAdivinhada[i];
    
      if (posicao >= 0 && posicao < matchs.palavraAtual.length && i < matchs.letrasAdivinhadas.length) {
        this.palavraEscondida = this.palavraEscondida.substring(0, posicao) + matchs.letrasAdivinhadas[i] + this.palavraEscondida.substring(posicao + 1);
      }
    }

    if (this.palavraEscondida === matchs.palavraAtual) {
       console.log(`> Parabéns ${gamesController.nome}... Acertou! ${matchs.palavraAtual}.`);

      if (matchs.pontuacaoAdicionada === false) {
         gamesController.pontuacao = 100;
         gamesController.pontuacaoTotal += gamesController.pontuacao;
         console.log(`> Você ganhou ${gamesController.pontuacao} pontos.`);
         matchs.pontuacaoAdicionada = true;
         console.log(`> Digite 5 para iniciar uma nova partida!`);
         matchLetras.tentativasLetras = 0;
      }

    }
  
    console.log(`Letras adivinhadas: ${this.palavraEscondida}`);
  }


}



class MatchPalavras extends Match {

  #maxTentativasPalavras

  constructor() {
    super();

    this.#maxTentativasPalavras = 3;
    this.tentativasPalavras = this.#maxTentativasPalavras;
  }

  adivinharPalavra() {
    return this.tentativasPalavras > 0;
  }


  reduzirTentativasPalavras() {
    this.tentativasPalavras--;
  }


  tentarAdivinharPalavra() {
    let digiteUmaPalavra = "";
    
    if (this.adivinharPalavra()) {
       digiteUmaPalavra = prompt("Digite uma palavra: ");
       console.log(``);
       this.verificarPalavra(digiteUmaPalavra);
    }
  }


  verificarPalavra(digiteUmaPalavra){
    if (digiteUmaPalavra === matchs.palavraAtual) {
       console.log(`> Parabéns ${gamesController.nome}... Acertou! ${matchs.palavraAtual}.`);
       gamesController.pontuacao = 200
       gamesController.pontuacaoTotal += gamesController.pontuacao
       console.log(`> Você ganhou ${gamesController.pontuacao} pontos.`);
       console.log(`> Digite 5 para iniciar uma nova partida!`);
       matchPalavras.tentativasPalavras = 0;
     } else {
       this.reduzirTentativasPalavras();
       if (this.tentativasPalavras === 0) {
          console.log(`> Que pena... Acho que você perdeu a cabeça!`);
          console.log(`> A palaravra era: ${matchs.palavraAtual}!`);
          console.log(`> Você ganhou 0 pontos.`);
          console.log(`> Digite 5 para iniciar uma nova partida!`);
        } else {
          console.log(`> Deu ruim! Você ainda tem: ${this.tentativasPalavras} chances!`)
        }
     }
   }

}



const gamesController = new GameController();
const jogo = new Player();
const matchs = new Match();
const matchLetras = new MatchLetras();
const matchPalavras = new MatchPalavras();



do {
  
  if (gamesController.nome) {
      console.log(``);
      console.log(`Jogador: ${gamesController.nome}`)
      console.log(`Dica: ${matchs.dicas[matchs.palavras.indexOf(matchs.palavraAtual)]}`);
  
      matchLetras.verificarTodasAsLetras();
      
    } else {
      console.log(`  -----------------------------------`);
      console.log(`  | Seja bem vindo ao Jogo da Forca.`);
    }
    
    jogo.exibirMenu();
  
    opcaoMenu = parseInt(prompt("Digite o número da opção desejada: "));

  switch (opcaoMenu) {
    case 1:
      jogo.iniciarPartida();
      break;

    case 2:
      matchLetras.tentarAdivinharLetra();
      break;
    
    case 3:
      matchPalavras.tentarAdivinharPalavra();
      break;

    case 4:
      console.log(`Total de pontos: ${gamesController.pontuacaoTotal}`);
      break;
      
    case 5:
      jogo.iniciarNovaPartida()
      break;
      
    case 0:
      jogo.exibirMensagemFinal();
      break;  

    default:
      console.log(`> Opção incorreta! Selecione outra.`);
      break;
  }

} while (opcaoMenu != 0);