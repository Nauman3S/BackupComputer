<template>
  <div class="content">
     <img :src="imgFile" width="50%" height="auto"/><br><br>
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>First Name</label>
              <md-input v-model="fname" type="text"></md-input>
            </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lname" type="text"></md-input>
            </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailAd" type="text"></md-input>
            </md-field>
      </div>
      
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Password</label>
              <md-input v-model="password1" type="password"></md-input>
            </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Retype Password</label>
              <md-input v-model="password2" type="password"></md-input>
            </md-field>
      </div>
          
      </div>
<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
     <md-button
                    class="md-primary"
                    @click="signUp()"
                    >Signup</md-button><br><br>
      
      <router-link to="/main">Already a user? Login Now!</router-link>
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
      imgFile: require("@/assets/img/BackupComputer.jpg"),
      password1: "",
      password2: "",
      fname:"",
      lname:"",
      emailAd:"",
       
     
      }
    
  },
  methods:{
    signUp(){
      console.log('signUp');
      
      
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
