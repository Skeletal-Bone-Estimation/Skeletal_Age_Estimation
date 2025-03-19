// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

/**
 * Enumeration for population affinity.
 */
export enum Affinity {
    White = 0,
    Black = 1,
    Unknown = 2,
    Error = -1,
}

/**
 * Enumeration for sex.
 */
export enum Sex {
    Male = 0,
    Female = 1,
    Unknown = 2,
    Error = -1,
}

/**
 * Enumeration for the phase of the third molar.
 */
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

/**
 * Enumeration for the phase of the auricular area.
 */
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

/**
 * Enumeration for the phase of the sternal end.
 */
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

/**
 * Enumeration for the phase of the pubic symphysis.
 */
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

/**
 * Enumeration for the names of the HTML files for their corresponding pages.
 */
export enum Pages {
    Home = 'home',
    Create = 'create',
    DataEntry = 'dataEntry',
    Report = 'report',
    ReportModal = 'reportArchiveModal',
    Compare = 'compare',
    Error = 'errorModal',
}

export enum Modals {
    Error = 'errorModal',
    Report = 'reportArchiveModal',
}

/**
 * Enumeration for the names of the HTML files for their corresponding sidebars.
 */
export enum SideBar {
    dataBar = 'dataEntrySide',
    homeBar = 'homeSide',
    createBar = 'createSide',
}

/**
 * Enumeration for the IDs of the corresponding UI elements.
 */
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
    analyzeButton = 'dataEntryReport',
    guideButton = 'scoringGuide',
    changeReportButton = 'changeReportBtn',
    backtoDataEntryButton = 'backBtn',
    downloadButton = 'downloadBtn',
    reportArchiveButton = 'archiveBtn',
    modalContent = 'modalContent',
    modalContainer = 'modalContainer',
    closeModalButton = 'closeModal',
    reportArchiveList = 'reportList',
    viewReportButton = 'submitReportBtn',
    analysisSelector = 'analysisSelector',
    mostRecentReportButton = 'viewMostRecentReport',
    uploadAuricularImages = 'uploadImageButtonAA',
    uploadPubicImages = 'uploadImageButtonPS',
    uploadSternalImages = 'uploadImageButtonSR',
    uploadMolarImages = 'uploadImageButtonTM',
    changeGraphButton90 = 'changeGraphBtn90',
    changeGraphButton95 = 'changeGraphBtn95',
    printButton = 'printBtn',
    closeErrorModal = 'closeErrorModal',
}

/**
 * Enumeration for the attributes of a CaseModel.
 */
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
    pubicSymphysisImages = 14,
    auricularSurfaceImages = 15,
    fourthRibImages = 16,
    thirdMolarImages = 17,
}

/**
 * Enumeration for the analyzer strategies.
 */
export enum Analyzers {
    Default = 'default',
    Image = 'imageAnalysis',
    Prediction = 'predictionAnalysis',
}

/**
 * Enumeration for the attributes of a ReportModel.
 */
export enum Report {
    notes = 'notes',
    thirdMolar = 'thirdMolar',
    pubicSymphysis = 'pubicSymphysis',
    auricularSurface = 'auricularSurface',
    sternalEnd = 'sternalEnd',
}

/**
 * Enumeration for the sides used by the ReportModel.
 */
export enum Side {
    L = 'L',
    R = 'R',
    TL = 'TL',
    TR = 'TR',
    BL = 'BL',
    BR = 'BR',
    C = 'C',
}

/**
 * Enumeration for the observers.
 */
export enum Observers {
    autosave = 0,
    setMostRecentReport = 1,
    setSelectedReport = 2,
}
