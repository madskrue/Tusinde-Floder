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

    faerdigheder: [],
    valgteFaerdigheder: [],

    vaaben: [],
    valgteVaaben: [],

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
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

    faerdigheder: [],
    valgteFaerdigheder: [],

    vaaben: [],
    valgteVaaben: [],

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
};



// ===========================
// ========= KLASSER =========
// ===========================

// Klasser
const standardasket = {
    klasse: "Asket",
    sind: 18,
    faerdigheder: [
        {id: "klasse_asket_indre-ro"},
        {id: "klasse_asket_indre-kraft"},
    ],
    vaaben: [
        {id: "v_knojern_asket"},
        {id: "v_kaede_asket"},
    ],
};

const standardbytyv = {
    klasse: "Bytyv",
    behaendighed: 18,
    faerdigheder: [
        {id: "klasse_bytyv_baghold"},
    ],
    vaaben: [
        {id: "v_tvillingedolke_bytyv"},
        {id: "v_langdolk_bytyv"},
    ],
};

const standardforkynder = {
    klasse: "Forkynder",
    mystik: 18,
    faerdigheder: [
        {id: "klasse_forkynder_boen"},
    ],
    vaaben: [
        {id: "v_sakral_leder_forkynder"},
        {id: "v_morgenstjerne_forkynder"},
    ]
};

const standardhedonist = {
    klasse: "Hedonist",
    intuition: 18,
    faerdigheder: [
        {id: "klasse_hedonist_afledning"},
        {id: "klasse_hedonist_duelist"},
    ],
    vaaben: [
        {id: "v_kaarde_hedonist"},
    ],
};

const standardlovloes = {
    klasse: "Lovløs",
    form: 18,
    faerdigheder: [
        {id: "klasse_lovloes_kontroltab"},
    ],
    vaaben: [
        {id: "v_flitsbue_lovloes"},
        {id: "v_langspyd_lovloes"},
        {id: "v_krigshammer_lovloes"},
    ],
};

const standardlaerd = {
    klasse: "Lærd",
    visdom: 18,
    faerdigheder: [
        {id: "klasse_laerd_visdommens-segl"},
    ],
    vaaben: [
        {id: "v_profan_leder_laerd"},
        {id: "v_kort_svaerd_laerd"},
    ],
};

