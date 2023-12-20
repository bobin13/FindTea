window.addEventListener("load", function () {
  init();
});
const table = document.getElementById("listTable");
function init() {
  document.getElementById("loadingText").style.display = "none";
  table.style.display = "none";

  //Search Button click function
  document.getElementById("btnSearch").addEventListener("click", find);
  document
    .querySelector("#textFieldSearch")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        find();
      }
    });
}
function findAll() {
  fetch("http://10.0.0.168:8080/stores", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fillTable(data);
      table.style.display = "initial";
    });
}
function find() {
  let inputString = document.getElementById("textFieldSearch");

  if (inputString.value.length >= 3) {
    document.getElementById("loadingText").style.display = "initial";

    fetch("http://10.0.0.168:8080/stores/" + inputString.value.toLowerCase(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fillTable(data);
        document.getElementById("loadingText").style.display = "none";
        table.style.display = "initial";
      });
  }
  inputString.value = "";
}
function getDirectionLink(address) {
  const myArray = address.split(" ");
  let url = "https://www.google.com/maps/search/tims+";
  for (let i = 0; i < myArray.length; i++) {
    if (i != 0) {
      url += "+";
    }
    url += myArray[i];
  }
  return url;
}
function fillTable(json) {
  console.log("Entered fillTable method!");
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  json.forEach((obj) => {
    tbody.innerHTML +=
      '<tr class="table-row" id="' +
      obj["id"] +
      '">' +
      "<td>" +
      obj["name"] +
      "</td>" +
      "<td>" +
      obj["city"] +
      "</td>" +
      "<td><a href='" +
      getDirectionLink(obj["address"]) +
      "'>" +
      obj["address"] +
      "</a></td>" +
      "<td>" +
      obj["rating"] +
      "</td>" +
      "</tr>";
    console.log(getDirectionLink(obj["address"]));
  });

  document.querySelectorAll(".table-row").forEach((elem) =>
    elem.addEventListener("click", function () {
      console.log(this.id);
    })
  );
}
