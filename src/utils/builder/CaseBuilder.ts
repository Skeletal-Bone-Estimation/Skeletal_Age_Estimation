// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { AbstractReportModel } from '../../models/AbstractReportModel';
import { CaseModel } from '../../models/CaseModel';
import { NullCaseModel } from '../../models/NullCaseModel';
import { NullReportModel } from '../../models/NullReportModel';
import { Affinity, Sex } from '../enums';
import { CaseBuilderIF } from './CaseBuilderIF';

// Concrete builder for CaseModel
export class CaseBuilder implements CaseBuilderIF {
    private _caseID: string;
    private _populationAffinity: number;
    private _sex: number;
    private _thirdMolarTL: number;
    private _thirdMolarTR: number;
    private _thirdMolarBL: number;
    private _thirdMolarBR: number;
    private _pubicSymphysisL: number;
    private _pubicSymphysisR: number;
    private _auricularAreaL: number;
    private _auricularAreaR: number;
    private _fourthRibL: number;
    private _fourthRibR: number;
    private _notes: string;
    private _generatedReports: AbstractReportModel[];
    private _mostRecentReport: string | NullReportModel;
    private _pubicSymphysisImages: string[];
    private _auricularSurfaceImages: string[];
    private _fourthRibImages: string[];
    private _thirdMolarImages: string[];

    constructor() {
        this._caseID = 'null';
        this._populationAffinity = Affinity.Unknown;
        this._sex = Sex.Unknown;
        this._thirdMolarTL = 0;
        this._thirdMolarTR = 0;
        this._thirdMolarBL = 0;
        this._thirdMolarBR = 0;
        this._pubicSymphysisL = 1;
        this._pubicSymphysisR = 1;
        this._auricularAreaL = 1;
        this._auricularAreaR = 1;
        this._fourthRibL = 1;
        this._fourthRibR = 1;
        this._notes = '';
        this._generatedReports = [];
        this._mostRecentReport = new NullReportModel();
        this._pubicSymphysisImages = [];
        this._auricularSurfaceImages = [];
        this._fourthRibImages = [];
        this._thirdMolarImages = [];
    }

    public buildNull(): NullCaseModel {
        return new NullCaseModel(
            this._caseID,
            this._populationAffinity,
            this._sex,
        );
    }

    /**
     * Sets the case ID.
     * @param caseID The case ID to set.
     * @returns The CaseBuilderIF instance.
     */
    public setCaseID(caseID: string): CaseBuilderIF {
        this._caseID = caseID;
        return this;
    }

    /**
     * Sets the population affinity.
     * @param populationAffinity The population affinity to set.
     * @returns The CaseBuilderIF instance.
     */
    public setPopulationAffinity(populationAffinity: number): CaseBuilderIF {
        this._populationAffinity = populationAffinity;
        return this;
    }

    /**
     * Sets the sex.
     * @param sex The sex to set.
     * @returns The CaseBuilderIF instance.
     */
    public setSex(sex: number): CaseBuilderIF {
        this._sex = sex;
        return this;
    }

