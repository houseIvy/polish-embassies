import requests, json
from bs4 import BeautifulSoup

URL = 'https://www.gov.pl/web/dyplomacja/polskie-przedstawicielstwa-na-swiecie'
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')

registerData = soup.find(id='registerData')

#print(registerData)
#table = mainContent.find_all('table')[0]

#parsedDataIndex = registerData.contents[0].find('"parsedData":') + len(('"parsedData":')) + 1
parsedDataIndex = registerData.contents[0].find('"parsedData":') + len('"parsedData":')



splitedRegisterData = (registerData.contents[0])[parsedDataIndex:].split("\\r\\n")

# Usuwamy śmieci
#print(splitedRegisterData[0])
#print(splitedRegisterData[len(splitedRegisterData) - 1])
del splitedRegisterData[len(splitedRegisterData) - 1]
del splitedRegisterData[0]

liczbaPlacowek = len(splitedRegisterData)
#print(liczbaPlacowek)
print(splitedRegisterData[2])

polskiePlacowki = []

for i in range(liczbaPlacowek):
    #print(i)
    #print(splitedRegisterData[i].strip())
    currentThing = splitedRegisterData[i].strip().replace("\\\",\\\"", "\n").replace("\\\"", "").replace(";;", ";")

    '''
    if(currentThing[len(currentThing) - 1:] == ";"):
        currentThing = currentThing[:len(currentThing) - 1]
    '''

    splitedCurrentThing = (currentThing.split(";"))

    if(splitedCurrentThing[1][:4] == "Brak"):
        continue

    print(i)
    print(splitedCurrentThing)

    polskiePlacowka = {
        "Państwo / Terytorium": splitedCurrentThing[0],
        "Placówka": splitedCurrentThing[1],
        "Kierownik placówki": splitedCurrentThing[2],
        "Stanowisko kierownika placówki": splitedCurrentThing[3],
        "Adres": splitedCurrentThing[4],
        "Kod pocztowy": splitedCurrentThing[5],
        "Miasto": splitedCurrentThing[6],
        #"Telefon": splitedCurrentThing[7],
        #"Telefon dyżurny": splitedCurrentThing[8],
        #"Adres e-mail": splitedCurrentThing[9],
        #"Strona internetowa": splitedCurrentThing[10]
        #"Informacje dodatkowe": splitedCurrentThing[11],
        #"Dodatkowe państwa podlegające kompetencji terytorialnej Ambasady": splitedCurrentThing[12]
    }

    polskiePlacowki.append(polskiePlacowka)

    if (i == 44):
        print(splitedCurrentThing)
    '''
    print("$$$$$$$$$$$$$$$$$$")
    adresIndex = currentThing.find("Adres:") + len("Adres:")
    nazwaIndex = currentThing.find("Placówka:") + len("Placówka:")
    if (currentThing[adresIndex] != "\n"):
        adres = currentThing[adresIndex:currentThing.find("\n", adresIndex)]
        nazwa = currentThing[nazwaIndex:currentThing.find("\n", nazwaIndex)]
        print("Nazwa: " + nazwa)
        print("Adres: " + adres)

    print("$$$$$$$$$$$$$$$$$$")

    print(currentThing)
    print("-------------------------------")
    '''

'''
with open('keys.json', encoding='utf-8') as fh:
    data = json.load(fh)

print(data)
'''

print("------------------------------------")

with open('polskiePlacowki.json', 'w', encoding='utf-8') as f:
  f.write(json.dumps(polskiePlacowki, ensure_ascii=False))

#print(json.dumps(polskiePlacowki, ensure_ascii=False))

with open('polskiePlacowki.json', encoding='utf-8') as fh:
    data = json.load(fh)

print(data[1])
