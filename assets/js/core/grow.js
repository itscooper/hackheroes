/*
  Project: Hack Heroes
  File: grow.js
  Description: Function to help elements fill vertical space
  Author: Chris Cooper
  License: GNU AGPLv3
  -----------------------------------------------------------
  This JavaScript file is part of the Hack Heroes project.
*/

/**
 * Dynamically adjusts the height of a DOM element to fit within its parent container, 
 * optionally accounting for the height of its sibling elements.
 * 
 * @param {HTMLElement} grower - The DOM element whose height will be adjusted.
 * @param {boolean} [withSiblings=false] - If true, the height of sibling elements will be subtracted 
 * from the available space in the parent container.
 * 
 * This function calculates the available vertical space within the parent container and 
 * adjusts the height of the `grower` element to fit that space, taking into account the 
 * margins, borders, and paddings of both the element and its parent. It ensures that 
 * the element resizes dynamically when the window is resized.
 * 
 * - If `withSiblings` is true, the function also subtracts the heights of sibling elements 
 *   from the available space, so the `grower` element fits in alongside its siblings.
 * - The resize handler is attached only once to prevent multiple event listeners.
 * 
 * Note: The function will also trigger a resize event after 0.5 seconds to account for 
 * potential delays in page rendering.
 */
function grow(grower, withSiblings = false) { // where grower is a DOM element
    if (!grower) return;

    const resizeHandler = () => {
        const parent = grower.parentElement;
        if (!parent) return;

        // Get computed styles of the element and its parent
        const elementStyle = window.getComputedStyle(grower);
        const parentStyle = window.getComputedStyle(parent);

        // Calculate the height of the parent element, minus its padding
        const parentHeight = parent.clientHeight - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom);

        // Calculate the total height of all sibling elements
        let siblingsHeight = 0;
        if (withSiblings) {
            Array.from(parent.children).forEach(child => {
                const childStyle = window.getComputedStyle(child);
                if (child !== grower && childStyle.display !== 'none') {
                    const childHeight = child.offsetHeight + 
                        parseFloat(childStyle.marginTop) + 
                        parseFloat(childStyle.marginBottom) +
                        parseFloat(childStyle.borderTopWidth) +
                        parseFloat(childStyle.borderBottomWidth);
                    siblingsHeight += childHeight;
                }
            });
        }

        // Calculate the total vertical space taken up by the element's border, padding, and margin
        const elementVerticalSpace = 
            parseFloat(elementStyle.marginTop) +
            parseFloat(elementStyle.marginBottom) +
            parseFloat(elementStyle.borderTopWidth) +
            parseFloat(elementStyle.borderBottomWidth);

        // Set the height of the element
        const newHeight = parentHeight - siblingsHeight - elementVerticalSpace;
        grower.style.height = `${newHeight}px`;
    };

    // Run the resize handler initially
    resizeHandler();

    // Attach the resize handler to the window resize event, if not already attached
    if (!grower._resizeHandlerAttached) {
        window.addEventListener('resize', resizeHandler);
        grower._resizeHandlerAttached = true;
        // Run it again in .5 second for good measure, in case page wasn't fully rendered yet
        // Triggering the event will also ensure any other growers are resized too
        setTimeout(function(){window.dispatchEvent(new Event('resize'));},500);
    }
}