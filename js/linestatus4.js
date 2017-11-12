var map;
color = ["#5278bf", "#e4601f", "#ea2b2b", "#b926a6", "#5278bf", "#e4601f", "#ea2b2b", "#b926a6"];
img = ["../images/1.png", "../images/2.png", "../images/3.png", "../images/4.png", "../images/1.png", "../images/2.png", "../images/3.png", "../images/4.png"];

function mapInit() { //初始化地图对象，加载地图。
	map = new AMap.Map('map', {
		center: [104.187874, 30.647379],
		zoom: 12,
	});

	var ajust = document.getElementById("ajustline");
	$("#createline").click(function() {
		if (ajust.value == 2) {
			map.clearMap();
			drawline2();
			drawAllStation2();
			$("#panel-3").hide();
			$("#panel-4").hide();
		}
	});


	drawline1();
	drawAllStation1();

	function drawAllStation1() {
		drawstation([104.187874, 30.647379], "出发点", "成都大学");
		drawstation([104.1078621960, 30.5737952298], "成都竹望山)");
		drawstation([104.1610697023, 30.6967007420], "成都龙潭立交)");
		drawstation([104.1171951236, 30.5982315408], "成都锦江区政府");
		drawstation([104.070452, 30.659514], "中信银行(成都银河王朝支行)(顺城大街106-108号)");
		drawstation([104.1500840723, 30.7535060551], "保利198公园");
		drawstation([104.2957231365, 30.6320839658], "大纹坝");
		drawstation([104.3142591322, 30.6290707116], "蔚然花海");
		drawstation([104.1300049596, 30.7642135829], "成都植物园");
	}

	function drawAllStation2() {
		drawstation([104.187874, 30.647379], "出发点", "成都大学");
		drawstation([104.1078621960, 30.5737952298], "成都竹望山)");
		// drawstation([104.1610697023,30.6967007420],"成都龙潭立交)");
		drawstation([104.1171951236, 30.5982315408], "成都锦江区政府");
		// drawstation([104.070452,30.659514],"中信银行(成都银河王朝支行)(顺城大街106-108号)");
		// drawstation([104.1500840723,30.7535060551],"保利198公园");
		drawstation([104.2957231365, 30.6320839658], "大纹坝");
		drawstation([104.3142591322, 30.6290707116], "蔚然花海");
		// drawstation([104.1300049596,30.7642135829],"成都植物园");
	}
}
//站点 
function drawstation(res, addr) {
	var marker = new AMap.Marker({
		icon: "../images/station.png",
		position: res,
		map: map,
	});

	//信息框

	var title = "<div class='g1-heading g2-heading'>站点：" + addr + "</div>",
		content = [];
	content.push("");
	var infoWindow = new AMap.InfoWindow({
		isCustom: true, //使用自定义窗体
		content: createInfoWindow(title, content.join("<br/>")),
		offset: new AMap.Pixel(20, -30)
	});

	function createInfoWindow(title, content) {
		var info = document.createElement("div");
		info.className = "bar-g1";

		//可以通过下面的方式修改自定义窗体的宽高
		//info.style.width = "400px";
		// 定义顶部标题
		var top = document.createElement("div");
		var titleD = document.createElement("div");
		var closeX = document.createElement("img");
		top.className = "info-top";
		titleD.innerHTML = title;
		top.appendChild(titleD);
		info.appendChild(top);

		// 定义中部内容
		var middle = document.createElement("div");
		middle.className = "info-middle";
		middle.style.backgroundColor = 'white';
		middle.innerHTML = content;
		info.appendChild(middle);

		// 定义底部内容
		var bottom = document.createElement("div");
		bottom.className = "info-bottom";
		bottom.style.position = 'relative';
		bottom.style.top = '0px';
		bottom.style.margin = '0 auto';
		var sharp = document.createElement("img");
		sharp.src = "http://webapi.amap.com/../images/sharp.png";
		bottom.appendChild(sharp);
		info.appendChild(bottom);
		return info;
	}

	function closeInfoWindow() {
		map.clearInfoWindow();
	}
	//信息窗出现的时间
	AMap.event.addListener(marker, 'mouseover', function() {
		//打开信息窗
		infoWindow.open(map, marker.getPosition());
		//infowindow.open(map1,marker.getPosition()); //自由分配地点
		//infoWindow.close();关闭信息窗户
	});

}

lineArr = [];

function drawline1() {

	var line1 = [];
	line1.push([104.187874, 30.647379], [104.1078621960, 30.5737952298], [104.070452, 30.659514], [104.3142591322, 30.6290707116], [104.1300049596, 30.7642135829]);

	driving_route(line1[0], line1[1]);
	driving_route(line1[0], line1[2]);
	driving_route(line1[0], line1[3]);
	driving_route(line1[0], line1[4]);

}

function drawline2() {

	var line2 = [];
	line2.push([104.187874, 30.647379]);
	line2.push([104.1078621960, 30.5737952298]);
	// line1.push([104.070452,30.659514]);
	line2.push([104.3142591322, 30.6290707116]);
	// line1.push([104.1300049596,30.7642135829]);
	driving_route(line2[0], line2[1]);
	driving_route(line2[0], line2[2]);
	// driving_route(line1[0],line1[3]);
	// driving_route(line1[0],line1[4]);

}


function driving_route(start_xy, end_xy) {
	//路线规划类
	map.plugin(["AMap.Driving"], function() {
		var DrivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME //驾车方案最短时间
		};
		MDrive = new AMap.Driving(DrivingOption); //构造驾车导航类  
		AMap.event.addListener(MDrive, "complete", driving_routeCallBack); //返回导航查询结果 
		MDrive.search(start_xy, end_xy); //根据起终点坐标规划驾车路线 
	});
}

//接收数据，并显示
function driving_routeCallBack(data) { //data接收数据，老套路  【具体的数据结构console.log(data) 好好看】
	var routeS = data.routes; //数据都在routes里面的step里面step是一个数组，所以routes是一个二维数组
	for (var v = 0; v < routeS.length; v++) { //循环的是每条线路
		//驾车步骤数
		steps = routeS[v].steps; //存放的
	}
	drivingDrawLine(steps);
}

//把途径的地方用折线画出来
//绘制驾车导航路线
kk = 0;

function drivingDrawLine(steps) {
	lineArr = []
	var drawpath = new Array();
	//循环每两个点之间的路线
	for (var s = 0; s < steps.length; s++) {
		//每一个path都是由许多点组成的
		drawpath = steps[s].path;
		//把path中的每一个点都放进来
		for (var i = 0; i < drawpath.length; i++) {
			lineArr.push(steps[s].path[i]);
		}
		var polyline = new AMap.Polyline({ //每一步可能需要多个经纬度才能走完，所以path也是数组
			map: map,
			path: drawpath, //
			strokeColor: color[kk],
			strokeOpacity: 0.7,
			strokeWeight: 4,
			strokeDasharray: [10, 5]
		});
	}
	var m1 = new AMap.Marker({
		icon: img[kk],
		position: [104.187874, 30.647379],
		map: map,
		autoRotation: true
	});
	m1.moveAlong(lineArr, 2000 + Math.random() * 1000); //开始轨迹回放
	kk++;
}