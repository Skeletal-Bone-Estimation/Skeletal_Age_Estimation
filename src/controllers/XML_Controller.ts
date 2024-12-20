import { CaseModel } from '../models/CaseModel';
import { BuildDirector, ReportType } from '../utils/builder/BuildDirector';
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import { NullCaseModel } from '../models/NullCaseModel';
import { ReportModel } from '../models/ReportModel';
import { AbstractCaseModel } from '../models/AbstractCaseModel';

//XML_Controller.ts
export class XML_Controller {
    private static instance: XML_Controller;
    private currentDoc: Document | null;
    private director: BuildDirector;

    private constructor() {
        this.currentDoc = null;
        this.director = new BuildDirector();
    }

    public static getInstance(): XML_Controller {
        if (!this.instance) this.instance = new XML_Controller();
        return this.instance;
    }

    //loads a single xml file into a CaseModel object
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

        return this.director.makeCase();
    }

    private extractReports(tag: string): { [id: number]: ReportModel } {
        const dict: { [id: number]: ReportModel } = {};

        const element = this.currentDoc?.getElementsByTagName(tag)[0];
        if (element) {
            element.childNodes.forEach((node) => {
                if (node.nodeName !== '#text') {
                    const key: number = Number(node.nodeName);
                    const value: ReportModel =
                        this.director.reportBuilder.buildFrom(node.textContent);
                }
            });
        }

        return dict;
    }

    private extractDict(id: string): { [key: string]: number } {
        const dict: { [key: string]: number } = {};
        const element = this.currentDoc?.getElementsByTagName(id)[0];
        if (element) {
            element.childNodes.forEach((node) => {
                if (node.nodeName !== '#text') {
                    const key: string = node.nodeName;
                    const value: number = Number(node.textContent) || -1;
                    dict[key] = value;
                }
            });
        }
        return dict;
    }

    // TODO: load collection of files (as a folder)
    public parseCollection(): CaseModel[] {
        throw new Error('Parse collection not yet implemented');
    }

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

    public saveAsFile(_case: CaseModel, filename: string): void {
        const builder: Builder = new Builder();
        const xmlString: string = builder.buildObject({ object: _case });
        writeFileSync(filename, xmlString, 'utf-8');
        //console.log(`File saved to ${filename}`);
    }

    // TODO: load collection of cases as folder selected by user
    public loadCollection(event: Event): void {
        // for loop to execute parseSingleFile for each case in collection
        throw new Error('Load collection not implemented yet');
    }

    //TODO: save collection of cases into new folder named by the user
    public saveAsCollection(_case: CaseModel, filename: string): void {
        // for loop to execute saveAsFile for each case in collection
        throw new Error('Save as collection not yet implemented');
    }
}
