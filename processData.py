file = open('answerList.txt', 'r')
writeFile = open('answers.js','w')

writeFile.write("export { answers };\nconst answers = [\n")

count = 0
x = 0
while True:
    count += 1
    line = file.readline()

    if not line:
        break
 
    testLine = line.upper()

    if(line.strip().isalpha() and line != testLine):
        line = line.upper()
        writeFile.write('"' + (line.strip()) +'",')
    else:
        x = x + 1
print(x)
writeFile.write("];")
 
file.close()
writeFile.close()

print("DONE")

