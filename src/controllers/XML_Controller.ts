import { CaseModel } from "../models/CaseModel";
import { BuildDirector } from "../utils/builder/BuildDirector";
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';

//XML_Controller.ts
export class XML_Controller {

    private static instance : XML_Controller;
    private director : BuildDirector;

    private constructor() {
        this.director = new BuildDirector();
    }

    public static getInstance() : XML_Controller {
        if (!this.instance) this.instance = new XML_Controller();
        return this.instance;
    }

    // TODO: load single file
    public parseSingleFile(path : string) : CaseModel {
        throw new Error('Parse single file not yet implemented');
    }

    // TODO: load collection of files (as a folder)
    public parseCollection(path : string) : CaseModel[] {
        throw new Error('Parse collection not yet implemented');
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