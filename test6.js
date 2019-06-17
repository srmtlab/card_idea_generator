let cards = [];

$(function(){
	
	$.ajax({
		type: "GET",
		url: "cards.json",
		dataType: "json"
	})
	.then(
		function(json){
			for(let i = 0; i < json.length; i++) {
				cards.push({
					"url": json[i].url,
					"title": json[i].title
				});
			}

			$(".img").attr("src", cards[0].url);
			let copy = $(".swiper-slide");
			for(let i = 0; i < cards.length - 1; i++){
				copy.clone().appendTo(".swiper-wrapper");
				$(".img:eq(" + (i + 1) + ")").attr("src", cards[i + 1].url);
			}

		},
		function(){
			alert("error:ファイルの読み込みに失敗");
		}
	);

	//「送信」ボタンクリック時のイベント
	let btn_i = 0;//テスト用変数
	$(".btn").on("click", function(){

		//テスト用イベント#################
		alert(cards[btn_i++].url);
		if(btn_i > cards.length - 1){
			btn_i = 0;
		}
		//#################################

	})

	//画像内の矢印を表示・非表示
	let s_c = $(".swiper-container");
	let s_b_p = $(".swiper-button-prev");
	let s_b_n = $(".swiper-button-next");
	s_c.on("mouseenter", function(){
		s_b_p.stop().animate({
			opacity:"1"
		},{duration:200});
		s_b_n.stop().animate({
			opacity:"1"
		},{duration:200});
	});
	s_c.on("mouseleave", function(){
		s_b_p.stop().animate({
			opacity:"0"
		},{duration:200});
		s_b_n.stop().animate({
			opacity:"0"
		},{duration:200});
	});


	
});