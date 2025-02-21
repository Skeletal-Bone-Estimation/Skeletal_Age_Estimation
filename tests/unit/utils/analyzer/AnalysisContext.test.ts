import { AnalysisContext } from "../../../../src/utils/analyzer/AnalysisContext";
import { DefaultAnalyzerStrategy } from "../../../../src/utils/analyzer/DefaultAnalyzerStrategy";
import { ImageAnalyzerStrategy } from "../../../../src/utils/analyzer/ImageAnalyzerStrategy";
import { PredictionAnalyzerStrategy } from "../../../../src/utils/analyzer/PredictionAnalyzerStrategy";
import { Analyzers, Sex, Affinity, Observers } from "../../../../src/utils/enums";
import { CaseModel } from "../../../../src/models/CaseModel";
import { DataController } from "../../../../src/controllers/DataController";
import { Autonumberer } from "../../../../src/utils/Autonumberer";
import { ReportModal } from "../../../../src/views/ReportModal";

jest.mock("../../../../src/utils/analyzer/DefaultAnalyzerStrategy");
jest.mock("../../../../src/utils/analyzer/ImageAnalyzerStrategy");
jest.mock("../../../../src/utils/analyzer/PredictionAnalyzerStrategy");
jest.mock("../../../../src/controllers/DataController");
jest.mock("../../../../src/utils/Autonumberer");

describe('AnalysisContext', () => {
    let analysisContext: AnalysisContext;
    let mockCase: CaseModel;

    beforeEach(() => {
        // Mocking dependencies for each test
        mockCase = {
            sex: Sex.Male,
            populationAffinity: Affinity.White,
            addReport: jest.fn(),
            notify: jest.fn(),
        } as any;

        // Reset singleton instance before each test
        (AnalysisContext as any).instance = null;

        // Create the AnalysisContext instance
        analysisContext = AnalysisContext.getInstance(Sex.Male, Affinity.White);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create only one instance of AnalysisContext', () => {
        const firstInstance = AnalysisContext.getInstance(Sex.Male, Affinity.White);
        const secondInstance = AnalysisContext.getInstance(Sex.Male, Affinity.White);

        // Expect the same instance to be returned
        expect(firstInstance).toBe(secondInstance);
    });

    test('should set the current strategy to Default on initialization', () => {
        const strategy = (analysisContext as any).currentStrategy;

        // Check if the default strategy is set correctly
        expect(strategy).toBeInstanceOf(DefaultAnalyzerStrategy);
    });

    test('should switch to a different strategy', () => {
        // Change strategy to image analysis
        analysisContext.setStrategy(Analyzers.Default);
        const strategy = (analysisContext as any).currentStrategy;

        expect(strategy).toBeInstanceOf(DefaultAnalyzerStrategy);
    });


    test('should update sex and affinity when changing strategy', () => {
        const modifySex = jest.spyOn(DefaultAnalyzerStrategy.prototype, 'modifySex');
        const modifyAffinity = jest.spyOn(DefaultAnalyzerStrategy.prototype, 'modifyAffinity');
        
        // Change sex and affinity
        analysisContext.setSex(Sex.Female);
        analysisContext.setAffinity(Affinity.White);

        // Ensure modifySex and modifyAffinity are called
        expect(modifySex).toHaveBeenCalledWith(Sex.Female);
        expect(modifyAffinity).toHaveBeenCalledWith(Affinity.White);
    });

    test('should allow switching between different strategies', () => {
        // Switch to image analysis
        analysisContext.setStrategy(Analyzers.Image);
        expect((analysisContext as any).currentStrategy).toBeInstanceOf(ImageAnalyzerStrategy);

        // Switch to prediction analysis
        analysisContext.setStrategy(Analyzers.Prediction);
        expect((analysisContext as any).currentStrategy).toBeInstanceOf(PredictionAnalyzerStrategy);
    });
});