import { DataController } from '../controllers/DataController';

export class Autonumberer {
    private existingValues: string[] = [];
    private static instance: Autonumberer; // singleton instance of this class

    private constructor() {
        this.existingValues = this.getExistingValues();
    }

    /**
     * Retrieves the singleton instance of the Autonumberer class.
     * @returns The singleton instance.
     */
    public static getInstance(): Autonumberer {
        if (!this.instance) {
            Autonumberer.instance = new Autonumberer();
        }
        return Autonumberer.instance;
    }

    /**
     * Generates a string based on a letter and number sequentially.
     * @param letter The letter to use.
     * @param number The number to use.
     * @returns The generated string.
     */
    private generateString(letter: string, number: number): string {
        return `${letter}${number}`;
    }

    /**
     * Checks if a value is already taken.
     * @param value The value to check.
     * @returns True if the value is taken, false otherwise.
     */
    private isValueTaken(value: string): boolean {
        return this.existingValues.includes(value);
    }

    /**
     * Gets the existing report IDs and returns them as an array.
     * @returns An array of existing report IDs.
     */
    private getExistingValues(): string[] {
        return Object.values(DataController.getInstance().getReports()).map(
            (report) => report.id,
        );
    }

    /**
     * Updates the existing values array.
     */
    public updateExistingValues(): void {
        this.existingValues = this.getExistingValues();
    }

    /**
     * Generates the next available report ID.
     * @returns The next available report ID, or null if all IDs are taken.
     */
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
