//ReportBuilder tests - started 2/12 - finished 2/12
import { ReportBuilder } from '../../../../src/utils/builder/ReportBuilder';
import { NullReportModel } from '../../../../src/models/NullReportModel';
import { ReportModel } from '../../../../src/models/ReportModel';
import { Autonumberer } from '../../../../src/utils/Autonumberer';

//
jest.mock('../../../../src/utils/Autonumberer', () => ({
    Autonumberer: {
        getInstance: jest.fn(() => ({
            generateNext: jest.fn(() => 'test-id'),
        })),
    },
}));

describe('ReportBuilder', () => {
    let builder: ReportBuilder;

    beforeEach(() => {
        builder = new ReportBuilder();
    });

    describe('build()', () => {
        test('returns NullReportModel when content is null', () => {
            const report = builder.build(null as unknown as {});
            expect(report).toBeInstanceOf(NullReportModel);
        });

        test('returns ReportModel with results when content is provided', () => {
            const results = { key: { nestedKey: 42 } };
            const report = builder.build(results);
            expect(report).toBeInstanceOf(ReportModel);
            expect((report as any).results).toEqual(results); 
            expect(report.id).toBe('test-id'); 
        });
    });

    describe('buildFrom()', () => {
        test('returns a ReportModel with extracted XML data', () => {
            const mockXml = document.createElement('Results');
            const mockChild = document.createElement('L');
            mockChild.textContent = '5';
            mockXml.appendChild(mockChild);

            const report = builder.buildFrom('xml-test-id', mockXml);
            expect(report).toBeInstanceOf(ReportModel);
            expect(report.id).toBe('xml-test-id');
            expect((report as any).results.pubicSymphysis.L).toBe(5); 
        });
    });

    describe('buildResultDictionary()', () => {
        test('assigns default value when XML element is missing', () => {
            const mockXml = document.createElement('Results');
            const result = builder.buildResultDictionary(mockXml);
            expect(result.pubicSymphysis.L).toBe(-1);
        });
    });
});
