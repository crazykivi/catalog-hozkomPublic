document.querySelectorAll(".tooltip-container").forEach(function (container) {
  const tooltip = container.querySelector(".tooltip-text");
  const imgSetting = container.querySelector("#setting");

  container.addEventListener("mouseenter", function () {
    const isSetting = container.querySelector("#setting");

    if (isSetting) {
      tooltip.style.left = "-50%";
      tooltip.style.bottom = "calc(50% + 10px)";
      tooltip.style.top = "auto"; 
      tooltip.style.right = "auto"; 
      tooltip.style.transform = "translateX(+50%)"; 
    } else {
      tooltip.style.left = "auto";
      tooltip.style.right = "calc(100% + 10px)";
      tooltip.style.top = "50%";
      tooltip.style.transform = "translateY(-50%)";
    }

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";

    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.left < 0 && !isSetting) {
      tooltip.style.left = "calc(100% + 10px)";
      tooltip.style.right = "auto";
      tooltip.style.transform = "translateY(-50%)";
    }
  });

  container.addEventListener("mouseleave", function () {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
});

function initializeTooltip(container) {
  const tooltip = container.querySelector(".tooltip-text");
  const isSetting = container.querySelector("#setting");
  const isDiscountInput = container.querySelector("#discount");
  const tooltipSetting = document.getElementById("tooltipSetting");

  container.addEventListener("mouseenter", function () {
    container.style.zIndex = "100";
    if (isSetting) {
      tooltip.style.left = "50%";
      tooltip.style.bottom = "calc(100% + 10px)";
      tooltip.style.top = "auto";
      tooltip.style.right = "auto"; 
      tooltip.style.transform = "translateX(-40%)";
      tooltip.style.zIndex = "14";
      tooltipSetting.style.zIndex = "14";
    } else if (isDiscountInput) {
      tooltip.style.left = "50%"; 
      tooltip.style.top = "calc(500% + 20px)"; 
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.right = "auto";
    } else {
      tooltip.style.left = "auto";
      tooltip.style.right = "calc(100% + 10px)"; 
      tooltip.style.top = "50%";
      tooltip.style.bottom = "auto"; 
      tooltip.style.transform = "translateY(-50%)"; 
    }

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";

    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.left < 0 && !isSetting) {
      tooltip.style.left = "calc(100% + 10px)";
      tooltip.style.right = "auto";
      tooltip.style.transform = "translateY(-50%)";
    }

    container.addEventListener("mouseleave", function () {
      container.style.zIndex = "10";

      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });
  });

  container.addEventListener("mouseleave", function () {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tooltip-container").forEach((container) => {
    initializeTooltip(container);
  });
});

document.querySelectorAll(".delete-container").forEach(function (container) {
  const tooltip = container.querySelector(".tooltip-text");

  container.addEventListener("mouseenter", function () {
    tooltip.style.left = "auto";
    tooltip.style.right = "calc(100% + 10px)";
    tooltip.style.top = "50%";
    tooltip.style.transform = "translateY(-50%)";
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";

    const tooltipRect = tooltip.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = "calc(100% + 10px)";
      tooltip.style.right = "auto";
    }

    if (tooltipRect.left < 0) {
      tooltip.style.left = "auto";
      tooltip.style.right = "calc(100% + 10px)";
    }
  });

  container.addEventListener("mouseleave", function () {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });
});
