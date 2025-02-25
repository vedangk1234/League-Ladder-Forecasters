document.addEventListener('DOMContentLoaded', function() {
    const teams = [
        'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton', 'Chelsea',
        'Crystal Palace', 'Everton', 'Fulham', 'Ipswich Town', 'Leicester', 'Liverpool',
        'Man City', 'Man Utd', 'Newcastle Utd', 'Nottingham', 'Southampton', 'Tottenham',
        'WestHam Utd', 'Wolves'
    ];

    const dropdowns = document.querySelectorAll('.team-dropdown');
    const removeButtons = document.querySelectorAll('.remove-team-btn');

    // Initialize dropdown options
    function populateDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.innerHTML = ''; // Clear existing options
            const selectedTeams = Array.from(dropdowns).map(d => d.value).filter(v => v);
            const availableTeams = teams.filter(team => !selectedTeams.includes(team));

            availableTeams.forEach(team => {
                const option = document.createElement('option');
                option.value = team;
                option.textContent = team;
                dropdown.appendChild(option);
            });

            // Set the default selected value if any
            const position = dropdown.dataset.position;
            const selectedTeam = document.querySelector(`.team-dropdown[data-position="${position}"]`).value;
            if (selectedTeam) {
                dropdown.querySelector(`option[value="${selectedTeam}"]`).selected = true;
            }
        });
    }

    // Handle team selection
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            populateDropdowns(); // Refresh options after selection
        });
    });

    // Handle remove button click
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const position = button.dataset.position;
            const dropdown = document.querySelector(`.team-dropdown[data-position="${position}"]`);
            const selectedTeam = dropdown.value;

            // Add the removed team back to all dropdowns
            if (selectedTeam) {
                teams.push(selectedTeam); // Add back the removed team
                populateDropdowns(); // Refresh options
            }
            
            // Clear the selected team
            dropdown.value = '';
        });
    });

    // Initial population of dropdowns
    populateDropdowns();
});