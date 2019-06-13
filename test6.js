var cards = [];

$(function(){
	
	$.ajax({
		type: "GET",
		url: "cards.json",
		dataType: "json"
	})
	.then(
		function(json){
			for(var i = 0; i < json.length; i++){
				cards.push({
					"url": json[i].url,
					"title": json[i].title
				});
			};
		},
		function(){
			alert("error:ファイルの読み込みに失敗");
		}
	);
	
	$(".btn").on("click", function(){
		for(var i = 0; i < cards.length; i++){
			alert("Card's url is " + cards[i]["url"] + " and the title is a " + cards[i]["title"] + ".");
		}
	});
	
});