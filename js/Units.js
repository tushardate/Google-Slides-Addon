var Units = (function() {
  var cases = {
    "px": ["px", "pix", "pixl", "pixel", "pixels"],
    "in": ["in", "inch", "inches"],
    "cm": ["cm", "cms", "cent", "centi", "centimeter", "centimeter"],
    "mm": ["mm", "mil", "mill", "millimeter", "millimeters"],
    "pt": ["pt", "pts", "pnt", "pnts", "point", "points"],
    "pc": ["pc", "pica", "picas"],
    "%": ["%", "pr", "per", "pcnt", "percent", "percents"]
  }

  function getUnitVal(val) {
    if (!isNaN(parseFloat(val))) { // checks if val is a number
      var res = regexMatch(val);
      return {
        number: parseFloat(val),
        unit: res != null ? getCleanUnitText(res[0], cases) : null
      }
    } else {
      return null;
    }
  }

  function regexMatch(val) {
    var returnObj = {};
    var pattern = "(" + buildRegexString(cases) + ")";
    var regex = new RegExp(pattern, "gi");
    return result = val.match(regex);
  }

  function buildRegexString(obj) {
    var str = "";
    for (var o in obj) {
      str += obj[o].join("|")
      str += "|"; // adds a line at the end of every iteration of the object children
    }
    str = str.replace(/\|\s*$/, "");
    return str
  }

  function getCleanUnitText(str, obj) {
    for (var o in obj) {
      for (var i = 0; i < obj[o].length; i++) {
        if (str === obj[o][i]) {
          return o;
        }
      }
    }
  }

  function cleanup(el) {
    var ret = getUnitVal(el);
    if (ret.number != null) {
      if (ret.unit != null) {
        return String(ret.number) + " " + String(ret.unit)
      } else {
        return String(ret.number) + " px";
      }
    } else {
      return null;
    }
  }

  function getConvertedUnit(el, type) {

  }

  return {
    cleanup: cleanup,
    getUnitVal: getUnitVal
  }
})()
