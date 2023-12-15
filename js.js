const tombola = document.getElementById('tombola');

const nDiCaselle = 100

tombola.innerHTML = ""

for (var i = 1; i <= nDiCaselle ; i++) {
	const casella = document.createElement('div');
	const span = document.createElement('span');
	casella.className = 'casella'
	casella.id = i;
	casella.appendChild(span);
	tombola.appendChild(casella);
}


document.querySelectorAll('.casella').forEach(function (casella) {
    casella.addEventListener('click', function () {
        // Toggle the 'checked' class on click
        casella.classList.toggle('checked');

        const span = casella.getElementsByTagName('span')[0]
        // Display the ID or custom prop when checked
        if (casella.classList.contains('checked')) {
            span.innerHTML = casella.id;
        } else {
            span.innerHTML = '';
        }
    });
});

doToggle = function(numeroCasella = false) {

	let nCasella = document.getElementById('nCasella').value
	if(numeroCasella){
		nCasella = numeroCasella
	}
	if(nCasella <= 0 || nCasella > 100){
		return "Inserisci un numero valido"
	}
	
	const casella = document.getElementById(nCasella)

	if(casella.classList.contains('checked')){
		return `La casella numero ${nCasella} è gia stata estratta!`
	}

	 const span = casella.getElementsByTagName('span')[0]
	 casella.classList.toggle('checked');
	 span.innerHTML = casella.id;
	 return false;
}

function toggleCasella(){
	const error = doToggle()
	if(error){
		alert(error)
	}
}

toggleRandom = function(){
	const casellaElements = document.getElementsByClassName('casella');
	const casellaArray = Array.from(casellaElements);

	const caselleNonSegnate = casellaArray.filter((casella) => !casella.classList.contains('checked'));

	if(caselleNonSegnate.length === 0){
		alert('Il gioco è finito!');
		return
	}

	
	let keepTrying = true;
	while(keepTrying){
		const casellaRandom = getRandomNumber(caselleNonSegnate.length);
		keepTrying = doToggle(caselleNonSegnate[casellaRandom-1].id);
	}
}


function getRandomNumber(maxNumber = 100) {
    return Math.floor(Math.random() * maxNumber) + 1;
}