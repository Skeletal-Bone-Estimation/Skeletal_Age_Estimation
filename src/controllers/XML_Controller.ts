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

    // TODO: load single file
    public parseSingleFile(): AbstractCaseModel {
        if (!this.currentDoc) {
            console.log('Current doc error');
            return new NullCaseModel();
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

        const thirdMolar =
            this.currentDoc?.getElementsByTagName('_thirdMolar')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolar(
            thirdMolar ? Number(thirdMolar) : -1,
        );

        const pubicSymphysis = this.extractDict('_pubicSymphysis');
        this.director.caseBuilder.setPubicSymphysis(pubicSymphysis);

        const auricularEdge = this.extractDict('_auricularEdge');
        this.director.caseBuilder.setAuricularEdge(auricularEdge);

        const fourthRib = this.extractDict('_fourthRib');
        this.director.caseBuilder.setFourthRib(fourthRib);

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
        console.log(`File saved to ${filename}`);
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
