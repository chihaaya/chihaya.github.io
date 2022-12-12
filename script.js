function main() {}

function cityInfo() {
  resetCityTable();
  var table = document.getElementById("CityInfo");
  var region = document.getElementById("SelectedRegion").value;
  var inputX = parseInt(document.getElementById("inputX").value);
  var inputY = parseInt(document.getElementById("inputY").value);
  var inputZ = parseInt(document.getElementById("inputZ").value);
  if (isNaN(inputX) && isNaN(inputY) && isNaN(inputZ)) {
    for (item in data.Regions[region].Cities) {
      var targetX = parseInt(data.Regions[region].Cities[item].location["X"]);
      var targetY = parseInt(data.Regions[region].Cities[item].location["Y"]);
      var targetZ = parseInt(data.Regions[region].Cities[item].location["Z"]);
      var distance = Math.sqrt(Math.pow(targetX - inputX, 2) + Math.pow(targetZ - inputZ, 2));
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var tdtext = document.createTextNode(data.Regions[region].Cities[item].name);
      td.appendChild(tdtext);
      tr.appendChild(td);
      for (subitem in data.Regions[region].Cities[item].location) {
        var td = document.createElement("td");
        var tdtext = document.createTextNode(data.Regions[region].Cities[item].location[subitem]);
        td.appendChild(tdtext);
        tr.appendChild(td);
      }
      var td = document.createElement("td");
      var tdtext = document.createTextNode(Math.round(distance * 10) / 10 + " blocks");
      td.appendChild(tdtext);
      tr.appendChild(td);
      var button = document.createElement("input");
      button.type = "button";
      button.value = "set";
      button.id = data.Regions[region].Cities[item].name;
      button.addEventListener("click", setCityCoords);
      tr.appendChild(button);
      table.appendChild(tr);
    }
  } else return sortCityInfo();
}

function sortCityInfo() {
  var table = document.getElementById("CityInfo");
  var region = document.getElementById("SelectedRegion").value;
  var inputX = parseInt(document.getElementById("inputX").value);
  var inputY = parseInt(document.getElementById("inputY").value);
  var inputZ = parseInt(document.getElementById("inputZ").value);
  var distances = [];
  for (item in data.Regions[region].Cities) {
    var targetX = parseInt(data.Regions[region].Cities[item].location["X"]);
    var targetY = parseInt(data.Regions[region].Cities[item].location["Y"]);
    var targetZ = parseInt(data.Regions[region].Cities[item].location["Z"]);
    var distance = Math.sqrt(Math.pow(targetX - inputX, 2) + Math.pow(targetZ - inputZ, 2));
    distances.push([distance, data.Regions[region].Cities[item].name]);
  }
  distances.sort(function (a, b) {
    return a[0] - b[0];
  });
  //console.log(distances);
  for (i in distances) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var tdtext = document.createTextNode(data.Regions[region].Cities[distances[i][1]].name);
    td.appendChild(tdtext);
    tr.appendChild(td);
    for (subitem in data.Regions[region].Cities[distances[i][1]].location) {
      var td = document.createElement("td");
      var tdtext = document.createTextNode(data.Regions[region].Cities[distances[i][1]].location[subitem]);
      td.appendChild(tdtext);
      tr.appendChild(td);
    }
    var td = document.createElement("td");
    var tdtext = document.createTextNode(Math.round(distances[i][0] * 10) / 10 + " blocks");
    td.appendChild(tdtext);
    tr.appendChild(td);
    var button = document.createElement("input");
    button.type = "button";
    button.value = "set";
    button.id = data.Regions[region].Cities[distances[i][1]].name;
    button.addEventListener("click", setCityCoords);
    tr.appendChild(button);
    table.appendChild(tr);
  }
  return distances[0];
}

function resetCityTable() {
  var table = document.getElementById("CityInfo");
  var rl = table.rows.length;
  for (var i = 1; i < rl; i++) {
    table.deleteRow(rl - i);
  }
}

