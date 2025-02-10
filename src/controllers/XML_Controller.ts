// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import { CaseModel } from '../models/CaseModel';
import { BuildDirector } from '../utils/builder/BuildDirector';
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import { NullCaseModel } from '../models/NullCaseModel';
import { AbstractCaseModel } from '../models/AbstractCaseModel';
import { AbstractReportModel } from '../models/AbstractReportModel';

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
            return new NullCaseModel(); //error model
        }

        const caseID =
            this.currentDoc?.getElementsByTagName('_caseID')[0]?.textContent;
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
            this.currentDoc?.getElementsByTagName('_thirdMolarBL')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarBL(
            thirdMolarBR ? Number(thirdMolarBR) : -1,
        );

        const thirdMolarBL =
            this.currentDoc?.getElementsByTagName('_thirdMolarBR')[0]
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
        this.director.caseBuilder.setNotes(notes ? notes : 'NOTES ERROR');

        const generatedReports = this.extractReports('_generatedReports');
        this.director.caseBuilder.setReportsGenerated(generatedReports);

        //console.log('Loaded reports:', generatedReports);

        return this.director.makeCase();
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

        if (container && container.children) {
            const children = container.children;
            if (children.length % 2 !== 0) {
                console.error(
                    'Unexpected XML Structure: expected pairs of <_id> and <results>',
                );
                return list;
            }
        }

        for (var i = 0; i < container?.children.length; i += 2) {
            const idElement = container.children[i];
            const resultsElement = container.children[i + 1];

            if (
                idElement.tagName !== '_id' ||
                resultsElement.tagName !== 'results'
            ) {
                console.error(
                    'Unexpected XML structure in report pair',
                    idElement,
                    resultsElement,
                );
                continue;
            }

            list.push(
                this.director.makeReportFrom(
                    idElement.textContent || '-1',
                    resultsElement,
                ),
            );
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
        const xmlString: string = builder.buildObject({ object: _case });
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
