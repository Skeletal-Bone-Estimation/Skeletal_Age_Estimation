//started updating Feb 16
//finished updating: 
//initially didnt pass on feb 16th:
//navigateTo now takes 2 args instead of 1

import { HomePageView } from '../../../src/views/HomePageView';
import { PageController } from '../../../src/controllers/PageController';
import { Pages, SideBar } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController', () => ({
    PageController: {
        getInstance: jest.fn(),
    },
}));

describe('HomePageView', () => {
    let homePageView: HomePageView;
    let pageControllerMock: jest.Mocked<PageController>;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="rootDiv"></div> <!-- This should match AbstractView's expected structure -->
            <button id="homeCreate"></button>
            <button id="homeLoad"></button>
            <input id="loadCase" type="file" style="display:none" />
        `;

        // Mock PageController methods
        pageControllerMock = {
            navigateTo: jest.fn(),
        } as unknown as jest.Mocked<PageController>;

        (PageController.getInstance as jest.Mock).mockReturnValue(pageControllerMock);

        // Initialize HomePageView
        homePageView = new HomePageView(document);
    });

    describe('render method', () => {
        it('should inject HTML content into the content div', () => {
            const htmlContent = '<div>Home Page Content</div>';
            homePageView.render(htmlContent);
            expect(homePageView.contentDiv.innerHTML).toBe(htmlContent); // ✅ Corrected
        });

        it('should navigate to the Create page when "homeCreate" button is clicked', () => {
            const htmlContent = '<div>Home Page Content</div>';
            homePageView.render(htmlContent);

            const homeCreateButton = document.getElementById('homeCreate') as HTMLElement;
            homeCreateButton.click();

            // ✅ Updated to check for both arguments
            expect(pageControllerMock.navigateTo).toHaveBeenCalledWith(
                Pages.Create,
                SideBar.createBar,
            );
        });

        it('should trigger a click on "loadCase" input when "homeLoad" button is clicked', () => {
            const htmlContent = '<div>Home Page Content</div>';
            homePageView.render(htmlContent);

            const loadCaseInput = document.getElementById('loadCase') as HTMLElement;
            jest.spyOn(loadCaseInput, 'click');

            const homeLoadButton = document.getElementById('homeLoad') as HTMLElement;
            homeLoadButton.click();

            expect(loadCaseInput.click).toHaveBeenCalled();
        });
    });
});
