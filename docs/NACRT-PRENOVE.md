# Načrt prenove dona.numenor.si

Datum: 2026-03-11
Status: PREDLOG

---

## Koncept

Homepage ostane nedotaknjen — scroll-driven animacija s 243 WebP frami, GSAP,
Lenis. V obstoječe besedilne sekcije dodamo gumbe "Več →" ki peljejo na
podstrani. Podstrani so statične HTML strani z istim vizualnim DNA-jem,
brez frame animacije.

---

## 1. Spremembe na homepage

### Kaj se spremeni
Samo dodani gumbi/linki v obstoječe sekcije. Nobene vizualne spremembe,
nobenih novih slik, nobenih strukturnih sprememb.

### Kje dodamo gumbe

| Sekcija | Element | Link |
|---|---|---|
| "Primer iz prakse" | Pod usecase-result | `<a href="/primeri">Več primerov →</a>` |
| Feature: Vhodna pošta | Pod obstoječi `<p>` | `<a href="/funkcije/posta">Več →</a>` |
| Feature: Pravna raziskava | Pod obstoječi `<p>` | `<a href="/funkcije/raziskava">Več →</a>` |
| Feature: Vodenje spisov | Pod obstoječi `<p>` | `<a href="/funkcije/spisi">Več →</a>` |
| Feature: Nadzor rokov | Pod obstoječi `<p>` | `<a href="/funkcije/roki">Več →</a>` |
| Feature: Priprava dokumentov | Pod obstoječi `<p>` | `<a href="/funkcije/dokumenti">Več →</a>` |
| Feature: Skladnost | Pod obstoječi `<p>` | `<a href="/funkcije/skladnost">Več →</a>` |
| CTA sekcija | Pod cta-button | `<a href="/faq">Pogosta vprašanja →</a>` |
| Footer | Pod footer-tagline | `<a href="/o-nas">O nas</a>` |

### Stil gumbov
```css
.feature-link {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s;
}
.feature-link:hover {
  color: rgba(255, 255, 255, 0.9);
}
```

Subtilni, ne kričeči. Sivi tekst ki se ob hoverju posvetli.

---

## 2. Struktura podstrani

### Datotečna struktura
```
dona-landing/
├── index.html              ← homepage (obstoječi, +gumbi)
├── primeri/index.html       ← primeri iz prakse
├── faq/index.html           ← pogosta vprašanja
├── o-nas/index.html         ← o podjetju
├── funkcije/
│   ├── posta/index.html     ← vhodna pošta
│   ├── raziskava/index.html ← pravna raziskava
│   ├── spisi/index.html     ← vodenje spisov
│   ├── roki/index.html      ← nadzor rokov
│   ├── dokumenti/index.html ← priprava dokumentov
│   └── skladnost/index.html ← skladnost in revizija
├── subpage.css              ← CSS za podstrani (NOV)
├── subpage.js               ← JS za podstrani (NOV)
├── style.css                ← obstoječi homepage CSS
├── app.js                   ← obstoječi homepage JS
└── docs/                    ← dokumentacija (ta datoteka)
```

Vercel servira `index.html` iz vsake mape avtomatsko: `/primeri` → `primeri/index.html`.

### Skupni HTML okvir za vse podstrani

```html
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NASLOV — Dona</title>
  <meta name="description" content="OPIS">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/subpage.css">
</head>
<body>

  <!-- Navigacija -->
  <nav class="nav">
    <a href="/" class="nav-logo">D</a>
    <a href="/" class="nav-brand">Dona</a>
    <div class="nav-links">
      <a href="/funkcije/posta">Funkcije</a>
      <a href="/primeri">Primeri</a>
      <a href="/faq">FAQ</a>
      <a href="/o-nas">O nas</a>
    </div>
    <a href="mailto:dona@numenor.si?subject=..." class="nav-cta">Predstavitev</a>
  </nav>

  <!-- Vsebina -->
  <main class="content">
    <!-- sekcije specifične za vsako podstran -->
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="footer-logo">D</span>
        <span class="footer-name">Dona</span>
        <span class="footer-tagline">Pravna inteligenca za vašo pisarno.</span>
      </div>
      <div class="footer-right">
        <a href="mailto:dona@numenor.si">dona@numenor.si</a>
        <a href="https://numenor.si">Numenor d.o.o.</a>
        <a href="/zasebnost">Politika zasebnosti</a>
      </div>
    </div>
    <div class="footer-badges">
      <span>100% lokalno</span>
      <span>ZOdv skladno</span>
      <span>GDPR</span>
      <span>Revizijska sled</span>
    </div>
  </footer>

  <script src="/subpage.js"></script>
</body>
</html>
```

