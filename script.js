// =======================
// ELEMENTOS
// =======================

const tamanho = document.getElementById("tamanho");
const proteinaExtra = document.getElementById("proteinaExtra");
const valorTotal = document.getElementById("valorTotal");

const listaCarrinho = document.getElementById("listaCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const btnMarmita = document.getElementById("btnMarmita");
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

        valor:
            tamanho.value === "500"
                ? 17.90
                : 24.90,

        proteinaExtra:
            proteinaExtra.value

    };


    if (proteinaExtra.value !== "Nenhuma") {
        marmita.valor += 3;
    }


    carrinho.push(marmita);

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


        const li = document.createElement("li");


        li.innerHTML = `
        Marmita ${item.tamanho}
        ${item.proteinaExtra !== "Nenhuma" 
        ? " + Proteína extra" 
        : ""}
        - R$ ${item.valor.toFixed(2).replace(".", ",")}

        <button onclick="removerItem(${index})">
        X
        </button>
        `;


        listaCarrinho.appendChild(li);

    });


    totalCarrinho.innerHTML =
        "Total: R$ " +
        total.toFixed(2).replace(".", ",");

}


// =======================
// REMOVER ITEM
// =======================

function removerItem(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}
