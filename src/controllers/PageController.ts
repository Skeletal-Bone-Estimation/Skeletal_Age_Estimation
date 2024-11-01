import { resolve } from "path";
import { AbstractView } from "../views/AbstractView";
import { ViewProxy } from "../views/ViewProxy";

//PageController.ts
export class PageController {
    private static instance : PageController;
    private static document: Document;
    private viewProxy : ViewProxy;
    private views : {[key: string ]: AbstractView};
    private currentPage : AbstractView | undefined;

    private constructor(document: Document) {
        this.viewProxy = ViewProxy.getInstance(document);
        this.views = this.viewProxy.getViews();
        this.currentPage = this.viewProxy.getCurrentPage();
    }

    public initialize() : void {
        console.log("Initialized");
    }

    public async loadCurrentPage() : Promise<void> {
        await this.waitUntilReady(this.viewProxy);
        if (this.currentPage) this.currentPage.render()
        else console.warn('page undefined')
    }

    static getInstance(document: Document = PageController.document) : PageController {
        if (!this.instance) this.instance = new PageController(document);
        return this.instance;
    }

    private async waitUntilReady(view : AbstractView) : Promise<void> {
        return new Promise<void>((resolve) => {
            const checkInterval = setInterval(() => {
                if (this.viewProxy.pagesReady()) {
                    clearInterval(checkInterval); // stop check
                    resolve(); // resolve promise
                }
            }, 100) //check every 100ms
        })
    }
}