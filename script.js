// =======================
// ELEMENTOS
// =======================

const cupomInput = document.getElementById("cupom");
const btnCupom = document.getElementById("btnCupom");
const mensagemCupom = document.getElementById("mensagemCupom");

let descontoCupom = 0;
let cupomAplicado = null;
const cupons = {
    MEMBROVIP: {
        tipo: "percentual",
        valor: 5,
        validade: null
    },

    CANTINHO10: {
        tipo: "percentual",
        valor: 10,
        validade: "2026-08-10"
    }
};
btnCupom.addEventListener("click", function () {

    const codigo = cupomInput.value.trim().toUpperCase();

    if (codigo === "") {
        mensagemCupom.innerHTML = "Digite um cupom.";
        mensagemCupom.style.color = "red";
        return;
    }

    const cupom = cupons[codigo];

    if (!cupom) {
        mensagemCupom.innerHTML = "Cupom inválido.";
        mensagemCupom.style.color = "red";
        return;
    }

    if (cupomAplicado === codigo) {
        mensagemCupom.innerHTML = "Este cupom já foi aplicado.";
        mensagemCupom.style.color = "orange";
        return;
    }

    if (cupom.validade !== null) {

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const validade = new Date(cupom.validade + "T23:59:59");

        if (hoje > validade) {
            mensagemCupom.innerHTML = "Este cupom expirou.";
            mensagemCupom.style.color = "red";
            return;
        }

    }

    descontoCupom = cupom.valor;
    cupomAplicado = codigo;

    mensagemCupom.innerHTML =
        `Cupom ${codigo} aplicado! ${cupom.valor}% de desconto.`;

    mensagemCupom.style.color = "green";

    atualizarCarrinho();

});
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
       "R$ " + (total || 0).toFixed(2).replace(".", ",");

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


// =======================
// CALCULA A TAXA DE ENTREGA
// =======================

let taxaEntrega = 0;

const bairro = document.getElementById("bairroCliente");

if (bairro.value !== "") {

    taxaEntrega = parseFloat(bairro.value.split("|")[1]);

}

// Calcula o desconto
let valorDesconto = 0;

if (descontoCupom > 0) {
    valorDesconto = total * (descontoCupom / 100);
}

const subtotalFinal = total - valorDesconto;
// Soma a entrega
const totalFinal = subtotalFinal + taxaEntrega;

// Exibe o total
totalCarrinho.innerHTML = `
Subtotal: R$ ${(total || 0).toFixed(2).replace(".", ",")}<br>
🎁 Desconto: -R$ ${(valorDesconto || 0).toFixed(2).replace(".", ",")} (${descontoCupom}%)<br>
🚚 Entrega: R$ ${(taxaEntrega || 0).toFixed(2).replace(".", ",")}<br>
<strong>Total: R$ ${(totalFinal || 0).toFixed(2).replace(".", ",")}</strong>
`;

} // <-- FECHA atualizarCarrinho AQUI


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

    // ===========================
    // DADOS DO CLIENTE
    // ===========================

    const nome = document.getElementById("nomeCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const bairroSelecionado = document.getElementById("bairroCliente").value;
    const endereco = document.getElementById("enderecoCliente").value.trim();
    const pagamento = document.getElementById("pagamentoCliente").value;

    if (!nome || !telefone || !bairroSelecionado || !endereco || !pagamento) {
        alert("Preencha todos os dados do cliente.");
        return;
    }

    const dadosBairro = bairroSelecionado.split("|");
    const bairro = dadosBairro[0];
    const taxaEntrega = parseFloat(dadosBairro[1]);

    // ===========================
    // MENSAGEM
    // ===========================

    let mensagem = "🍝 *Pedido Cantinho das Massas*%0A%0A";

    carrinho.forEach(item => {

        if (item.tipo === "marmita") {

            mensagem += "🍝 *Monte sua Marmita*%0A";
            mensagem += "Tamanho: " + item.tamanho + "%0A";
            mensagem += "Massa: " + item.massa + "%0A";
            mensagem += "Molho: " + item.molho + "%0A";
            mensagem += "Proteína: " + item.proteina + "%0A";

            if (item.proteinaExtra && item.proteinaExtra !== "Nenhuma") {
                mensagem += "Segunda proteína: " + item.proteinaExtra + "%0A";
            }

            mensagem += "Finalização: " + item.finalizacao + "%0A";

            if (item.tempero) {
                mensagem += "Tempero: " + item.tempero + "%0A";
            }

            if (item.observacoes) {
                mensagem += "Observações: " + item.observacoes + "%0A";
            }

            mensagem += "Valor: R$ " + (item.valor || 0).toFixed(2).replace(".", ",") + "%0A";

        } else {

            mensagem += item.nome + "%0A";

            if (item.descricao) {
                mensagem += item.descricao + "%0A";
            }

           mensagem += "Valor: R$ " + (item.valor || 0).toFixed(2).replace(".", ",") + "%0A";

        }

        mensagem += "━━━━━━━━━━━━━━%0A%0A";

    });

  const totalPedido = carrinho.reduce((total, item) => {
    return total + item.valor;
}, 0) + taxaEntrega;


const subtotal = carrinho.reduce((total, item) => {
    return total + item.valor;
}, 0);
console.log("Subtotal do cupom:", subtotal);
console.log("Carrinho:", carrinho);

mensagem += "👤 *DADOS DO CLIENTE*%0A";
mensagem += "Nome: " + nome + "%0A";
mensagem += "Telefone: " + telefone + "%0A";
mensagem += "Bairro: " + bairro + "%0A";
mensagem += "Endereço: " + endereco + "%0A";
mensagem += "Pagamento: " + pagamento + "%0A";
mensagem += "━━━━━━━━━━━━━━%0A";
mensagem += "💵 Subtotal: R$ " + (subtotal || 0).toFixed(2).replace(".", ",") + "%0A";
mensagem += "🚚 Taxa de entrega: R$ " + (taxaEntrega || 0).toFixed(2).replace(".", ",") + "%0A";
mensagem += "━━━━━━━━━━━━━━%0A";
mensagem += "💰 *Total do Pedido: R$ " + (totalPedido || 0).toFixed(2).replace(".", ",") + "*";

const numeroWhatsApp = "5511978169676";

window.open(
    "https://wa.me/" + numeroWhatsApp + "?text=" + mensagem,
    "_blank"
);

});

// Atualiza o total quando mudar o bairro

// =======================
// CUPOM DE DESCONTO
// =======================

function validarCupom(codigo) {

    codigo = codigo.trim().toUpperCase();

    if (!cupons[codigo]) {
        return {
            valido: false,
            mensagem: "Cupom inválido."
        };
    }

    const hoje = new Date();
    const validade = new Date(cupom.validade + "T23:59:59");

    if (hoje > validade) {
        return {
            valido: false,
            mensagem: "Cupom expirado."
        };
    }

    return {
        valido: true,
        cupom: cupom
    };

}

document.getElementById("bairroCliente").addEventListener("change", atualizarCarrinho);

alert("script carregado");

console.log("FINAL DO SCRIPT OK");