### subpage.css — osnova

```css
/* Ista temna tema kot homepage */
:root {
  --bg: #050505;
  --text: #f5f5f5;
  --text-muted: rgba(255, 255, 255, 0.5);
  --accent: rgba(255, 255, 255, 0.9);
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'DM Sans', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
}

/* Nav */
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav-logo { font-family: var(--font-heading); font-size: 1.5rem; color: var(--text); text-decoration: none; }
.nav-brand { font-family: var(--font-heading); font-size: 1.1rem; color: var(--text); text-decoration: none; margin-right: auto; }
.nav-links { display: flex; gap: 1.5rem; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.875rem; transition: color 0.2s; }
.nav-links a:hover { color: var(--accent); }
.nav-cta {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 2rem;
  color: var(--text);
  text-decoration: none;
  transition: border-color 0.2s;
}
.nav-cta:hover { border-color: rgba(255,255,255,0.5); }

/* Content */
.content {
  max-width: 740px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
}
.content h1 {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.content h2 {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 400;
  margin-top: 3rem;
  margin-bottom: 1rem;
}
.content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.content p {
  color: rgba(255,255,255,0.75);
  margin-bottom: 1rem;
}
.content .subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

/* Feature list */
.check-list { list-style: none; padding: 0; }
.check-list li {
  padding: 0.5rem 0;
  padding-left: 1.75rem;
  position: relative;
  color: rgba(255,255,255,0.75);
}
.check-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #22c55e;
}

/* Scenario cards */
.scenario {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}
.scenario-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}
.scenario-result {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-weight: 500;
  color: var(--text);
}

/* FAQ accordion */
.faq-item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  cursor: pointer;
  font-weight: 500;
  color: var(--text);
}
.faq-question::after { content: "+"; color: var(--text-muted); font-size: 1.5rem; }
.faq-item.open .faq-question::after { content: "−"; }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
}
.faq-item.open .faq-answer { max-height: 500px; padding-bottom: 1.25rem; }

/* CTA na dnu vsake podstrani */
.page-cta {
  text-align: center;
  margin: 4rem 0 2rem;
  padding: 3rem 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* Footer */
.footer {
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer-inner { display: flex; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
.footer a { color: var(--text-muted); text-decoration: none; font-size: 0.875rem; display: block; }
.footer a:hover { color: var(--accent); }
.footer-badges {
  display: flex; gap: 1.5rem; margin-top: 1.5rem;
  font-size: 0.75rem; color: var(--text-muted);
}

/* Responsive */
@media (max-width: 640px) {
  .content h1 { font-size: 2rem; }
  .nav-links { display: none; }  /* hamburger na mobilnem — dodaj po potrebi */
}
```

### subpage.js — minimalen

```javascript
// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('open');
  });
});

// Fade-in on scroll (opcijsko, če hočeš subtilne animacije)
if (typeof IntersectionObserver !== 'undefined') {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
```

---

## 3. Besedilo za podstrani

---

### 3.1 /primeri — Primeri iz prakse

