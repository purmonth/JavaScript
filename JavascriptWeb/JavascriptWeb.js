$(document).ready(function(){
	$(".ButtonGroup_Button").click(function(){
		$(".ButtonGroup_Button").toggleClass("ButtonGroup_Button-selected");
	})
});

$(document).ready(function(){
	$(".PageHeader_MenuPage_Menu").click(function(){
		$(".PageHeader_MenuPage").hide();
	});
	$(".PageHeader_Menu").click(function(){
		$(".PageHeader_MenuPage").show();
	});
});

$(document).ready(function(){
	$(".ShoppingPageFlow_Item").click(function(){
		$(".ShoppingPageFlow_Item").toggleClass("ShoppingPageFlow_Item-selected")
	});
});


$(window).scroll(function(){
	if($(this).scrollTop() >= 500){
		$(".BuyNowBlock").css("position","fixed").css("top","200px");
	}
	if($(this).scrollTop() < 500){
		$(".BuyNowBlock").css("position","absolute").css("top","600px");
	}
});


/**
$(".ButtonGroup_Button").toggleClass(".ButtonGroup_Button-selected");
$(".ButtonGroup_Button:last").addClass(".ButtonGroup_Button-selected");
**/