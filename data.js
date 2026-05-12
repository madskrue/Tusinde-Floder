// Karakterdata
let karakter = {
    navn: "",
    klasse: "",
    draaber: 0,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 1,
    styrke: 1,
    behaendighed: 1,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "",
}



// Standardklasser
const standardKarakter = {
    navn: "Karakter",
    klasse: "Klasse",
    draaber: 2535,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 1,
    styrke: 1,
    behaendighed: 1,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "",
};


const standardasket = {
    navn: "Karakter",
    klasse: "Asket",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 18,
    intuition: 1,
    styrke: 1,
    behaendighed: 1,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Indre ro\nNår du tager skade nok til at få en læsion, kan du bruge 6 Sejd for at undgå læsionen. Færdigheden kan bruges én gang per cyklus.\n\nKlassefærdighed: Indre kraft\nDu kan omdanne 4 Sejd til 1 Hu. Færdigheden kan bruges én gang per runde.",
};

const standardbytyv = {
    navn: "Karakter",
    klasse: "Bytyv",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 1,
    styrke: 1,
    behaendighed: 18,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Baghold\nSom bytyv kan du udnytte skjul og overraskelse til at få fordel over dine fjender. Når du laver et nærangreb mod en fjende, der ikke har set dig, får du +2d6 til angrebet. Hvis angrebet rammer, fordobles skade af det ene angreb. Færdigheden kan bruges én gang per cyklus.",
};

const standardforkynder = {
    navn: "Karakter",
    klasse: "Forkynder",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 1,
    styrke: 1,
    behaendighed: 1,
    visdom: 1,
    mystik: 18,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Bøn\nSom forkynder kan du kalde på din guddoms beskyttelse. Én gang per cyklus kan du bede for alle allierede indenfor 2 spænd og give dem +1d6 til deres næste angreb- eller forsvarsrul.",
};

const standardhedonist = {
    navn: "Karakter",
    klasse: "Hedonist",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 18,
    styrke: 1,
    behaendighed: 1,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Afledning\nSom hedonist kan du bruge dine sociale færdigheder til at aflede andres opmærksomhed. Én gang per cyklus kan du skabe forvirring, så en fjende angriber en af dine allierede i stedet for dig.\n\nKlassefærdighed: Duelist\nNår du står alene i nærkamp mod én fjende, får du +1d6 til forsvar mod dem. Dette gælder kun, så længe fjenden ikke er blevet angrebet af andre end dig og du ikke er blevet angrebet af andre end fjenden i løbet af kampen.",
};

const standardlovloes = {
    navn: "Karakter",
    klasse: "Lovløs",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 18,
    sind: 1,
    intuition: 1,
    styrke: 1,
    behaendighed: 1,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Kontroltab\nÉn gang per cyklus kan du miste besindelsen. Du får +1d6 til alle angreb i 3 runder, men du får samtidig -1d6 til at forsvare dig i samme periode.",
};

const standardlaerd = {
    navn: "Karakter",
    klasse: "Lærd",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 1,
    styrke: 1,
    behaendighed: 1,
    visdom: 18,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Visdommens segl\nEn gang per cyklus kan du, med dit profane fokus, tegne et cirkulært segl på jorden med en diameter på 3 spænd. Når man står på dette segl, får man +1d6 til alle angrebsrul, der bruger Visdom. Seglet varer i 3 runder.",
};

const standardmilitarist = {
    navn: "Karakter",
    klasse: "Militarist",
    draaber: 2280,
    draaberEfterladt: 0,

    livNu: 1,
    sejdNu: 1,
    huNu: 1,

    sekvens: 0,
    haab: 0,
    forvitring: 0,
    laesioner: 0,
    udmattelse: 0,

    form: 1,
    sind: 1,
    intuition: 1,
    styrke: 18,
    behaendighed: 1,
    visdom: 1,
    mystik: 1,

    forskydning: {
        form: 0,
        sind: 0,
        intuition: 0,
        styrke: 0,
        behaendighed: 0,
        visdom: 0,
        mystik: 0,
    },

    vaaben: [], // array af { id, navn, basis, opgradering, noter }
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "Klassefærdighed: Ordre\nSom militarist kan du styre slagmarken. På din tur i en kamp kan du udstede en ordre til to af dine allierede indenfor 8 spænd. Hvis de adlyder, får de hver +1d6 til at udføre den handling, du har beordret. Hvis de begge lykkes med at udføre deres ordrer inden din næste tur, får du selv +1d6 til dit næste angreb- eller forsvarsrul. Færdigheden kan bruges én gang per cyklus.",
};