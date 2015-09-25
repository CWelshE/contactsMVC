var contactsMVC = angular.module('contactsMVC', []);

contactsMVC.controller('mainCtrl', ['$scope', function($scope)
{
  $scope.contacts = [{name: "John Doe",
                      phone: "7074009680"}];
  $scope.searchFilter = "";
  $scope.addContact = function(props)
  {
    if(props)
    {
      contacts.push({name:  props.name  || false,
                     phone: props.phone || false,
                     email: props.email || false,
                     addr:  props.addr  || false});
    }
  };
}]);
