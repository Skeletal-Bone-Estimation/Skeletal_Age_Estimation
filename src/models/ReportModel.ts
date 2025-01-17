// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

//ReportModel.ts
export class ReportModel {
    private _id: number;

    constructor(id: number) {
        this._id = id;
    }

    public get id() {
        return this._id;
    }
}