const standardmilitarist = {
    klasse: "Militarist",
    styrke: 18,
    faerdigheder: [
        {id: "klasse_militarist_ordre"},
    ],
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



// ===============================
// ========= FÆRDIGHEDER =========
// ===============================

const alleFaerdigheder = {
    klassefaerdigheder: [
        {
        id: "klasse_asket_indre-ro",
        navn: "Indre ro",
        kvalifikation: "Asket",
        type: "aktiv",
        beskrivelse: "Når du tager skade nok til at få en læsion, kan du bruge 6 Sejd for at undgå læsionen. Færdigheden kan bruges én gang per cyklus.",
        },

        {
        id: "klasse_asket_indre-kraft",
        navn: "Indre kraft",
        kvalifikation: "Asket",
        type: "aktiv",
        beskrivelse: "Du kan omdanne 6 Sejd til 2 Hu. Færdigheden kan bruges én gang per cyklus.",
        },

        {
        id: "klasse_bytyv_baghold",
        navn: "Baghold",
        kvalifikation: "Bytyv",
        type: "aktiv",
        beskrivelse: "Når du laver et nærangreb mod en fjende, der ikke har set dig, får du +2d6 til angrebet. Hvis angrebet rammer, fordobles skade af det ene angreb. Færdigheden kan bruges én gang per cyklus.",
        },

        {
        id: "klasse_forkynder_boen",
        navn: "Bøn",
        kvalifikation: "Forkynder",
        type: "aktiv",
        beskrivelse: "Én gang per cyklus kan du bede for alle allierede indenfor 2 spænd og give dem +1d6 til deres næste angreb- eller forsvarsrul.",
        },

        {
        id: "klasse_hedonist_afledning",
        navn: "Afledning",
        kvalifikation: "Hedonist",
        type: "aktiv",
        beskrivelse: "Én gang per cyklus kan du skabe forvirring, så en fjende angriber en af dine allierede i stedet for dig.",
        },

        {
        id: "klasse_hedonist_duelist",
        navn: "Duelist",
        kvalifikation: "Hedonist",
        type: "passiv",
        beskrivelse: "Når du står alene i nærkamp mod én fjende, får du +1d6 til forsvar mod dem. Dette gælder kun, så længe fjenden ikke er blevet angrebet af andre end dig og du ikke er blevet angrebet af andre end fjenden i løbet af kampen.",
        },

        {
        id: "klasse_lovloes_kontroltab",
        navn: "Kontroltab",
        kvalifikation: "Lovløs",
        type: "aktiv",
        beskrivelse: "Én gang per cyklus kan du miste besindelsen. Du får +1d6 til alle angreb i 3 runder, men du får samtidig -1d6 til at forsvare dig i samme periode.",
        },

        {
        id: "klasse_laerd_visdommens-segl",
        navn: "Visdommens segl",
        kvalifikation: "Lærd",
        type: "aktiv",
        beskrivelse: "En gang per cyklus kan du, med dit profane fokus, tegne et cirkulært segl på jorden med en diameter på 3 spænd. Når man står på dette segl, får man +1d6 til alle angrebsrul, der bruger Visdom. Seglet varer i 3 runder.",
        },

        {
        id: "klasse_militarist_ordre",
        navn: "Ordre",
        kvalifikation: "Militarist",
        type: "aktiv",
        beskrivelse: "Som militarist kan du styre slagmarken. På din tur i en kamp kan du udstede en ordre til to af dine allierede indenfor 8 spænd. Hvis de adlyder, får de hver +1d6 til at udføre den handling, du har beordret. Hvis de begge lykkes med at udføre deres ordrer inden din næste tur, får du selv +1d6 til dit næste angreb- eller forsvarsrul. Færdigheden kan bruges én gang per cyklus.",
        },

    ],

    evnefaerdigheder: [
        // Form
        {
        id: "evne_form_fast-stand",
        navn: "Fast stand",
        kvalifikation: "Form",
        type: "aktiv",
        levelKrav: { form: 20 },
        beskrivelse: "Én gang per cyklus kan du aktivere din indre styrke og stå fast.\n\nI 1 runde halveres al skade mod dig og din bevægelse på din næste tur reduceres med 1 spænd per Hu.",
        },
        {
        id: "evne_form_urokkelig",
        navn: "Urokkelig",
        kvalifikation: "Form",
        type: "aktiv",
        levelKrav: { form: 30 },
        beskrivelse: "Én gang per cyklus kan du samle al din indre styrke.\n\nI 2 runder reduceres al skade mod dig med 90%. Du får urokkelig stand: i disse 2 runder - til slutning af din tur om 2 runder - kan ingen kan flytte dig, heller ikke dig selv, og du kan ikke tage nogle handlinger.",
        },
        {
        id: "evne_form_til-stede",
        navn: "Til stede",
        kvalifikation: "Form",
        type: "aktiv",
        levelKrav: { form: 40 },
        beskrivelse: "Én gang per cyklus kan du lade stærke smerter passere.\n\nI 2 runder kan du ignorere én (ikke kritisk) læsion.",
        },
        {
        id: "evne_form_afbød",
        navn: "Afbød",
        kvalifikation: "Form",
        type: "aktiv",
        levelKrav: { form: 50 },
        beskrivelse: "Én gang per cyklus kan du afbøde al skade fra ét angreb, der rammer dig.",
        },
        {
        id: "evne_form_udød",
        navn: "Udød",
        kvalifikation: "Form",
        type: "aktiv",
        levelKrav: { form: 60 },
        beskrivelse: "Én gang per cyklus, når dit Liv reduceres til 0, kan du samle dine sidste kræfter til i stedet at blive på 1 Liv og undgå at dø.",
        },

        // Sind
        {
        id: "evne_sind_disciplin-1",
        navn: "Disciplin 1",
        kvalifikation: "Sind",
        type: "aktiv",
        levelKrav: { sind: 20 },
        beskrivelse: "Saml dit sind og genvind Sejd.\n\nRul 1d6, og genvind Sejd svarende til de viste øjne. Kan bruges én gang per cyklus.",
        },
        {
        id: "evne_sind_mental-modstand",
        navn: "Mental modstand",
        kvalifikation: "Sind",
        type: "aktiv",
        levelKrav: { sind: 30 },
        beskrivelse: "Én gang per cyklus, når du rammes af et mentalt angreb, kan du bruge din mentale resiliens til at halvere den skade, du tager fra det ene angreb.",
        },
        {
        id: "evne_sind_disciplin-2",
        navn: "Disciplin 2",
        kvalifikation: "Sind",
        type: "aktiv",
        levelKrav: { sind: 40 },
        beskrivelse: "Saml dit sind og genvind Sejd.\n\nRul din Sind-pulje, og genvind Sejd svarende til den samlede sum af viste øjne. Kan bruges én gang per cyklus.",
        },
        {
        id: "evne_sind_mental-mur",
        navn: "Mental mur",
        kvalifikation: "Sind",
        type: "aktiv",
        levelKrav: { sind: 50 },
        beskrivelse: "Én gang per cyklus, når du rammes af et mentalt angreb, kan du bruge din mentale resiliens til at afbøde al skade fra det ene angreb.",
        },
        {
        id: "evne_sind_disciplin-3",
        navn: "Disciplin 3",
        kvalifikation: "Sind",
        type: "aktiv",
        levelKrav: { sind: 60 },
        beskrivelse: "Saml dit sind og genvind Sejd.\n\nRul en pulje af Sind + Form + Intuition og genvind Sejd svarende til den samlede sum af viste øjne. Kan bruges én gang per cyklus.",
        },

        // Intuition
        {
        id: "evne_intuition_skarp",
        navn: "Skarp",
        kvalifikation: "Intuition",
        type: "passiv",
        levelKrav: { intuition: 20 },
        beskrivelse: "Når du ruller initiativ, kan du vælge at rulle to gange og bruge det højeste resultat.",
        },
        {
        id: "evne_intuition_byt",
        navn: "Byt",
        kvalifikation: "Intuition",
        type: "aktiv",
        levelKrav: { intuition: 30 },
        beskrivelse: "Som det første i starten af din tur kan du vælge at bytte din tur med en allieret. \n\nDin allierede har nu tur i stedet for dig og din tur udskydes til din allieredes plads i initiativrækken.",
        },
        {
        id: "evne_intuition_fokuseret",
        navn: "Fokuseret",
        kvalifikation: "Intuition",
        type: "passiv",
        levelKrav: { intuition: 50 },
        beskrivelse: "Det koster ikke længere Hu for dig at bruge Fokusér-handlingen.",
        },
        
        // Styrke
        {
        id: "evne_styrke_kald",
        navn: "Kald",
        kvalifikation: "Styrke",
        type: "aktiv",
        levelKrav: { styrke: 20 },
        beskrivelse: "Én gang per cyklus kan du lave et kald mod himlen. Du kan fordoble skaden på dine næste to angreb, men reducerer din maksimale Hu med 1 indtil næste cyklus.",
        },
        {
        id: "evne_styrke_skælv",
        navn: "Skælv",
        kvalifikation: "Styrke",
        type: "aktiv",
        levelKrav: { styrke: 30 },
        beskrivelse: "Én gang per cyklus, på din tur, kan du trampe i jorden med en sådan kraft, at alle indenfor 1 spænd bliver kastet til jorden og tager skade svarende til dit Styrkelevel.",
        },
        {
        id: "evne_styrke_energiudladning",
        navn: "Energiudladning",
        kvalifikation: "Styrke",
        type: "aktiv",
        levelKrav: { styrke: 40 },
        beskrivelse: "Én gang per cyklus kan du samle din fysiske kraft i ét angreb. Dit næste angreb på denne tur ignorerer al skadesreduktion og angrebets skade fordobles. Hvis angrebet rammer med en fuldtræffer, kastes målet 3 spænd væk fra dig.",
        },
        {
        id: "evne_styrke_lemlæstelse",
        navn: "Lemlæstelse",
        kvalifikation: "Styrke",
        type: "aktiv",
        levelKrav: { styrke: 50 },
        beskrivelse: "Én gang per cyklus, når du laver et angreb, kan du bruge din kraft til at påføre dit mål en automatisk læsion. Målet får en læsion selvom du ikke har påført skade svarende til halvdelen af deres maksimale Liv.",
        },

        // Behændighed
        {
        id: "evne_behændighed_spæn",
        navn: "Spæn",
        kvalifikation: "Behændighed",
        type: "aktiv",
        levelKrav: { behændighed: 20 },
        beskrivelse: "Én gang per cyklus, på din tur, kan du fordoble det antal spænd du kan bevæge dig per Hu indtil starten af din næste tur.",
        },
        {
        id: "evne_behændighed_flugt",
        navn: "Flugt",
        kvalifikation: "Behændighed",
        type: "aktiv",
        levelKrav: { behændighed: 30 },
        beskrivelse: "Én gang per cyklus, på din tur, kan du bevæge dig op til 15 spænd og undgå alle reaktive angreb.",
        },
        {
        id: "evne_behændighed_hast",
        navn: "Hast",
        kvalifikation: "Behændighed",
        type: "aktiv",
        levelKrav: { behændighed: 40 },
        beskrivelse: "Én gang per cyklus, når du laver et angreb, kan du lave et ekstra angreb, der ikke koster Sejd, uden bruge Hu på dette ekstra angreb.",
        },
        {
        id: "evne_behændighed_ruller",
        navn: "Ruller",
        kvalifikation: "Behændighed",
        type: "passiv",
        levelKrav: { behændighed: 50 },
        beskrivelse: "Det koster nu kun 1 Hu for dig at lave Undvigerul.",
        },
        {
        id: "evne_behændighed_dans",
        navn: "Dans",
        kvalifikation: "Behændighed",
        type: "aktiv",
        levelKrav: { behændighed: 60 },
        beskrivelse: "Én gang per cyklus kan du bevæge dig som en uforudsigelig danser. I 2 runder kan du bevæge dig gennem fjender uden at udløse reaktive angreb, og du får +2d6 til alle undvigerul- og undvigelseshandlinger.",
        },

        // Visdom
        {
        id: "evne_visdom_klarhed",
        navn: "Klarhed",
        kvalifikation: "Visdom",
        type: "aktiv",
        levelKrav: { visdom: 20 },
        beskrivelse: "Én gang per cyklus kan du bruge din ophobede viden for at opnå kortvarig klarhed. Du får +2d6 til dit næste rul, men du bruger 5 Sejd og din maksimale Sejd reduceres med 5 indtil næste cyklus.",
        },
        {
        id: "evne_visdom_vidensdeling",
        navn: "Vidensdeling",
        kvalifikation: "Visdom",
        type: "aktiv",
        levelKrav: { visdom: 30 },
        beskrivelse: "Én gang per cyklus kan du dele din viden med dine allierede. Vælg op til 3 allierede indenfor 8 spænd. De får alle +1d6 til deres næste rul i enten Visdom eller Sind, efter eget valg.",
        },
        {
        id: "evne_visdom_vaks",
        navn: "Vaks",
        kvalifikation: "Visdom",
        type: "aktiv",
        levelKrav: { visdom: 40 },
        beskrivelse: "Én gang per cyklus, når du laver et rul i Visdom eller Sind, kan du vælge at rulle alle terninger om. Det er resultatet af det nye rul, der gælder.",
        },
        {
        id: "evne_visdom_cyklisk-forståelse",
        navn: "Cyklisk forståelse",
        kvalifikation: "Visdom",
        type: "aktiv",
        levelKrav: { visdom: 60 },
        beskrivelse: "Én gang per cyklus kan du bruge din forståelse af den cykliske natur.\n\nHvis du tidligere i denne cyklus har brugt en anden evnefærdighed, der ellers kun kan bruges én gang per cyklus, kan du bruge den igen uden at betale dens omkostninger.",
        },

        // Mystik
        {
        id: "evne_mystik_offer",
        navn: "Offer",
        kvalifikation: "Mystik",
        type: "aktiv",
        levelKrav: { mystik: 20 },
        beskrivelse: "Én gang per cyklus kan du ofre dit helbred og tage skade svarende til halvdelen af dit maksimale Liv (uden at få en læsion) for at hele dybe sår. Du kan helbrede op til 2 læsioner på enten dig selv eller en allieret, du berører.",
        },
        {
        id: "evne_mystik_tidslig-forståelse",
        navn: "Tidslig forståelse",
        kvalifikation: "Mystik",
        type: "aktiv",
        levelKrav: { mystik: 30 },
        beskrivelse: "Én gang per cyklus kan du rette dit sind til cyklussens tidslighed for at forudse en begivenhed.\n\nDu kan bede Spilmesteren fortælle dig hvilken handling, en fjende du kan se, vil tage på deres næste tur. Spilmesteren skal svare efter bedste evne.",
        },
        {
        id: "evne_mystik_katlas-bøn",
        navn: "Katlas bøn",
        kvalifikation: "Mystik",
        type: "aktiv",
        levelKrav: { mystik: 40 },
        beskrivelse: "Én gang per cyklus, hvis en person dør indenfor 2 spænd af dig, kan du umiddelbart efter bede en bøn, hvorefter den døde genopstår på stedet, uden forvitring, med halvdelen af sit maks Liv og med en ekstra læsion.",
        },
        {
        id: "evne_mystik_deling",
        navn: "Deling",
        kvalifikation: "Mystik",
        type: "aktiv",
        levelKrav: { mystik: 50 },
        beskrivelse: "Én gang per cyklus kan du røre en person og give dem en del af din kraft.\n\nSkaden af målets næste angreb (der ikke bruger Sejd) fordobles, mens skaden af dit næste angreb halveres.",
        },
        {
        id: "evne_mystik_livshæver",
        navn: "Livshæver",
        kvalifikation: "Mystik",
        type: "aktiv",
        levelKrav: { mystik: 60 },
        beskrivelse: "Én gang per cyklus, når en fjende dør indenfor 2 spænd af dig, kan du trække deres ånd ind i dig selv. Rul Mystik mod deres Form. Hvis du lykkes, genvinder du Liv svarende til dit Mystiklevel.",
        }
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

        goerSkade: false,

        angreb: {
            skadeFaktor: null,
            hu: null,
            sejd: null,
        },

        noter: ""
        },
    ]
};