import { CaseModel } from '../../models/CaseModel';
import {
    Affinity,
    AuricularArea,
    PubicSymphysis,
    Sex,
    SternalEnd,
    ThirdMolar,
    Report,
    Side,
} from '../enums';
import { AbstractAnalyzer } from './AbstractAnalyzer';

// default analysis method using age range charts provided by the client
export class DefaultAnalyzerStrategy extends AbstractAnalyzer {
    //private results: { [key: string]: { [key: string]: number } };

    constructor(sex: Sex, affinity: Affinity) {
        super(sex, affinity);
    }

    // implemented abstract analysis method inherited from parent
    public executeAnalysis(_case: CaseModel): {
        [key: string]: { [key: string]: number };
    } {
        var isMale: boolean = false;
        var isUnknown: boolean = false;
        var results: { [key: string]: { [key: string]: number } } =
            this.resetResults();

        if (this.sex == Sex.Male) isMale = true;
        else if (this.sex == Sex.Unknown) isUnknown = true;

        this.pubicSymphysis(
            _case.pubicSymphysisL,
            Side.L,
            isMale,
            isUnknown,
            results,
        );
        this.pubicSymphysis(
            _case.pubicSymphysisR,
            Side.R,
            isMale,
            isUnknown,
            results,
        );
        this.sternalEnd(_case.fourthRibL, Side.L, isMale, isUnknown, results);
        this.sternalEnd(_case.fourthRibR, Side.R, isMale, isUnknown, results);
        this.auricularSurface(_case.auricularAreaL, Side.L, results);
        this.auricularSurface(_case.auricularAreaR, Side.R, results);
        this.thirdMolar(_case.thirdMolarTL, Side.TL, results);
        this.thirdMolar(_case.thirdMolarTR, Side.TR, results);
        this.thirdMolar(_case.thirdMolarBL, Side.BL, results);
        this.thirdMolar(_case.thirdMolarBR, Side.BR, results);

        //update combine methods to incorporate into the new results dict impl.
        this.pubicSymphysisCombined(
            _case.pubicSymphysisL,
            _case.pubicSymphysisR,
            Side.C,
            isMale,
            isUnknown,
            results,
        );
        this.sternalEndCombined(
            _case.fourthRibL,
            _case.fourthRibR,
            Side.C,
            isMale,
            isUnknown,
            results,
        );
        this.auricularSurfaceCombined(
            _case.auricularAreaL,
            _case.auricularAreaR,
            Side.C,
            results,
        );
        /*
        this.combinedAll(
            _case.pubicSymphysisL,
            _case.pubicSymphysisR,
            _case.fourthRibL,
            _case.fourthRibR,
            _case.auricularAreaL,
            _case.auricularAreaR,
            Side.CA,
            isMale,
            isUnknown,
        );
        */

        return results;
    }

