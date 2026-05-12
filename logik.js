// ===============
// === VISNING ===
// ===============

// Visningsfunktionen
function opdaterVistData() {
    opdaterGrundlaeggende();
    opdaterRessourcer();
    opdaterStatus();
    opdaterBasisskader()
    opdaterEvner();
    opdaterInventarOgNoter();
    gemData();
    opdaterDoedVisning();

    function opdaterGrundlaeggende() {
        document.getElementById('karakterNavn').value = karakter.navn;
        document.getElementById('karakterKlasse').value = karakter.klasse;
        const level = karakter.form + karakter.sind + karakter.intuition +
            karakter.styrke + karakter.behaendighed + karakter.visdom + karakter.mystik;
        document.getElementById('karakterLevel').textContent = level;
        document.getElementById('draaber').textContent = karakter.draaber;
        document.getElementById('draaber-efterladt').textContent = karakter.draaberEfterladt;
        document.getElementById('draaber-efterladt-beholder').classList.toggle('aktiv', karakter.draaberEfterladt > 0);
        document.getElementById('faerdigheder-noter-input').value = karakter.faerdighedsnoter;
        opdaterNoteOmraadeFaerdigheder();
    }

    function opdaterRessourcer() {
        beregnRessourcer();
        saetRessourcer();
        opdaterBarer();
        opdaterFlaskeIkoner();

        function beregnRessourcer() {
            const vitalMax = getVitalMax(karakter.form + karakter.forskydning.form);
            karakter.livVital = vitalMax;
            karakter.livMax = karakter.livVital - (karakter.forvitring * Math.ceil(karakter.livVital / 10));
            if (karakter.livNu > karakter.livMax) karakter.livNu = karakter.livMax;

            if (karakter.livMax > 0) {
                karakter.endeligtDoed = false;
            } else if (karakter.livMax <= 0) {
                karakter.endeligtDoed = true;
            }

            const sejdMax = getSejdMax(karakter.sind + karakter.forskydning.sind);
            karakter.sejdMax = Math.max(0, sejdMax);
            if (karakter.sejdNu > karakter.sejdMax) karakter.sejdNu = karakter.sejdMax;

            const huMax = Math.max(1, getHuMax(karakter.intuition + karakter.forskydning.intuition) - karakter.laesioner);
            const huRegen = Math.max(0, getHuRegen(karakter.intuition + karakter.forskydning.intuition) - karakter.udmattelse);
            karakter.huMax = huMax;
            karakter.huRegen = huRegen;
            if (karakter.huNu > karakter.huMax) karakter.huNu = karakter.huMax;
        }

        function saetRessourcer() {
            document.getElementById('livVital').textContent = karakter.livVital;
            document.getElementById('livMax').textContent = karakter.livMax;
            document.getElementById('livNu').textContent = karakter.livNu;
            document.getElementById('sejdMax').textContent = karakter.sejdMax;
            document.getElementById('sejdNu').textContent = karakter.sejdNu;
            document.getElementById('huMax').classList.toggle('reduceret', karakter.huMax < getHuMax(karakter.intuition));
            document.getElementById('huRegen').classList.toggle('reduceret', karakter.huRegen < getHuRegen(karakter.intuition));
            document.getElementById('huMax').textContent = karakter.huMax;
            document.getElementById('huRegen').textContent = karakter.huRegen;
            document.getElementById('huNu').textContent = karakter.huNu;
            document.getElementById('flaskerNu').textContent = karakter.flaskerNu;
            document.getElementById('flaskerMax').textContent = karakter.flaskerMax;
        }

        function opdaterBarer() {
            if (karakter.livNu < 0) {
                document.getElementById('livBar').style.width = '0%';
            } else {
                const livProcent = (karakter.livNu / karakter.livMax * 100).toFixed(0);
                document.getElementById('livBar').style.width = livProcent + '%';
            }

            if (karakter.sejdNu < 0) {
                document.getElementById('sejdBar').style.width = '0%';
            } else {
            const sejdProcent = (karakter.sejdNu / karakter.sejdMax * 100).toFixed(0);
            document.getElementById('sejdBar').style.width = sejdProcent + '%';
            }

            if (karakter.huNu < 0) {
                document.getElementById('huBar').style.width = '0%';
            } else {
            const huProcent = (karakter.huNu / karakter.huMax * 100).toFixed(0);
            document.getElementById('huBar').style.width = huProcent + '%';
            }
        }

    }

    function opdaterStatus() {
        const sekvenspulje = getPulje(karakter.form + karakter.forskydning.form) + getPulje(karakter.intuition + karakter.forskydning.intuition);
        document.getElementById('sekvens-pulje').textContent = sekvenspulje + 'd6';
        document.getElementById('sekvens-vaerdi').textContent = karakter.sekvens;
        document.getElementById('haab-vaerdi').textContent = karakter.haab;
        document.getElementById('forvitring-vaerdi').textContent = karakter.forvitring;
        document.getElementById('udmattelse-vaerdi').textContent = karakter.udmattelse;
        document.getElementById('laesioner-vaerdi').textContent = karakter.laesioner;
    }

    function opdaterEvner() {
        opdaterEvne('form', karakter.form, karakter.forskydning.form);
        opdaterEvne('sind', karakter.sind, karakter.forskydning.sind);
        opdaterEvne('intuition', karakter.intuition, karakter.forskydning.intuition);
        opdaterEvne('styrke', karakter.styrke, karakter.forskydning.styrke);
        opdaterEvne('behaendighed', karakter.behaendighed, karakter.forskydning.behaendighed);
        opdaterEvne('visdom', karakter.visdom, karakter.forskydning.visdom);
        opdaterEvne('mystik', karakter.mystik, karakter.forskydning.mystik);
    }

    function opdaterInventarOgNoter() {
        document.getElementById('stenvandsflasker').textContent = karakter.flaskerMax;
        document.getElementById('stenskaar').textContent = karakter.stenskaar;

        document.getElementById('noter-input').value = karakter.noter;
        opdaterNoteOmraade();
    }

    function opdaterDoedVisning() {
        if (karakter.endeligtDoed) {
            document.getElementById('endeligtdoed').style.display = 'block';
        } else {
            document.getElementById('endeligtdoed').style.display = 'none';
        }
    }
}



