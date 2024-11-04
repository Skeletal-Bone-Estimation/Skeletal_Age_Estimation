const { PageController } = require('../dist/controllers/PageController');

console.log('renderer loaded');

window.addEventListener('DOMContentLoaded', async () => {
    const pageController = new PageController()
    await pageController.loadPage('home');
})