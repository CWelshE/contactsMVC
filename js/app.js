var contactsMVC = angular.module('contactsMVC', []);

contactsMVC.controller('mainCtrl', ['$scope', function($scope)
{
  $scope.contacts = [];

  if(localStorage["contactsMVC"])
  {
    var contactExtract = localStorage["contactsMVC"]
    .split("|")
    .filter(function(elem)
    {
      return elem.length > 0;
    });
    contactExtract.forEach(function(person)
    {
      var attrs = person.split("/");
      var thisContact = 
      {
        name:  attrs[0] || "",
        phone: attrs[1] || "",
        email: attrs[2] || "",
        addr:  attrs[3] || ""
      };
      $scope.contacts.push(thisContact);
    });
  }
  
  var postToStorage = function()
  {
    var contactStr = "";
    $scope.contacts.forEach(function(contact)
    {
      console.log(contact);
      contactStr += (contact.name  + "/" || "")
                 +  (contact.phone + "/" || "") 
                 +  (contact.email + "/" || "") 
                 +  (contact.addr || "")
                 +  "|";
      console.log(contactStr);
    });
    localStorage["contactsMVC"] = contactStr;
  }

  $scope.searchFilter = "";

  $scope.defaultContact = 
  {
    name:  "",
    phone: "",
    email: "",
    addr:  ""
  };
  $scope.contact = {};
  $scope.isActive   = false;
  $scope.newSymbol  = "new",
  $scope.backSymbol = "<";

  $scope.toggleNew  = function(){$scope.isActive = !$scope.isActive;}
  $scope.addContact = function(contact)
  {
    if(contact)
    {
      $scope.contacts.push(contact);
      postToStorage();
      $scope.contact = angular.copy($scope.defaultContact);
      $scope.toggleNew();
    }
  };
  $scope.removeContact = function(contactName)
  {
    if($scope.contacts.length < 2)
    {
      $scope.contacts = [];
      postToStorage();
    }
    if(contactName)
    {
      var contactIdx; 
      $scope.contacts.forEach(function(contact, idx)
      {
        if(contact.name == contactName)
        {
          contactIdx = idx;
        }
      });
      console.log(contactIdx);
      $scope.contacts = $scope.contacts.splice(contactIdx-1, 1);
      postToStorage();
    }
  };
}]);
