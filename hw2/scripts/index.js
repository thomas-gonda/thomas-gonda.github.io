// I generated these lists of names using AI.
const males = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "James",
  "William",
  "Benjamin",
  "Lucas",
  "Henry",
  "Alexander",
  "Mason",
  "Michael",
  "Ethan",
  "Daniel",
  "Jacob",
  "Logan",
  "Jackson",
  "Levi",
  "Sebastian",
  "Mateo",
  "Jack",
  "Owen",
  "Theodore",
  "Aiden",
  "Samuel",
  "Joseph",
  "John",
  "David",
  "Wyatt",
  "Matthew",
  "Luke",
  "Asher",
  "Carter",
  "Julian",
  "Grayson",
  "Leo",
  "Jayden",
  "Gabriel",
  "Isaac",
  "Lincoln",
  "Anthony",
  "Hudson",
  "Dylan",
  "Ezra",
  "Thomas",
  "Charles",
  "Christopher",
  "Jaxon",
  "Maverick",
  "Josiah",
];

const females = [
  "Olivia",
  "Emma",
  "Ava",
  "Charlotte",
  "Sophia",
  "Amelia",
  "Isabella",
  "Mia",
  "Evelyn",
  "Harper",
  "Camila",
  "Gianna",
  "Abigail",
  "Luna",
  "Ella",
  "Elizabeth",
  "Sofia",
  "Emily",
  "Avery",
  "Mila",
  "Scarlett",
  "Eleanor",
  "Madison",
  "Layla",
  "Penelope",
  "Aria",
  "Chloe",
  "Grace",
  "Ellie",
  "Nora",
  "Hazel",
  "Zoey",
  "Riley",
  "Victoria",
  "Lily",
  "Aurora",
  "Violet",
  "Nova",
  "Hannah",
  "Emilia",
  "Zoe",
  "Stella",
  "Everly",
  "Isla",
  "Leah",
  "Lillian",
  "Addison",
  "Willow",
  "Lucy",
  "Paisley",
];

const maleColor = "rgb(167, 218, 231)";
const femaleColor = "rgb(214, 162, 201)";
const coedColor = "rgb(204, 204, 204)";

let type = "Male";
let size = 1;
let sort = "Random";

const teamType = document.getElementById("team-type");
const teamSize = document.getElementById("team-size");
const teamSort = document.getElementById("team-sort");

const namesContainer = document.getElementById("names-container");
const names = document.getElementById("names-text");

const maleImg = document.getElementById("male-img");
const femaleImg = document.getElementById("female-img");
const coedImg = document.getElementById("coed-img");

const changeGender = () => {
  if (teamType.value == "male") {
    namesContainer.style.backgroundColor = maleColor;
    maleImg.hidden = false;
    femaleImg.hidden = true;
    coedImg.hidden = true;
  } else if (teamType.value == "female") {
    namesContainer.style.backgroundColor = femaleColor;
    maleImg.hidden = true;
    femaleImg.hidden = false;
    coedImg.hidden = true;
  } else {
    namesContainer.style.backgroundColor = coedColor;
    maleImg.hidden = true;
    femaleImg.hidden = true;
    coedImg.hidden = false;
  }
};

teamType.addEventListener("change", changeGender);

const namesDiv = document.getElementById("names-text");

const makeTeams = () => {
  let nameList = [];
  if (teamType.value == "male") nameList = males.slice();
  else if (teamType.value == "female") nameList = females.slice();
  else {
    nameList = males.slice();
    nameList.push(...females.slice());
  }

  nameList.sort(() => Math.random() - 0.5);

  const finalNameList = nameList.slice(0, teamSize.value);

  if (teamSort.value == "alphabetical") finalNameList.sort();

  namesDiv.innerHTML = finalNameList
    .map((name, index) => {
      return `<li id="name-${index}">${name}</li>`;
    })
    .join("");
};

document.getElementById("generate-button").addEventListener("click", makeTeams);
