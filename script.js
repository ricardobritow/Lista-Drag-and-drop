const lista = document.querySelector('.lista');
const itemInput = document.querySelector('.item-input');
const addItemForm = document.querySelector('.add-item-form');

function setupDraggable(item) {
    item.addEventListener('dragstart', () => {
        item.classList.add('item-arrastando');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('item-arrastando');
    });

    let itemText = item.querySelector('.item-text');
    if (!itemText) {
        itemText = document.createElement('span');
        itemText.className = 'item-text';
        itemText.textContent = item.textContent.trim();
        item.textContent = '';
        item.appendChild(itemText);
    }

    itemText.addEventListener('dblclick', () => {
        const novoNome = prompt('Renomear item:', itemText.textContent.trim());
        if (novoNome !== null) {
            const texto = novoNome.trim();
            if (texto.length > 0) {
                itemText.textContent = texto;
            }
        }
    });

    let removeButton = item.querySelector('.remove-button');
    if (!removeButton) {
        removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'remove-button';
        removeButton.setAttribute('aria-label', 'Remover tarefa');
        removeButton.textContent = '×';
        item.appendChild(removeButton);
    }

    removeButton.addEventListener('click', () => {
        item.remove();
    });
}

function criarItem(texto) {
    const item = document.createElement('div');
    item.className = 'item-arrastavel';
    item.draggable = true;

    const itemText = document.createElement('span');
    itemText.className = 'item-text';
    itemText.textContent = texto;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.setAttribute('aria-label', 'Remover tarefa');
    removeButton.textContent = '×';

    item.appendChild(itemText);
    item.appendChild(removeButton);
    setupDraggable(item);
    return item;
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.item-arrastavel:not(.item-arrastando)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = itemInput.value.trim();
    if (!texto) {
        return;
    }

    const novoItem = criarItem(texto);
    lista.appendChild(novoItem);
    itemInput.value = '';
    itemInput.focus();
});

lista.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.item-arrastando');
    const afterElement = getDragAfterElement(lista, e.clientY);

    if (!draggingItem) {
        return;
    }

    if (afterElement == null) {
        lista.appendChild(draggingItem);
    } else {
        lista.insertBefore(draggingItem, afterElement);
    }
});

const itens = document.querySelectorAll('.item-arrastavel');
itens.forEach(setupDraggable);
