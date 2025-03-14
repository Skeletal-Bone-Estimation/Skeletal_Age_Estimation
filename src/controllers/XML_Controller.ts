// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { CaseModel } from '../models/CaseModel';
import { BuildDirector } from '../utils/builder/BuildDirector';
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import { AbstractCaseModel } from '../models/AbstractCaseModel';
import { AbstractReportModel } from '../models/AbstractReportModel';
import { ReportModel } from '../models/ReportModel';
import { DataController } from './DataController';

export class XML_Controller {
    private static instance: XML_Controller;
    private currentDoc: Document | null;
    private director: BuildDirector;

    private constructor() {
        this.currentDoc = null;
        this.director = new BuildDirector();
    }

    /**
     * Retrieves the singleton instance of the XML_Controller class.
     * @returns The singleton instance.
     */
    public static getInstance(): XML_Controller {
        if (!this.instance) this.instance = new XML_Controller();
        return this.instance;
    }

    /**
     * Gets the current document.
     * @returns The current document or null if not set.
     */
    public getCurrentDoc(): Document | null {
        return this.currentDoc;
    }

    /**
     * Loads a single XML file into a CaseModel object.
     * @returns The parsed AbstractCaseModel.
     */
    public parseSingleFile(): AbstractCaseModel {
        if (!this.currentDoc) {
            console.error('Current doc error');
            return new BuildDirector().makeNullCase(); //error model
        }

        const caseID =
            this.currentDoc?.getElementsByTagName('_caseID')[0]?.textContent;

        if (
            DataController.getInstance().loadedCases.some(
                (_case: CaseModel) => _case.caseID === caseID,
            )
        ) {
            console.error('Case ID already exists:', caseID); //replace with modal popup
            return new BuildDirector().makeNullCase(); // error model
        }

        this.director.caseBuilder.setCaseID(caseID ? caseID : 'Case ID ERROR');

        const populationAffinity = this.currentDoc?.getElementsByTagName(
            '_populationAffinity',
        )[0]?.textContent;
        this.director.caseBuilder.setPopulationAffinity(
            populationAffinity ? Number(populationAffinity) : -1,
        );

        const sex =
            this.currentDoc?.getElementsByTagName('_sex')[0]?.textContent;
        this.director.caseBuilder.setSex(sex ? Number(sex) : -1);

        const thirdMolarTL =
            this.currentDoc?.getElementsByTagName('_thirdMolarTL')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarTL(
            thirdMolarTL ? Number(thirdMolarTL) : -1,
        );

        const thirdMolarTR =
            this.currentDoc?.getElementsByTagName('_thirdMolarTR')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarTR(
            thirdMolarTR ? Number(thirdMolarTR) : -1,
        );

        const thirdMolarBR =
            this.currentDoc?.getElementsByTagName('_thirdMolarBR')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarBL(
            thirdMolarBR ? Number(thirdMolarBR) : -1,
        );

        const thirdMolarBL =
            this.currentDoc?.getElementsByTagName('_thirdMolarBL')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarBR(
            thirdMolarBL ? Number(thirdMolarBL) : -1,
        );

        const pubicSymphysisL =
            this.currentDoc?.getElementsByTagName('_pubicSymphysisL')[0]
                ?.textContent;
        this.director.caseBuilder.setPubicSymphysisL(
            pubicSymphysisL ? Number(pubicSymphysisL) : -1,
        );

        const pubicSymphysisR =
            this.currentDoc?.getElementsByTagName('_pubicSymphysisR')[0]
                ?.textContent;
        this.director.caseBuilder.setPubicSymphysisR(
            pubicSymphysisR ? Number(pubicSymphysisR) : -1,
        );

        const auricularAreaL =
            this.currentDoc?.getElementsByTagName('_auricularAreaL')[0]
                ?.textContent;
        this.director.caseBuilder.setAuricularAreaL(
            auricularAreaL ? Number(auricularAreaL) : -1,
        );

        const auricularAreaR =
            this.currentDoc?.getElementsByTagName('_auricularAreaR')[0]
                ?.textContent;
        this.director.caseBuilder.setAuricularAreaR(
            auricularAreaR ? Number(auricularAreaR) : -1,
        );

        const fourthRibL =
            this.currentDoc?.getElementsByTagName('_fourthRibL')[0]
                ?.textContent;
        this.director.caseBuilder.setFourthRibL(
            fourthRibL ? Number(fourthRibL) : -1,
        );

        const fourthRibR =
            this.currentDoc?.getElementsByTagName('_fourthRibR')[0]
                ?.textContent;
        this.director.caseBuilder.setFourthRibR(
            fourthRibR ? Number(fourthRibR) : -1,
        );

        const notes =
            this.currentDoc?.getElementsByTagName('_notes')[0]?.textContent;
        this.director.caseBuilder.setNotes(notes ? notes : '');

        const generatedReports = this.extractReports('_generatedReports');
        this.director.caseBuilder.setReportsGenerated(generatedReports);

        const mostRecentReport =
            this.currentDoc.getElementsByTagName('_mostRecentReport')[0];
        if (mostRecentReport.textContent)
            this.director.caseBuilder.setMostRecentReport(
                mostRecentReport.textContent,
            );

        //console.log('Loaded reports:', generatedReports);
        //console.log('Loaded Case:', this.director.makeCase());

        return this.director.makeCase();
    }

