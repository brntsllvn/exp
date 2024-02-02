import { typeWriter, wait, fadeOut, fadeIn, moveTo, move } from "./animations.js"

export default async function drawIntro(svg, width, height, subtitleText) {
    // Assuming the canvas is square, use either width or height
    const canvasSize = Math.min(width, height);
    const canvasCenterX = width / 2;
    const canvasCenterY = height / 2;

    // Define the size of the logo relative to the canvas size
    const logoSize = canvasSize * 0.75;
    const logoCenterX = (width - logoSize) / 2;
    const logoCenterY = (height - logoSize) / 2;

    const logo = svg.append("image")
        .attr("href", "./logos/square-dark.png")
        .attr("width", logoSize)
        .attr("height", logoSize)
        .attr("x", logoCenterX)
        .attr("y", logoCenterY);

    const logoOutline = svg.append("rect")
        .attr("width", logoSize)
        .attr("height", logoSize)
        .attr("stroke", "pink")
        .attr("stroke-width", 4)
        .attr("fill", "none")
        .attr("x", logoCenterY)
        .attr("y", logoCenterY);

    const logoGroup = [logo, logoOutline]

    await moveTo(logoGroup, 500, width / 2, height / 2 - height * 0.20)

    const subtitle = svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "28px")
        .style("opacity", 1)
        .attr("x", canvasCenterX)
        .attr("y", canvasCenterY + height * 0.10);

    logoGroup.push(subtitle);

    await typeWriter(subtitle, subtitleText, 60);
    await wait(500)
    await fadeOut(logoGroup, 1500);
}
