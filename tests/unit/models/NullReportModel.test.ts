import { NullReportModel } from '../../../src/models/NullReportModel';
import { Side } from '../../../src/utils/enums';

describe('NullReportModel', () => {
    let nullReport: NullReportModel;

    beforeEach(() => {
        nullReport = new NullReportModel();
    });

    test('getPubicSymphysis should return -1', () => {
        expect(nullReport.getPubicSymphysis(Side.L)).toBe(-1);
        expect(nullReport.getPubicSymphysis(Side.R)).toBe(-1);
    });

    test('getAuricularSurface should return -1', () => {
        expect(nullReport.getAuricularSurface(Side.L)).toBe(-1);
        expect(nullReport.getAuricularSurface(Side.R)).toBe(-1);
    });

    test('getSternalEnd should return -1', () => {
        expect(nullReport.getSternalEnd(Side.L)).toBe(-1);
        expect(nullReport.getSternalEnd(Side.R)).toBe(-1);
    });

    test('getPubicSymphysisRange should return { min: -1, max: -1 }', () => {
        expect(nullReport.getPubicSymphysisRange(Side.L)).toEqual({ min: -1, max: -1 });
        expect(nullReport.getPubicSymphysisRange(Side.R)).toEqual({ min: -1, max: -1 });
    });

    test('getAuricularSurfaceRange should return { min: -1, max: -1 }', () => {
        expect(nullReport.getAuricularSurfaceRange(Side.L)).toEqual({ min: -1, max: -1 });
        expect(nullReport.getAuricularSurfaceRange(Side.R)).toEqual({ min: -1, max: -1 });
    });

    test('getSternalEndRange should return { min: -1, max: -1 }', () => {
        expect(nullReport.getSternalEndRange(Side.L)).toEqual({ min: -1, max: -1 });
        expect(nullReport.getSternalEndRange(Side.R)).toEqual({ min: -1, max: -1 });
    });
});
