let carrinho = [];

function adicionarAoCarrinho(item) {
    carrinho.push(item);

    alert(
        item + "\n\n" +
        "Itens no carrinho: " + carrinho.length
    );

    console.log(carrinho);
}
