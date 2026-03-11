# Izboljšave dona.numenor.si

Datum: 2026-03-11
Status: NADOMEŠČEN z NACRT-PRENOVE.md

---

## Opomba

Ta dokument je bil prvi nabor idej. Nadomeščen je z:
**[NACRT-PRENOVE.md](./NACRT-PRENOVE.md)** — ki vsebuje celoten načrt
(homepage spremembe, podstrani, besedila, CSS, JS, prioritete).

Spodaj ostajajo prvotne ideje za referenco.

---

## 1. Hero sekcija — močnejši prvi vtis

### Zdaj
```
Dona
Vaša pravna asistentka.

Umetna inteligenca, ki deluje izključno v vaši pisarni.
Vaši podatki nikoli ne zapustijo vaših prostorov.
```

### Predlog
```
Dona
Vaša pravna asistentka.

Sklep sodišča ob 8:15. Ob 8:16 že klasificiran,
rok vnesen, povzetek pripravljen.
```

### Zakaj
- Konkreten claim namesto abstraktnega opisa
- Številka "3 ure → 20 minut" ki je zdaj šele spodaj pri primeru — prestavi jo sem
- Odvetnik takoj razume vrednost

### Dodatno
- Dodaj **sekundarni CTA gumb**: "Poglejte kako deluje" (scroll do sekcije "Kako deluje")
- Primarni CTA ostane: "Dogovorite se za predstavitev"

---

## 2. Screenshoti / vizuali UI-ja

### Problem
Stran je 100% besedilo + animacija. Odvetnik hoče videti kako vmesnik izgleda
preden sploh razmišlja o klicu. Animacija je lepa, ampak ne pokaže dejanskega produkta.

### Predlog — minimalno 4 screenshote

| Lokacija na strani | Kaj prikazati |
|---|---|
| "Kako deluje" korak 1 | Inbox z barvo-kodiranimi dokumenti (vloga=modra, sklep=rdeča, dopis=siva) |
| "Kako deluje" korak 2 | Chat z Dono — vprašanje o roku + odgovor s citiranim zakonskim členom |
| "Kako deluje" korak 3 | Spis z dokumenti, strankami, roki na enem mestu |
| "Celoten delovni tok" | Dashboard ali pregled sistema — da vidi "celotno sliko" |

### Če screenshotov še ni
- Mockupi (Figma wireframe) so boljši kot nič
- Lahko tudi zamazani screenshoti z napisom "Prikaz vmesnika" — ustvari radovednost
- Ko bodo pravi screenshoti (za priročnik), zamenjaj

---

## 3. Primeri iz prakse — 3 scenariji namesto 1

### Zdaj
En sam primer (kazenska zadeva — sklep o priporu). Odvetnik ki dela civilko ali
upravno pravo se ne prepozna.

### Predlog — dodaj 2 scenarija

**Scenarij A — Kazensko pravo** (obstoječi, rahlo predelan):
```
RAZDELEK: PRIMER — KAZENSKA ZADEVA
Naslov: Kazensko pravo — sklep o priporu

Ponedeljek zjutraj, 8:15.
Po elektronski pošti prejmete sklep sodišča v kazenski zadevi.
Rok za pritožbo je 8 dni.

1. Dona prebere sklep, ga prepozna in razvrsti k spisu K-42/2026.
2. Vnese 8-dnevni pritožbeni rok in vam pošlje opozorilo.
3. Poišče relevantne člene ZKP in sodno prakso.
4. Pripravi osnutek pritožbe s sklicevanjem na konkretne zakonske člene.

Vi pregledate, popravite in vložite.
Namesto 3 ur — 20 minut.
```

**Scenarij B — Civilno pravo** (nov):
```
RAZDELEK: PRIMER — CIVILNA ZADEVA
Naslov: Civilno pravo — pregled pogodbe

Stranka vam pošlje 47-stransko pogodbo za pregled.

1. Dona analizira celoten dokument in primerja klavzule z Obligacijskim zakonikom.
2. Identificira 3 problematične klavzule: nesorazmerna pogodbena kazen,
   nejasno določilo o odstopu, manjkajoča arbitražna klavzula.
3. Pripravi poročilo s sklicevanjem na konkretne člene OZ in relevantno sodno prakso.

Vi presodite, stranka dobi strokoven odgovor isti dan.
Namesto celodnevnega pregleda — 45 minut ciljne analize.
```

**Scenarij C — Upravno pravo** (nov):
```
RAZDELEK: PRIMER — UPRAVNA ZADEVA
Naslov: Upravno pravo — tožba zoper odločbo

Prejmete odločbo upravnega organa. Stranka želi vložiti tožbo.

1. Dona preveri rok za tožbo na upravno sodišče (30 dni po ZUS-1).
2. Poišče relevantno prakso Vrhovnega in Upravnega sodišča za podobne primere.
3. Identificira možne tožbene razloge: nepopolno ugotovljeno dejansko stanje,
   napačna uporaba materialnega prava, kršitev postopka.
4. Pripravi oris tožbe z ustreznimi pravnimi podlagami.

Vi dopolnite s strankinimi specifičnimi argumenti in vložite.
```

