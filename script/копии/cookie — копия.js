document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const historyList = document.getElementById('historyList');
    const historyItems = document.getElementById('historyItems');
    const cookieConsent = document.getElementById('cookieConsent');

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            'max-age': -1
        });
    }

    let searchHistory = getCookie('searchHistory') ? JSON.parse(getCookie('searchHistory')) : [];

    function updateHistoryList() {
        historyItems.innerHTML = '';
        searchHistory.forEach(query => {
            const li = document.createElement('li');
            li.textContent = query;
            li.addEventListener('click', () => {
                searchInput.value = query; // Вставка текста в поле поиска при клике 
                loadData();
            });
            historyItems.appendChild(li);
        });
    }

    function addSearchQuery(query) {
        if (getCookie('cookiesAccepted')) { // Проверяем, приняты ли куки
            if (query && !searchHistory.includes(query)) {
                if (searchHistory.length >= 10) {
                    searchHistory.pop();
                }
                searchHistory.unshift(query);
                setCookie('searchHistory', JSON.stringify(searchHistory), { 'max-age': 3600 * 24 * 30 });
                updateHistoryList();
            }
        }
    }

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            addSearchQuery(query);
        }
    });

    window.toggleHistory = function () {
        if (historyList.style.display === 'none') {
            historyList.style.display = 'block';
        } else {
            historyList.style.display = 'none';
        }
    };

    window.acceptCookies = function () {
        setCookie('cookiesAccepted', 'true', { 'max-age': 3600 * 24 * 30 });
        cookieConsent.style.display = 'none';
    };

    window.declineCookies = function () {
        setCookie('cookiesDeclined', 'true', { 'max-age': 3600 * 24 * 30 });
        cookieConsent.style.display = 'none';
        deleteCookie('searchHistory'); // Удаляем историю поиска
    };

    if (getCookie('cookiesAccepted')) {
        cookieConsent.style.display = 'none';
    }

    if (getCookie('cookiesDeclined')) {
        cookieConsent.style.display = 'none';
        deleteCookie('searchHistory'); // Удаляем историю поиска при загрузке, если куки были отклонены
    }

    updateHistoryList();
});