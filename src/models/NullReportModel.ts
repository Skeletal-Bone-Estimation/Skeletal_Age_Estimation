import { Side } from '../utils/enums';
import { AbstractReportModel } from './AbstractReportModel';

export class NullReportModel extends AbstractReportModel {
    constructor() {
        super('null', {});
    }

    public getPubicSymphysis(side: Side): number {
        return -1;
    }
    public getAuricularSurface(side: Side): number {
        return -1;
    }
    public getSternalEnd(side: Side): number {
        return -1;
    }
    public getPubicSymphysisRange(side: Side): { min: number; max: number } {
        return { min: -1, max: -1 };
    }
    public getAuricularSurfaceRange(side: Side): { min: number; max: number } {
        return { min: -1, max: -1 };
    }
    public getSternalEndRange(side: Side): { min: number; max: number } {
        return { min: -1, max: -1 };
    }
}
