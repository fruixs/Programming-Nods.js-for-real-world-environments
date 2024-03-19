var ctx;

//s.io 전역변수
var socket;

$(document).ready(function(){
	//jQuery 이용하여 canvas element 객체 얻기
	ctx = $('#cv').get(0).getContext('2d');
	
	//jQuery bind 이용하여 canvas에 마우스 시작,이동,끝 이벤트 핸들러 등록
	$('#cv').bind('mousedown',draw.start);
	$('#cv').bind('mousemove',draw.move);
	$('#cv').bind('mouseup',draw.end);
	
	//기본 모양 색상 설정
	shape.setShape();
	
	//clear 버튼에 이벤트 핸들러 등록
	$('#clear').bind('click',draw.clear);
	
	//색상 선택 select 설정
	for(var key in color_map){
		$('#pen_color').append('<option value=' + color_map[key].value + '>' +  color_map[key].name + '</option>');
	}

	//색상 선택 select 설정
	for(var i = 2 ; i < 15 ; i++){
		$('#pen_width').append('<option value=' + i + '>' +  i + '</option>');
	}
	
	$('select').bind('change',shape.change);

	socket = io.connect('http://' + window.location.host);
	
	socket.on('linesend_toclient', function (data) {
		draw.drawfromServer(data);
	});
	
	//map 띄우기 
	$('#btn_map').bind('click',mapObj.init);
	//map 내리기
	$('#btn_map_close').bind('click',mapObj.close);
	
	//map data recieve
	socket.on('map_toclient', function (data) {
		//데이터 처리
		mapObj.drawfromServer(data);
	});
	
	//road view 버튼 감추기
	$('#btn_raodview, #btn_raodview_close').hide();
	//로드뷰 보기 버튼에 이벤트 핸들러 등록
	$('#btn_raodview').bind('click',mapObj.roadview);
	//로드뷰 감추기 버튼에 이벤트 핸들러 등록
	$('#btn_raodview_close').bind('click',mapObj.roadviewClose);

});

//daum map 처리
var mapObj = {
	
	init : function(){
		if(map == undefined || $('#map').css('display') == 'none'){
			//맵 보이기 처리
			var x = 37.571811;
			var y = 126.976481;
	
			$('#map').css('display','block');
			//맵 객체생성
			map = new daum.maps.Map(document.getElementById('map'), {
				center: new daum.maps.LatLng(x, y),
				level: 3
			});
			
			//drag 시 발생하는 이벤트
			daum.maps.event.addListener(map, 'dragend',function(){
				socket.emit('map',{'type':'mapmove','x':map.getCenter().getLat(),'y':map.getCenter().getLng()});
			});
			
			//zoom 값 전송 
			daum.maps.event.addListener(map, 'zoom_changed',function(){
				socket.emit('map',{'type':'zoom','z':map.getLevel()});
			});
			
			socket.emit('map',{'type':'open','x':x,'y':y});
			
			//로드뷰 보이기 
			$('#btn_raodview, #btn_raodview_close').show();
		}
	},
	
	close : function(){
		if( $('#map').css('display') == 'block'){
			$('#map').css('display','none');
			socket.emit('map',{'type':'close'});
			//로드뷰감추기 
			$('#btn_raodview, #btn_raodview_close').hide();
		}
	},
	
	drawfromServer : function(data){
		//Map 띄우기
		if(data.type == 'open'){
			mapObj.init(data.type,data.x,data.y);
		}
		//Map 내리기
		if(data.type == 'close'){
			mapObj.close();
		}
		//맵 이동
		if(data.type == 'mapmove'){
			mapObj.mapMove(data.x,data.y);
		}
		//줌 변경 
		if(data.type == 'zoom'){
			mapObj.setZoom(data.z);
		}
		//로드뷰 오픈
		if(data.type == 'roadviewopen'){
			mapObj.roadview();
		}
		//로드뷰 감추기 
		if(data.type == 'roadviewclose'){
			mapObj.roadviewClose();
		}
	},
	
	mapMove : function(x,y){
		//맵이동 
		map.panTo(new daum.maps.LatLng(x, y));
	}, 
	
	setZoom : function(z){
		map.setLevel(z);
	},
	
	roadview : function(){
	
		//현재 맵 좌표 가져오기 Ea,Da값을 사용해봤습니다.
		var x = map.getCenter().Ea;
		var y = map.getCenter().Da;
		
		//무한 루프 방지하기 위하여 로드뷰가 없을 경우만 띄움
		if($('#roadview').css('display') == 'none'){
			socket.emit('map',{'type':'roadviewopen','x':x,'y':y});
		}
		
		//daum 안보기게 처리 
		$('#map').css('display','none');
		//로드뷰 띄우기
		$('#roadview').css('display','block');
		
		//로드뷰 띄우기		
		var p = new daum.maps.LatLng(map.getCenter().Ea, map.getCenter().Da);
		var rc = new daum.maps.RoadviewClient();
		var rv = new daum.maps.Roadview(document.getElementById("roadview"));
		
		//위치 값 절대 값으로 변경
		$('#roadview').css('position','absolute');
		
		//로드뷰 그리기
		rc.getNearestPanoId(p, 50, function(panoid) {
					rv.setPanoId(panoid);
				});
				
		
	},
	
	roadviewClose : function(){
		//로드뷰가 떠있을 경우
		if($('#roadview').css('display') == 'block'){
			//로드뷰 감추기
			$('#roadview').css('display','none');
			//맵 보이기
			$('#map').css('display','block');
			// roadviewclose 이벤트를 보냄
			socket.emit('map',{'type':'roadviewclose'});
		}
	}
}