    /**
     * Sets the third molar status for the top left.
     * @param thirdMolarTL The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setThirdMolarTL(thirdMolarTL: number): CaseBuilderIF {
        this._thirdMolarTL = thirdMolarTL;
        return this;
    }

    /**
     * Sets the third molar status for the top right.
     * @param thirdMolarTR The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setThirdMolarTR(thirdMolarTR: number): CaseBuilderIF {
        this._thirdMolarTR = thirdMolarTR;
        return this;
    }

    /**
     * Sets the third molar status for the bottom left.
     * @param thirdMolarBL The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setThirdMolarBL(thirdMolarBL: number): CaseBuilderIF {
        this._thirdMolarBL = thirdMolarBL;
        return this;
    }

    /**
     * Sets the third molar status for the bottom right.
     * @param thirdMolarBR The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setThirdMolarBR(thirdMolarBR: number): CaseBuilderIF {
        this._thirdMolarBR = thirdMolarBR;
        return this;
    }

    /**
     * Sets the pubic symphysis status for the left side.
     * @param pubicSymphysisL The pubic symphysis status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setPubicSymphysisL(pubicSymphysisL: number): CaseBuilderIF {
        this._pubicSymphysisL = pubicSymphysisL;
        return this;
    }

    /**
     * Sets the pubic symphysis status for the right side.
     * @param pubicSymphysisR The pubic symphysis status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setPubicSymphysisR(pubicSymphysisR: number): CaseBuilderIF {
        this._pubicSymphysisR = pubicSymphysisR;
        return this;
    }

    /**
     * Sets the auricular area status for the left side.
     * @param auricularAreaL The auricular area status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setAuricularAreaL(auricularAreaL: number): CaseBuilderIF {
        this._auricularAreaL = auricularAreaL;
        return this;
    }

    /**
     * Sets the auricular area status for the right side.
     * @param auricularAreaR The auricular area status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setAuricularAreaR(auricularAreaR: number): CaseBuilderIF {
        this._auricularAreaR = auricularAreaR;
        return this;
    }

    /**
     * Sets the sternal end status for the left fourth rib.
     * @param fourthRibL The sternal end status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setFourthRibL(fourthRibL: number): CaseBuilderIF {
        this._fourthRibL = fourthRibL;
        return this;
    }

    /**
     * Sets the sternal end status for the right fourth rib.
     * @param fourthRibR The sternal end status to set.
     * @returns The CaseBuilderIF instance.
     */
    public setFourthRibR(fourthRibR: number): CaseBuilderIF {
        this._fourthRibR = fourthRibR;
        return this;
    }

    /**
     * Sets the notes for the case.
     * @param notes The notes to set.
     * @returns The CaseBuilderIF instance.
     */
    public setNotes(notes: string): CaseBuilderIF {
        this._notes = notes;
        return this;
    }

    /**
     * Sets the reports generated for the case.
     * @param generatedReports The reports to set.
     * @returns The CaseBuilderIF instance.
     */
    public setReportsGenerated(
        generatedReports: AbstractReportModel[],
    ): CaseBuilderIF {
        this._generatedReports = generatedReports;
        return this;
    }

    /**
     * Sets the reports generated for the case.
     * @param generatedReports The reports to set.
     * @returns The CaseBuilderIF instance.
     */
    public setMostRecentReport(report: string): CaseBuilderIF {
        this._mostRecentReport = report;
        return this;
    }

    /**
     * Sets the images arrays for the uploaded pubic symphysis images for the case
     * @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    public setPubicSymphysisImages(images: string[]): CaseBuilderIF {
        this._pubicSymphysisImages = images;
        return this;
    }

    /**
     * Sets the images arrays for the uploaded auricular surface images for the case
     * @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    public setAuricularSurfaceImages(images: string[]): CaseBuilderIF {
        this._auricularSurfaceImages = images;
        return this;
    }

    /**
     * Sets the images arrays for the uploaded fourth rib images for the case
     * @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    public setFourthRibImages(images: string[]): CaseBuilderIF {
        this._fourthRibImages = images;
        return this;
    }
    /**
     * Sets the images arrays for the uploaded third molar images for the case
     *  @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    public setThirdMolarImages(images: string[]): CaseBuilderIF {
        this._thirdMolarImages = images;
        return this;
    }

    /**
     * Builds and returns the CaseModel.
     * @returns The built CaseModel.
     */
    public build(): CaseModel {
        return new CaseModel(
            this._caseID,
            this._populationAffinity,
            this._sex,
            this._thirdMolarTL,
            this._thirdMolarTR,
            this._thirdMolarBL,
            this._thirdMolarBR,
            this._pubicSymphysisL,
            this._pubicSymphysisR,
            this._auricularAreaL,
            this._auricularAreaR,
            this._fourthRibL,
            this._fourthRibR,
            this._notes,
            this._generatedReports,
            this._mostRecentReport,
            this._pubicSymphysisImages,
            this._auricularSurfaceImages,
            this._fourthRibImages,
            this._thirdMolarImages,
        );
    }
}
