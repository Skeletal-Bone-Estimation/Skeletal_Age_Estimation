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
import {
    Pages,
    SideBar,
    UI_Elements,
    Affinity,
    Sex,
    ThirdMolar,
    CaseElement,
} from '../utils/enums';

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
    public async navigateTo(page: Pages) {
        this.currentView = this.views[page];
        await this.loadPage(page);
    }

    //assigns event listeners to objects within the document (can only be called while in the renderer.ts file)
    private initEventListeners(): void {
        //home button
        document
            .getElementById('homeBtn')!
            .addEventListener('click', async () => {
                await this.navigateTo(Pages.Home);
                await this.loadSideBarContent(SideBar.homeBar);
            });

        //create button
        document
            .getElementById('createBtn')!
            .addEventListener('click', async () => {
                await this.navigateTo(Pages.Create);
                this.loadSideBarContent(SideBar.createBar);
            });

        //data entry button
        document
            .getElementById('dataEntryBtn')!
            .addEventListener('click', async () => {
                await this.navigateTo(Pages.DataEntry);
                await this.loadSideBarContent(SideBar.dataBar);
            });

        //save case button
        document.getElementById('saveBtn')!.addEventListener('click', () => {
            XML_Controller.getInstance().saveAsFile(
                DataController.getInstance().openCase as CaseModel,
                `save_data/${(DataController.getInstance().openCase as CaseModel).caseID}.xml`,
            );
        });

        //hidden file load element
        document
            .getElementById('loadCase')!
            .addEventListener('change', async (event) => {
                DataController.getInstance().loadCaseFromFile(event);
                await this.navigateTo(Pages.DataEntry);
                this.navigateTo(Pages.DataEntry);
                this.loadSideBarContent(SideBar.dataBar);
            });

        //load case button
        document
            .getElementById('loadBtn')!
            .addEventListener('click', () =>
                document.getElementById('loadCase')!.click(),
            );
    }

    // asynchronous function that will retreive the html content included in the desired file
    private async loadPageContent(page: Pages | SideBar): Promise<string> {
        const filePath = path.join(
            __dirname,
            '../../templates/',
            `${page}.html`,
        );
        //console.log('Loading HTML content from:', filePath);
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    reject(err);
                } else resolve(data);
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

    //asynchronously loads sidebar content from html files
    private async loadSideBarContent(page: SideBar): Promise<void> {
        try {
            //console.log(`Loading sidebar content for: ${page}`);
            const content = await this.loadPageContent(page);
            //console.log('Sidebar content:', content);
            this.rootBarDiv.innerHTML = content;
            //console.log('Sidebar content loaded into rootBarDiv');
            this.currentView.setSidebarListeners(); // Reinitialize listeners after loading sidebar
        } catch (error) {
            console.error('Error loading sidebar content:', error);
        }
    }

    //delegates to XML_Controller.editCase with parameters based on the id enumeration
    public editCase(
        id: UI_Elements,
        content:
            | string
            | Affinity
            | Sex
            | ThirdMolar
            | { [key: string]: number },
    ): void {
        switch (id) {
            case UI_Elements.dataSideCaseID:
                DataController.getInstance().editCase(
                    CaseElement.caseID,
                    content as string,
                );
                break;
            case UI_Elements.dataSideSex:
                DataController.getInstance().editCase(
                    CaseElement.sex,
                    content as Sex,
                );
                break;
            case UI_Elements.dataSideAffinity:
                DataController.getInstance().editCase(
                    CaseElement.affinity,
                    content as Affinity,
                );
                break;
            case UI_Elements.thirdMolar:
                DataController.getInstance().editCase(
                    CaseElement.thirdMolar,
                    content as ThirdMolar,
                );
                break;
            case UI_Elements.pubicSymphysis:
                DataController.getInstance().editCase(
                    CaseElement.pubicSymphysis,
                    content as { [key: string]: number },
                );
                break;
            case UI_Elements.auricularEdge:
                DataController.getInstance().editCase(
                    CaseElement.auricularEdge,
                    content as { [key: string]: number },
                );
                break;
            case UI_Elements.fourthRib:
                DataController.getInstance().editCase(
                    CaseElement.fourthRib,
                    content as { [key: string]: number },
                );
                break;
            default:
                throw new Error(
                    'Invalid ui element passed to PageController.editcase()',
                );
        }
    }
}
