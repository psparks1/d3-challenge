// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function (stateData) {
  console.log(stateData);
  
  
  stateData.forEach(function (data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    })
//scaling for axises
    var xScale= d3.scaleLinear()
    .domain([30,d3.max(stateData,d=>d.age)]).range([0,width]);

    var yScale= d3.scaleLinear()
    .domain([9,d3.max(stateData,d=>d.smokes)+1]).range([0,height]);


    var xaxis=d3.axisBottom(xScale)
    var yaxis=d3.axisLeft(yScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xaxis);

    chartGroup.append("g")
    .call(yaxis);

    //circle time woo
    var circles = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.smokes))

    .attr("r", "17")
    
    .attr("fill", "red")

    .attr("opacity", ".4");
    
    //this should add text i hope
    var circltext = chartGroup.selectAll(".mytext")
    .data(stateData)
    .enter()
    .append("text")
    .text((d) => d.abbr)
    .attr("x", d => xScale(d.age)-10)
    .attr("y", d => yScale(d.smokes+.1))



    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Age: ${d.age}<br>smokes: ${d.smokes}`);
    });

  chartGroup.call(toolTip);

  
  circles.on("click", function (data) {
    toolTip.show(data, this);
  })
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });



    //axis labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height -100))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("fill", "black")
    .style("font", "20px sans-serif")
    .style("font-weight", "bold")
    .text("Percent of Population that smokes");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .style("font", "20px sans-serif")
    .style("font-weight", "bold")
    .text("Average Age");

  }).catch(function (error) {
  console.log(error);
});

