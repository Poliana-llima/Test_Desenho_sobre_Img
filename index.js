const thumbnail = document.getElementById('thumbnail');
const overlay = document.getElementById('overlay');
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const backgroundImg = document.getElementById('backgroundImg');
let isDrawing = false;

// Carrega a imagem editada do localStorage, se existir
const savedImage = localStorage.getItem('editedImage');
if (savedImage) {
    // Atualiza a imagem miniatura com a imagem do localStorage
    thumbnail.src = savedImage;

    // Desenha a imagem salva no canvas ao recarregar a página
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = savedImage;
} else {
    // Desenha a imagem de fundo no canvas, caso não haja imagem salva
    backgroundImg.onload = () => {
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    };
}

thumbnail.addEventListener('click', () => {
    overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
    }
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    // Atualiza a imagem miniatura com a imagem modificada
    thumbnail.src = dataURL;

    // Salva a imagem editada no localStorage
    localStorage.setItem('editedImage', dataURL);

    // Fecha o overlay após salvar
    overlay.classList.remove('active');
});
