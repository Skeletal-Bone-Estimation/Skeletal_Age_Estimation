//CaseBuilder.test.ts
import { CaseBuilder } from '../../../../src/utils/builder/CaseBuilder';
import { CaseModel } from '../../../../src/models/CaseModel';
import { ReportModel } from '../../../../src/models/ReportModel';
import { Affinity, Sex, ThirdMolar, AuricularArea, PubicSymphysis, SternalEnd } from '../../../../src/utils/enums';

describe('CaseBuilder', () => {
    let caseBuilder: CaseBuilder;

    beforeEach(() => {
        caseBuilder = new CaseBuilder();
    });

    it('should initialize with default values', () => {
        const caseModel = caseBuilder.build();

        expect(caseModel.caseID).toBe('');
        expect(caseModel.populationAffinity).toBe(0);
        expect(caseModel.sex).toBe(0);
        expect(caseModel.thirdMolarTL).toBe(0);
        expect(caseModel.thirdMolarTR).toBe(0);
        expect(caseModel.thirdMolarBL).toBe(0);
        expect(caseModel.thirdMolarBR).toBe(0);
        expect(caseModel.pubicSymphysisL).toBe(1);
        expect(caseModel.pubicSymphysisR).toBe(1);
        expect(caseModel.auricularAreaL).toBe(1);
        expect(caseModel.auricularAreaR).toBe(1);
        expect(caseModel.fourthRibL).toBe(1);
        expect(caseModel.fourthRibR).toBe(1);
        expect(caseModel.notes).toBe('');
        expect(caseModel.generatedReports).toEqual({});
    });

    it('should set values correctly using the builder pattern', () => {
        // Set values one at a time
        caseBuilder.setCaseID('123');
        caseBuilder.setPopulationAffinity(Affinity.Black);
        caseBuilder.setSex(Sex.Male);
        caseBuilder.setThirdMolarTL(ThirdMolar.Unknown);
        caseBuilder.setThirdMolarTR(ThirdMolar.Unknown);
        caseBuilder.setThirdMolarBL(ThirdMolar.Unknown);
        caseBuilder.setThirdMolarBR(ThirdMolar.Unknown);
        caseBuilder.setPubicSymphysisL(PubicSymphysis.Unknown);
        caseBuilder.setPubicSymphysisR(PubicSymphysis.Unknown);
        caseBuilder.setAuricularAreaL(AuricularArea.Unknown);
        caseBuilder.setAuricularAreaR(AuricularArea.Unknown);
        caseBuilder.setFourthRibL(SternalEnd.Unknown);
        caseBuilder.setFourthRibR(SternalEnd.Unknown);
        caseBuilder.setNotes('Test notes');
        caseBuilder.setReportsGenerated({ 1: new ReportModel(1) });

        const caseModel = caseBuilder.build();

        expect(caseModel.caseID).toBe('123');
        expect(caseModel.populationAffinity).toBe(Affinity.Black);
        expect(caseModel.sex).toBe(Sex.Male);
        expect(caseModel.thirdMolarTL).toBe(ThirdMolar.Unknown);
        expect(caseModel.thirdMolarTR).toBe(ThirdMolar.Unknown);
        expect(caseModel.thirdMolarBL).toBe(ThirdMolar.Unknown);
        expect(caseModel.thirdMolarBR).toBe(ThirdMolar.Unknown);
        expect(caseModel.pubicSymphysisL).toBe(PubicSymphysis.Unknown);
        expect(caseModel.pubicSymphysisR).toBe(PubicSymphysis.Unknown);
        expect(caseModel.auricularAreaL).toBe(AuricularArea.Unknown);
        expect(caseModel.auricularAreaR).toBe(AuricularArea.Unknown);
        expect(caseModel.fourthRibL).toBe(SternalEnd.Unknown);
        expect(caseModel.fourthRibR).toBe(SternalEnd.Unknown);
        expect(caseModel.notes).toBe('Test notes');
        expect(caseModel.generatedReports[1]).toBeInstanceOf(ReportModel);
    });

    it('should call build and return a CaseModel instance', () => {
        caseBuilder.setCaseID('123');
        caseBuilder.setPopulationAffinity(Affinity.Unknown);
        caseBuilder.setSex(Sex.Male);

        const caseModel = caseBuilder.build();

        // Check that build() returns an instance of CaseModel
        expect(caseModel).toBeInstanceOf(CaseModel);
        expect(caseModel.caseID).toBe('123');
        expect(caseModel.populationAffinity).toBe(Affinity.Unknown);
        expect(caseModel.sex).toBe(Sex.Male);
    });
});
