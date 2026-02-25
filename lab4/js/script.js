// 1) City, longitude and latitude are updated when entering a zip code (10 pts)
// 2) A "Zip code not found" message is displayed next to its text box, if that's the case (10 pts)
// 3) The list of counties is updated properly when selecting a State (10 pts)
// 4) Upon typing the username, a color-coded message indicates whether it is available or not (10 pts)
// 5) Upon clicking on the Password text box, a suggested password is displayed (10pts)
// 6) The list of all US states is displayed from the corresponding Web API (10 pts)
// 7) Page has a nice look and feel (uses Bootstrap or includes 20 CSS rules) (10 pts)

// When clicking on the "Submit" button:
// 1) There is validation for Username having at least 3 characters   ( 10 pts)
// 2) There is validation for Password having at least 6 characters    (10 pts)
// 3) There is validation for Password matching "Retype Password"  (10 pts)

//1
const zipElem = document.getElementById("zip");
const zipErrorElem = document.getElementById("zip-error-msg");
const cityElem = document.getElementById("city");
const latElem = document.getElementById("latitude");
const longElem = document.getElementById("longitude");

zipErrorElem.style.color = "red";

async function getLocationData() {
  const zipCode = zipElem.value;
  if (zipCode.length != 5) return;

  const url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    zipErrorElem.hidden = result;

    cityElem.textContent = `City: ${result.city}`;
    latElem.textContent = `Latitude: ${result.latitude}`;
    longElem.textContent = `Longitude: ${result.longitude}`;

    return result;
  } catch (error) {
    console.error(error.message);
  }
}

zipElem.addEventListener("change", getLocationData);

//2
const suggestedPasswordElem = document.getElementById("suggested-password");
const passwordElem = document.getElementById("password");
const dataList = document.getElementById("userList");

async function getPassword() {
  if (passwordElem.value.length != 0) return;
  const url = "https://csumb.space/api/suggestedPassword.php?length=8";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    suggestedPasswordElem.textContent = `Suggested Password: ${result.password}`;
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

passwordElem.addEventListener("click", getPassword);

//3
const username = document.getElementById("username");
const usernameStatus = document.getElementById("username-status");

async function getUsernameStatus() {
  const url =
    "https://csumb.space/api/usernamesAPI.php?username=" + username.value;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    if (result.available) {
      usernameStatus.style.color = "green";
      usernameStatus.textContent = "Username Status: Available";
    } else {
      usernameStatus.style.color = "red";
      usernameStatus.textContent = "Username Status: Not Available";
    }
  } catch (error) {
    console.error(error.message);
  }
}

username.addEventListener("change", getUsernameStatus);

//E1
const statesElem = document.getElementById("states");

async function getStates() {
  const url = "https://csumb.space/api/allStatesAPI.php";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    for (const state of result) {
      const option = document.createElement("option");

      option.value = state.usps;
      option.text = state.usps;

      statesElem.appendChild(option);
    }
  } catch (error) {
    console.error(error.message);
  }
}

getStates();

const countyElem = document.getElementById("counties");

async function getCounties() {
  const url =
    "https://csumb.space/api/countyListAPI.php?state=" + statesElem.value;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    for (const county of result) {
      const option = document.createElement("option");

      option.value = county.county;
      option.text = county.county;

      countyElem.appendChild(option);
    }
  } catch (error) {
    console.error(error.message);
  }
}

statesElem.addEventListener("change", getCounties);

//E2
const errorElem = document.getElementById("error-msg");
errorElem.style.color = "red";
errorElem.textContent = "The password has less than 6 characters";

const checkPassword = () => {
  const word = passwordElem.value;

  if (word.length < 6) {
    errorElem.hidden = false;
  } else {
    errorElem.hidden = true;
  }
};

passwordElem.addEventListener("change", checkPassword);
