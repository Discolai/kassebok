// Input format should be yyyy-mm-dd
// Outputs dd-mm-yyyy
function formatDate(d) {
  return d.substring(8, 10) + d.substring(4, 8)+d.substring(0, 4)
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function getCsrfToken() {
  const cookie = getCookie("jwt01")
  if (!cookie) {
    return;
  } else {
    const token = JSON.parse(atob(cookie.split(".")[1]))._csrf;
    return token;
  }
}

module.exports = {formatDate, getCookie, getCsrfToken};