    // analyzes pubic symphysis age based off the Hartnett 2010 chart, discriminating male and female while
    // calculating an average for cases with an unknown sex
    private pubicSymphysis(
        data: PubicSymphysis,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for pubic symphysis analysis');

        switch (data) {
            case PubicSymphysis.One:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(19.29, 19.8)
                    : isMale
                      ? 19.29
                      : 19.8;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(15.43, 17.14)
                    : isMale
                      ? 15.43
                      : 17.14;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(23.15, 22.46)
                    : isMale
                      ? 23.15
                      : 22.46;
                break;
            case PubicSymphysis.Two:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(22.14, 23.2)
                    : isMale
                      ? 22.14
                      : 23.2;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(18.42, 18.44)
                    : isMale
                      ? 18.42
                      : 18.44;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(25.86, 27.96)
                    : isMale
                      ? 25.86
                      : 27.96;
                break;
            case PubicSymphysis.Three:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(29.53, 31.44)
                    : isMale
                      ? 29.53
                      : 31.44;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(16.27, 21.2)
                    : isMale
                      ? 16.27
                      : 21.2;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(42.79, 41.68)
                    : isMale
                      ? 42.79
                      : 41.68;
                break;
            case PubicSymphysis.Four:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(42.54, 43.26)
                    : isMale
                      ? 42.54
                      : 43.26;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(24.94, 31.02)
                    : isMale
                      ? 24.94
                      : 37.36;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(60.14, 55.5)
                    : isMale
                      ? 60.14
                      : 55.5;
                break;
            case PubicSymphysis.Five:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(53.87, 51.47)
                    : isMale
                      ? 53.87
                      : 51.47;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(37.03, 43.59)
                    : isMale
                      ? 37.03
                      : 43.59;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(70.71, 59.35)
                    : isMale
                      ? 70.71
                      : 59.35;
                break;
            case PubicSymphysis.Six:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(63.76, 72.34)
                    : isMale
                      ? 63.76
                      : 72.34;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(47.64, 57.62)
                    : isMale
                      ? 47.64
                      : 57.62;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(79.88, 87.06)
                    : isMale
                      ? 79.88
                      : 87.06;
                break;
            case PubicSymphysis.Seven:
                results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(77.0, 82.54)
                    : isMale
                      ? 77.0
                      : 81.2;
                results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(58.34, 67.72)
                    : isMale
                      ? 58.34
                      : 67.72;
                results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(95.66, 97.36)
                    : isMale
                      ? 95.66
                      : 97.36;
                break;
            case PubicSymphysis.Unknown:
                break;
            case -PubicSymphysis.Error:
            default:
                throw new Error('Invalid pubic symphysis phase');
        }
    }

    private pubicSymphysisCombined(
        data1: PubicSymphysis,
        data2: PubicSymphysis,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (side != Side.C)
            throw new Error('Invalid side for pubic symphysis analysis');
        // Helper function to determine values based on PubicSymphysis phase
        const getSymphysisValues = (data: PubicSymphysis): [number, number] => {
            switch (data) {
                case PubicSymphysis.One:
                    return [
                        isUnknown
                            ? this.average(15.43, 17.14)
                            : isMale
                              ? 15.43
                              : 17.14,
                        isUnknown
                            ? this.average(23.15, 22.46)
                            : isMale
                              ? 23.15
                              : 22.46,
                    ];
                case PubicSymphysis.Two:
                    return [
                        isUnknown
                            ? this.average(18.42, 18.44)
                            : isMale
                              ? 18.42
                              : 18.44,
                        isUnknown
                            ? this.average(25.86, 27.96)
                            : isMale
                              ? 25.86
                              : 27.96,
                    ];
                case PubicSymphysis.Three:
                    return [
                        isUnknown
                            ? this.average(16.27, 21.2)
                            : isMale
                              ? 16.27
                              : 21.2,
                        isUnknown
                            ? this.average(42.79, 41.68)
                            : isMale
                              ? 42.79
                              : 41.68,
                    ];
                case PubicSymphysis.Four:
                    return [
                        isUnknown
                            ? this.average(24.94, 31.02)
                            : isMale
                              ? 24.94
                              : 37.36,
                        isUnknown
                            ? this.average(60.14, 55.5)
                            : isMale
                              ? 60.14
                              : 55.5,
                    ];
                case PubicSymphysis.Five:
                    return [
                        isUnknown
                            ? this.average(37.03, 43.59)
                            : isMale
                              ? 37.03
                              : 43.59,
                        isUnknown
                            ? this.average(70.71, 59.35)
                            : isMale
                              ? 70.71
                              : 59.35,
                    ];
                case PubicSymphysis.Six:
                    return [
                        isUnknown
                            ? this.average(47.64, 57.62)
                            : isMale
                              ? 47.64
                              : 57.62,
                        isUnknown
                            ? this.average(79.88, 87.06)
                            : isMale
                              ? 79.88
                              : 87.06,
                    ];
                case PubicSymphysis.Seven:
                    return [
                        isUnknown
                            ? this.average(58.34, 67.72)
                            : isMale
                              ? 58.34
                              : 67.72,
                        isUnknown
                            ? this.average(95.66, 97.36)
                            : isMale
                              ? 95.66
                              : 97.36,
                    ];
                case PubicSymphysis.Unknown:
                    return [0, 0]; // Default values if unknown
                default:
                    throw new Error('Invalid pubic symphysis phase');
            }
        };

        // Get values for both datasets
        const [S1, S2] = getSymphysisValues(data1);
        const [S3, S4] = getSymphysisValues(data2);

        results[Report.pubicSymphysis][`${side}_min`] = Math.min(S1, S3);
        results[Report.pubicSymphysis][`${side}_max`] = Math.max(S2, S4);
        results[Report.pubicSymphysis][`${side}`] = this.average(
            Math.min(S1, S3),
            Math.max(S2, S4),
        );
    }

