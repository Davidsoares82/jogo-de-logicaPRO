
const tabela = document.querySelector(".tabela");
const personagem = document.getElementById("personagem");
const arvore = document.querySelectorAll(".obstaculos");
const botao = document.getElementById("btn");
const interface1 = document.getElementById("interface1");
const interfaceVitoria = document.getElementById("interface-vitoria");
const interfaceDerrota = document.getElementById("interface-derrota");
const btdica = document.getElementById("dica");

let pontuacao = 50;
let quantidademascas = 0;
const pontuacaoParaVencer = 100;
const pontuacaoParaPerder = 0;

function iniciarJogo() {
    interface1.style.display = "none";
    pontuacao = 50; // Define a pontuação inicial
    atualizarJogo();
    selecionarAleatorios();
}

function selecionarAleatorios() {
    const quantidadeParaSelecionar = 10;
    const elementosArray = Array.from(arvore);
    const selecionados = [];

    while (selecionados.length < quantidadeParaSelecionar && elementosArray.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * elementosArray.length);
        const elementoSelecionado = elementosArray.splice(indiceAleatorio, 1)[0];
        selecionados.push(elementoSelecionado);
    }

    selecionados.forEach((arvore) => arvore.classList.add("masca-true"));
    elementosArray.forEach((arvore) => arvore.classList.add("masca-false"));

    btdica.addEventListener("click", () => {
        selecionados.forEach((selecionado) => {
            selecionado.classList.remove("masca-true");
            void selecionado.offsetWidth; // Força o navegador a "recalcular" o elemento
            selecionado.classList.add("masca-true");
            btdica.style.display = 'none';
        });
    });
}

function atualizarJogo() {
    if (pontuacao >= pontuacaoParaVencer) {
        mostrarInterface("vitoria");
    } else if (pontuacao <= pontuacaoParaPerder) {
        mostrarInterface("derrota");
    } else if (pontuacao <= 60 && quantidademascas >= 6) {
        mostrarInterface("derrota");
    }
}

function collision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function Colisaomascaf() {
    let rectPersonagem = personagem.getBoundingClientRect();
    const mascafalsa = document.querySelectorAll('.masca-false');
    mascafalsa.forEach((todasArvores) => {
        let rectArvore = todasArvores.getBoundingClientRect();
        if (collision(rectPersonagem, rectArvore)) {
            todasArvores.style.display = "none";
            pontuacao -= 50;
        }
        atualizarJogo();
    });
    document.getElementById("pontuacao").innerText = `score: ${pontuacao}`;
}
Colisaomascaf();

function Colisaomascav() {
    let rectPersonagem = personagem.getBoundingClientRect();
    const mascatrue = document.querySelectorAll('.masca-true');
    mascatrue.forEach((todasArvores) => {
        let rectArvore = todasArvores.getBoundingClientRect();
        if (collision(rectPersonagem, rectArvore)) {
            todasArvores.style.display = "none";
            pontuacao += 10;
            quantidademascas++;
        }
        atualizarJogo();
    });
    document.getElementById("quant-masca").innerText = `10/${quantidademascas}`;
    document.getElementById("pontuacao").innerText = `: ${pontuacao}`;
}
Colisaomascav();

function reiniciarJogo() {
    document.getElementById("pontuacao").textContent = pontuacao;
    personagem.style.top = "0px";
    personagem.style.left = "0px";
}

function movBaixo() {
    let posicao = personagem.offsetTop;
    if (posicao <= 700) {
        personagem.style.top = (posicao + 100) + "px";
    }
}

function movTopo() {
    let posicao = personagem.offsetTop;
    if (posicao >= 100) {
        personagem.style.top = (posicao - 100) + "px";
    }
}

function movEsquerda() {
    let posicao = personagem.offsetLeft;
    if (posicao >= 100) {
        personagem.style.left = (posicao - 100) + "px";
    }
}

function movDireita() {
    let posicao = personagem.offsetLeft;
    if (posicao <= 700) {
        personagem.style.left = (posicao + 100) + "px";
    }
}

function mostrarInterface(tipo) {
    if (tipo === "vitoria") {
        interfaceVitoria.style.display = "flex";
    } else if (tipo === "derrota") {
        interfaceDerrota.style.display = "flex";
    }
}

function recarregar() {
    window.location.reload();
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            movTopo(); Colisaomascaf(); Colisaomascav();
            break;
        case "ArrowDown":
            movBaixo(); Colisaomascaf(); Colisaomascav();
            break;
        case "ArrowLeft":
            movEsquerda(); Colisaomascaf(); Colisaomascav();
            break;
        case "ArrowRight":
            movDireita(); Colisaomascaf(); Colisaomascav();
            break;
    }
});