// Vis besked
function visBesked(tekst) {
    const container = document.getElementById('besked-beholder');
    const el = document.createElement('div');
    el.className = 'besked';
    el.textContent = tekst;
    container.appendChild(el);
    el.addEventListener('click', () => fjernBesked(el));
    el._timer = setTimeout(() => fjernBesked(el), 6000);
}

function fjernBesked(el) {
    clearTimeout(el._timer);
    el.classList.add('ud');
    el.addEventListener('animationend', () => el.remove(), { once: true });
}



// Skjul sektioner
function toggleSektion(type) {
    const sektion = document.getElementById(type + '-indhold');
    sektion.classList.toggle('skjult-indhold');
}



// Ændre størrelse på noteområde
function opdaterNoteOmraade() {
    const noter = document.getElementById('noter-input');
    noter.style.height = 'auto';
    noter.style.height = noter.scrollHeight + 'px';
}

function opdaterNoteOmraadeFaerdigheder() {
    const noter = document.getElementById('faerdigheder-noter-input');
    noter.style.height = 'auto';
    noter.style.height = noter.scrollHeight + 'px';
}

function opdaterNoteOmraadeVaaben() {
    const noter = document.getElementById('vaaben-noter-input');
    noter.style.minHeight = '3rem'
    noter.style.height = 'auto';
    noter.style.height = noter.scrollHeight + 'px';
}



// Hjælpefunktion: Tjek endelig død
function erEndeligDoed() {
    if (!karakter.endeligtDoed) return false;
        visBesked('Du er endeligt død.');
        return true;
}



// Vis/skjul justeringer
function visJustering(type) {
    if (erEndeligDoed() && type !== 'forvitring') return;

    const justering = document.getElementById(type + '-justering');
    justering.classList.toggle('justering--aktiv');
}

function visRessourceJusteringer() {
    if (erEndeligDoed()) return;

    const justeringer = document.querySelectorAll('.ressource .justering');
    const alleAktive = Array.from(justeringer).every(el => el.classList.contains('justering--aktiv'));
    justeringer.forEach(el => {
        el.classList.toggle('justering--aktiv', !alleAktive);
    });
}

function visStatusJusteringer() {
    if (erEndeligDoed()) return;
    
    const justeringer = document.querySelectorAll('.justering--stat');
    const alleAktive = Array.from(justeringer).every(el => el.classList.contains('justering--aktiv'));
    justeringer.forEach(el => {
        el.classList.toggle('justering--aktiv', !alleAktive);
    });
}

function visEvneJusteringer() {
    if (erEndeligDoed()) return;
    
    const justeringer = document.querySelectorAll('.justering--evne-forskydning');
    const alleAktive = Array.from(justeringer).every(el => el.classList.contains('justering--aktiv'));
    justeringer.forEach(el => {
        el.classList.toggle('justering--aktiv', !alleAktive);
    });
}

function visVaabenVaelgere() {
    if (erEndeligDoed()) return;
    
    const justeringer = document.querySelectorAll('.justering.vaaben-vaelger');
    const alleAktive = Array.from(justeringer).every(el => el.classList.contains('justering--aktiv'));
    justeringer.forEach(el => {
        el.classList.toggle('justering--aktiv', !alleAktive);
    });
}





// Vis/skjul vinduer
function aabenVindue(vindueId) {
    const tilladte = ['karakter', 'ny-karakter', 'nulstil-karakter'];
    if (erEndeligDoed() && !tilladte.includes(vindueId)) return;
    
    document.getElementById(vindueId + '-vindue').style.display = 'flex';
}

function lukVindue(vindueId) {
    document.getElementById(vindueId + '-vindue').style.display = 'none';
}





// Vis/skjul noter
function visFaerdigheder() {
    const knap = document.getElementById('faerdigheder-vis-skjul');
    const noter = document.getElementById('faerdigheder-noter-input');

    if (noter.classList.contains('skjult-indhold')) {
        noter.classList.remove('skjult-indhold');
        knap.textContent = 'skjul';
    } else {
        noter.classList.add('skjult-indhold');
        knap.textContent = 'vis';
    }
}

function visInventar() {
    const knap = document.getElementById('inventar-vis-skjul');
    const emner = document.getElementById('inventar-emner');

    if (emner.classList.contains('skjult-indhold')) {
        emner.classList.remove('skjult-indhold');
        knap.textContent = 'skjul';
    } else {
        emner.classList.add('skjult-indhold');
        knap.textContent = 'vis';
    }
}


// =======================
// === HJÆLPEBEREGNERE ===
// =======================

// Evnelevels og puljer
function opdaterEvne(navn, level, forskydning) {
    document.getElementById(navn + '-level').textContent = level;
    const pulje = getPulje(level);
    document.getElementById(navn + '-pulje').textContent = pulje + 'd6';

    const forskudtLevel = level + forskydning;
    const forskudt = document.getElementById(navn + '-forskudt');
    const forskydningsTal = document.getElementById(navn + '-forskydning-vaerdi');
    ['evne__level--forskudt-op', 'evne__level--ikke-forskudt', 'evne__level--forskudt-ned'].forEach(cls => 
        forskudt.classList.remove(cls)
    );

    if (forskydning === 0) {
        forskudt.textContent = forskudtLevel;
        forskydningsTal.textContent = 0;
        forskudt.classList.add('evne__level--ikke-forskudt');
    } else if (forskydning > 0) {
        forskudt.textContent = forskudtLevel;
        forskydningsTal.textContent = '+' + forskydning;
        forskudt.classList.add('evne__level--forskudt-op');
    } else if (forskydning < 0) {
        forskudt.textContent = forskudtLevel;
        forskydningsTal.textContent = forskydning;
        forskudt.classList.add('evne__level--forskudt-ned');
    }
}



// Flasker
function opdaterFlaskeIkoner() {
    const fyldte = '◉ '.repeat(karakter.flaskerNu).trim();
    const tomme = '○ '.repeat(karakter.flaskerMax - karakter.flaskerNu).trim();
    const ikoner = [fyldte, tomme].filter(s => s).join(' ');
    document.getElementById('flaske-ikoner').textContent = ikoner;
}



