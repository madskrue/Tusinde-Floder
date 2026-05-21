// ===============
// === VISNING ===
// ===============

// Visningsfunktionen
function opdaterVistData() {
    opdaterGrundlaeggende();
    opdaterRessourcer();
    opdaterStatus();
    opdaterEvner();
    opdaterInventarOgNoter();
    opdaterVaabenRaekke();
    opdaterVaabenKort();
    opdaterFaerdighedsRaekke();
    opdaterFaerdighedsKort();
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
    }

    function opdaterRessourcer() {
        beregnRessourcer();
        saetRessourcer();
        opdaterBarer();
        opdaterFlaskeIkoner();

        function beregnRessourcer() {
            const vitalMax = getVitalMax(karakter.form + karakter.forskydning.form);
            karakter.livVital = vitalMax;
            karakter.livMax = karakter.livVital - (karakter.forvitring * Math.ceil(karakter.livVital / 20));
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
        opdaterNoteOmraade('noter-input');
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
    sektion.classList.toggle('skjul-indhold');
}

// Vælg fane
function vaelgFane(type) {
    document.querySelectorAll('.faneblad--aktiv, .fane__titel--aktiv').forEach(el => {
        el.classList.remove('faneblad--aktiv', 'fane__titel--aktiv');
    });

    document.getElementById(`${type}-indhold`).classList.add('faneblad--aktiv');
    document.getElementById(`${type}-titel`).classList.add('fane__titel--aktiv');
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

// Vis/skjul-knapper
function toggleVisSkjul(knapId, indholdId) {
    const knap = document.getElementById(knapId);
    const indhold = document.getElementById(indholdId);
    const erSkjult = indhold.classList.toggle('skjul-indhold');
    knap.classList.toggle('skjult');
}

// Åben/luk vinduer
function aabenVindue(vindueId) {
    const tilladte = ['karakter', 'ny-karakter', 'nulstil-karakter'];
    if (erEndeligDoed() && !tilladte.includes(vindueId)) return;
    
    document.getElementById(vindueId + '-vindue').style.display = 'flex';
}

function lukVindue(vindueId) {
    document.getElementById(vindueId + '-vindue').style.display = 'none';
}

// Vis ark
function visArk() {
    document.getElementById('beholder').style.display = '';
    document.getElementById('eksporter-knap').style.display = '';
}



// =======================
// === HJÆLPEBEREGNERE ===
// =======================

// Rustningsgrad – til fremtidig implementering af rustninger
function beregnRustningsgrad(reduktion) {
    const rustningsgrad = Math.ceil( karakter.livMax * (reduktion / 100) );
    return rustningsgrad;
}

// Tjek endelig død
function erEndeligDoed() {
    if (!karakter.endeligtDoed) return false;
        visBesked('Du er endeligt død.');
        return true;
}

// Evnelevels og puljer
function opdaterEvne(navn, level, forskydning) {
    document.getElementById(navn + '-level').textContent = level;
    const pulje = getPulje(level, forskydning);
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
function getPulje(level, forskydning) {
    if (level + forskydning <= 6) return 1;
    if (level + forskydning <= 12) return 2;
    if (level + forskydning <= 20) return 3;
    if (level + forskydning <= 29) return 4;
    if (level + forskydning <= 39) return 5;
    if (level + forskydning <= 50) return 6;
    if (level + forskydning <= 63) return 7;
    if (level + forskydning <= 78) return 8;
    if (level + forskydning <= 94) return 9;
    return 10;
}

// Liv, Sejd, Hu
function getVitalMax(form) {
    if (form <= 20) return form * 5;
    if (form <= 40) return 100 + (form - 20) * 4;
    if (form <= 60) return 180 + (form - 40) * 3;
    if (form <= 80) return 240 + (form - 60) * 2;
    if (form <= 100) return 280 + (form - 80) * 1;
    return 300 + (form - 100);
}

function getSejdMax(sind) {
    return sind;
}

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





// ===================================================
// ====================== ARKET ======================
// ===================================================



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

// Vandsten
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



// =================
// === BEREDSKAB ===
// =================

// Våben
function opdaterVaabenRaekke() {
    const container = document.getElementById('vaaben-raekke');
    container.innerHTML = '';

    if (!karakter.vaaben || karakter.vaaben.length === 0) {
        const tom = document.createElement('div');
        tom.className = 'emne-raekke-tom';
        tom.textContent = 'Ingen våben.';
        container.appendChild(tom);
        return;
    }

    for (const vaaben of karakter.vaaben) {
        const erValgt = karakter.valgteVaaben.includes(vaaben.id);
        const el = document.createElement('div');
        el.className = 'emne-valg' + (erValgt ? ' aktiv' : '');
        el.textContent = vaaben.navn + (vaaben.opgradering > 0 ? ' +' + vaaben.opgradering : '');

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (karakter.valgteVaaben.includes(vaaben.id)) {
                karakter.valgteVaaben = karakter.valgteVaaben.filter(id => id !== vaaben.id);
            } else {
                karakter.valgteVaaben.push(vaaben.id);
            }
            gemData();
            opdaterVistData();
        });

        container.appendChild(el);
    }
}

function beregnBasisskade(vaaben) {
    const basisLevel = karakter[vaaben.basis] + karakter.forskydning[vaaben.basis];
    const basisDel = basisLevel * (1 + vaaben.opgradering * 0.2);
    const tillaegsDel = vaaben.tillaegsevne
        ? (karakter[vaaben.tillaegsevne] + karakter.forskydning[vaaben.tillaegsevne])
          * (vaaben.tillaegsTaeller / vaaben.tillaegsNaevner)
        : 0;
    return Math.round(basisDel + tillaegsDel);
}

function opdaterVaabenKort() {
    document.getElementById('basisskade-beholder').innerHTML = '';
    karakter.vaaben
        .filter(v => karakter.valgteVaaben.includes(v.id))
        .forEach(vaaben => genererVaabenKort(vaaben));
}

function genererVaabenKort(vaaben) {
    const kort = document.createElement('div');
    kort.className = 'kort';
    kort.id = `basisskade-${vaaben.id}`;

    const basisskade = beregnBasisskade(vaaben)

    const angrebSkade = Math.ceil( basisskade * vaaben.angreb.skadeFaktor );
    const teknikSkade = Math.ceil( basisskade * vaaben.teknik.skadeFaktor );

    const angrebHuForbrug = `${vaaben.angreb.hu} Hu`
    const teknikHuForbrug = `${vaaben.teknik.hu} Hu`

    kort.innerHTML = 
    `<div class="kort__top">
        <div class="kort__titel" id="kort-${vaaben.navn}">${vaaben.navn}${ vaaben.opgradering ? ' +' + vaaben.opgradering : ''}</div>
        <div class="kort__basis" id="${vaaben.navn}-basis">${evneVisningsnavn[vaaben.basis]}</div>
    </div>

    <div class="kort__top">
        <div></div>
        <div class="kort__basis--tillaeg">${ evneVisningsnavn[vaaben.tillaegsevne] ? '+' + vaaben.tillaegsTaeller + '/' + vaaben.tillaegsNaevner + ' ' + vaaben.tillaegsevne : ''}</div>
    </div>

    <div class="kort__data">
        <div class="kort__angreb">
            <div class="kort__vaerdi" id="${vaaben.navn}-angreb-skade">${angrebSkade}</div>
            <div class="kort__forbrug">${vaaben.angreb.hu ? vaaben.angreb.hu + ' Hu' : ''}<span class="kort__forbrug">${vaaben.angreb.sejd ? '· ' + vaaben.teknik.sejd + ' Sejd' : ''}</span></div>
        </div>

        <div class="kort__linje">
            <div class="kort__teknik">
                <div id="${vaaben.teknik.navn}-titel" class="kort__teknik-titel">${vaaben.teknik.navn}</div>
                <div class="kort__forbrug">${vaaben.teknik.hu ? vaaben.teknik.hu + ' Hu' : ''}
                <span class="kort__forbrug">${vaaben.teknik.sejd ? '· ' + vaaben.teknik.sejd + ' Sejd' : ''}</span></div>
                    
            </div>
            <div class="kort__teknikvaerdi" id="${vaaben.navn}-teknik-skade">${teknikSkade}</div>
        </div>
    </div>`;

    document.getElementById('basisskade-beholder').appendChild(kort);

    const vaabenTooltip = document.getElementById('vaaben-tooltip');
    const el = document.getElementById(`basisskade-${vaaben.id}`);

    el.addEventListener('mouseenter', () => {
        const prefix = vaaben.opgradering ? '+' : '';
        vaabenTooltip.innerHTML = 
        `<div style="color: var(--tekst-aktiv); font-weight: 600;">${vaaben.navn} <span>${ vaaben.opgradering ? '+' + vaaben.opgradering : ''}</span></div>` // Navn
        + vaaben.beskrivelse // Beskrivelse
        + '<br><br>Teknik: ' + `${vaaben.teknik.navn} <br>` // Tekniknavn
        + vaaben.teknik.beskrivelse; // Teknikbeskrivelse
        vaabenTooltip.style.display = 'block';
    });

    el.addEventListener('mousemove', (e) => {
    const gap = 11;
    let x = e.clientX + gap;
    let y = e.clientY + gap;

    const tooltipBredde = vaabenTooltip.offsetWidth;
    const viewportBredde = window.innerWidth;

    if (x + tooltipBredde > viewportBredde) {
        x = e.clientX - tooltipBredde - gap;
    }

    vaabenTooltip.style.left = x + 'px';
    vaabenTooltip.style.top  = y + 'px';
    });

    el.addEventListener('mouseleave', () => {
        vaabenTooltip.style.display = 'none';
    });
}



// Færdigheder
function opdaterFaerdighedsRaekke() {
    const container = document.getElementById('faerdighed-raekke');
    container.innerHTML = '';

    if (!karakter.faerdigheder || karakter.faerdigheder.length === 0) {
        const tom = document.createElement('div');
        tom.className = 'emne-raekke-tom';
        tom.textContent = 'Ingen færdigheder.';
        container.appendChild(tom);
        return;
    }

    for (const faerdighed of karakter.faerdigheder) {
        const erValgt = karakter.valgteFaerdigheder.includes(faerdighed.id);
        const el = document.createElement('div');
        el.className = 'emne-valg' + (erValgt ? ' aktiv' : '');
        el.textContent = faerdighed.navn;

        const maksAktive = 2;
        el.addEventListener('click', (e) => {
            e.stopPropagation();

            const erValgt = karakter.valgteFaerdigheder.includes(faerdighed.id);

            if (erValgt) {
                karakter.valgteFaerdigheder =
                    karakter.valgteFaerdigheder.filter(id => id !== faerdighed.id);
            } else {
                if (karakter.valgteFaerdigheder.length >= maksAktive) {
                    visBesked('Du kan kun have højst 2 færdigheder aktive ad gangen.');
                    return;
                }
                karakter.valgteFaerdigheder.push(faerdighed.id);
            }

            gemData();
            opdaterVistData();
        });

        container.appendChild(el);
    }
}

function opdaterFaerdighedsKort() {
    document.getElementById('faerdighed-beholder').innerHTML = '';
    karakter.faerdigheder
        .filter(v => karakter.valgteFaerdigheder.includes(v.id))
        .forEach(faerdighed => genererFaerdighedsKort(faerdighed));
}

function genererFaerdighedsKort(faerdighed) {
    const id = faerdighed.id;
    const kort = document.createElement('div');
    kort.className = 'kort';
    kort.id = `faerdighedskort-${faerdighed.id}`;

    kort.innerHTML = 
    `<div class="kort__top">
        <div class="kort__titel" id="titel-${id}">${faerdighed.navn}</div>
        <div class="kort__basis" id="kvalifikation-${id}">${faerdighed.kvalifikation}</div>
    </div>

    <div class="kort__top">
        ${ faerdighed.type === "aktiv" ? `<div class="brug-knap" id="cyklus-brug-${id}">Brug</div>` : `<div class="kort__basis--type">${faerdighed.type}</div>`}
    </div>

    <div class="kort__data" id="info-${id}">
        <div class="kort__linje">
            <div class="kort__beskrivelse">${faerdighed.beskrivelse}</div>
        </div>
    </div>`;

    document.getElementById('faerdighed-beholder').appendChild(kort);

    if (faerdighed.type === "aktiv") {
    document.getElementById(`cyklus-brug-${id}`).addEventListener('click', () => {
        cyklusBrug(id)
    });
    }
}

function cyklusBrug(id) {
    const knap = document.getElementById(`cyklus-brug-${id}`);
    const titel = document.getElementById(`titel-${id}`);
    const kval = document.getElementById(`kvalifikation-${id}`);
    const info = document.getElementById(`info-${id}`);
    
    knap.classList.toggle('brugt');
    titel.classList.toggle('brugt');
    kval.classList.toggle('brugt');
    info.classList.toggle('brugt');

    const brugt = knap.classList.contains('brugt');
    knap.textContent = (brugt ? 'Brugt' : 'Brug');
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



// =========================
// === INVENTAR OG NOTER ===
// =========================

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

// Ændre størrelse på noteområde
function opdaterNoteOmraade(felt) {
    const noter = document.getElementById(felt);
    noter.style.minHeight = '3rem'
    noter.style.height = 'auto';
    noter.style.height = noter.scrollHeight + 'px';
}





// =====================================================
// ====================== VINDUER ======================
// =====================================================



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
    const nuvaerendePulje = getPulje(nuvaerendeLvl, 0);
    const nyPulje = getPulje(nytLevel, 0);

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
    hvil();
}
 
// Specialinfo-hjælpere til Liv, Sejd, Hu
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

// --- Åben våben-vindue ---
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

// --- Våbendetaljer ---
function aabneVaabenDetalje(id) {
    aktivtVaabenId = id;

    opdaterNoteOmraade('vaaben-detalje-beskrivelse');
    opdaterNoteOmraade('vaaben-detalje-teknik');
    opdaterNoteOmraade('vaaben-noter-input');

    if (id === null) {
        vaabenDetaljeState = {
            navn: '',
            basis: 'styrke',
            originalOpgradering: 0,
            midlertidigOpgradering: 0,
            vedVandsten: false,
            beskrivelse: '',
            teknik: '',
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
            beskrivelse: vaaben.beskrivelse,
            teknik: vaaben.teknik
                ? (vaaben.teknik.navn + (vaaben.teknik.beskrivelse ? '\n' + vaaben.teknik.beskrivelse : ''))
                : '',
            noter: vaaben.noter || '',
        };
    }

    document.getElementById('vaabendetalje-titel').textContent =
        id === null ? 'Nyt våben' : 'Rediger våben';
    document.getElementById('vaaben-navn-input').value = vaabenDetaljeState.navn;
    document.getElementById('vaaben-detalje-beskrivelse').value = vaabenDetaljeState.beskrivelse;
    document.getElementById('vaaben-detalje-teknik').value = vaabenDetaljeState.teknik;
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
    const beskrivelse = document.getElementById('vaaben-detalje-beskrivelse').value;

    const teknikTekst = document.getElementById('vaaben-detalje-teknik').value;
    const foersteLinje = teknikTekst.indexOf('\n');
    const teknikNavn = foersteLinje === -1 ? teknikTekst : teknikTekst.slice(0, foersteLinje);
    const teknikBeskrivelse = foersteLinje === -1 ? '' : teknikTekst.slice(foersteLinje + 1).trim();

    const { stenskaar, draaber } = beregnVaabenOpgraderingOmkostning(
        vaabenDetaljeState.originalOpgradering,
        vaabenDetaljeState.midlertidigOpgradering,
        vaabenDetaljeState.vedVandsten
    );

    const eksisterende = aktivtVaabenId !== null
        ? karakter.vaaben.find(v => v.id === aktivtVaabenId)
        : null;

    const nytVaaben = {
        id: aktivtVaabenId ?? genererVaabenId(),
        navn,
        basis: vaabenDetaljeState.basis,
        opgradering: vaabenDetaljeState.midlertidigOpgradering,
        beskrivelse,
        angreb: eksisterende?.angreb ?? { skadeFaktor: 0.5, hu: 1 },
        teknik: {
            navn: teknikNavn || 'Teknik',
            beskrivelse: teknikBeskrivelse,
            skadeFaktor: eksisterende?.teknik?.skadeFaktor ?? 1,
            hu: eksisterende?.teknik?.hu ?? 2,
            sejd: eksisterende?.teknik?.sejd ?? 1,
        },
        tillaegsevne: eksisterende?.tillaegsevne ?? null,
        tillaegsTaeller: eksisterende?.tillaegsTaeller ?? null,
        tillaegsNaevner: eksisterende?.tillaegsNaevner ?? null,
        noter,
    };

    if (aktivtVaabenId === null) {
        aktivtVaabenId = nytVaaben.id;
        karakter.vaaben.push(nytVaaben);
    } else {
        const idx = karakter.vaaben.findIndex(v => v.id === aktivtVaabenId);
        if (idx !== -1) karakter.vaaben[idx] = nytVaaben;
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
    karakter.valgteVaaben = karakter.valgteVaaben.filter(id => id !== aktivtVaabenId);
    aktivtVaabenId = null;
    opdaterVistData();
    lukVindue('vaabendetalje');
    initVaabenListe();
    visBesked('Våben slettet.');
}

// Opgradering
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

    const niveauEl = document.getElementById('vaabenopg-niveau');
    if (vaabenOpgVindueNiveau > orig) {
        niveauEl.innerHTML = `${orig > 0 ? '+' : ''}${orig} → <span class="ny-vaerdi">${vaabenOpgVindueNiveau > 0 ? '+' : ''}${vaabenOpgVindueNiveau}</span>`;
    } else {
        niveauEl.textContent = `${vaabenOpgVindueNiveau > 0 ? '+' : ''}${vaabenOpgVindueNiveau}`;
    }

    document.getElementById('vaabenopg-stenskaar-info').innerHTML = stenskaar > 0
        ? `${karakter.stenskaar} → <span class="ny-vaerdi ny-vaerdi--draaber">${karakter.stenskaar - stenskaar}</span>`
        : `${karakter.stenskaar}`;

    document.getElementById('vaabenopg-draaber-info').innerHTML =
        vaabenOpgVindueVedVandsten && draaber > 0
        ? `${karakter.draaber} → <span class="ny-vaerdi ny-vaerdi--draaber">${karakter.draaber - draaber}</span>`
        : `${karakter.draaber}`;

    document.getElementById('vaabenopg-smedje').classList.toggle('aktiv', !vaabenOpgVindueVedVandsten);
    document.getElementById('vaabenopg-vandsten').classList.toggle('aktiv', vaabenOpgVindueVedVandsten);

    const omk = document.getElementById('vaabenopg-total-omkostning');
    if (stenskaar > 0) {
        let tekst = `${stenskaar} Stenskår`;
        if (vaabenOpgVindueVedVandsten) tekst += `, ${draaber} Dråber`;
        omk.innerHTML = `<span class="ny-vaerdi ny-vaerdi--draaber">${tekst}</span>`;
    } else {
        omk.textContent = '-';
    }

    document.getElementById('vaabenopg-minus').disabled =
        vaabenOpgVindueNiveau <= orig;
    document.getElementById('vaabenopg-plus').disabled =
        vaabenOpgVindueNiveau >= 5;
    document.getElementById('vaabenopg-niveau-badge').textContent = 
    `${vaabenOpgVindueNiveau > 0 ? '+' : ''}${vaabenOpgVindueNiveau}`;

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





// ============================================================
// ====================== DATAHÅNDTERING ======================
// ============================================================

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
    visArk();
    visBesked('Karakter nulstillet.');
}

function hentStandardKlasse(klasse) {
    const karakterVisningsnavn = { asket: 'Asket', bytyv: 'Bytyv', forkynder: 'Forkynder', hedonist: 'Hedonist', lovloes: 'Lovløs', laerd: 'Lærd', militarist: 'Militarist' };
    const diff = standardKlasser[klasse];
    if (!diff) return;

    const baseKarakter = JSON.parse(JSON.stringify(standardKarakter));
    const klasseData = JSON.parse(JSON.stringify(diff));
    const baseVaaben = baseKarakter.vaaben;
    const klasseVaabenRef = klasseData.vaaben || [];
    const klasseVaaben = klasseVaabenRef.map(ref => {
        return alleVaaben.vaaben.find(v => v.id === ref.id);
    });
    const baseFaerdigheder = baseKarakter.faerdigheder;
    const klasseFaerdighederRef = klasseData.faerdigheder || [];
    const klasseFaerdigheder = klasseFaerdighederRef.map(ref => {
        return alleFaerdigheder.klassefaerdigheder.find(v => v.id === ref.id);
    });

    Object.assign(karakter, baseKarakter, klasseData);
    karakter.vaaben = [...baseVaaben, ...klasseVaaben];
    karakter.faerdigheder = [...baseFaerdigheder, ...klasseFaerdigheder];

    opdaterVistData(); // beregner livMax, sejdMax, huMax ud fra evnelevels
    karakter.livNu  = karakter.livMax;
    karakter.sejdNu = karakter.sejdMax;
    karakter.huNu   = karakter.huMax;
    karakter.flaskerNu = karakter.flaskerMax;
    gemData();
    opdaterVistData();
    visArk();
    visBesked(`Karakter nulstillet til ${karakterVisningsnavn[klasse]}`);
    lukVindue('ny-karakter');
    initEvneVindue();
}