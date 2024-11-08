import { CaseModel } from '../models/CaseModel';
import { BuildDirector, ReportType } from '../utils/builder/BuildDirector';
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import { DataController } from './DataController';
import { ReportModel } from '../models/ReportModel';
import { NullCaseModel } from '../models/NullCaseModel';

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
    public parseSingleFile(): CaseModel {
        // Using getElementsByTagName instead of querySelector
        if (!this.currentDoc) {
            console.log('current doc error');
            return new NullCaseModel();
        }

        // Debugging caseID
        const caseID =
            this.currentDoc?.getElementsByTagName('_caseID')[0]?.textContent;
        console.log('caseID:', caseID); // Log the value of caseID
        this.director.caseBuilder.setCaseID(caseID ? caseID : 'Case ID ERROR');

        // Debugging populationAffinity
        const populationAffinity = this.currentDoc?.getElementsByTagName(
            '_populationAffinity',
        )[0]?.textContent;
        console.log('populationAffinity:', populationAffinity); // Log the value of populationAffinity
        this.director.caseBuilder.setPopulationAffinity(
            populationAffinity ? Number(populationAffinity) : -1,
        );

        // Debugging sex
        const sex =
            this.currentDoc?.getElementsByTagName('_sex')[0]?.textContent;
        console.log('sex:', sex); // Log the value of sex
        this.director.caseBuilder.setSex(sex ? Number(sex) : -1);

        // Debugging thirdMolar
        const thirdMolar =
            this.currentDoc?.getElementsByTagName('_thirdMolar')[0]
                ?.textContent;
        console.log('thirdMolar:', thirdMolar); // Log the value of thirdMolar
        this.director.caseBuilder.setThirdMolar(
            thirdMolar ? Number(thirdMolar) : -1,
        );

        // Debugging pubicSymphysis
        const pubicSymphysis = this.extractDict('_pubicSymphysis');
        console.log('pubicSymphysis:', pubicSymphysis); // Log the value of pubicSymphysis
        this.director.caseBuilder.setPubicSymphysis(pubicSymphysis);

        // Debugging auricularEdge
        const auricularEdge = this.extractDict('_auricularEdge');
        console.log('auricularEdge:', auricularEdge); // Log the value of auricularEdge
        this.director.caseBuilder.setAuricularEdge(auricularEdge);

        // Debugging fourthRib
        const fourthRib = this.extractDict('_fourthRib');
        console.log('fourthRib:', fourthRib); // Log the value of fourthRib
        this.director.caseBuilder.setFourthRib(fourthRib);

        return this.director.make(ReportType.Case);
    }

    private extractDict(id: string): { [key: string]: number } {
        const dict: { [key: string]: number } = {};
        const element = this.currentDoc?.querySelector(id);
        if (element) {
            element.childNodes.forEach((node) => {
                if (node.nodeName !== '#text') {
                    // Skip any text nodes (whitespace, newlines, etc.)
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
                    console.log('Loaded XML Document:', this.currentDoc); // Debugging: Log the document to check if it's loaded correctly
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
