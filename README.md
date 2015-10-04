# XML_DOM_Nodejs_generator

Generador de datos de prueba usando XML DOM en Javascript -  Node.js 
Modulo [xmldom](https://github.com/jindw/xmldom)

# Instalación 
* Luego de realizar la clonación del repositorio, entrar en la carpeta desde la linea de comandos y ejecutar el comando.

	>npm install

	Para descargar los módulos requeridos del proyecto ```xmldom``` y ```fs```.
* Ejecutar la aplicación con el comando:

	> node index.js

## Funcionalidades 
* Recibe como parámetro el número de crisis (```num_crisis```) a generar y el numero de familias (```num_familia```).  
* Cómo salida genera un archivo por cada crisis humanitaria en la carpeta **output** (tomando como base el archivo ```crisis.xml```). 
* Asigna un nombre, un tipo y una fecha aleatoriamente, y dentro crea tantos elementos familia, como se le hayan indicado por parámetro ```num_crisis```.  
* Cada elemento familia contiene nombres al azar de personas, tomadas del archivo ```nombres.xml``` y ```apellidos.xml```. 
* A cada persona le asignará una fecha de nacimiento, un lugar de nacimiento y un lugar de procedencia aleatoriamente.

### Funcionalidades Adicionales: basados en condiciones reales
* Los afectados poseen un rol el cual puede ser: Padre, Madre, Hijo o Hija. 
* En una familia los hijos tienen los mismos apellidos de los padres. (```getFamilyLastNames()```) 
	* ```flag==0``` Indica una familia que el padre/madre existe pero no vive en el hogar. El hijo/a tiene apellido de padre y de madre. 
	*  ```flag==1``` Indica una familia donde el padre/madre existe. El Hijo/a tienen los mismos apellidos del padre/madre. 
* No siempre la familia tiene Padre y Madre. Se manejan tres tipos de familia. (Método  ```getFamilyComposition()```)
	* Tipo 1: Padre-Hijos..  
	* Tipo 2: Madre-Hijos..
	* Tipo 3: Padre-Madre-Hijos...
* Las fechas de nacimiento de los hijos nunca es mayor que la de alguno de sus padres (```getBirthDays()```).
* Los nombres asignados a cada afectado depende del atributo ```genero``` del documento ```nombres.xml```


### Estructura base del ```crisis.xml```:: 
```xml
<crisis>
	<nombre></nombre>
	<tipo></tipo>
	<fecha></fecha>
	<lugar></lugar>
	<afectados>
		<familia>
			<afectado>
				<nombres></nombres>
				<apellidos></apellidos>
				<rol></rol>
				<fecha-nacimiento></fecha-nacimiento>
				<lugar-nacimiento></lugar-nacimiento>
				<lugar-procedencia></lugar-procedencia>
			</afectado>
		</familia>
	</afectados>
</crisis>
```
### Estructura base del ```nombres.xml```:: 
```xml
<nombres>
	<nombre genero="M">Nombre masculino/nombre>
	<nombre genero="F">Nombre femenino</nombre>
</nombres>
```
### Estructura base del ```apellidos.xml```:: 
```xml
<apellidos>
	<apellido>APELLIDO</apellido>
</apellidos>
```


## Equipo 
* Eli Pacheco 
* Christian Orrego
* Brayan Gallego 

### Agradecimiento a: 
* [aplatancat](https://github.com/apalancat) por proporcionar una amplia fuente de datos [spanish-names](https://github.com/apalancat/spanish-names).

	**Nota:** carpeta ```conversion_csv_xml``` contiene el código utilizado para modificar la estructura del documento original
* Docente por el planteamiento del ejercicio
