// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

//Population Affinity
export enum Affinity {
    White = 0,
    Black = 1,
    Unknown = 2,
    Error = -1,
}

//Sex
export enum Sex {
    Male = 0,
    Female = 1,
    Unknown = 2,
    Error = -1,
}

//Phase of the Third Molar
export enum ThirdMolar {
    A = 0,
    B = 1,
    C = 2,
    D = 3,
    E = 4,
    F = 5,
    G = 6,
    H = 7,
    Unknown = 8,
    Error = -1,
}

//Phase of the AuricularArea
export enum AuricularArea {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Unknown = 7,
    Error = -1,
}

//Phase of the SternalEnd
export enum SternalEnd {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Unknown = 8,
    Error = -1,
}

//Phase of the PubicSymphysis
export enum PubicSymphysis {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Unknown = 8,
    Error = -1,
}

//References to the name of the html files for their corresponding pages
export enum Pages {
    Home = 'home',
    Create = 'create',
    DataEntry = 'dataEntry',
    Report = 'report',
}

//References to the name of the html files for their corresponding pages
export enum SideBar {
    dataBar = 'dataEntrySide',
    homeBar = 'homeSide',
    createBar = 'createSide',
}

//References to the id of the corresponding element
export enum UI_Elements {
    createStartCase = 'createStart',
    dataSideCaseID = 'dataEntrySideCaseID',
    dataSideSex = 'dataEntrySideSex',
    dataSideAffinity = 'dataEntrySideAffinity',
    notes = 'notes',
    thirdMolarTL = 'thirdMolarTL',
    thirdMolarTR = 'thirdMolarTR',
    thirdMolarBL = 'thirdMolarBL',
    thirdMolarBR = 'thirdMolarBR',
    pubicSymphysisL = 'pubicSymphysisL',
    pubicSymphysisR = 'pubicSymphysisR',
    auricularAreaL = 'auricularAreaL',
    auricularAreaR = 'auricularAreaR',
    fourthRibL = 'fourthRibL',
    fourthRibR = 'fourthRibR',
}

//Number enumeration of CaseModel attributes
export enum CaseElement {
    caseID = 0,
    sex = 1,
    affinity = 2,
    thirdMolarTL = 3,
    thirdMolarTR = 4,
    thirdMolarBL = 5,
    thirdMolarBR = 6,
    pubicSymphysisL = 7,
    pubicSymphysisR = 8,
    auricularAreaL = 9,
    auricularAreaR = 10,
    fourthRibL = 11,
    fourthRibR = 12,
    notes = 13,
}

export enum Analyzers {
    Default = 'default',
    Image = 'imageAnalysis',
    Prediction = 'predictionAnalysis',
}

export enum Report {
    notes = 'notes',
    thirdMolar = 'thirdMolar',
    pubicSymphysis = 'pubicSymphysis',
    auricularSurface = 'auricularSurface',
    sternalEnd = 'sternalEnd',
}

export enum Side {
    L = 'L',
    R = 'R',
    TL = 'TL',
    TR = 'TR',
    BL = 'BL',
    BR = 'BR',
}
