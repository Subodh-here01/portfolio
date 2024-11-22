async function fetchMissions() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launches');
        const data = await response.json();
        displayMissions(data);
    } catch (error) {
        console.error('Error fetching missions:', error);
    }
}

function displayMissions(missions) {
    const missionList = document.getElementById('mission-list');
    missionList.innerHTML = ''; 
    missions.forEach(mission => {
        const missionCard = document.createElement('div');
        missionCard.classList.add('card');
        missionCard.innerHTML = `
            <h3>${mission.name}</h3>
            <p>${mission.details || 'No details available'}</p>
            <p><strong>Launch Date:</strong> ${new Date(mission.date_utc).toLocaleString()}</p>
        `;
        missionList.appendChild(missionCard);
    });
}

document.addEventListener('DOMContentLoaded', fetchMissions);
