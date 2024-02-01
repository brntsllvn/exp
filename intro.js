export default async function drawIntro(svg, width, height, subtitleText) {
    const logo = svg.append("image")
        .attr("href", "./logos/square-dark.png")
        .attr("width", 400)
        .attr("height", 400)
        .attr("x", 100)
        .attr("y", 100);

    await transition(logo, 1000, { x: 100, y: 50 });

    const subtitle = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + 100)
        .attr("text-anchor", "middle")
        .style("font-size", "28px")
        .style("opacity", 1);

    await typeWriter(subtitle, subtitleText, 100);
    await fadeOut([subtitle, logo], 2000, 1500);
}

function transition(element, duration, attributes) {
    return new Promise(resolve => {
        const transition = element.transition().duration(duration);
        for (const attr in attributes) {
            transition.attr(attr, attributes[attr]);
        }
        transition.on("end", resolve);
    });
}

function typeWriter(element, text, speed) {
    return new Promise(resolve => {
        let i = 0;
        function typeNext() {
            if (i < text.length) {
                element.text(text.substring(0, i + 1));
                i++;
                setTimeout(typeNext, speed);
            } else {
                resolve();
            }
        }
        typeNext();
    });
}

function fadeOut(elements, duration, delay = 0) {
    const promises = elements.map(element => {
        return new Promise(resolve => {
            element.transition()
                .delay(delay)
                .duration(duration)
                .style("opacity", 0)
                .on("end", () => {
                    element.remove();
                    resolve();
                });
        });
    });

    return Promise.all(promises);
}
