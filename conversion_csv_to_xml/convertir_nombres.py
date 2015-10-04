import csv
fw = open('nombres.xml','w')
fw.write('<nombres>\n')
with open('nombres.csv','r') as f:
	reader=csv.reader(f, delimiter=';')
	for row in reader: 
		str= "\t<nombre genero='"+row[1]+"'>"+row[0]+"</nombre>\n"
		fw.write(str)
fw.write("</nombres>")
fw.close()