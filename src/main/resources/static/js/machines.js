const machineManager = {
    isEditMode: false,

    async loadData() {
        uiManager.showLoading('machines-table-body', 7);
        try {
            const machines = await api.getMachines();
            const tbody = document.getElementById('machines-table-body');
            
            if (machines.length === 0) {
                uiManager.showNoData('machines-table-body', 7);
                return;
            }

            tbody.innerHTML = '';
            machines.forEach(machine => {
                const tr = document.createElement('tr');
                let statusBadge = '';
                if (machine.usageHours >= machine.maintenanceInterval) {
                    statusBadge = '<span class="badge badge-danger">Maintenance Due</span>';
                } else {
                    statusBadge = '<span class="badge badge-success">Maintenance Not Due</span>';
                }

                tr.innerHTML = `
                    <td>${machine.id}</td>
                    <td>${machine.name}</td>
                    <td>${machine.maintenanceInterval}</td>
                    <td>${machine.intervalType}</td>
                    <td>${machine.usageHours}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-secondary btn-action" onclick="machineManager.checkStatus(${machine.id})">Check Status</button>
                        <button class="btn btn-primary btn-action" onclick="machineManager.showEditModal(${machine.id})">Edit</button>
                        <button class="btn btn-danger btn-action" onclick="machineManager.delete(${machine.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            uiManager.showToast('Failed to load machines', 'error');
            uiManager.showNoData('machines-table-body', 7);
        }
    },

    showAddModal() {
        this.isEditMode = false;
        document.getElementById('machine-modal-title').innerText = 'Add Machine';
        document.getElementById('machine-id').disabled = false;
        uiManager.showModal('machine-modal');
    },

    async showEditModal(id) {
        try {
            const machine = await api.getMachine(id);
            this.isEditMode = true;
            
            document.getElementById('machine-modal-title').innerText = 'Edit Machine';
            
            const idInput = document.getElementById('machine-id');
            idInput.value = machine.id;
            idInput.disabled = true; // Cannot edit ID

            document.getElementById('machine-name').value = machine.name;
            document.getElementById('machine-interval').value = machine.maintenanceInterval;
            document.getElementById('machine-type').value = machine.intervalType;
            document.getElementById('machine-usage').value = machine.usageHours;

            uiManager.showModal('machine-modal');
        } catch (error) {
            uiManager.showToast('Failed to fetch machine details', 'error');
        }
    },

    async save(event) {
        event.preventDefault();
        
        const data = {
            id: parseInt(document.getElementById('machine-id').value),
            name: document.getElementById('machine-name').value.trim(),
            maintenanceInterval: parseInt(document.getElementById('machine-interval').value),
            intervalType: document.getElementById('machine-type').value,
            usageHours: parseInt(document.getElementById('machine-usage').value)
        };

        if (data.id <= 0) return uiManager.showToast('ID must be greater than 0', 'error');
        if (!data.name) return uiManager.showToast('Name cannot be empty', 'error');
        if (data.maintenanceInterval <= 0) return uiManager.showToast('Interval must be greater than 0', 'error');
        if (data.usageHours < 0) return uiManager.showToast('Usage hours cannot be negative', 'error');

        try {
            if (this.isEditMode) {
                await api.updateMachine(data.id, data);
                uiManager.showToast('Machine updated successfully');
            } else {
                await api.createMachine(data);
                uiManager.showToast('Machine created successfully');
            }
            uiManager.closeModal('machine-modal');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    },

    async delete(id) {
        if (!confirm(`Are you sure you want to delete machine ${id}?`)) return;

        try {
            await api.deleteMachine(id);
            uiManager.showToast('Machine deleted successfully');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    },

    async checkStatus(id) {
        try {
            const status = await api.getMachineMaintenanceStatus(id);
            alert(`Machine ID: ${id}\nStatus: ${status}`);
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    }
};
