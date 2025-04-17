import { Side } from '../utils/enums';
import { AbstractReportModel } from './AbstractReportModel';

export class NullReportModel extends AbstractReportModel {
    constructor() {
        super('null', {});
    }

    /**
     * Retrieves the pubic symphysis value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns -1 as this is a null report.
     */
    public getPubicSymphysis(side: Side): number {
        return -1;
    }

    /**
     * Retrieves the auricular surface value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns -1 as this is a null report.
     */
    public getAuricularSurface(side: Side): number {
        return -1;
    }

    /**
     * Retrieves the sternal end value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns -1 as this is a null report.
     */
    public getSternalEnd(side: Side): number {
        return -1;
    }

    /**
     * Retrieves the pubic symphysis range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns An object with min and max set to -1 as this is a null report.
     */
    public getPubicSymphysisRange(side: Side): { min: number; max: number } {
        return { min: -1, max: -1 };
    }

    /**
     * Retrieves the auricular surface range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns An object with min and max set to -1 as this is a null report.
     */
    public getAuricularSurfaceRange(side: Side): { min: number; max: number } {
        return { min: -1, max: -1 };
    }

    /**
     * Retrieves the sternal end range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns An object with min and max set to -1 as this is a null report.
     */
    public getSternalEndRange(side: Side): { min: number; max: number } {
        return { min: -1, max: -1 };
    }
}
