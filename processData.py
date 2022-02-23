file = open('wordlist.txt', 'r')
writeFile = open('wordlistFormatted.txt','w')

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
        writeFile.write((line.strip()) + ':true,')
    else:
        x = x + 1
print(x)
 
file.close()
writeFile.close()

print("DONE")

