// ===============
// === KNAPPER ===
// ===============

// Hjælpefunktion til at tilføje click-eventlisteners
function klik(id, handler) {
    document.getElementById(id).addEventListener('click', handler)
}

// Dark mode
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Sektionskjulere
['grundlaeggende', 'ressourcer', 'status', 'basisskade', 'evner', 'inventar-og-noter'].forEach(sektion => {
    klik(`${sektion}-titel`, () => toggleSektion(sektion));
});

// Grundlæggende
klik('draabe-toggle', () => visJustering('draabe'));
klik('draabe-justering-minus', fjernDraaber);
klik('draabe-justering-plus', tilfoejDraaber);
klik('draaber-efterladt-beholder', samlDraaber);

klik('stor-hvile-knap', () => aabenVindue('hvil'));
klik('bekraeft-hvil', hvil);
klik('annuller-hvil', () => lukVindue('hvil'));

klik('stor-doed-knap', () => aabenVindue('doed'));
klik('bekraeft-doed', doed);
klik('annuller-doed', () => lukVindue('doed'));

// Karakterhåndtering
klik('rediger-knap', () => aabenVindue('karakter'));

klik('eksporter-knap', eksporterData);
klik('importer-knap', importerData);
klik('ny-karakter', () => {
    lukVindue('karakter');
    aabenVindue('ny-karakter')
});
klik('nulstil-knap', () => {
    lukVindue('karakter');
    aabenVindue('nulstil-karakter');}
);
klik('annuller-karakter', () => lukVindue('karakter'));


['asket', 'bytyv', 'forkynder', 'hedonist', 'lovloes', 'laerd', 'militarist'].forEach(klasse => {
    klik(`${klasse}-knap`, () => hentStandardKlasse(klasse));
});

klik('annuller-ny-karakter', () => {
    lukVindue('ny-karakter')
    aabenVindue('karakter');
});


klik('bekraeft-nulstil', () => {
    nulstilData();
    lukVindue('nulstil-karakter')
});

klik('annuller-nulstil', () => {
    lukVindue('nulstil-karakter');
    aabenVindue('karakter');
});

// Ressourcer
klik('ressource-toggle', visRessourceJusteringer);

klik('liv-status', () => visJustering('liv'));
klik('liv-justering-minus', livSkade);
klik('liv-justering-plus', livGenvind);

klik('sejd-status', () => visJustering('sejd'));
klik('sejd-justering-minus', sejdBrug);
klik('sejd-justering-plus', sejdGenvind);

klik('hu-status', () => visJustering('hu'));
klik('hu-justering-regen', huRegen);
klik('hu-justering-minus', huBrug);
klik('hu-justering-plus', huGenvind);

klik('flasker', () => visJustering('flaske'));
klik('flaske-liv', () => drikFlaske('liv'));
klik('flaske-sejd', () => drikFlaske('sejd'));
klik('flaske-laesion', () => drikFlaske('laesion'));

// Status
klik('status-toggle', visStatusJusteringer);

klik('sekvens', () => visJustering('sekvens'));
klik('sekvens-saet', saetSekvens);

klik('haab', () => visJustering('haab'));
klik('haab-justering-minus', haabMinus);
klik('haab-justering-plus', haabPlus);

klik('forvitring', () => visJustering('forvitring'));
klik('forvitring-justering-minus', forvitringMinus);
klik('forvitring-justering-plus', forvitringPlus);

klik('udmattelse', () => visJustering('udmattelse'));
klik('udmattelse-justering-minus', udmattelseMinus);
klik('udmattelse-justering-plus', udmattelsePlus);

klik('laesioner', () => visJustering('laesioner'));
klik('laesioner-justering-minus', laesionerMinus);
klik('laesioner-justering-plus', laesionerPlus);

// Våben og basisskade
klik('vaaben-toggle', visVaabenVaelgere)
klik('basisskade-evne-styrke', () => visJustering('vaaben-vaelger-styrke'));
klik('basisskade-evne-behaendighed', () => visJustering('vaaben-vaelger-behaendighed'));
klik('basisskade-evne-visdom', () => visJustering('vaaben-vaelger-visdom'));
klik('basisskade-evne-mystik', () => visJustering('vaaben-vaelger-mystik'));

// Evner
klik('evne-toggle', visEvneJusteringer);
['form', 'sind', 'intuition', 'styrke', 'behaendighed', 'visdom', 'mystik'].forEach(evne => {
    klik(evne + '-evne', () => visJustering(evne + '-forskydning'));
    klik(evne + '-forskydning-justering-minus', () => forskydningMinus(evne));
    klik(evne + '-forskydning-justering-plus', () => forskydningPlus(evne));
});

// Inventar og noter
document.querySelectorAll('.inventar__emne').forEach(emne => {
    emne.addEventListener('click', () => initInventar());
});