```
NASLOV: Primeri iz prakse
PODNASLOV: Kako Dona pomaga v različnih pravnih področjih.

---

SCENARIJ A: KAZENSKO PRAVO

Oznaka: Kazensko pravo — sklep o priporu

Ponedeljek zjutraj, 8:15. Preko elektronske pošte prejmete sklep sodišča
v kazenski zadevi. Rok za pritožbo je 8 dni.

1. Dona prebere sklep in prepozna, da gre za sklep o priporu.
   Razvrsti ga v spis K-42/2026.

2. Vnese 8-dnevni pritožbeni rok v sistem rokov in vam pošlje
   opozorilo s ključnim povzetkom vsebine sklepa.

3. Identificira pravno podlago: relevantne člene ZKP,
   sodno prakso in morebitne procesne kršitve.

4. Pripravi strukturiran osnutek pritožbe s sklici na
   zakonodajo in sodno prakso.

Vi pregledate, popravite in vložite.

Rezultat: Namesto treh ur intenzivnega dela — 20 minut
za končni pregled in potrditev.

---

SCENARIJ B: CIVILNO PRAVO

Oznaka: Civilno pravo — pregled pogodbe

Stranka vam pošlje 47-stransko pogodbo za pregled pred podpisom.

1. Dona analizira celoten dokument in primerja klavzule
   z Obligacijskim zakonikom.

2. Identificira 3 problematične klavzule:
   — nesorazmerna pogodbena kazen (čl. 253 OZ),
   — nejasno določilo o odstopu od pogodbe (čl. 125 OZ),
   — manjkajoča arbitražna klavzula.

3. Pripravi poročilo s sklicevanjem na konkretne člene OZ
   in relevantno sodno prakso višjih sodišč.

4. Predlaga alternativne formulacije za sporne klavzule.

Vi presodite, stranka dobi strokoven odgovor isti dan.

Rezultat: Namesto celodnevnega pregleda — 45 minut ciljne analize.

---

SCENARIJ C: UPRAVNO PRAVO

Oznaka: Upravno pravo — tožba zoper odločbo

Prejmete odločbo upravnega organa. Stranka želi vložiti tožbo
na upravno sodišče.

1. Dona preveri rok za tožbo (30 dni po ZUS-1) in ga vnese
   v sistem rokov.

2. Poišče relevantno prakso Vrhovnega in Upravnega sodišča
   za podobne primere v zadnjih 5 letih.

3. Identificira možne tožbene razloge:
   — nepopolno ugotovljeno dejansko stanje,
   — napačna uporaba materialnega prava,
   — kršitev pravil postopka.

4. Pripravi oris tožbe z ustreznimi pravnimi podlagami
   in strukturiranimi razlogi.

Vi dopolnite s strankinimi specifičnimi argumenti in vložite.

Rezultat: Namesto pol dneva raziskovanja — 30 minut
ciljnega pregleda in dopolnitve.

---

CTA: Vsak dan manj rutine. Vsak dan več prava.
GUMB: Dogovorite se za predstavitev
```

---

### 3.2 /faq — Pogosta vprašanja

```
NASLOV: Pogosta vprašanja
PODNASLOV: Odgovori na najpogostejša vprašanja o sistemu Dona.

---

V: Ali moji podatki zapustijo pisarno?
O: Ne. Dona deluje na lokalni napravi v vaši pisarni. Vaši podatki —
   stranke, spisi, dokumenti in e-pošta — se ne prenašajo na zunanje
   strežnike. Edina izjema so pogovori z Dono: besedilo se pošlje
   na strežnik za umetno inteligenco, ki ga obdela in vrne odgovor.
   Besedilo se po obdelavi ne hrani na zunanjem strežniku.

V: Kaj potrebujem za namestitev?
O: Mac Mini M4 z vsaj 16 GB pomnilnika (priporočeno 32 GB) in
   stabilno internetno povezavo za začetno namestitev. Po namestitvi
   Dona deluje tudi brez interneta za vsa lokalna opravila.

V: Koliko časa traja uvedba?
O: En delovni dan. Namestimo sistem, uvozimo obstoječe spise
   (če jih imate v elektronski obliki), povežemo e-pošto in vas
   usposobimo za uporabo.

V: Ali potrebujem stalno internetno povezavo?
O: Za lokalna opravila (stranke, spisi, dokumenti, roki) ne.
   Internet potrebujete za pogovore z Dono, iskanje po zakonodaji
   in sodni praksi, sinhronizacijo e-pošte in posodobitve sistema.

V: Ali Dona nadomesti tajnico ali pravno pomoč?
O: Ne. Dona je orodje ki avtomatizira rutinsko administrativno delo —
   klasifikacijo pošte, iskanje zakonodaje, sledenje rokov, pripravo
   osnutkov. Vsaka odločitev ostaja pod vašim izključnim nadzorom.
   Tajnici Dona omogoči, da se posveti zahtevnejšim nalogam.

V: Kako potekajo posodobitve?
O: Samodejno, izven delovnega časa. Sistem preveri razpoložljivost
   posodobitve, naredi varnostno kopijo in se posodobi. Če karkoli
   ne uspe, se samodejno povrne na prejšnjo različico.

V: Ali je sistem skladen z GDPR in Zakonom o odvetništvu?
O: Da. Lokalno delovanje pomeni, da so vaši podatki pod vašim
   izključnim nadzorom. Sistem vodi revizijsko sled vseh dejanj,
   omogoča brisanje osebnih podatkov na zahtevo in ne deli podatkov
   s tretjimi osebami.

V: Kaj če Dona naredi napako?
O: Dona nikoli ne izvede dejanja brez vaše potrditve. Vsak osnutek
   dokumenta, vsak predlagan rok, vsaka klasifikacija zahteva vaš
   pregled in potrditev. Sistem je zasnovan kot pomočnik — končna
   odgovornost in odločitev je vedno vaša.

V: Ali Dona deluje na mobilnem telefonu?
O: Da. Sistem je prilagojen za uporabo na telefonih in tablicah.
   V brskalniku odprite naslov sistema in se prijavite kot običajno.

V: Katera sodišča pokriva iskanje sodne prakse?
O: Vrhovno sodišče RS, vsa štiri višja sodišča (Ljubljana, Maribor,
   Celje, Koper), Upravno sodišče RS in ostala sodišča. Trenutno
   je v bazi več kot 350.000 sodnih odločb.

---

CTA: Imate še kakšno vprašanje?
GUMB: Pišite nam na dona@numenor.si
```

