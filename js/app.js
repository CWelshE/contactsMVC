var contactsMVC = angular.module('contactsMVC', []);

contactsMVC.directive('focusOn', function()
{
  var directiveDefObj =
  {
    link: function postLink(scope, elem, attr)
    {
      scope.$on('focusOn', function(e, name)
      {
        if(name === attr.focusOn)
        {
          elem[0].focus();
        }
      });
    }
  };
});

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
      contactStr += (contact.name  + "/" || "")
                 +  (contact.phone + "/" || "") 
                 +  (contact.email + "/" || "") 
                 +  (contact.addr || "")
                 +  "|";
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

  $scope.toggleNew  = function(key)
  {
    if(!key || key.keyCode === 67 && key.target.nodeName === "DIV")
    {
      $scope.isActive = !$scope.isActive;
    }
  }
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
      $scope.contacts = $scope.contacts.splice(contactIdx-1, 1);
      postToStorage();
    }
  };
}]);
