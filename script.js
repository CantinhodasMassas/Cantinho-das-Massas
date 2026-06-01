let carrinho = [];

function adicionarAoCarrinho(item, preco) {

    carrinho = [{
        nome: item,
        preco: preco
    }];

    atualizarCarrinho();
}

function atualizarCarrinho() {

    let lista = document.getElementById("lista-carrinho");

    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach(function(item){

        lista.innerHTML += "<p>✓ " + item.nome + "</p>";

        total += item.preco;

    });

    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}