// Udregn pulje
function getPulje(level) {
    if (level <= 6) return 1;
    if (level <= 12) return 2;
    if (level <= 20) return 3;
    if (level <= 29) return 4;
    if (level <= 39) return 5;
    if (level <= 50) return 6;
    if (level <= 63) return 7;
    if (level <= 78) return 8;
    if (level <= 94) return 9;
    return 10;
}



// Liv
function getVitalMax(form) {
    if (form <= 20) return form * 5;
    if (form <= 40) return 100 + (form - 20) * 4;
    if (form <= 60) return 180 + (form - 40) * 3;
    if (form <= 80) return 240 + (form - 60) * 2;
    if (form <= 100) return 280 + (form - 80) * 1;
    return 300 + (form - 100);
}

// Sejd
function getSejdMax(sind) {
    return sind;
}

// Hu
function getHuMax(intuition) {
    if (intuition <= 9) return 5;
    if (intuition <= 29) return 6;
    if (intuition <= 49) return 7;
    if (intuition <= 69) return 8;
    if (intuition <= 89) return 9;
    return 10;
}

function getHuRegen(intuition) {
    if (intuition <= 19) return 4;
    if (intuition <= 39) return 5;
    if (intuition <= 69) return 6;
    return 7;
}





// ==================
// === RESSOURCER ===
// ==================

// Dråber
function tilfoejDraaber() {
    const antal = parseInt(document.getElementById('draaber-input').value) || 0;
    karakter.draaber = Math.max(0, karakter.draaber + antal);
    document.getElementById('draaber-input').value = '';
    opdaterVistData();
}

function fjernDraaber() {
    const antal = parseInt(document.getElementById('draaber-input').value) || 0;
    karakter.draaber = Math.max(0, karakter.draaber - antal);
    document.getElementById('draaber-input').value = '';
    opdaterVistData();
}

function efterladDraaber() {
    const efterladte = document.getElementById('draaber-efterladt-beholder');
    karakter.draaberEfterladt = karakter.draaber;
    karakter.draaber = 0;
    if (karakter.draaberEfterladt === 0) {
        efterladte.classList.remove('aktiv');
    } else {
        efterladte.classList.add('aktiv');
    }
}

function samlDraaber() {
    karakter.draaber = karakter.draaber + karakter.draaberEfterladt;
    karakter.draaberEfterladt = 0;
    document.getElementById('draaber-efterladt-beholder').classList.remove('aktiv');
    opdaterVistData();
}



// Liv
function livSkade() {
    const skade = parseInt(document.getElementById('liv-input').value) || 0;
    let nyLaesion = false;
    if (skade >= karakter.livMax / 2) {nyLaesion = true};
    if (nyLaesion) {karakter.laesioner++};
    karakter.livNu = Math.max(0, karakter.livNu - skade);
    document.getElementById('liv-input').value = '';
    opdaterVistData();
    if (nyLaesion) {
        visBesked('Du har fået en læsion.');
    };
}

function livGenvind() {
    const heletLiv = parseInt(document.getElementById('liv-input').value) || 0;
    karakter.livNu = Math.min(karakter.livMax, karakter.livNu + heletLiv);
    document.getElementById('liv-input').value = '';
    opdaterVistData();
}



// Sejd
function sejdBrug() {
    const forbrug = parseInt(document.getElementById('sejd-input').value) || 0;

    if (forbrug <= 0) return;

    if (karakter.sejdNu <= 0) {
        visBesked('Du har ikke mere Sejd.');
        return;
    };

    if (forbrug > karakter.sejdNu) {
        visBesked('Du har ikke nok Sejd.');
        return;
    }

    const nySejd = karakter.sejdNu - forbrug;

    if (nySejd === 0) {
        visBesked('Du løb tør for Sejd og er udmattet.')
        karakter.udmattelse++;
    };

    karakter.sejdNu = nySejd;
    document.getElementById('sejd-input').value = '';
    opdaterVistData();
}

function sejdGenvind() {
    const genvundet = parseInt(document.getElementById('sejd-input').value) || 0;

    if (genvundet <= 0) return;

    if (genvundet > 0 && karakter.sejdNu === 0 && karakter.udmattelse > 0) {
        karakter.udmattelse -= 1;
        visBesked('Du er ikke længere udmattet af Sejd-mangel.');
    }

    karakter.sejdNu = Math.min(karakter.sejdMax, karakter.sejdNu + genvundet);
    document.getElementById('sejd-input').value = '';
    opdaterVistData();
}



// Hu
function huBrug() {
    if (karakter.huNu === 0) {
        visBesked('Du har ikke nok Hu.');
        return;
    }
    
    karakter.huNu = karakter.huNu - 1;
    opdaterVistData();
    tjekBevidstloeshed();
}

function huGenvind() {
    karakter.huNu = Math.min(karakter.huMax, karakter.huNu +1);
    opdaterVistData();
}

function huRegen() {
    karakter.huNu = Math.min(karakter.huMax, karakter.huNu + karakter.huRegen);
    opdaterVistData();
    tjekBevidstloeshed();
}

function tjekBevidstloeshed() {
    if (karakter.huRegen === 0 && karakter.huNu === 0) {
        visBesked('Du er bevidstløs.');
    }
}



// Flasker
function drikFlaske(type) {
    if (karakter.flaskerNu <= 0) {
        visBesked('Du har ikke flere stenvandsflasker.');
        return;}

    if (type === 'liv') {
        if (karakter.livNu === karakter.livMax) {
            visBesked('Du har fuld Liv.');
            return;
        }
        const flaskeLiv = Math.ceil(karakter.livMax / 2);
        karakter.livNu = Math.min(karakter.livMax, flaskeLiv + karakter.livNu);
        karakter.flaskerNu -= 1;
        opdaterVistData();
    } else if (type === 'sejd') {
        if (karakter.sejdNu === karakter.sejdMax) {
            visBesked('Du har fuld Sejd.');
            return;
        }
        const flaskeSejd = Math.ceil(karakter.sejdMax / 2);
        if (karakter.sejdNu <= 0 && karakter.udmattelse > 0) {
            karakter.udmattelse -= 1;
        }
        karakter.sejdNu = Math.min(karakter.sejdMax, flaskeSejd + karakter.sejdNu);
        karakter.flaskerNu -= 1;
        opdaterVistData();
    } else if (type === 'laesion') {
        if (karakter.laesioner <= 0) {
            visBesked('Du har ingen læsioner.');
            return;
        }
        karakter.laesioner -= 1;
        karakter.flaskerNu -= 1;
        opdaterVistData();
    }
}