function search() {
  resetPoITable();
  var table = document.getElementById("PoIList");
  var region = document.getElementById("SelectedRegion").value;
  for (var item in data.Regions[region].PointOfInterest) {
    var targetText = data.Regions[region].PointOfInterest[item].name;
    var boxText = document.getElementById("searchBox").value;
    var box2Text = document.getElementById("searchBox2").value;
    var box3Text = document.getElementById("searchBox3").value;
    //if (targetText.toLowerCase().indexOf(document.getElementById("searchBox").value.toLowerCase()) != -1)
    if (
      (boxText == "" && box2Text == "" && box3Text == "") ||
      (boxText != "" && targetText.toLowerCase().indexOf(boxText.toLowerCase()) != -1) ||
      (box2Text != "" && targetText.toLowerCase().indexOf(box2Text.toLowerCase()) != -1) ||
      (box3Text != "" && targetText.toLowerCase().indexOf(box3Text.toLowerCase()) != -1)
    ) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(targetText));
      tr.appendChild(td);
      for (subitem in data.Regions[region].PointOfInterest[item].location) {
        var td = document.createElement("td");
        var tdtext = document.createTextNode(data.Regions[region].PointOfInterest[item].location[subitem]);
        td.appendChild(tdtext);
        tr.appendChild(td);
      }
      var td = document.createElement("td");
      var tdtext = document.createTextNode(data.Regions[region].PointOfInterest[item].bounty);
      td.appendChild(tdtext);
      tr.appendChild(td);

      //最寄りの都市とその距離
      var distances = [];
      for (subitem in data.Regions[region].Cities) {
        var targetX = parseInt(data.Regions[region].Cities[subitem].location["X"]);
        var targetY = parseInt(data.Regions[region].Cities[subitem].location["Y"]);
        var targetZ = parseInt(data.Regions[region].Cities[subitem].location["Z"]);
        var distance = Math.sqrt(Math.pow(targetX - data.Regions[region].PointOfInterest[item].location["X"], 2) + Math.pow(targetZ - data.Regions[region].PointOfInterest[item].location["Z"], 2));
        distances.push([distance, data.Regions[region].Cities[subitem].name]);
      }
      distances.sort(function (a, b) {
        return a[0] - b[0];
      });
      var td = document.createElement("td");
      var tdtext = document.createTextNode(distances[0][1]);
      td.appendChild(tdtext);
      tr.appendChild(td);
      var td = document.createElement("td");
      var tdtext = document.createTextNode(Math.round(distances[0][0] * 10) / 10 + " blocks");
      td.appendChild(tdtext);
      tr.appendChild(td);

      //setボタン
      var button = document.createElement("input");
      button.type = "button";
      button.value = "set";
      button.id = data.Regions[region].PointOfInterest[item].name;
      button.addEventListener("click", setPoICoords);
      tr.appendChild(button);
      table.appendChild(tr);
    }
  }
}

function resetPoITable() {
  var table = document.getElementById("PoIList");
  var rl = table.rows.length;
  for (var i = 1; i < rl; i++) {
    table.deleteRow(rl - i);
  }
}

function setCityCoords(event) {
  var region = document.getElementById("SelectedRegion").value;
  document.getElementById("inputX").value = data.Regions[region].Cities[event.target.id].location["X"];
  document.getElementById("inputY").value = data.Regions[region].Cities[event.target.id].location["Y"];
  document.getElementById("inputZ").value = data.Regions[region].Cities[event.target.id].location["Z"];
  cityInfo();
  document.getElementById("target").innerText =
    "current Target: " +
    data.Regions[region].Cities[event.target.id].name +
    " (" +
    document.getElementById("inputX").value +
    "," +
    document.getElementById("inputY").value +
    "," +
    document.getElementById("inputZ").value +
    ")";
}

function setPoICoords(event) {
  var region = document.getElementById("SelectedRegion").value;
  var targetName = data.Regions[region].PointOfInterest[event.target.id].name;
  var targetX = data.Regions[region].PointOfInterest[event.target.id].location["X"];
  var targetY = data.Regions[region].PointOfInterest[event.target.id].location["Y"];
  var targetZ = data.Regions[region].PointOfInterest[event.target.id].location["Z"];
  document.getElementById("target").innerText = "current Target: " + targetName + " (" + targetX + "," + targetY + "," + targetZ + ")";
  document.getElementById("inputX").value = targetX;
  document.getElementById("inputY").value = targetY;
  document.getElementById("inputZ").value = targetZ;

  var closestCity = cityInfo();
  var X = data.Regions[region].Cities[closestCity[1]].location["X"];
  var Y = data.Regions[region].Cities[closestCity[1]].location["Y"];
  var Z = data.Regions[region].Cities[closestCity[1]].location["Z"];

  var Xdiff = targetX - X;
  var Ydiff = targetY - Y;
  var Zdiff = targetZ - Z;

  var degree = (Math.atan2(Xdiff, Zdiff) * 180) / Math.PI;
  var directions = ["S", "SSE", "SE", "ESE", "E", "ENE", "NE", "NNE", "N", "NNW", "NW", "WNW", "W", "WSW", "SW", "SSW", "S"];
  var deg2 = (degree + 360) % 360;
  var cnt = 0;
  for (var i = 11.25; i < 360 + 11.25; i += 22.5) {
    if (deg2 < i) {
      break;
    }
    cnt++;
  }

  //コピー
  var str = targetName + " (" + targetX + "," + targetY + "," + targetZ + ")";
  str = str + ": " + closestCity[1] + " (" + Math.round(closestCity[0] * 10) / 10 + " blocks, " + directions[cnt];
  str = str + " (" + Math.round(degree * -10) / 10 + ")";
  if (Xdiff >= 0) str = str + " (X +" + Xdiff;
  else str = str + " (X " + Xdiff;
  if (Zdiff >= 0) str = str + ", Z +" + Zdiff + "))";
  else str = str + ", Z " + Zdiff + "))";
  //console.log(str);
  navigator.clipboard.writeText(str);
  document.getElementById("targetInfo").innerText = str;
}

