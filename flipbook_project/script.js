const url = 'фотокнига 8.pdf'; // Укажите имя вашего PDF-файла
let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    canvas = document.querySelector('#pdf-canvas'),
    ctx = canvas.getContext('2d');

// Загрузка PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  document.querySelector('#total-pages').textContent = pdf.numPages;
  renderPage(pageNum);
});

// Отображение страницы
function renderPage(num) {
  pageIsRendering = true;

  // Получить страницу
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport: viewport
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;
    });

    document.querySelector('#current-page').textContent = num;
  });
}

// Перелистывание вперед
document.querySelector('#next-page').addEventListener('click', () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  renderPage(pageNum);
});

// Перелистывание назад
document.querySelector('#prev-page').addEventListener('click', () => {
  if (pageNum <= 1) return;
  pageNum--;
  renderPage(pageNum);
});