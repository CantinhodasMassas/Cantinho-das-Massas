// Elementos

const tamanho = document.getElementById("tamanho");
const proteinaExtra = document.getElementById("proteinaExtra");
const valorTotal = document.getElementById("valorTotal");

// Atualiza o valor da marmita

function atualizarValor() {

    let total = 0;

    if (tamanho.value === "500") {
        total = 17.90;
    }

    if (tamanho.value === "750") {
        total = 24.90;
    }

    if (
        tamanho.value !== "" &&
        proteinaExtra.value !== "Nenhuma"
    ) {
        total += 3;
    }

    valorTotal.innerHTML =
        "R$ " + total.toFixed(2).replace(".", ",");

}

// Eventos

tamanho.addEventListener("change", atualizarValor);
proteinaExtra.addEventListener("change", atualizarValor);

// Inicia

atualizarValor();

// =======================
// CARRINHO
// =======================

let carrinho = [];

const listaCarrinho = document.getElementById("listaCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");

const botoes = document.querySelectorAll(".btn-adicionar");

botoes.forEach((botao) => {

    botao.addEventListener("click", function () {

        const card = this.closest(".card");

        let nome = "Marmita";

        if (card) {
            nome = card.querySelector("h3").innerText;
        }

        carrinho.push({
            nome: nome,
            preco: 0
        });

        atualizarCarrinho();

    });

});

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {

        listaCarrinho.innerHTML =
            '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';

        totalCarrinho.innerHTML = "R$ 0,00";

        return;

    }

  let total = 0;

carrinho.forEach((item) => {

    total += item.preco;

    listaCarrinho.innerHTML += `

        <div class="carrinho-item">
            <span>${item.nome}</span>
            <strong>R$ ${item.preco.toFixed(2).replace(".", ",")}</strong>
        </div>

    `;

});

totalCarrinho.innerHTML =
    "R$ " + total.toFixed(2).replace(".", ",");

}

// =======================
// BOTÃO DA MARMITA
// =======================

const btnMarmita = document.getElementById("btnMarmita");

if (btnMarmita) {

   btnMarmita.addEventListener("click", function () {

    const tamanhoSelecionado = document.getElementById("tamanho").value;

    if (tamanhoSelecionado === "") {
        alert("Selecione o tamanho da marmita.");
        return;
    }

    let preco = 0;

    if (tamanhoSelecionado === "500") {
        preco = 17.90;
    }

    if (tamanhoSelecionado === "750") {
        preco = 24.90;
    }

    carrinho.push({
        nome: "Monte sua Marmita " + tamanhoSelecionado + " ml",
        preco: preco
    });

    atualizarCarrinho();

});

}
