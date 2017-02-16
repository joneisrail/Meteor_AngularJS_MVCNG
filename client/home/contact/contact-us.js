/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('contact', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/contact/contact-us.html',
        controllerAs: 'contact',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);
            this.subscribe('jobSeeker');

            this.submit = () => {
                let to = "bdhoteljobs@gmail.com"; 
                let from = "bdhoteljobs@gmail.com";
                let subject = this.inputSubject;
                let text = "Email From : '" + this.inputEmail + "'\n Name : " + this.inputName +
                    "\n Message \n\n" + this.inputMessage;

                Meteor.call('sendEmail',to,from,subject,text, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to send your mail. Please try again','info');                        
                    }
                    else {
                            Bert.alert('Your mail send successfully.. our team will contact with very soon. Thanks!', 'info');
                            history.back();
                        }
                });
            };         
           
        }
    }
});