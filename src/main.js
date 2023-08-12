import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

// Global Vue Resource
Vue.http.options.root="https://vueresourcewithfirebase-default-rtdb.firebaseio.com";

// Modification of Request is called Intercept
// Interceptors is array
// We add method which will replace normal method

// IMPORTANT

// Request Interceptor
//Vue.http.interceptors.push((request, next)=>{
  
//   if(request.method=="POST"){
//      request.method="PUT";
//   }
    
    // next();

//});

//  Response Interceptor
Vue.http.interceptors.push((request, next)=>{
  
       next((response)=>{
        // console.log(response);
        response.json=()=>{
          return {
            userList : response.data
          }
        }
  
       });
  
  });
// PUT  method did not add key to username
// and you can deletion of username which comes with PUT does not effect others

new Vue({
  el: '#app',
  render: h => h(App)
})

//Firebase link
//https://console.firebase.google.com/project/vueresourcewithfirebase/database/vueresourcewithfirebase-default-rtdb/data