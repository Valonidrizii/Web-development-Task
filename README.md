# Praktikë frontend — Detyrat 21–50

30 zgjidhje për PDF-në “HTML_CSS_JS_Intern_Tasks_21-50 1.pdf”, përfshirë sfidat shtesë. Ndërfaqja dhe shpjegimet janë në shqip, me HTML, CSS dhe JavaScript pa frameworks.

## Si hapen

Hap `index.html` për menunë e të gjitha detyrave. Secila dosje ka `index.html`, `styles.css`, `script.js` kur nevojitet dhe një `README.md` me shpjegime dhe kontrolle për demonstrim.

Për ruajtje lokale të qëndrueshme te shënimet dhe lidhjet, rekomandohet një server lokal. Nga kjo dosje ekzekuto:

```sh
python3 -m http.server 8000
```

Hap `http://localhost:8000`. Ndale serverin me Ctrl+C. Nuk kërkohet instalim paketash ose hap build.

## Përmbajtja

- **21–29:** artikuj, galeri, formularë, panel me Grid, butona, sticky sidebar, hero me Flexbox dhe animacione.
- **30–38:** konvertues, lojë, fjalëkalime, numërim teksti, kronometër, timer, karusel, njoftime dhe progres leximi.
- **39–50:** renditje, faqëzim, formular me hapa, shënime, lidhje, shpenzime, kuiz, checkbox, dropdown, parapamje skedari, JSON dhe tabelë me tastierë.

## Shënime

- Galeria dhe karuseli përdorin ilustrime SVG origjinale, lokale, pa varësi nga interneti.
- Detyrat 42 dhe 43 përdorin çelësa të veçantë në localStorage. Të dhënat mbeten në këtë shfletues dhe këtë origjinë; nuk sinkronizohen.
- Formularët janë demonstrues. Nuk dërgohen të dhëna dhe nuk kryhet pagesë ose abonim.
- Shpenzimet e detyrës 44 ruhen vetëm gjatë hapjes së faqes.
- Kohëmatësit përdorin performance.now, jo numërim të thirrjeve të intervalit. Vonesa e shfletuesit mund ta vonojë rifreskimin vizual.
- Numri i fjalive në detyrën 33 është vlerësim i thjeshtë, jo analizë gjuhësore.
- Detyra 48 kontrollon tipin, madhësinë dhe nëse imazhi lexohet. Asgjë nuk ngarkohet në server.

## Verifikimi

Shih `VERIFIKIMI.md` për rezultatet dhe README-n e secilës detyrë për hapat manualë.
