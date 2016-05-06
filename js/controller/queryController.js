
pageSize=10;
app.controller('queryController', ['$scope','$http','$filter', function($scope,$http,$filter){

    $http.get("../php/getBooks.php").success(function(data){
        $scope.books=data;
        console.log(data);
        $scope.selectedPage=1;

        $scope.end=pageSize;
        $scope.start=0;
        $scope.getCurrentPage=function(index) {
            $scope.start=pageSize*index;
            $scope.end=pageSize*(index+1);
            $scope.selectedPage=index+1;
            $scope.Books=$scope.books.slice($scope.start,$scope.end);
        }
        $scope.selectBook=function(name){
            $scope.Name=name;
        }
        $scope.getPageClass=function(page){
            return $scope.selectedPage==page?"btn-primary":"";
        }

        $scope.Books=$scope.books.slice($scope.start,$scope.end);
    }).error(function() {
        alert("somthing wrong!");
    
    });
 
    $scope.queryBooks=function(keyWord){
     $http({
            method:'POST',
            url: '../php/queryBook.php',
            data: { bookAuthor:"Brad Green" }
         })
     .success(function(data){
        console.log(data);
/*        $scope.books=data;
        $scope.selectedPage=1;

        $scope.end=pageSize;
        $scope.start=0;
        $scope.getCurrentPage=function(index) {
            $scope.start=pageSize*index;
            $scope.end=pageSize*(index+1);
            $scope.selectedPage=index+1;
            $scope.Books=$scope.books.slice($scope.start,$scope.end);
        }
        $scope.selectBook=function(name){
            $scope.Name=name;
        }
        $scope.getPageClass=function(page){
            return $scope.selectedPage==page?"btn-primary":"";
        }

        $scope.Books=$scope.books.slice($scope.start,$scope.end);*/
     })
     .error(function() {
                alert("somthing wrong!!");
            });
    }
        

}]);
app.filter('cut',function() {
    return function(data) {
        var result=[];
        var length=0;
        angular.forEach(data, function(value, key){
                if(value) length++;
        });
        for(var i=0;i<Math.ceil(length/pageSize);i++){
            result.push(i);
        }
        return result;
    }
});