---

### 3.3 /funkcije/posta — Vhodna pošta

```
NASLOV: Vhodna pošta in dokumenti
PODNASLOV: Samodejno branje, klasifikacija in razvrščanje — brez ročnega dela.

---

SEKCIJA: Kako deluje

Dona se vsake 3 minute poveže z vašim e-poštnim strežnikom prek protokola
IMAP in uvozi nova sporočila. Za vsako sporočilo samodejno:

1. Prebere vsebino in priloge
2. Klasificira vrsto dokumenta
3. Poveže sporočilo z ustreznim spisom
4. Zabeleži morebitne roke
5. Vas obvesti o nujnih zadevah

Vam ni treba ničesar ročno prenašati ali razvrščati.

---

SEKCIJA: 8 vrst klasifikacij

Dona razloči 8 vrst e-poštnih sporočil:

— Narok: vabilo na narok ali obravnavo (NUJNO)
— Rok: pisanje ki vsebuje procesni rok (NUJNO)
— Vloga: vloga stranke ali nasprotne stranke
— Dopis sodišča: sklep, odredba, poziv ali drugo pisanje sodišča
— Dopis stranke: sporočilo vaše stranke
— Račun: račun ali predračun
— Spam: nepomembna ali reklamna pošta
— Drugo: sporočila ki ne spadajo v nobeno od zgornjih kategorij

Sporočila klasificirana kot "narok" ali "rok" so na vrhu seznama
in označena z rdečo oznako — ta zahtevajo takojšnje ukrepanje.

---

SEKCIJA: Samodejno povezovanje s spisi

Dona poskuša vsako sporočilo samodejno povezati z ustreznim spisom.
Išče po:

— opravilni številki (npr. P 123/2026)
— imenu stranke v naslovu ali vsebini
— referenci na prejšnje sporočilo v isti niti

Če sistem ni prepričan, vam predlaga najbližje ujemanje —
vi s klikom potrdite ali ročno izberete pravi spis.

---

SEKCIJA: Kaj to pomeni za vas

Namesto da vsako jutro ročno prebirate e-pošto, razvrščate
priloge po mapah in preverjate roke, to naredi Dona.

Vi odprete sistem, vidite klasificirano pošto razvrščeno
po nujnosti in se takoj lotite najpomembnejšega.

---

CTA: Nič več izgubljenih dopisov. Nič več zamujenih rokov.
GUMB: Dogovorite se za predstavitev
```

---

### 3.4 /funkcije/raziskava — Pravna raziskava

