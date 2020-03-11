var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: dates,
      datasets: [{
        label: 'Tartuntoja yhteensä',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        data: infections,
        lineTension: 0,
        pointRadius: 1
      },
      {
        label: 'Tartuntoja per päivä',
        backgroundColor: 'rgba(175, 155, 35, 0.5)',
        borderColor: 'rgb(175, 155, 35)',
        data: infectionsPerDay,
        lineTension: 0,
        pointRadius: 1
      },
      {
        label: 'Koronakuolemia yhteensä',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgb(0, 0, 0)',
        data: deaths,
        lineTension: 0,
        pointRadius: 1
      }]
    },

    // Configuration options go here
    options: {
      tooltips: {
        mode: "index",
        intersect: false,
        position: "nearest"
      }
    }
  });
