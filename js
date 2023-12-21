const tombola = document.getElementById('tombola');

const nDiCaselle = 90

tombola.innerHTML = ""

const leftDistance = 2;
let topDistance = 0;
const topDistanceCoefficent = 2;

for (var i = 1; i <= nDiCaselle ; i++) {
	const casella = document.createElement('div');
	const span = document.createElement('span');
	casella.className = 'casella'
	casella.id = i;
	const casellaId = parseInt(casella.id);
	casella.style.left = `${leftDistance}rem`;
	casella.style.top = `${topDistance}rem`;
	if(isUnitFiveOrLess(casellaId)){
		casella.style.left = `-${leftDistance}rem`;
	}
	if(isMultipleOfThirty(casellaId)){
		topDistance += topDistanceCoefficent;
	}
	casella.classList.add('first');
	casella.setAttribute('data-i',casellaId);
	
	casella.appendChild(span);
	tombola.appendChild(casella);
}

function isUnitFiveOrLess(x) {
    const lastTwoDigits = x % 10;

    // Check if the last two digits are 5 or less and x is not a multiple of 10
    return lastTwoDigits <= 5 && x % 10 !== 0;
}
function isMultipleOfThirty(x){
	return x % 30 == 0;
}

function getGroupOfThirty(x){
	return parseInt( x / 30 );
}
function isUnitOne(x) {
    return firstDigit = x % 10 == 1;
}



document.querySelectorAll('.casella').forEach(function (casella) {
    casella.addEventListener('click', function () {

    	const span = casella.getElementsByTagName('span')[0]
    	if (casella.classList.contains('checked')) {
    		if(confirm(`La casella ${casella.id} è già segnata, desideri rimuoverla?`)){
    			span.innerHTML = '';
    		}
    		else{
    			return
    		}
        } else {
            span.innerHTML = casella.id;
        }

        // Toggle the 'checked' class on click
        casella.classList.toggle('checked');

      
        // Display the ID or custom prop when checked

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
	let casellaRandom
	while(keepTrying){
		casellaRandom = getRandomNumber(caselleNonSegnate.length);
		keepTrying = doToggle(caselleNonSegnate[casellaRandom-1].id);
	}
	alert(`Estratta la casella numero ${caselleNonSegnate[casellaRandom-1].id}`)
}


function getRandomNumber(maxNumber = 100) {
    return Math.floor(Math.random() * maxNumber) + 1;
}