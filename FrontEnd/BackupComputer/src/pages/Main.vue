<template>
  <div class="content">
     <img :src="imgFile" width="50%" height="auto"/><br><br>
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
      <input type="text" name="username" placeholder="Username" /><br><br>
      <input type="password" name="password" placeholder="Password" />
      </div>
<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
     <md-button
                    class="md-primary"
                    @click="logIn()"
                    >Login</md-button><br><br>
      
      <router-link to="/register">Not a user? Register Now!</router-link>
  </div>
    </div>
  </div>
</template>

<script>
const API_URL = "http://edc-backend.production.wrapdrive.tech/v1/getActive";


export default {
  components: {
    
  },
  data() {
    return {
      imgFile: require("@/assets/img/BackupComputer.jpg")
       
     
      }
    
  },
  methods:{
    logIn(){
      console.log('login');
      //this.$sidebar.displaySidebar(false);
      this.$router.push({ path: 'dashboard'})

      
    },
getData(){
fetch(API_URL)
       fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        
        this.Timestamp ='Last Updated '+ result['data'][0].Timestamp,
        this.PlayerID = result['data'][0].PlayerID
        this.TMIN30=result['data'][0].TMIN30
        this.TMOUT30=result['data'][0].TMOUT30
        //JSON.parse(result['data'])

      });
  },
},
  mounted(){
  //  / this.getData()
  }
};
</script>
