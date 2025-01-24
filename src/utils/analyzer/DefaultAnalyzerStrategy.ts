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
    private results: { [key: string]: { [key: string]: number } };

    constructor(sex: Sex, affinity: Affinity) {
        super(sex, affinity);

        // report view will ignore default sentinel value of -1
        this.results = {
            pubicSymphysis: {
                L: -1,
                L_min: -1,
                L_max: -1,
                R: -1,
                R_min: -1,
                R_max: -1,
            },
            sternalEnd: {
                L: -1,
                L_min: -1,
                L_max: -1,
                R: -1,
                R_min: -1,
                R_max: -1,
            },
            auricularSurface: {
                L: -1,
                L_min: -1,
                L_max: -1,
                R: -1,
                R_min: -1,
                R_max: -1,
            },
            thirdMolar: {
                TL: -1,
                TR: -1,
                BL: -1,
                BR: -1,
            },
        };
    }

    // implemented abstract analysis method inherited from parent
    public executeAnalysis(_case: CaseModel): {
        [key: string]: { [key: string]: number };
    } {
        var isMale: boolean = false;
        var isUnknown: boolean = false;

        if (this.sex == Sex.Male) isMale = true;
        else if (this.sex == Sex.Unknown) isUnknown = true;

        this.pubicSymphysis(_case.pubicSymphysisL, Side.L, isMale, isUnknown);
        this.pubicSymphysis(_case.pubicSymphysisR, Side.R, isMale, isUnknown);
        this.sternalEnd(_case.fourthRibL, Side.L, isMale, isUnknown);
        this.sternalEnd(_case.fourthRibR, Side.R, isMale, isUnknown);
        this.auricularSurface(_case.auricularAreaL, Side.L);
        this.auricularSurface(_case.auricularAreaR, Side.R);
        this.thirdMolar(_case.thirdMolarTL, Side.TL);
        this.thirdMolar(_case.thirdMolarTR, Side.TR);
        this.thirdMolar(_case.thirdMolarBL, Side.BL);
        this.thirdMolar(_case.thirdMolarBR, Side.BR);

        return this.results;
    }

    // analyzes pubic symphysis age based off the Hartnett 2010 chart, discriminating male and female while
    // calculating an average for cases with an unknown sex
    private pubicSymphysis(
        data: PubicSymphysis,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
    ): void {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for pubic symphysis analysis');

        switch (data) {
            case PubicSymphysis.One:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(19.29, 19.8)
                    : isMale
                      ? 19.29
                      : 19.8;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(15.43, 17.14)
                    : isMale
                      ? 15.43
                      : 17.14;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(23.15, 22.46)
                    : isMale
                      ? 23.15
                      : 22.46;
                break;
            case PubicSymphysis.Two:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(22.14, 23.2)
                    : isMale
                      ? 22.14
                      : 23.2;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(18.42, 18.44)
                    : isMale
                      ? 18.42
                      : 18.44;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(25.86, 27.96)
                    : isMale
                      ? 25.86
                      : 27.96;
                break;
            case PubicSymphysis.Three:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(29.53, 31.44)
                    : isMale
                      ? 29.53
                      : 31.44;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(16.27, 21.2)
                    : isMale
                      ? 16.27
                      : 21.2;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(42.79, 41.68)
                    : isMale
                      ? 42.79
                      : 41.68;
                break;
            case PubicSymphysis.Four:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(42.54, 43.26)
                    : isMale
                      ? 42.54
                      : 43.26;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(24.94, 31.02)
                    : isMale
                      ? 24.94
                      : 37.36;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(60.14, 55.5)
                    : isMale
                      ? 60.14
                      : 55.5;
                break;
            case PubicSymphysis.Five:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(53.87, 51.47)
                    : isMale
                      ? 53.87
                      : 51.47;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(37.03, 43.59)
                    : isMale
                      ? 37.03
                      : 43.59;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(70.71, 59.35)
                    : isMale
                      ? 70.71
                      : 59.35;
                break;
            case PubicSymphysis.Six:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(63.76, 72.34)
                    : isMale
                      ? 63.76
                      : 72.34;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(47.64, 57.62)
                    : isMale
                      ? 47.64
                      : 57.62;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
                    ? this.average(79.88, 87.06)
                    : isMale
                      ? 79.88
                      : 87.06;
                break;
            case PubicSymphysis.Seven:
                this.results[Report.pubicSymphysis][`${side}`] = isUnknown
                    ? this.average(77.0, 82.54)
                    : isMale
                      ? 77.0
                      : 81.2;
                this.results[Report.pubicSymphysis][`${side}_min`] = isUnknown
                    ? this.average(58.34, 67.72)
                    : isMale
                      ? 58.34
                      : 67.72;
                this.results[Report.pubicSymphysis][`${side}_max`] = isUnknown
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

    // analyzes sternal end age based of the Hartnett 2010 chart, discriminating male and female while
    // calculating an average for cases with an unknown sex
    private sternalEnd(
        data: SternalEnd,
        side: Side,
        isMale: boolean,
        isUnknown: boolean,
    ): void {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for sternal end analysis');

        switch (data) {
            case SternalEnd.One:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(20.0, 19.57)
                    : isMale
                      ? 20.0
                      : 19.57;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(17.1, 16.23)
                    : isMale
                      ? 17.1
                      : 16.23;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(22.9, 22.91)
                    : isMale
                      ? 22.9
                      : 22.91;
                break;
            case SternalEnd.Two:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(24.63, 25.14)
                    : isMale
                      ? 24.63
                      : 25.14;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(20.63, 22.8)
                    : isMale
                      ? 20.63
                      : 22.8;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(28.63, 27.48)
                    : isMale
                      ? 28.63
                      : 27.48;
                break;
            case SternalEnd.Three:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(32.27, 32.95)
                    : isMale
                      ? 32.27
                      : 32.95;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(24.89, 26.61)
                    : isMale
                      ? 24.89
                      : 26.61;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(39.65, 39.29)
                    : isMale
                      ? 39.65
                      : 39.29;
                break;
            case SternalEnd.Four:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(42.43, 43.52)
                    : isMale
                      ? 42.43
                      : 43.52;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(36.47, 37.36)
                    : isMale
                      ? 36.47
                      : 37.36;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(48.39, 49.68)
                    : isMale
                      ? 48.39
                      : 49.68;
                break;
            case SternalEnd.Five:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(52.05, 51.69)
                    : isMale
                      ? 52.05
                      : 51.69;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(45.05, 45.07)
                    : isMale
                      ? 45.05
                      : 45.07;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(59.05, 58.31)
                    : isMale
                      ? 59.05
                      : 58.31;
                break;
            case SternalEnd.Six:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(63.13, 67.17)
                    : isMale
                      ? 63.13
                      : 67.17;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(56.07, 60.35)
                    : isMale
                      ? 56.07
                      : 60.35;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
                    ? this.average(70.19, 73.99)
                    : isMale
                      ? 70.19
                      : 73.99;
                break;
            case SternalEnd.Seven:
                this.results[Report.sternalEnd][`${side}`] = isUnknown
                    ? this.average(80.91, 81.2)
                    : isMale
                      ? 80.91
                      : 81.2;
                this.results[Report.sternalEnd][`${side}_min`] = isUnknown
                    ? this.average(67.71, 67.3)
                    : isMale
                      ? 67.71
                      : 67.3;
                this.results[Report.sternalEnd][`${side}_max`] = isUnknown
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

    // analyzes auricular surface age based of the Osborne et al. 2004 chart
    private auricularSurface(data: AuricularArea, side: Side): void {
        if (side != Side.L && side != Side.R)
            throw new Error('Invalid side for auricular surface analysis');

        switch (data) {
            case AuricularArea.One:
                this.results[Report.auricularSurface][`${side}`] = 21.1;
                this.results[Report.auricularSurface][`${side}_min`] = 15.14;
                this.results[Report.auricularSurface][`${side}_max`] = 27.06;
                break;
            case AuricularArea.Two:
                this.results[Report.auricularSurface][`${side}`] = 29.5;
                this.results[Report.auricularSurface][`${side}_min`] = 13.1;
                this.results[Report.auricularSurface][`${side}_max`] = 45.9;
                break;
            case AuricularArea.Three:
                this.results[Report.auricularSurface][`${side}`] = 42.0;
                this.results[Report.auricularSurface][`${side}_min`] = 14.52;
                this.results[Report.auricularSurface][`${side}_max`] = 69.48;
                break;
            case AuricularArea.Four:
                this.results[Report.auricularSurface][`${side}`] = 47.8;
                this.results[Report.auricularSurface][`${side}_min`] = 19.9;
                this.results[Report.auricularSurface][`${side}_max`] = 75.7;
                break;
            case AuricularArea.Five:
                this.results[Report.auricularSurface][`${side}`] = 53.1;
                this.results[Report.auricularSurface][`${side}_min`] = 24.82;
                this.results[Report.auricularSurface][`${side}_max`] = 81.38;
                break;
            case AuricularArea.Six:
                this.results[Report.auricularSurface][`${side}`] = 58.9;
                this.results[Report.auricularSurface][`${side}_min`] = 28.42;
                this.results[Report.auricularSurface][`${side}_max`] = 89.38;
                break;
            case AuricularArea.Unknown:
                break;
            case AuricularArea.Error:
            default:
                throw new Error('Invalid auricular surface phase');
        }
    }

    // analyzes third molar age based of the Mincer et al. 1993 chart
    private thirdMolar(data: ThirdMolar, side: Side): void {
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
                this.results[Report.thirdMolar][`${side}`] = 0;
                break;
            case ThirdMolar.H:
                this.results[Report.thirdMolar][`${side}`] = 18;
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
}
