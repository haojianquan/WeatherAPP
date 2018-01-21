//1.引入远程数据
//关于城市信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
	}
})

//获取天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
	}
})

//页面加载函数
window.onload=function(){
	//加载数据
	update();

	//页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	//点击城市出现城市详情页
	pos.onclick=function()
	{
		cityBox.style.display="block";
	}

	//点击城市详情，跳转首页，出现该城市的天气情况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
			var chengshi=this.innerHTML;

			//调用ajax函数
			AJAX(chengshi);
		}
	}

	//搜索部分
	// var searchBox=document.getElementsByClassName("searchBox")[0];
	// var button=document.getElementsByClassName("button")[0];
	// searchBox.onfocus=function(){
	// 	button.innerHTML="确认";
	// 	text=searchBox.value;
	// }
	// button.onclick=function(){
	// 	var neirong=button.innerHTML;
	// 	if(neirong=="取消"){
	// 		var city3=document.getElementsByClassName("city")[0];
	// 		city3.style.display="none";
	// 	}else{
	// 		for(let i in city){
	// 			for(let j in city[i]){
	// 				if(text==j){
	// 					AJAX(text);
	// 					return;
	// 				}else{
	// 					alert("没有此城市天气情况");
	// 					return;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
}


//点击城市的天气信息函数
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
})
}
//获取数据函数
function update(){
	//城市
	var pos=document.getElementsByClassName("pos")[0];
	pos.innerHTML=tianqi.city;

	//当前天气情况
	var quality_level=document.getElementsByTagName("h5")[0];
	quality_level.innerHTML=tianqi.weather.quality_level;

	//获取当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

	//当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;

	//当前风向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;

	//当前风力
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";

	//今天最高气温
	var today_heigher=document.getElementsByClassName("today_heigher")[0];
	today_heigher.innerHTML=tianqi.weather.dat_high_temperature+"℃";

	//今天最低气温
	var today_lower=document.getElementsByClassName("today_lower")[0];
	today_lower.innerHTML=tianqi.weather.dat_low_temperature+"℃";

	//今天天气情况
	var today_con=document.getElementsByClassName("today_con")[0];
	today_con.innerHTML=tianqi.weather.dat_condition;

	//今天的天气图标
	var today_icon=document.getElementsByClassName("conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

	//明天最高气温
	var tomorrow_heigher=document.getElementsByClassName("tomorrow_heigher")[0];
	tomorrow_heigher.innerHTML=tianqi.weather.tomorrow_high_temperature+"℃";

	//明天最低气温
	var tomorrow_lower=document.getElementsByClassName("tomorrow_lower")[0];
	tomorrow_lower.innerHTML=tianqi.weather.tomorrow_low_temperature+"℃";

	//明天天气情况
	var tomorrow_con=document.getElementsByClassName("tomorrow_con")[0];
	tomorrow_con.innerHTML=tianqi.weather.tomorrow_quality_level;


	//明天的天气图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
    tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

    //每小时的天气情况
    var hourlyArr=tianqi.weather.hourly_forecast;
    var wrap=document.getElementsByClassName("wrap")[0];
    for(let i in hourlyArr)
    {
    	var  box1=document.createElement("div");
    	box1.className="box";

    	var time=document.createElement("div");
    	time.className="time";
    	box1.appendChild(time);
    	time.innerHTML=hourlyArr[i].hour+":00";

    	var icon=document.createElement("div");
    	icon.className="icon";
    	box1.appendChild(icon);
        icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

    	var timeTem=document.createElement("div");
    	timeTem.className="timeTem";
    	box1.appendChild(timeTem);
    	timeTem.innerHTML=hourlyArr[i].temperature+"°";

    	wrap.appendChild(box1);
    }

    //未来15天天气情况
    var forecastArr=tianqi.weather.forecast_list;
    var wrap1=document.getElementsByClassName("wrap1")[0];
    for(let i in forecastArr)
    {
    	var  box1=document.createElement("div");
    	box1.className="box";

    	var date=document.createElement("div");
    	date.className="date";
    	box1.appendChild(date);
    	date.innerHTML=forecastArr[i].date;
    	
    	var weather1=document.createElement("div");
    	weather1.className="weather1";
    	box1.appendChild(weather1);
        weather1.innerHTML=forecastArr[i].condition;

        var icon1=document.createElement("div");
    	icon1.className="icon1";
    	box1.appendChild(icon1);
        icon1.style=`background-image:url("img/${forecastArr[i].weather_icon_id}.png")`;

    	var tem=document.createElement("div");
    	tem.className="tem";
    	box1.appendChild(tem);
    	var heigherTem=document.createElement("div");
    	heigherTem.className="heigherTem";
    	tem.appendChild(heigherTem);
    	heigherTem.innerHTML=forecastArr[i].high_temperature+"℃";
    	var lowerTem=document.createElement("div");
    	lowerTem.className="lowerTem";
    	tem.appendChild(lowerTem);
    	lowerTem.innerHTML=forecastArr[i].low_temperature+"℃";

    	var icon2=document.createElement("div");
    	icon2.className="icon2";
    	box1.appendChild(icon2);
        icon2.style=`background-image:url("img/${forecastArr[i].weather_icon_id}.png")`;

        var weather2=document.createElement("div");
    	weather2.className="weather2";
    	box1.appendChild(weather2);
        weather2.innerHTML=forecastArr[i].condition;

		var windy=document.createElement("div");
    	windy.className="windy";
    	box1.appendChild(windy);
    	var dir=document.createElement("div");
    	dir.className="dir";
    	windy.appendChild(dir);
    	dir.innerHTML=forecastArr[i].wind_direction;
    	var grad=document.createElement("div");
    	grad.className="grad";
    	windy.appendChild(grad);
    	grad.innerHTML=forecastArr[i].wind_level+"级";        

    	wrap1.appendChild(box1);
    }
    



    //关于城市的情况
    var city1=document.getElementsByClassName("city")[0];
    for(let i in city){
    	var citys=document.createElement("div");
    	citys.className="citys";

    	var title=document.createElement("div");
    	title.className="title";
    	title.innerHTML=i;
    	citys.append(title);

    	var con=document.createElement("div");
    	con.className="con";

    	for(let j in city[i]){
    		var box=document.createElement("div");
    		box.className="box";
    		box.innerHTML=j;
    		con.appendChild(box);
    	}
    	citys.appendChild(con);
    	city1.appendChild(citys);
    }
    
}