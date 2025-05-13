function initRoot(root) {
    // Executed when any challenge HTML page is loaded inside the in-challenge browser
}
function getDetector() {
    // Must return a function, which returns a string
    // @param (Object) root - shadowRoot object for DOM context
    return function(root) {
        values = [
            root.getElementById('anid').getAttribute("src"),
            root.getElementById('a2ndid').innerHTML
        ]
        console.log(values);
        return values.join('');
    };
}
function custom() {
    return `This function can be executed from within the in-challenge JS Console gadget.`;
}