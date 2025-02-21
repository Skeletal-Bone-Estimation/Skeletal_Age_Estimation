import { ReportModel } from '../../../src/models/ReportModel';
import { Side } from '../../../src/utils/enums';

describe('ReportModel', () => {
    let report: ReportModel;

    beforeEach(() => {
        const results = {
            pubicSymphysis: {
                L: 1,
                R: 2,
                C: 3,
                L_min: 0.5,
                L_max: 1.5,
                R_min: 1.5,
                R_max: 2.5,
                C_min: 2,
                C_max: 3.5,
            },
            sternalEnd: {
                L: 4,
                R: 5,
                C: 6,
                L_min: 3.5,
                L_max: 4.5,
                R_min: 4.5,
                R_max: 5.5,
                C_min: 5,
                C_max: 6.5,
            },
            auricularSurface: {
                L: 7,
                R: 8,
                C: 9,
                L_min: 6.5,
                L_max: 7.5,
                R_min: 7.5,
                R_max: 8.5,
                C_min: 8,
                C_max: 9.5,
            },
            thirdMolar: {
                TL: 10,
                TR: 11,
                BL: 12,
                BR: 13,
                C: 14,
            },
        };

        report = new ReportModel('1', results);
    });

    describe('getPubicSymphysis', () => {
        it('should return the correct value for the left side', () => {
            expect(report.getPubicSymphysis(Side.L)).toBe(1);
        });

        it('should return the correct value for the right side', () => {
            expect(report.getPubicSymphysis(Side.R)).toBe(2);
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getPubicSymphysis('Invalid' as any)).toThrowError(
                'Invalid side for pubic symphysis analysis',
            );
        });
    });

    describe('getPubicSymphysisRange', () => {
        it('should return the correct range for the left side', () => {
            expect(report.getPubicSymphysisRange(Side.L)).toEqual({ min: 0.5, max: 1.5 });
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getPubicSymphysisRange('Invalid' as any)).toThrowError(
                'Invalid side for pubic symphysis analysis',
            );
        });
    });

    describe('getSternalEnd', () => {
        it('should return the correct value for the left side', () => {
            expect(report.getSternalEnd(Side.L)).toBe(4);
        });

        it('should return the correct value for the right side', () => {
            expect(report.getSternalEnd(Side.R)).toBe(5);
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getSternalEnd('Invalid' as any)).toThrowError(
                'Invalid side for sternal end analysis',
            );
        });
    });

    describe('getSternalEndRange', () => {
        it('should return the correct range for the left side', () => {
            expect(report.getSternalEndRange(Side.L)).toEqual({ min: 3.5, max: 4.5 });
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getSternalEndRange('Invalid' as any)).toThrowError(
                'Invalid side for sternal end analysis',
            );
        });
    });

    describe('getAuricularSurface', () => {
        it('should return the correct value for the left side', () => {
            expect(report.getAuricularSurface(Side.L)).toBe(7);
        });

        it('should return the correct value for the right side', () => {
            expect(report.getAuricularSurface(Side.R)).toBe(8);
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getAuricularSurface('Invalid' as any)).toThrowError(
                'Invalid side for auricular surface analysis',
            );
        });
    });

    describe('getAuricularSurfaceRange', () => {
        it('should return the correct range for the left side', () => {
            expect(report.getAuricularSurfaceRange(Side.L)).toEqual({ min: 6.5, max: 7.5 });
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getAuricularSurfaceRange('Invalid' as any)).toThrowError(
                'Invalid side for auricular surface analysis',
            );
        });
    });

    describe('getThirdMolar', () => {
        it('should return the correct value for the upper-left side', () => {
            expect(report.getThirdMolar(Side.TL)).toBe(10);
        });

        it('should return the correct value for the upper-right side', () => {
            expect(report.getThirdMolar(Side.TR)).toBe(11);
        });

        it('should return the correct value for the lower-left side', () => {
            expect(report.getThirdMolar(Side.BL)).toBe(12);
        });

        it('should return the correct value for the lower-right side', () => {
            expect(report.getThirdMolar(Side.BR)).toBe(13);
        });

        it('should return the correct value for the central side', () => {
            expect(report.getThirdMolar(Side.C)).toBe(14);
        });

        it('should throw an error for invalid side', () => {
            expect(() => report.getThirdMolar('Invalid' as any)).toThrowError(
                'Invalid side for third molar analysis',
            );
        });
    });

    describe('validateSide', () => {
        it('should throw an error for invalid side when validating pubic symphysis', () => {
            expect(() =>
                report['validateSide']('Invalid' as any, ['L', 'R', 'C'], 'pubic symphysis'),
            ).toThrowError('Invalid side for pubic symphysis analysis: Invalid');
        });

        it('should throw an error for invalid side when validating sternal end', () => {
            expect(() =>
                report['validateSide']('Invalid' as any, ['L', 'R', 'C'], 'sternal end'),
            ).toThrowError('Invalid side for sternal end analysis: Invalid');
        });

        it('should throw an error for invalid side when validating auricular surface', () => {
            expect(() =>
                report['validateSide']('Invalid' as any, ['L', 'R', 'C'], 'auricular surface'),
            ).toThrowError('Invalid side for auricular surface analysis: Invalid');
        });
    });
});