    // analyzes sternal end age based of the Hartnett 2010 chart, discriminating male and female while
    // calculating an average for cases with an unknown sex
    private sternalEnd(
        data: SternalEnd,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for sternal end analysis');

        switch (data) {
            case SternalEnd.One:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(20.0, 19.57)
                    : isMale
                      ? 20.0
                      : 19.57;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(17.1, 16.23)
                    : isMale
                      ? 17.1
                      : 16.23;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(22.9, 22.91)
                    : isMale
                      ? 22.9
                      : 22.91;
                break;
            case SternalEnd.Two:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(24.63, 25.14)
                    : isMale
                      ? 24.63
                      : 25.14;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(20.63, 22.8)
                    : isMale
                      ? 20.63
                      : 22.8;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(28.63, 27.48)
                    : isMale
                      ? 28.63
                      : 27.48;
                break;
            case SternalEnd.Three:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(32.27, 32.95)
                    : isMale
                      ? 32.27
                      : 32.95;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(24.89, 26.61)
                    : isMale
                      ? 24.89
                      : 26.61;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(39.65, 39.29)
                    : isMale
                      ? 39.65
                      : 39.29;
                break;
            case SternalEnd.Four:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(42.43, 43.52)
                    : isMale
                      ? 42.43
                      : 43.52;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(36.47, 37.36)
                    : isMale
                      ? 36.47
                      : 37.36;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(48.39, 49.68)
                    : isMale
                      ? 48.39
                      : 49.68;
                break;
            case SternalEnd.Five:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(52.05, 51.69)
                    : isMale
                      ? 52.05
                      : 51.69;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(45.05, 45.07)
                    : isMale
                      ? 45.05
                      : 45.07;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(59.05, 58.31)
                    : isMale
                      ? 59.05
                      : 58.31;
                break;
            case SternalEnd.Six:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(63.13, 67.17)
                    : isMale
                      ? 63.13
                      : 67.17;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(56.07, 60.35)
                    : isMale
                      ? 56.07
                      : 60.35;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(70.19, 73.99)
                    : isMale
                      ? 70.19
                      : 73.99;
                break;
            case SternalEnd.Seven:
                results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(80.91, 81.2)
                    : isMale
                      ? 80.91
                      : 81.2;
                results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(67.71, 67.3)
                    : isMale
                      ? 67.71
                      : 67.3;
                results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(94.11, 95.1)
                    : isMale
                      ? 94.11
                      : 95.1;
                break;
            case SternalEnd.Unknown:
                break;
            case SternalEnd.Error:
            default:
                throw new Error('Invalid sternal end phase');
        }
    }

