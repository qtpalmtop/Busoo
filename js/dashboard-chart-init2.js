// Use Morris.Area instead of Morris.Line

$(function() {

    var d1 = [
        [0, 0],
        [1, 9],
        [2, 8],
        [3, 0],
        [4, 9],
        [5, 0],
        [6, 9],
        [7, 0],
        [8, 8],
        [9, 8],
        [10, 7]

    ];
    var d2 = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 0],
        [4, 1],
        [5, 0],
        [6, 1],
        [7, 0],
        [8, 2],
        [9, 2],
        [10, 3]
    ];

    var data = ([{
        label: "正在运行的车辆数",
        data: d1,
        lines: {
            show: true,
            fill: true,
            fillColor: {
                colors: ["rgba(255,255,255,.4)", "rgba(183,236,240,.4)"]
            }
        }
    },
        {
            label: "未运行的车辆数",
            data: d2,
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: ["rgba(255,255,255,.0)", "rgba(253,96,91,.7)"]
                }
            }
        }
    ]);

    var options = {
        grid: {
            backgroundColor:
            {
                colors: ["#ffffff", "#f4f4f6"]
            },
            hoverable: true,
            clickable: true,
            tickColor: "#eeeeee",
            borderWidth: 1,
            borderColor: "#eeeeee"
        },
        // Tooltip
        tooltip: true,
        tooltipOpts: {
            content: "%s X: %x号线 Y: %y辆车正在运行",
            shifts: {
                x: -60,
                y: 25
            },
            defaultTheme: false
        },
        legend: {
            labelBoxBorderColor: "#000000",
            container: $("#main-chart-legend"), //remove to show in the chart
            noColumns: 0
        },
        series: {
            stack: true,
            shadowSize: 0,
            highlightColor: 'rgba(000,000,000,.2)'
        },
//        lines: {
//            show: true,
//            fill: true
//
//        },
        points: {
            show: true,
            radius: 3,
            symbol: "circle"
        },
        colors: ["#5abcdf", "#ff8673"]
    };
    var plot = $.plot($("#main-chart #main-chart-container"), data, options);
});