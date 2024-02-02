import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { drawCanvasOutline, drawDebugGrid } from "./utils.js"
import drawIntro from "./intro.js"


async function Scene() {
    window.debug = false;

    const width = 400;
    const height = width;
    const subtitle = "tax-loss harvesting in detail";

    const svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    drawCanvasOutline(svg, width, height)
    drawDebugGrid(svg, width, height);
    drawIntro(svg, width, height, subtitle);


}

Scene();
