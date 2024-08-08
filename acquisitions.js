document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    const ctx = document.getElementById('acquisitions').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Temperatur',
                    data: data.map(row => row.count),
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
                        text: 'Year'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255,255,255, 0.08)', // Farbe des Gitters der Y-Achse
                    },
                    title: {
                        display: true,
                        text: 'Count'
                    }
                }
            }
        }
    });
});
