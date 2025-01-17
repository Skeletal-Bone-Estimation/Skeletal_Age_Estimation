import { Affinity, Sex } from "../enums";
import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class DefaultAnalyzerStrategy extends AbstractAnalyzer {
    
    constructor(sex: Sex, affinity: Affinity) {
        super(sex, affinity);
    }
    
    executeAnalysis(): void {
        // TODO: Default analysis logic
    }
    
}