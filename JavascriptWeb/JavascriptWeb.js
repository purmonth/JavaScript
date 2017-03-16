$(document).ready(function(){
	$(".ButtonGroup_Button").click(function(){
		$(".ButtonGroup_Button").removeClass("ButtonGroup_Button-selected");
		$(this).toggleClass("ButtonGroup_Button-selected");
	});
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
		$(".ShoppingPageFlow_Item").removeClass("ShoppingPageFlow_Item-selected")
		$(this).toggleClass("ShoppingPageFlow_Item-selected")
		var status = $(".ShoppingPageFlow_Item").index;
		console.log(status);
	});
});

$(document).ready(function(){
	$(".ItemCart_Row_Trash").click(function(){
		$(this).parent().hide();
		console.log("document.body");
	});
});



$(document).ready(function(){
})

