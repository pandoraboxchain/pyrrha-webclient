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
      event.returnValue = false;
    }, false);
  })
  let abb = document.getElementById('addbatch');
  abb.addEventListener('click', function(event) {
    var el = document.createElement('div');
    el.classList.add("form-group")
    el.innerHTML = "<label for='exampleInputFile'>One More Batch</label><input type='file' class='form-control-file dataset-input-file' id='exampleInputFile' aria-describedby='fileHelp'>"
    var target = document.querySelector(".batches");
    target.appendChild(el);
    event.returnValue = false;
  }, false)
});
