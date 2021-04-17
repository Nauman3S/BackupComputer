<template>
  <div>
    
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label=""><input type="checkbox" :id="item.ID" :value="item.FileName" v-model="selected"></md-table-cell>
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="File Name">{{ item.FileName }}</md-table-cell>
        <md-table-cell md-label="File Type">{{ item.FileType }}</md-table-cell>
        <md-table-cell md-label="Uploaded On">{{ item.UploadTimestamp }}</md-table-cell>
        <!-- <md-table-cell md-label="Total Money OUT 30 Days">{{ item.TMOUT30 }}</md-table-cell>
        <md-table-cell md-label="Total Money IN Daily">{{ item.TMIND }}</md-table-cell>
        <md-table-cell md-label="Total Money OUT Daily">{{ item.TMOUTD }}</md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const API_URL = "http://edc-backend.production.wrapdrive.tech/v1/listAll";
export default {
  name: "FilesList",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      allData:[
        {
                ID:1,
                FileName:"DocumentT.pdf",
                FileType:"PDF",
                UploadTimestamp:"12/2/3",
        },
        {
                ID:2,
                FileName:"Picture.png",
                FileType:"PNG",
                UploadTimestamp:"12/8/2",
        }


              
              
              
              
              
              
              ],
      users: [
        {
          id: 1,
          name: "D1akota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park"
        },
        {
          id: 4,
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester"
        }
      ]
    };
  },
methods:{
getData(){
// fetch(API_URL)
//       .then(response => response.json())
//       .then(result => {
        
        
//         this.allData = result['data']
//         this.users=this.allData
//         //console.clear()
        
//       //  console.log(this.allData)
//         //JSON.parse(result['data'])

//       });
this.users=this.allData;
//console.log(this.selected)
  },
},
  mounted(){
    this.$nextTick(function () {
            window.setInterval(() => {
                this.getData();
            },2000);
        })
    // this.getData()
  }
};
</script>
