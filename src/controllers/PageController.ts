// src/controllers/PageController.ts
import * as fs from 'fs';
import * as path from 'path';
import { AbstractView } from '../views/AbstractView';
import { HomePageView } from '../views/HomePageView';
import { CreateCaseView } from '../views/CreateCaseView';
import { DataEntryView } from '../views/DataEntryView';
import { XML_Controller } from './XML_Controller';
import { DataController } from './DataController';

//add file names here
export enum Pages {
    Home = 'home',
    Create = 'create',
    dataEntry = 'dataEntry'
}

export class PageController {
    private contentDiv: HTMLElement;
    private views: { [key: string]: AbstractView };
    private currentView : AbstractView;

    constructor() {
        this.contentDiv = document.getElementById('rootDiv')!; //document can only be retreived if called from the renderer.ts file
        this.views = {
           home: new HomePageView(document),
           create: new CreateCaseView(document),
           dataEntry: new DataEntryView(document)
           //add additional views here
        }
        this.currentView = this.views[Pages.Home];
        this.initEventListeners();
    }

    //public function to dynamically swap requested content into the index html file
    public navigateTo(page: Pages) {
        this.currentView = this.views[page];
        this.loadPage(page)
    }

    public foo() {

    }

    //assigns event listeners to objects within the document (can only be called while in the renderer.ts file)
    private initEventListeners(): void {
        document.getElementById('homeBtn')!.addEventListener('click', () => this.navigateTo(Pages.Home));
        document.getElementById('createBtn')!.addEventListener('click', () => this.navigateTo(Pages.Create));
        document.getElementById('dataEntryBtn')!.addEventListener('click', () => this.navigateTo(Pages.dataEntry));
        document.getElementById('saveBtn')!.addEventListener('click', () => XML_Controller.getInstance().saveAsFile(DataController.getInstance().openCase, `save_data/${DataController.getInstance().openCase.caseID}.xml`));
    }

    // asynchronous function that will retreive the html content included in the desired file
    private async loadPageContent(page : Pages): Promise<string> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../../templates/', `${page}.html`);
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    //asynchronous function that will render the page using the view's specific render function
    private async loadPage(page: Pages): Promise<void> {
        try {
            const content = await this.loadPageContent(page);
            this.currentView.render(content);
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }
}
