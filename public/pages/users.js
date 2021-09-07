var totalUser;

function getUserToken() {
	const token = JSON.parse(localStorage.getItem("user")).accessToken;
	return token;
}

async function getTotalUser() {
	const response = await fetch("/api/user/count", {
		method: "GET",
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json',
			'Authorization': 'Bearer ' + getUserToken()
		}
	});

	if (response.ok) {
		const data = await response.json();
		totalUser = data.total;
	} else {
		alert("You dont have permission to access this resources");
		location.href = "/";
		return;
	}
}

function refreshTable() {
	let bodyRef = document.getElementById("user_table").getElementsByTagName("tr");
	for (let i = 1; i < bodyRef.length; ++i) {
		bodyRef[i].innerHTML = "";
	}
}

function addRow(tableRef, user, i) {
	let newRow = tableRef.insertRow(-1);

	let stt = newRow.insertCell(0)
	let id = newRow.insertCell(1);
	let username = newRow.insertCell(2);
	let fullname = newRow.insertCell(3);
	let roles = newRow.insertCell(4);
	let status = newRow.insertCell(5);

	stt.appendChild(document.createTextNode(i));
	id.appendChild(document.createTextNode(user.id));
	username.appendChild(document.createTextNode(user.username));
	fullname.appendChild(document.createTextNode(user.full_name));
	roles.appendChild(document.createTextNode(user.status));
	status.appendChild(document.createTextNode(user.roles_name));
}

async function loadDataTable(choosenPage, perPage, sortType, searchContent, i) {
	let tableRef = document.getElementById("user_table");
	const queryString = `/api/user?page=${choosenPage}&perPage=${perPage}&sortType=${sortType}&searchContent=${searchContent}`;
	console.log(queryString);

	const response  = await fetch(queryString, {
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json',
			'Authorization': 'Bearer ' + getUserToken()
		},
		method: "GET"
	});

	if (!response.ok) {
		alert("You dont have permission to access this resources");
		location.href = "/";
		return;
	}
	const data = await response.json();
	const propertiesValue = Object.values(data);
	refreshTable();
	propertiesValue.forEach(user => {
		addRow(tableRef, user, i++);
	});
}

function invokeTable(e, choosenPage = 1, offset = 1) {
	const perPage = document.getElementById("perPage").value;
	const sortType = document.getElementById("sort-type").value;
	const searchContent = document.getElementById("searchContent").value;
	loadDataTable(choosenPage, perPage, sortType, searchContent, offset);
}

document.getElementById("apply-btn").addEventListener("click", (e) => {
	e.preventDefault();
	invokeTable(e);
});


window.addEventListener("load", async (e) => {
	await getTotalUser();
	invokeTable(e);
}, false);


let pageItem = document.getElementsByClassName("page-item");
for (let i = 0; i < pageItem.length; ++i) {
	pageItem[i].addEventListener("click", function (e) {
		const page = e.path[1].firstChild.firstChild.data;
		let previousPage = document.getElementsByClassName("page-item active")[0];
		previousPage.classList.remove("active");
		this.classList.add("active");
		const offset = document.getElementById("perPage").value*(page - 1) + 1;
		invokeTable(e, page, offset);
	})
}