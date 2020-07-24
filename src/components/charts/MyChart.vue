<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.rederChart(this.chartData, this.options);
    }, 100);
  },
};
</script>
