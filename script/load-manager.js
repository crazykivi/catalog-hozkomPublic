document.addEventListener("DOMContentLoaded", function () {
  let anyManagerEmail = null;
  function loadManagers() {
    fetch("bd/get_managers.php")
      .then((response) => response.json())
      .then((data) => {
        const selectElement = document.getElementById("managerSelect");

        data.forEach((manager) => {
          const option = document.createElement("option");
          option.value = manager.emailManagers;
          option.textContent = manager.nameManagers;
          selectElement.appendChild(option);

          if (manager.nameManagers === "Любой менеджер") {
            anyManagerEmail = manager.emailManagers;
            document.getElementById("hiddenAnyManagerEmail").value =
              manager.emailManagers;
          }
        });

        const savedFormData = getCookie("formData")
          ? JSON.parse(getCookie("formData"))
          : null;

        if (savedFormData) {
          document.getElementById("customerName").value =
            savedFormData.customerName || "";
          document.getElementById("customerPhone").value =
            savedFormData.customerPhone || "";
          document.getElementById("customerEmail").value =
            savedFormData.customerEmail || "";
          document.getElementById("managerSelect").value =
            savedFormData.managerSelect || "";
          document.getElementById("AnyComments").value =
            savedFormData.AnyComments || "";
        }

        selectElement.addEventListener("blur", saveFormData);
      })
      .catch((error) => console.error("Ошибка:", error));
  }

  loadManagers();
});
