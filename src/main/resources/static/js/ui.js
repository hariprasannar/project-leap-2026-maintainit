const uiManager = {
    init() {
        this.setupNavigation();
        this.setupSidebar();
    },

    setupNavigation() {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active link
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Update title
                document.getElementById('topbar-title').innerText = link.querySelector('.links_name').innerText;

                // Show target section
                const targetId = link.getAttribute('data-target');
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');

                // Trigger data load based on section
                this.loadSectionData(targetId);
            });
        });
    },

    setupSidebar() {
        const sidebarBtn = document.querySelector('.sidebarBtn');
        const sidebar = document.querySelector('.sidebar');
        const homeSection = document.querySelector('.home-section');

        sidebarBtn.addEventListener('click', () => {
            if (sidebar.style.width === '0px' || sidebar.style.width === '') {
                sidebar.style.width = '250px';
                homeSection.style.width = 'calc(100% - 250px)';
                homeSection.style.left = '250px';
            } else {
                sidebar.style.width = '0';
                homeSection.style.width = '100%';
                homeSection.style.left = '0';
            }
        });
    },

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'dashboard-section':
                dashboardManager.loadData();
                break;
            case 'machines-section':
                machineManager.loadData();
                break;
            case 'technicians-section':
                technicianManager.loadData();
                break;
            case 'tasks-section':
                taskManager.loadData();
                break;
            case 'usage-section':
                usageManager.loadData();
                break;
        }
    },

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        // Reset the form if it exists within the modal
        const form = document.querySelector(`#${modalId} form`);
        if (form) form.reset();
        
        // Clear any ID fields for 'add' mode
        const idInputs = document.querySelectorAll(`#${modalId} input[type="number"][id$="-id"]`);
        idInputs.forEach(input => {
            input.disabled = false; // Re-enable if it was disabled for editing
        });
    },

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.innerText = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    },
    
    showLoading(tbodyId, colCount) {
        const tbody = document.getElementById(tbodyId);
        tbody.innerHTML = `<tr class="loading-row"><td colspan="${colCount}">Loading...</td></tr>`;
    },
    
    showNoData(tbodyId, colCount) {
        const tbody = document.getElementById(tbodyId);
        tbody.innerHTML = `<tr class="loading-row"><td colspan="${colCount}">No data available</td></tr>`;
    }
};
