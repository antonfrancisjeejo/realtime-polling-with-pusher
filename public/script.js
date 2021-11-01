const form = document.getElementById("vote-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const choice = document.querySelector("input[name=os]:checked").value;
  const data = { os: choice };
  fetch("http://localhost:3000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

fetch("http://localhost:3000/poll")
  .then((res) => res.json())
  .then((data) => {
    const votes = data.votes;
    const totalVotes = votes.length;
    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );
    console.log(totalVotes, voteCounts);
    let dataPoints = [
      { label: "Windows", y: voteCounts.Windows },
      { label: "MacOs", y: voteCounts.MacOs },
      { label: "Linux", y: voteCounts.Linux },
      { label: "Other", y: voteCounts.Other },
    ];

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          text: `Total Votes ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();
      Pusher.logToConsole = true;

      const pusher = new Pusher("1b5daaf68a30f8fc41dd", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe("os-poll");
      channel.bind("os-vote", function (data) {
        dataPoints = dataPoints.map((point) => {
          if (point.label == data.os) {
            point.y += data.points;
            return point;
          } else {
            return point;
          }
        });
        chart.render();
      });
    }
  });
