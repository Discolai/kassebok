// Input format should be yyyy-mm-dd
// Outputs dd-mm-yyyy
function formatDate(d) {
  return d.substring(8, 10) + d.substring(4, 8)+d.substring(0, 4)
}

module.exports = {formatDate};
