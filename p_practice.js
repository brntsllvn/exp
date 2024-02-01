import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { createSVG } from "./utils.js";

function drawAxes(svg, width, height) {
    const marginTop = 30, marginRight = 30, marginBottom = 50, marginLeft = 40;

    const x = d3.scaleUtc()
        .domain([new Date("2023-01-01"), new Date("2024-01-01")])
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marginBottom, marginTop]);

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y));
}

function clearSVG(svg) {
    svg.selectAll("*").remove();
}

function drawCircle(svg) {
    svg.append("circle")
        .attr("cx", 150)
        .attr("cy", 150)
        .attr("r", 50)
        .attr("fill", "blue");
}

const width = 700;
const height = 300;
const svg = createSVG("container", width, height);
drawAxes(svg, width, height);
setTimeout(() => clearSVG(svg), 1000);
setTimeout(() => drawCircle(svg), 2000);