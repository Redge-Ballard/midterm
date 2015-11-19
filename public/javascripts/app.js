angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.test = 'Hello world!';
    $scope.comments = [
       {title:'Comment 1', upvotes:5},
       {title:'Comment 2', upvotes:6},
       {title:'Comment 3', upvotes:1},
       {title:'Comment 4', upvotes:4},
       {title:'Comment 5', upvotes:3}
    ];
    $scope.create = function(comment) {
       return $http.post('/comments', comment).success(function(data){
          //$scope.comments.push(data);
       });
    };
    if($scope.songTitle === '') { return; }
      console.log("In addComment with "+$scope.songTitle);
      $scope.create({
        title: $scope.songTitle,
        album: $scope.songAlbum,
        artist: $scope.songArtist,
        genre: $scope.songGenre,
        upvotes: 0,
      });
      $scope.songTitle = '';
      $scope.songAlbum = '';
      $scope.songArtist = '';
      $scope.songGenre = '';
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
    $scope.downvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/downvote')
        .success(function(data){
          console.log("downvote worked");
          comment.upvotes -= 1;
        });
    };
  $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };
  $scope.decrementUpvotes = function(comment) {
      $scope.downvote(comment);
    };
  $scope.getAll = function() {
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
  };
  $scope.getAll();
  }
]);
