// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

const { PageController } = require('./dist/controllers/PageController');

//console.log('renderer loaded');

window.addEventListener('DOMContentLoaded', async () => {
    const pageController = PageController.getInstance();
    await pageController.navigateTo('home');
});
