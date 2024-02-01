import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// export function createSVG(containerId, width, height) {
//     const svg = d3.create("svg")
//         .attr("width", width)
//         .attr("height", height);
//     d3.select(`#${containerId}`).append(() => svg.node());
//     return svg;
// }

export default function drawDebugGrid(svg, width, height, spacing) {
    // Outline
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1)


    // Create Horizontal Grid Lines
    for (let i = 0; i <= height; i += spacing) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", i)
            .attr("x2", width)
            .attr("y2", i)
            .attr("stroke", i === height / 2 ? "#ddd" : "#000")  // Lighter color for center line
            .attr("stroke-width", 1);
    }

    // Create Vertical Grid Lines
    for (let i = 0; i <= width; i += spacing) {
        svg.append("line")
            .attr("x1", i)
            .attr("y1", 0)
            .attr("x2", i)
            .attr("y2", height)
            .attr("stroke", i === width / 2 ? "#ddd" : "#000")  // Lighter color for center line
            .attr("stroke-width", 1);
    }

    // Add Red Circle in the Center
    svg.append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", 5)  // Radius of the circle
        .attr("fill", "red");

    // Add coordinates
    for (let y = 0; y <= height; y += spacing) {
        for (let x = 0; x <= width; x += spacing) {
            svg.append("text")
                .attr("x", x + 5) // Adjust for positioning
                .attr("y", y - 8)
                .text(`[${x},${y}]`)
                .style("font-size", "10px")
                .attr("fill", "#666"); // Choose a subtle color
        }
    }
}

// Function to wrap a transition in a Promise
// [W]ait [U]ntil T]ransition [E]nds
export function wute(transition) {
    return new Promise((resolve, reject) => {
        transition
            .on("end", resolve) // Resolve the promise when the transition ends
            .on("interrupt", reject); // Reject the promise if the transition is interrupted
    });
}