<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Vue-Resource</h3>
        <div class="form-group">
          <input type="text" class="form-control" v-model="userName">
        </div>
        <button class="btn btn-primary" @click="saveUser"> Post</button>
        <button class="btn btn-success" @click="getUsers"> Get</button>
        <hr>
        <ul class="list-group">
          <li class="list-group-item" v-for="user in userList" 
          style="display: flex; justify-content: space-between;">
           <span> {{ user.value.username}}</span> 
           <button class="btn btn-danger btn-xs" @click="deleteUser(user.key)">Delete</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: null,
      userList: [],
      // For Default Methods
      resource:{}
    }
  },
  methods: {
    saveUser() {
      //  With Local Vue Resource 
      //  this.$http.post("https://vueresourcewithfirebase-default-rtdb.firebaseio.com", {username : this.userName})
      // With Global Vue Resource

      // this.$http.post("users.json", { username: this.userName })
      //   .then((response) => {
      //     console.log(response);
      //   })

      // Creating resources in Vue-resource
        // this.$resource("users.json").save({},{ username: this.userName })

      //Custom Post Method
      this.resource.postAlternative({},{ username: this.userName })
    },
    getUsers() {
      //  With Local Vue Resource 
      // this.$http.get("https://vueresourcewithfirebase-default-rtdb.firebaseio.com")
      // With Global Vue Resource 
      // If you want to add something to link you will write like this
      // this.$http.get("/AdditionalPartOfLink")


      //  Without Intercept
      //   this.$http.get()
      //   .then((response)=>{
      //      let data= response.data;
      //      for(let key in data){
      //       // console.log(data[key]); //{username: 'Gunel'}
      //       this.userList.push(data[key]);
      //       }
      //     })
      // }

      // With Intercept
      // this.$http.get("users.json")
      //   .then((response) => {
      //     return response.json()
      //   }).then((data) => {
      //     for (let key in data.userList) {
      //       this.userList.push(
      //         {
      //           key: key,
      //           value: data.userList[key]
      //         }
      //         );
      //     }
      //   })


      this.$resource("users.json").get()
        .then((response) => {
          return response.json()
        }).then((data) => {
          for (let key in data.userList) {
            this.userList.push(
              {
                key: key,
                value: data.userList[key]
              }
              );
          }
        })

    
    },

    deleteUser(userKey){

      // this.$http.delete("users/"+userKey+".json")
      // .then(response=>{
      //   console.log(response);
      // })


      this.$resource("users/"+userKey+".json").delete();
    }
  },
  
  created(){
    const customActions= {
      postAlternative : {method: "POST", url: "users.json"}
    };
                                // Endpoints Options customActions
    this.resource= this.$resource("users.json", {}, customActions);


  }
}
</script>

<style></style>