// Inventar
function initInventar() {
    const flaskeTal = document.getElementById('antal-flaske');
    const stenskaarTal = document.getElementById('antal-stenskaar');

    flaskeTal.textContent = karakter.flaskerMax;
    stenskaarTal.textContent = karakter.stenskaar;

    aabenVindue('inventar');
}

function aendrInventar(emne, aendring) {
    if (emne === 'flaske') {
        const nytAntal = Math.max(0, karakter.flaskerMax + aendring);
        karakter.flaskerMax = nytAntal;
        karakter.flaskerNu = Math.min(karakter.flaskerNu, nytAntal);
        document.getElementById('antal-flaske').textContent = nytAntal;
    } else if (emne === 'stenskaar') {
        const nytAntal = Math.max(0,karakter.stenskaar + aendring);
        karakter.stenskaar = nytAntal;
        document.getElementById('antal-stenskaar').textContent = nytAntal;
    }
    opdaterVistData();
}





// ===============
// === STATIUS ===
// ===============

// Sekvens
function saetSekvens() {
    const sekvensInput = document.getElementById('sekvens-input');
    const nytSekvens = parseInt(sekvensInput.value) || 0;
    karakter.sekvens = nytSekvens;
    sekvensInput.value = '';
    opdaterVistData();
}



// Håb
function haabMinus() {
    karakter.haab = Math.max(0, karakter.haab - 1);
    opdaterVistData();
}

function haabPlus() {
    karakter.haab = Math.min(3, karakter.haab + 1);
    opdaterVistData();
}



// Forvitring
function forvitringMinus() {
    karakter.forvitring = Math.max(0, karakter.forvitring - 1);
    opdaterVistData();
}

function forvitringPlus() {
    karakter.forvitring = karakter.forvitring + 1;
    opdaterVistData();
}


// Udmattelse
function udmattelseMinus() {
    if (karakter.sejdNu === 0 && karakter.udmattelse === 1) {
        visBesked('Genvind Sejd for at lette din udmattelse.');
        return;
    }
    karakter.udmattelse = Math.max(0, karakter.udmattelse - 1);
    opdaterVistData();
}

function udmattelsePlus() {
    karakter.udmattelse = karakter.udmattelse + 1;
    opdaterVistData();
    tjekBevidstloeshed();
}



// Læsioner
function laesionerMinus() {
    karakter.laesioner = Math.max(0, karakter.laesioner - 1);
    opdaterVistData();
}

function laesionerPlus() {
    karakter.laesioner = karakter.laesioner + 1;
    opdaterVistData();
}





// ======================
// === VED VANDSTENEN ===
// ======================

// Hvile ved vandsten
function hvil() {
    if (karakter.sejdNu <= 0 && karakter.udmattelse > 0) {
        karakter.udmattelse -= 1;
    }
    karakter.laesioner = 0;
    karakter.livNu = karakter.livMax;
    karakter.sejdNu = karakter.sejdMax;
    karakter.huNu = getHuMax(karakter.intuition + karakter.forskydning.intuition);
    karakter.flaskerNu = karakter.flaskerMax;
    opdaterVistData();
    lukVindue('hvil');
}



// Død
function doed() {
    karakter.forvitring++;
    const vitalMax = getVitalMax(karakter.form + karakter.forskydning.form);
    const nyLivMax = vitalMax - (karakter.forvitring * Math.ceil(vitalMax / 10));
    karakter.livNu = Math.max(0, nyLivMax);
    
    efterladDraaber();
    
    if (nyLivMax <= 0) {
        karakter.endeligtDoed = true;
        visBesked('Du er endeligt død.');
        return;
    }

    if (karakter.draaberEfterladt > 0) {
        visBesked('Du er død og genopvågnet. Du har efterladt ' + karakter.draaberEfterladt + ' Dråber.');
    } else {
        visBesked('Du er død og genopvågnet.');
    }

    opdaterVistData();
    lukVindue('doed');
}





// =============
// === EVNER ===
// =============

function forskydningPlus(evne) {
    karakter.forskydning[evne] += 1;
    opdaterVistData();
}

function forskydningMinus(evne) {
    karakter.forskydning[evne] -= 1;
    opdaterVistData();
}





// ======================
// === EVNEFORBEDRING ===
// ======================

const evneNoegler = ['form', 'sind', 'intuition', 'styrke', 'behaendighed', 'visdom', 'mystik'];
const evneVisningsnavn = {
    form: 'Form', sind: 'Sind', intuition: 'Intuition',
    styrke: 'Styrke', behaendighed: 'Behændighed', visdom: 'Visdom', mystik: 'Mystik'
};

// Modul-niveau state så alle funktioner deler samme data
let evneVindueData = null;
let evneForbedringer = {};
  
function initEvneVindue() {
    evneForbedringer = { form: 0, sind: 0, intuition: 0, styrke: 0, behaendighed: 0, visdom: 0, mystik: 0 };
 
    evneVindueData = {
        karakterLevel: karakter.form + karakter.sind + karakter.intuition +
                       karakter.styrke + karakter.behaendighed + karakter.visdom + karakter.mystik,
        draaber: karakter.draaber,
        evner: {
            form: karakter.form, sind: karakter.sind, intuition: karakter.intuition,
            styrke: karakter.styrke, behaendighed: karakter.behaendighed,
            visdom: karakter.visdom, mystik: karakter.mystik
        }
    };
 
    document.getElementById('evne-liste').innerHTML = '';
    opretEvneListe();
    opdaterEvneVindueHoved();
    opdaterEvneVindueFod();
    aabenVindue('evneforbedring');
}
 
