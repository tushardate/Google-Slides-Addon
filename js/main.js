var DataModel = (function() {

})()

var UIView = (function() {
  var DOMStrings;

  DOMStrings = {
    container: ".container",
    marginTop: "#topMargin",
    marginRight: "#rightMargin",
    marginBottom: "#bottomMargin",
    marginLeft: "#leftMargin",
    formInputs: ".field",
    calculate: "#run-imageTetris"
  }

  function getDomStrings() {
    return DOMStrings
  }

  function getInputValues() {
    return {
      top: parseInt(document.querySelector(DOMStrings.marginTop).value),
      right: parseInt(document.querySelector(DOMStrings.marginRight).value),
      bottom: parseInt(document.querySelector(DOMStrings.marginBottom).value),
      left: parseInt(document.querySelector(DOMStrings.marginLeft).value)
    }
  }

  return {
    DOMStrings: DOMStrings,
    inputValues: getInputValues()
  }

})()

var Controller = (function(model, view) {
  var dom, inputValues, inputTotals, lastValue;

  function init() {
    dom = view.DOMStrings;
    document.querySelector(dom.calculate).addEventListener("click", inputValTotals);
    document.querySelectorAll(dom.formInputs).forEach(function(e) {
      e.addEventListener('focus', saveLastValue)
      console.log("updated input. This change from second computer")
    })
    document.querySelector(dom.container).addEventListener('change', updateInputs)
  }

  function updateInputs(e) {
    if (e.target.tagName == "INPUT") {
      var x = Converter.getConvertedUnit(e.target.value, "pt");
      if (x == null) {
        e.target.value = lastValue;
      } else {
        e.target.value = x
      }
      inputValTotals();
    }
  }

  function saveLastValue(e) {
    lastValue = Converter.getCleanUnitAsText(e.target.value);
  }

  function inputValTotals() {
    // inputValues = view.inputValues;
    inputValues = {
      top: parseInt(document.querySelector(dom.marginTop).value),
      right: parseInt(document.querySelector(dom.marginRight).value),
      bottom: parseInt(document.querySelector(dom.marginBottom).value),
      left: parseInt(document.querySelector(dom.marginLeft).value)
    }
    inputTotals = inputValues.top + inputValues.right + inputValues.bottom + inputValues.left;
    render()
  }

  function render() {
    events.emit("dataChanged", inputTotals);
  }

  return {
    init: function() {
      return init()
    }
  }
})(DataModel, UIView)

Controller.init()
