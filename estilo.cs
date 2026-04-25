
.item-arrastando {
    opacity: 0.5;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
}

.ponto-insercao {
    border-top: 3px solid #007bff;
    margin-top: 5px;
}

[draggable="true"] {
    cursor: grab; / Mão aberta antes de clicar /
}

[draggable="true"]:active {
    cursor: grabbing; / Mão fechada enquanto segura e arrasta */
}