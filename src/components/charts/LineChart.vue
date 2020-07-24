<script lang="js">
//Importing Line class from the vue-chartjs wrapper
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
//Exporting this so it can be used in other components
export default {
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      //Chart.js options that controls the appearance of the chart
      options: {
        // elements: {
        // line: {
        //     tension: 0
        // }
        // },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
                callback: function (value, index, values) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    //renderChart function renders the chart with the datacollection and options object.
    setTimeout(() => {
    this.renderChart(this.chartData, this.options)
    }, 100);
  }
}
</script>
