import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import drawDebugGrid from "./utils.js"
import drawIntro from "./intro.js"


async function Scene() {
    const width = 600;
    const height = 600;
    const subtitle = "tax-loss harvesting in detail";

    const svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    drawDebugGrid(svg, width, height, 100);
    drawIntro(svg, width, height, subtitle);
    

}

Scene();
