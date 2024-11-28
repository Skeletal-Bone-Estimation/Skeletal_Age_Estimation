
import { HomePageView } from '../../../src/views/HomePageView';
import { PageController } from '../../../src/controllers/PageController';
import { Pages } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController', () => ({
    PageController: {
        getInstance: jest.fn(),
    },
}));

describe('HomePageView', () => {
    let homePageView: HomePageView;
    let pageControllerMock: jest.Mocked<PageController>;

    beforeEach(() => {
        // Mock the DOM with the element 'rootDiv' as expected by AbstractView
        document.body.innerHTML = `
            <div id="rootDiv"></div> <!-- Change to rootDiv -->
            <button id="homeCreate"></button>
            <button id="homeLoad"></button>
            <input id="loadCase" type="file" style="display:none" />
        `;

        // Mock the PageController instance
        pageControllerMock = {
            navigateTo: jest.fn(),
        } as unknown as jest.Mocked<PageController>;

        // Mock the getInstance method to return the mock PageController
        (PageController.getInstance as jest.Mock).mockReturnValue(pageControllerMock);

        // Initialize the HomePageView, passing the mock document
        homePageView = new HomePageView(document);
    });

    describe('render method', () => {
        it('should inject HTML content into the content div', () => {
            const htmlContent = '<div>Home Page Content</div>';
            homePageView.render(htmlContent);
            expect(document.getElementById('rootDiv')?.innerHTML).toBe(htmlContent); // Use rootDiv
        });

        it('should add a click listener to "homeCreate" button', () => {
            const htmlContent = '<div>Home Page Content</div>';
            homePageView.render(htmlContent);

            // Simulate a click event on the homeCreate button
            const homeCreateButton = document.getElementById('homeCreate') as HTMLElement;
            homeCreateButton.click();

            // Verify that navigateTo was called with the correct argument
            expect(pageControllerMock.navigateTo).toHaveBeenCalledWith(Pages.Create);
        });

        it('should add a click listener to "homeLoad" button that triggers a click on "loadCase"', () => {
            const htmlContent = '<div>Home Page Content</div>';
            homePageView.render(htmlContent);

            // Mock the "loadCase" element
            const loadCaseInput = document.getElementById('loadCase') as HTMLElement;
            jest.spyOn(loadCaseInput, 'click');

            // Simulate a click event on the homeLoad button
            const homeLoadButton = document.getElementById('homeLoad') as HTMLElement;
            homeLoadButton.click();

            // Verify that the click method on "loadCase" was called
            expect(loadCaseInput.click).toHaveBeenCalled();
        });
    });
});

