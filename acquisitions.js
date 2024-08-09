let time;
let wind;
let temp;
let windtime = [];
let temptime = [];
let windData = [];
let tempData = [];
document.addEventListener('DOMContentLoaded', function () {
    async function fetchData() {
        // Hier sollte deine fetchData-Funktion definiert sein
        let url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,&hourly=wind_speed_10m&hourly=temperature_2m";
        let triple = [];
        try {
            const res = await fetch(url);
            const data = await res.json();

            const temps = data.hourly.temperature_2m.slice(0, 24);
            const winds = data.hourly.wind_speed_10m.slice(0, 24);
            const times = data.hourly.time.slice(0, 24);

            for (let i = 0; i < 24; i++) {
                triple.push([winds[i], temps[i], times[i]]);
            }
        } catch (e) {
            console.error("ERROR " + e);
        }

        return triple;
    }

    async function accessData() {
        let triple = await fetchData(); // Ensure the data is fetched

        // Erstelle Arrays für die Chart-Daten
        let windtime = [];
        let temptime = [];

        for (let i = 0; i < 24; i++) {
            let time = triple[i][2];
            let temp = triple[i][1];
            let wind = triple[i][0];

            windtime.push([wind, time]);
            temptime.push([temp, time]);
        }

        // Hilfsfunktion zum Formatieren des Datums
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);

            return `${day}.${month}.${year}`;
        }

        // Funktion zur Umwandlung von windtime und temptime in das gewünschte Format
        function transformData(array, type) {
            return array.map(([value, timeString]) => {
                const time = timeString.substring(11, 16); // Zeit im Format HH:mm extrahieren
                return {
                    [type]: value,
                    time: time,
                    date: formatDate(timeString)
                };
            });
        }

        // Konvertiere windtime und temptime
        const tempData = transformData(temptime, 'temp');

        // Überprüfe die Daten
        console.log('Temp Data:', tempData);

        // Erstelle das Diagramm
        const ctx = document.getElementById('acquisitions').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: tempData.map(row => row.time),
                datasets: [
                    {
                        label: 'Temperature',
                        data: tempData.map(row => row.temp),
                        borderColor: 'rgb(252, 3, 78)',
                        backgroundColor: 'transparent',
                        fill: false,
                        borderWidth: 1,
                        pointBackgroundColor: 'rgb(255, 255, 255)',
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.6)' // Text color for legend items
                        },
                        position: 'bottom',
                    },
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255,255,255, 0.08)', // Farbe des Gitters der X-Achse
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255,255,255, 0.08)', // Farbe des Gitters der Y-Achse
                        },
                        title: {
                            display: true,
                            text: '°C'
                        }
                    }
                }
            }
        });
    }

    accessData();
});