var msg = {
	
	line : {
			send : function(type,x,y){
				console.log(type,x,y);
			 	socket.emit('linesend', { 'type': type , 'x':x , 'y':y , 'color': shape.color , 'width' : shape.width });
			}
	}
}

//색상 배열
var color_map = 
[
	{'value':'white','name':'하얀색'},
 	{'value':'red','name':'빨간색'},
 	{'value':'orange','name':'주황색'},
 	{'value':'yellow','name':'노란색'},
 	{'value':'blue','name':'파랑색'}, 	
 	{'value':'black','name':'검은색'}
];

var shape = {
	
	//기본 색상,두께 설정
	color : 'white',
	width : 3,
	
	change : function(){
		
		var color = $('#pen_color option:selected').val();
		var width = $('#pen_width option:selected').val();
	
		shape.setShape(color,width);
	},
	
	//모양 변경 메서드
	setShape : function(color,width){
		
		if(color != null)
			this.color = color;
		if(width != null)
			this.width = width;
	
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.width;
		
		ctx.clearRect(703, 0, 860, 90);
		
		ctx.beginPath(); 
		ctx.moveTo(710,55);
		ctx.lineTo(820,55);
		ctx.stroke();
	}
	
}
//그리기 관련 
var draw = {
	
	drawing : null,
	
	start : function(e){
		ctx.beginPath(); 
		ctx.moveTo(e.pageX,e.pageY);
		this.drawing = true;
		
		msg.line.send('start',e.pageX,e.pageY);
	},
	
	move : function(e){
		if(this.drawing){
			ctx.lineTo(e.pageX,e.pageY);
			ctx.stroke();
			msg.line.send('move',e.pageX,e.pageY);
		}

	},
	
	end : function(e){
		this.drawing = false;
		msg.line.send('end');
	},
	
	clear : function(){
		//전체 지우기 
		ctx.clearRect(0, 0, cv.width,cv.height);
		shape.setShape();
		msg.line.send('clear');
	},
	
	drawfromServer : function(data){
		
		if(data.type == 'start'){
			ctx.beginPath(); 
			ctx.moveTo(data.x,data.y);
			ctx.strokeStyle = data.color;
			ctx.lineWidth = data.width;
		}
		
		if(data.type == 'move'){
			ctx.lineTo(data.x,data.y);
			ctx.stroke();
		}
		
		if(data.type == 'end'){
		}

		if(data.type == 'clear'){
			ctx.clearRect(0, 0, cv.width,cv.height);
			shape.setShape();
		}

	}

}
