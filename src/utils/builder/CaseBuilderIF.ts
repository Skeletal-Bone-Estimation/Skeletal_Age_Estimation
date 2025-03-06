// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { AbstractReportModel } from '../../models/AbstractReportModel';
import {
    Affinity,
    Sex,
    ThirdMolar,
    AuricularArea,
    SternalEnd,
    PubicSymphysis,
} from '../enums';

export interface CaseBuilderIF {
    /**
     * Sets the case ID.
     * @param caseID The case ID to set.
     * @returns The CaseBuilderIF instance.
     */
    setCaseID(caseID: string): CaseBuilderIF;

    /**
     * Sets the population affinity.
     * @param populationAffinity The population affinity to set.
     * @returns The CaseBuilderIF instance.
     */
    setPopulationAffinity(populationAffinity: Affinity): CaseBuilderIF;

    /**
     * Sets the sex.
     * @param sex The sex to set.
     * @returns The CaseBuilderIF instance.
     */
    setSex(sex: Sex): CaseBuilderIF;

    /**
     * Sets the third molar status for the top left.
     * @param thirdMolarTL The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    setThirdMolarTL(thirdMolarTL: ThirdMolar): CaseBuilderIF;

    /**
     * Sets the third molar status for the top right.
     * @param thirdMolarTR The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    setThirdMolarTR(thirdMolarTR: ThirdMolar): CaseBuilderIF;

    /**
     * Sets the third molar status for the bottom left.
     * @param thirdMolarBL The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    setThirdMolarBL(thirdMolarBL: ThirdMolar): CaseBuilderIF;

    /**
     * Sets the third molar status for the bottom right.
     * @param thirdMolarBR The third molar status to set.
     * @returns The CaseBuilderIF instance.
     */
    setThirdMolarBR(thirdMolarBR: ThirdMolar): CaseBuilderIF;

    /**
     * Sets the pubic symphysis status for the left side.
     * @param pubicSymphysisL The pubic symphysis status to set.
     * @returns The CaseBuilderIF instance.
     */
    setPubicSymphysisL(pubicSymphysisL: PubicSymphysis): CaseBuilderIF;

    /**
     * Sets the pubic symphysis status for the right side.
     * @param pubicSymphysisR The pubic symphysis status to set.
     * @returns The CaseBuilderIF instance.
     */
    setPubicSymphysisR(pubicSymphysisR: PubicSymphysis): CaseBuilderIF;

    /**
     * Sets the auricular area status for the left side.
     * @param auricularAreaL The auricular area status to set.
     * @returns The CaseBuilderIF instance.
     */
    setAuricularAreaL(auricularAreaL: AuricularArea): CaseBuilderIF;

    /**
     * Sets the auricular area status for the right side.
     * @param auricularAreaR The auricular area status to set.
     * @returns The CaseBuilderIF instance.
     */
    setAuricularAreaR(auricularAreaR: AuricularArea): CaseBuilderIF;

    /**
     * Sets the sternal end status for the left fourth rib.
     * @param fourthRibL The sternal end status to set.
     * @returns The CaseBuilderIF instance.
     */
    setFourthRibL(fourthRibL: SternalEnd): CaseBuilderIF;

    /**
     * Sets the sternal end status for the right fourth rib.
     * @param fourthRibR The sternal end status to set.
     * @returns The CaseBuilderIF instance.
     */
    setFourthRibR(fourthRibR: SternalEnd): CaseBuilderIF;

    /**
     * Sets the notes for the case.
     * @param notes The notes to set.
     * @returns The CaseBuilderIF instance.
     */
    setNotes(notes: string): CaseBuilderIF;

    /**
     * Sets the reports generated for the case.
     * @param reports The reports to set.
     * @returns The CaseBuilderIF instance.
     */
    setReportsGenerated(reports: {
        [id: number]: AbstractReportModel;
    }): CaseBuilderIF;

    /**
     * Sets the images arrays for the uploaded pubic symphysis images for the case
     * @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    setPubicSymphysisImages(images: string[]): CaseBuilderIF;

    /**
     * Sets the images arrays for the uploaded auricular surface images for the case
     * @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    setAuricularSurfaceImages(images: string[]): CaseBuilderIF;

    /**
     * Sets the images arrays for the uploaded fourth rib images for the case
     * @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    setFourthRibImages(images: string[]): CaseBuilderIF;

    /**
     * Sets the images arrays for the uploaded third molar images for the case
     *  @param images The images to set.
     * @returns The CaseBuilderIF instance.
     */
    setThirdMolarImages(images: string[]): CaseBuilderIF;
}
