;(function(document, window) {
  var formItemPopular = document.querySelectorAll('.popular-item__form');

  for (var i = 0; i < formItemPopular.length; i++) {
    formItemPopular[i].addEventListener('submit', function (e) {
      e.preventDefault();
    })
  }
}(document, window));