let carrinho = [];

let molhoSelecionado = "";
let macarraoSelecionado = "";

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

    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}
