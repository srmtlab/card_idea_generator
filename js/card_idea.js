let cards = [];

$(function(){


	//一旦追加
	let swiper = new Swiper('.swiper-container', {
		effect: 'flip',
		grabCursor: true,
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});


	
	$.ajax({
	    type: "GET",
	    url: "./js/cards.json",
	    cache: false,
	    dataType: "json"
	}).then(
	    function(json){
		for(let i = 0; i < json.length; i++) {
		    cards.push({
			"url": json[i].url,
			"title": json[i].title
		    });
		}
		
		// カードをランダムにシャッフル
		for(var i = cards.length - 1; i > 0; i--){
		    var r = Math.floor(Math.random() * (i + 1));
		    var tmp = cards[i];
		    cards[i] = cards[r];
		    cards[r] = tmp;
		}
		    
		$(".img").attr("src", cards[0].url);
		cards[0].url.substr();
		let copy = $(".swiper-slide");
		for(let i = 0; i < cards.length - 1; i++){
		    let clone = copy.clone();
		    let cardName = cards[i].url.replace(/\.PNG$/i, "");
		    cardName = cardName.replace(/^.+card/, "card");
		    clone.attr("cardname", cardName);
		    clone.attr("cardtitle", cards[i].title);
		    clone.appendTo(".swiper-wrapper");
		    $(".img:eq(" + (i + 1) + ")").attr("src", cards[i + 1].url);
		}
		
		swiper.update();
		
	    },
	    function(){
		alert("error:ファイルの読み込みに失敗");
	    }
	);

	//「送信」ボタンクリック時のイベント
	let btn_i = 0;//テスト用変数
	$(".btn").on("click", function(){

		//テスト用イベント#################
	        //alert(cards[btn_i++].url);
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

	// 
	$('.btn').on('click', function(){
	    let cardName = $(".swiper-slide-next").attr("cardname");
	    let cardTitle = $(".swiper-slide-next").attr("cardtitle");
	    let text = $('textarea#idea').val();
	    alert("text: "+text+", cardName: "+cardName+", cardTitle: "+cardTitle);
	    $.ajax({
		type: "GET",
		url: "http://radish.ics.nitech.ac.jp/api/insert_idea.cgi",
		data: {
		    cardName: cardName,
		    cardTitle: cardTitle,
		    idea: text
		}
	    }).then(
		function(data){		    
		    alert("OK");
		},
		function(){
		    alert("Failed to insert idea.");
		}
	    );
	    
	    
	});
    
    
});