```
NASLOV: Pravna raziskava
PODNASLOV: Celotna slovenska zakonodaja in sodna praksa. V naravnem jeziku.

---

SEKCIJA: Zakonodaja

Dona preišče veljavne predpise iz PISRS — Pravno-informacijskega sistema
Republike Slovenije. Iščete lahko:

— po imenu predpisa: "Zakon o pravdnem postopku"
— po členu: "47. člen Zakona o notariatu"
— v naravnem jeziku: "rok za vložitev tožbe zaradi motenja posesti"

Dona najde ustrezne člene, prikaže veljavno besedilo in označi
morebitne spremembe ali prenehanja veljavnosti.

---

SEKCIJA: Sodna praksa

Iskanje po več kot 350.000 odločbah slovenskih sodišč:

— Vrhovno sodišče RS
— Višje sodišče v Ljubljani, Mariboru, Celju in Kopru
— Upravno sodišče RS
— Ostala sodišča

Iščete v naravnem jeziku — opišite pravno vprašanje, Dona najde
relevantne sodbe in jih povzame. Rezultate filtrirate po sodišču,
časovnem obdobju in obsegu iskanja (hitro, standardno, poglobljeno).

---

SEKCIJA: Tri ravni iskanja

Hitro — hiter pregled najpomembnejših zadetkov.
Za situacije ko potrebujete hiter odgovor.

Standardno — uravnoteženo iskanje po širšem naboru virov.
Priporočeno za večino poizvedb.

Poglobljeno — temeljito iskanje ki pregleda več virov
in vrne celovite rezultate. Za zahtevnejša pravna vprašanja.

---

SEKCIJA: Iz pogovora ali iz iskalnika

Zakonodajo in sodno prakso iščete na dva načina:

1. Prek iskalnika — namenski zaslon z filtri in strukturiranimi rezultati.
2. Prek pogovora z Dono — zastavite vprašanje v naravnem jeziku
   in Dona samodejno zažene iskanje.

Rezultat je enak: citirani zakonski členi, relevantne sodbe
in povzetek — vse na enem mestu.

---

SEKCIJA: Števila

900+ zakonov in predpisov
350.000+ sodnih odločb
Vse veljavno in redno posodobljeno

---

CTA: Prenehajte brskati po registrih. Vprašajte Dono.
GUMB: Dogovorite se za predstavitev
```

---

### 3.5 /funkcije/spisi — Vodenje spisov

```
NASLOV: Centralno vodenje spisov
PODNASLOV: Stranke, dokumenti, roki, korespondenca — vse na enem mestu.

---

SEKCIJA: Ena zadeva, celotna slika

Ko odprete spis, vidite vse kar je povezano z zadevo:

— Stranke: kdo je vključen, kontaktni podatki, vloga v zadevi
— Dokumenti: vse datoteke (vloge, sodbe, dopisi, pogodbe)
   razvrščene po tipu in datumu
— Roki: vsi procesni, zastaralni in pogodbeni roki s statusom
— E-pošta: vsa korespondenca povezana z zadevo
— Časovnica: kronološki pregled vseh dogodkov v zadevi

Brez iskanja po mapah. Brez vprašanj "kje je tisti dopis".

---

SEKCIJA: Odpiranje in vodenje zadev

Nov spis odprete v nekaj korakih:

1. Izberite stranko (ali dodajte novo)
2. Vnesite opravilno številko in opis zadeve
3. Izberite pravno področje in vrsto postopka
4. Sistem samodejno ustvari strukturo za dokumente, roke
   in korespondencijo

Ko zadeva je zaključena, jo zaprete — podatki ostanejo
dostopni za referenco, rok hrambe določite sami.

---

SEKCIJA: Iskanje po spisih

Hitro iskanje po:
— imenu stranke
— opravilni številki
— vsebini dokumentov (polnotekstno iskanje)
— statusu (odprt, zaprt, v čakanju)
— pravnem področju

---

SEKCIJA: Nasprotje interesov

Ob odpiranju nove zadeve sistem samodejno preveri, ali je
katera od strank v preteklosti nastopala kot nasprotna stranka
v drugi vaši zadevi. Preverjanje temelji na EMŠO, davčni
številki in imenu — v skladu z 25. členom Odvetniškega kodeksa.

---

CTA: Celotna pisarna na enem mestu.
GUMB: Dogovorite se za predstavitev
```

---

### 3.6 /funkcije/roki — Nadzor nad roki

