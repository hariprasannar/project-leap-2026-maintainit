const dashboardManager = {
    async loadData() {
        try {
            const [machines, technicians, tasks] = await Promise.all([
                api.getMachines().catch(() => []),
                api.getTechnicians().catch(() => []),
                api.getTasks().catch(() => [])
            ]);

            // Update stats
            document.getElementById('dash-total-machines').innerText = machines.length;
            document.getElementById('dash-total-technicians').innerText = technicians.length;
            document.getElementById('dash-total-tasks').innerText = tasks.length;

            // Calculate maintenance due
            let maintenanceDueCount = 0;
            const dueMachinesHtml = [];

            machines.forEach(machine => {
                if (machine.usageHours >= machine.maintenanceInterval) {
                    maintenanceDueCount++;
                    dueMachinesHtml.push(`
                        <div class="list-item">
                            <div class="item-info">
                                <strong>${machine.name} (ID: ${machine.id})</strong>
                                <span>Usage: ${machine.usageHours} / ${machine.maintenanceInterval} ${machine.intervalType}</span>
                            </div>
                            <span class="badge badge-danger">Maintenance Due</span>
                        </div>
                    `);
                }
            });

            document.getElementById('dash-maintenance-due').innerText = maintenanceDueCount;
            
            const dueList = document.getElementById('dash-machines-due-list');
            if (dueMachinesHtml.length > 0) {
                dueList.innerHTML = dueMachinesHtml.join('');
            } else {
                dueList.innerHTML = '<p style="color: var(--text-light)">No machines currently require maintenance.</p>';
            }

            // Recent tasks (last 5)
            const recentTasksHtml = [];
            const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 5);
            
            if (recentTasks.length > 0) {
                recentTasks.forEach(task => {
                    let badgeClass = 'badge-warning';
                    if (task.status === 'COMPLETED') badgeClass = 'badge-success';
                    
                    recentTasksHtml.push(`
                        <li>
                            <a href="#">
                                <span class="task">${task.taskName} (Machine: ${task.machineId})</span>
                            </a>
                            <span class="badge ${badgeClass}">${task.status}</span>
                        </li>
                    `);
                });
                document.getElementById('dash-recent-tasks').innerHTML = recentTasksHtml.join('');
            } else {
                document.getElementById('dash-recent-tasks').innerHTML = '<li style="color: var(--text-light)">No recent tasks</li>';
            }

        } catch (error) {
            uiManager.showToast('Error loading dashboard data', 'error');
        }
    }
};
