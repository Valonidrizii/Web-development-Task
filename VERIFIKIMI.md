# Verifikimi — Detyrat 21–50

Kontrolluar më 27 tetor 2026 në Google Chrome (headless), përmes një serveri lokal HTTP.

## Rezultati

**167 kontrolle kaluan; 0 dështime, 0 përjashtime JavaScript dhe 0 përgjigje HTTP të dështuara për burimet e faqeve.**

- Të 31 faqet (menuja dhe 30 detyrat) u hapën në gjerësi **375px** dhe **1280px**. Nuk pati dalje horizontale, imazhe të dukshme të prishura ose fusha të dukshme pa etiketa. Secila faqe ka një h1.
- U kontrolluan sintaksat e të 23 skedarëve JavaScript me `node --check`.
- U kontrolluan lidhjet dhe skedarët lokalë, si dhe ID-të në HTML: pa skedarë të munguar ose ID të përsëritura.
- U inspektuan pamje të ruajtura të menusë, galerisë, panelit, hero-s, formularit me hapa dhe tabelës me tastierë në të dy gjerësitë.

## Skenarët funksionalë

| Detyrat | Kontrollet kryesore |
| --- | --- |
| 21–29 | Lidhjet e përmbajtjes, data time, gjashtë figure/figcaption, autocomplete, skip link me fokus, disabled/loading, email i pavlefshëm, menu sticky, lidhjet e hero-s dhe reduced motion. |
| 30 | 0 °C = 32 °F; 212 °F = 100 °C; input bosh refuzohet. |
| 31 | Input bosh, 0, 21 dhe 1.5 nuk numërohen; sugjerime më lart/më poshtë; fitore, humbje pas pesë provave dhe reset. |
| 32–33 | Toggle i pavarur ruan vlerën; zero fjalë për whitespace; numërim me hapësira/rreshta të shumtë. |
| 34–35 | Nisje e përsëritur, pauzë që ngrin kohën, vazhdim, xhiro, reset, kohë e pavlefshme dhe përfundim në zero. |
| 36–38 | Karuseli kalon në të dy skajet; miniaturat sinkronizohen; njoftimet mbyllen veçmas; suksesi largohet pas 5 sekondash; progresi është 0%/100%, rillogaritet në resize dhe përballon mungesën e scroll-it. |
| 39–41 | Renditje numerike/alfabetike me barazime të qëndrueshme; 23 regjistrime në pesë faqe; tri në të fundit; ndryshimi i madhësisë kthen faqen e parë; validimi sipas hapit, ruajtja me Back dhe review me tekst të sigurt. |
| 42 | Krijim, ndryshim vetëm i shënimit të zgjedhur, anulim, fshirje, rikthim pas rifreskimit, localStorage i dëmtuar dhe tekst që përmban HTML. |
| 43 | Refuzim i javascript:, data:, ftp: dhe adresës së pavlefshme; normalizim, dublikata, tekst i sigurt, ruajtje dhe fshirje. |
| 44 | Refuzim i shumave boshe/jopozitive dhe përshkrimit bosh; 12.50 + 7.50 = 20.00; fshirje dhe total vetëm për kategorinë e dukshme. |
| 45–47 | Kuizi nuk kalon pa përgjigje, llogarit 5/5 dhe 1/5 siç duhet dhe pastrohet në Restart; checkbox master i pjesshëm/plotë/bosh; qyteti kyçet dhe pastrohet kur ndryshon shteti. |
| 48–49 | Refuzim i tipit/madhësisë, parapamje PNG, skedar i dëmtuar, pastrim dhe revokim URL; JSON bosh/i pavlefshëm, objekt, array, formatim, minify dhe dalje e sigurt. |
| 50 | 25 qeliza dhe një aktive; shigjeta reale të shfletuesit ndalen te kufijtë; nuk veprojnë jashtë fokusit; objektivi dhe reset funksionojnë. |

## Kufijtë e verifikimit

Kontrollet u kryen në Chrome dhe me emulim të gjerësisë, jo në pajisje fizike. Lexuesit e ekranit dhe Safari/Firefox nuk u provuan. Për kontrolle të tjera manuale, ndiq README-n e secilës detyrë dhe provo Tab, Shift+Tab, Enter, Space dhe shigjetat sipas llojit të kontrollit.
