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

    public getSternalEnd(side: Side): number {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for sternal end analysis');
        return this.results['sternalEnd'][side];
    }

    public getAuricularSurface(side: Side): number {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for auricular surface analysis');
        return this.results['auricularSurface'][side];
    }

    public getThirdMolar(side: Side): number {
        if (side != Side.TL && side != Side.TR && Side.BL && Side.BR)
            throw new Error('Invalid side for third molar analysis');
        return this.results['thirdMolar'][side];
    }
}
