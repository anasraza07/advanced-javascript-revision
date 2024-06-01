const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => { 
    console.log(xhr.response);
}) // 1. event that we want to listen or to wait for, 2. function; load means response has loaded

xhr.open('GET', 'https://supersimplebackend.dev'); // 1. type of request, 2. where to send this HTTP message
xhr.send();

