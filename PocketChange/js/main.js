let myhead = {};
let body = {};
let currency = [];
let limit = 0;
let id = 0;

(function () {
  document.addEventListener("click", function (e) {
    if (e.target.id == "add" && limit < 4) {
      limit++;
      PC.addCurrency(body, "body", id++, "Change", "readonly");
    } else if (e.target.id == "delete" && limit >= 1) {
      body.removeChild(body.lastChild);
      limit--;
    }
  });
}());

let PC = {
  addCurrency: function (parent, subClass, id, holder, reader) {
    let div = document.createElement('div');
    div.setAttribute('class', "pocket__" + subClass + "__selector");
    let html = ['<input data-id=' + id + ' class="text-box"',
      'type="text" placeholder="' + holder + '" ' + reader + '>',
      '<div  class="selectdiv">',
      '<select data-id=' + id + '>', this.addOptions(),
      '</select>', '</div>'
    ].join('');
    div.innerHTML = html;
    parent.appendChild(div);
  },
  addOptions: function () {
    let options = '';
    this.forEach(currency, function (item) {
      options += '<option val="' + item + '">' + item + '</option>'
    });
    return options;
  },
  forEach: function (array, callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  },
  getDate: function () {
    let d = new Date();
    let dd = d.toDateString().slice(4) + " " + d.getHours() + d.toGMTString().slice(19, 26);
    document.querySelector('.date').innerHTML = dd;
  }
}

function change() {
  PC.getDate();
  let xChange = document.querySelectorAll('[data-id]');
  let url = "https://api.fixer.io/latest?base=" + xChange[1].value;
  let amount = (xChange[0].value == "") ? 1 : parseFloat(xChange[0].value);
  xChange[0].value = amount.toFixed(2);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (jsonR) {
    PC.forEach(xChange, function (item, i, arr) {
      if (i != 1 && i % 2 == 1) {
        if (xChange[1].value == arr[i].value) {
          arr[i - 1].value = amount.toFixed(2);
        } else {
          let rate = parseFloat(jsonR.rates[arr[i].value]);
          arr[i - 1].value = (amount * rate).toFixed(2);
        }
      }
    });
  });
};

function init () {
  id = 0;
  limit = 0;
  PC.getDate();
  body = document.querySelector('.pocket__change');
  myhead = document.querySelector('.pocket__header');
  currency = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];
  PC.addCurrency(myhead, "header", id++, "Amount", "");
  PC.addCurrency(body, "body", id++, "Change", "readonly");
}

init();