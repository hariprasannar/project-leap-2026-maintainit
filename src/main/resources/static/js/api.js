const API_BASE = 'http://localhost:8080';

const api = {
    async request(endpoint, method = 'GET', data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, options);
            
            // For DELETE methods that return 204 or empty content
            if (response.status === 204 || response.status === 200 && method === 'DELETE') {
                return null; // Some spring boot implementations return 200 without content for delete
            }

            const text = await response.text();
            let json = null;
            if (text) {
                json = JSON.parse(text);
            }

            if (!response.ok) {
                const errorMsg = json && json.error ? json.error : `Request failed with status ${response.status}`;
                throw new Error(errorMsg);
            }

            return json;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Machines
    getMachines: () => api.request('/machines'),
    getMachine: (id) => api.request(`/machines/${id}`),
    createMachine: (data) => api.request('/machines', 'POST', data),
    updateMachine: (id, data) => api.request(`/machines/${id}`, 'PUT', data),
    deleteMachine: (id) => api.request(`/machines/${id}`, 'DELETE'),
    getMachineMaintenanceStatus: (id) => api.request(`/machines/${id}/maintenance-status`),

    // Technicians
    getTechnicians: () => api.request('/technicians'),
    getTechnician: (id) => api.request(`/technicians/${id}`),
    createTechnician: (data) => api.request('/technicians', 'POST', data),
    updateTechnician: (id, data) => api.request(`/technicians/${id}`, 'PUT', data),
    deleteTechnician: (id) => api.request(`/technicians/${id}`, 'DELETE'),

    // Maintenance Tasks
    getTasks: () => api.request('/tasks'),
    getTask: (id) => api.request(`/tasks/${id}`),
    createTask: (data) => api.request('/tasks', 'POST', data),
    updateTask: (id, data) => api.request(`/tasks/${id}`, 'PUT', data),
    deleteTask: (id) => api.request(`/tasks/${id}`, 'DELETE'),
    getTaskStatus: (id) => api.request(`/tasks/${id}/status`),
    getTasksByMachine: (machineId) => api.request(`/tasks/machine/${machineId}`),

    // Usage Logs
    getUsageLogs: () => api.request('/usage'),
    getUsageLog: (id) => api.request(`/usage/${id}`),
    createUsageLog: (data) => api.request('/usage', 'POST', data),
    updateUsageLog: (id, data) => api.request(`/usage/${id}`, 'PUT', data),
    deleteUsageLog: (id) => api.request(`/usage/${id}`, 'DELETE')
};
