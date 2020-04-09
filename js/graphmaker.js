var x = location.search; //get query string
var title, xaxis, yaxis, type, i;
y = x.split('&');
if(y[0].slice(-1) == '=')
    title = "My Graph";
else
    title = y[0].slice(7);

i = y[1].indexOf('=')
type = y[1].slice(i+1)

if(y[2].slice(-1) == '=')
    xaxis = "X-axis";
else
    xaxis = y[2].slice(6);

if(y[3].slice(-1) == '=')
    yaxis = "Y-axis";
else
    yaxis = y[3].slice(6);


var labels = [], heights = [], dataPoints = [];
var l = 0, h = 0, d = 0, max, min;
if(type == 'Bar' || type == 'Line')
    i = 4;
else
    i = 2;

for(;i<y.length; i++){
    switch(y[i][0]){
        case 'd':
            if(y[i].slice(-1) != '='){
                if(type == "Line")
                labels[l] = Number(y[i].slice(6));
                else
                labels[l] = y[i].slice(6);
                l++;
            }
            else{
                if(type == "Line")
                labels[l] = null;
                else
                labels[l] = "";
                l++;
            }
            break;
        case 'h':
            if(y[i].slice(-1) != '='){
                heights[h] = Number(y[i].slice(4));
                h++;
            }
            else{
                heights[h] = null;
                h++;
            }
            break;
    }   
}

for(i=0; i<labels.length; i++){
    if((labels[i] != "" && type == "Bar" || type == "Pie") || (labels[i] != null && type == "Line")){
        if(type == 'Bar'){
            dataPoints[d] = { label: labels[i],  y: heights[i]  };
            d++;
        }
        else if(type == "Pie"){
            dataPoints[d] = { y: heights[i], indexLabel: labels[i]  };
            d++;
        }
        else{
            dataPoints[d] = { x: labels[i],  y: heights[i]  };
            d++;
        }
    }
}
if(type == "Line"){
    var minx = dataPoints.reduce((min, p) => p.x < min ? p.x : min, dataPoints[0].x);
    var maxx = dataPoints.reduce((max, p) => p.x > max ? p.x : max, dataPoints[0].x);
}

if(type == "Bar"){
    window.onload = function () {
        var chart = new CanvasJS.Chart("chartContainer"); 
        chart.options.title = {
            text: title,
            fontFamily: 'calibri'
        };
        chart.options.axisX = {
            title: xaxis
        };
        chart.options.axisY = {
            title: yaxis
        };
        var series = {
            type: "column"
        };
        chart.options.data = [];
        chart.options.data.push(series);
        series.dataPoints = this.dataPoints;
        chart.render();
    }
}
else if(type == "Pie"){
    window.onload = function () {
        var chart = new CanvasJS.Chart("chartContainer"); 
        chart.options.title = {
            text: title,
            fontFamily: 'calibri'
        };
        chart.options.legend = {
            maxWidth: 350,
            itemWidth: 120
        };
        var series = {
            type: "pie",
        };
        chart.options.data = [];
        chart.options.data.push(series);
        series.dataPoints = this.dataPoints;
        chart.render();
    }
}
else{
    max++;
    window.onload = function () {
        var chart = new CanvasJS.Chart("chartContainer"); 
        chart.options.title = {
            text: this.title,
            fontFamily: 'calibri'
        };
        chart.options.axisX = {
            title: xaxis,
            maximum: this.max
        };
        chart.options.axisY = {
            title: yaxis
        };
        var series = {
            type: "line"
        };
        chart.options.data = [];
        chart.options.data.push(series);
        series.dataPoints = this.dataPoints;
        chart.render();
    }
}
