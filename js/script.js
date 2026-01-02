// Itens do Hambúrguer
const categoria = document.getElementById('Categoria');
const NomeHamburguer = document.getElementById('nome-item');
const descrição = document.getElementById('descrição-item');
const ingredientes = document.getElementById('ingredientes-item');
const preco = document.getElementById('preco-item');
// btn adicionar
const btnAdicionar = document.getElementById('adicionar');
// Cardápio admin 
const cardapioAdmin = document.querySelector('.painel_Adm');

class Hamburguer {
    constructor(categoria, nome, descrição, ingredientes, preco) {  
        this.categoria = categoria;
        this.nome = nome;
        this.descrição = descrição;
        this.ingredientes = ingredientes;
        this.preco = preco;
    } 
          
    error(mensagem) {
        alert(mensagem);
        return;
    }
}

btnAdicionar.addEventListener('click', function(e) { 
    e.preventDefault();

    if (NomeHamburguer.value.trim() === '' || descrição.value.trim() === '' || ingredientes.value.trim() === '' || preco.value.trim() === '') {
        alert('Preencha todos os campos.');
        return;
    }

    const novoHamburguer = new Hamburguer(
        categoria.value,
        NomeHamburguer.value,
        descrição.value,
        ingredientes.value,
        preco.value
    );

    const divCardapio = document.createElement('div');
    Object.assign(divCardapio.style, {
        backgroundColor: 'transparent',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #999',
        textAlign: 'left',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '20px',
        position: 'relative'
    });

    divCardapio.innerHTML = `
        <h2>${novoHamburguer.nome}</h2>
        <p>${novoHamburguer.descrição}</p>
        <p style="background: #FAE5C6; width: fit-content; color: #111; border-radius: 5px; padding: 3px;">
            ${novoHamburguer.ingredientes}
        </p>
        <h3 style="color: #CD3528;">R$ ${novoHamburguer.preco}</h3>
    `;

    const imgDelete = document.createElement('img');
    imgDelete.src = '../imgs/bin.png';
    imgDelete.style.position = 'absolute';
    imgDelete.style.width = '40px';
    imgDelete.style.cursor = 'pointer';
    imgDelete.style.left = 'calc(100% - 60px)';
    imgDelete.title = 'Remover item';

    imgDelete.addEventListener('click', () => {
        divCardapio.remove();
    });

    cardapioAdmin.appendChild(divCardapio);
    divCardapio.appendChild(imgDelete);

    NomeHamburguer.value = '';
    descrição.value = '';
    ingredientes.value = '';
    preco.value = '';
});