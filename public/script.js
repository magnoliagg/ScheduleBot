document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scheduleForm');
    const schedulesDiv = document.getElementById('schedules');

    loadSchedules();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        fetch('/api/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, date, time })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                form.reset();
                loadSchedules();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add schedule');
        });
    });

    function loadSchedules() {
        fetch('/api/schedules')
        .then(response => response.json())
        .then(schedules => {
            schedulesDiv.innerHTML = '';

            if (schedules.length === 0) {
                schedulesDiv.innerHTML = '<p>No schedules found. Add your first schedule above!</p>';
                return;
            }

            schedules.forEach(schedule => {
                const scheduleDiv = document.createElement('div');
                scheduleDiv.className = 'schedule-item';
                const createdDate = new Date(schedule.created_at).toLocaleDateString();
                scheduleDiv.innerHTML = `
                    <button class="delete-btn" onclick="deleteSchedule(${schedule.id})">Delete</button>
                    <div class="schedule-title">${schedule.title}</div>
                    <div class="schedule-time">${schedule.date} at ${schedule.time}</div>
                    ${schedule.description ? `<div class="schedule-description">${schedule.description}</div>` : ''}
                    <div class="schedule-created">Created: ${createdDate}</div>
                `;
                schedulesDiv.appendChild(scheduleDiv);
            });
        })
        .catch(error => {
            console.error('Error loading schedules:', error);
            schedulesDiv.innerHTML = '<p>Failed to load schedules</p>';
        });
    }

    window.deleteSchedule = function(id) {
        if (confirm('Are you sure you want to delete this schedule?')) {
            fetch(`/api/schedules/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                loadSchedules();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete schedule');
            });
        }
    };
});