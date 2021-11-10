const ctx = document.querySelector(".global-temperature").getContext("2d");

const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData()
  .then(parseData)
  .then(getLabelsAndData)
  .then(({ years, glob, nhem, shem }) => drawChart(years, glob, nhem, shem));

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv").then((response) => response.text());
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.glob.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
      acc.nhem.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
      acc.shem.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);

      return acc;
    },
    { years: [], glob: [], nhem: [], shem: [] }
  );
}

function drawChart(labels, glob, nhem, shem) {
  new Chart(ctx, {
    type: "line",
    data: {
      // передаем массив годов
      labels,
      datasets: [
        {
          label: "# Global average temperature",
          // передаем массив температур отклонений
          data: glob,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
          fill: false,
          radius: 1,
        },
        {
          label: "# Northern Hemisphere-mean temperature",
          data: nhem,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
          fill: false,
          radius: 1,
        },
        {
          label: "# Southern Hemisphere-mean temperature",
          data: shem,
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          fill: false,
          radius: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}
