const taskManager = {
    isEditMode: false,

    async loadData() {
        uiManager.showLoading('tasks-table-body', 7);
        try {
            const tasks = await api.getTasks();
            const tbody = document.getElementById('tasks-table-body');
            
            if (tasks.length === 0) {
                uiManager.showNoData('tasks-table-body', 7);
                return;
            }

            tbody.innerHTML = '';
            tasks.forEach(task => {
                const tr = document.createElement('tr');
                let badgeClass = 'badge-warning';
                if (task.status === 'COMPLETED') badgeClass = 'badge-success';
                else if (task.status === 'IN_PROGRESS') badgeClass = 'badge-primary';

                tr.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.machineId}</td>
                    <td>${task.technicianId}</td>
                    <td>${task.taskName}</td>
                    <td>${task.dueDate}</td>
                    <td><span class="badge ${badgeClass}">${task.status}</span></td>
                    <td>
                        <button class="btn btn-secondary btn-action" onclick="taskManager.checkStatus(${task.id})">Status</button>
                        <button class="btn btn-primary btn-action" onclick="taskManager.showEditModal(${task.id})">Edit</button>
                        <button class="btn btn-danger btn-action" onclick="taskManager.delete(${task.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            uiManager.showToast('Failed to load tasks', 'error');
            uiManager.showNoData('tasks-table-body', 7);
        }
    },

    showAddModal() {
        this.isEditMode = false;
        document.getElementById('task-modal-title').innerText = 'Add Maintenance Task';
        document.getElementById('task-id').disabled = false;
        uiManager.showModal('task-modal');
    },

    async showEditModal(id) {
        try {
            const task = await api.getTask(id);
            this.isEditMode = true;
            
            document.getElementById('task-modal-title').innerText = 'Edit Task';
            
            const idInput = document.getElementById('task-id');
            idInput.value = task.id;
            idInput.disabled = true;

            document.getElementById('task-machine-id').value = task.machineId;
            document.getElementById('task-tech-id').value = task.technicianId;
            document.getElementById('task-name').value = task.taskName;
            document.getElementById('task-date').value = task.dueDate;
            document.getElementById('task-status').value = task.status;

            uiManager.showModal('task-modal');
        } catch (error) {
            uiManager.showToast('Failed to fetch task details', 'error');
        }
    },

    async save(event) {
        event.preventDefault();
        
        const data = {
            id: parseInt(document.getElementById('task-id').value),
            machineId: parseInt(document.getElementById('task-machine-id').value),
            technicianId: parseInt(document.getElementById('task-tech-id').value),
            taskName: document.getElementById('task-name').value.trim(),
            dueDate: document.getElementById('task-date').value,
            status: document.getElementById('task-status').value
        };

        if (data.id <= 0) return uiManager.showToast('ID must be > 0', 'error');
        if (data.machineId <= 0) return uiManager.showToast('Machine ID must be > 0', 'error');
        if (data.technicianId <= 0) return uiManager.showToast('Technician ID must be > 0', 'error');
        if (!data.taskName) return uiManager.showToast('Task name required', 'error');
        if (!data.dueDate) return uiManager.showToast('Due date required', 'error');

        try {
            if (this.isEditMode) {
                await api.updateTask(data.id, data);
                uiManager.showToast('Task updated successfully');
            } else {
                await api.createTask(data);
                uiManager.showToast('Task created successfully');
            }
            uiManager.closeModal('task-modal');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    },

    async delete(id) {
        if (!confirm(`Are you sure you want to delete task ${id}?`)) return;

        try {
            await api.deleteTask(id);
            uiManager.showToast('Task deleted successfully');
            this.loadData();
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    },
    
    async checkStatus(id) {
        try {
            const status = await api.getTaskStatus(id);
            alert(`Task ID: ${id}\nStatus: ${status}`);
        } catch (error) {
            uiManager.showToast(error.message, 'error');
        }
    }
};
