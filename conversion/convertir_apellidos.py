import csv
fw = open('apellidos.xml','w')
fw.write('<apellidos>\n')
with open('apellidos.csv','r') as f:
	reader=csv.reader(f, delimiter=';')
	for row in reader: 
		str= "\t<apellido>"+row[0]+"</apellido>\n"
		fw.write(str)
fw.write("</apellidos>")
fw.close()

