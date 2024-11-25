async function generatePDF() {
    const table = document.getElementById('orderTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const quantityInput = cells[5].getElementsByTagName('input')[0]; // Получаем значение из input

        const row = {
            //position: i + 1,
            position: i + 1,
            code: cells[1].innerText,
            name: cells[3].innerText,
            price: cells[4].innerText,
            quantity: quantityInput.value, // Извлекаем значение из input
            sum: cells[6].innerText
        };
        data.push(row);
    }

    const response = await fetch('http://192.168.0.135:3001/generate-pdf', { // Измените порт на 3001, если ваш сервер работает на этом порту
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } else {
        console.error('Error generating PDF');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('printButton').addEventListener('click', generatePDF);
    document.getElementById('printButton2').addEventListener('click', generatePDF);
});