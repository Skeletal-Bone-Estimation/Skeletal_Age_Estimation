// CaseBuilder.test.ts
import { CaseBuilder } from '../../../../src/utils/builder/CaseBuilder';
import { CaseModel } from '../../../../src/models/CaseModel';
import { AbstractReportModel } from '../../../../src/models/AbstractReportModel';

describe('CaseBuilder', () => {
  it('should initialize a CaseModel with default values', () => {
    const builder = new CaseBuilder() as any; // cast to any so build() is accessible
    const caseModel: CaseModel = builder.build();

    // Check default values as defined in the builder constructor:
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
    expect(caseModel.generatedReports).toEqual([]);
  });

  it('should update the case model with new values using setters', () => {
    const builder = new CaseBuilder() as any;
    // Update a single property: caseID
    builder.setCaseID('UPDATED_CASE');
    const caseModel: CaseModel = builder.build();

    expect(caseModel.caseID).toBe('UPDATED_CASE');
    // Other values remain at default
    expect(caseModel.populationAffinity).toBe(0);
    expect(caseModel.sex).toBe(0);
  });

  it('should build a new CaseModel with non-default values using chained setters', () => {
    const dummyReports = [{ id: 'report1' }] as AbstractReportModel[];
    const builder = new CaseBuilder() as any;
    const caseModel: CaseModel = builder
      .setCaseID('NEW_CASE')
      .setPopulationAffinity(2)
      .setSex(1)
      .setThirdMolarTL(1)
      .setThirdMolarTR(2)
      .setThirdMolarBL(3)
      .setThirdMolarBR(4)
      .setPubicSymphysisL(5)
      .setPubicSymphysisR(6)
      .setAuricularAreaL(7)
      .setAuricularAreaR(8)
      .setFourthRibL(9)
      .setFourthRibR(10)
      .setNotes('Custom notes')
      .setReportsGenerated(dummyReports)
      .build();

    expect(caseModel.caseID).toBe('NEW_CASE');
    expect(caseModel.populationAffinity).toBe(2);
    expect(caseModel.sex).toBe(1);
    expect(caseModel.thirdMolarTL).toBe(1);
    expect(caseModel.thirdMolarTR).toBe(2);
    expect(caseModel.thirdMolarBL).toBe(3);
    expect(caseModel.thirdMolarBR).toBe(4);
    expect(caseModel.pubicSymphysisL).toBe(5);
    expect(caseModel.pubicSymphysisR).toBe(6);
    expect(caseModel.auricularAreaL).toBe(7);
    expect(caseModel.auricularAreaR).toBe(8);
    expect(caseModel.fourthRibL).toBe(9);
    expect(caseModel.fourthRibR).toBe(10);
    expect(caseModel.notes).toBe('Custom notes');
    expect(caseModel.generatedReports).toEqual(dummyReports);
  });
});
