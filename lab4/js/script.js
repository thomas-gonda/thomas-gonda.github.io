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

const checkPassword = () => {
  const word = passwordElem.value;

  if (word.length < 6) {
    errorElem.textContent = "The password has less than 6 characters";
    errorElem.hidden = false;
  } else {
    errorElem.hidden = true;
  }
};

passwordElem.addEventListener("change", checkPassword);

const retypePasswordElem = document.getElementById("retype-password");
const submitBtn = document.getElementById("submit-btn");
const successMsg = document.getElementById("success-msg");
successMsg.style.color = "green";

const submitForm = () => {
  if (username.value.length < 4) {
    errorElem.textContent = "The username has less than 4 characters.";
    errorElem.hidden = false;
    successMsg.hidden = true;
    return;
  }

  if (passwordElem.value.length < 6) {
    errorElem.textContent = "The password has less than 6 characters.";
    errorElem.hidden = false;
    successMsg.hidden = true;
    return;
  }

  if (passwordElem.value != retypePasswordElem.value) {
    errorElem.textContent = "The password was not retyped correctly.";
    errorElem.hidden = false;
    successMsg.hidden = true;
    return;
  }

  successMsg.hidden = false;
  errorElem.hidden = true;
};

submitBtn.addEventListener("click", submitForm);