```
NASLOV: Inteligenten nadzor rokov
PODNASLOV: Nikoli več zamujen rok. Dona bdi namesto vas.

---

SEKCIJA: Zakaj je to kritično

V odvetniški praksi je rok pogosto edina ovira med uspehom
in neuspehom zadeve. Procesni rok ki ga zamudite pomeni
prekluzijo — vaša stranka izgubi pravico do pravnega sredstva.

---

SEKCIJA: Štiri vrste rokov

Procesni rok — določen z zakonom ali sodnim aktom.
Pritožba, odgovor na tožbo, ugovor. Najpomembnejši.

Zastaralni rok — rok zastaranja terjatve ali kazenskega pregona.

Pogodbeni rok — dogovorjen med strankami (rok za izpolnitev,
odstopni rok, rok za reklamacijo).

Interni rok — vaši lastni roki za organizacijo dela
(rok za pregled, rok za pripravo).

---

SEKCIJA: Trak nujnosti

Na nadzorni plošči so roki prikazani z barvnim trakom:

Rdeča — rok poteče v 3 dneh ali manj. Takojšnje ukrepanje.
Oranžna — rok poteče v 7 dneh. Čas za pripravo.
Rumena — rok poteče v 14 dneh. Začnite načrtovati.
Zelena — rok poteče čez 14 dni. Vse pod nadzorom.

---

SEKCIJA: Do trije opomniki

Za vsak rok nastavite do 3 opomnike:

1. opomnik — 14 dni pred rokom (začnite pripravo)
2. opomnik — 7 dni pred rokom (pregled in dopolnitve)
3. opomnik — 1 dan pred rokom (zadnji pregled)

Sistem vas opomni z obvestilom v sistemu. Dona vam lahko
ob opomniku tudi pripravi povzetek zadeve in predlaga
naslednje korake.

---

SEKCIJA: Statistika

V modulu Roki vidite:
— koliko rokov je aktivnih
— koliko poteče ta teden
— koliko je zamujenih (če so)
— razporeditev po vrstah in prioritetah

---

CTA: Noben rok ne sme ostati spregledan.
GUMB: Dogovorite se za predstavitev
```

---

### 3.7 /funkcije/dokumenti — Priprava dokumentov

```
NASLOV: Priprava dokumentov
PODNASLOV: Osnutki na podlagi spisa in zakonodaje. Vi pregledate in podpišete.

---

SEKCIJA: Kako Dona pripravi dokument

1. Izberete vrsto dokumenta (vloga, pritožba, dopis, pogodba...)
2. Dona prebere podatke iz spisa — stranke, opravilno številko,
   relevantne datume in predhodne dokumente
3. Poišče ustrezno zakonodajo in sodno prakso
4. Pripravi strukturiran osnutek s sklici na zakonske člene
5. Vi pregledate, popravite in potrdite

---

SEKCIJA: 7 kategorij predlog

Vloge — tožbe, odgovori na tožbe, ugovori, predlogi
Pritožbe — pritožbe zoper sodne odločbe
Dopisi — dopisi sodiščem, nasprotnim strankam, organom
Pogodbe — kupoprodajne, najemne, poravnalne
Pooblastila — pooblastila za zastopanje
Zapisniki — zapisniki sestankov, obravnav
Dopisi strankam — obvestila, poročila, mnenja

Vsaka predloga ima pametna polja ki se samodejno izpolnijo
s podatki iz spisa — ime stranke, opravilna številka, datumi,
naslovi.

---

SEKCIJA: Upravljanje dokumentov

— 10 klasifikacij: vloga, sodba, sklep, dopis, pogodba,
  faktura, dokazilo, korespondenca, zapisnik, drugo
— Polnotekstno iskanje po vsebini dokumentov
— Verzioniranje: sistem hrani vse različice dokumenta
— Oznake (tags) za dodatno organizacijo
— Podprti formati: PDF, DOCX, DOC, JPG, PNG, TIFF

---

CTA: Manj pisanja. Več prava.
GUMB: Dogovorite se za predstavitev
```

---

### 3.8 /funkcije/skladnost — Skladnost in revizija

