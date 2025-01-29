import { Side } from '../utils/enums';

export abstract class AbstractReportModel {
    protected _id: string;
    protected results: { [key: string]: { [key: string]: number } };

    constructor(
        id: string,
        results: { [key: string]: { [key: string]: number } },
    ) {
        this._id = id;
        this.results = results;
    }

    public get id() {
        return this._id;
    }

    public abstract getPubicSymphysis(side: Side): number;
    public abstract getAuricularSurface(side: Side): number;
    public abstract getSternalEnd(side: Side): number;
    public abstract getPubicSymphysisRange(side: Side): {
        min: number;
        max: number;
    };
    public abstract getAuricularSurfaceRange(side: Side): {
        min: number;
        max: number;
    };
    public abstract getSternalEndRange(side: Side): {
        min: number;
        max: number;
    };
}
