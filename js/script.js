const categoria = document.getElementById('Categoria');
const NomeItem = document.getElementById('nome-item');
const descricao = document.getElementById('descrição-item');
const ingredientes = document.getElementById('ingredientes-item');
const preco = document.getElementById('preco-item');
const btnAdicionar = document.getElementById('adicionar');

const cardapioAdmin = document.querySelector('.painel_Adm');
const sectionHamburguer = document.querySelector('.hamburguer');
const sectionBebidas = document.querySelector('.bebidas');

function obterItens() {
    return JSON.parse(localStorage.getItem('meuCardapio')) || [];
}

function salvarItens(lista) {
    localStorage.setItem('meuCardapio', JSON.stringify(lista));
}


window.removerItem = function(id) {
    let itens = obterItens();
    itens = itens.filter(item => item.id !== id);
    salvarItens(itens);
    renderizarTudo();
};


function renderizarTudo() {
    const itens = obterItens();

    if (cardapioAdmin) {
        const antigos = cardapioAdmin.querySelectorAll('.item-lista-admin');
        antigos.forEach(el => el.remove());
    }
    if (sectionHamburguer) {
        sectionHamburguer.innerHTML = '<h1 class="title_hamburguer">🍔Hambúrgueres Gourmet</h1>';
    }
    if (sectionBebidas) {
        sectionBebidas.innerHTML = '<h1 class="title_bebidas">🥤Sucos & Drinks</h1>';
    }

    itens.forEach(item => {
        if (cardapioAdmin) {
            const divAdmin = document.createElement('div');
            divAdmin.classList.add('item-lista-admin');
            
            Object.assign(divAdmin.style, {
                backgroundColor: 'transparent',
                padding: '15px',
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

            divAdmin.innerHTML = `
                <h2 style="color: #444; margin: 0; font-size: 1.5rem;">${item.nome}</h2>
                <p style="color: #9e8873; margin: 0;">${item.descricao}</p>
                <p style="background: #FAE5C6; width: fit-content; color: #111; border-radius: 5px; padding: 3px 8px; font-size: 14px; margin: 0;">
                    ${item.ingredientes}
                </p>
                <h3 style="color: #CD3528; margin: 0;">R$ ${item.preco}</h3>
                <img src="../imgs/bin.png" onclick="removerItem(${item.id})" style="position: absolute; cursor: pointer; right: 20px; top: 20px;" title="Remover">
            `;
            cardapioAdmin.appendChild(divAdmin);
        }

        if (sectionHamburguer || sectionBebidas) {
            const divCardapio = document.createElement('div');
            divCardapio.style.cssText = "border-bottom: 1px solid #444; padding: 15px; margin-bottom: 10px; color: white;";
            
            divCardapio.innerHTML = `
                <h2 style="color: #444; margin: 0; font-size: 1.5rem;">${item.nome}</h2>
                <p style="color: #8f7761ff; margin: 0; font-weight: 600;">${item.descricao}</p>
                <p style="background: #FAE5C6; width: fit-content; color: #111; border-radius: 5px; padding: 3px 8px; font-size: 14px; margin: 0;">
                    ${item.ingredientes}
                </p>
                <h3 style="color: #CD3528; margin: 0;">R$ ${item.preco}</h3>
            `;

            if (item.categoria === 'hamburguer' && sectionHamburguer) {
                sectionHamburguer.appendChild(divCardapio);
            } else if (item.categoria === 'bebidas' && sectionBebidas) {
                sectionBebidas.appendChild(divCardapio);
            }
        }
    });
}

if (btnAdicionar) {
    btnAdicionar.onclick = function(e) {
        e.preventDefault();

        if (NomeItem.value.trim() === "" || preco.value.trim() === "") {
            alert("Por favor, preencha o nome e o preço.");
            return;
        }

        const novoItem = {
            id: Date.now(),
            categoria: categoria.value,
            nome: NomeItem.value,
            descricao: descricao.value,
            ingredientes: ingredientes.value,
            preco: preco.value
        };

        const lista = obterItens();
        lista.push(novoItem);
        salvarItens(lista);
        
        NomeItem.value = '';
        descricao.value = '';
        ingredientes.value = '';
        preco.value = '';
        renderizarTudo();
    };
}

window.onload = renderizarTudo;