```
NASLOV: Skladnost in revizija
PODNASLOV: ZPPDFT-2, GDPR, revizijska sled — vse avtomatizirano.

---

SEKCIJA: ZPPDFT-2 preverjanje strank

Zakon o preprečevanju pranja denarja in financiranja terorizma
zahteva od odvetnikov identifikacijo in preverjanje strank.

Dona samodejno:
— preveri identiteto stranke ob vnosu (KYC)
— označi stranke z ustreznim statusom preverjanja
— opozori na stranke ki zahtevajo dodatno preverjanje
— vodi evidenco vseh opravljenih preverjanj

Štirje KYC statusi: nepreverjeno, v postopku, preverjeno, zavrnjeno.

---

SEKCIJA: Revizijska sled

Sistem beleži vsako dejanje vsakega uporabnika:

— kdo je odprl, spremenil ali zaprl spis
— kdo je dodal ali izbrisal dokument
— kdo je spremenil status roka
— kdo je dostopal do podatkov stranke

Revizijska sled je nespremenljiva — zapisov ni mogoče izbrisati
ali spremeniti. Na voljo je za morebitni nadzor Odvetniške
zbornice ali Informacijskega pooblaščenca.

---

SEKCIJA: GDPR skladnost

— Brisanje osebnih podatkov na zahtevo (pravica do pozabe)
— Pregled vseh shranjenih podatkov o posamezniku
— Lokalno hranjenje — podatki nikoli ne zapustijo vaše pisarne
— Evidenca obdelav osebnih podatkov

---

SEKCIJA: Nadzor dostopa

Štiri uporabniške vloge:
— Administrator: polni dostop, upravljanje uporabnikov
— Odvetnik: dostop do vseh spisov in strank
— Tajnica: omejen dostop (brez brisanja, brez nastavitev)
— Zunanji: samo branje dodeljenih spisov

Vsaka vloga ima natančno določene pravice.
Administrator dodeljuje vloge in spremlja aktivnosti.

---

CTA: Skladnost brez dodatnega dela.
GUMB: Dogovorite se za predstavitev
```

---

### 3.9 /o-nas — O nas

```
NASLOV: O nas
PODNASLOV: Numenor d.o.o. — razvijalci sistema Dona.

---

SEKCIJA: Dona

Dona je AI asistentka in celovit poslovni sistem, razvit posebej
za slovenske odvetniške pisarne. Združuje upravljanje vhodne pošte,
vodenje spisov, nadzor rokov, pravno raziskavo, pripravo dokumentov
in preverjanje skladnosti — vse na enem mestu.

Ključna razlika: Dona deluje 100% lokalno, na napravi v vaši
pisarni. Vaši podatki nikoli ne zapustijo vaših prostorov.

---

SEKCIJA: Numenor d.o.o.

Smo slovensko tehnološko podjetje specializirano za razvoj
AI rešitev za regulirane panoge — pravo, notariat, finančno
svetovanje.

dona@numenor.si
numenor.si

---

SEKCIJA: Uvedba

Uvedba sistema Dona poteka v treh korakih:

1. Predstavitev — pokažemo vam sistem v živo in odgovorimo
   na vaša vprašanja. Brezplačno, brez obveznosti.

2. Namestitev — v enem delovnem dnevu namestimo sistem
   na vašo napravo, uvozimo obstoječe podatke in povežemo
   e-pošto.

3. Usposabljanje — naučimo vas in vaše zaposlene uporabljati
   sistem. Nudimo podporo tudi po uvedbi.

---

CTA: Začnite z brezplačno predstavitvijo.
GUMB: Dogovorite se za predstavitev
```

---

## 4. Prioritetni vrstni red implementacije

| # | Kaj | Zakaj | Obseg |
|---|-----|-------|-------|
| 1 | `/faq` | Najhitrejša za naredit, takoj zmanjša trenje | 1 HTML |
| 2 | `/primeri` | 3 scenariji ki prepričajo različne pisarne | 1 HTML |
| 3 | Homepage gumbi | Poveži obstoječe sekcije s podstranmi | CSS + par `<a>` tagov |
| 4 | `/funkcije/*` (6 strani) | Globina za vsakega ki ga zanima specifičen modul | 6 HTML |
| 5 | `/o-nas` | Podjetje, kontakt | 1 HTML |
| 6 | `subpage.css` + `subpage.js` | Skupni okvir | 2 datoteki |

Skupaj: **10 novih HTML strani + 2 support datoteki + minimalne spremembe na homepage.**

---

## 5. SEO za podstrani

Vsaka podstran dobi:
- Unikaten `<title>`: "Funkcija — Dona"
- Unikaten `<meta description>`: 1-2 stavka
- JSON-LD WebPage schema
- Canonical URL
- Open Graph tags (ista OG slika kot homepage)

Dodaj v `sitemap.xml` vse nove URL-je.

---

## 6. Naslednji koraki

1. Preglej ta dokument in potrdi besedila
2. Implementiraj `subpage.css` + `subpage.js`
3. Naredi `/faq` in `/primeri` kot prvi dve podstrani
4. Preveri na Vercel preview
5. Dodaj gumbe na homepage
6. Implementiraj preostale podstrani
7. Posodobi sitemap.xml in robots.txt
8. Deploy
