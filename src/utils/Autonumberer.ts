import { DataController } from '../controllers/DataController';

export class Autonumberer {
    private existingValues: string[] = [];
    private static instance: Autonumberer; // singleton instance of this class

    private constructor() {
        this.existingValues = this.getExistingValues();
    }

    public static getInstance(): Autonumberer {
        if (!this.instance) {
            Autonumberer.instance = new Autonumberer();
        }
        return Autonumberer.instance;
    }

    // generates a string based on a letter and number sequentially
    private generateString(letter: string, number: number): string {
        return `${letter}${number}`;
    }

    // checks if a value is already taken
    private isValueTaken(value: string): boolean {
        return this.existingValues.includes(value);
    }

    // gets the existing report ids and returns them as an array
    private getExistingValues(): string[] {
        return Object.values(DataController.getInstance().getReports()).map(
            (report) => report.id,
        );
    }

    // updates the existing values array
    public updateExistingValues(): void {
        this.existingValues = this.getExistingValues();
    }

    // generates the next available report id
    public generateNext(): string | null {
        for (var charCode = 65; charCode <= 90; charCode++) {
            const letter = String.fromCharCode(charCode);

            for (var num = 1; num <= 99; num++) {
                const newValue = this.generateString(letter, num);

                if (!this.isValueTaken(newValue)) {
                    this.existingValues.push(newValue);
                    return newValue;
                }
            }
        }
        return null; // fails at report # 2575
    }
}
