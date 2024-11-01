import { PageController } from "./PageController";

//SystemController.ts
export class SystemController {
    private static instance: SystemController;
    private pageController : PageController = PageController.getInstance();

    private constructor() {};

    public static getInstance() : SystemController {
        if (!this.instance) this.instance = new SystemController();
        return this.instance;
    }

    public async initialize() : Promise<void> {
        await this.pageController.loadCurrentPage();
    }
}