function opretEvneListe() {
    const evneListe = document.getElementById('evne-liste');
 
    for (const evne of evneNoegler) {
        const raekke = document.createElement('div');
        raekke.className = 'vindue__raekke';
        raekke.id = `vindue__raekke-${evne}`;
 
        raekke.innerHTML = `
            <div class="evne-navn">${evneVisningsnavn[evne]}</div>
            <div class="vindue__evne-info" id="info-${evne}"></div>
            <div class="vindue__knapgruppe">
                <button class="minus-btn" id="minus-${evne}">-</button>
                <span class="antal-badge" id="antal-${evne}">0</span>
                <button class="plus-btn" id="plus-${evne}">+</button>
            </div>
        `;
 
        evneListe.appendChild(raekke);
        document.getElementById(`minus-${evne}`).addEventListener('click', () => aendrEvne(evne, -1));
        document.getElementById(`plus-${evne}`).addEventListener('click', () => aendrEvne(evne, 1));
        opdaterEvneInfo(evne);
    }
}
 
function aendrEvne(evne, aendring) {
    const nuvaerendeLvl = evneVindueData.evner[evne];
    const antalForbedringer = evneForbedringer[evne];
    const nytAntal = antalForbedringer + aendring;
    const nytLevel = nuvaerendeLvl + nytAntal;
 
    if (nytAntal < 0) return;
    if (nytLevel > 100) return;
 
    // Simuler ændringen for at tjekke om vi har råd
    if (aendring > 0) {
        evneForbedringer[evne] = nytAntal;
        const nyOmkostning = beregnTotalOmkostning();
        evneForbedringer[evne] = antalForbedringer;
        if (nyOmkostning > evneVindueData.draaber) return;
    }
 
    evneForbedringer[evne] = nytAntal;
    opdaterEvneInfo(evne);
    opdaterEvneVindueHoved();
    opdaterEvneVindueFod();
}

function opdaterEvneInfo(evne) {
    const nuvaerendeLvl = evneVindueData.evner[evne];
    const antalForbedringer = evneForbedringer[evne];
    const nytLevel = nuvaerendeLvl + antalForbedringer;
    const nuvaerendePulje = getPulje(nuvaerendeLvl);
    const nyPulje = getPulje(nytLevel);
 
    let info = '';
    if (antalForbedringer > 0) {
        info = `Level ${nuvaerendeLvl} → <span class="ny-vaerdi">${nytLevel}</span> (${nuvaerendePulje}d6`;
        info += nuvaerendePulje !== nyPulje
            ? ` → <span class="ny-vaerdi">${nyPulje}d6</span>)`
            : `)`;
    } else {
        info = `Level ${nuvaerendeLvl} (${nuvaerendePulje}d6)`;
    }
 
    let specialInfo = '';
    if (antalForbedringer > 0) {
        if (evne === 'form')      specialInfo = evneLivInfo(nuvaerendeLvl, nytLevel);
        if (evne === 'sind')      specialInfo = evneSejdInfo(nuvaerendeLvl, nytLevel);
        if (evne === 'intuition') specialInfo = evneHuInfo(nuvaerendeLvl, nytLevel);
    }
 
    const infoDiv = document.getElementById(`info-${evne}`);
    infoDiv.innerHTML = info;
    if (specialInfo) {
        infoDiv.innerHTML += `<div class="vindue__special-info">${specialInfo}</div>`;
    }
 
    if (antalForbedringer > 0) {
        document.getElementById(`antal-${evne}`).textContent = '+' + antalForbedringer;
    } else {
        document.getElementById(`antal-${evne}`).textContent = 0;
    }
}
 
function opdaterEvneVindueHoved() {
    const totalForbedringer = Object.values(evneForbedringer).reduce((a, b) => a + b, 0);
    const nytKarakterLevel = evneVindueData.karakterLevel + totalForbedringer;
    const totalOmkostning = beregnTotalOmkostning();
    const draaberTilbage = evneVindueData.draaber - totalOmkostning;
 
    document.getElementById('karakter-level').innerHTML = totalForbedringer > 0
        ? `${evneVindueData.karakterLevel} → <span class="ny-vaerdi">${nytKarakterLevel}</span>`
        : `${evneVindueData.karakterLevel}`;
 
    document.getElementById('total-omkostning').innerHTML = totalOmkostning > 0 ?
    `<span class="ny-vaerdi ny-vaerdi--draaber">${totalOmkostning}</span> Dråber`
    : `0 Dråber`;
 
    document.getElementById('draaber-info').innerHTML = totalOmkostning > 0
        ? `${evneVindueData.draaber} → <span class="ny-vaerdi ny-vaerdi--draaber">${draaberTilbage}</span> Dråber`
        : `${evneVindueData.draaber} Dråber`;
}
 
function opdaterEvneVindueFod() {
    const total = beregnTotalOmkostning();
    const bekraeftKnap = document.getElementById('bekraeft-evne');
    bekraeftKnap.style.opacity = total === 0 ? '0.4' : '';
    bekraeftKnap.style.pointerEvents = total === 0 ? 'none' : '';
}
 
function beregnTotalOmkostning() {
    let total = 0;
    let akkLevel = evneVindueData.karakterLevel;
 
    for (const evne of evneNoegler) {
        for (let i = 0; i < evneForbedringer[evne]; i++) {
            total += akkLevel;
            akkLevel++;
        }
    }
 
    return total;
}
 
function bekraeftEvneForbedringer() {
    const total = beregnTotalOmkostning();
    if (total === 0) return;
 
    for (const evne of evneNoegler) {
        karakter[evne] += evneForbedringer[evne];
    }
    karakter.draaber -= total;
 
    opdaterVistData();
    lukVindue('evneforbedring');
    visBesked(`Evner forbedret. ${total} Dråber brugt.`);
}
 
// Specialinfo-hjælpere til evneforbedring
function evneLivInfo(gammelForm, nyForm) {
    const gammelLiv = getVitalMax(gammelForm);
    const nytLiv = getVitalMax(nyForm);
    const forskel = nytLiv - gammelLiv;
    return forskel > 0
        ? `Liv ${gammelLiv} → <span class="ny-vaerdi">${nytLiv}</span> (+${forskel})`
        : '';
}
 
