import { CaseModel } from "../models/CaseModel";
import { BuildDirector } from "../utils/builder/BuildDirector";
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import { DataController } from "./DataController";

//XML_Controller.ts
export class XML_Controller {

    private static instance : XML_Controller;
    private currentDoc : Document | null;
    private director : BuildDirector;

    private constructor() {
        this.currentDoc = null;
        this.director = new BuildDirector();
    }

    public static getInstance() : XML_Controller {
        if (!this.instance) this.instance = new XML_Controller();
        return this.instance;
    }

    // TODO: load single file
    public parseSingleFile() : CaseModel {
        throw new Error('Parse single file not yet implemented');
    }

    // TODO: load collection of files (as a folder)
    public parseCollection() : CaseModel[] {
        throw new Error('Parse collection not yet implemented');
    }

    public loadFile(event : Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target?.result as string;
                if (fileContent) {
                    const parser = new DOMParser();
                    const xmlDoc : Document = parser.parseFromString(fileContent, 'application/xml');
                    this.currentDoc = xmlDoc;
                };
            }

            reader.onerror = (e) => {
                console.error('Error reading file:', e);
            };

            reader.readAsText(file);
        }
        else throw Error('');
    }

    // TODO: load collection of cases as folder selected by user
    public loadCollection(event : Event) : void {
        throw new Error('Load collection not implemented yet');
    }

    public saveAsFile(_case : CaseModel, filename : string) : void {

        const builder : Builder = new Builder();
        const xmlString : string = builder.buildObject({object : _case})
        writeFileSync(filename, xmlString, 'utf-8');
        console.log(`File saved to ${filename}`);
    }

    //TODO: save collection of cases into new folder named by the user
    public saveAsCollection(_case: CaseModel, filename: string): void {
        throw new Error('Save as collection not yet implemented')
    }
}