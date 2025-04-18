// BuildDirector.integration.test.ts

import { BuildDirector } from '../../../../src/utils/builder/BuildDirector';
import { CaseModel } from '../../../../src/models/CaseModel';
import { NullCaseModel } from '../../../../src/models/NullCaseModel';
import { AbstractReportModel } from '../../../../src/models/AbstractReportModel';

describe('BuildDirector Integration', () => {
    let buildDirector: BuildDirector;

    beforeEach(() => {
        buildDirector = new BuildDirector();
    });

    it('should build a CaseModel instance', () => {
        const caseModel = buildDirector.makeCase();
        expect(caseModel).toBeInstanceOf(CaseModel);
    });

    it('should build a NullCaseModel instance', () => {
        const nullCase = buildDirector.makeNullCase();
        expect(nullCase).toBeInstanceOf(NullCaseModel);
    });

    it('should build a ReportModel from results object', () => {
        const results = {
            age: 25,
            affinity: 'Black',
            sex: 'Male',
        };
        const report = buildDirector.makeReport(results);
        expect(report).toBeInstanceOf(AbstractReportModel);
    });

    it('should build a ReportModel from results and ML result', () => {
        const results = {
            age: 30,
            affinity: 'White',
            sex: 'Female',
        };
        const mlScore = 0.82;
        const report = buildDirector.makeReportML(results, mlScore);
        expect(report).toBeInstanceOf(AbstractReportModel);
        // Optionally test ML-specific properties if available
    });

    it('should build a ReportModel from ID and XML content', () => {
        const xmlString = `<report><age>27</age><sex>Female</sex></report>`;
        const parser = new DOMParser();
        const xmlElement = parser.parseFromString(xmlString, 'text/xml').documentElement;

        const report = buildDirector.makeReportFrom('report-101', xmlElement, 0.95);
        expect(report).toBeInstanceOf(AbstractReportModel);
    });
});
