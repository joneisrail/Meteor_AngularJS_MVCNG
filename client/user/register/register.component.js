angular.module("socially").directive('register', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/user/register/register.html',
    controllerAs: 'register',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);
      this.profile={
        name:'',
        mobile:''
      };
 

      this.credentials = {
        email: '',
        password: '',
        profile:this.profile
      };
 
      this.error = '';
 
      this.register = () => {
        Accounts.createUser(this.credentials, (err) => {
          if (err) 
            {
              Bert.alert(  err.message, 'warning', );            }
            else 
            { 
            $state.go('home');
          }
        });
       
      };
    }
  }
});