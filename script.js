// Seleciona a lista e todos os itens arrastáveis
const lista = document.querySelector('.lista');
const itens = document.querySelectorAll('.item-arrastavel');

// --- PARTE DO CONTRIBUIDOR 1 (Início e Fim) ---

itens.forEach(item => {
    // Evento disparado quando começas a arrastar o item
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging'); // Requisito: Adiciona transparência/estilo
    });

    // Evento disparado quando soltas o item (em qualquer lugar)
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging'); // Requisito: Limpa o estado visual
    });
});


// --- PARTE DO CONTRIBUIDOR 2 (Lógica de Reordenação) ---

lista.addEventListener('dragover', (e) => {
    e.preventDefault(); // OBRIGATÓRIO: Permite que o item seja solto aqui
    
    const draggingItem = document.querySelector('.dragging');
    // Encontra qual o item da lista está logo abaixo da posição do rato
    const afterElement = getDragAfterElement(lista, e.clientY);
    
    if (afterElement == null) {
        lista.appendChild(draggingItem); // Coloca no final da lista
    } else {
        lista.insertBefore(draggingItem, afterElement); // Coloca antes do item de referência
    }
});

// Função auxiliar para sscalcular a posição (Requisito: Reordenação)
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.item-arrastavel:not(.dragging)')];

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