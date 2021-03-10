<template>
    <div class="bg-leaderboardpage">
        <div class="leaderboard">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    name: 'Leaderboard',
    async mounted() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6'],
                datasets: [{
                    label: 'Alex',
                    data: [12, 19, 240, 5, 2, 3],
                    backgroundColor: ['rgb(255, 0, 0)'],
                    borderColor: ['rgb(255, 0, 0)'],
                    fill: false,
                },
                {
                    label: 'Jamie',
                    data: [23, 12, 212, 34, 12, 54],
                    backgroundColor: ['rgb(0, 255, 0)'],
                    borderColor: ['rgb(0, 255, 0)'],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
				title: {
					display: true,
					text: 'Leaderboard'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Turn'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Gold Coins'
						}
					}]
				}
			}
        });
    }

}
</script>