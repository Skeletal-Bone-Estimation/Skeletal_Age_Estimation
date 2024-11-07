import { CaseModel } from "../models/CaseModel";
import { BuildDirector } from "../utils/builder/BuildDirector";
import { CaseBuilder } from "../utils/builder/CaseBuilder";

//XML_Controller.ts
export class XML_Controller {

    private static instance : XML_Controller;
    private director : BuildDirector;

    private constructor() {
        this.director = new BuildDirector();
    }

    public static getInstance() : XML_Controller {
        if (!this.instance) this.instance = new XML_Controller;
        return this.instance;
    }

    // TODO: load single file
    public parseSingleFile(path : string) : CaseModel {
        throw new Error('Parse single file not yet implemented');
    }

    // TODO: load collection of files
    public parseCollection(path : string) : CaseModel[] {
        throw new Error('Parse collection not yet implemented');
    }

    // TODO: save file
    public saveAsFile(filename : string) : boolean {
        throw new Error('Save as file not yet implemented')
    }
}