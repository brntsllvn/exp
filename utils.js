export function drawDebugGrid(svg, width, height) {
    if (!window.debug) return;

    const spacing = Math.min(width, height) / 3;

    // Create Horizontal Grid Lines
    for (let i = 0; i <= height; i += spacing) {
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", i)
            .attr("x2", width)
            .attr("y2", i)
            .attr("stroke", "gray")
            .attr("stroke-width", 1);
    }

    // Create Vertical Grid Lines
    for (let i = 0; i <= width; i += spacing) {
        svg.append("line")
            .attr("x1", i)
            .attr("y1", 0)
            .attr("x2", i)
            .attr("y2", height)
            .attr("stroke", "gray")
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
                .text(`[${Math.round(x)},${Math.round(y)}]`)
                .style("font-size", "10px")
                .attr("fill", "#666"); // Choose a subtle color
        }
    }
}

export function drawCanvasOutline(svg, width, height) {
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
}