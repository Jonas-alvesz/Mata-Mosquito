let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;
let criarMoscaTempo = 1500;

let nivel = window.location.search.replace('?', '');

if (nivel === 'normal') {
    criarMoscaTempo = 1500;
} else if (nivel === 'dificil') {
    criarMoscaTempo = 1000;
} else if (nivel === 'MuitoDificil') {
    criarMoscaTempo = 500;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();
window.onresize = ajustaTamanhoPalcoJogo;

var cronometro = setInterval(function () {
    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criarMosca);
        window.location.href = 'Vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
    tempo -= 1;
}, 1000);

function posicaoRandom() {
    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove();

        if (vidas > 3) {
            window.location.href = 'Fim_de_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = './Assets/Imagens/coracao_vazio.png';
            vidas++;
        }
    }

    let posicaoX = Math.round(Math.random() * largura) - 90;
    let posicaoY = Math.round(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    let mosquito = document.createElement('img');
    mosquito.src = './Assets/Imagens/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosca';
    mosquito.onclick = function () {
        this.remove();
    };

    document.body.appendChild(mosquito);
}

function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

let criarMosca = setInterval(function () {
    posicaoRandom();
}, criarMoscaTempo);
