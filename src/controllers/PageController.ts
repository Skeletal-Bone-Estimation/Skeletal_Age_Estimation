// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis
import * as fs from 'fs';
import * as path from 'path';
import generateBlob from 'html-to-docx';
import { AbstractView } from '../views/AbstractView';
import { HomePageView } from '../views/HomePageView';
import { CreateCaseView } from '../views/CreateCaseView';
import { DataEntryView } from '../views/DataEntryView';
import { ReportPageView } from '../views/ReportPageView';
import { ComparePageView } from '../views/ComparePageView';
import { XML_Controller } from './XML_Controller';
import { DataController } from './DataController';
import { CaseModel } from '../models/CaseModel';
import { ReportModel } from '../models/ReportModel';
import {
    Side,
    Pages,
    SideBar,
    UI_Elements,
    Affinity,
    Sex,
    ThirdMolar,
    CaseElement,
    AuricularArea,
    SternalEnd,
    PubicSymphysis,
} from '../utils/enums';
import { ReportModal } from '../views/ReportModal';
import { isElementAccessExpression } from 'typescript';

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
            report: new ReportPageView(document),

            reportModal: new ReportModal(document),

            compare: new ComparePageView(document),

            //add additional views here
        };
        this.currentView = this.views[Pages.Home];
        //automatically loads in the homeBar when first opened
        this.loadSideBarContent(SideBar.homeBar);
        this.initEventListeners();
    }

    /**
     * Retrieves the singleton instance of the PageController class.
     * @returns The singleton instance.
     */
    public static getInstance(): PageController {
        if (!PageController.instance)
            PageController.instance = new PageController();
        return PageController.instance;
    }

    // READ FROM GUI
    /**
     * Creates a new case with the specified parameters.
     * @param id The case ID.
     * @param sex The sex of the individual.
     * @param pop The population affinity.
     */
    public createCase(id: string, sex: number, pop: number) {
        DataController.getInstance().createCase(id, sex, pop); //pass parameters to this function
    }

    /**
     * Navigates to the specified page and optionally loads the sidebar content.
     * @param page The page to navigate to.
     * @param sidebar The sidebar to load (optional).
     */
    public async navigateTo(page: Pages, sidebar: SideBar | null = null) {
        this.currentView = this.views[page];
        if (sidebar) await this.loadSideBarContent(sidebar);
        await this.loadPage(page);
    }

    /**
     * Initializes event listeners for the document.
     */
    private initEventListeners(): void {
        //home button
        document
            .getElementById('homeBtn')!
            .addEventListener('click', async () => {
                await this.navigateTo(Pages.Home);
                await this.loadSideBarContent(SideBar.homeBar);
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
                await this.navigateTo(Pages.DataEntry, SideBar.dataBar);
            });

        //load case button
        document
            .getElementById('loadBtn')!
            .addEventListener('click', () =>
                document.getElementById('loadCase')!.click(),
            );
    }

    /**
     * Asynchronously loads the page content and renders it using the view's specific render function.
     * @param page The page to load.
     */
    private async loadPage(page: Pages): Promise<void> {
        try {
            const content = await this.loadPageContent(page);
            this.currentView.render(content);
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    /**
     * Asynchronously retrieves the HTML content from the desired file.
     * @param page The page or sidebar to load content for.
     * @returns The HTML content as a string.
     */
    public async loadPageContent(page: Pages | SideBar): Promise<string> {
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

    /**
     * Asynchronously loads sidebar content from HTML files.
     * @param page The sidebar to load content for.
     */
    public async loadSideBarContent(page: SideBar): Promise<void> {
        try {
            //console.log(`Loading sidebar content for: ${page}`);
            const content = await this.loadPageContent(page);
            //console.log('Sidebar content:', content);
            this.rootBarDiv.innerHTML = content;
            //console.log('Sidebar content loaded into rootBarDiv');
        } catch (error) {
            console.error('Error loading sidebar content:', error);
        }
    }

    /**
     * Delegates to XML_Controller.editCase with parameters based on the ID enumeration.
     * @param id The UI element ID.
     * @param content The new content for the specified element.
     */
    public editCase(
        id: UI_Elements,
        content:
            | string
            | Affinity
            | Sex
            | ThirdMolar
            | PubicSymphysis
            | AuricularArea
            | SternalEnd
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
            case UI_Elements.thirdMolarTL:
                DataController.getInstance().editCase(
                    CaseElement.thirdMolarTL,
                    content as ThirdMolar,
                );
                break;
            case UI_Elements.thirdMolarTR:
                DataController.getInstance().editCase(
                    CaseElement.thirdMolarTR,
                    content as ThirdMolar,
                );
                break;
            case UI_Elements.thirdMolarBL:
                DataController.getInstance().editCase(
                    CaseElement.thirdMolarBL,
                    content as ThirdMolar,
                );
                break;
            case UI_Elements.thirdMolarBR:
                DataController.getInstance().editCase(
                    CaseElement.thirdMolarBR,
                    content as ThirdMolar,
                );
                break;
            case UI_Elements.pubicSymphysisL:
                DataController.getInstance().editCase(
                    CaseElement.pubicSymphysisL,
                    content as PubicSymphysis,
                );
                break;
            case UI_Elements.pubicSymphysisR:
                DataController.getInstance().editCase(
                    CaseElement.pubicSymphysisR,
                    content as PubicSymphysis,
                );
                break;
            case UI_Elements.auricularAreaL:
                DataController.getInstance().editCase(
                    CaseElement.auricularAreaL,
                    content as AuricularArea,
                );
                break;
            case UI_Elements.auricularAreaR:
                DataController.getInstance().editCase(
                    CaseElement.auricularAreaR,
                    content as AuricularArea,
                );
                break;
            case UI_Elements.fourthRibL:
                DataController.getInstance().editCase(
                    CaseElement.fourthRibL,
                    content as SternalEnd,
                );
                break;
            case UI_Elements.fourthRibR:
                DataController.getInstance().editCase(
                    CaseElement.fourthRibR,
                    content as SternalEnd,
                );
                break;
            case UI_Elements.notes:
                DataController.getInstance().editCase(
                    CaseElement.notes,
                    content as string,
                );
                break;
            default:
                throw new Error(
                    'Invalid ui element passed to PageController.editcase()',
                );
        }
    }

    /**
     * Gets the currently open case.
     * @returns The currently open CaseModel.
     */
    public getOpenCase(): CaseModel {
        return DataController.getInstance().openCase as CaseModel;
    }

    /**
     * Exports the report to a Word document.
     * @param report The report to export.
     * @param filename The filename to save the report as (optional).
     */
    public async exportReport(
        report: ReportModel,
        filename: string = 'default_report.docx',
    ): Promise<void> {
        if (report.getThirdMolar(Side.C) === 0) {
            var content = `Analyzing the stage of development of the 3rd molar using Mincer et al. (1993) indicated an individual ${(this.currentView as ReportPageView).accessFormatThirdMolar(report.getThirdMolar(Side.C)).toLowerCase()}`;
        } else {
            var content = `
            Chronological age at death estimates were obtained from the evaluation of the fourth sternal rib end, pubic symphysis morphology, auricular surface morphology, and the stage of development of the 3rd molar. The Hartnett (2010) method was used to estimate age from the pubic symphysis and suggests an age range of ${report.getPubicSymphysisRange(Side.C).min.toFixed(2)}-${report.getPubicSymphysisRange(Side.C).max.toFixed(2)} years. According to Hartnett (2010), the left fourth sternal rib end is consistent with an individual between ${report.getSternalEndRange(Side.C).min.toFixed(2)}-${report.getSternalEndRange(Side.C).max.toFixed(2)} years of age. 
                    <br />
                    <br />
            The Osborne et al. (2004) method for analyzing auricular surface morphology suggested an age range of ${report.getAuricularSurfaceRange(Side.C).min.toFixed(2)}-${report.getAuricularSurfaceRange(Side.C).max.toFixed(2)} years. 
                    <br />
                    <br />
            Analyzing the stage of development of the 3rd molar using Mincer et al. (1993) indicated an individual ${(this.currentView as ReportPageView).accessFormatThirdMolar(report.getThirdMolar(Side.C)).toLowerCase()}
                    <br />
                    <br />
                    <br />
            Taking into consideration all the age analysis performed, the age range for this individual is estimated at ${Math.min(report.getPubicSymphysisRange(Side.C).min, report.getAuricularSurfaceRange(Side.C).min, report.getSternalEndRange(Side.C).min).toFixed(2)} - ${Math.max(report.getPubicSymphysisRange(Side.C).max, report.getAuricularSurfaceRange(Side.C).max, report.getSternalEndRange(Side.C).max).toFixed(2)} years at the time of death.</p>`;
        }
        if (!content.trim()) {
            console.warn('Export failed: Empty content.');
            return;
        }

        try {
            // Generate Blob from content
            const arrayBuffer = await generateBlob(content);
            const blob = new Blob([arrayBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            // Convert Blob to URL
            const url = URL.createObjectURL(blob);

            // Create a temporary download link and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Release the object URL

            console.log('File download started successfully:', filename);
        } catch (error) {
            console.error('Error exporting to Word:', error);
        }
    }

    /**
     * Loads the report modal.
     */
    public async loadModal(): Promise<void> {
        this.currentView = this.views.reportModal;
        (this.currentView as ReportModal).openModal();
        (this.currentView as ReportModal).render(
            await this.loadPageContent(Pages.ReportModal),
        );
    }

    /**
     * Unloads the report modal.
     */
    public unloadModal(): void {
        this.currentView = this.views.report;
    }

    /**
     * Loads the report by its index.
     * @param reportIDX The index of the report to load.
     */
    public loadReport(reportIDX: number) {
        const dc = DataController.getInstance();
        dc.openReport = (dc.openCase as CaseModel).generatedReports[reportIDX];
        this.navigateTo(Pages.Report, SideBar.createBar);
    }
}
