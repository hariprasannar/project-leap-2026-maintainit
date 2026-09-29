const technicianManager = {
    isEditMode: false,

    async loadData() {
        uiManager.showLoading('technicians-table-body', 5);
        try {
            const technicians = await api.getTechnicians();
            const tbody = document.getElementById('technicians-table-body');
            
            if (technicians.length === 0) {
                uiManager.showNoData('technicians-table-body', 5);
                return;
            }

            tbody.innerHTML = '';
            technicians.forEach(tech => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${tech.id}</td>
                    <td>${tech.name}</td>
                    <td>${tech.specialization}</td>
                    <td>${tech.phone}</td>
                    <td>
                        <button class="btn btn-primary btn-action" onclick="technicianManager.showEditModal(${tech.id})">Edit</button>
                        <button class="btn btn-danger btn-action" onclick="technicianManager.delete(${tech.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            uiManager.showToast('Failed to load technicians', 'error');
            uiManager.showNoData('technicians-table-body', 5);
        }
    },

    showAddModal() {
        this.isEditMode = false;
        document.getElementById('technician-modal-title').innerText = 'Add Technician';
        document.getElementById('tech-id').disabled = false;
        uiManager.showModal('technician-modal');
    },

    async showEditModal(id) {
        try {
            const tech = await api.getTechnician(id);
            this.isEditMode = true;
            
            document.getElementById('technician-modal-title').innerText = 'Edit Technician';
            
            const idInput = document.getElementById('tech-id');
            idInput.value = tech.id;
            idInput.disabled = true;

            document.getElementById('tech-name').value = tech.name;
            document.getElementById('tech-spec').value = tech.specialization;
            document.getElementById('tech-phone').value = tech.phone;

            uiManager.showModal('technician-modal');
        } catch (error) {
            uiManager.showToast('Failed to fetch technician details', 'error');
        }
    },

    async save(event) {
        event.preventDefault();
        
        const data = {
            id: parseInt(document.getElementById('tech-id').value),
            name: document.getElementById('tech-name').value.trim(),
            specialization: document.getElementById('tech-spec').value.trim(),
            phone: document.getElementById('tech-phone').value.trim()
        };

        if (data.id <= 0) return uiManager.showToast('ID must be greater than 0', 'error');
        if (!data.name) return uiManager.showToast('Name cannot be empty', 'error');
        if (!data.specialization) return uiManager.showToast('Specialization cannot be empty', 'error');
        if (!data.phone) return uiManager.showToast('Phone cannot be empty', 'error');

        try {
            if (this.isEditMode) {
                await api.updateTechnician(data.id, data);
                uiManager.showToast('Technician updated successfully');
            } else {
                await api.createTechnician(data);
                uiManager.showToast('Technician created successfully');
            }
            uiManager.closeModal('technician-modal');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    },

    async delete(id) {
        if (!confirm(`Are you sure you want to delete technician ${id}?`)) return;

        try {
            await api.deleteTechnician(id);
            uiManager.showToast('Technician deleted successfully');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    }
};
