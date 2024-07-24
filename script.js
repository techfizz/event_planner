document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpList = document.getElementById('rsvp-list');
    const seats = document.querySelectorAll('.seat');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Generate Calendar
    function generateCalendar(month, year) {
        calendarContainer.innerHTML = '';
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarContainer.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-day');
            day.textContent = i;
            calendarContainer.appendChild(day);
        }
    }

    generateCalendar(currentMonth, currentYear);

    // Handle RSVP form submission
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const attending = document.getElementById('attending').value;

        if (validateEmail(email)) {
            const listItem = document.createElement('li');
            listItem.textContent = {name} ({email}) - {attending};
            rsvpList.appendChild(listItem);

            rsvpForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Handle seat selection
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            seat.classList.toggle('selected');
        });
    });
});
