var cards = [];

console.log("aaaaaa");
// alert("aaaaaaaa");
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
	
	for(var i = 0; i < cards.length; i++){
		alert("Card's url is " + cards[i]["url"] + " and the title is a " + cards[i]["title"] + ".");
	};
	
});

console.log(cards);

var orig_div = $("div.swiper-slide");
console.log(orig_div);
var parent = orig_div.parent();
console.log(parent);
for(var item in cards){ 
	console.log(item);
	var url = item["url"];
	console.log(url);
	var div =orig_div.clone();
	console.log(div);
	div.appendTo(parent);
	var img = div.children("img");
	console.log(img);
	img.attr("src", url);
	console.log(img);
};
