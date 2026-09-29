document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI, sidebar, and navigation events
    uiManager.init();

    // Load initial data for dashboard
    uiManager.loadSectionData('dashboard-section');
});