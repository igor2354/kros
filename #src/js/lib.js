$(document).ready(function(){
  
    $(".fa-search").click(function(){
      $(".header__item-search, .input").toggleClass("active");
      $("input[type='text']").focus();
    });
    
  });