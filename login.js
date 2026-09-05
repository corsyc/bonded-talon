

const VALID_USERNAME_HASH = "0ab465757596dc49a803b10a2e4a683a7cbbc0d6432a992eeafdc8d7f0016ab2"; // MaatZikora
const VALID_PASSWORD_HASH = "1fee4de71d0983d0df739c4189498454078c6a2f496185bc57205627027c0f12"; // EIZikora

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const [userHash, passHash] = await Promise.all([
    sha256(username),
    sha256(password),
  ]);

  if (userHash === VALID_USERNAME_HASH && passHash === VALID_PASSWORD_HASH) {
    sessionStorage.setItem("equityInquiryAuth", "granted");
    window.location.href = "files.html";
  } else {
    errorMsg.textContent = "ACCESS DENIED — credentials not recognized.";
  }
});
