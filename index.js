function workOnData(datajson) {
  const msInDay = 24 * 60 * 60 * 1000;

  let dates = []; // x for chart

  let firstDate = new Date(datajson.confirmed[0].date);
  let date = new Date(datajson.confirmed[0].date);
  let lastDate = new Date().setDate(new Date().getDate()+1)
  // x-axis values
  while (date < lastDate) {
    dates.push(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`)
    date.setDate(date.getDate()+1)
  }

  let infections = new Array(dates.length).fill(0);
  let deaths = new Array(dates.length).fill(0);
  let infectionsPerDay = new Array(dates.length).fill(0);

  datajson.confirmed.forEach( item => {
    let daysFromStart = Math.round(Math.abs((firstDate.getTime() - new Date(item.date).getTime()) / (msInDay)));
    for (let i = daysFromStart; i < infections.length; i++) {
      infections[i] += 1;
    }
    infectionsPerDay[daysFromStart] += 1;
  });

  datajson.deaths.forEach( item => {
    let daysFromStart = Math.round(Math.abs((firstDate.getTime() - new Date(item.date).getTime()) / (msInDay)));
    for (let i = daysFromStart; i < deaths.length; i++) {
      deaths[i] += 1;
    }
  });
  displayData(infections, deaths, infectionsPerDay, dates);
}

function loadData() {
  fetch("data/data.json")
      .then(res => res.json())
      .then(data => workOnData(data));
}

function displayData(infections, deaths, infectionsPerDay, dates) {
  const finns = 5528442; // Population, by end of Jan 2020.
  let totalInfected = infections[infections.length-1];

  document.getElementById('totalNumber').textContent = totalInfected;
  document.getElementById('infectedPercent').textContent = (totalInfected / finns * 100).toFixed(5) + "%";


  let ctx1 = document.getElementById('koronaKuvaaja').getContext('2d');
  let chart1 = new Chart(ctx1, {
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
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'hlö'
          }
        }]
      }
    }
  });
}



loadData();
