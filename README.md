Sukurti sistem�, kuri leist� jungtis � grupes ir dalintis s�skaitomis.

DB:
use mysql
users (id, full_name, email, password, reg_timestamp);
groups (id, name);
bills (id, group_id, amount, description);
accounts (id, group_id, user_id) <- �i lentel� skirta �inoti kokioms grup�ms priklauso kiekvienas vartotojas.
Back-end:
Auth: Register/Login su POST.
POST: /accounts/ - vartotojas paduoda account ID ir savo token. � accounts lentel� �sira�o duomenys.
GET: /accounts/ - paduoda visas vartotojo grupes (JOIN su groups). ID pasiima i� token.
GET: /bills/:id - paduoda vartotojui visas s�skaitas tos grup�s.
POST /bills/ - �ra�o nauj� s�skait� specifinei grupei (front'as paduoda: group_id, amount, description)
Front-end:
Register: vartotojas �ra�o vard�, email� ir slapta�od� du kartus (jei nesutampa - front'as nepraleid�ia).
Login: vartotojas �ra�o email�, slapta�od�; gauna token; nukreipia � groups pasirinkim�.
Groups: vartotojas mato visas savo grupes (pagal accounts lentel� i� DB). Paspaudus - nuveda � tos grup�s bills. Apa�ioje forma prid�ti grup� prie paskyros (t.y. � accounts lentel�).
Bills: mato s�skaitas specifin�s grup�s ir gali prid�t naujas.
## U�duoties �k�limo instrukcijos.

1. Sukurti GitHub repozitorij�.

Instrukcijas, kaip susikurti GitHub repozitorij� rasite - https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-new-repository

2. Pakeitimus daryti atskiroje �akoje (pvz. dev), kad b�t� galima sukurti Pull Request.

Kaip galima sukurti Pull Request galite su�inoti �ia - https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

Nauj� �ak� galima susikurti �vykd�ius `git checkout -b dev` komand� terminale.

3. Kuriant sistem� pakeitimus nuolatos saugoti su pakeitimus su prasmingomis "commit" �inut�mis.

4. Pabaigus projekt� patikrinti ar visi pakeitimai yra nusi�sti � GitHub, sukurti Pull Request per GitHub puslap� � pagrindin� �ak� (`main` arba `master`) ir pateikti nuorod� �iame "assignment".

Jeigu to padaryti nepavyks galite tiesiog �kelti archyvuotus failus.

S�km�s!
