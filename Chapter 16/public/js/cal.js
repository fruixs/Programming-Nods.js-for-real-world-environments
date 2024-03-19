
//달력 초기화 재설정
function resetCalendar(){
	setTitle(year,month);
	initCal(year,month);
	setEvent();
}

function setTitle(y,m){
	
	var prev_month,prev_year;
	var next_month,next_year;
	
	//이전 다음달 
	prev_month = month - 1;
	next_month = month + 1;
	prev_year = year;
	next_year = year;
	//1월 12월인 경우 처리
	if(month == 1){
		prev_month = 12;
		prev_year = prev_year -1;
	}else if(month == 12){
		next_month = 1;
		next_year = next_year +1;
	}
	
	$('.prevMonth').text(prev_year + '-' + prev_month );
	$('.currentMonth').text(year + '-' +(month));
	$('.nextMonth').text(next_year + '-' + next_month);
	
	$('.prevMonth').unbind('click');
	$('.nextMonth').unbind('click');

	$('.prevMonth').bind('click',function(){
		//1윌인 경우 전년도로 변경
		if(month == 1){
			month = 12;
			year = year - 1;
		}else{
			month = month -1;
		}
		resetCalendar();
		
	});
	
	$('.nextMonth').bind('click',function(){
		//12윌인 경우 다음년도로
		if(month == 12){
			month = 1;
			year = year + 1;
		}else{
			month = month +1;
		}
		resetCalendar();
	});
}

function initCal(y,m){
	
	var start_day = new Date(y,m-1,1).getDay();
	var end_day = get_day_max(y,m-1);
	
	//기존 내역 지우기
	$('#calMain_day').empty();
	
	for(var i = 0 ; i < 42 ; i++){
		
		if(start_day > i){
			// 시작일 보다 작은 경우 공백
			$('#calMain_day').append("<div class = 'cel_dummy'></div>");
		}else if((i-start_day+1) <= end_day ){
			//아이디값 설정 cal_yyyymmdd
			var tmp_id = y + "" + get_number_str(m) + "" + get_number_str(i-start_day+1);
			//날자 출력 
			$('#calMain_day').append("<div id = '" + tmp_id + "' class = 'cel'>" + (i-start_day+1) + "</div>");
			
			//일요일인 경우 출력 
			if(i%7 ==0)
				$("#" + tmp_id).addClass('red');
			//토요일인 경우 출력 
			if(i%7 ==6)
				$("#" + tmp_id).addClass('blue');
			
		}else{
			
			if(i%7 == 0){
				break;
			}else{
				// 끝 날보다 큰경우 공백출력
				$('#calMain_day').append("<div class = 'cel_dummy'></div>");
			}
		}
	}
	
	//마우스 효과 처리 
	$('.cel').bind('mouseover',function(){
		$(this).css('background','#DDDDDD');
	});
	$('.cel').bind('mouseout',function(){
		$(this).css('background','transparent');
	});
	
	
}

function get_day_max(year,month){
	
	var i = 29, cday;
	while(i<32){
		cday = new Date(year,month,i);
		if (cday.getFullYear()!=year || cday.getMonth()!=month) break;
			i++;
	}
	return i-1;
}

function get_number_str(num){
	if (num<10){
		num = '0' + num;
	}
	return num;
}
