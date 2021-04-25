<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="purple">
          <template slot="header">
            <md-icon>account_balance</md-icon>
          </template>

          <template slot="content">
            <p class="category">Sales</p>
            <h3 class="title">{{this.$store.state.allTimeSales}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              All time sales
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>emoji_events</md-icon>
          </template>

          <template slot="content">
            <p class="category">Rewards Issued</p>
            <h3 class="title">{{this.$store.state.allTimeRewardsIssued}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Issued reward points
            </div>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>work</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Jobs</p>
            <h3 class="title">{{this.$store.state.allTimeJobs}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Total Jobs
            </div>
          </template>
        </stats-card>
        
      </div>


      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="teal">
          <template slot="header">
            <md-icon>loop</md-icon>
          </template>

          <template slot="content">
            <p class="category">System Status</p>
            <h3 class="title">{{this.$store.state.systemStatus}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <!-- <md-icon>date_range</md-icon> -->
              <md-button class="md-danger" @click="cancelAllJobs()">
                   Cancel
        </md-button>
        <md-button class="md-primary" @click="restoreAllJobs()">
                   Restore
        </md-button>
            </div>
          </template>
        </stats-card>
        
      </div>
<!--       
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily Sales</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              increase in today sales.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">Completed Tasks</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              campaign sent 26 minutes ago
            </div>
          </template>
        </chart-card>
      </div> -->
      
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-150 md-size-150"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Main Ledger</h4>
            <p class="category">Logs</p>
          </md-card-header>
          <md-card-content  >
            <ordered-table  table-header-color="blue"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
      
    </div>
  </div>
</template>

<script>
const API_URL_jobOPS = "http://bkc-backend.production.wrapdrive.tech/v1/jobOperations";
// const API_URL_USERLedger = "http://bkc-backend.production.wrapdrive.tech/v1/ledgerLog";
import {
  StatsCard,
  ChartCard,
  
  
  OrderedTable
} from "@/components";

export default {
  components: {
    StatsCard,
    // ChartCard,
    
    OrderedTable
  },
  data() {
    return {
       
      dataD:'asd',
      ID:'',
      Timestamp:'',
      FileName:'',
      JobType:'',
      CreditsUsed:'',
      RewardPointsEarned:'',
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  methods:{
cancelAllJobs(){
    this.$store.state.systemStatus='Canceling';
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
                           operation: 'cancel'
    })
  };
  fetch(API_URL_jobOPS, requestOptions)
    .then(response => response.json())
    .then(result=>{
      this.$store.state.systemStatus='Canceled All'}

    );

  },
restoreAllJobs(){
  this.$store.state.systemStatus='Restoring';
      const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
                           operation: 'restore'
    })
  };
  fetch(API_URL_jobOPS, requestOptions)
    .then(response => response.json())
    .then(result=>{
      this.$store.state.systemStatus='Restored All'}
    

    );


  },
},
  mounted(){
    // this.$nextTick(function () {
    //         window.setInterval(() => {
    //             this.getData();
    //         },2000);
    //     })
  //  / this.getData()
  }
};
</script>
