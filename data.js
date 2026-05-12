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

    vaaben: [
        {
        id: "v_1778595720325_sy7da",
        navn: "Håndgemæng",
        basis: "styrke",
        opgradering: 0,
        noter: "Hvis du vil kæmpe uden våben, kan du slås med dine bare næver. Her kan du bruge enten Styrke eller Behændighed som basis. Hvert slag bruger 2 Hu og gør halv basisskade."
        },
        {
        id: "v_1778595762620_o69p5",
        navn: "Håndgemæng",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Hvis du vil kæmpe uden våben, kan du slås med dine bare næver. Her kan du bruge enten Styrke eller Behændighed som basis. Hvert slag bruger 2 Hu og gør halv basisskade."
        }
    ],
    vaelgtVaaben: { styrke: null, behaendighed: null, visdom: null, mystik: null },

    stenskaar: 0,
    flaskerMax: 1,
    flaskerNu: 1,
    endeligtDoed: false,

    noter: "",
    faerdighedsnoter: "",
};



// Klasser
const standardasket = {
    klasse: "Asket",
    sind: 18,
    faerdighedsnoter: "Klassefærdighed: Indre ro\nNår du tager skade nok til at få en læsion, kan du bruge 6 Sejd for at undgå læsionen. Færdigheden kan bruges én gang per cyklus.\n\nKlassefærdighed: Indre kraft\nDu kan omdanne 4 Sejd til 1 Hu. Færdigheden kan bruges én gang per runde.",
    vaaben: [
        {
        id: "v_knojern_asket",
        navn: "Knojern",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 10\nBasis: Behændighed\nType: Nærkampsvåben (1 spænd)\nBruger: 1 Hu\n\nEt simpelt knojern. Gør halv basisskade.\n\nTeknik: Knoglebrud\nBruger: 2 Hu · 1 Sejd\nKoncentrer kraften af dit slag til et enkelt punkt på dit måls krop. Gør basisskade og målet får -1d6 til deres næste angreb."
        },
        {
        id: "v_kaede_asket",
        navn: "Kæde",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 16 · Styrke 10\nBasis: Behændighed\nType: Nærkampsvåben (2 spænd)\nBruger: 1 Hu\n\nEn let smedejernskæde. Kan ramme mål der er 2 spænd væk. Gør halv basisskade. Med kæden kan du lave fastholdelsesrul med Behændighed frem for Styrke.\n\nTeknik: Svirp\nBruger: 2 Hu · 1 Sejd\nHvis du rammer, gør du basisskade og kan trække målet 1 spænd mod dig."
        }
    ],
};

const standardbytyv = {
    klasse: "Bytyv",
    behaendighed: 18,
    faerdighedsnoter: "Klassefærdighed: Baghold\nSom bytyv kan du udnytte skjul og overraskelse til at få fordel over dine fjender. Når du laver et nærangreb mod en fjende, der ikke har set dig, får du +2d6 til angrebet. Hvis angrebet rammer, fordobles skade af det ene angreb. Færdigheden kan bruges én gang per cyklus.",
    vaaben: [
        {
        id: "v_tvillingedolke_bytyv",
        navn: "Tvillingedolke",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 15 · to hænder\nBasis: Behændighed\nType: Nærkampsvåben (1 spænd)\nBruger: 1 Hu\n\nEt sæt af to mindre dolke, en til hver hånd. Et angreb er et stød med en af dolkene. Gør halv basisskade.\n\nTeknik: Hurtige hænder\nKræver: to hænder\nBruger: 2 Hu · 1 Sejd\nAngrib med den ene dolk, flyt dig op til 1 spænd, og angrib med den anden dolk. Gør halv basisskade for hvert angreb."
        },
        {
        id: "v_langdolk_bytyv",
        navn: "Langdolk",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 12\nBasis: Behændighed\nType: Nærkampsvåben (1 spænd)\nBruger: 1 Hu\n\nEn lang dolk med en savtakket klinge. Gør halv basisskade.\n\nTeknik: Flænsning\nBruger: 2 Hu · 1 Sejd\nSkær et dybt sår i målet. Hvis de rammes, tager de basisskade nu og begynder at bløde. I starten af målets næste tur, tager de halv basisskade."
        },
    ],
};

