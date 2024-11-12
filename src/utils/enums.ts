export enum Affinity {
    White = 0,
    Black = 1,
    Unknown = 2,
    Error = -1,
}

export enum Sex {
    Male = 0,
    Female = 1,
    Unknown = 2,
    Error = -1,
}

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

//add file names here
export enum Pages {
    Home = 'home',
    Create = 'create',
    DataEntry = 'dataEntry',
}

export enum SideBar {
    dataBar = 'dataEntrySide',
    homeBar = 'homeSide',
    createBar = 'createSide',
}

export enum UI_Elements {
    caseID = 'case',
    sex = 'sex',
    affinity = 'race',
    thirdMolar = 'thirdMolar',
    pubicSymphysis = 'pubicSymphysis',
    auricularEdge = 'auricularEdge',
    fourthRib = 'fourthRib',
}
