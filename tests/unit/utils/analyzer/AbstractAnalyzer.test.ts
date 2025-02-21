import { AbstractAnalyzer } from '../../../../src/utils/analyzer/AbstractAnalyzer';
import { Sex, Affinity } from '../../../../src/utils/enums';
import { CaseModel } from '../../../../src/models/CaseModel';

// Create a concrete subclass to test the abstract class
class TestAnalyzer extends AbstractAnalyzer {
    public executeAnalysis(_case: CaseModel): {} {
        return { result: 'Test analysis result' };
    }
}


describe('AbstractAnalyzer', () => {
    let analyzer: TestAnalyzer;

    beforeEach(() => {
        analyzer = new TestAnalyzer(Sex.Male, Affinity.White);
    });

    describe('constructor', () => {
        it('should initialize with given sex and affinity values', () => {
            expect(analyzer).toBeInstanceOf(TestAnalyzer);
            expect(analyzer['sex']).toBe(Sex.Male); // private property access
            expect(analyzer['affinity']).toBe(Affinity.White); // private property access
        });
    });

    describe('modifySex', () => {
        it('should modify the sex value', () => {
            analyzer.modifySex(Sex.Female);
            expect(analyzer['sex']).toBe(Sex.Female); // verify the change
        });
    });

    describe('modifyAffinity', () => {
        it('should modify the affinity value', () => {
            analyzer.modifyAffinity(Affinity.Black);
            expect(analyzer['affinity']).toBe(Affinity.Black); // verify the change
        });
    });

    describe('executeAnalysis', () => {
        it('should return expected analysis result', () => {
            const mockCase = new CaseModel('test', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'notes', []); // You may need to mock the CaseModel depending on its structure
            const result = analyzer.executeAnalysis(mockCase);
            expect(result).toEqual({ result: 'Test analysis result' });
        });
    });
});
