<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
        
      </div>
       <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-33 md-size-66"
      >
        <md-card>
          <md-card-header data-background-color="teal">
            <h4 class="title">Credits</h4>
            <p class="category">Credits Management</p>
          </md-card-header>
          <md-card-content  >
            <h4>Credits: ${{credits}}</h4>
            <h4>Reward Points: {{rewards}}</h4>
            <h4>1 Reward Point = ${{rewardToCredit}} Credit</h4>

            <input type="text" name="username" placeholder="Credits value" v-model="reqCredits"  /><br>
            <md-button class="md-raised md-primary" @click="reqCdts()">
                   Request Credits
        </md-button>

        <md-button class="md-raised md-primary" @click="reqCdts()">
                   Redeem Reward Points
        </md-button>
          </md-card-content>
        </md-card>
        
        
        
      </div>
      
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";

export default {
  components: {
    EditProfileForm,
    UserCard
  },
    data() {
    return {
      
      credits: "21",
      rewards: "5",
      reqCredits: "",
      rewardToCredit: "1",
       
     
      }
    
  },

    methods:{
    reqCdts(){
        console.log(this.reqCredits)
    }
    }
};
</script>
