var fs = require('fs');
var DOM = require('xmldom');
var parser = DOM.DOMParser; //Transform string to XML DOM 

var path_names='nombres.xml';
var path_last_names='apellidos.xml';

//Read 'Nombres' and 'Apellidos' structures
var doc_names = fs.readFileSync(path_names, 'utf8');
doc_names = new parser().parseFromString(doc_names); //document  
var names =	doc_names.getElementsByTagName('nombre');

var doc_last_names = fs.readFileSync(path_last_names, 'utf8');
doc_last_names = new parser().parseFromString(doc_last_names);
var last_names = doc_last_names.getElementsByTagName('apellido');

//Select a random Name with the attribute 'genero'=gender
var size_names= names.length;
function getRandomName(gender){
	while (true){
		var random = Math.floor(Math.random()*(size_names));
		var attribute = names[random].getAttribute('genero');
		//console.log(attribute);
			if (attribute==gender){
				return names[random].firstChild.nodeValue;
			}
	}
}

//Select a random Last Name from NodeList
var size_last_n= last_names.length;
function getRandomLastName(){
	var random = Math.floor(Math.random()*(size_last_n));
	return last_names[random].firstChild.nodeValue;
}

module.exports.getRandomLastName=  getRandomLastName;
module.exports.getRandomName = getRandomName;

//console.log(getRandomName('M'));

/*
var prueba = doc_names.documentElement.childNodes.getAttribute('genero');


var XMLSerializer = DOM.XMLSerializer; 
var serializedXML = new XMLSerializer().serializeToString(prueba);
console.log(serializedXML);
*/
