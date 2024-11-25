document.addEventListener('keydown', function (event) {
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.classList.contains('quantity-input')) {
        if (!event.shiftKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            let newFocus;
            if (event.key === 'ArrowUp') {
                newFocus = focusedElement.closest('tr').previousElementSibling;
            } else if (event.key === 'ArrowDown') {
                newFocus = focusedElement.closest('tr').nextElementSibling;
            }

            if (newFocus) {
                const quantityInput = newFocus.querySelector('.quantity-input');
                if (quantityInput) {
                    quantityInput.focus();
                    quantityInput.select();

                    const elementRect = quantityInput.getBoundingClientRect();
                    const absoluteElementTop = elementRect.top + window.pageYOffset;
                    const middle = absoluteElementTop - (window.innerHeight / 2);
                    window.scrollTo({
                        top: middle,
                        behavior: 'smooth'
                    });
                }
            }
            event.preventDefault();
        }

        if (event.shiftKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            let newQuantity = parseInt(focusedElement.value) || 0;

            if (event.key === 'ArrowUp') {
                newQuantity++;
            } else if (event.key === 'ArrowDown') {
                newQuantity = Math.max(0, newQuantity - 1);
            }

            focusedElement.value = newQuantity;
            focusedElement.dispatchEvent(new Event('input'));
            event.preventDefault();
        }

        if (event.key === 'Enter') {
            let newFocus = focusedElement.closest('tr').nextElementSibling;

            if (newFocus) {
                const quantityInput = newFocus.querySelector('.quantity-input');
                if (quantityInput) {
                    quantityInput.focus();
                    quantityInput.select();

                    const elementRect = quantityInput.getBoundingClientRect();
                    const absoluteElementTop = elementRect.top + window.pageYOffset;
                    const middle = absoluteElementTop - (window.innerHeight / 2);
                    window.scrollTo({
                        top: middle,
                        behavior: 'smooth'
                    });
                }
            }
            event.preventDefault();
        }
    }
});