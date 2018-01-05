var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {
  let elements = document.getElementsByClassName('sectionhead');
  let elementsArray = Array.prototype.slice.call(elements)
  elementsArray.map(function (item){
    item.addEventListener('click', function(event) {
      let num = event.currentTarget.dataset.num;
      let sections = document.getElementsByClassName('section');
      let sectionsArray = Array.prototype.slice.call(sections)
      sectionsArray.map(function (sec){
        sec.classList.add('d-none');
      });
      sections.item(num).classList.remove('d-none');
    }, false);
  })
});