klik('minus-flaske', () => aendrInventar('flaske', -1));
klik('plus-flaske', () => aendrInventar('flaske', 1));
klik('minus-stenskaar', () => aendrInventar('stenskaar', -1));
klik('plus-stenskaar', () => aendrInventar('stenskaar', 1));
klik('luk-inventar', () => lukVindue('inventar'));

// Våbenvindue
klik('vaaben-liste-knap', () => initVaabenListe());
klik('luk-vaabenliste', () => lukVindue('vaabenliste'));
klik('nyt-vaaben-knap', () => aabneVaabenDetalje(null));

document.querySelectorAll('#vaaben-basis-toggle .vaabendetaljer__opgraderingsselektor').forEach(el => {
    el.addEventListener('click', () => {
        vaabenDetaljeState.basis = el.dataset.basis;
        opdaterVaabenBasisToggle();
    });
});

klik('aaben-vaabenopgradering', () => initVaabenOpgradering());
klik('gem-vaaben', gemVaaben);
klik('slet-vaaben', () => visJustering('slet-vaaben-bekraeft'));
klik('slet-vaaben-annuller', () => visJustering('slet-vaaben-bekraeft'));
klik('slet-vaaben-slet', sletVaaben);

klik('annuller-vaabendetalje', () => {
    lukVindue('vaabendetalje');
    initVaabenListe();
});

// Opgraderingsvindue
klik('vaabenopg-minus', () => aendrVaabenOpgraderingNiveau(-1));
klik('vaabenopg-plus', () => aendrVaabenOpgraderingNiveau(1));
klik('vaabenopg-smedje', () => {
    vaabenOpgVindueVedVandsten = false;
    opdaterVaabenOpgraderingVindue();
});
klik('vaabenopg-vandsten', () => {
    vaabenOpgVindueVedVandsten = true;
    opdaterVaabenOpgraderingVindue();
});
klik('bekraeft-vaabenopgradering', bekraeftVaabenOpgradering);
klik('annuller-vaabenopgradering', () => lukVindue('vaabenopgradering'));

// Evneforbedringsvindue
klik('bekraeft-evne', bekraeftEvneForbedringer);
klik('annuller-evne', () => lukVindue('evneforbedring'));
klik('evneforbedringsknap', () => initEvneVindue());








// ==========================
// === KEYBOARD SHORTCUTS ===
// ==========================

// Enter ved input
document.getElementById('liv-input').addEventListener('keydown', (e) =>{if (e.key === 'Enter') livSkade();});
document.getElementById('sejd-input').addEventListener('keydown', (e) =>{if (e.key === 'Enter') sejdBrug();});
document.getElementById('draaber-input').addEventListener('keydown', (e) => {if (e.key === 'Enter') tilfoejDraaber();});
document.getElementById('sekvens-input').addEventListener('keydown', (e) => {if (e.key === 'Enter') saetSekvens();});

// Luk vinduer
document.querySelectorAll('.vindue__baggrund').forEach(vindue => {
    vindue.addEventListener('click', (e) => {
        if (e.target === vindue) {
            vindue.style.display = 'none';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.vindue__baggrund').forEach(vindue => {
        vindue.style.display = 'none';
    });
});





// ===============
// === DIVERSE ===
// ===============

// Håndter textarea-størrelse
document.getElementById('noter-input').addEventListener('input', () => {
    opdaterNoteOmraade()
});

document.getElementById('vaaben-noter-input').addEventListener('input', () => {
    opdaterNoteOmraadeVaaben()
});



// Gem karakternavn og klasse
document.getElementById('karakterNavn').addEventListener('input', (e) => {
    karakter.navn = e.target.value;
    gemData();
});

document.getElementById('karakterKlasse').addEventListener('input', (e) => {
    karakter.klasse = e.target.value;
    gemData();
});

document.getElementById('noter-input').addEventListener('input', (e) => {
    karakter.noter = e.target.value;
    gemData();
});



// Propagation-stoppers
document.querySelectorAll('.justering').forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

document.getElementById('draaber-efterladt-beholder').addEventListener('click', (e) => {
    e.stopPropagation();
});



// Importer-input
document.getElementById('importer-input').addEventListener('change', (e) => {
    const fil = e.target.files[0];
    if (!fil) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            Object.assign(karakter, data);
            if (!karakter.vaaben) karakter.vaaben = [];
            if (!karakter.vaelgtVaaben) {karakter.vaelgtVaaben = { styrke: null, behaendighed: null, visdom: null, mystik: null };}
            if (!karakter.draaberEfterladt) karakter.draaberEfterladt = 0;
            opdaterVistData();
            visBesked('Karakter indlæst.');
        } catch {
            visBesked('Fejl: Kunne ikke læse filen.');
        }
    };
    reader.readAsText(fil);
    e.target.value = '';
    lukVindue('karakter');
});





// ======================
// === INITIALISERING ===
// ======================
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}
indlaesData();
opdaterVistData();