### Implementacija
- Tri kartice/tabi na strani — uporabnik klikne "Kazensko / Civilno / Upravno"
- Ali pa carousel ki se avtomatsko menja
- Ali preprosto tri zaporedne bloke

---

## 4. Social proof

### Problem
Stran je anonimna. Nobenega dokaza da produkt dejansko nekdo uporablja.

### Predlog — minimalni social proof (brez poimenskih citatov)

```
RAZDELEK: SOCIAL PROOF
Naslov: V praksi

V pilotni uporabi v odvetniški pisarni s 6 zaposlenimi.

Značke:
✓ Obdelanih 500+ dokumentov v pilotnem obdobju
✓ 0 zamujenih rokov od uvedbe
✓ Povprečni prihranek: 12 ur/teden
```

### Če Gaberščik dovoli citat
```
"Dona je v enem tednu prevzela delo, za katero smo prej potrebovali pol tajnice.
Še posebej nadzor nad roki — zdaj sem prvič miren."
— Odvetniška pisarna, 6 zaposlenih
```

### Značke zaupanja — takoj pod hero
Obstoječi trust strip prestavi višje (takoj pod hero naslov):
```
🔒 100% lokalno  |  ⚖️ ZOdv skladno  |  🇪🇺 GDPR  |  📋 Revizijska sled
```

---

## 5. Modulna sekcija — razširi opise

### Zdaj
6 modulov s po 1-2 stavkoma. Premalo za odločitev.

### Predlog — vsak modul dobi:
- Ikono ali vizual
- 2-3 stavke ki govorijo o konkretni koristi (ne funkciji)
- Opcijsko: screenshot ali mockup

```
RAZDELEK: MODULI (razširjeno)

📨 Vhodna pošta
Dona samodejno prebere vhodno pošto, prepozna tip dokumenta med 10 kategorijami
(vloga, sodba, sklep, dopis, pogodba, faktura, dokazilo, korespondenca, zapisnik, drugo)
in ga razvrsti k pravemu spisu. Vi dobite obvestilo samo za nujne zadeve.
[screenshot: inbox z barvo-kodiranimi dokumenti]

⚖️ Pravna raziskava
Celotna veljavna zakonodaja (PISRS) in 350.000+ sodnih odločb. Vprašajte Dono
v naravnem jeziku — odgovor s citiranimi zakonskimi členi in relevantnimi sodbami.
Brez ročnega brskanja po registrih.
[screenshot: chat z iskanjem zakonodaje]

📁 Vodenje spisov
Vse stranke, dokumenti, roki, korespondenca — na enem mestu. Odprite spis in vidite
celotno zgodovino zadeve. Brez iskanja po mapah, brez "kje je tisti dopis".
[screenshot: pregled spisa]

⏰ Nadzor nad roki
4 vrste rokov: procesni, zastaralni, pogodbeni, interni. Barvni trak nujnosti
(rdeča/oranžna/rumena/zelena). Do 3 opomniki pred iztekom. Dona skrbi,
da ne spregledajte ničesar pomembnega.
[screenshot: rokovnik z barvnim trakom]

📝 Priprava dokumentov
7 kategorij predlog (vloge, pritožbe, dopisi, pogodbe, pooblastila, zapisniki, dopisi strankam)
s pametnimi polji. Dona predlaga vsebino na podlagi spisa in sodne prakse.
Vi pregledate, popravite in podpišete.
[screenshot: predloga dokumenta]

🔒 Skladnost in nadzor
Samodejno preverjanje strank po ZPPDFT-2 (pranje denarja). Revizijska sled vseh dejanj.
GDPR brisanje na zahtevo. Vse dokumentirano, vse sledljivo — za morebitni nadzor
Odvetniške zbornice ali informacijskega pooblaščenca.
```

---

## 6. Sekcija "Zakaj lokalno" — nova sekcija

### Zdaj
Lokalno delovanje je omenjeno v enem odstavku. To je USP (unique selling proposition)
ki ga noben konkurent nima — zasluži si svojo sekcijo.

### Predlog
```
RAZDELEK: ZAKAJ LOKALNO
Naslov: Zakaj lokalno?

✓ Vaši podatki nikoli ne zapustijo vaše pisarne
✓ Ni mesečnih stroškov za oblak
✓ Deluje tudi brez internetne povezave
✓ Popolna skladnost z Zakonom o odvetništvu (odvetniška tajnost)
✓ Vi imate fizični nadzor nad strojno opremo
✓ Nihče — niti mi — nima dostopa do vaših podatkov

Dona teče na Mac Mini M4 v vaši pisarni.
Namestitev traja en delovni dan. Podatki so vaši — za vedno.
```

---

## 7. FAQ sekcija — nova sekcija

### Predlog — 8 ključnih vprašanj (accordion stil)

