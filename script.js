// =======================
// ELEMENTOS
// =======================

const tamanho = document.getElementById("tamanho");
const proteinaExtra = document.getElementById("proteinaExtra");
const valorTotal = document.getElementById("valorTotal");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const btnMarmita = document.getElementById("btnMarmita");
console.log(btnMarmita);
const massa = document.getElementById("massa");
const molho = document.getElementById("molho");
const proteina = document.getElementById("proteina");
const finalizacao = document.getElementById("finalizacao");
const tempero = document.getElementById("tempero");
const observacoes = document.getElementById("observacoes");
let carrinho = [];

// =======================
// VALOR DA MARMITA
// =======================

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

tamanho.addEventListener("change", atualizarValor);
proteinaExtra.addEventListener("change", atualizarValor);

atualizarValor();
// =======================
// ADICIONAR MARMITA AO CARRINHO
// =======================

btnMarmita.addEventListener("click", function () {

    if (tamanho.value === "") {
        alert("Selecione o tamanho da marmita");
        return;
    }


    const marmita = {

        tamanho:
            tamanho.options[tamanho.selectedIndex].text,

        massa:
            massa.value,

        molho:
            molho.value,

        proteina:
            proteina.value,

        proteinaExtra:
            proteinaExtra.value,

        finalizacao:
            finalizacao.value,

        tempero:
            tempero.value,

        observacoes:
            observacoes.value,

        valor:
            tamanho.value === "500"
            ? 17.90
            : 24.90

    };


    if (proteinaExtra.value !== "Nenhuma") {
        marmita.valor += 3;
    }


    carrinho.push(marmita);
alert("Marmita adicionada!");
    atualizarCarrinho();

});
// =======================
// MOSTRAR CARRINHO
// =======================

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.valor;

        const li = document.createElement("div");

        li.innerHTML = `

        <strong>Marmita ${item.tamanho}</strong><br>

        🍝 Massa: ${item.massa}<br>

        🍅 Molho: ${item.molho}<br>

        🥩 Proteína: ${item.proteina}<br>

        ${
        item.proteinaExtra !== "Nenhuma"
        ? "➕ Segunda proteína: " + item.proteinaExtra + "<br>"
        : ""
        }

        🧀 Finalização: ${item.finalizacao}<br>

        🌿 Tempero: ${item.tempero}<br>

        ${
        item.observacoes
        ? "📝 Observação: " + item.observacoes + "<br>"
        : ""
        }

        💰 R$ ${item.valor.toFixed(2).replace(".", ",")}

        <button onclick="removerItem(${index})">
        ❌
        </button>

        <hr>

        `;

        listaCarrinho.appendChild(li);

    });


    totalCarrinho.innerHTML =
    "R$ " + total.toFixed(2).replace(".", ",");

}


// =======================
// REMOVER ITEM
// =======================

function removerItem(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}

// =======================
// ADICIONAR SUGESTÕES, NHOQUE E COMBOS
// =======================

const botoesProdutos = document.querySelectorAll(".btn-adicionar");

botoesProdutos.forEach((botao) => {

    botao.addEventListener("click", function () {

        const card = botao.closest(".card");

        const nome = card.querySelector("h3").innerText;

        const descricao = card.querySelector("p").innerText;

        let valor = 0;
        let tamanho = "";


        // verifica tamanho escolhido
        const radioSelecionado = card.querySelector("input[type='radio']:checked");


        if (radioSelecionado) {

            valor = Number(radioSelecionado.value);

            tamanho = radioSelecionado.parentElement.innerText;

            tamanho = tamanho.split(" ")[0];

        } 


        // produtos sem radio (combos)
        if (!valor) {

            const precoTexto = card.querySelector(".preco").innerText;

            valor = Number(
                precoTexto
                .replace("R$", "")
                .replace(",", ".")
            );

        }


        const produto = {

            tipo: "produto",

            nome:
            nome + 
            (tamanho ? " " + tamanho : ""),

            descricao: descricao,

            valor: valor

        };


        carrinho.push(produto);

        atualizarCarrinho();

        alert("Produto adicionado!");

    });

});