    private sternalEndCombined(
        data1: SternalEnd,
        data2: SternalEnd,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (side != Side.C)
            throw new Error('Invalid side for pubic symphysis analysis');
        // Helper function to determine values based on SternalEnd phase
        const getSternalEndValues = (data: SternalEnd): [number, number] => {
            switch (data) {
                case SternalEnd.One:
                    return [
                        isUnknown
                            ? this.average(17.1, 16.23)
                            : isMale
                              ? 17.1
                              : 16.23,
                        isUnknown
                            ? this.average(22.9, 22.91)
                            : isMale
                              ? 22.9
                              : 22.91,
                    ];
                case SternalEnd.Two:
                    return [
                        isUnknown
                            ? this.average(20.63, 22.8)
                            : isMale
                              ? 20.63
                              : 22.8,
                        isUnknown
                            ? this.average(28.63, 27.48)
                            : isMale
                              ? 28.63
                              : 27.48,
                    ];
                case SternalEnd.Three:
                    return [
                        isUnknown
                            ? this.average(24.89, 26.61)
                            : isMale
                              ? 24.89
                              : 26.61,
                        isUnknown
                            ? this.average(39.65, 39.29)
                            : isMale
                              ? 39.65
                              : 39.29,
                    ];
                case SternalEnd.Four:
                    return [
                        isUnknown
                            ? this.average(36.47, 37.36)
                            : isMale
                              ? 36.47
                              : 37.36,
                        isUnknown
                            ? this.average(48.39, 49.68)
                            : isMale
                              ? 48.39
                              : 49.68,
                    ];
                case SternalEnd.Five:
                    return [
                        isUnknown
                            ? this.average(45.05, 45.07)
                            : isMale
                              ? 45.05
                              : 45.07,
                        isUnknown
                            ? this.average(59.05, 58.31)
                            : isMale
                              ? 59.05
                              : 58.31,
                    ];
                case SternalEnd.Six:
                    return [
                        isUnknown
                            ? this.average(56.07, 60.35)
                            : isMale
                              ? 56.07
                              : 60.35,
                        isUnknown
                            ? this.average(70.19, 73.99)
                            : isMale
                              ? 70.19
                              : 73.99,
                    ];
                case SternalEnd.Seven:
                    return [
                        isUnknown
                            ? this.average(67.71, 67.3)
                            : isMale
                              ? 67.71
                              : 67.3,
                        isUnknown
                            ? this.average(94.11, 95.1)
                            : isMale
                              ? 94.11
                              : 95.1,
                    ];
                case SternalEnd.Unknown:
                    return [0, 0]; // Default values if unknown
                default:
                    throw new Error('Invalid pubic symphysis phase');
            }
        };

        // Get values for both datasets
        const [S1, S2] = getSternalEndValues(data1);
        const [S3, S4] = getSternalEndValues(data2);

        results[Report.sternalEnd][`${side}_min`] = Math.min(S1, S3);
        results[Report.sternalEnd][`${side}_max`] = Math.max(S2, S4);
        results[Report.sternalEnd][`${side}`] = this.average(
            Math.min(S1, S3),
            Math.max(S2, S4),
        );
    }

    // analyzes auricular surface age based of the Osborne et al. 2004 chart
    private auricularSurface(
        data: AuricularArea,
        side: Side,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for auricular surface analysis');

        switch (data) {
            case AuricularArea.One:
                results[Report.auricularSurface][`${side}`] = 21.1;
                results[Report.auricularSurface][`${side}_min`] = 15.14;
                results[Report.auricularSurface][`${side}_max`] = 27.06;
                break;
            case AuricularArea.Two:
                results[Report.auricularSurface][`${side}`] = 29.5;
                results[Report.auricularSurface][`${side}_min`] = 13.1;
                results[Report.auricularSurface][`${side}_max`] = 45.9;
                break;
            case AuricularArea.Three:
                results[Report.auricularSurface][`${side}`] = 42.0;
                results[Report.auricularSurface][`${side}_min`] = 14.52;
                results[Report.auricularSurface][`${side}_max`] = 69.48;
                break;
            case AuricularArea.Four:
                results[Report.auricularSurface][`${side}`] = 47.8;
                results[Report.auricularSurface][`${side}_min`] = 19.9;
                results[Report.auricularSurface][`${side}_max`] = 75.7;
                break;
            case AuricularArea.Five:
                results[Report.auricularSurface][`${side}`] = 53.1;
                results[Report.auricularSurface][`${side}_min`] = 24.82;
                results[Report.auricularSurface][`${side}_max`] = 81.38;
                break;
            case AuricularArea.Six:
                results[Report.auricularSurface][`${side}`] = 58.9;
                results[Report.auricularSurface][`${side}_min`] = 28.42;
                results[Report.auricularSurface][`${side}_max`] = 89.38;
                break;
            case AuricularArea.Unknown:
                break;
            case AuricularArea.Error:
            default:
                throw new Error('Invalid auricular surface phase');
        }
    }

