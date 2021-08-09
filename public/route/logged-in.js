const data = localStorage.getItem("user");

if (!data) {
	location.href = "/login";
}