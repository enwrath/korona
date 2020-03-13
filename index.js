function workOnData(datajson) {
  const msInDay = 24 * 60 * 60 * 1000;

  let dates = []; // x for chart

  let firstDate = new Date(datajson.confirmed[0].date);
  let date = new Date(datajson.confirmed[0].date);
  let daysInChart = Math.round(Math.abs((firstDate.getTime() - new Date().getTime()) / (msInDay)))
  
  // x-axis values
  for (let i = 0; i <= daysInChart; i++) {
    dates.push(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`)
    date.setDate(date.getDate()+1)
  }

  let infections = new Array(dates.length).fill(0);
  let deaths = new Array(dates.length).fill(0);
  let infectionsPerDay = new Array(dates.length).fill(0);
  let deathsPerDay = new Array(dates.length).fill(0);

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
    deathsPerDay[daysFromStart] += 1;
  });
  displayData(infections, deaths, infectionsPerDay, deathsPerDay, dates);
}

function loadData() {
  fetch("data/data.json")
      .then(res => res.json())
      .then(data => workOnData(data));
}

function displayData(infections, deaths, infectionsPerDay, deathsPerDay, dates) {
  const finns = 5528442; // Population, by end of Jan 2020.
  let totalInfected = infections[infections.length-1];
  let totalDead = deaths[deaths.length-1];

  document.getElementById('totalNumber').textContent = totalInfected;
  document.getElementById('infectedPercent').textContent = (totalInfected / finns * 100).toFixed(5) + "%";

  document.getElementById('totalDead').textContent = totalDead;
  document.getElementById('deadPercent').textContent = (totalDead / finns * 100).toFixed(5) + "%";

  document.getElementById('todayNumber').textContent = infectionsPerDay[infections.length-1];
  document.getElementById('yesterdayNumber').textContent = infectionsPerDay[infections.length-2];

  document.getElementById('todayDead').textContent = deathsPerDay[infections.length-1];
  document.getElementById('yesterdayDead').textContent = deathsPerDay[infections.length-2];

  let ctx2 = document.getElementById('koronaKuvaaja7pv').getContext('2d');
  let chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: dates.slice(dates.length-7),
      datasets: [{
        label: 'Tartuntoja per päivä',
        backgroundColor: 'rgba(192, 112, 172, 0.5)',
        borderColor: 'rgb(192, 112, 172)',
        data: infectionsPerDay.slice(dates.length-7),
        lineTension: 0,
        pointRadius: 1
      },
      {
        label: 'Kuolemia per päivä',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgb(0, 0, 0)',
        data: infectionsPerDay.slice(dates.length-7),
        lineTension: 0,
        pointRadius: 1
      }]
    },

    // Configuration options go here
    options: {
      title: {
          display: true,
          text: '7pv per päivä'
      },
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
  let ctx2k = document.getElementById('koronaKuvaaja7pvkumu').getContext('2d');
  let chart2k = new Chart(ctx2k, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: dates.slice(dates.length-7),
      datasets: [{
        label: 'Tartuntoja yhteensä',
        backgroundColor: 'rgba(192, 112, 172, 0.5)',
        borderColor: 'rgb(192, 112, 172)',
        data: infections.slice(dates.length-7),
        lineTension: 0,
        pointRadius: 1
      },
      {
        label: 'Kuolemia yhteensä',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgb(0, 0, 0)',
        data: infections.slice(dates.length-7),
        lineTension: 0,
        pointRadius: 1
      }]
    },

    // Configuration options go here
    options: {
      title: {
          display: true,
          text: '7pv kumulatiivinen'
      },
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

  let ctx3 = document.getElementById('koronaKuvaaja30pv').getContext('2d');
  let chart3 = new Chart(ctx3, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: dates.slice(dates.length-30),
      datasets: [{
        label: 'Tartuntoja per päivä',
        backgroundColor: 'rgba(192, 112, 172, 0.5)',
        borderColor: 'rgb(192, 112, 172)',
        data: infectionsPerDay.slice(dates.length-30),
        lineTension: 0,
        pointRadius: 1
      },
      {
        label: 'Kuolemia per päivä',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgb(0, 0, 0)',
        data: infectionsPerDay.slice(dates.length-30),
        lineTension: 0,
        pointRadius: 1
      }]
    },

    // Configuration options go here
    options: {
      title: {
          display: true,
          text: '30pv per päivä'
      },
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
  let ctx3k = document.getElementById('koronaKuvaaja30pvkumu').getContext('2d');
  let chart3k = new Chart(ctx3k, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: dates.slice(dates.length-30),
      datasets: [{
        label: 'Tartuntoja yhteensä',
        backgroundColor: 'rgba(192, 112, 172, 0.5)',
        borderColor: 'rgb(192, 112, 172)',
        data: infections.slice(dates.length-30),
        lineTension: 0,
        pointRadius: 1
      },
      {
        label: 'Kuolemia yhteensä',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgb(0, 0, 0)',
        data: infections.slice(dates.length-30),
        lineTension: 0,
        pointRadius: 1
      }]
    },

    // Configuration options go here
    options: {
      title: {
          display: true,
          text: '30pv kumulatiivinen'
      },
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
