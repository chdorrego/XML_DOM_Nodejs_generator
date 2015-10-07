var fs = require('fs');
var DOM = require('xmldom');
var XMLSerializer = DOM.XMLSerializer; //Tranform to XML
var DOMImplementation = require('xmldom').DOMImplementation; //Create document root

//Module files created
var randomData = require('./randomData');
var familyData = require('./familyData'); //Obtein the last name and roles of a family base in the max number max_afectados 


//Paths from files with data to show 
//var path_names="nombres.xml"; <- randomData.js
//var path_last_names="apellidos.xml"; <-randomData.js

//
var args = process.argv.slice(2); // Get arguments from command line 
if (args.length == 4) {
	var num_crisis = parseInt(args[0]); //Numero de crisis - Number of 'crisis'
	var num_familia = parseInt(args[1]); //Numero de familias por crisis - Number of 'familias' by 'crisis'
	var max_afectados = parseInt(args[2]); //Numero maximo de afectados por familia - Max number of 'afectados' by family
	var prefix = args[3]; //Prefijo agredado en los archivos exportados - Prefix added in the export files

} else {
	console.log('No parameters send');
	//***********************************************************
	//Variables define by user 
	var num_crisis = 30; //Numero de crisis - Number of 'crisis'
	var num_familia = 100; //Numero de familias por crisis - Number of 'familias' by 'crisis'
	var max_afectados = 6; //Numero maximo de afectados por familia - Max number of 'afectados' by family
	var prefix = 'crisisprueba_'; //Prefijo agredado en los archivos exportados - Prefix added in the export files
	//***********************************************************

}


var name_type_location_crisis = [
	//The folowing data no represent the actual situation in the world - Sample data
	//Crisis name [0] ---------------------Crisis Type [1] --------------Crisis location [2]
	['Crisis fronteriza con Venezuela', 'Desplazamiento forzado', 'Cúcuta'],
	['Crisis humanitaria por falta de agua y alimentos en la Guajira', 'Escasez de recursos', 'Guajira'],
	['Crisis de acceso al agua en Siria', 'Escasez de recursos', 'Palmyra'],
	['Crisis de refugiados en europa', 'Migración', 'Grecia'],
	['Sequía prolongada en Somalia', 'Escasez de recursos', 'Mogadiscio'],
	['Niños en peligro en Sudan del sur', 'Conflicto', 'Omdurmán']
];

var cities = ['Caracas', 'Bogota', 'Damasco', 'Jartum', 'Acarnas'];

for (var j = 0; j < num_crisis; j++) {


	//Create a new instance of a document XML
	var document = new DOMImplementation().createDocument("", "crisis", null); //Create root of document

	//Random crisis - Name and Type
	var random_crisis = Math.floor(Math.random() * (name_type_location_crisis.length));
	var crisis_name = name_type_location_crisis[random_crisis][0];
	var crisis_type = name_type_location_crisis[random_crisis][1];
	var crisis_location = name_type_location_crisis[random_crisis][2];
	//console.log(random_crisis);
	//console.log(crisis_name + ' '+ ' '+crisis_type+' '+ crisis_location)

	var data = []; //Array that contain  data to add in the node
	data['nombre'] = crisis_name;
	data['tipo'] = crisis_type;
	data['fecha'] = familyData.randomDate(new Date(2014, 12, 1), new Date());
	data['lugar'] = crisis_location;

	var elem; //represent each tag to add 
	for (var key in data) {
		elem = document.createElement(key);
		elem.textContent = data[key];
		document.documentElement.appendChild(elem);
	}

	var afectados = document.createElement("afectados");
	document.documentElement.appendChild(afectados);

	for (var k = 0; k < num_familia; k++) { //Generate families by crisis 
		generateFamily(afectados, max_afectados);
	}

	var serializedXML = new XMLSerializer().serializeToString(document);
	//console.log(serializedXML);
	//fs.writeFileSync('./output/'+prefix+j+'.xml', serializedXML, 'utf8');

	//Save file
	fs.writeFile('./output/' + prefix + j + '.xml', serializedXML, 'utf8', function(err) {
		if (err) return console.log(err);
		console.log('Write file > ' + prefix + j + '.xml');
	})
}
//Generate a family 
function generateFamily(parent_node, max_afectados) {
	var rol_gender = {
		'Padre': 'M',
		'Madre': 'F',
		'Hijo': 'M',
		'Hija': 'F'
	}; //Gender by role - Requered to set a corret name

	var familia = document.createElement("familia");
	parent_node.appendChild(familia);

	var random_afectados = Math.floor(Math.random() * (max_afectados - 2 + 1) + 2); //Number of 'afectados' by family. Less than 2 is not posible (does not exist child without parent and vice versa)
	var f_composition = familyData.getRandomFamilyComposition(random_afectados); //==Roles, Family composition
	var f_last_names = familyData.getFamilyLastNames(f_composition); //Family roles
	var f_birth_days = familyData.getBirthDays(f_composition); //Family birth days

	for (var i = 0; i < random_afectados; i++) {
		var role = f_composition[i];
		var last_name = f_last_names[i];
		var gender = rol_gender[role];

		//Born city
		var random_city = Math.floor(Math.random() * (cities.length));
		var city = cities[random_city];

		var values_afectado = []; //Values of node afectado
		values_afectado['nombres'] = randomData.getRandomName(gender);
		values_afectado['apellidos'] = last_name;
		values_afectado['rol'] = role;
		values_afectado['fecha-nacimiento'] = f_birth_days[i]; //'1984-08-10';
		values_afectado['lugar-nacimiento'] = city;
		values_afectado['lugar-procedencia'] = crisis_location;

		var afectado = document.createElement("afectado");
		var elem;
		for (var key in values_afectado) {
			elem = document.createElement(key);
			elem.textContent = values_afectado[key];
			afectado.appendChild(elem);
		}

		familia.appendChild(afectado);
	}
}