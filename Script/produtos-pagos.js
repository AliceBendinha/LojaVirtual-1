document.addEventListener("DOMContentLoaded", function() {
    const listaPagos = document.getElementById("lista-pagos");
    const botaoLimpar = document.getElementById("botao-limpar");

    function carregarPagos() {
        const pagos = JSON.parse(localStorage.getItem("pagos")) || [];

        listaPagos.innerHTML = ""; // Limpa a lista de produtos pagos

        pagos.forEach(produto => {
            const item = document.createElement("li");
            item.classList.add("item-pago");

            const img = document.createElement("img");
            img.src = produto.imagem;
            img.alt = produto.nome;
            img.style.width = "100%"; // Define a largura das imagens
            img.style.height = "auto"; // Mantém a proporção das imagens

            const h3 = document.createElement("h3");
            h3.textContent = produto.nome;

            const span = document.createElement("span");
            span.textContent = `OA ${produto.preco}`;

            item.appendChild(img);
            item.appendChild(h3);
            item.appendChild(span);

            listaPagos.appendChild(item);
        });
    }

    botaoLimpar.addEventListener('click', function() {
        localStorage.removeItem("pagos");
        carregarPagos();
        alert("Histórico de produtos pagos limpo com sucesso!");
    });

    carregarPagos();
});

document.addEventListener("DOMContentLoaded", function() {
    const listaPagos = document.getElementById("lista-pagos");

    function carregarPagos() {
        fetch('listar_produtos.php')
            .then(response => response.json())
            .then(produtos => {
                listaPagos.innerHTML = ""; // Limpa a lista de produtos pagos

                produtos.forEach(produto => {
                    const item = document.createElement("li");
                    item.classList.add("item-pago");

                    const img = document.createElement("img");
                    img.src = produto.imagem;
                    img.alt = produto.nome;
                    img.style.width = "100%"; // Define a largura das imagens
                    img.style.height = "auto"; // Mantém a proporção das imagens

                    const h3 = document.createElement("h3");
                    h3.textContent = produto.nome;

                    const span = document.createElement("span");
                    span.textContent = `R$ ${produto.preco}`;

                    item.appendChild(img);
                    item.appendChild(h3);
                    item.appendChild(span);

                    listaPagos.appendChild(item);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

    carregarPagos();
});
