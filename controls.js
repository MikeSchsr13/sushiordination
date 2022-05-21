//controlla localstorage
function checkLocalStorage(){
	if (localStorage.table){
		document.querySelector('#table').innerHTML = localStorage.table;
		document.getElementById("btn-elimina-tabella").style.display = "block";
	}
}

//svuota localstorage
function deleteTable(){
    localStorage.clear();
    location.reload();
}

// controlla che input abbia strettamente un numero al suo interno
function checkText() {
	var input = document.getElementById('text');

	if (input.value == '' || input.value <= 0) {
		input.focus();
		input.value = '';
		return false;
	} else {
		return true;
	}
}

// SE il numero non è già nella tabella aggiunge una nuova riga
// ALTRIMENTI incrementa la quantità
function aggiungi() {
	var table = document.getElementById('table');
	var input = document.getElementById('text');

	if (checkText()) {
		input.classList.remove('check');
		var check = false;
		var cellNum;
		var cellQua;

		// controlla che il numero sia nella tabella per incrementarlo altrimenti esce e lo aggiunge alla tabella
		for (var j = 1; j < table.rows.length; j++) {
			cellNum = table.rows[j].cells[0]; // preleva il numero dalla tabella
			cellQua = table.rows[j].cells[1]; // preleva la quantità dalla tabella

			if (cellNum.innerHTML == input.value) {
				++cellQua.innerHTML;
				check = true;
				input.focus();
				input.value = '';
			}
		}

		// aggiunge in tabella una nuova riga con i nuovi dati
		if (!check) {
			var i = table.rows.length; // preleva il numero di righe della tabella
			var row = table.insertRow(i);
			cellNum = row.insertCell(0).innerHTML = input.value;
			cellQua = row.insertCell(1).innerHTML = 1;

			input.focus();
			input.value = '';
		}
        localStorage.table = document.querySelector('#table').innerHTML.trim()

		checkLocalStorage();
	}
    
}

// SE il numero è nella tabella decrementa la quantità di 1
// SE la quantità = 0 nasconde la tabella e il tasto rimuovi
function elimina() {
	var table = document.getElementById('table');
	var input = document.getElementById('text');

	if (checkText()) {
		var check = false;
		var cellNum;
		var cellQua;

		// cerca se il numero è presente nella tabella
		for (var j = 1; j < table.rows.length; j++) {
			cellNum = table.rows[j].cells[0];
			cellQua = table.rows[j].cells[1];

			// se è presente decrementa la quantità
			if (cellNum.innerHTML == input.value) {
				check = true;
				--cellQua.innerHTML;
				// se la quantità di un numero è 0 allora toglie la riga dalla tabella
				if (cellQua.innerHTML == 0) table.rows[j].remove();
				input.focus();
				input.value = '';
			}
		}

		// Se il numero non è presente nella tabella
		if (!check) {
			// alert("Numero non presente nella tabella 🤷🏻‍♂️");
			input.focus();
			input.value = '';
		}

        localStorage.table = document.querySelector('#table').innerHTML.trim();

		if(table.rows.length == 1)
			deleteTable();
	}
}
