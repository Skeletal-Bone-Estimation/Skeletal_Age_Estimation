import { Side } from '../utils/enums';
import { AbstractReportModel } from './AbstractReportModel';

//ReportModel.ts
export class ReportModel extends AbstractReportModel {
    constructor(id: string, results: {}) {
        super(id, results);
    }

    // Read-only access to Report Data
    public get id() {
        return this._id;
    }

    public getPubicSymphysis(side: Side): number {
        if (side != Side.L && side != Side.R && side != Side.C)
            throw new Error('Invalid side for pubic symphysis analysis');
        return this.results['pubicSymphysis'][side];
    }

    public getPubicSymphysisRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'pubic symphysis');
        return {
            min: this.results['pubicSymphysis'][`${side}_min`],
            max: this.results['pubicSymphysis'][`${side}_max`],
        };
    }

    public getSternalEnd(side: Side): number {
        if (side != Side.L && side != Side.R && side != Side.C)
            throw new Error('Invalid side for sternal end analysis');
        return this.results['sternalEnd'][side];
    }

    public getSternalEndRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'sternal end');
        return {
            min: this.results['sternalEnd'][`${side}_min`],
            max: this.results['sternalEnd'][`${side}_max`],
        };
    }

    public getAuricularSurface(side: Side): number {
        if (side != Side.L && side != Side.R && side != Side.C)
            throw new Error('Invalid side for auricular surface analysis');
        return this.results['auricularSurface'][side];
    }

    public getAuricularSurfaceRange(side: Side): { min: number; max: number } {
        this.validateSide(side, ['L', 'R', 'C'], 'auricular surface');
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
