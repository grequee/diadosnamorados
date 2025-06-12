// Música só toca quando clica no botão de revelar
const audio = document.getElementById('musica');
const botaoRevelar = document.getElementById('botao-revelar');
const mensagemInicial = document.getElementById('mensagem-inicial');
const mensagemFinal = document.getElementById('mensagem-final');

// Mensagens em páginas
const mensagens = [
  "Meu amor, você é a melhor parte do meu dia. ❤️",
  "Desde que te conheci, tudo tem mais cor, mais sentido, mais luz.",
  "Seu abraço é meu lugar favorito. 🌟",
  "Amo cada detalhe seu — até os que você tenta esconder.",
  "Eu amo não só seu abraço, mas também seu sorriso, seus olhos, cabelos e tudo em ti!",
  "Com você, até o silêncio é confortável. 💌",
  "Lembra do nosso primeiro encontro? todo aquele nervosismo... toda aquela insegurança no CLÃ e eu leve mente alterado da bebida kkkk",
  "Tudo isso era só o começo da nossa historia Dai. Ainda tinha muito por vir...",
  "Eu te amo tanto e tento sempre ao maximo te tirar sorrisos. Mesmo que eu seja meio doido as vezes mas não tem problema porque tu é que nem eu e isso que nos faz tão especial juntos!",
  "Hoje, no Dia dos Namorados, só quero dizer: Eu te amo muito, e sou eternamente grato de ter ao meu lado Daielen 💖"
];

let paginaAtual = 0;

function mostrarPagina() {
  const textoElemento = document.getElementById('texto-mensagem');
  const contador = document.getElementById('contador-pagina');

  const mensagem = mensagens[paginaAtual];
  let index = 0;
  textoElemento.textContent = "";

  clearInterval(textoElemento.intervalo);

  textoElemento.intervalo = setInterval(() => {
    if (index < mensagem.length) {
      textoElemento.textContent += mensagem.charAt(index);
      index++;
    } else {
      clearInterval(textoElemento.intervalo);
    }
  }, 40);

  contador.textContent = `Página ${paginaAtual + 1} de ${mensagens.length}`;
  document.getElementById('anterior').disabled = (paginaAtual === 0);
}

// Corações caindo
function criarCoracao() {
  const coracao = document.createElement('div');
  coracao.classList.add('coracao');

  const tipos = ['❤️', '💖', '💕', '💗'];
  coracao.textContent = tipos[Math.floor(Math.random() * tipos.length)];

  coracao.style.left = Math.random() * 100 + 'vw';
  coracao.style.fontSize = (Math.random() * 20 + 16) + 'px';
  coracao.style.animationDuration = (Math.random() * 3 + 4) + 's';

  document.getElementById('coracoes-container').appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 8000);
}

// Começa a animação de corações ao carregar
window.addEventListener('load', () => {
  setInterval(criarCoracao, 300);
  atualizarContadorAmor();
});

// Botão revela mensagem + música
botaoRevelar.addEventListener('click', () => {
  mensagemInicial.style.display = 'none';
  mensagemFinal.style.display = 'block';
  mostrarPagina();
  audio.play().catch(() => {});
});

// Navegação entre páginas
document.getElementById('proximo').addEventListener('click', () => {
  if (paginaAtual < mensagens.length - 1) {
    paginaAtual++;
    mostrarPagina();
  } else {
    mensagemFinal.style.display = 'none';
    document.getElementById('final-com-desnho').style.display = 'flex';
    mostrarFinalComFogos();
  }
});

document.getElementById('anterior').addEventListener('click', () => {
  if (paginaAtual > 0) {
    paginaAtual--;
    mostrarPagina();
  }
});

// Mostrar contagem de dias, horas, minutos, segundos
function atualizarContadorAmor() {
  const inicio = new Date("2025-04-17T00:00:00");
  const agora = new Date();

  let diffMs = agora - inicio;
  if (diffMs < 0) diffMs = 0;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diffMs % (1000 * 60)) / 1000);

  const elemento = document.getElementById('dias-juntos');
  elemento.textContent = `Estamos juntos há ${dias} dia${dias !== 1 ? 's' : ''}, ${horas}h ${minutos}m ${segundos}s 💞`;
}

setInterval(atualizarContadorAmor, 1000);

// Pétalas de flor caindo
function criarPetala() {
  const petala = document.createElement("div");
  petala.classList.add("petala");
  petala.textContent = "🌸";

  petala.style.left = Math.random() * 100 + "vw";
  petala.style.animationDuration = 4 + Math.random() * 3 + "s";
  petala.style.fontSize = (16 + Math.random() * 10) + "px";
  petala.style.opacity = 0.7 + Math.random() * 0.3;

  document.getElementById("petalas-container").appendChild(petala);

  setTimeout(() => {
    petala.remove();
  }, 7000);
}
setInterval(criarPetala, 500);

// Mostrar o final e iniciar fogos
function mostrarFinalComFogos() {
  atualizarContadorAmor();
  dispararFogos();
}

// Fogos de artifício (confetti)
function dispararFogos() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    }));
  }, 250);
}