function resetInput() {
  document.getElementById("inputX").value = "";
  document.getElementById("inputY").value = "";
  document.getElementById("inputZ").value = "";
  document.getElementById("target").innerText = "";
  cityInfo();
}

function splitInput() {
  var input = document.getElementById("input").value.split(/[,]/).join().split(/[\s]/);
  for (item in input) {
    input[item] = parseInt(input[item]);
  }
  document.getElementById("inputX").value = input[0];
  document.getElementById("inputY").value = input[1];
  document.getElementById("inputZ").value = input[2];
  document.getElementById("target").innerText =
    "current Target: (" + document.getElementById("inputX").value + "," + document.getElementById("inputY").value + "," + document.getElementById("inputZ").value + ")";
  cityInfo();
}

function resetCopyInput() {
  document.getElementById("input").value = "";
}

function calculateLevel() {
  var reqLevels = 25;
  var reqXP;
  if (reqLevels <= 16) {
    reqXP = Math.pow(reqLevels, 2) + 6 * reqLevels;
  } else if (reqLevels <= 31) {
    reqXP = 2.5 * Math.pow(reqLevels, 2) - 40.5 * reqLevels + 360;
  } else {
    reqXP = 4.5 * Math.pow(reqLevels, 2) - 162.5 * reqLevels + 2220;
  }
  var anvilCount = parseInt(document.getElementById("inputLevel").value);
  var totalXP = reqXP * anvilCount;
  var totalLevel = 0;
  if (anvilCount == 0) {
    totalLevel = 0;
  } else if (anvilCount == 1) {
    totalLevel = reqLevels;
  } else {
    totalLevel = 325 / 18 + Math.sqrt((2 / 9) * (totalXP - 54215 / 72));
  }
  document.getElementById("reqLevel").innerText = anvilCount + " anvils cost " + Math.round(totalLevel * 10) / 10 + " levels";
}

window.onload = async function () {
  data = await (await fetch("./city.json")).json();
  document.getElementById("SelectedRegion").addEventListener("change", function () {
    cityInfo();
    search();
  });

  document.getElementById("calculateButton").addEventListener("click", function () {
    cityInfo();
    document.getElementById("target").innerText =
      "current Target: (" + document.getElementById("inputX").value + "," + document.getElementById("inputY").value + "," + document.getElementById("inputZ").value + ")";
  });

  document.getElementById("resetButton").addEventListener("click", resetInput);

  document.getElementById("searchBox").addEventListener("input", search);
  document.getElementById("searchBox2").addEventListener("input", search);
  document.getElementById("searchBox3").addEventListener("input", search);

  document.getElementById("calculateButton2").addEventListener("click", splitInput);

  document.getElementById("resetButton2").addEventListener("click", resetCopyInput);

  document.getElementById("inputLevel").addEventListener("change", calculateLevel);

  document.getElementById("resetInput").addEventListener("click", function () {
    document.getElementById("searchBox").value = "";
    document.getElementById("searchBox2").value = "";
    document.getElementById("searchBox3").value = "";
    search();
  });

  document.getElementById("toggleRegion").addEventListener("click", function () {
    if (document.getElementById("SelectedRegion").value == "King's Valley") {
      document.getElementById("SelectedRegion").value = "Celsian Isles";
    } else if (document.getElementById("SelectedRegion").value == "Celsian Isles") {
      document.getElementById("SelectedRegion").value = "King's Valley";
    }
    search();
  });

  cityInfo();
  search();
};
