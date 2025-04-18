import { ReportBuilder } from '../../src/classes/builders/ReportBuilder';
import { ReportModel } from '../../src/classes/models/ReportModel';
import { NullReportModel } from '../../src/classes/models/NullReportModel';
import { Autonumberer } from '../../src/classes/builders/Autonumberer';

// Mock Autonumberer to always return a fixed ID
jest.mock('../../src/classes/builders/Autonumberer', () => ({
    Autonumberer: {
        getInstance: jest.fn().mockReturnValue({
            generateNext: jest.fn().mockReturnValue('TEST-ID'),
        }),
    },
}));

describe('Integration: ReportBuilder', () => {
    let builder: ReportBuilder;

    beforeEach(() => {
        builder = new ReportBuilder();
    });

    describe('build()', () => {
        it('should return NullReportModel when content is null', () => {
            const report = builder.build(null as any);
            expect(report).toBeInstanceOf(NullReportModel);
        });

        it('should return NullReportModel when content is an empty object', () => {
            const report = builder.build({});
            expect(report).toBeInstanceOf(NullReportModel);
        });

        it('should return ReportModel without ML_Result', () => {
            const content = { dummy: 'value' };
            const report = builder.build(content);
            expect(report).toBeInstanceOf(ReportModel);
            expect((report as ReportModel).id).toBe('TEST-ID');
            expect((report as ReportModel).result).toEqual(content);
            expect((report as ReportModel).mlResult).toBeUndefined();
        });

        it('should return ReportModel with ML_Result', () => {
            const content = { dummy: 'value' };
            const report = builder.build(content, 42);
            expect(report).toBeInstanceOf(ReportModel);
            expect((report as ReportModel).mlResult).toBe(42);
        });
    });

    describe('buildFrom()', () => {
        let xml: Element;

        beforeEach(() => {
            const parser = new DOMParser();
            const xmlString = `
                <results>
                    <pubicSymphysis>
                        <L>1</L><L_min>0</L_min><L_max>2</L_max>
                        <R>3</R><R_min>2</R_min><R_max>4</R_max>
                        <C>5</C><C_min>4</C_min><C_max>6</C_max>
                    </pubicSymphysis>
                    <sternalEnd>
                        <L>7</L><L_min>6</L_min><L_max>8</L_max>
                        <R>9</R><R_min>8</R_min><R_max>10</R_max>
                        <C>11</C><C_min>10</C_min><C_max>12</C_max>
                    </sternalEnd>
                    <auricularSurface>
                        <L>13</L><L_min>12</L_min><L_max>14</L_max>
                        <R>15</R><R_min>14</R_min><R_max>16</R_max>
                        <C>17</C><C_min>16</C_min><C_max>18</C_max>
                    </auricularSurface>
                    <thirdMolar>
                        <TL>19</TL><TR>20</TR><BL>21</BL><BR>22</BR>
                    </thirdMolar>
                </results>
            `;
            xml = parser.parseFromString(xmlString, 'application/xml').documentElement;
        });

        it('should return a ReportModel without ML value from XML', () => {
            const report = builder.buildFrom('XML-ID', xml);
            expect(report).toBeInstanceOf(ReportModel);
            expect((report as ReportModel).id).toBe('XML-ID');
            expect((report as ReportModel).mlResult).toBeUndefined();
            expect((report as ReportModel).result.thirdMolar.TL).toBe(19);
        });

        it('should return a ReportModel with ML value from XML', () => {
            const report = builder.buildFrom('XML-ID', xml, 55);
            expect(report).toBeInstanceOf(ReportModel);
            expect((report as ReportModel).id).toBe('XML-ID');
            expect((report as ReportModel).mlResult).toBe(55);
        });
    });

    describe('buildResultDictionary()', () => {
        it('should default missing tags to -1', () => {
            const parser = new DOMParser();
            const xmlString = `<results><pubicSymphysis></pubicSymphysis></results>`;
            const xml = parser.parseFromString(xmlString, 'application/xml').documentElement;

            const dict = builder.buildResultDictionary(xml);
            expect(dict.pubicSymphysis.L).toBe(-1);
            expect(dict.pubicSymphysis.R_max).toBe(-1);
        });
    });
});
