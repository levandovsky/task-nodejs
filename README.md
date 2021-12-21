Sukurti sistemà, kuri leistø jungtis á grupes ir dalintis sàskaitomis.

DB:
use mysql
users (id, full_name, email, password, reg_timestamp);
groups (id, name);
bills (id, group_id, amount, description);
accounts (id, group_id, user_id) <- ði lentelë skirta þinoti kokioms grupëms priklauso kiekvienas vartotojas.
Back-end:
Auth: Register/Login su POST.
POST: /accounts/ - vartotojas paduoda account ID ir savo token. Á accounts lentelæ ásiraðo duomenys.
GET: /accounts/ - paduoda visas vartotojo grupes (JOIN su groups). ID pasiima ið token.
GET: /bills/:id - paduoda vartotojui visas sàskaitas tos grupës.
POST /bills/ - áraðo naujà sàskaità specifinei grupei (front'as paduoda: group_id, amount, description)
Front-end:
Register: vartotojas áraðo vardà, emailà ir slaptaþodá du kartus (jei nesutampa - front'as nepraleidþia).
Login: vartotojas áraðo emailà, slaptaþodá; gauna token; nukreipia á groups pasirinkimà.
Groups: vartotojas mato visas savo grupes (pagal accounts lentelæ ið DB). Paspaudus - nuveda á tos grupës bills. Apaèioje forma pridëti grupæ prie paskyros (t.y. á accounts lentelæ).
Bills: mato sàskaitas specifinës grupës ir gali pridët naujas.
## Uþduoties ákëlimo instrukcijos.

1. Sukurti GitHub repozitorijà.

Instrukcijas, kaip susikurti GitHub repozitorijà rasite - https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-new-repository

2. Pakeitimus daryti atskiroje ðakoje (pvz. dev), kad bûtø galima sukurti Pull Request.

Kaip galima sukurti Pull Request galite suþinoti èia - https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

Naujà ðakà galima susikurti ávykdþius `git checkout -b dev` komandà terminale.

3. Kuriant sistemà pakeitimus nuolatos saugoti su pakeitimus su prasmingomis "commit" þinutëmis.

4. Pabaigus projektà patikrinti ar visi pakeitimai yra nusiøsti á GitHub, sukurti Pull Request per GitHub puslapá á pagrindinæ ðakà (`main` arba `master`) ir pateikti nuorodà ðiame "assignment".

Jeigu to padaryti nepavyks galite tiesiog ákelti archyvuotus failus.

Sëkmës!
