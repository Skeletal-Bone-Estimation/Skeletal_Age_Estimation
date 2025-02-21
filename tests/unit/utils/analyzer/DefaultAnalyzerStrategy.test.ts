import { DefaultAnalyzerStrategy } from '../../../../src/utils/analyzer/DefaultAnalyzerStrategy'; // Adjust path as needed
import { CaseModel } from '../../../../src/models/CaseModel'; // Adjust path as needed
import {
    Affinity,
    AuricularArea,
    PubicSymphysis,
    Sex,
    SternalEnd,
    ThirdMolar,
    Report,
    Side,
    Observers,
} from '../../../../src/utils/enums'; // Adjust path as needed
import { NullCaseModel } from '../../../../src/models/NullCaseModel';
import { NullReportModel } from '../../../../src/models/NullReportModel';
import { AbstractCaseModel } from '../../../../src/models/AbstractCaseModel';
import { DataController } from '../../../../src/controllers/DataController';
import { AutosaveObserver } from '../../../../src/utils/observer/AutosaveObserver';

describe('DefaultAnalyzerStrategy', () => {
    let analyzer: DefaultAnalyzerStrategy;

    beforeEach(() => {
        analyzer = new DefaultAnalyzerStrategy(Sex.Male, Affinity.Black); // You can adjust sex and affinity for different tests
    });

    it('should analyze pubic symphysis correctly', () => {
        const defaultCase = new CaseModel(
            'testCase', // caseID
            Affinity.Black, // populationAffinity
            Sex.Male, // sex
            ThirdMolar.A, ThirdMolar.B, ThirdMolar.C, ThirdMolar.D, // Third Molar values
            PubicSymphysis.One, PubicSymphysis.Two, // Pubic Symphysis values
            AuricularArea.One, AuricularArea.One,
            SternalEnd.One, SternalEnd.One, // Auricular Area values
            "Test Notes", [] // Notes
        );

        const results = analyzer.executeAnalysis(defaultCase);

        expect(results[Report.pubicSymphysis][Side.L]).toBe(19.29); // Example value, adjust as needed
        expect(results[Report.pubicSymphysis][Side.R]).toBe(22.14);
        expect(results[Report.pubicSymphysis][Side.C]).toBe(22.14); // Combined should take the higher value in this case

    });


    it('should analyze sternal end correctly', () => {
        const defaultCase = new CaseModel(
            'testCase', // caseID
            Affinity.Black, // populationAffinity
            Sex.Male, // sex
            ThirdMolar.A, ThirdMolar.B, ThirdMolar.C, ThirdMolar.D, // Third Molar values
            PubicSymphysis.One, PubicSymphysis.Two, // Pubic Symphysis values
            AuricularArea.One, AuricularArea.One,
            SternalEnd.One, SternalEnd.One, // Auricular Area values
            "Test Notes", [] // Notes
        );
        const results = analyzer.executeAnalysis(defaultCase);
        expect(results[Report.sternalEnd][Side.L]).toBe(20);
        expect(results[Report.sternalEnd][Side.R]).toBe(20);
        expect(results[Report.sternalEnd][Side.C]).toBeCloseTo(20); // Combined, using toBeCloseTo for floating point

    });

    it('should analyze auricular surface correctly', () => {
        const defaultCase = new CaseModel(
            'testCase', // caseID
            Affinity.Black, // populationAffinity
            Sex.Male, // sex
            ThirdMolar.A, ThirdMolar.B, ThirdMolar.C, ThirdMolar.D, // Third Molar values
            PubicSymphysis.One, PubicSymphysis.Two, // Pubic Symphysis values
            AuricularArea.One, AuricularArea.One,
            SternalEnd.One, SternalEnd.One, // Auricular Area values
            "Test Notes", [] // Notes
        );
        const results = analyzer.executeAnalysis(defaultCase);

        expect(results[Report.auricularSurface][Side.L]).toBe(21.1);
        expect(results[Report.auricularSurface][Side.R]).toBe(21.1);
        expect(results[Report.auricularSurface][Side.C]).toBeCloseTo(21.1); // Combined

    });

    it('should analyze third molar correctly', () => {
        const defaultCase = new CaseModel(
            'testCase', // caseID
            Affinity.Black, // populationAffinity
            Sex.Male, // sex
            ThirdMolar.A, ThirdMolar.A, ThirdMolar.A, ThirdMolar.A, // Third Molar values
            PubicSymphysis.One, PubicSymphysis.Two, // Pubic Symphysis values
            AuricularArea.One, AuricularArea.One,
            SternalEnd.One, SternalEnd.One, // Auricular Area values
            "Test Notes", [] // Notes
        );
        const results = analyzer.executeAnalysis(defaultCase);

        expect(results[Report.thirdMolar][Side.TL]).toBe(ThirdMolar.A);
        expect(results[Report.thirdMolar][Side.TR]).toBe(ThirdMolar.A);
        expect(results[Report.thirdMolar][Side.BL]).toBe(ThirdMolar.A);
        expect(results[Report.thirdMolar][Side.BR]).toBe(ThirdMolar.A);
        // Add assertions for thirdMolarMajority results as needed.
    });

    it('should handle unknown sex correctly', () => {
        analyzer = new DefaultAnalyzerStrategy(Sex.Unknown, Affinity.Black);
        const defaultCase = new CaseModel(
            'testCase', // caseID
            Affinity.Black, // populationAffinity
            Sex.Male, // sex
            ThirdMolar.A, ThirdMolar.B, ThirdMolar.C, ThirdMolar.D, // Third Molar values
            PubicSymphysis.One, PubicSymphysis.Two, // Pubic Symphysis values
            AuricularArea.One, AuricularArea.One,
            SternalEnd.One, SternalEnd.One, // Auricular Area values
            "Test Notes", [] // Notes
        );
        const results = analyzer.executeAnalysis(defaultCase);
        expect(results[Report.pubicSymphysis][Side.L]).toBeCloseTo(19.545); //Check if average is used.
    });


    // ... Add more tests to cover edge cases, invalid inputs, etc.
});