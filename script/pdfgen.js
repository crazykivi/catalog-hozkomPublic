async function generatePDF(action) {
    const loadingIndicator = document.getElementById('loading-spinner');

    try {
        loadingIndicator.style.display = 'flex';

        const table = document.getElementById('orderTable');
        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        const data = [];
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const quantityInput = cells[5].getElementsByTagName('input')[0]; 
            const row = {
                position: i + 1,
                code: cells[1].innerText,
                name: cells[3].innerText,
                price: cells[4].innerText,
                quantity: quantityInput.value,
                sum: cells[6].innerText
            };
            data.push(row);
        }

        const response = await fetch('http://31.128.36.243:3001/generate-pdf', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            if (action === 'view') {
                window.open(url);
            } else if (action === 'download') {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'document.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } else {
            console.error('Error generating PDF');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('viewButton').addEventListener('click', () => generatePDF('view'));
});