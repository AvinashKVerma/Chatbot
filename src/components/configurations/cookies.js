const setCookie = (name, value) => {
  const cookieValue = encodeURIComponent(value);
  document.cookie = `${name}=${cookieValue}; path=/; SameSite=None; Secure`;
};

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

function clearCookie(name) {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() - 1); // Set the date to the past year
  const cookieValue =
    encodeURIComponent("") + "; expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + cookieValue + "; path=/";
}

// Function to set a user cookie
function setUserCookie(name, userObject, days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const userValue =
    encodeURIComponent(JSON.stringify(userObject)) +
    (days ? "; expires=" + expirationDate.toUTCString() : "");
  document.cookie = name + "=" + userValue + "; path=/";
}

// Function to get the user object from the cookie
function getUserFromCookie(name) {
  const userValue = getCookie(name);
  if (userValue) {
    try {
      return JSON.parse(decodeURIComponent(userValue));
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }
  return null;
}

export { setCookie, getCookie, clearCookie, getUserFromCookie, setUserCookie };