const standardforkynder = {
    klasse: "Forkynder",
    mystik: 18,
    faerdighedsnoter: "Klassefærdighed: Bøn\nSom forkynder kan du kalde på din guddoms beskyttelse. Én gang per cyklus kan du bede for alle allierede indenfor 2 spænd og give dem +1d6 til deres næste angreb- eller forsvarsrul.",
    vaaben: [
        {
        id: "v_sakral_leder_forkynder",
        navn: "Sakral Leder",
        basis: "mystik",
        opgradering: 0,
        noter: "Kræver: Mystik 14\nBasis: Mystik\nType: Sakral Leder\nBruger: per besværgelse\n\nEt enkelt objekt (f.eks. ikon, stav, relikvie), der kanaliserer sakral magi.\n\nTeknik: Slag\nBruger: 2 Hu\nSlå et mål indenfor 1 spænd. Gør halv basisskade."
        },
        {
        id: "v_morgenstjerne_forkynder",
        navn: "Morgenstjerne",
        basis: "styrke",
        opgradering: 0,
        noter: "Kræver: Styrke 10\nBasis: Styrke\nType: Nærkampsvåben (1 spænd)\nBruger: 2 Hu\n\nEn tung kugle med pigge, fastgjort til et skaft. Gør basisskade.\n\nTeknik: Hårdt slag\nKræver: to hænder\nBruger: 3 Hu · 1 Sejd\nSlå et mål indenfor 1 spænd. Gør dobbelt basisskade."
        },
    ]
};

const standardhedonist = {
    klasse: "Hedonist",
    intuition: 18,
    faerdighedsnoter: "Klassefærdighed: Afledning\nSom hedonist kan du bruge dine sociale færdigheder til at aflede andres opmærksomhed. Én gang per cyklus kan du skabe forvirring, så en fjende angriber en af dine allierede i stedet for dig.\n\nKlassefærdighed: Duelist\nNår du står alene i nærkamp mod én fjende, får du +1d6 til forsvar mod dem. Dette gælder kun, så længe fjenden ikke er blevet angrebet af andre end dig og du ikke er blevet angrebet af andre end fjenden i løbet af kampen.",
    vaaben: [
        {
        id: "v_kaarde_hedonist",
        navn: "Kårde",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 12\nBasis: Behændighed\nType: Nærkampsvåben (1 spænd)\nBruger: 1 Hu\n\nEt elegant sværd med en lang, smal klinge. Kården er yderst spids. Gør halv basisskade.\n\nTeknik: Touché\nBruger: 2 Hu · 1 Sejd\nTræd 1 spænd frem og angrib i én glidende bevægelse. Hvis du rammer, gør du basisskade og får +1d6 på dit næste forsvar mod denne fjende, hvis den dig angriber inden din næste tur."
        },
    ],
};

const standardlovloes = {
    klasse: "Lovløs",
    form: 18,
    faerdighedsnoter: "Klassefærdighed: Kontroltab\nÉn gang per cyklus kan du miste besindelsen. Du får +1d6 til alle angreb i 3 runder, men du får samtidig -1d6 til at forsvare dig i samme periode.",
    vaaben: [
        {
        id: "v_flitsbue_lovloes",
        navn: "Flitsbue",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 12 · to hænder\nBasis: Behændighed\nType: Afstandsvåben\nBruger: 1 Hu\n\nBue og pil. Et angreb affyrer en pil op til 20 spænd. Gør halv basisskade.\n\nTeknik: Overtræk\nKræver: to hænder\nBruger: 1 Hu · 2 Sejd\nTræk buen helt ud og affyr en pil op til 30 spænd. Gør basisskade."
        },
        {
        id: "v_langspyd_lovloes",
        navn: "Langspyd",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 12\nBasis: Behændighed\nType: Nærkampsvåben (1-2 spænd)\nBruger: 1 Hu\n\nEt langt og let spyd. Et angreb er et let hug mod et mål op til 2 spænd væk. Gør halv basisskade.\n\nTeknik: Spydkast\nBruger: 2 Hu · 1 Sejd\nKast spyddet op til 15 spænd efter et mål. Gør basisskade."
        },
        {
        id: "v_krigshammer_lovloes",
        navn: "Krigshammer",
        basis: "styrke",
        opgradering: 0,
        noter: "Kræver: Styrke 12 · to hænder\nBasis: Styrke\nType: Nærkampsvåben (1 spænd)\nBruger: 2 Hu\n\nEn tung tohåndshammer. Gør basisskade.\n\nTeknik: Tvingende slag\nKræver: to hænder\nBruger: 3 Hu · 1 Sejd\nEt brutalt angreb, der rykker målet. Hvis du rammer, gør du dobblet basisskade og skubber målet 1 spænd væk fra dig. Hvis målet rammer en væg eller anden forhindring, falder det omkuld."
        },
    ],
};

