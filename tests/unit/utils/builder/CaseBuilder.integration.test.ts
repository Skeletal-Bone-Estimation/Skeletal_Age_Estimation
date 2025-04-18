// CaseBuilder.integration.test.ts

import { CaseBuilder } from '../../../../src/utils/builder/CaseBuilder';
import { CaseModel } from '../../../../src/models/CaseModel';
import { NullCaseModel } from '../../../../src/models/NullCaseModel';
import { NullReportModel } from '../../../../src/models/NullReportModel';
import { AbstractReportModel } from '../../../../src/models/AbstractReportModel';
import { Affinity, Sex } from '../../../../src/utils/enums';

describe('CaseBuilder Integration', () => {
    let builder: CaseBuilder;

    beforeEach(() => {
        builder = new CaseBuilder();
    });

    it('should build a default CaseModel with no custom setters', () => {
        const caseModel = builder.build();
        expect(caseModel).toBeInstanceOf(CaseModel);
        expect(caseModel.caseID).toBe('null');
        expect(caseModel.populationAffinity).toBe(Affinity.Unknown);
        expect(caseModel.sex).toBe(Sex.Unknown);
    });

    it('should build a configured CaseModel with custom fields', () => {
        const reports: AbstractReportModel[] = [];
        const builderResult = builder
            .setCaseID('case-001')
            .setPopulationAffinity(Affinity.White)
            .setSex(Sex.Male)
            .setSavePath('/cases/case-001')
            .setThirdMolarTL(2)
            .setThirdMolarTR(2)
            .setThirdMolarBL(3)
            .setThirdMolarBR(1)
            .setPubicSymphysisL(4)
            .setPubicSymphysisR(5)
            .setAuricularAreaL(6)
            .setAuricularAreaR(6)
            .setFourthRibL(3)
            .setFourthRibR(3)
            .setNotes('Case notes...')
            .setReportsGenerated(reports)
            .setMostRecentReport('rpt-001')
            .setPubicSymphysisImages(['pubic1.png'])
            .setAuricularSurfaceImages(['auric1.png'])
            .setFourthRibImages(['rib1.png'])
            .setThirdMolarImages(['molar1.png']);

        const caseModel = builderResult.build();

        expect(caseModel).toBeInstanceOf(CaseModel);
        expect(caseModel.caseID).toBe('case-001');
        expect(caseModel.populationAffinity).toBe(Affinity.White);
        expect(caseModel.sex).toBe(Sex.Male);
        expect(caseModel.notes).toBe('Case notes...');
        expect(caseModel.mostRecentReport).toBe('rpt-001');
        expect(caseModel.pubicSymphysisImages).toEqual(['pubic1.png']);
        expect(caseModel.thirdMolarTL).toBe(2);
    });

    it('should build a NullCaseModel', () => {
        const nullCase = builder.setCaseID('null-case').buildNull();
        expect(nullCase).toBeInstanceOf(NullCaseModel);
        expect(nullCase.caseID).toBe('null-case');
        expect(nullCase.populationAffinity).toBe(Affinity.Unknown);
        expect(nullCase.sex).toBe(Sex.Unknown);
    });

    it('should allow setting images for all anatomical regions', () => {
        const caseModel = builder
            .setPubicSymphysisImages(['a.jpg'])
            .setAuricularSurfaceImages(['b.jpg'])
            .setFourthRibImages(['c.jpg'])
            .setThirdMolarImages(['d.jpg'])
            .build();

        expect(caseModel.pubicSymphysisImages).toEqual(['a.jpg']);
        expect(caseModel.auricularSurfaceImages).toEqual(['b.jpg']);
        expect(caseModel.fourthRibImages).toEqual(['c.jpg']);
        expect(caseModel.thirdMolarImages).toEqual(['d.jpg']);
    });

    it('should handle setting NullReportModel as mostRecentReport', () => {
        const model = builder.build();
        expect(model.mostRecentReport).toBeInstanceOf(NullReportModel);
    });
});
