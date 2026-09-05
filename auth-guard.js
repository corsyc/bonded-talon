

if (sessionStorage.getItem("equityInquiryAuth") !== "granted") {
  window.location.href = "index.html";
}

function endSession() {
  sessionStorage.removeItem("equityInquiryAuth");
  window.location.href = "index.html";
}
