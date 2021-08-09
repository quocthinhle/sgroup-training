function logout() {
	localStorage.setItem("user", "");
	window.location.href = "/";
	return;
}

document.getElementById("logout-btn").addEventListener("click", logout);