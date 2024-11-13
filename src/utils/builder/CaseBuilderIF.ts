import { ReportModel } from '../../models/ReportModel';
import {
    Affinity,
    Sex,
    ThirdMolar,
    AuricularArea,
    SternalEnd,
    PubicSymphysis,
} from '../enums';

export interface CaseBuilderIF {
    setCaseID(caseID: string): CaseBuilderIF;
    setPopulationAffinity(populationAffinity: Affinity): CaseBuilderIF;
    setSex(sex: Sex): CaseBuilderIF;
    setThirdMolarTL(thirdMolarTL: ThirdMolar): CaseBuilderIF;
    setThirdMolarTR(thirdMolarTR: ThirdMolar): CaseBuilderIF;
    setThirdMolarBL(thirdMolarBL: ThirdMolar): CaseBuilderIF;
    setThirdMolarBR(thirdMolarBR: ThirdMolar): CaseBuilderIF;
    setPubicSymphysisL(pubicSymphysisL: PubicSymphysis): CaseBuilderIF;
    setPubicSymphysisR(pubicSymphysisR: PubicSymphysis): CaseBuilderIF;
    setAuricularAreaL(auricularAreaL: AuricularArea): CaseBuilderIF;
    setAuricularAreaR(auricularAreaR: AuricularArea): CaseBuilderIF;
    setFourthRibL(fourthRibL: SternalEnd): CaseBuilderIF;
    setFourthRibR(fourthRibR: SternalEnd): CaseBuilderIF;
    setReportsGenerated(reports: { [id: number]: ReportModel }): CaseBuilderIF;
}
