let carrinho = [];

let molhoSelecionado = "";

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

function atualizarCarrinho() {

    let lista = document.getElementById("lista-carrinho");

    let total = 0;

    lista.innerHTML = "";

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
