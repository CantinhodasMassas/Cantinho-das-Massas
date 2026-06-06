let carrinho = [];

let molhoSelecionado = "";
let macarraoSelecionado = "";
let taxaEntrega = 0;

function adicionarAoCarrinho(item, preco) {

    carrinho = [{
        nome: item,
        preco: preco
    }];

    atualizarCarrinho();
}

function selecionarMolho(molho){

    molhoSelecionado = molho;

    atualizarCarrinho();
}

function selecionarMacarrao(macarrao){

    macarraoSelecionado = macarrao;

    atualizarCarrinho();
}

function selecionarBairro(valor){

    taxaEntrega = parseFloat(valor);

    atualizarCarrinho();
}

function atualizarCarrinho() {

    let lista = document.getElementById("lista-carrinho");

    let total = 0;

    lista.innerHTML = "";

    if(macarraoSelecionado !== ""){
        lista.innerHTML += "<p>🍝 Macarrão: " + macarraoSelecionado + "</p>";
    }

    if(molhoSelecionado !== ""){
        lista.innerHTML += "<p>🍅 Molho: " + molhoSelecionado + "</p>";
    }

    carrinho.forEach(function(item){

        lista.innerHTML += "<p>✓ " + item.nome + "</p>";

        total += item.preco;

    });

    if(taxaEntrega > 0){
        lista.innerHTML += "<p>🚚 Taxa de entrega: R$ " + taxaEntrega.toFixed(2).replace(".", ",") + "</p>";

        total += taxaEntrega;
    }

    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}
