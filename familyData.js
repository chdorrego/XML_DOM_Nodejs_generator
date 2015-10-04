var randomData = require('./randomData');

//A family composition types: 1) Padre-Hijo/a... 2) Madre-Hijo/a.., 3) Padre-Madre-Hijo/a...
//num number of individuals of the family
function getFamilyComposition(type,num){
	var adicional = ['Hijo','Hija'];
	var familyComposition =[];
	if (type==1){
		familyComposition.push('Padre');
	}else if(type==2){
		familyComposition.push('Madre');
	}else{
		familyComposition.push('Padre');
		familyComposition.push('Madre');
	}
	var random;
	while (familyComposition.length<num){
		random = Math.floor(Math.random()*(adicional.length));
		familyComposition.push(adicional[random]);
	}
	return familyComposition;
}

//Math.floor(Math.random() * (max - min + 1) + min);
function getRandomFamilyComposition(num_afectados){
	//if num==2 type 1 or 2
	//if num>=3 type 1, 2 or 3.
	//---- var random_afectados = Math.floor(Math.random() * (max_afectados-2+1) + 2);
	//console.log('random_afectados: '+random_afectados);
	if (num_afectados==2){
		var random_type= Math.floor(Math.random() * (2-1+1) + 1); // Random between 1-2
		//console.log('random_type: '+random_type);
	}else{
		var random_type = Math.floor(Math.random() * (3-1+1) + 1); // Random between 1-2-3
		//console.log('random_type: '+random_type);
	}
	return getFamilyComposition(random_type,num_afectados);
}

//When a parent does not exist the child takes the father or mother last names
//Return a dictiorary with the surnames by roles
//flag=0 indicate that the father/mother exist but does not live with the family - Children get father and mother surnames
//flag=1 indicate that the father/mother does not exist  - Children get parent surname
function getLastNamesDictionary(familyComposition,flag){
	var surnames = {'Padre':[randomData.getRandomLastName(),
							 randomData.getRandomLastName()], //Padre Last name
					'Madre':[randomData.getRandomLastName(),
							 randomData.getRandomLastName()] // Madre last name
					}; 
	if (flag==1){
		if (familyComposition.indexOf('Padre') == -1){ //No father in the family 
			surnames['Hijo']= surnames['Madre']; //Get the mother last names
			surnames['Hija']= surnames['Madre']; //Get the mother last names
		}else if (familyComposition.indexOf('Madre') == -1){//No mother in the family 
			surnames['Hijo']= surnames['Padre']; //Get the father last names
			surnames['Hija']= surnames['Padre']; //Get the father last names
		}else{
			//Get the father last name + mother last name
			surnames['Hijo']= [surnames['Padre'][0], 
							   surnames['Madre'][0]]; 
			surnames['Hija']= [surnames['Padre'][0],
							   surnames['Madre'][0]];
		}
	}else{
		//Get the father last name + mother last name
		surnames['Hijo']= [surnames['Padre'][0], 
						   surnames['Madre'][0]]; 
		surnames['Hija']= [surnames['Padre'][0],
						   surnames['Madre'][0]];
	}
	return surnames;
}

//Return array with the last names of each member of the family
function getFamilyLastNames(familyComposition){
	//Generate random to know if the father/mother exist  (flag value)
	var random = Math.round(Math.random()*1);
	//console.log(random);

	var surnames = getLastNamesDictionary(familyComposition,random);

	//Create a last name array 
	var last_names_array=[];
	for (var i=0;i<familyComposition.length;i++){
		var last_names=surnames[familyComposition[i]];
		last_names_array.push(last_names[0]+' '+last_names[1]);	
	}
	return last_names_array;
}


function randomDate(start, end) {
   var date= new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
   var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = date.getDate().toString();
   return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
}

function getBirthDays(familyComposition){
	var birth_days = [];
	var parent_date=1800; //By defaul - the value no afect the code
	var birdDay;
	for (var i=0;i<familyComposition.length;i++){
		if (familyComposition[i]!= "Hijo" &&  familyComposition[i]!= "Hija"){ //father or  mother
			var parentBirth = randomDate(new Date(1940, 01, 01), new Date(1995,12,31));
			parent_date = new Date(parentBirth);
			birdDay = parentBirth;
		}else{
			var childyear = parent_date.getFullYear() + 17;
			var childBirth= randomDate(new Date(childyear,01,01),new Date());
			birdDay = childBirth;
		}
		birth_days.push(birdDay);
	}
	return birth_days;
}

module.exports.getRandomFamilyComposition =  getRandomFamilyComposition; 
module.exports.getFamilyLastNames = getFamilyLastNames;
module.exports.getBirthDays = getBirthDays;
module.exports.randomDate =randomDate;
