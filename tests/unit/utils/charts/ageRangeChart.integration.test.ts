import { updateRangeBar } from '../../src/classes/charts/AgeRangeChart';

describe('Integration: updateRangeBar', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div style="position: relative; width: 100%">
                <div id="range-bar" style="height: 20px; background-color: #ccc;"></div>
            </div>
        `;
    });

    it('should visually move and size the bar between 25 and 75 age', () => {
        const rangeBar = document.getElementById('range-bar') as HTMLElement;

        updateRangeBar(25, 75, 'range-bar');

        // Integration focus: check if UI updates correctly from the DOM
        expect(rangeBar.style.position).toBe('absolute');
        expect(rangeBar.style.left).toBe('25%');
        expect(rangeBar.style.width).toBe('50%');
    });

    it('should leave the DOM untouched if ID is incorrect', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        updateRangeBar(10, 20, 'invalid-id');

        expect(consoleSpy).toHaveBeenCalledWith('Range bar elements not found.');
        consoleSpy.mockRestore();
    });

    it('should reflect an empty range visually (e.g., same min/max)', () => {
        updateRangeBar(60, 60, 'range-bar');

        const rangeBar = document.getElementById('range-bar') as HTMLElement;
        expect(rangeBar.style.left).toBe('60%');
        expect(rangeBar.style.width).toBe('0%');
    });
});
