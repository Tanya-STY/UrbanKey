import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const OverviewGraph = ({ overviewData }) => {
  useEffect(() => {
    const canvas = document.getElementById('overview-chart');
    const ctx = canvas.getContext('2d');

    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: overviewData.map(data => data.month),
        datasets: [{
          label: 'Amount Collected ($)',
          data: overviewData.map(data => data.amountCollected),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x',
        scales: {
          x: {
            stacked: true,
          },
          y: {
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return () => {
      if (window.myChart instanceof Chart) {
        window.myChart.destroy();
      }
    };
  }, [overviewData]);

  return (
    <div className="overview-graph">
      <canvas id="overview-chart" style={{ height: "150px", width: "300px" }}></canvas>
    </div>
  );
};

export default OverviewGraph;
