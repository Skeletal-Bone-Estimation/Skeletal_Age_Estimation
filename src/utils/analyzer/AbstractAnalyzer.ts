import { Affinity, Sex } from "../enums";
import { AnalyzerStrategyIF } from "./AnalyzerStrategyIF";

export abstract class AbstractAnalyzer implements AnalyzerStrategyIF {

    protected sex : Sex;
    protected affinity : Affinity;

    public constructor(sex: Sex, affinity: Affinity) {
        this.sex = sex;
        this.affinity = affinity;
    }

    abstract executeAnalysis(): void;

    public modifySex(sex: Sex): void {
        this.sex = sex;
    }

    public modifyAffinity(affinity: Affinity): void {
        this.affinity = affinity;
    }
}