//定义初始变量
var speed = 700,
	locked = true,
	delayTimer,
	liIndex = 0,
	show2Css = {'width': '530px','height': '224px','top': '23px','left':0},
	show3Css = {'width': '640px','height': '270px','top': '0px','left':'275px'},
	show4Css = {'width': '530px','height': '224px','top': '23px','left':'915px'};

//给展示的图片加上样式
$('.show2').css(show2Css);
$('.show3').css(show3Css);
$('.show4').css(show4Css);

//触发事件
function bindEvent() {
	//右键
	$('.rightBtn').click(function(){
		controlMove('turnRight');
	});
	//左键
	$('.leftBtn').click(function(){
		controlMove('turnLeft');
	});
	//小圆点
	$('.oBtn li').click(function() {
		var count,
			oLiIndex = $(this).index();
		speed = 200;
		if(oLiIndex > liIndex) {
			count = oLiIndex - liIndex;
			while(count--) {
				MoveRight();
			}
		}else {
			count = liIndex - oLiIndex;
			while(count--) {
				MoveLeft();
			}
		}
		liIndex = oLiIndex;
		speed = 700;
	});
}

//鼠标停放在轮播图上停止运动，移开后恢复
$('.sliderPage').mouseenter(function() { 
    clearTimeout(delayTimer); 
}); 
$('.sliderPage').mouseleave(function() { 
    locked = true;
    delayTimer = setTimeout(controlMove, 2000);
});

//控制移动
function controlMove(direction) {
	if (locked) {
		locked = false;
		clearTimeout(delayTimer);
		if(!direction || direction === 'turnRight') {
			MoveRight();			
		}else if(direction === 'turnLeft') {
			MoveLeft();
		}
	}
}

//向右运动
function MoveRight() {
	if(liIndex < 6) {
		liIndex++;
	}else {
		liIndex = 0;
	}
	//给该索引小圆点加active样式，移除兄弟节点样式
	$('.oBtn li').eq(liIndex).addClass('active').siblings().removeClass('active');

	$('.show3').animate(show2Css,speed);
	$('.show4').animate(show3Css,speed);
	$('.show5').animate(show4Css,speed,function() {
		delayTimer = setTimeout(controlMove, 2000);
		locked = true;
	});

	$('.show0').attr('class','show6');
	$('.show1').attr('class','show0');
	$('.show2').attr('class','show1');
	$('.show3').attr('class','show2');
	$('.show4').attr('class','show3');
	$('.show5').attr('class','show4');

	if($('.show4').next().length != 0) {
		$('.show4').next().attr('class','show5');
	}else {
		$(".sliderPage li:first").attr("class","show5"); 
	}
	$('.show1').removeAttr('style');
}

//向左运动
function MoveLeft() {
	if(liIndex > 0) {
		liIndex--;
	}else {
		liIndex = 6;
	}
	$('.oBtn li').eq(liIndex).addClass('active').siblings().removeClass('active');

	$('.show1').animate(show2Css,speed);
	$('.show2').animate(show3Css,speed);
	$('.show3').animate(show4Css,speed,function() {
		delayTimer = setTimeout(controlMove, 2000);
		locked = true;
	});

	$('.show6').attr('class','show0');
	$('.show5').attr('class','show6');
	$('.show4').attr('class','show5');
	$('.show3').attr('class','show4');
	$('.show2').attr('class','show3');
	$('.show1').attr('class','show2');
	$('.show0').attr('class','show1');

	if($('.show6').next().length != 0) {
		$('.show6').next().attr('class','show0');
	}else {
		$(".sliderPage li:first").attr("class","show0"); 
	}
	$('.show5').removeAttr('style');
}

bindEvent();
delayTimer = setTimeout(controlMove, 2000);