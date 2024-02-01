import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { createSVG, wute } from "./utils.js";

async function updateAxis() {
    const width = 400;
    const height = 200;
    const marginBottom = 50;
    const svg = createSVG("container", width, height);

    const xScaleLinear = d3.scaleLinear(["red", "blue"])
        .domain([1, 1000])
        .range([0, width]);

    const gx = svg.append("g")
        // .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(xScaleLinear));

    const xScaleLog = d3.scaleLog()
        .domain([1, 1000])
        .range([0, height]);

    // Wait for the transition to log scale to complete
    await wute(gx.transition().duration(3000).call(d3.axisRight(xScaleLog)));

    // Linear scale
    const color = d3.scaleLinear()
        .domain([1, 1000])
        .range([0, width])

    // Then transition back to linear scale
    await wute(gx.transition().duration(3000).call(d3.axisBottom(color)).tickValues([1, 2, 3, 5, 8, 13, 21]));
}

updateAxis();
