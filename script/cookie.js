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
                searchInput.value = query;
                loadData();
                historyList.style.display = 'none';
            });
            historyItems.appendChild(li);
        });
    }

    function addSearchQuery(query) {
        if (getCookie('cookiesAccepted')) {
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

    window.acceptCookies = function () {
        setCookie('cookiesAccepted', 'true', { 'max-age': 3600 * 24 * 30 });
        cookieConsent.style.display = 'none';
    };

    window.declineCookies = function () {
        document.cookie = 'cookiesDeclined=true; path=/';
        cookieConsent.style.display = 'none';
        deleteCookie('searchHistory');
    };

    if (getCookie('cookiesAccepted')) {
        cookieConsent.style.display = 'none';
    }

    if (getCookie('cookiesDeclined')) {
        cookieConsent.style.display = 'none';
        deleteCookie('searchHistory');
    }

    updateHistoryList();

});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const searchHistoryList = document.getElementById('searchHistory');
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
        searchHistoryList.innerHTML = '';
        searchHistory.forEach(query => {
            const option = document.createElement('option');
            option.value = query;
            searchHistoryList.appendChild(option);
        });
    }

    function addSearchQuery(query) {
        if (getCookie('cookiesAccepted')) {
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

    window.acceptCookies = function () {
        setCookie('cookiesAccepted', 'true', { 'max-age': 3600 * 24 * 30 });
        cookieConsent.style.display = 'none';
    };

    window.declineCookies = function () {
        document.cookie = 'cookiesDeclined=true; path=/';
        cookieConsent.style.display = 'none';
        deleteCookie('searchHistory');
    };

    if (getCookie('cookiesAccepted')) {
        cookieConsent.style.display = 'none';
    }

    if (getCookie('cookiesDeclined')) {
        cookieConsent.style.display = 'none';
        deleteCookie('searchHistory'); 
    }

    updateHistoryList();

});