    private auricularSurfaceCombined(
        data1: AuricularArea,
        data2: AuricularArea,
        side: Side,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (side != Side.C)
            throw new Error('Invalid side for pubic symphysis analysis');
        // Helper function to determine values based on SternalEnd phase
        const getAuricularSurfaceValues = (
            data: AuricularArea,
        ): [number, number] => {
            switch (data) {
                case AuricularArea.One:
                    return [15.14, 27.06];
                case AuricularArea.Two:
                    return [13.1, 45.9];
                case AuricularArea.Three:
                    return [14.52, 69.48];
                case AuricularArea.Four:
                    return [19.9, 75.7];
                case AuricularArea.Five:
                    return [24.82, 81.38];
                case AuricularArea.Six:
                    return [28.42, 89.38];
                case AuricularArea.Unknown:
                    return [0, 0]; // Default values if unknown
                default:
                    throw new Error('Invalid pubic symphysis phase');
            }
        };

        // Get values for both datasets
        const [S1, S2] = getAuricularSurfaceValues(data1);
        const [S3, S4] = getAuricularSurfaceValues(data2);

        results[Report.auricularSurface][`${side}_min`] = Math.min(S1, S3);
        results[Report.auricularSurface][`${side}_max`] = Math.max(S2, S4);
        results[Report.auricularSurface][`${side}`] = this.average(
            Math.min(S1, S3),
            Math.max(S2, S4),
        );
    }
    /*
    private combinedAll(
        dataP1: PubicSymphysis,
        dataP2: PubicSymphysis,
        dataS1: SternalEnd,
        dataS2: SternalEnd,
        dataA1: AuricularArea,
        dataA2: AuricularArea,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
    ) {
        const getSymphysisValues = (
            data: PubicSymphysis,
        ): [number, number, number] => {
            switch (data) {
                case PubicSymphysis.One:
                    return [
                        isUnknown
                            ? this.average(19.29, 19.8)
                            : isMale
                              ? 19.29
                              : 19.8,
                        isUnknown
                            ? this.average(15.43, 17.14)
                            : isMale
                              ? 15.43
                              : 17.14,
                        isUnknown
                            ? this.average(23.15, 22.46)
                            : isMale
                              ? 23.15
                              : 22.46,
                    ];
                case PubicSymphysis.Two:
                    return [
                        isUnknown
                            ? this.average(22.14, 23.2)
                            : isMale
                              ? 22.14
                              : 23.2,
                        isUnknown
                            ? this.average(18.42, 18.44)
                            : isMale
                              ? 18.42
                              : 18.44,
                        isUnknown
                            ? this.average(25.86, 27.96)
                            : isMale
                              ? 25.86
                              : 27.96,
                    ];
                case PubicSymphysis.Three:
                    return [
                        isUnknown
                            ? this.average(29.53, 31.44)
                            : isMale
                              ? 29.53
                              : 31.44,
                        isUnknown
                            ? this.average(16.27, 21.2)
                            : isMale
                              ? 16.27
                              : 21.2,
                        isUnknown
                            ? this.average(42.79, 41.68)
                            : isMale
                              ? 42.79
                              : 41.68,
                    ];
                case PubicSymphysis.Four:
                    return [
                        isUnknown
                            ? this.average(42.54, 43.26)
                            : isMale
                              ? 42.54
                              : 43.26,
                        isUnknown
                            ? this.average(24.94, 31.02)
                            : isMale
                              ? 24.94
                              : 37.36,
                        isUnknown
                            ? this.average(60.14, 55.5)
                            : isMale
                              ? 60.14
                              : 55.5,
                    ];
                case PubicSymphysis.Five:
                    return [
                        isUnknown
                            ? this.average(53.87, 51.47)
                            : isMale
                              ? 53.87
                              : 51.47,
                        isUnknown
                            ? this.average(37.03, 43.59)
                            : isMale
                              ? 37.03
                              : 43.59,
                        isUnknown
                            ? this.average(70.71, 59.35)
                            : isMale
                              ? 70.71
                              : 59.35,
                    ];
                case PubicSymphysis.Six:
                    return [
                        isUnknown
                            ? this.average(63.76, 72.34)
                            : isMale
                              ? 63.76
                              : 72.34,
                        isUnknown
                            ? this.average(47.64, 57.62)
                            : isMale
                              ? 47.64
                              : 57.62,
                        isUnknown
                            ? this.average(79.88, 87.06)
                            : isMale
                              ? 79.88
                              : 87.06,
                    ];
                case PubicSymphysis.Seven:
                    return [
                        isUnknown
                            ? this.average(77.0, 82.54)
                            : isMale
                              ? 77.0
                              : 81.2,
                        isUnknown
                            ? this.average(58.34, 67.72)
                            : isMale
                              ? 58.34
                              : 67.72,
                        isUnknown
                            ? this.average(95.66, 97.36)
                            : isMale
                              ? 95.66
                              : 97.36,
                    ];
                case PubicSymphysis.Unknown:
                    return [0, 0, 0]; // Default values if unknown
                default:
                    throw new Error('Invalid pubic symphysis phase');
            }
        };

        const getSternalEndValues = (
            data: SternalEnd,
        ): [number, number, number] => {
            switch (data) {
                case SternalEnd.One:
                    return [
                        isUnknown
                            ? this.average(20.0, 19.57)
                            : isMale
                              ? 20.0
                              : 19.57,
                        isUnknown
                            ? this.average(17.1, 16.23)
                            : isMale
                              ? 17.1
                              : 16.23,
                        isUnknown
                            ? this.average(22.9, 22.91)
                            : isMale
                              ? 22.9
                              : 22.91,
                    ];
                case SternalEnd.Two:
                    return [
                        isUnknown
                            ? this.average(24.63, 25.14)
                            : isMale
                              ? 24.63
                              : 25.14,
                        isUnknown
                            ? this.average(20.63, 22.8)
                            : isMale
                              ? 20.63
                              : 22.8,
                        isUnknown
                            ? this.average(28.63, 27.48)
                            : isMale
                              ? 28.63
                              : 27.48,
                    ];
                case SternalEnd.Three:
                    return [
                        isUnknown
                            ? this.average(32.27, 32.95)
                            : isMale
                              ? 32.27
                              : 32.95,
                        isUnknown
                            ? this.average(24.89, 26.61)
                            : isMale
                              ? 24.89
                              : 26.61,
                        isUnknown
                            ? this.average(39.65, 39.29)
                            : isMale
                              ? 39.65
                              : 39.29,
                    ];
                case SternalEnd.Four:
                    return [
                        isUnknown
                            ? this.average(42.43, 43.52)
                            : isMale
                              ? 42.43
                              : 43.52,
                        isUnknown
                            ? this.average(36.47, 37.36)
                            : isMale
                              ? 36.47
                              : 37.36,
                        isUnknown
                            ? this.average(48.39, 49.68)
                            : isMale
                              ? 48.39
                              : 49.68,
                    ];
                case SternalEnd.Five:
                    return [
                        isUnknown
                            ? this.average(52.05, 51.69)
                            : isMale
                              ? 52.05
                              : 51.69,
                        isUnknown
                            ? this.average(45.05, 45.07)
                            : isMale
                              ? 45.05
                              : 45.07,
                        isUnknown
                            ? this.average(59.05, 58.31)
                            : isMale
                              ? 59.05
                              : 58.31,
                    ];
                case SternalEnd.Six:
                    return [
                        isUnknown
                            ? this.average(63.13, 67.17)
                            : isMale
                              ? 63.13
                              : 67.17,
                        isUnknown
                            ? this.average(56.07, 60.35)
                            : isMale
                              ? 56.07
                              : 60.35,
                        isUnknown
                            ? this.average(70.19, 73.99)
                            : isMale
                              ? 70.19
                              : 73.99,
                    ];
                case SternalEnd.Seven:
                    return [
                        isUnknown
                            ? this.average(80.91, 81.2)
                            : isMale
                              ? 80.91
                              : 81.2,
                        isUnknown
                            ? this.average(67.71, 67.3)
                            : isMale
                              ? 67.71
                              : 67.3,
                        isUnknown
                            ? this.average(94.11, 95.1)
                            : isMale
                              ? 94.11
                              : 95.1,
                    ];
                case SternalEnd.Unknown:
                    return [0, 0, 0]; // Default values if unknown
                default:
                    throw new Error('Invalid pubic symphysis phase');
            }
        };

        const getAuricularSurfaceValues = (
            data: AuricularArea,
        ): [number, number, number] => {
            switch (data) {
                case AuricularArea.One:
                    return [21.1, 15.14, 27.06];
                case AuricularArea.Two:
                    return [29.5, 13.1, 45.9];
                case AuricularArea.Three:
                    return [42.0, 14.52, 69.48];
                case AuricularArea.Four:
                    return [47.8, 19.9, 75.7];
                case AuricularArea.Five:
                    return [53.1, 24.82, 81.38];
                case AuricularArea.Six:
                    return [58.9, 28.42, 89.38];
                case AuricularArea.Unknown:
                    return [0, 0, 0]; // Default values if unknown
                default:
                    throw new Error('Invalid pubic symphysis phase');
            }
        };

        const [S1, S2, S3] = getSymphysisValues(dataP1);
        const [S4, S5, S6] = getSymphysisValues(dataP2);

        const [S7, S8, S9] = getSternalEndValues(dataS1);
        const [S10, S11, S12] = getSternalEndValues(dataS2);

        const [S13, S14, S15] = getAuricularSurfaceValues(dataA1);
        const [S16, S17, S18] = getAuricularSurfaceValues(dataA2);

        this.results[Report.combined][`${side}`] = this.averageExpanded(
            S1,
            S4,
            S7,
            S10,
            S13,
            S16,
        );
        this.results[Report.combined][`${side}_min`] = Math.min(
            S2,
            S5,
            S8,
            S11,
            S14,
            S17,
        );
        this.results[Report.combined][`${side}_max`] = Math.max(
            S3,
            S6,
            S9,
            S12,
            S15,
            S18,
        );
    }
    */
    // analyzes third molar age based of the Mincer et al. 1993 chart
    private thirdMolar(
        data: ThirdMolar,
        side: Side,
        results: { [key: string]: { [key: string]: number } },
    ): void {
        if (
            side != Side.TL &&
            side != Side.TR &&
            side != Side.BL &&
            side != Side.BR
        )
            throw new Error('Invalid side for auricular surface analysis');

        switch (data) {
            case ThirdMolar.A:
            case ThirdMolar.B:
            case ThirdMolar.C:
            case ThirdMolar.D:
            case ThirdMolar.E:
            case ThirdMolar.F:
            case ThirdMolar.G:
                results[Report.thirdMolar][`${side}`] = 0;
                break;
            case ThirdMolar.H:
                results[Report.thirdMolar][`${side}`] = 18;
                break;
            case ThirdMolar.Unknown:
                break;
            case ThirdMolar.Error:
            default:
                throw new Error('Invalid third molar phase');
        }
    }