```
RAZDELEK: FAQ
Naslov: Pogosta vprašanja

V: Ali podatki kadar zapustijo mojo pisarno?
O: Ne. Dona deluje izključno na lokalni napravi v vaši pisarni.
   Nobeni podatki se ne pošiljajo v oblak ali na zunanje strežnike.
   Edina izjema je iskanje po javno dostopnih bazah (PISRS, sodna praksa),
   kjer se pošlje samo iskalni pojem — nikoli vsebina vaših spisov.

V: Kaj potrebujem za namestitev?
O: Mac Mini M4 z vsaj 16 GB RAM (priporočeno 32 GB) in stabilno
   internetno povezavo za začetno namestitev. Po namestitvi Dona
   deluje tudi brez interneta (razen za iskanje zakonodaje in posodobitve).

V: Koliko časa traja uvedba?
O: En delovni dan. Namestimo sistem, uvozimo obstoječe spise
   (če jih imate v elektronski obliki) in vas usposobimo za uporabo.

V: Ali potrebujem stalno internetno povezavo?
O: Za osnovno delo ne. Internet potrebujete za iskanje po PISRS in sodni
   praksi, za posodobitve sistema in za prejemanje elektronske pošte.
   Vsa ostala funkcionalnost deluje brez povezave.

V: Ali Dona nadomesti pravno pomoč ali tajnico?
O: Ne. Dona je orodje ki avtomatizira rutinsko administrativno delo.
   Vsaka odločitev ostaja pod izključnim nadzorom odvetnika. Dona predlaga,
   vi odločite. Za tajnico: Dona prevzame del administrativnega bremena,
   kar tajnici omogoči, da se posveti zahtevnejšim nalogam.

V: Kako potekajo posodobitve?
O: Samodejno, izven delovnega časa. Sistem preveri razpoložljivost posodobitve,
   naredi varnostno kopijo in se posodobi. Če karkoli ne uspe, se samodejno
   povrne na prejšnjo različico. Vi opazite le izboljšave.

V: Ali je sistem skladen z GDPR in Zakonom o odvetništvu?
O: Da. Lokalno delovanje pomeni, da so vaši podatki pod vašim izključnim
   nadzorom. Sistem vodi revizijsko sled vseh dejanj, omogoča brisanje
   osebnih podatkov na zahtevo (pravica do pozabe) in ne deli podatkov
   s tretjimi osebami.

V: Kaj če Dona naredi napako?
O: Dona nikoli ne izvede dejanja brez vaše potrditve. Vsak osnutek dokumenta,
   vsak predlagan rok, vsaka klasifikacija zahteva vaš pregled. Sistem je
   zasnovan kot pomočnik — končna odgovornost in odločitev je vedno vaša.
```

---

## 8. Footer — dodaj substanco

### Zdaj
```
D
Dona
Pravna inteligenca za vašo pisarno.
```

### Predlog
```
D
Dona
Pravna inteligenca za vašo pisarno.

Numenor d.o.o.
dona@numenor.si
numenor.si

Politika zasebnosti
```

Podatki podjetja dodajo verodostojnost. Povezava na politiko zasebnosti
je za odvetnike skoraj obvezna (sami jo zahtevajo od drugih).

---

## Predlagan vrstni red sekcij

| # | Sekcija | Status |
|---|---------|--------|
| 1 | Hero (izboljšan) | PREDELAJ |
| 2 | Trust strip (prestavi sem) | PRESTAVI |
| 3 | Problem/Izziv (krajši) | PREDELAJ |
| 4 | Kako deluje — 3 koraki + screenshoti | PREDELAJ |
| 5 | Statistike (900+ zakonov...) | OHRANI |
| 6 | Primeri iz prakse — 3 scenariji | RAZŠIRI |
| 7 | Moduli — 6 razširjenih opisov + vizuali | RAZŠIRI |
| 8 | Zakaj lokalno — checklist | NOVO |
| 9 | Social proof | NOVO |
| 10 | FAQ — 8 vprašanj | NOVO |
| 11 | CTA — "AI pripravi. Odvetnik odloči." | OHRANI |
| 12 | Footer (razširjen) | PREDELAJ |

---

## Tehnične izboljšave

- [ ] **Open Graph slika** — og-image.jpg obstaja, preveri da je aktualna
- [ ] **Meta description** — dodaj/posodobi za SEO
- [ ] **Structured data** — JSON-LD že obstaja, dodaj FAQ schema za Google rich results
- [ ] **Analytics** — dodaj Plausible (GDPR-friendly, brez cookiejev) ali Simple Analytics
- [ ] **Performance** — 243 WebP framov (frames/) — preveri lazy loading na mobilnih napravah
- [ ] **Responsive** — preveri vse nove sekcije na mobilnih napravah

---

## Naslednji koraki

1. Preglej ta dokument in potrdi katere izboljšave implementirati
2. Pripravi screenshote/mockupe UI-ja (odvisno od stanja ODVETNIK produkta)
3. Pridobi dovoljenje za social proof citat (Gaberščik)
4. Implementiraj spremembe v `besedilo.txt` → `index.html`
5. Test na staging (Vercel preview) → deploy
