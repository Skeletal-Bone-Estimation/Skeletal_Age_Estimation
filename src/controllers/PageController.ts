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
import { CaseItem } from '../views/CaseItem';

export class PageController {
    private static instance: PageController;
    private contentDiv: HTMLElement;
    private rootBarDiv: HTMLElement;
    private views: { [key: string]: AbstractView };
    private sidebarCaseItems: CaseItem[];
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
        this.sidebarCaseItems = [];
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

    /**
     * Asynchronously loads sidebar content from HTML files.
     * @param page The sidebar to load content for.
     */
    private async loadSideBarContent(page: SideBar): Promise<void> {
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
    private isExporting = false;
    public async exportReport(
        report: ReportModel,
        filename: string = 'default_report.docx',
    ): Promise<void> {
        if (this.isExporting) {
            console.warn('Export already in progress');
            return;
        }

        this.isExporting = true;

        if (report.getThirdMolar(Side.C) === 0) {
            var content = `Analyzing the stage of development of the 3rd molar using Mincer et al. (1993) indicated an individual ${(this.currentView as ReportPageView).accessFormatThirdMolar(report.getThirdMolar(Side.C)).toLowerCase()}`;
        } else {
            var content = `
            <p>Chronological age at death estimates were obtained from the evaluation of the fourth sternal rib end, pubic symphysis morphology, auricular surface morphology, and the stage of development of the 3rd molar. The Hartnett (2010) method was used to estimate age from the pubic symphysis and suggests an age range of ${report.getPubicSymphysisRange(Side.C).min.toFixed(2)}-${report.getPubicSymphysisRange(Side.C).max.toFixed(2)} years. According to Hartnett (2010), the left fourth sternal rib end is consistent with an individual between ${report.getSternalEndRange(Side.C).min.toFixed(2)}-${report.getSternalEndRange(Side.C).max.toFixed(2)} years of age. </p>
                    <br />
            <p>The Osborne et al. (2004) method for analyzing auricular surface morphology suggested an age range of ${report.getAuricularSurfaceRange(Side.C).min.toFixed(2)}-${report.getAuricularSurfaceRange(Side.C).max.toFixed(2)} years. </p>
                    <br />
            <p>Analyzing the stage of development of the 3rd molar using Mincer et al. (1993) indicated an individual ${(this.currentView as ReportPageView).accessFormatThirdMolar(report.getThirdMolar(Side.C)).toLowerCase()}. </p>
                    <br />
            <p>Taking into consideration all the age analysis performed, the age range for this individual is estimated at ${Math.min(report.getPubicSymphysisRange(Side.C).min, report.getAuricularSurfaceRange(Side.C).min, report.getSternalEndRange(Side.C).min).toFixed(2)} - ${Math.max(report.getPubicSymphysisRange(Side.C).max, report.getAuricularSurfaceRange(Side.C).max, report.getSternalEndRange(Side.C).max).toFixed(2)} years at the time of death.</p>`;
        }

        if (!content.trim()) {
            console.warn('Export failed: Empty content.');
            this.isExporting = false;
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

            // Trigger click only once
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting to Word:', error);
        } finally {
            this.isExporting = false;
        }
    }

    public async printReport(report: ReportModel): Promise<void> {
        if (this.isExporting) {
            console.warn('Export already in progress');
            return;
        }

        this.isExporting = true;

        let content = '';

        if (report.getThirdMolar(Side.C) === 0) {
            content = `Analyzing the stage of development of the 3rd molar using Mincer et al. (1993) indicated an individual ${(this.currentView as ReportPageView).accessFormatThirdMolar(report.getThirdMolar(Side.C)).toLowerCase()}`;
        } else {
            content = `
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
            console.warn('Print failed: Empty content.');
            this.isExporting = false;
            return;
        }

        try {
            const printWindowProxy = window.open(
                '',
                '',
                'width=800,height=600',
            );
            if (printWindowProxy) {
                const printWindow = printWindowProxy as unknown as Window;
                const divColor2 = getComputedStyle(
                    document.documentElement,
                ).getPropertyValue('--div-color-2');
                const onDark = getComputedStyle(
                    document.documentElement,
                ).getPropertyValue('--on-dark');
                const hoverOnLight = getComputedStyle(
                    document.documentElement,
                ).getPropertyValue('--hover-on-light');

                const elementOverall = document.getElementById(
                    'ageBar',
                ) as HTMLElement;
                const elementPub = document.getElementById(
                    'pubicSymphysisBar',
                ) as HTMLElement;
                const elementAur = document.getElementById(
                    'auricularSurfaceBar',
                ) as HTMLElement;
                const elementRib = document.getElementById(
                    'sternalEndBar',
                ) as HTMLElement;

                const stylesOverall = getComputedStyle(elementOverall);
                const stylesPub = getComputedStyle(elementPub);
                const stylesAur = getComputedStyle(elementAur);
                const stylesRib = getComputedStyle(elementRib);

                console.log(stylesOverall);

                printWindow.document.write(`
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 20px;
                                }
                                @media print {
                                    h1{
                                        display: none;
                                    }
                                    button {
                                        display: none;
                                    }
                                }
                                .reportButtons {
                                    background-color: ${divColor2};
                                    border: 2px solid ${divColor2};
                                    color: ${onDark};
                                    text-align: center;
                                    text-decoration: none;
                                    font-size: clamp(12px, 2vw, 16px);
                                    padding: 10px 15px;
                                    width: 50%;
                                    box-sizing: border-box;
                                    border-radius: 8px;
                                }
                                .reportButtons:hover {
                                    background-color: ${hoverOnLight};
                                    transition: 0.2s;
                                }
                                .button-container {
                                    display: flex;
                                    justify-content: center;
                                    margin-bottom: 20px;
                                }
                                .preview-container {
                                    display: flex;
                                    justify-content: center;
                                    margin-bottom: 20px;
                                }
                                .graphPlacement {
                                    width: clamp(300px, 80%, 800px); 
                                    aspect-ratio: 1; 
                                    background: white;
                                    border: 2px solid ${divColor2};
                                    border-radius: 5px;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                    position: relative;
                                    margin-top: 50px; 
                                }
                                .graphPlacement h3 {
                                    position:absolute;
                                    top: -10%;
                                }
                                .graphTitle {
                                    position:absolute;
                                    top: -10%;
                                }
                                .vertical-line {
                                    position: absolute;
                                    top: 0;
                                    bottom: 0;
                                    width: 2px;
                                    background-color: rgba(0,0,0,0.2);
                                    font-weight: bold;
                                }
                                .line-10 { left: 10%; }
                                .line-20 { left: 20%; }
                                .line-30 { left: 30%; }
                                .line-40 { left: 40%; }
                                .line-50 { left: 50%; }
                                .line-60 { left: 60%; }
                                .line-70 { left: 70%; }
                                .line-80 { left: 80%; }
                                .line-90 { left: 90%; }
                                .range-container {
                                    position: relative;
                                    flex-direction: row;
                                    width: 100%;
                                    height: 80px;
                                    background-color: rgba(0, 0, 0, 0);
                                    color: white;
                                    margin: 20px auto;
                                }
                                .range-bar {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    text-align: center;
                                    position: absolute;
                                    height: 100%;
                                    width: 100%; 
                                    background-color: rgba(15, 89, 78, 0.9);
                                    font-weight: bold;
                                }
                                #ageBar {
                                    position: ${stylesOverall.getPropertyValue(stylesOverall[248])};
                                    left: ${stylesOverall.getPropertyValue(stylesOverall[173])};
                                    width: ${stylesOverall.getPropertyValue(stylesOverall[340])};
                                }
                                #pubicSymphysisBar {
                                    position: ${stylesPub.getPropertyValue(stylesPub[248])};
                                    left: ${stylesPub.getPropertyValue(stylesPub[173])};
                                    width: ${stylesPub.getPropertyValue(stylesPub[340])};
                                }
                                #auricularSurfaceBar {
                                    position: ${stylesAur.getPropertyValue(stylesAur[248])};
                                    left: ${stylesAur.getPropertyValue(stylesAur[173])};
                                    width: ${stylesAur.getPropertyValue(stylesAur[340])};
                                }
                                #sternalEndBar {
                                    position: ${stylesRib.getPropertyValue(stylesRib[248])};
                                    left: ${stylesRib.getPropertyValue(stylesRib[173])};
                                    width: ${stylesRib.getPropertyValue(stylesRib[340])};
                                }
                            </style>
                        </head>
                        <body>
                            <div class="button-container">
                                <button class="reportButtons" onclick="window.print(); window.close();">Print</button>
                            </div>
                            <div class="preview-container">
                            <h1>PREVIEW</h1>
                            </div>
                            ${content}
                            <br/>
                    </body>
                    </html>
                `);

                printWindow.document.close();
            }
        } catch (error) {
            console.error('Error preparing the print report:', error);
        } finally {
            this.isExporting = false;
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

    public createCaseItem(caseID: string): void {
        const caseItem = new CaseItem(caseID);
        caseItem.renderCase();
        this.sidebarCaseItems.push(caseItem);
    }

    public makeActiveCase(id: string): void {
        const dc = DataController.getInstance();
        dc.makeActiveCase(dc.findCaseIndex(id));
    }

    public deleteCaseItem(caseID: string): void {
        for (var i = 0; i < this.sidebarCaseItems.length; i++) {
            const item = this.sidebarCaseItems[i];
            if (item.id == caseID) {
                const dc = DataController.getInstance();
                dc.deleteCase(dc.findCaseIndex(caseID));
                this.sidebarCaseItems.splice(i, 1);
                this.renderCases();
                return;
            }
        }
    }

    private renderCases(): void {
        const list = document.getElementById('caseList') as HTMLElement;
        list.innerHTML = '';

        if (this.sidebarCaseItems.length == 0)
            list.innerHTML = 'No cases loaded'; //TODO: update to look better
        else
            this.sidebarCaseItems.forEach((item) => {
                item.renderCase();
            });
    }
}
