const noimgLeft = document.getElementById("noimgLeft");
const noimgRight = document.getElementById("noimgRight");
const imgsizeLeft = document.getElementById("imgsizeLeft");
const imgsizeRight = document.getElementById("imgsizeRight");
const syncCheckboxLeft = document.getElementById("syncLeft");
const syncCheckboxRight = document.getElementById("syncRight");
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function updateImages(tableId, noimgChecked, imgSize) {
  const productRows = document.querySelectorAll(`#${tableId} .img`);
  const productImages = document.querySelectorAll(`#${tableId} img`);
  const tabletd = document.querySelectorAll(`#${tableId} td`); 
  const imgHeaders = document.querySelectorAll(`#${tableId} .img-header`);

  productRows.forEach((img, index) => {
    img.style.padding = noimgChecked ? "0" : index !== 1 ? "12px" : "0";
  });

  productImages.forEach((img) => {

    if (img.dataset.static === "true") {
      return;
    }

    const parentCell = img.parentElement;
    const photoLink = parentCell.querySelector(".photo-link");

    if (photoLink) {
      if (noimgChecked) {
        img.style.display = "none";
        photoLink.style.display = "inline";
      } else {
        img.style.display = "";
        photoLink.style.display = "none";
      }
    }

    let sizeFolder;
    if (imgSize === "small") {
      sizeFolder = "60x60";
      img.style.width = "60px";
      img.style.height = "auto";
      img.style.maxHeight = "60px";
    } else if (imgSize === "medium") {
      sizeFolder = "90x90";
      img.style.width = "90px";
      img.style.height = "auto";
      img.style.maxHeight = "90px";
    } else if (imgSize === "big") {
      sizeFolder = "135x135";
      img.style.width = "135px";
      img.style.height = "auto";
      img.style.maxHeight = "135px";
    }
    const code = img.dataset.code;
    img.src = `image/${sizeFolder}/${code}.jpg`;
  });

  tabletd.forEach((cell) => {
    const isImageCell =
      cell.querySelector("img") || cell.querySelector(".photo-link");

    if (noimgChecked) {
      cell.style.padding = "12px"; 
    }

    const photoLink = cell.querySelector(".photo-link");
    if (noimgChecked && photoLink) {
      photoLink.style.display = "inline";
      cell.style.textAlign = "center";
    } else if (photoLink) {
      photoLink.style.display = "none";
    }
  });

  imgHeaders.forEach((headimg, index) => {
    if (noimgChecked) {
      headimg.style.color = "#217346";
      headimg.style.width = "2px";
      headimg.style.maxWidth = "2px";
      headimg.style.padding = "0";
    } else {
      headimg.style.color = "#ffffff";
      headimg.style.width = "0px";
      if (index === 1) {
        headimg.style.padding = "0";
      }
    }
  });
}

function syncState() {
  if (syncCheckboxLeft.checked || syncCheckboxRight.checked) {
    const noimgChecked = noimgLeft.checked;
    const imgSize = imgsizeLeft.value;

    noimgRight.checked = noimgChecked;
    imgsizeRight.value = imgSize;

    imgsizeRight.disabled = noimgRight.checked || syncCheckboxRight.checked;
    imgsizeLeft.disabled = noimgLeft.checked;

    const noimgLabelRight = noimgRight.parentElement;
    if (syncCheckboxRight.checked) {
      noimgLabelRight.classList.add("disabled-label");
      noimgRight.disabled = true;
    } else {
      noimgLabelRight.classList.remove("disabled-label");
      noimgRight.disabled = false;
    }

    updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);
    updateImages("orderTable", noimgRight.checked, imgsizeRight.value);
  } else {
    imgsizeLeft.disabled = noimgLeft.checked;
    imgsizeRight.disabled = noimgRight.checked;

    updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);
    updateImages("orderTable", noimgRight.checked, imgsizeRight.value);
  }
}

function handleSyncChange(isChecked) {
  const loadingIndicator = document.getElementById("loading-spinner");
  loadingIndicator.style.display = "flex";

  setTimeout(() => {
    if (isChecked) {
      syncState();
    } else {
      imgsizeLeft.disabled = noimgLeft.checked;
      imgsizeRight.disabled = noimgRight.checked;

      noimgRight.parentElement.classList.remove("disabled-label");
      noimgRight.disabled = false;

      updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);
      updateImages("orderTable", noimgRight.checked, imgsizeRight.value);
    }
    loadingIndicator.style.display = "none";
  }, 0);
}

noimgLeft.addEventListener("change", function () {
  imgsizeLeft.disabled = noimgLeft.checked;

  if (syncCheckboxLeft.checked) {
    syncState();
  } else {
    const loadingIndicator = document.getElementById("loading-spinner");
    loadingIndicator.style.display = "flex";

    setTimeout(() => {
      updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);
      loadingIndicator.style.display = "none";
    }, 0);
  }
});

noimgRight.addEventListener("change", function () {
  imgsizeRight.disabled = noimgRight.checked;

  if (syncCheckboxRight.checked) {
    syncState();
  } else {
    const loadingIndicator = document.getElementById("loading-spinner");
    loadingIndicator.style.display = "flex";

    setTimeout(() => {
      updateImages("orderTable", noimgRight.checked, imgsizeRight.value);
      loadingIndicator.style.display = "none";
    }, 0);
  }
});

imgsizeLeft.addEventListener("change", function () {
  const loadingIndicator = document.getElementById("loading-spinner");
  loadingIndicator.style.display = "flex";

  setTimeout(() => {
    if (syncCheckboxLeft.checked) {
      syncState();
    } else {
      updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);
    }
    loadingIndicator.style.display = "none";
  }, 0);
});

imgsizeRight.addEventListener("change", function () {
  const loadingIndicator = document.getElementById("loading-spinner");
  loadingIndicator.style.display = "flex";

  setTimeout(() => {
    if (syncCheckboxRight.checked) {
      syncState();
    } else {
      updateImages("orderTable", noimgRight.checked, imgsizeRight.value);
    }
    loadingIndicator.style.display = "none";
  }, 0);
});

syncCheckboxLeft.addEventListener("change", function () {
  syncCheckboxRight.checked = this.checked;
  handleSyncChange(this.checked);
});

syncCheckboxRight.addEventListener("change", function () {
  syncCheckboxLeft.checked = this.checked;
  handleSyncChange(this.checked);
});

imgsizeLeft.disabled = noimgLeft.checked;
updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);

imgsizeRight.disabled = noimgRight.checked || syncCheckboxRight.checked;

if (syncCheckboxLeft.checked && syncCheckboxRight.checked) {
  syncState();
} else {
  updateImages("productTable", noimgLeft.checked, imgsizeLeft.value);
  updateImages("orderTable", noimgRight.checked, imgsizeRight.value);
}

function getSizeFolder() {
  const imgSize = imgsizeLeft.value;
  let sizeFolder;

  if (imgSize === "small") {
    sizeFolder = "60x60";
  } else if (imgSize === "medium") {
    sizeFolder = "90x90";
  } else if (imgSize === "big") {
    sizeFolder = "135x135";
  }

  return sizeFolder;
}

syncCheckboxLeft.addEventListener("change", function () {
  syncCheckboxRight.checked = this.checked;
  localStorage.setItem("syncLeft", this.checked);
  localStorage.setItem("syncRight", this.checked);
  handleSyncChange(this.checked);
});

syncCheckboxRight.addEventListener("change", function () {
  syncCheckboxLeft.checked = this.checked;
  localStorage.setItem("syncLeft", this.checked);
  localStorage.setItem("syncRight", this.checked);
  handleSyncChange(this.checked);
});
