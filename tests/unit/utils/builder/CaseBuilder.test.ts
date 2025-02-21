import { CaseBuilder } from '../../../../src/utils/builder/CaseBuilder';
import { CaseModel } from '../../../../src/models/CaseModel';
import { AbstractReportModel } from '../../../../src/models/AbstractReportModel';

describe('CaseBuilder', () => {
  let caseBuilder: CaseBuilder;

  beforeEach(() => {
    caseBuilder = new CaseBuilder();
  });

  it('should set caseID correctly', () => {
    const caseID = '12345';
    caseBuilder.setCaseID(caseID);
    expect(caseBuilder['_caseID']).toBe(caseID);
  });

  it('should set populationAffinity correctly', () => {
    const populationAffinity = 10;
    caseBuilder.setPopulationAffinity(populationAffinity);
    expect(caseBuilder['_populationAffinity']).toBe(populationAffinity);
  });

  it('should set sex correctly', () => {
    const sex = 1;
    caseBuilder.setSex(sex);
    expect(caseBuilder['_sex']).toBe(sex);
  });

  it('should set third molar status for the top left correctly', () => {
    const thirdMolarTL = 2;
    caseBuilder.setThirdMolarTL(thirdMolarTL);
    expect(caseBuilder['_thirdMolarTL']).toBe(thirdMolarTL);
  });

  it('should set third molar status for the top right correctly', () => {
    const thirdMolarTR = 3;
    caseBuilder.setThirdMolarTR(thirdMolarTR);
    expect(caseBuilder['_thirdMolarTR']).toBe(thirdMolarTR);
  });

  it('should set third molar status for the bottom left correctly', () => {
    const thirdMolarBL = 4;
    caseBuilder.setThirdMolarBL(thirdMolarBL);
    expect(caseBuilder['_thirdMolarBL']).toBe(thirdMolarBL);
  });

  it('should set third molar status for the bottom right correctly', () => {
    const thirdMolarBR = 5;
    caseBuilder.setThirdMolarBR(thirdMolarBR);
    expect(caseBuilder['_thirdMolarBR']).toBe(thirdMolarBR);
  });

  it('should set pubic symphysis status for the left side correctly', () => {
    const pubicSymphysisL = 6;
    caseBuilder.setPubicSymphysisL(pubicSymphysisL);
    expect(caseBuilder['_pubicSymphysisL']).toBe(pubicSymphysisL);
  });

  it('should set pubic symphysis status for the right side correctly', () => {
    const pubicSymphysisR = 7;
    caseBuilder.setPubicSymphysisR(pubicSymphysisR);
    expect(caseBuilder['_pubicSymphysisR']).toBe(pubicSymphysisR);
  });

  it('should set auricular area status for the left side correctly', () => {
    const auricularAreaL = 8;
    caseBuilder.setAuricularAreaL(auricularAreaL);
    expect(caseBuilder['_auricularAreaL']).toBe(auricularAreaL);
  });

  it('should set auricular area status for the right side correctly', () => {
    const auricularAreaR = 9;
    caseBuilder.setAuricularAreaR(auricularAreaR);
    expect(caseBuilder['_auricularAreaR']).toBe(auricularAreaR);
  });

  it('should set fourth rib status for the left side correctly', () => {
    const fourthRibL = 10;
    caseBuilder.setFourthRibL(fourthRibL);
    expect(caseBuilder['_fourthRibL']).toBe(fourthRibL);
  });

  it('should set fourth rib status for the right side correctly', () => {
    const fourthRibR = 11;
    caseBuilder.setFourthRibR(fourthRibR);
    expect(caseBuilder['_fourthRibR']).toBe(fourthRibR);
  });

  it('should set notes correctly', () => {
    const notes = 'This is a test note';
    caseBuilder.setNotes(notes);
    expect(caseBuilder['_notes']).toBe(notes);
  });

});
