async function generatePDF2(action) {
  const loadingIndicator = document.getElementById("loading-spinner");

  try {
    loadingIndicator.style.display = "flex";

    const table = document.getElementById("orderTable");
    const rows = table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    const data = [];
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const quantityInput = cells[5].getElementsByTagName("input")[0];

      const row = {
        position: i + 1,
        code: cells[1].innerText,
        name: cells[3].innerText,
        price: cells[4].innerText,
        quantity: quantityInput.value,
        sum: cells[6].innerText,
      };
      data.push(row);
    }

    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const managerName =
      document.getElementById("managerSelect").value === "Любой менеджер"
        ? ""
        : document.getElementById("managerSelect").value;
    const comments = document.getElementById("AnyComments").value;

    const response = await fetch("http://192.168.0.135:3002/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
        customerName,
        customerPhone,
        customerEmail,
        managerName,
        comments,
        action,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      if (action === "view") {
        window.open(url);
      } else if (action === "download") {
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } else {
      console.error("Error generating PDF");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("viewButton2")
    .addEventListener("click", () => generatePDF2("view"));
});
