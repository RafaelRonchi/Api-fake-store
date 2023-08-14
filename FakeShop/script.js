const listaProdutos = document.getElementById('lista-produtos');
const selecaoCategoria = document.getElementById('selecao-categoria');

async function buscarProdutos() {
    const resposta = await fetch('https://devs2blu-store.onrender.com/');
    return await resposta.json();
}
async function exibirProdutos(categoriaSelecionada) {
  listaProdutos.innerHTML = '';
  const produtos = await buscarProdutos();

  produtos.forEach(produto => {
    if (!categoriaSelecionada || produto.category.toLowerCase().includes(categoriaSelecionada.toLowerCase())) {
      listaProdutos.appendChild(criarCardProduto(produto));
    }
  });
}

function criarCardProduto(produto) {
  const cardProduto = document.createElement('div');
  cardProduto.className = 'card';

  const imagem = document.createElement('img');
  imagem.src = produto.image;
  imagem.classList.add('car-img-top');
  cardProduto.appendChild(imagem);

  const titulo = document.createElement('h2');
  titulo.textContent = produto.title;
  titulo.classList.add('card-title');
  cardProduto.appendChild(titulo);

  const preco = document.createElement('p');
  preco.textContent = `R$ ${produto.price}`;
  preco.classList.add('card-text');
  cardProduto.appendChild(preco);

  const botaoComprar = document.createElement('button');
  botaoComprar.textContent = 'Comprar';
  botaoComprar.className = 'btn btn-primary';
  cardProduto.appendChild(botaoComprar);

  return cardProduto;
}


selecaoCategoria.addEventListener('change', () => {
  exibirProdutos(selecaoCategoria.value);
});

exibirProdutos();
