import { Affinity, Sex, ThirdMolar } from '../../models/CaseModel';
import { ReportModel } from '../../models/ReportModel';

export interface CaseBuilderIF {
    setCaseID(caseID: string): CaseBuilderIF;
    setPopulationAffinity(populationAffinity: Affinity): CaseBuilderIF;
    setSex(sex: Sex): CaseBuilderIF;
    setThirdMolar(thirdMolar: ThirdMolar): CaseBuilderIF;
    setPubicSymphysis(pubicSymphysis: { [key: string]: number }): CaseBuilderIF;
    setAuricularEdge(auricularEdge: { [key: string]: number }): CaseBuilderIF;
    setFourthRib(fourthEdge: { [key: string]: number }): CaseBuilderIF;
    setReportsGenerated(reports: { [id: number]: ReportModel }): CaseBuilderIF;
}