    // calculates the average of two numbers
    private average(v1: number, v2: number): number {
        return (v1 + v2) / 2.0;
    }

    private resetResults(): { [key: string]: { [key: string]: number } } {
        return JSON.parse(
            JSON.stringify({
                pubicSymphysis: {
                    L: -1,
                    L_min: -1,
                    L_max: -1,
                    R: -1,
                    R_min: -1,
                    R_max: -1,
                    C: -1,
                    C_min: -1,
                    C_max: -1,
                },
                sternalEnd: {
                    L: -1,
                    L_min: -1,
                    L_max: -1,
                    R: -1,
                    R_min: -1,
                    R_max: -1,
                    C: -1,
                    C_min: -1,
                    C_max: -1,
                },
                auricularSurface: {
                    L: -1,
                    L_min: -1,
                    L_max: -1,
                    R: -1,
                    R_min: -1,
                    R_max: -1,
                    C: -1,
                    C_min: -1,
                    C_max: -1,
                },
                /*
              combinedAll: {
                  CA: -1,
                  CA_min: -1,
                  CA_max: -1,
              },
              */
                thirdMolar: {
                    TL: -1,
                    TR: -1,
                    BL: -1,
                    BR: -1,
                },
            }),
        );
    }

    /*
    // calculates the average of six numbers
    private averageExpanded(
        v1: number,
        v2: number,
        v3: number,
        v4: number,
        v5: number,
        v6: number,
    ): number {
        return (v1 + v2 + v3 + v4 + v5 + v6) / 6.0;
    }
    */
}
