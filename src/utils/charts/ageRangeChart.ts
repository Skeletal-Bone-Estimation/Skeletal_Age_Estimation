export function updateRangeBar(
    minAge: number,
    maxAge: number,
    id: string,
): void {
    const totalRange = 100;
    const rangeBar = document.querySelector(
        `#${CSS.escape(id)}`,
    ) as HTMLElement | null;

    if (!rangeBar) {
        console.error('Range bar elements not found.');
        return;
    }

    // Calculate left and width percentages for both bars
    const leftPercentage: number = (minAge / totalRange) * 100;
    const widthPercentage: number = ((maxAge - minAge) / totalRange) * 100;

    // Set the styles for the first range bar
    rangeBar.style.position = 'absolute';
    rangeBar.style.left = `${leftPercentage}%`;
    rangeBar.style.width = `${widthPercentage}%`;
}