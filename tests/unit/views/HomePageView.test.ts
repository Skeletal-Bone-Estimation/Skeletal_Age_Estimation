import { HomePageView } from '../../../src/views/HomePageView';
import { PageController } from '../../../src/controllers/PageController';
import { Pages, SideBar } from '../../../src/utils/enums';

jest.mock('../../../src/controllers/PageController');

describe('HomePageView', () => {
    let homePageView: HomePageView;
    let mockDocument: Document;
    let mockPageController: jest.Mocked<PageController>;

    beforeEach(() => {
        // Clear the DOM to start fresh for each test
        document.body.innerHTML = '';
    
        // Add the required rootDiv
        const rootDiv = document.createElement('div');
        rootDiv.id = 'rootDiv';
        document.body.appendChild(rootDiv);
    
        // Add required elements for event listeners
        const homeCreateButton = document.createElement('button');
        homeCreateButton.id = 'homeCreate';
        document.body.appendChild(homeCreateButton);
    
        const homeLoadButton = document.createElement('button');
        homeLoadButton.id = 'homeLoad';
        document.body.appendChild(homeLoadButton);
    
        const loadCaseInput = document.createElement('input');
        loadCaseInput.id = 'loadCase';
        document.body.appendChild(loadCaseInput);
    
        // Instantiate HomePageView
        homePageView = new HomePageView(document); // Use global document
    
        // Mock PageController
        mockPageController = {
            navigateTo: jest.fn(),
        } as unknown as jest.Mocked<PageController>;
    
        (PageController.getInstance as jest.Mock).mockReturnValue(mockPageController);
    });


    describe('render', () => {
        it('should render HTML content and initialize event listeners', () => {
            const htmlContent = '<p>Test Home Page Content</p>';

            // Call render method
            homePageView.render(htmlContent);

            // Assert content is rendered
            expect(homePageView.contentDiv.innerHTML).toBe(htmlContent);

            // Simulate button click
            const homeCreateButton = document.getElementById('homeCreate')!;
            homeCreateButton.click();

            // Verify the navigation function is called
            expect(mockPageController.navigateTo).toHaveBeenCalledWith(
                Pages.Create,
                SideBar.createBar,
            );
        });
    });

    describe('initEventListeners', () => {
        it('should initialize the homeCreate click event', () => {
            const homeCreateButton = document.getElementById('homeCreate')!;

            // Call render to attach event listeners
            homePageView.render('');

            // Simulate click event on the homeCreate button
            homeCreateButton.click();

            // Assert PageController.navigateTo was called
            expect(mockPageController.navigateTo).toHaveBeenCalledWith(
                Pages.Create,
                SideBar.createBar,
            );
        });

        it('should initialize the homeLoad click event', () => {
            const homeLoadButton = document.getElementById('homeLoad')!;
            const loadCaseInput = document.getElementById('loadCase')!;

            // Spy on click method
            const clickSpy = jest.spyOn(loadCaseInput, 'click');

            // Call render to attach event listeners
            homePageView.render('');

            // Simulate click event on the homeLoad button
            homeLoadButton.click();

            // Assert loadCase input was triggered
            expect(clickSpy).toHaveBeenCalled();
        });
    });
});
