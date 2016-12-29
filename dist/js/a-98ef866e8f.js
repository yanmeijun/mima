$(function(){

		$('#small').on('mousemove',function(e){
			var movL=e.pageX-$(this).offset().left-$('.mark').width()/2
			var movY=e.pageY-$(this).offset().top-$('.mark').height()/2
			var minX=$(this).outerWidth()-$('.mark').outerWidth()
			var minY=$(this).outerHeight()-$('.mark').outerHeight()
			if(movL<0){
				movL=0
			}else if(movL>minX){
				movL=minX
			}
			if(movY<0){
				movY=0
			}else if(movY>minY){
				movY=minY
			}
			$('.mark').css({"left":movL,"top":movY})
			var x=$('#big img').width()/$(this).width()*movL;
			var y=$('#big img').height()/$(this).height()*movY;
			$('#big img').css({'margin-left':-x,"margin-top":-y})
		})

		//$('#box1').fadeIn(1000)//只对隐藏的元素起作用
		//$('#box1').slideDown(1000,function(){$(this).fadeOut()})
	})