export function updateRangeBar(
    minAge: number,
    maxAge: number,
    minAge2: number,
    maxAge2: number,
    minAge3: number,
    maxAge3: number,
    minAge4: number,
    maxAge4: number,
    minAge5: number,
    maxAge5: number,
    minAge6: number,
    maxAge6: number,
): void {
    const totalRange = 100;
    const rangeBar1 = document.querySelector('#bar1') as HTMLElement | null;
    const rangeBar2 = document.querySelector('#bar2') as HTMLElement | null;
    const rangeBar3 = document.querySelector('#bar3') as HTMLElement | null;
    const rangeBar4 = document.querySelector('#bar4') as HTMLElement | null;
    const rangeBar5 = document.querySelector('#bar5') as HTMLElement | null;
    const rangeBar6 = document.querySelector('#bar6') as HTMLElement | null;

    if (
        !rangeBar1 ||
        !rangeBar2 ||
        !rangeBar3 ||
        !rangeBar4 ||
        !rangeBar5 ||
        !rangeBar6
    ) {
        console.error('Range bar elements not found.');
        return;
    }

    // Calculate left and width percentages for both bars
    const leftPercentage1: number = (minAge / totalRange) * 100;
    const widthPercentage1: number = ((maxAge - minAge) / totalRange) * 100;

    const leftPercentage2: number = (minAge2 / totalRange) * 100;
    const widthPercentage2: number = ((maxAge2 - minAge2) / totalRange) * 100;
    // Calculate left and width percentages for both bars
    const leftPercentage3: number = (minAge3 / totalRange) * 100;
    const widthPercentage3: number = ((maxAge3 - minAge3) / totalRange) * 100;

    const leftPercentage4: number = (minAge4 / totalRange) * 100;
    const widthPercentage4: number = ((maxAge4 - minAge4) / totalRange) * 100;

    // Calculate left and width percentages for both bars
    const leftPercentage5: number = (minAge5 / totalRange) * 100;
    const widthPercentage5: number = ((maxAge5 - minAge5) / totalRange) * 100;

    const leftPercentage6: number = (minAge6 / totalRange) * 100;
    const widthPercentage6: number = ((maxAge6 - minAge6) / totalRange) * 100;

    // Set the styles for the first range bar
    rangeBar1.style.position = 'absolute';
    rangeBar1.style.left = `${leftPercentage1}%`;
    rangeBar1.style.width = `${widthPercentage1}%`;

    // Set the styles for the second range bar
    rangeBar2.style.position = 'absolute';
    rangeBar2.style.left = `${leftPercentage2}%`;
    rangeBar2.style.width = `${widthPercentage2}%`;

    // Set the styles for the first range bar
    rangeBar3.style.position = 'absolute';
    rangeBar3.style.left = `${leftPercentage3}%`;
    rangeBar3.style.width = `${widthPercentage3}%`;

    // Set the styles for the second range bar
    rangeBar4.style.position = 'absolute';
    rangeBar4.style.left = `${leftPercentage4}%`;
    rangeBar4.style.width = `${widthPercentage4}%`;

    // Set the styles for the first range bar
    rangeBar5.style.position = 'absolute';
    rangeBar5.style.left = `${leftPercentage5}%`;
    rangeBar5.style.width = `${widthPercentage5}%`;

    // Set the styles for the second range bar
    rangeBar6.style.position = 'absolute';
    rangeBar6.style.left = `${leftPercentage6}%`;
    rangeBar6.style.width = `${widthPercentage6}%`;
}
