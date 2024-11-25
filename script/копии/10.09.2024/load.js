        //Скрипт кольца загрузки
        document.addEventListener("DOMContentLoaded", function () {
            const spinner = document.getElementById('loading-spinner');

            function hideSpinner() {
                spinner.style.display = 'none';
            }

            window.addEventListener('load', hideSpinner);
        });