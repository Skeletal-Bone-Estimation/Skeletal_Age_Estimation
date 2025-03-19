// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { DataController } from '../controllers/DataController';
import {
    Affinity,
    AuricularArea,
    PubicSymphysis,
    Sex,
    SternalEnd,
    ThirdMolar,
} from '../utils/enums';
import { AutosaveObserver } from '../utils/observer/AutosaveObserver';
import { ReportManagerObserver } from '../utils/observer/ReportManagerOberver';
import { AbstractCaseModel } from './AbstractCaseModel';
import { AbstractReportModel } from './AbstractReportModel';
import { NullReportModel } from './NullReportModel';
import { ReportModel } from './ReportModel';

export class CaseModel extends AbstractCaseModel {
    protected _caseID: string;
    protected _populationAffinity: Affinity;
    protected _sex: Sex;
    protected _thirdMolarTL: ThirdMolar;
    protected _thirdMolarTR: ThirdMolar;
    protected _thirdMolarBL: ThirdMolar;
    protected _thirdMolarBR: ThirdMolar;
    protected _pubicSymphysisL: PubicSymphysis;
    protected _pubicSymphysisR: PubicSymphysis;
    protected _auricularAreaL: AuricularArea;
    protected _auricularAreaR: AuricularArea;
    protected _fourthRibL: SternalEnd;
    protected _fourthRibR: SternalEnd;
    protected _notes: string;
    protected _generatedReports: AbstractReportModel[];
    private _mostRecentReport: string | NullReportModel;
    protected _pubicSymphysisImages: string[];
    protected _auricularSurfaceImages: string[];
    protected _fourthRibImages: string[];
    protected _thirdMolarImages: string[];

    constructor(
        caseID: string,
        populationAffinity: Affinity,
        sex: Sex,
        thirdMolarTL: ThirdMolar,
        thirdMolarTR: ThirdMolar,
        thirdMolarBL: ThirdMolar,
        thirdMolarBR: ThirdMolar,
        pubicSymphysisL: PubicSymphysis,
        pubicSymphysisR: PubicSymphysis,
        auricularAreaL: AuricularArea,
        auricularAreaR: AuricularArea,
        fourthRibL: SternalEnd,
        fourthRibR: SternalEnd,
        notes: string,
        generatedReports: AbstractReportModel[],
        mostRecentReport: string | NullReportModel,
        pubicSymphysisImages: string[] = [],
        auricularSurfaceImages: string[] = [],
        fourthRibImages: string[] = [],
        thirdMolarImages: string[] = [],
    ) {
        super();
        this._caseID = caseID;
        this._populationAffinity = populationAffinity;
        this._sex = sex;
        this._thirdMolarTL = thirdMolarTL;
        this._thirdMolarTR = thirdMolarTR;
        this._thirdMolarBL = thirdMolarBL;
        this._thirdMolarBR = thirdMolarBR;
        this._pubicSymphysisL = pubicSymphysisL;
        this._pubicSymphysisR = pubicSymphysisR;
        this._auricularAreaL = auricularAreaL;
        this._auricularAreaR = auricularAreaR;
        this._fourthRibL = fourthRibL;
        this._fourthRibR = fourthRibR;
        this._generatedReports = generatedReports;
        this._notes = notes;
        this.observers = [];
        this._mostRecentReport = mostRecentReport;
        this._pubicSymphysisImages = pubicSymphysisImages;
        this._auricularSurfaceImages = auricularSurfaceImages;
        this._fourthRibImages = fourthRibImages;
        this._thirdMolarImages = thirdMolarImages;
        this.attach(new AutosaveObserver());
        this.attach(new ReportManagerObserver());
    }

    /**
     * Gets the most recent report.
     * @returns The most recent AbstractReportModel.
     */
    public get mostRecentReport(): string | NullReportModel {
        return this._mostRecentReport;
    }