function evneSejdInfo(gammelSind, nySind) {
    const forskel = nySind - gammelSind;
    return forskel > 0
        ? `Sejd ${gammelSind} → <span class="ny-vaerdi">${nySind}</span> (+${forskel})`
        : '';
}

function evneHuInfo(gammelIntuition, nyIntuition) {
    const gammelHu = getHuMax(gammelIntuition);
    const nyHu = getHuMax(nyIntuition);
    const gammelRegen = getHuRegen(gammelIntuition);
    const nyRegen = getHuRegen(nyIntuition);
 
    const dele = [];
    if (gammelHu !== nyHu) dele.push(`Hu ${gammelHu} → <span class="ny-vaerdi">${nyHu}</span>`);
    if (gammelRegen !== nyRegen) dele.push(`Regen ${gammelRegen} → <span class="ny-vaerdi">${nyRegen}</span> Hu/runde`);
    return dele.join(', ');
}





// ==============================
// === VÅBEN OG OPGRADERINGER ===
// ==============================

const vaabenEvner = ['styrke', 'behaendighed', 'visdom', 'mystik'];
const vaabenEvneNavne = {
    styrke: 'Styrke', behaendighed: 'Behændighed', visdom: 'Visdom', mystik: 'Mystik'
};

let aktivtVaabenId = null;
let vaabenDetaljeState = null;
let vaabenOpgVindueNiveau = 0;
let vaabenOpgVindueVedVandsten = false;

