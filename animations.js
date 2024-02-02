export function wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export function fadeIn(elements, duration) {
    elements.forEach(element => element.style("opacity", 0));
    return fade(elements, duration, 1);
}

export function fadeOut(elements, duration) {
    elements.forEach(element => element.style("opacity", 1));
    return fade(elements, duration, 0);
}

function fade(elements, duration, targetOpacity) {
    const promises = elements.map(element => {
        return new Promise(resolve => {
            element.transition()
                .duration(duration)
                .style("opacity", targetOpacity)
                .on("end", () => resolve());
        });
    });
    return Promise.all(promises);
}

export function moveTo(elements, duration, targetX, targetY) {
    const promises = elements.map(element => {
        return new Promise(resolve => {
            // Calculate the center position
            const width = parseFloat(element.attr("width")) || 0;
            const height = parseFloat(element.attr("height")) || 0;
            const centerX = targetX - width / 2;
            const centerY = targetY - height / 2;

            let transformString = `translate(${centerX}, ${centerY})`;

            // If the element has explicit 'x' and 'y' attributes (e.g., rect, image)
            if (element.attr("x") !== null && element.attr("y") !== null) {
                element.transition()
                    .duration(duration)
                    .attr("x", centerX)
                    .attr("y", centerY)
                    .on("end", resolve);
            } else {
                // For elements positioned with 'transform' (e.g., circle, text)
                element.transition()
                    .duration(duration)
                    .attr("transform", transformString)
                    .on("end", resolve);
            }
        });
    });

    return Promise.all(promises);
}

export function move(elements, duration, down, right) {
    const promises = elements.map(element => {
        return new Promise(resolve => {
            // Attempt to get current position; default to 0 if not set
            let currentX = parseFloat(element.attr("x")) || 0;
            let currentY = parseFloat(element.attr("y")) || 0;

            // If the element is already using transform for positioning, adjust from current transform
            const currentTransform = element.attr("transform");
            if (currentTransform && /translate\(([^,]+),\s*([^)]+)\)/.test(currentTransform)) {
                const match = /translate\(([^,]+),\s*([^)]+)\)/.exec(currentTransform);
                currentX = parseFloat(match[1]);
                currentY = parseFloat(match[2]);
            }

            const newX = currentX + right;
            const newY = currentY + down;

            if (element.attr("x") !== null && element.attr("y") !== null) {
                // For elements with direct 'x' and 'y' positioning
                element.transition()
                    .duration(duration)
                    .attr("x", newX)
                    .attr("y", newY)
                    .on("end", resolve);
            } else {
                // For elements positioned with 'transform'
                const newTransform = `translate(${newX}, ${newY})`;
                element.transition()
                    .duration(duration)
                    .attr("transform", newTransform)
                    .on("end", resolve);
            }
        });
    });

    return Promise.all(promises);
}


export function typeWriter(element, text, speed) {
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
