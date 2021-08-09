function validate(email, password, confirm_password) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (password.length < 5 || password !== confirm_password || !re.test(email)) return false;
	return true;
}

document.getElementById("register-form").addEventListener("submit", async () => {
	event.preventDefault();

	const email = document.getElementById("user_email").value;
	const password = document.getElementById("user_password").value;
	const confirm_password = document.getElementById("confirm_password").value;
	const fullname = document.getElementById("fullname").value;
	const username = document.getElementById("user_username").value;
	

	if (!validate(email, password, confirm_password)) return;

	const request = {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			fullname,
			username,
			email,
			password,
			confirm_password
		})
	};

	console.log(request.body);

	const response = await fetch("/api/auth/register", request);
	if (!response.ok) {
		alert("Register failed");
	} else {
		window.location.href = "/";
		return;
	}
})

window.addEventListener("load", (e) => {
	e.preventDefault();
	const data = JSON.parse(localStorage.getItem("trans-inf"));
	if (data) {
		document.getElementById("user_email").value = data.email;
		document.getElementById("fullname").value = data.fullname;
		document.getElementById("user_email").disabled = true;
		localStorage.setItem("trans-inf", "");
	}
	return;
})