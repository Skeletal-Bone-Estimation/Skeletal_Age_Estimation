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
    Unknown = 7,
    Error = -1,
}

//References to the name of the html files for their corresponding pages
export enum Pages {
    Home = 'home',
    Create = 'create',
    DataEntry = 'dataEntry',
}

//References to the name of the html files for their corresponding pages
export enum SideBar {
    dataBar = 'dataEntrySide',
    homeBar = 'homeSide',
    createBar = 'createSide',
}

//References to the id of the corresponding element
export enum UI_Elements {
    dataSideCaseID = 'dataEntrySideCaseID',
    dataSideSex = 'dataEntrySideSex',
    dataSideAffinity = 'dataEntrySideAffinity',
    thirdMolar = 'thirdMolar',
    pubicSymphysis = 'pubicSymphysis',
    auricularEdge = 'auricularEdge',
    fourthRib = 'fourthRib',
}

//Number enumeration of CaseModel attributes
export enum CaseElement {
    caseID = 0,
    sex = 1,
    affinity = 2,
    thirdMolar = 3,
    pubicSymphysis = 4,
    auricularEdge = 5,
    fourthRib = 6,
}