    /**
     * Sets the most recent report.
     * @param report The new most recent AbstractReportModel.
     */
    public set mostRecentReport(reportIdx: string) {
        this._mostRecentReport = reportIdx;
    }

    /**
     * Gets the case ID.
     * @returns The case ID.
     */
    public get caseID(): string {
        return this._caseID;
    }

    /**
     * Sets the case ID.
     * @param value The new case ID.
     */
    public set caseID(value: string) {
        this._caseID = value;
    }

    /**
     * Gets the population affinity.
     * @returns The population affinity.
     */
    public get populationAffinity(): Affinity {
        return this._populationAffinity;
    }

    /**
     * Sets the population affinity.
     * @param value The new population affinity.
     */
    public set populationAffinity(value: Affinity) {
        this._populationAffinity = value;
    }

    /**
     * Gets the sex.
     * @returns The sex.
     */
    public get sex(): Sex {
        return this._sex;
    }

    /**
     * Sets the sex.
     * @param value The new sex.
     */
    public set sex(value: Sex) {
        this._sex = value;
    }

    /**
     * Gets the third molar status for the top left.
     * @returns The third molar status.
     */
    public get thirdMolarTL(): ThirdMolar {
        return this._thirdMolarTL;
    }

    /**
     * Gets the third molar status for the top right.
     * @returns The third molar status.
     */
    public get thirdMolarTR(): ThirdMolar {
        return this._thirdMolarTR;
    }

    /**
     * Gets the third molar status for the bottom left.
     * @returns The third molar status.
     */
    public get thirdMolarBL(): ThirdMolar {
        return this._thirdMolarBL;
    }

    /**
     * Gets the third molar status for the bottom right.
     * @returns The third molar status.
     */
    public get thirdMolarBR(): ThirdMolar {
        return this._thirdMolarBR;
    }

    /**
     * Sets the third molar status for the top left.
     * @param value The new third molar status.
     */
    public set thirdMolarTL(value: ThirdMolar) {
        this._thirdMolarTL = value;
    }

    /**
     * Sets the third molar status for the top right.
     * @param value The new third molar status.
     */
    public set thirdMolarTR(value: ThirdMolar) {
        this._thirdMolarTR = value;
    }

    /**
     * Sets the third molar status for the bottom left.
     * @param value The new third molar status.
     */
    public set thirdMolarBL(value: ThirdMolar) {
        this._thirdMolarBL = value;
    }

    /**
     * Sets the third molar status for the bottom right.
     * @param value The new third molar status.
     */
    public set thirdMolarBR(value: ThirdMolar) {
        this._thirdMolarBR = value;
    }

    /**
     * Gets the pubic symphysis status for the left side.
     * @returns The pubic symphysis status.
     */
    public get pubicSymphysisL(): PubicSymphysis {
        return this._pubicSymphysisL;
    }

    /**
     * Gets the pubic symphysis status for the right side.
     * @returns The pubic symphysis status.
     */
    public get pubicSymphysisR(): PubicSymphysis {
        return this._pubicSymphysisR;
    }

    /**
     * Sets the pubic symphysis status for the left side.
     * @param value The new pubic symphysis status.
     */
    public set pubicSymphysisL(value: PubicSymphysis) {
        this._pubicSymphysisL = value;
    }

    /**
     * Sets the pubic symphysis status for the right side.
     * @param value The new pubic symphysis status.
     */
    public set pubicSymphysisR(value: PubicSymphysis) {
        this._pubicSymphysisR = value;
    }

    /**
     * Gets the auricular area status for the left side.
     * @returns The auricular area status.
     */
    public get auricularAreaL(): AuricularArea {
        return this._auricularAreaL;
    }

    /**
     * Gets the auricular area status for the right side.
     * @returns The auricular area status.
     */
    public get auricularAreaR(): AuricularArea {
        return this._auricularAreaR;
    }

