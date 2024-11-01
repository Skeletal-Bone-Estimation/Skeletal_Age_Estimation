import { AbstractView } from "./AbstractView";
import { HomePageView } from "./HomePageView";

var homePagePath = '../templates/HomePage.html';

export enum Pages {
    Home = 'home',
    CreateCase = 'create',
    LoadCase = 'load',
    DataEntry = 'entry',
    ViewReport = 'view',
    CompareReport = 'compare'
}

//uses anonymous view class to dynamically instantiate classes later on
const pageMap = new Map<string, {ViewClass : new (content : string, path: string, document: Document) => AbstractView, path : string}>([
    [Pages.Home, {ViewClass : HomePageView, path: './templates/HomePage.html'}]
])

export class ViewProxy extends AbstractView {

    private static instance : ViewProxy;
    private pages: { [key: string]: AbstractView } = {};
    private currentPage : AbstractView | undefined;
    private pagesLoaded : boolean = false;

    private constructor(document: Document) {
        super('', '', document);
        this.currentPage = undefined;
    }

    public async loadPages(document: Document) : Promise<void> {
        for (const [key, {ViewClass, path}] of pageMap.entries()) {
            try {
                if(path) {
                    const res : Response = await fetch(path);
                    if (!res.ok) throw new Error(`Failed to fetch content for ${key}: ${res.statusText}`);
                    const content = await res.text();
                    this.pages[key] = new ViewClass(content, path, document);
                }
                else console.warn(`No URL provided for ${key}`);
            }
            catch (error) { console.error(`Error loading content for ${key}:`, error); }
        }

        this.pagesLoaded = true;
        this.currentPage = (this.pages[Pages.Home]) ? this.pages[Pages.Home] : undefined;
    }

    public getViews() : {[key: string]: AbstractView}{
        return this.pages;
    }

    //TODO: Replace will null page object
    public getCurrentPage(): AbstractView | undefined {
        return this.currentPage;
    }

    public static getInstance(document: Document): ViewProxy{
        if (!this.instance) {
            this.instance = new ViewProxy(document);
            this.instance.loadPages(document)
        }
        return this.instance;
    }

    public pagesReady() : boolean {
        return this.pagesLoaded;
    }

    override render(): void {
        throw new Error("Method not implemented.");
    }
}