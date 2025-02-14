import { Side } from '../utils/enums';

export abstract class AbstractReportModel {
    protected _id: string;
    public results: { [key: string]: { [key: string]: number } };

    constructor(
        id: string,
        results: { [key: string]: { [key: string]: number } },
    ) {
        this._id = id;
        this.results = results;
    }

    /**
     * Gets the report ID.
     * @returns The report ID.
     */
    public get id() {
        return this._id;
    }

    /**
     * Abstract method to get the pubic symphysis value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The pubic symphysis value.
     */
    public abstract getPubicSymphysis(side: Side): number;

    /**
     * Abstract method to get the auricular surface value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The auricular surface value.
     */
    public abstract getAuricularSurface(side: Side): number;

    /**
     * Abstract method to get the sternal end value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The sternal end value.
     */
    public abstract getSternalEnd(side: Side): number;

    /**
     * Abstract method to get the pubic symphysis range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns An object with min and max values.
     */
    public abstract getPubicSymphysisRange(side: Side): {
        min: number;
        max: number;
    };

    /**
     * Abstract method to get the auricular surface range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns An object with min and max values.
     */
    public abstract getAuricularSurfaceRange(side: Side): {
        min: number;
        max: number;
    };

    /**
     * Abstract method to get the sternal end range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns An object with min and max values.
     */
    public abstract getSternalEndRange(side: Side): {
        min: number;
        max: number;
    };
}
