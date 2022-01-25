// aggiunge :active al touchscreen
window.onload = function() {
	if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
		document.body.addEventListener('touchstart', function() {}, false);
	}
};

// controlla che input abbia strettamente un numero al suo interno
function checkText() {
	var input = document.getElementById('text');

	if (input.value == '' || input.value <= 0) {
		input.classList.add('check');
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
	var container_input = document.getElementById('container-input');
	var container_btn_rem = document.getElementById('container-btn-rem');
	var container_btn_add = document.getElementById('container-btn-add');

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

			// se c'è almeno una riga con dei numeri allora mostra la tabella e il bottone rimuovi
			if (i == 1) {
				//mostro la tabella e il bottone rimuovi se esiste almeno una riga + gestione animazione con timer
				setTimeout(() => {
					container_btn_rem.classList.add('show'); // mostra btn-rem
					container_btn_rem.classList.remove('hide');
				}, 300);
				// animazione bottoni
				container_btn_add.style.width = 'calc(100%/3)';
				container_input.style.width = 'calc(100%/3)';
			}
		}
	}
}

// SE il numero è nella tabella decrementa la quantità di 1
// SE la quantità = 0 nasconde la tabella e il tasto rimuovi
function elimina() {
	var table = document.getElementById('table');
	var input = document.getElementById('text');
	var container_input = document.getElementById('container-input');
	var container_btn_rem = document.getElementById('container-btn-rem');
	var container_btn_add = document.getElementById('container-btn-add');

	if (checkText()) {
		input.classList.remove('check');
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
			input.classList.add('check');
			input.focus();
			input.value = '';
		}

		// se non ci sono più elementi nella tabella, nasconde sia la tabella che il tasto rimuovi
		var i = table.rows.length;
		if (i == 1) {
			// nascondo la tabella e il bottone rimuovi se non esiste nessun elemento nella tabella
			container_btn_rem.classList.remove('show');
			container_btn_rem.classList.add('hide');
			setTimeout(() => {
				container_btn_add.style.width = 'calc(100%/2)';
				container_input.style.width = 'calc(100%/2)';
			}, 300);
		}
	}
}
