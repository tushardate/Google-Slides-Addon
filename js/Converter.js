var Converter = (function() {
  var cases = {
    px : {
      alias: ["px", "pix", "pixl", "pixel", "pixels"],
      ratioToBase: 37.795275591 // base is centimeters
    },
    in : {
      alias: ["in", "inch", "inches"],
      ratioToBase: 0.3937007874 // base is centimeters
    },
    cm : {
      alias: ["cm", "cms", "cent", "centi", "centimeter", "centimeter"],
      ratioToBase: 1 // THE BASE
    },
    mm : {
      alias: ["mm", "mil", "mill", "millimeter", "millimeters"],
      ratioToBase: 10 // base is centimeters
    },
    pt : {
      alias: ["pt", "pts", "pnt", "pnts", "point", "points"],
      ratioToBase: 28.346456693 // base is centimeters
    },
    pc : {
      alias: ["pc", "pica", "picas"],
      ratioToBase: 2.3622047244 // base is centimeters
    }
  }

  function getCleanUnitAsText(el) {
    var ret = getCleanUnit(el);
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

  function getConvertedUnit(val, type) {
    if (isNaN(parseFloat(val))) { return }
    var ret = getCleanUnit(val);
    var toType = getCleanUnitType(type, cases);
    if (ret.unit != null && toType) {
      //to/from * value
      var convertedNum = (cases[toType].ratioToBase / cases[ret.unit].ratioToBase) * ret.number;
      convertedNum = Math.round(convertedNum*1000)/1000; // round to 3 decimal places
      return String(convertedNum) + " " + String(toType)
    } else {
      return String(ret.number) + " " + String(toType);
    }
  }

  function getCleanUnit(val) {
    if (!isNaN(parseFloat(val))) { // checks if val is a number
      var res = regexMatch(val);
      return {
        number: parseFloat(val),
        unit: res != null ? getCleanUnitType(res[0], cases) : null
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
      str += obj[o].alias.join("|")
      str += "|"; // adds a line at the end of every iteration of the object children
    }
    str = str.replace(/\|\s*$/, "");
    return str
  }

  function getCleanUnitType(str, obj) {
    for (var o in obj) {
      for (var i = 0; i < obj[o].alias.length; i++) {
        if (str === obj[o].alias[i]) {
          return o;
        }
      }
    }
  }

  return {
    getCleanUnitAsText: getCleanUnitAsText,
    getCleanUnit: getCleanUnit,
    getConvertedUnit: getConvertedUnit
  }
})()
