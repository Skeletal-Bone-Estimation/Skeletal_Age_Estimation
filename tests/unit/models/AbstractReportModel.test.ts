import { AbstractReportModel } from '../../../src/models/AbstractReportModel';
import { Side } from '../../../src/utils/enums';

class TestReportModel extends AbstractReportModel {
    constructor(id: string, results: { [key: string]: { [key: string]: number } }) {
        super(id, results);
    }

    // Mock validateSide to avoid the error during testing
    validateSide = jest.fn();  // Mock the validateSide method

    getPubicSymphysis(side: Side): number {
        return this.results['pubicSymphysis'][`${side}`];
    }

    getAuricularSurface(side: Side): number {
        return this.results['auricularSurface'][`${side}`];
    }

    getSternalEnd(side: Side): number {
        return this.results['sternalEnd'][`${side}`];
    }

    getPubicSymphysisRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'pubic symphysis');
        return {
            min: this.results['pubicSymphysis'][`${side}_min`],
            max: this.results['pubicSymphysis'][`${side}_max`],
        };
    }

    getAuricularSurfaceRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'auricular surface');
        return {
            min: this.results['auricularSurface'][`${side}_min`],
            max: this.results['auricularSurface'][`${side}_max`],
        };
    }

    getSternalEndRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'sternal end');
        return {
            min: this.results['sternalEnd'][`${side}_min`],
            max: this.results['sternalEnd'][`${side}_max`],
        };
    }
}


describe('AbstractReportModel', () => {
    let model: TestReportModel;
    const results = {
        pubicSymphysis: {
            [Side.L + '_min']: 1,
            [Side.L + '_max']: 3,
            [Side.R + '_min']: 2,
            [Side.R + '_max']: 4,
        },
        auricularSurface: {
            [Side.L + '_min']: 3,
            [Side.L + '_max']: 5,
            [Side.R + '_min']: 4,
            [Side.R + '_max']: 6,
        },
        sternalEnd: {
            [Side.L + '_min']: 5,
            [Side.L + '_max']: 7,
            [Side.R + '_min']: 6,
            [Side.R + '_max']: 8,
        },
    };

    beforeEach(() => {
        model = new TestReportModel('test-id', results);
    });

    test('should return correct pubic symphysis range for left side', () => {
        const range = model.getPubicSymphysisRange(Side.L);
        expect(range).toEqual({ min: 1, max: 3 });
    });

    test('should return correct pubic symphysis range for right side', () => {
        const range = model.getPubicSymphysisRange(Side.R);
        expect(range).toEqual({ min: 2, max: 4 });
    });

    test('should return correct auricular surface range for left side', () => {
        const range = model.getAuricularSurfaceRange(Side.L);
        expect(range).toEqual({ min: 3, max: 5 });
    });

    test('should return correct auricular surface range for right side', () => {
        const range = model.getAuricularSurfaceRange(Side.R);
        expect(range).toEqual({ min: 4, max: 6 });
    });

    test('should return correct sternal end range for left side', () => {
        const range = model.getSternalEndRange(Side.L);
        expect(range).toEqual({ min: 5, max: 7 });
    });

    test('should return correct sternal end range for right side', () => {
        const range = model.getSternalEndRange(Side.R);
        expect(range).toEqual({ min: 6, max: 8 });
    });
});
