const usageManager = {
    isEditMode: false,

    async loadData() {
        uiManager.showLoading('usage-table-body', 5);
        try {
            const logs = await api.getUsageLogs();
            const tbody = document.getElementById('usage-table-body');
            
            if (logs.length === 0) {
                uiManager.showNoData('usage-table-body', 5);
                return;
            }

            tbody.innerHTML = '';
            logs.forEach(log => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${log.id}</td>
                    <td>${log.machineId}</td>
                    <td>${log.logDate}</td>
                    <td>${log.usageHours}</td>
                    <td>
                        <button class="btn btn-primary btn-action" onclick="usageManager.showEditModal(${log.id})">Edit</button>
                        <button class="btn btn-danger btn-action" onclick="usageManager.delete(${log.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            uiManager.showToast('Failed to load usage logs', 'error');
            uiManager.showNoData('usage-table-body', 5);
        }
    },

    showAddModal() {
        this.isEditMode = false;
        document.getElementById('usage-modal-title').innerText = 'Add Usage Log';
        document.getElementById('usage-id').disabled = false;
        uiManager.showModal('usage-modal');
    },

    async showEditModal(id) {
        try {
            const log = await api.getUsageLog(id);
            this.isEditMode = true;
            
            document.getElementById('usage-modal-title').innerText = 'Edit Usage Log';
            
            const idInput = document.getElementById('usage-id');
            idInput.value = log.id;
            idInput.disabled = true;

            document.getElementById('usage-machine-id').value = log.machineId;
            document.getElementById('usage-date').value = log.logDate;
            document.getElementById('usage-hours').value = log.usageHours;

            uiManager.showModal('usage-modal');
        } catch (error) {
            uiManager.showToast('Failed to fetch log details', 'error');
        }
    },

    async save(event) {
        event.preventDefault();
        
        const data = {
            id: parseInt(document.getElementById('usage-id').value),
            machineId: parseInt(document.getElementById('usage-machine-id').value),
            logDate: document.getElementById('usage-date').value,
            usageHours: parseInt(document.getElementById('usage-hours').value)
        };

        if (data.id <= 0) return uiManager.showToast('ID must be > 0', 'error');
        if (data.machineId <= 0) return uiManager.showToast('Machine ID must be > 0', 'error');
        if (!data.logDate) return uiManager.showToast('Log date required', 'error');
        if (data.usageHours <= 0) return uiManager.showToast('Usage hours must be > 0', 'error');

        try {
            if (this.isEditMode) {
                await api.updateUsageLog(data.id, data);
                uiManager.showToast('Usage log updated successfully');
            } else {
                await api.createUsageLog(data);
                uiManager.showToast('Usage log created successfully');
            }
            uiManager.closeModal('usage-modal');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    },

    async delete(id) {
        if (!confirm(`Are you sure you want to delete usage log ${id}?`)) return;

        try {
            await api.deleteUsageLog(id);
            uiManager.showToast('Usage log deleted successfully');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    }
};