function genererVaabenId() {
    return 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// Beregner stenskår og dråber for opgradering fra 'fra' til 'til'
function beregnVaabenOpgraderingOmkostning(fra, til, vedVandsten) {
    let stenskaar = 0;
    for (let i = fra + 1; i <= til; i++) stenskaar += i;
    const karakterLevel = karakter.form + karakter.sind + karakter.intuition +
                          karakter.styrke + karakter.behaendighed + karakter.visdom + karakter.mystik;
    const draaber = vedVandsten ? karakterLevel * stenskaar : 0;
    return { stenskaar, draaber };
}



// --- VÅBENLISTE ---
function initVaabenListe() {
    const liste = document.getElementById('vaaben-liste');
    liste.innerHTML = '';

    if (!karakter.vaaben || karakter.vaaben.length === 0) {
        const tom = document.createElement('div');
        tom.className = 'vaabendetaljer__opgradering--tom';
        tom.textContent = 'Ingen våben tilføjet.';
        liste.appendChild(tom);
    } else {
        for (const vaaben of karakter.vaaben) {
            const raekke = document.createElement('div');
            raekke.className = 'vindue__raekke vindue__raekke--vaaben';
            raekke.style.cursor = 'pointer';
            raekke.innerHTML = `
                <div class="evne-navn vaaben">${vaaben.navn || 'Unavngivet'}</div>
                <div class="vindue__raekke--opgradering"><div>${vaaben.opgradering > 0 ? '+' : ''}${vaaben.opgradering}</div></div>
                <div></div>
                <div>${vaabenEvneNavne[vaaben.basis]}</div>
                <div class="vaabendetaljer__opgraderingspil">›</div>
            `;
            raekke.addEventListener('click', () => aabneVaabenDetalje(vaaben.id));
            liste.appendChild(raekke);
        }
    }

    aabenVindue('vaabenliste');
}



// --- VÅBENDETALJE ---
function aabneVaabenDetalje(id) {
    aktivtVaabenId = id;

    opdaterNoteOmraadeVaaben()

    if (id === null) {
        vaabenDetaljeState = {
            navn: '',
            basis: 'styrke',
            originalOpgradering: 0,
            midlertidigOpgradering: 0,
            vedVandsten: false,
            noter: '',
        };
    } else {
        const vaaben = karakter.vaaben.find(v => v.id === id);
        if (!vaaben) return;
        vaabenDetaljeState = {
            navn: vaaben.navn,
            basis: vaaben.basis,
            originalOpgradering: vaaben.opgradering,
            midlertidigOpgradering: vaaben.opgradering,
            vedVandsten: false,
            noter: vaaben.noter || '',
        };
    }

    document.getElementById('vaabendetalje-titel').textContent =
        id === null ? 'Nyt våben' : 'Rediger våben';
    document.getElementById('vaaben-navn-input').value = vaabenDetaljeState.navn;
    document.getElementById('vaaben-noter-input').value = vaabenDetaljeState.noter;
    document.getElementById('slet-vaaben').style.display = id === null ? 'none' : '';

    opdaterVaabenBasisToggle();
    opdaterVaabenOpgraderingKnap();

    lukVindue('vaabenliste');
    aabenVindue('vaabendetalje');
}

function opdaterVaabenBasisToggle() {
    document.querySelectorAll('#vaaben-basis-toggle .vaabendetaljer__opgraderingsselektor').forEach(el => {
        el.classList.toggle('aktiv', el.dataset.basis === vaabenDetaljeState.basis);
    });
}

function opdaterVaabenOpgraderingKnap() {
    const opgraderingstal = document.getElementById('opgraderingstal');
    const knap = document.getElementById('aaben-vaabenopgradering');
    const orig = vaabenDetaljeState.originalOpgradering;
    const mid = vaabenDetaljeState.midlertidigOpgradering;

    if (mid > orig) {
        const { stenskaar, draaber } = beregnVaabenOpgraderingOmkostning(
            orig, mid, vaabenDetaljeState.vedVandsten
        );
        let kostTekst = `${stenskaar} Stenskår`;
        if (vaabenDetaljeState.vedVandsten && draaber > 0) kostTekst += `, ${draaber} Dråber`;

        opgraderingstal.innerHTML = `${orig > 0 ? '+' : ''}${orig} → <span class="ny-vaerdi">${mid > 0 ? '+' : ''}${mid}</span>
            <span class="vaabendetaljer__opgraderingspris">(${kostTekst})</span>`;
    } else {
        opgraderingstal.textContent = mid > 0 ? `+${mid}` : `${mid}`;
    }
}

function gemVaaben() {
    const navn = document.getElementById('vaaben-navn-input').value.trim() || 'Unavngivet';
    const noter = document.getElementById('vaaben-noter-input').value;

    const { stenskaar, draaber } = beregnVaabenOpgraderingOmkostning(
        vaabenDetaljeState.originalOpgradering,
        vaabenDetaljeState.midlertidigOpgradering,
        vaabenDetaljeState.vedVandsten
    );

    if (aktivtVaabenId === null) {
        const nytId = genererVaabenId();
        karakter.vaaben.push({
            id: nytId,
            navn,
            basis: vaabenDetaljeState.basis,
            opgradering: vaabenDetaljeState.midlertidigOpgradering,
            noter,
        });
        aktivtVaabenId = nytId;
    } else {
        const idx = karakter.vaaben.findIndex(v => v.id === aktivtVaabenId);
        if (idx !== -1) {
            // Hvis basis er ændret, fjern det fra vaelgtVaaben på den gamle evne
            const gammelBasis = karakter.vaaben[idx].basis;
            if (gammelBasis !== vaabenDetaljeState.basis &&
                karakter.vaelgtVaaben[gammelBasis] === aktivtVaabenId) {
                karakter.vaelgtVaaben[gammelBasis] = null;
            }
            karakter.vaaben[idx] = {
                id: aktivtVaabenId,
                navn,
                basis: vaabenDetaljeState.basis,
                opgradering: vaabenDetaljeState.midlertidigOpgradering,
                noter,
            };
        }
    }

    karakter.stenskaar = Math.max(0, karakter.stenskaar - stenskaar);
    if (vaabenDetaljeState.vedVandsten) {
        karakter.draaber = Math.max(0, karakter.draaber - draaber);
    }

    opdaterVistData();
    lukVindue('vaabendetalje');
    initVaabenListe();
    visBesked(stenskaar > 0 ? `Våben gemt. ${stenskaar} Stenskår brugt.` : 'Våben gemt.');
}

function sletVaaben() {
    if (aktivtVaabenId === null) return;
    karakter.vaaben = karakter.vaaben.filter(v => v.id !== aktivtVaabenId);

    for (const evne of vaabenEvner) {
        if (karakter.vaelgtVaaben[evne] === aktivtVaabenId) {
            karakter.vaelgtVaaben[evne] = null;
        }
    }

    aktivtVaabenId = null;
    opdaterVistData();
    lukVindue('vaabendetalje');
    initVaabenListe();
    visBesked('Våben slettet.');
}



// --- OPGRADERINGSMODAL ---
function initVaabenOpgradering() {
    if (!vaabenDetaljeState) return;

    vaabenOpgVindueNiveau = vaabenDetaljeState.midlertidigOpgradering;
    vaabenOpgVindueVedVandsten = vaabenDetaljeState.vedVandsten;

    const navn = document.getElementById('vaaben-navn-input').value.trim() || 'Unavngivet';
    document.getElementById('vaabenopgradering-titel').textContent = navn + ' · Opgradering';

    opdaterVaabenOpgraderingVindue();
    aabenVindue('vaabenopgradering');
}

function aendrVaabenOpgraderingNiveau(retning) {
    const nyt = vaabenOpgVindueNiveau + retning;
    if (nyt < vaabenDetaljeState.originalOpgradering || nyt > 5) return;
    vaabenOpgVindueNiveau = nyt;
    opdaterVaabenOpgraderingVindue();
}

function opdaterVaabenOpgraderingVindue() {
    const orig = vaabenDetaljeState.originalOpgradering;
    const { stenskaar, draaber } = beregnVaabenOpgraderingOmkostning(
        orig, vaabenOpgVindueNiveau, vaabenOpgVindueVedVandsten
    );

    // Niveau-visning
    const niveauEl = document.getElementById('vaabenopg-niveau');
    if (vaabenOpgVindueNiveau > orig) {
        niveauEl.innerHTML = `${orig > 0 ? '+' : ''}${orig} → <span class="ny-vaerdi">${vaabenOpgVindueNiveau > 0 ? '+' : ''}${vaabenOpgVindueNiveau}</span>`;
    } else {
        niveauEl.textContent = `${vaabenOpgVindueNiveau > 0 ? '+' : ''}${vaabenOpgVindueNiveau}`;
    }

    // Ressource-info
    document.getElementById('vaabenopg-stenskaar-info').innerHTML = stenskaar > 0
        ? `${karakter.stenskaar} → <span class="ny-vaerdi ny-vaerdi--draaber">${karakter.stenskaar - stenskaar}</span>`
        : `${karakter.stenskaar}`;

    document.getElementById('vaabenopg-draaber-info').innerHTML =
        vaabenOpgVindueVedVandsten && draaber > 0
        ? `${karakter.draaber} → <span class="ny-vaerdi ny-vaerdi--draaber">${karakter.draaber - draaber}</span>`
        : `${karakter.draaber}`;

    // Sted-toggle
    document.getElementById('vaabenopg-smedje').classList.toggle('aktiv', !vaabenOpgVindueVedVandsten);
    document.getElementById('vaabenopg-vandsten').classList.toggle('aktiv', vaabenOpgVindueVedVandsten);

    // Samlet omkostning
    const omk = document.getElementById('vaabenopg-total-omkostning');
    if (stenskaar > 0) {
        let tekst = `${stenskaar} Stenskår`;
        if (vaabenOpgVindueVedVandsten) tekst += `, ${draaber} Dråber`;
        omk.innerHTML = `<span class="ny-vaerdi ny-vaerdi--draaber">${tekst}</span>`;
    } else {
        omk.textContent = '–';
    }

    // +/- knapper
    document.getElementById('vaabenopg-minus').disabled =
        vaabenOpgVindueNiveau <= orig;
    document.getElementById('vaabenopg-plus').disabled =
        vaabenOpgVindueNiveau >= 5;
    document.getElementById('vaabenopg-niveau-badge').textContent = 
    `${vaabenOpgVindueNiveau > 0 ? '+' : ''}${vaabenOpgVindueNiveau}`;

    // Bekræft-knap
    const harRaad = stenskaar <= karakter.stenskaar &&
                    (!vaabenOpgVindueVedVandsten || draaber <= karakter.draaber);
    const harAendring = vaabenOpgVindueNiveau !== vaabenDetaljeState.midlertidigOpgradering;
    const knap = document.getElementById('bekraeft-vaabenopgradering');
    const aktiv = harRaad && harAendring;
    knap.style.opacity = aktiv ? '' : '0.4';
    knap.style.pointerEvents = aktiv ? '' : 'none';
}

function bekraeftVaabenOpgradering() {
    vaabenDetaljeState.midlertidigOpgradering = vaabenOpgVindueNiveau;
    vaabenDetaljeState.vedVandsten = vaabenOpgVindueVedVandsten;
    opdaterVaabenOpgraderingKnap();
    lukVindue('vaabenopgradering');
}



// --- VAABENVAELGER OG BASISSKADE ---
function opdaterVaabenVaelger(evne) {
    const container = document.getElementById(`vaaben-vaelger-${evne}`);
    if (!container) return;
    container.innerHTML = '';

    const relevanteVaaben = (karakter.vaaben || []).filter(v => v.basis === evne);

    if (relevanteVaaben.length === 0) {
        container.innerHTML = '<div class="vaaben-tom-vaelger">Ingen våben</div>';
        return;
    }

    for (const vaaben of relevanteVaaben) {
        const erValgt = karakter.vaelgtVaaben[evne] === vaaben.id;
        const el = document.createElement('div');
        el.className = 'vaaben-valg' + (erValgt ? ' aktiv' : '');

        if (vaaben.opgradering === 0) {
            el.textContent = vaaben.navn;
        } else {
            el.textContent = vaaben.navn + ' +' + vaaben.opgradering;
        }

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            karakter.vaelgtVaaben[evne] = erValgt ? null : vaaben.id;
            gemData();
            opdaterVistData();
        });
        container.appendChild(el);
    }
}

