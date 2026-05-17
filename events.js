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
klik('annuller-karakter', () => {
    if (document.getElementById('beholder').style.display === 'none') return;
    lukVindue('karakter')}
);


['asket', 'bytyv', 'forkynder', 'hedonist', 'lovloes', 'laerd', 'militarist'].forEach(klasse => {
    klik(`${klasse}-knap`, () => hentStandardKlasse(klasse));
});

klik('annuller-ny-karakter', () => {
    lukVindue('ny-karakter');
    aabenVindue('karakter');
});


klik('bekraeft-nulstil', () => {
    nulstilData();
    lukVindue('nulstil-karakter');
    lukVindue('ny-karakter');
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

klik('vandsten', () => visJustering('vandsten'));

klik('stor-hvile-knap', () => aabenVindue('hvil'));
klik('bekraeft-hvil', hvil);
klik('annuller-hvil', () => lukVindue('hvil'));

klik('stor-doed-knap', () => aabenVindue('doed'));
klik('bekraeft-doed', doed);
klik('annuller-doed', () => lukVindue('doed'));

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
klik('vaaben-liste-knap', initVaabenListe);

klik('vaaben-vis-skjul', () => toggleVisSkjul('vaaben-vis-skjul', 'vaaben-raekke'));
klik('basisskade-vis-skjul', () => toggleVisSkjul('basisskade-vis-skjul', 'basisskade-beholder'));

// Evner
klik('evne-toggle', visEvneJusteringer);
['form', 'sind', 'intuition', 'styrke', 'behaendighed', 'visdom', 'mystik'].forEach(evne => {
    klik(evne + '-evne', () => visJustering(evne + '-forskydning'));
    klik(evne + '-forskydning-justering-minus', () => forskydningMinus(evne));
    klik(evne + '-forskydning-justering-plus', () => forskydningPlus(evne));
});

// Inventar og noter
klik('inventar-vis-skjul', () => toggleVisSkjul('inventar-vis-skjul', 'inventar-emner'));
klik('faerdigheder-vis-skjul', () => toggleVisSkjul('faerdigheder-vis-skjul', 'faerdigheder-noter-input'));
klik('noter-vis-skjul', () => toggleVisSkjul('noter-vis-skjul', 'noter-input'));

klik('inventar-emner', initInventar);

klik('minus-flaske', () => aendrInventar('flaske', -1));
klik('plus-flaske', () => aendrInventar('flaske', 1));
klik('minus-stenskaar', () => aendrInventar('stenskaar', -1));
klik('plus-stenskaar', () => aendrInventar('stenskaar', 1));
klik('luk-inventar', () => lukVindue('inventar'));

// Våbenvindue
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
        if (e.target !== vindue) return;
        if (document.getElementById('beholder').style.display === 'none') return;
        vindue.style.display = 'none';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('beholder').style.display === 'none') return;
    document.querySelectorAll('.vindue__baggrund').forEach(vindue => {
        vindue.style.display = 'none';
    });
});





// ===============
// === DIVERSE ===
// ===============

// Tooltip: våbennoter ved hover på aktivt våben
const vaabenTooltip = document.getElementById('vaaben-tooltip');
['styrke', 'behaendighed', 'visdom', 'mystik'].forEach(evne => {
    const el = document.getElementById(`basisskade-evne-vaaben-${evne}`);

    el.addEventListener('mouseenter', () => {
        const id = karakter.valgtVaaben[evne];
        const vaaben = (karakter.vaaben || []).find(v => v.id === id);
        if (!vaaben) return;
        const prefix = vaaben.opgradering ? '+' : '';
        vaabenTooltip.innerHTML = `<div style="color: var(--tekst-aktiv); font-weight: 600;">${vaaben.navn}</div>` + `<div>Opgradering: ${prefix}${vaaben.opgradering}</div><br>` + vaaben.noter;
        vaabenTooltip.style.display = 'block';
    });

    el.addEventListener('mousemove', (e) => {
    const gap = 11; // Afstand fra cursor
    let x = e.clientX + gap;
    let y = e.clientY + gap;

    // Hent tooltippens dimensioner og viewportens bredde
    const tooltipBredde = vaabenTooltip.offsetWidth;
    const viewportBredde = window.innerWidth;

    // Tjek for kollision med højre side
    if (x + tooltipBredde > viewportBredde) {
        x = e.clientX - tooltipBredde - gap;
    }

    vaabenTooltip.style.left = x + 'px';
    vaabenTooltip.style.top  = y + 'px';
    });

    el.addEventListener('mouseleave', () => {
        vaabenTooltip.style.display = 'none';
    });
});



// Håndter textarea-størrelse
document.getElementById('noter-input').addEventListener('input', () => {
    opdaterNoteOmraade()
});

document.getElementById('vaaben-noter-input').addEventListener('input', () => {
    opdaterNoteOmraadeVaaben()
});



// Gem karakternavn, klasse, noter
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

document.getElementById('faerdigheder-noter-input').addEventListener('input', (e) => {
    karakter.faerdighedsnoter = e.target.value;
    opdaterNoteOmraadeFaerdigheder();
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
            if (!karakter.valgtVaaben) {karakter.valgtVaaben = { styrke: null, behaendighed: null, visdom: null, mystik: null };}
            if (!karakter.draaberEfterladt) karakter.draaberEfterladt = 0;
            opdaterVistData();
            visArk();
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

if (!localStorage.getItem('karakterark')) {
    document.getElementById('beholder').style.display = 'none';
    document.getElementById('eksporter-knap').style.display = 'none';
    aabenVindue('karakter');
}

opdaterVistData();