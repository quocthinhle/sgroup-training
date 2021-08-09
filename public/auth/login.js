console.log("Login page")

document.getElementById("loginForm").addEventListener("submit", async () => {
	event.preventDefault(); // Motherfucker i forgot it. Cost me 3 hours to figure it out.

	const username = document.getElementById("user").value;
	const password = document.getElementById("user_password").value;

	console.log(username);
	console.log(password);

	const request = {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password
		})
	};

	const response = await fetch("/api/auth/login", request);
	if (!response.ok) {
		alert("Authorized failed");
	} else {
		const data = await response.json();
		localStorage.setItem('user', JSON.stringify(data));
		window.location.href = "/";
		return;
	}
})

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
	});
	console.log("Signed out")
}

async function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;

	const response = await fetch('/api/auth/google/login', {
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({token: id_token})
	});

	signOut();
	console.log(id_token);

	if (response.ok) {
		const data = await response.json();
		const token = data["user_token"];
		localStorage.setItem("user", token);
		location.href = "/";
		return;
	} else {
		const {data} = await response.json();
		console.log(data);
		localStorage.setItem("trans-inf", JSON.stringify(data));
		location.href = "/register";
	}


}