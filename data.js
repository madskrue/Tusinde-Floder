// ================================
// ========= KARAKTERDATA =========
// ================================

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
    valgteVaaben: [],

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "",
}

// Udgangspunkt
const standardKarakter = {
    navn: "",
    klasse: "",
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

    vaaben: [],
    valgteVaaben: [],

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "",
};



// ===========================
// ========= KLASSER =========
// ===========================

// Klasser
const standardasket = {
    klasse: "Asket",
    sind: 18,
    faerdighedsnoter: "Klassefærdighed: Indre ro\nNår du tager skade nok til at få en læsion, kan du bruge 6 Sejd for at undgå læsionen. Færdigheden kan bruges én gang per cyklus.\n\nKlassefærdighed: Indre kraft\nDu kan omdanne 4 Sejd til 1 Hu. Færdigheden kan bruges én gang per runde.",
    vaaben: [
        {id: "v_knojern_asket"},
        {id: "v_kaede_asket"},
    ],
};

const standardbytyv = {
    klasse: "Bytyv",
    behaendighed: 18,
    faerdighedsnoter: "Klassefærdighed: Baghold\nSom bytyv kan du udnytte skjul og overraskelse til at få fordel over dine fjender. Når du laver et nærangreb mod en fjende, der ikke har set dig, får du +2d6 til angrebet. Hvis angrebet rammer, fordobles skade af det ene angreb. Færdigheden kan bruges én gang per cyklus.",
    vaaben: [
        {id: "v_tvillingedolke_bytyv"},
        {id: "v_langdolk_bytyv"},
    ],
};

const standardforkynder = {
    klasse: "Forkynder",
    mystik: 18,
    faerdighedsnoter: "Klassefærdighed: Bøn\nSom forkynder kan du kalde på din guddoms beskyttelse. Én gang per cyklus kan du bede for alle allierede indenfor 2 spænd og give dem +1d6 til deres næste angreb- eller forsvarsrul.",
    vaaben: [
        {id: "v_sakral_leder_forkynder"},
        {id: "v_morgenstjerne_forkynder"},
    ]
};

const standardhedonist = {
    klasse: "Hedonist",
    intuition: 18,
    faerdighedsnoter: "Klassefærdighed: Afledning\nSom hedonist kan du bruge dine sociale færdigheder til at aflede andres opmærksomhed. Én gang per cyklus kan du skabe forvirring, så en fjende angriber en af dine allierede i stedet for dig.\n\nKlassefærdighed: Duelist\nNår du står alene i nærkamp mod én fjende, får du +1d6 til forsvar mod dem. Dette gælder kun, så længe fjenden ikke er blevet angrebet af andre end dig og du ikke er blevet angrebet af andre end fjenden i løbet af kampen.",
    vaaben: [
        {id: "v_kaarde_hedonist"},
    ],
};

const standardlovloes = {
    klasse: "Lovløs",
    form: 18,
    faerdighedsnoter: "Klassefærdighed: Kontroltab\nÉn gang per cyklus kan du miste besindelsen. Du får +1d6 til alle angreb i 3 runder, men du får samtidig -1d6 til at forsvare dig i samme periode.",
    vaaben: [
        {id: "v_flitsbue_lovloes"},
        {id: "v_langspyd_lovloes"},
        {id: "v_krigshammer_lovloes"},
    ],
};

const standardlaerd = {
    klasse: "Lærd",
    visdom: 18,
    faerdighedsnoter: "Klassefærdighed: Visdommens segl\nEn gang per cyklus kan du, med dit profane fokus, tegne et cirkulært segl på jorden med en diameter på 3 spænd. Når man står på dette segl, får man +1d6 til alle angrebsrul, der bruger Visdom. Seglet varer i 3 runder.",
    vaaben: [
        {id: "v_profan_leder_laerd"},
        {id: "v_kort_svaerd_laerd"},
    ],
};

const standardmilitarist = {
    klasse: "Militarist",
    styrke: 18,
    faerdighedsnoter: "Klassefærdighed: Ordre\nSom militarist kan du styre slagmarken. På din tur i en kamp kan du udstede en ordre til to af dine allierede indenfor 8 spænd. Hvis de adlyder, får de hver +1d6 til at udføre den handling, du har beordret. Hvis de begge lykkes med at udføre deres ordrer inden din næste tur, får du selv +1d6 til dit næste angreb- eller forsvarsrul. Færdigheden kan bruges én gang per cyklus.",
    vaaben: [
        {id: "v_klingespyd_militarist"},
        {id: "v_langsvaerd_militarist"},
    ],
};