const standardlaerd = {
    klasse: "Lærd",
    visdom: 18,
    faerdighedsnoter: "Klassefærdighed: Visdommens segl\nEn gang per cyklus kan du, med dit profane fokus, tegne et cirkulært segl på jorden med en diameter på 3 spænd. Når man står på dette segl, får man +1d6 til alle angrebsrul, der bruger Visdom. Seglet varer i 3 runder.",
    vaaben: [
        {
        id: "v_profan_leder_laerd",
        navn: "Profan Leder",
        basis: "visdom",
        opgradering: 0,
        noter: "Kræver: Visdom 14\nBasis: Visdom\nType: Profan Leder\nBruger: per besværgelse\n\nEt enkelt objekt (f.eks. stav, tryllestav, sfære), der kanaliserer profan magi.\n\nTeknik: Slag\nBruger: 2 Hu\nSlå et mål indenfor 1 spænd. Gør halv basisskade."
        },
        {
        id: "v_kort_svaerd_laerd",
        navn: "Kort sværd",
        basis: "behaendighed",
        opgradering: 0,
        noter: "Kræver: Behændighed 10\nBasis: Behændighed\nType: Nærkampsvåben (1 spænd)\nBruger: 1 Hu\n\nEt enhåndssværd. Gør halv basisskade.\n\nTeknik: Gennembor\nBruger: 2 Hu · 1 Sejd\nSpid målet med spidsen af sværdet. Hvis du rammer, tager målet basisskade og bliver ængsteligt."
        },
    ],
};

const standardmilitarist = {
    klasse: "Militarist",
    styrke: 18,
    faerdighedsnoter: "Klassefærdighed: Ordre\nSom militarist kan du styre slagmarken. På din tur i en kamp kan du udstede en ordre til to af dine allierede indenfor 8 spænd. Hvis de adlyder, får de hver +1d6 til at udføre den handling, du har beordret. Hvis de begge lykkes med at udføre deres ordrer inden din næste tur, får du selv +1d6 til dit næste angreb- eller forsvarsrul. Færdigheden kan bruges én gang per cyklus.",
    vaaben: [
        {
        id: "v_klingespyd_militarist",
        navn: "Klingespyd",
        basis: "styrke",
        opgradering: 0,
        noter: "Kræver: Styrke 15 · Behændighed 12\nBasis: Styrke\nType: Nærkampsvåben (1 spænd)\nBruger: 2 Hu\n\nEt tungt spyd med en klinge langs skaftet. Gør basisskade.\n\nTeknik: Rundhug\nKræver: to hænder\nBruger: 3 Hu · 1 Sejd\nUdstræk spyddet og drej hele vejen rundt om dig selv. Rul én gang for at angribe alle indenfor 1 spænd omkring dig. Gør basisskade til alle, der rammes."
        },
        {
        id: "v_langsvaerd_militarist",
        navn: "Langsværd",
        basis: "styrke",
        opgradering: 0,
        noter: "Kræver: Styrke 16\nBasis: Styrke\nType: Nærkampsvåben (1 spænd)\nBruger: 2 Hu\n\nEt langt, tungt sværd med en bred, tveægget klinge. Gør basisskade.\n\nTeknik: Hoppende angreb\nKræver: to hænder\nBruger: 3 Hu · 1 Sejd\nAngrib et mål, ved at hoppe 1 spænd fremad og lande med et voldsomt stød. Gør dobbelt basisskade."
        },
    ],
};