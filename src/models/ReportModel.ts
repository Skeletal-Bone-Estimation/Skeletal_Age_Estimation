import { Side } from '../utils/enums';

//ReportModel.ts
export class ReportModel {
    private _id: string;

    private results: { [key: string]: { [key: string]: number } };

    constructor(id: string, results: {}) {
        this._id = id;
        this.results = results;
    }

    // Read-only access to Report Data
    public get id() {
        return this._id;
    }

    public getPubicSymphysis(side: Side): number {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for pubic symphysis analysis');
        return this.results['pubicSymphysis'][side];
    }

    public getPubicSymphysisRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R'], 'pubic symphysis');
        return {
            min: this.results['pubicSymphysis'][`${side}_min`],
            max: this.results['pubicSymphysis'][`${side}_max`],
        };
    }

    public getSternalEnd(side: Side): number {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for sternal end analysis');
        return this.results['sternalEnd'][side];
    }

    public getSternalEndRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R'], 'sternal end');
        return {
            min: this.results['sternalEnd'][`${side}_min`],
            max: this.results['sternalEnd'][`${side}_max`],
        };
    }

    public getAuricularSurface(side: Side): number {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for auricular surface analysis');
        return this.results['auricularSurface'][side];
    }

    public getAuricularSurfaceRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R'], 'auricular surface');
        return {
            min: this.results['auricularSurface'][`${side}_min`],
            max: this.results['auricularSurface'][`${side}_max`],
        };
    }

    public getThirdMolar(side: Side): number {
        if (
            side != Side.TL &&
            side != Side.TR &&
            side != Side.BL &&
            side != Side.BR
        )
            throw new Error('Invalid side for third molar analysis');
        return this.results['thirdMolar'][side];
    }

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
