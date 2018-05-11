"use strict";

window.backend = (function () {
    var load = function (url, onLoad, onError) {
        var xhr = new XMLHttpRequest();

        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {

                onLoad(xhr.response);

            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });

        xhr.open('GET', url);
        xhr.send();
    };

    var onLoad = function (serverData) {
        var timeSeries = serverData["Time Series (Daily)"];
        var close = [];
        for (var day in timeSeries) {
            close.push(timeSeries[day]["4. close"]);
        }
      
        var resJSON = JSON.stringify(close);
        document.querySelector('.result').innerHTML = resJSON;
    };

    var onError = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff6d51;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.top = document.documentElement.clientHeight / 2 + window.pageYOffset + 'px';
        node.style.fontSize = '30px';

        node.classList.add('error');

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
        document.addEventListener('click', function () {
            node.remove();
        });
    };

    load('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&apikey=340IIPS0ZRUJJDUY', onLoad, onError);
})();

