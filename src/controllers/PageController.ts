// src/controllers/PageController.ts
import * as fs from 'fs';
import * as path from 'path';
import { AbstractView } from '../views/AbstractView';
import { HomePageView } from '../views/HomePageView';
import { CreateCaseView } from '../views/CreateCaseView';
import { DataEntryView } from '../views/DataEntryView';
import { XML_Controller } from './XML_Controller';
import { DataController } from './DataController';
import { CaseModel } from '../models/CaseModel';

//add file names here
export enum Pages {
    Home = 'home',
    Create = 'create',
    DataEntry = 'dataEntry',
}

export enum SideBar {
    dataBar = 'dataEntrySide',
    homeBar = 'homeSide',
    createBar = 'createSide',
}

export class PageController {
    private static instance: PageController;
    private contentDiv: HTMLElement;
    private rootBarDiv: HTMLElement;
    private views: { [key: string]: AbstractView };
    private currentView: AbstractView;

    private constructor() {
        this.contentDiv = document.getElementById('rootDiv')!; //document can only be retreived if called from the renderer.ts file
        this.rootBarDiv = document.getElementById('rootBar')!;
        this.views = {
            home: new HomePageView(document),
            create: new CreateCaseView(document),
            dataEntry: new DataEntryView(document),
            //add additional views here
        };
        this.currentView = this.views[Pages.Home];
        //automatically loads in the homeBar when first opened
        this.loadSideBarContent(SideBar.homeBar);
        this.initEventListeners();
    }

    public static getInstance(): PageController {
        if (!PageController.instance)
            PageController.instance = new PageController();
        return PageController.instance;
    }

    //public function to dynamically swap requested content into the index html file
    public navigateTo(page: Pages) {
        this.currentView = this.views[page];
        this.loadPage(page);
    }

    //assigns event listeners to objects within the document (can only be called while in the renderer.ts file)
    private initEventListeners(): void {
        document.getElementById('homeBtn')!.addEventListener('click', () => {
            this.navigateTo(Pages.Home);
            this.loadSideBarContent(SideBar.homeBar);
        });
        document.getElementById('createBtn')!.addEventListener('click', () => {
            this.navigateTo(Pages.Create);
            this.loadSideBarContent(SideBar.createBar);
        });
        document
            .getElementById('dataEntryBtn')!
            .addEventListener('click', () => {
                this.navigateTo(Pages.DataEntry);
                this.loadSideBarContent(SideBar.dataBar);
            });
        document.getElementById('saveBtn')!.addEventListener('click', () => {
            XML_Controller.getInstance().saveAsFile(
                DataController.getInstance().openCase as CaseModel,
                `save_data/${(DataController.getInstance().openCase as CaseModel).caseID}.xml`,
            );
        });
        document
            .getElementById('loadCase')!
            .addEventListener('change', (event) => {
                DataController.getInstance().loadCase(event);
                this.navigateTo(Pages.DataEntry);
                this.loadSideBarContent(SideBar.dataBar);
            });
        document
            .getElementById('loadBtn')!
            .addEventListener('click', () =>
                document.getElementById('loadCase')!.click(),
            );
    }

    // asynchronous function that will retreive the html content included in the desired file
    private async loadPageContent(page: Pages | SideBar): Promise<string> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(
                __dirname,
                '../../templates/',
                `${page}.html`,
            );
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

    private async loadSideBarContent(page: SideBar): Promise<void> {
        try {
            const content = await this.loadPageContent(page);
            this.rootBarDiv.innerHTML = content;
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }
}
