import { Side } from '../utils/enums';
import { AbstractReportModel } from './AbstractReportModel';

export class ReportModel extends AbstractReportModel {
    constructor(
        id: string,
        results: { [key: string]: { [key: string]: number } },
    ) {
        super(id, results);
    }

    /**
     * Read-only access to Report ID.
     * @returns The report ID.
     */
    public get id() {
        return this._id;
    }

    /**
     * Retrieves the pubic symphysis value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The pubic symphysis value.
     */
    public getPubicSymphysis(side: Side): number {
        if (side != Side.L && side != Side.R && side != Side.C)
            throw new Error('Invalid side for pubic symphysis analysis');
        return this.results['pubicSymphysis'][side];
    }

    /**
     * Retrieves the pubic symphysis range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns The pubic symphysis range.
     */
    public getPubicSymphysisRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'pubic symphysis');
        return {
            min: this.results['pubicSymphysis'][`${side}_min`],
            max: this.results['pubicSymphysis'][`${side}_max`],
        };
    }

    /**
     * Retrieves the sternal end value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The sternal end value.
     */
    public getSternalEnd(side: Side): number {
        if (side != Side.L && side != Side.R && side != Side.C)
            throw new Error('Invalid side for sternal end analysis');
        return this.results['sternalEnd'][side];
    }

    /**
     * Retrieves the sternal end range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns The sternal end range.
     */
    public getSternalEndRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'sternal end');
        return {
            min: this.results['sternalEnd'][`${side}_min`],
            max: this.results['sternalEnd'][`${side}_max`],
        };
    }

    /**
     * Retrieves the auricular surface value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The auricular surface value.
     */
    public getAuricularSurface(side: Side): number {
        if (side != Side.L && side != Side.R && side != Side.C)
            throw new Error('Invalid side for auricular surface analysis');
        return this.results['auricularSurface'][side];
    }

    /**
     * Retrieves the auricular surface range for the specified side.
     * @param side The side to retrieve the range for.
     * @returns The auricular surface range.
     */
    public getAuricularSurfaceRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'auricular surface');
        return {
            min: this.results['auricularSurface'][`${side}_min`],
            max: this.results['auricularSurface'][`${side}_max`],
        };
    }

    /**
     * Retrieves the third molar value for the specified side.
     * @param side The side to retrieve the value for.
     * @returns The third molar value.
     */
    public getThirdMolar(side: Side): number {
        if (
            side != Side.TL &&
            side != Side.TR &&
            side != Side.BL &&
            side != Side.BR &&
            side != Side.C
        )
            throw new Error('Invalid side for third molar analysis');
        return this.results['thirdMolar'][side];
    }

    /**
     * Validates the side for the specified section.
     * @param side The side to validate.
     * @param validSides The valid sides for the section.
     * @param section The section being validated.
     */
    private validateSide(
        side: Side,
        validSides: string[],
        section: string,
    ): void {
        if (!validSides.includes(side)) {
            throw new Error(`Invalid side for ${section} analysis: ${side}`);
        }
    }
}
