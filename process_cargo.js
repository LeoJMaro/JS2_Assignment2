let dataTable = null;
let dataTable2 = null;
let totalWeight = 0;
let fullCargo = 0;

document.addEventListener("DOMContentLoaded",() => {
	document.querySelector("#button_id").addEventListener("click", cargo_processing);
	document.querySelector("#button_id2").addEventListener("click", cargo_processing_clear);
	initData();


function initData(){

	const BoxCar = document.querySelector("#BoxCarID");
	const EmptyWeight = document.querySelector("#EmptyWeight");
	const MaxWeight = document.querySelector("#MaxWeight");
	const TotalWeight = document.querySelector("#TotalWeight");

	BoxCar.value = "BX500";
	EmptyWeight.value = 15000;
	MaxWeight.value = 105000;
	TotalWeight.value = 0;
	}

function creatTableCargo(){
	const cargoTable = document.createElement("table");
	let row = document.createElement("tr");
	createHeader(cargoTable,row)
	cargoTable.createTBody();
	return cargoTable;
}

function createManifest(){
	const manifestTable = document.createElement("table");
	let row = document.createElement("tr");
	let th = document.createElement("th");
	createHeaderManifest(manifestTable,row, th)
	manifestTable.createTBody();
	createFooter(manifestTable, row, th);
	return manifestTable;
}
function createHeaderManifest(cargoTable, row, th){
	const headerManifest= cargoTable.createTHead();
	row = headerManifest.insertRow();


	th.innerText = "TransportID";
	row.append(th);
	th = document.createElement("th");

	th.innerText = "Description";
	row.append(th);
	th = document.createElement("th");

	th.innerText = "Weight";
	row.append(th);
}
function createHeader(cargoTable, row){
	const header= cargoTable.createTHead();
	row = header.insertRow();

	let th = document.createElement("th");
	th.innerText = "TransportID";
	row.append(th);
	th = document.createElement("th");

	th.innerText = "Description";
	row.append(th);
	th = document.createElement("th");

	th.innerText = "Weight";
	row.append(th);
	th = document.createElement("th");

	th.innerText = "Status";
	row.append(th);
}

function createFooter(table, row, th){
	const footer = table.createTFoot();
	row = footer.insertRow();
	row.insertCell();
	const cell = row.insertCell();
	cell.innerText = "Total Cargo Weight:";
	row.insertCell();
	return document.body.append(table);
}
function addDataToTable(table, transportId, description, weight) {
	const body = table.tBodies[0];
	const row = body.insertRow();
	row.insertCell().innerText = transportId;
	row.insertCell().innerText = description;
	row.insertCell().innerText = weight;
	row.insertCell().innerText = document.querySelector("#BoxCarID").value;
	return row;
}
function addDataToManifestTable(table, transportId, description, weight) {
	const body = table.tBodies[0];
	const row = body.insertRow();
	row.insertCell().innerText = transportId;
	row.insertCell().innerText = description;
	row.insertCell().innerText = weight;
	row.insertCell().innerText = document.querySelector("#BoxCarID").value;
	return row;
}

function checkFields(field, restrictions) {
	field.nextSibling.textContent = "";
	if (field.value !== restrictions){
		return true
	}
	else {
		field.nextSibling.textContent = "Please Enter a input";
	}
}

function checkNaN(field) {
	if (isNaN(field.value)){
	field.nextSibling.textContent = "Please enter a Number";
	}
	else {
		return true
	}
}
function checkValue(field, min, max) {
	if ( parseInt(field.value) > parseInt(max)) {
		field.nextSibling.textContent = "Exceeds Weight Limit”"
	} else if (parseInt(field.value) < min){
		field.nextSibling.textContent = "Cargo is a negative number"
	} else {
		return true
	}
}

function cargo_processing(e){
	e.preventDefault()
	const MaxWeight = document.querySelector("#MaxWeight");
	const cargoWeight = document.querySelector("#CargoWeight");
	const transportId = document.querySelector("#TransportID");
	const description = document.querySelector("#Description");
	const truckWeight = document.querySelector("#EmptyWeight");
	const currentWeight= document.querySelector("#TotalWeight");
	const x = checkFields(cargoWeight, "");
	const y = checkFields(transportId, "");
	const z = checkFields(description, "");
	const w = checkNaN(cargoWeight);
	const v = checkValue(cargoWeight, 1, MaxWeight.value);
	if (w && x && y && z && v) {
		fullCargo += parseInt(cargoWeight.value);
		totalWeight = parseInt(truckWeight.value) + fullCargo;
		currentWeight.value = totalWeight;
		if (dataTable === null) {
			dataTable2 = createManifest();
			dataTable = creatTableCargo();
		}

		addDataToManifestTable(dataTable2, transportId.value, description.value, cargoWeight.value);
		addDataToTable(dataTable, transportId.value, description.value, cargoWeight.value);
		dataTable2.tFoot.rows[0].cells[2].innerText = fullCargo;
	}
}

function cargo_processing_clear(e){
}
	});