    /**
     * Sets the auricular area status for the left side.
     * @param value The new auricular area status.
     */
    public set auricularAreaL(value: AuricularArea) {
        this._auricularAreaL = value;
    }

    /**
     * Sets the auricular area status for the right side.
     * @param value The new auricular area status.
     */
    public set auricularAreaR(value: AuricularArea) {
        this._auricularAreaR = value;
    }

    /**
     * Gets the sternal end status for the left fourth rib.
     * @returns The sternal end status.
     */
    public get fourthRibL(): SternalEnd {
        return this._fourthRibL;
    }

    /**
     * Gets the sternal end status for the right fourth rib.
     * @returns The sternal end status.
     */
    public get fourthRibR(): SternalEnd {
        return this._fourthRibR;
    }

    /**
     * Sets the sternal end status for the left fourth rib.
     * @param value The new sternal end status.
     */
    public set fourthRibL(value: SternalEnd) {
        this._fourthRibL = value;
    }

    /**
     * Sets the sternal end status for the right fourth rib.
     * @param value The new sternal end status.
     */
    public set fourthRibR(value: SternalEnd) {
        this._fourthRibR = value;
    }

    /**
     * Gets the notes for the case.
     * @returns The notes.
     */
    public get notes() {
        return this._notes;
    }

    /**
     * Sets the notes for the case.
     * @param value The new notes.
     */
    public set notes(value: string) {
        this._notes = value;
    }

    /**
     * Gets the generated reports for the case.
     * @returns The generated reports.
     */
    public get generatedReports(): AbstractReportModel[] {
        return this._generatedReports;
    }

    /**
     * Sets the generated reports for the case.
     * @param value The new generated reports.
     */
    public set generatedReports(value: AbstractReportModel[]) {
        this._generatedReports = value;
    }

    /**
     * Gets the uploaded pubic symphysis images for the case
     * @returns the uploaded pubic symphysis images
     */
    public get pubicSymphysisImages(): string[] {
        return this._pubicSymphysisImages;
    }
    /**
     * Sets the uploaded pubic symphysis images for the case
     * @param images the uploaded pubic symphysis images
     */
    public set pubicSymphysisImages(images: string[]) {
        this._pubicSymphysisImages = images;
    }

    /**
     * Gets the uploaded auricular surface images for the case
     * @returns the uploaded auricular surface images
     */
    public get auricularSurfaceImages(): string[] {
        return this._auricularSurfaceImages;
    }
    /**
     * Sets the uploaded auricular surface images for the case
     * @param images the uploaded auricular surface images
     */
    public set auricularSurfaceImages(images: string[]) {
        this._auricularSurfaceImages = images;
    }

    /**
     * Gets the uploaded fourth rib images for the case
     * @returns the uploaded fourth rib images
     */
    public get fourthRibImages(): string[] {
        return this._fourthRibImages;
    }
    /**
     * Sets the uploaded fourth rib images for the case
     * @param images the uploaded fourth rib images
     */
    public set fourthRibImages(images: string[]) {
        this._fourthRibImages = images;
    }

    /**
     * Gets the uploaded third molar images for the case
     * @returns the uploaded third molar images
     */
    public get thirdMolarImages(): string[] {
        return this._thirdMolarImages;
    }
    /**
     * Sets the uploaded third molar images for the case
     * @param images the uploaded third molar images
     */
    public set thirdMolarImages(images: string[]) {
        this._thirdMolarImages = images;
    }

    /**
     * Adds a report to the generated reports.
     * @param report The report to add.
     */
    public addReport(report: AbstractReportModel): void {
        this._generatedReports.push(report);
    }

    /**
     * Removes a report from the generated reports.
     * @param report The report to remove.
     */
    public removeReport(report: AbstractReportModel): void {
        var idx: number = DataController.getInstance().findReportIndex(
            (report as ReportModel).id,
        );
        idx != -1
            ? this._generatedReports.splice(idx, 1)
            : console.error(`Report at index ${idx} not found`);
    }
}
