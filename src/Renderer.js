const { PageController } = require("./controllers/PageController");
const { SystemController } = require("./controllers/SystemController");

window.addEventListener('DOMContentLoaded', async () => {
    const document = (window).api.getDocument();
    PageController.getInstance(document).initialize();
    await SystemController.getInstance().initialize();
});