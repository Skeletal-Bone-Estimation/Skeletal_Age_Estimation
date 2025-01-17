import { Affinity, Sex } from "../enums";
import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ImageAnalyzerStrategy extends AbstractAnalyzer {
    
    constructor(sex: Sex, affinity: Affinity) {
        super(sex, affinity);
    }

    executeAnalysis(): void {
        // TODO: Image analysis logic    
    }
}