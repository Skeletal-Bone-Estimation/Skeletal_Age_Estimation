import { CaseModel } from "../../models/CaseModel";
import { Affinity, Sex } from "../enums";
import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class DefaultAnalyzerStrategy extends AbstractAnalyzer {
    
    constructor(sex: Sex, affinity: Affinity) {
        super(sex, affinity);
    }
    
    executeAnalysis(_case : CaseModel): {} {
        // TODO: Default analysis logic
        // retreive data from gui
        // calculate age for each category
        // package into report

        var results: {} = {
            "pubicSymphysis": -1,
            "auricularSurface": -1,
            "sternalEnd": -1,
            "thirdMolar": -1,
        };

        if(this.sex = Sex.Male) {           // male algorithm
            
        }
        else if (this.sex = Sex.Female) {   // female algorithm
            
        }
        else {                              // default algorithm

        }

        return results;
    }
    
}