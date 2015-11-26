/**
 * @author Dimitry Kudrayvtsev
 * @author Mindaugas Greibus
 * @version 1.1
 */

d3.gantt = function() {

    
    var margin = {
	top : 20,
	right : 40,
	bottom : 20,
	left : 150
    };
	
	var totalDaysOfSprint = 13;
	var ticketUrl = "https://google.com/";
    var taskTypes = [];
    var taskStatus = [];
    var height = document.body.clientHeight - margin.top - margin.bottom-5;
    height = Math.max(600,height);
    console.log(height);
    var width = document.body.clientWidth - margin.right - margin.left-5;
    var x, y, ySubtasksAxis,yDevsAxis, xAxis, xAxisWeekend, xAxisToday;

	var workDayOfSprint = 0; 
	var niceMargin = 5;

    var sec2day = function(sec){
    	return sec/28800;
    }

    var rectTransform = function(d) {
    	var startDay = workDayOfSprint-sec2day(d.parentSpentSec);
    	console.log("[rectTransform]startDate: " + startDay + " for " + d.subtask);
    	startDate = Math.max(0,startDay);
		return "translate(" + x(startDay) + "," + y(d.subtask) + ")";
    };

    var getParentDaysTillCommitment= function(d){
    	var parentDaysTillCommitment = 0
    	if(typeof d.parentDaysTillCommitment  !== "undefined"){
			parentDaysTillCommitment = Math.max(parentDaysTillCommitment,d.parentDaysTillCommitment);
    	}
    	return parentDaysTillCommitment;
    }

    var parentWidhFunction = function(d){
    	var parentDaysTillCommitment = getParentDaysTillCommitment(d);
    	
    	var startDay = 0+workDayOfSprint;
    	var estimatedEndDay = sec2day(d.parentSpentSec)+parentDaysTillCommitment + workDayOfSprint;
		//console.log("[parentWidhFunction]d.parentSpentSec: " +d.parentSpentSec + "; d.parentDaysTillCommitment=" + d.parentDaysTillCommitment+";workDayOfSprint=" + workDayOfSprint)
    	console.log("[parentWidhFunction]startDate: " + startDay + " and estimatedEndDay:" + estimatedEndDay + " for " + d.subtask);
    	
    	return x(estimatedEndDay)-x(startDay); 
    }


    var initAxis = function() {
		x = d3.scale.linear().domain([0, totalDaysOfSprint]).range([0, width]);
		y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
		xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(-height, 0, 0);
		xAxisWeekend = d3.svg.axis().scale(x).orient("bottom").tickValues([4,9,14]).tickSize(-height, 0, 0).tickFormat("");
		xAxisToday = d3.svg.axis().scale(x).orient("bottom").tickValues([workDayOfSprint-0.5]).tickSize(-height, 0, 0).tickFormat(function(d, i){
    		return new Date().toISOString().slice(0, 10);

		})
		;
		yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickSize(-width, 0, 0);
    };


    
    function gantt(tasks) {

	initAxis();
	
	var svg = d3.select("body")
	.append("svg")
	.attr("class", "chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
        .attr("class", "gantt-chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
	///Parent container
      var bar = svg.selectAll(".chart")
	 .data(tasks, function(d) {
		return d.subtask;
    }).enter()
	 .append("g")
		 .attr("y", 0)
		 .attr("transform", rectTransform)
		 .attr("height", function(d) { return y.rangeBand(); })
		 .attr("width", parentWidhFunction);;


	
	 //// Full parent
	 bar.append("rect").attr("rx", niceMargin)
         .attr("ry", niceMargin)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return taskStatus[d.status];
	     }) 
	 .attr("height", function(d) { return y.rangeBand(); })
	 .attr("width", parentWidhFunction)
	 .on("click", function(d) {
  		console.log("rect: " +d.parent);
  		window.open(ticketUrl+d.parent); 
  		d3.event.stopPropagation();
	  });


	 //// parent progress
	 	 bar.append("rect").attr("rx", niceMargin)
         .attr("ry", niceMargin)
	 .attr("class", "parent progress") 
	 .attr("y",y.rangeBand()-niceMargin*4)
	 .attr("height", function(d) { return(niceMargin*2); })
	 .attr("width", function(d){
	 	var parentDaysTillCommitment = getParentDaysTillCommitment(d);
    	var startDay = 0+workDayOfSprint;
    	var estimatedEndDay = sec2day(d.parentSpentSec)+parentDaysTillCommitment + workDayOfSprint;
    	var progress = (d.parentSpentSec/d.parentEstimateSec);
    	var xEstimate =  x((estimatedEndDay-startDay)*progress);
    	return xEstimate; 
    });
	 
	 bar.append("text")
                 .text( function (d) { if(typeof d.avatar  !== "undefined"){return "";}return d.developer; })
                 .attr("dx", function(){
                 	//debugger;
                 	return -this.getBBox().width})
                 //.attr("dy",30)
            	 //.attr("dy", "-.5em")
                 .attr("transform", "rotate(-90)" )
                 ;
     bar.append("svg:image")
		   .attr('x',-9)
		   .attr('y',-12)
		   .attr('width', 40)
		   .attr('height', 44)
		   .attr("xlink:href",function(d){return d.avatar})

      	
	 //// Full subtask
	 bar.append("rect").attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", "subtask") 
	 .attr("y",niceMargin*2)
	 .attr("x", function(d){
    	var startDay = 1;
    	//debugger;
    	return x(sec2day(d.parentSpentSec)-sec2day(d.subtaskSpentSec)-1); 
    })
	 .attr("height", function(d) { return (y.rangeBand()/2)-(niceMargin*4); })
	 .attr("width", function(d){
    	var startDay = 1;
    	return x(sec2day(d.subtaskEstimateSec)); 
    })
    .on("click", function(d) {
  		console.log("rect: " +d.subtask);
  		window.open(ticketUrl+d.subtask); 
  		d3.event.stopPropagation();
	  });

   	 //// subtask progress`
	 bar.append("rect").attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", "subtask progress") 
	 .attr("y",niceMargin*4)
	 .attr("x", function(d){
    	var startDay = 1;
    	return x(sec2day(d.parentSpentSec)-sec2day(d.subtaskSpentSec)-1); 
    })
	 .attr("height", function(d) { return (y.rangeBand()/2)-(niceMargin*7); })
	 .attr("width", function(d){
    	var startDay = 1;
    	var progress = sec2day(d.subtaskEstimateSec)*(d.subtaskSpentSec/d.subtaskEstimateSec);
    	return x(progress); 
    });
     
	 
	 
	 svg.append("g")
	 .attr("class", "x axis days")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxis);
	 
	svg.append("g")
	 .attr("class", "x axis weekend")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxisWeekend);

	 svg.append("g")
	 .attr("class", "x axis today")
	 .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	 .transition()
	 .call(xAxisToday).selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-0.25em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-90)" );

	 svg.append("g").attr("class", "y axis").transition().call(yAxis)
	 	.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "3em")
            .attr("dy", "-.5em")
            .attr("transform", "rotate(-90)" );

	
	 return gantt;

    };

    gantt.taskTypes = function(value) {
	if (!arguments.length)
	    return taskTypes;
	taskTypes = value;
	return gantt;
    };
    
    gantt.taskStatus = function(value) {
	if (!arguments.length)
	    return taskStatus;
	taskStatus = value;
	return gantt;
    };

    gantt.width = function(value) {
	if (!arguments.length)
	    return width;
	width = +value;
	return gantt;
    };

    gantt.height = function(value) {
	if (!arguments.length)
	    return height;
	height = +value;
	return gantt;
    };

    gantt.ticketUrl = function(value) {
	if (!arguments.length)
	    return ticketUrl;
	ticketUrl = value;
	return gantt;
    };


    gantt.workDayOfSprint = function(value) {
	if (!arguments.length)
	    return workDayOfSprint;
	workDayOfSprint = value;
	return gantt;
    };

    gantt.totalDaysOfSprint = function(value) {
	if (!arguments.length)
	    return workDayOfSprint;
	totalDaysOfSprint = value;
	return gantt;
    };
    
    return gantt;
};