    /**
     * Extracts a single report from an Element.
     * @param reportElement The element containing the report data
     * @returns An AbstractReportModel or null
     */
    private extractReport(reportElement: Element): AbstractReportModel | null {
        const idElement = reportElement.getElementsByTagName('_id')[0];
        const resultsElement = reportElement.getElementsByTagName('results')[0];

        if (!idElement || !resultsElement) {
            console.error(
                'Missing <_id> or <results> tag in <report>',
                reportElement,
            );
            return null;
        }

        //('Results element:', resultsElement.innerHTML);

        const id = idElement.textContent || '-1';
        const report: AbstractReportModel = this.director.makeReportFrom(
            id,
            resultsElement,
        );
        return report;
    }

    /**
     * Extracts reports from the XML file into the correctly formatted dictionary.
     * @param tag The tag name to extract reports from.
     * @returns An array of AbstractReportModel objects.
     */
    private extractReports(tag: string): AbstractReportModel[] {
        const list: AbstractReportModel[] = [];
        const container = this.currentDoc?.getElementsByTagName(tag)[0];

        if (!container) {
            console.error('Error accessing _generatedReports in XML');
            return list;
        }

        //iterate _generatedReports tag
        for (var i = 0; i < container.children.length; i++) {
            const reportElement = container.children[i];
            if (reportElement.tagName !== 'report') {
                console.error(
                    'Unexpected XML structure: Expected <report> tag',
                    reportElement,
                );
                continue;
            }

            var report = this.extractReport(reportElement);
            if (report != null) list.push(report as ReportModel);
        }

        return list;
    }

    //TODO
    /**
     * Parses a collection of files (as a folder).
     * @returns An array of CaseModel objects.
     */
    public parseCollection(): CaseModel[] {
        throw new Error('Parse collection not yet implemented');
    }

    /**
     * Loads a single case from a file.
     * @param event The event triggering the file load.
     * @param callback The callback function to execute after loading the file.
     */
    public loadFile(event: Event, callback: () => void) {
        const files = (event.target as HTMLInputElement).files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target?.result as string;
                if (fileContent) {
                    this.currentDoc = new DOMParser().parseFromString(
                        fileContent,
                        'application/xml',
                    );
                    callback();
                }
            };

            reader.onerror = (e) => {
                console.error('Error reading file:', e);
            };

            reader.readAsText(file);
        } else throw new Error('No file selected');
    }

    /**
     * Saves a single case to a file.
     * @param _case The CaseModel to save.
     * @param filename The filename to save the case as.
     */
    public saveAsFile(_case: CaseModel, filename: string): void {
        const builder: Builder = new Builder();
        const xmlString: string = builder.buildObject({
            object: {
                ..._case,
                _generatedReports: {
                    report: _case.generatedReports,
                },
            },
        });
        writeFileSync(filename, xmlString, 'utf-8');
        //console.log(`File saved to ${filename}`);
    }

    //TODO
    /**
     * Loads a collection of cases as a folder selected by the user.
     * @param event The event triggering the collection load.
     */
    public loadCollection(event: Event): void {
        // for loop to execute parseSingleFile for each case in collection
        throw new Error('Load collection not implemented yet');
    }

    //TODO
    /**
     * Saves a collection of cases into a new folder named by the user.
     * @param _case The CaseModel to save.
     * @param filename The filename to save the collection as.
     */
    public saveAsCollection(_case: CaseModel, filename: string): void {
        // for loop to execute saveAsFile for each case in collection
        throw new Error('Save as collection not yet implemented');
    }
}
