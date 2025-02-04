// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

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

    public getCurrentDoc(): Document | null {
        return this.currentDoc;
    }

    //loads a single xml file into a CaseModel object
    public parseSingleFile(): AbstractCaseModel {
        if (!this.currentDoc) {
            console.error('Current doc error');
            return new NullCaseModel(); // error model
        }

        console.log('Starting parsing');

        const caseID =
            this.currentDoc?.getElementsByTagName('caseID')[0]?.textContent;
        this.director.caseBuilder.setCaseID(caseID ? caseID : 'Case ID ERROR');

        const populationAffinity =
            this.currentDoc?.getElementsByTagName('populationAffinity')[0]
                ?.textContent;
        this.director.caseBuilder.setPopulationAffinity(
            populationAffinity ? Number(populationAffinity) : -1,
        );

        const sex =
            this.currentDoc?.getElementsByTagName('sex')[0]?.textContent;
        this.director.caseBuilder.setSex(sex ? Number(sex) : -1);

        const thirdMolarTL =
            this.currentDoc?.getElementsByTagName('thirdMolarTL')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarTL(
            thirdMolarTL ? Number(thirdMolarTL) : -1,
        );

        const thirdMolarTR =
            this.currentDoc?.getElementsByTagName('thirdMolarTR')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarTR(
            thirdMolarTR ? Number(thirdMolarTR) : -1,
        );

        const thirdMolarBL =
            this.currentDoc?.getElementsByTagName('thirdMolarBL')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarBL(
            thirdMolarBL ? Number(thirdMolarBL) : -1,
        );

        const thirdMolarBR =
            this.currentDoc?.getElementsByTagName('thirdMolarBR')[0]
                ?.textContent;
        this.director.caseBuilder.setThirdMolarBR(
            thirdMolarBR ? Number(thirdMolarBR) : -1,
        );

        const pubicSymphysisL =
            this.currentDoc?.getElementsByTagName('pubicSymphysisL')[0]
                ?.textContent;
        this.director.caseBuilder.setPubicSymphysisL(
            pubicSymphysisL ? Number(pubicSymphysisL) : -1,
        );

        const pubicSymphysisR =
            this.currentDoc?.getElementsByTagName('pubicSymphysisR')[0]
                ?.textContent;
        this.director.caseBuilder.setPubicSymphysisR(
            pubicSymphysisR ? Number(pubicSymphysisR) : -1,
        );

        const auricularAreaL =
            this.currentDoc?.getElementsByTagName('auricularAreaL')[0]
                ?.textContent;
        this.director.caseBuilder.setAuricularAreaL(
            auricularAreaL ? Number(auricularAreaL) : -1,
        );

        const auricularAreaR =
            this.currentDoc?.getElementsByTagName('auricularAreaR')[0]
                ?.textContent;
        this.director.caseBuilder.setAuricularAreaR(
            auricularAreaR ? Number(auricularAreaR) : -1,
        );

        const fourthRibL =
            this.currentDoc?.getElementsByTagName('fourthRibL')[0]?.textContent;
        this.director.caseBuilder.setFourthRibL(
            fourthRibL ? Number(fourthRibL) : -1,
        );

        const fourthRibR =
            this.currentDoc?.getElementsByTagName('fourthRibR')[0]?.textContent;
        this.director.caseBuilder.setFourthRibR(
            fourthRibR ? Number(fourthRibR) : -1,
        );

        const notes =
            this.currentDoc?.getElementsByTagName('notes')[0]?.textContent;
        this.director.caseBuilder.setNotes(notes ? notes : '');

        //extract the images
        this.director.caseBuilder.setAuricularImages(
            this.extractImagePaths('auricularImages'),
        );
        this.director.caseBuilder.setPubicImages(
            this.extractImagePaths('pubicImages'),
        );
        this.director.caseBuilder.setSternalImages(
            this.extractImagePaths('sternalImages'),
        );
        this.director.caseBuilder.setMolarImages(
            this.extractImagePaths('molarImages'),
        );

        const generatedReports = this.extractReports('generatedReports');
        this.director.caseBuilder.setReportsGenerated(generatedReports);

        return this.director.makeCase();
    }

    private extractImagePaths(tag: string): string[] {
        const paths: string[] = [];
        const elements = this.currentDoc?.getElementsByTagName(tag);

        if (elements && elements.length > 0) {
            Array.from(elements[0].childNodes).forEach((node) => {
                if (node.nodeName !== '#text' && node.textContent) {
                    paths.push(node.textContent.trim());
                }
            });
        }

        return paths;
    }

    private extractReports(tag: string): { [id: number]: ReportModel } {
        const dict: { [id: number]: ReportModel } = {};

        const element = this.currentDoc?.getElementsByTagName(tag)[0];
        if (element) {
            element.childNodes.forEach((node) => {
                if (node.nodeName !== '#text' && node.textContent != null) {
                    const key: number = Number(node.nodeName);
                    const value: ReportModel =
                        this.director.reportBuilder.build(node.textContent);
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
        const xmlObject = {
            object: {
                caseID: _case.caseID,
                populationAffinity: _case.populationAffinity,
                sex: _case.sex,
                thirdMolarTL: _case.thirdMolarTL,
                thirdMolarTR: _case.thirdMolarTR,
                thirdMolarBL: _case.thirdMolarBL,
                thirdMolarBR: _case.thirdMolarBR,
                pubicSymphysisL: _case.pubicSymphysisL,
                pubicSymphysisR: _case.pubicSymphysisR,
                auricularAreaL: _case.auricularAreaL,
                auricularAreaR: _case.auricularAreaR,
                fourthRibL: _case.fourthRibL,
                fourthRibR: _case.fourthRibR,
                notes: _case.notes,

                auricularImages: _case.auricularImages.length
                    ? {
                          image: _case.auricularImages.map((path) => ({ _: path,})),
                      }
                    : { image: [] }, 
                pubicImages: _case.pubicImages.length
                    ? { image: _case.pubicImages.map((path) => ({ _: path })) }
                    : { image: [] },
                sternalImages: _case.sternalImages.length
                    ? {
                          image: _case.sternalImages.map((path) => ({_: path,})),
                      }
                    : { image: [] },
                molarImages: _case.molarImages.length
                    ? { image: _case.molarImages.map((path) => ({ _: path })) }
                    : { image: [] },
            },
        };

        const xmlString: string = builder.buildObject(xmlObject);
        writeFileSync(filename, xmlString, 'utf-8');
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