// =========================
// ========= VÅBEN =========
// =========================

// Alle våben
const alleVaaben = {
    vaaben: [
        {
        id: "skabelon",
        navn: "Våbennavn",
        basis: "Evne",
        opgradering: 0,
        beskrivelse: "Våbenbeskrivelse.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Tekniknavn",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Teknikbeskrivelse."
        },

        noter: ""
        },



        {
        id: "v_knojern_asket",
        navn: "Knojern",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "Et simpelt knojern. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 10 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Knoglebrud",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Koncentrer kraften af dit slag til et enkelt punkt på dit måls krop. Gør basisskade og målet får -1d6 til deres næste angreb."
        },

        noter: ""
        },



        {
        id: "v_kaede_asket",
        navn: "Kæde",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "En let smedejernskæde. Kan ramme mål der er 2 spænd væk. Gør halv basisskade. Med kæden kan du lave fastholdelsesrul med Behændighed frem for Styrke.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 15, styrke: 10 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Tekniknavn",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Hvis du rammer, gør du basisskade og kan trække målet 1 spænd mod dig."
        },

        noter: ""
        },



        {
        id: "v_tvillingedolke_bytyv",
        navn: "Tvillingedolke",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "Kræver to hænder. Et sæt af to mindre dolke, en til hver hånd. Et angreb er et stød med en af dolkene. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 15 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Hurtige hænder",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Kræver to hænder. Angrib med den ene dolk, flyt dig op til 1 spænd, og angrib med den anden dolk. Gør halv basisskade for hvert angreb."
        },

        noter: "",
        },



        {
        id: "v_langdolk_bytyv",
        navn: "Langdolk",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "En lang dolk med en savtakket klinge. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 12 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Flænsning",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Skær et dybt sår i målet. Hvis de rammes, tager de basisskade nu og begynder at bløde. I starten af målets næste tur, tager de halv basisskade."
        },

        noter: ""
        },



        {
        id: "v_sakral_leder_forkynder",
        navn: "Sakral Leder",
        basis: "mystik",
        opgradering: 0,
        beskrivelse: "Et enkelt objekt (f.eks. ikon, stav, relikvie), der kanaliserer sakral magi.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { mystik: 14 },

        angreb: {
            skadeFaktor: null,
            hu: null,
        },

        teknik: {
            navn: "Slag",
            skadeFaktor: 0.5,
            hu: 2,
            beskrivelse: "Slå et mål indenfor 1 spænd. Gør halv basisskade."
        },

        noter: ""
        },



        {
        id: "v_morgenstjerne_forkynder",
        navn: "Morgenstjerne",
        basis: "styrke",
        opgradering: 0,
        beskrivelse: "En tung kugle med pigge, fastgjort til et skaft. Gør basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { styrke: 10 },

        angreb: {
            skadeFaktor: 1,
            hu: 2,
        },

        teknik: {
            navn: "Hårdt slag",
            skadeFaktor: 2,
            hu: 3,
            sejd: 1,
            beskrivelse: "Kræver to hænder. Slå et mål indenfor 1 spænd. Gør dobbelt basisskade."
        },

        noter: ""
        },



        {
        id: "v_kaarde_hedonist",
        navn: "Kårde",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "Et elegant sværd med en lang, smal klinge. Kården er yderst spids. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 12 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Touché",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Træd 1 spænd frem og angrib i én glidende bevægelse. Hvis du rammer, gør du basisskade og får +1d6 på dit næste forsvar mod denne fjende, hvis de dig angriber inden din næste tur."
        },

        noter: ""
        },



        {
        id: "v_flitsbue_lovloes",
        navn: "Flitsbue",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "Kræver to hænder. Bue og pil. Et angreb affyrer en pil op til 20 spænd. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 12 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Overtræk",
            skadeFaktor: 1,
            hu: 1,
            sejd: 2,
            beskrivelse: "Kræver to hænder. Træk buen helt ud og affyr en pil op til 30 spænd. Gør basisskade."
        },

        noter: ""
        },



        {
        id: "v_langspyd_lovloes",
        navn: "Langspyd",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "Et langt og let spyd. Et angreb er et let hug mod et mål op til 2 spænd væk. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 12 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Spydkast",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Kast spyddet op til 15 spænd efter et mål. Gør basisskade."
        },

        noter: ""
        },



        {
        id: "v_krigshammer_lovloes",
        navn: "Krigshammer",
        basis: "styrke",
        opgradering: 0,
        beskrivelse: "Kræver to hænder. En tung tohåndshammer. Gør basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { styrke: 12 },

        angreb: {
            skadeFaktor: 1,
            hu: 2,
        },

        teknik: {
            navn: "Tvingende slag",
            skadeFaktor: 2,
            hu: 3,
            sejd: 1,
            beskrivelse: "Kræver to hænder. Et brutalt angreb, der rykker målet. Hvis du rammer, gør du dobblet basisskade og skubber målet 1 spænd væk fra dig. Hvis målet rammer en væg eller anden forhindring, falder det omkuld."
        },

        noter: ""
        },



        {
        id: "v_profan_leder_laerd",
        navn: "Profan Leder",
        basis: "visdom",
        opgradering: 0,
        beskrivelse: "Et enkelt objekt (f.eks. stav, tryllestav, sfære), der kanaliserer profan magi.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { visdom: 14 },

        angreb: {
            skadeFaktor: null,
            hu: null,
        },

        teknik: {
            navn: "Slag",
            skadeFaktor: 1,
            hu: 2,
            beskrivelse: "Slå et mål indenfor 1 spænd. Gør halv basisskade."
        },

        noter: ""
        },



        {
        id: "v_kort_svaerd_laerd",
        navn: "Kort sværd",
        basis: "behaendighed",
        opgradering: 0,
        beskrivelse: "Et enhåndssværd. Gør halv basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { behaendighed: 10 },

        angreb: {
            skadeFaktor: 0.5,
            hu: 1,
        },

        teknik: {
            navn: "Gennembor",
            skadeFaktor: 1,
            hu: 2,
            sejd: 1,
            beskrivelse: "Spid målet med spidsen af sværdet. Hvis du rammer, tager målet basisskade og bliver ængsteligt."
        },

        noter: ""
        },



        {
        id: "v_klingespyd_militarist",
        navn: "Klingespyd",
        basis: "styrke",
        opgradering: 0,
        beskrivelse: "Et tungt spyd med en klinge langs skaftet. Gør basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { styrke: 15, behaendighed: 12 },

        angreb: {
            skadeFaktor: 1,
            hu: 2,
        },

        teknik: {
            navn: "Rundhug",
            skadeFaktor: 1,
            hu: 3,
            sejd: 1,
            beskrivelse: "Kræver to hænder. Udstræk spyddet og drej hele vejen rundt om dig selv. Rul én gang for at angribe alle indenfor 1 spænd omkring dig. Gør basisskade til alle, der rammes."
        },

        noter: ""
        },



        {
        id: "v_langsvaerd_militarist",
        navn: "Langsværd",
        basis: "styrke",
        opgradering: 0,
        beskrivelse: "Et langt, tungt sværd med en bred, tveægget klinge. Gør basisskade.",

        tillaegsevne: null,
        tillaegsTaeller: null,
        tillaegsNaevner: null,

        levelKrav: { styrke: 15 },

        angreb: {
            skadeFaktor: 1,
            hu: 2,
        },

        teknik: {
            navn: "Hoppende angreb",
            skadeFaktor: 2,
            hu: 3,
            sejd: 1,
            beskrivelse: "Kræver to hænder. Angrib et mål, ved at hoppe 1 spænd fremad og lande med et voldsomt stød. Gør dobbelt basisskade."
        },

        noter: ""
        },
    ]
};





// ================================
// ========= BESVÆRGELSER =========
// ================================

const alleBesvaergelser = {
    besvaergelser: [
        {
        id: "skabelon",
        navn: "Besværgelsesnavn",
        basis: "Evne",
        beskrivelse: "Beskrivelse.",

        levelKrav: { },

        angreb: {
            skadeFaktor: 1,
            hu: 1,
            sejd: 1,
        },

        noter: ""
        },
    ]
};