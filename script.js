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
const btnFinalizar = document.getElementById("btnFinalizar");

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

    tipo: "marmita",

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

console.log(marmita);
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
if (item.tipo === "produto") {

const li = document.createElement("div");

li.innerHTML = `

<strong>${item.nome}</strong><br>

${item.descricao}<br>

💰 R$ ${item.valor.toFixed(2).replace(".", ",")}

<button onclick="removerItem(${index})">
❌
</button>

<hr>

`;

listaCarrinho.appendChild(li);

total += item.valor;

return;

}
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
console.log("Quantidade de botões encontrados:", botoesProdutos.length);
botoesProdutos.forEach((botao) => {

    botao.addEventListener("click", function () {
    console.log("Botão clicado");
        const card = botao.closest(".card");

        const nome = card.querySelector("h3").innerText;

        const descricao = card.querySelector("p")
        ? card.querySelector("p").innerText
        : "";

        let valor = 0;
        let tamanhoProduto = "";


        // Verifica se existe escolha de tamanho
        const radio = card.querySelector("input[type='radio']:checked");


        if (radio) {

            valor = Number(radio.value);

            tamanhoProduto = radio.parentElement.innerText
            .trim();

        } 
        
        else {

            // Busca qualquer preço dentro do card
            const textoCard = card.innerText;

            const encontrado = textoCard.match(/(\d+,\d{2})/);

            if (encontrado) {

                valor = Number(
                    encontrado[1]
                    .replace(",", ".")
                );

            }

        }


        const produto = {

            tipo: "produto",

            nome:
            nome +
            (tamanhoProduto
            ? " - " + tamanhoProduto
            : ""),

            descricao: descricao,

            valor: valor

        };


        carrinho.push(produto);

        atualizarCarrinho();

        alert("Produto adicionado!");

    });

});
// =======================
// FINALIZAR PEDIDO WHATSAPP
// =======================

btnFinalizar.addEventListener("click", function () {

    
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "🍝 Pedido Cantinho das Massas%0A%0A";

carrinho.forEach(item => {

    if (item.tipo === "marmita") {

        mensagem += "🍝 Monte sua Marmita - " + item.tamanho + "%0A";
        mensagem += "🍝 Massa: " + item.massa + "%0A";
        mensagem += "🍅 Molho: " + item.molho + "%0A";
        mensagem += "🥩 Proteína: " + item.proteina + "%0A";

        if (item.proteinaExtra !== "Nenhuma") {
            mensagem += "➕ Segunda proteína: " + item.proteinaExtra + "%0A";
        }

        mensagem += "🧀 Finalização: " + item.finalizacao + "%0A";
        mensagem += "🌿 Tempero: " + item.tempero + "%0A";

        if (item.observacoes) {
            mensagem += "📝 Observações: " + item.observacoes + "%0A";
        }

        mensagem += "💰 R$ " + item.valor.toFixed(2).replace(".", ",") + "%0A%0A";

    } else {

        mensagem += "• " + item.nome + "%0A";
        mensagem += item.descricao + "%0A";
        mensagem += "💰 R$ " + item.valor.toFixed(2).replace(".", ",") + "%0A%0A";

    }

});
    mensagem += "💰 Total: R$ " + totalCarrinho.innerText.replace("R$", "");

    const numeroWhatsApp = "5511978169676";

    window.open(
        "https://wa.me/" + numeroWhatsApp + "?text=" + mensagem,
        "_blank"
    );

});
alert("script carregado");