function beregnBasisskade(evne) {
    const id = karakter.vaelgtVaaben ? karakter.vaelgtVaaben[evne] : null;
    if (!id) return '-';
    const vaaben = (karakter.vaaben || []).find(v => v.id === id);
    if (!vaaben) return 0;
    return Math.round((karakter[evne] + karakter.forskydning[evne]) * (1 + vaaben.opgradering * 0.2));
}

function saetBasisskade(evne) {
    const basisskade = beregnBasisskade(evne);
    document.getElementById(`basisskade-${evne}`).textContent = basisskade;

    const vaabenViser = document.getElementById(`basisskade-evne-vaaben-${evne}`);
    const omraade = document.getElementById(`basisskade-omraade-${evne}`);
    const vaabenId = karakter.vaelgtVaaben[evne];
    const vaaben = karakter.vaaben.find(v => v.id === vaabenId);

    if (!vaaben) {
        vaabenViser.classList.add('intet-vaaben');
        vaabenViser.textContent = "Intet våben";
        omraade.classList.add('skjult-indhold');
    } else {
        if (vaaben.opgradering === 0) {
            vaabenViser.textContent = vaaben.navn;
        } else {
            vaabenViser.textContent = vaaben.navn + ' +' + vaaben.opgradering;
        }
        vaabenViser.classList.remove('intet-vaaben');
        omraade.classList.remove('skjult-indhold');
    }

    if (basisskade === '-') {
        document.getElementById(`basisskade-halv-${evne}`).textContent = '-';
        document.getElementById(`basisskade-dobbelt-${evne}`).textContent = '-';
    } else {
        document.getElementById(`basisskade-halv-${evne}`).textContent = Math.ceil(basisskade / 2);
        document.getElementById(`basisskade-dobbelt-${evne}`).textContent = basisskade * 2;
    }
}

function opdaterBasisskader() {
    vaabenEvner.forEach(evne => {
        saetBasisskade(evne);
        opdaterVaabenVaelger(evne);
    });
}





// ======================
// === DATAHÅNDTERING ===
// ======================
const standardKlasser = {
    asket: standardasket,
    bytyv: standardbytyv,
    forkynder: standardforkynder,
    hedonist: standardhedonist,
    lovloes: standardlovloes,
    laerd: standardlaerd,
    militarist: standardmilitarist,
};

// Gem og indlæs
function gemData() {
    localStorage.setItem('karakterark', JSON.stringify(karakter));
}

function indlaesData() {
    const gemt = localStorage.getItem('karakterark');
    if (gemt) {
        Object.assign(karakter, JSON.parse(gemt));
    }
}

function eksporterData() {
    const json = JSON.stringify(karakter, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const navn = karakter.navn || 'Karakter';
    const karakterLevel = karakter.form + karakter.sind + karakter.intuition + karakter.styrke + karakter.behaendighed + karakter.visdom + karakter.mystik;
    a.href = url;
    a.download = `${navn} (Level ${karakterLevel}) Tusinde Floder.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importerData() {
    document.getElementById('importer-input').click();
}

function nulstilData() {
    Object.assign(karakter, JSON.parse(JSON.stringify(standardKarakter)));
    gemData();
    opdaterVistData();
    visBesked('Karakter nulstillet.');
}

function hentStandardKlasse(klasse) {
    const karakterVisningsnavn = { asket: 'Asket', bytyv: 'Bytyv', forkynder: 'Forkynder', hedonist: 'Hedonist', lovloes: 'Lovløs', laerd: 'Lærd', militarist: 'Militarist' };
    const diff = standardKlasser[klasse];
    if (!diff) return;
    Object.assign(karakter, JSON.parse(JSON.stringify(standardKarakter)), diff);
    opdaterVistData();               // beregner livMax, sejdMax, huMax ud fra evnelevels
    karakter.livNu  = karakter.livMax;
    karakter.sejdNu = karakter.sejdMax;
    karakter.huNu   = karakter.huMax;
    karakter.flaskerNu = karakter.flaskerMax;
    gemData();
    opdaterVistData();
    visBesked(`Karakter nulstillet til ${karakterVisningsnavn[klasse]}`);
    lukVindue('ny-karakter');
}