function initRoot(root) {
    
}
function getDetector() {
    return function(root) {
        values = [
            root.getElementById('ferrisWheelImage').getAttribute("src"),
            root.getElementById('statusText').innerHTML
        ]
        console.log(values);
        return values.join('');
    };
}
function help() {
    return `============ Ferris Wheel ===========

Welcome to the Ferris Wheel Control Panel!

Commands:
------------------------------------------
fstart()   : Start the Ferris Wheel

Note: Use fstart() to begin the ride. 
Ensure all safety checks are completed 
before operation. Have a great ride!

For further assistance, consult the 
operations manual.
==========================================`;
}
function fstart() {
    root = document.getElementById('browserShadowHost').shadowRoot;
    root.getElementById('ferrisWheelImage').src = 'ferriswheelfixup/ferris_on_obrtgopjasdngk.gif';
    root.getElementById('statusText').innerHTML = 'Ferris Wheel Status: <b>Running</b> 🟢';
    root.getElementById('statusText').classList.remove('has-text-danger');
    root.getElementById('statusText').classList.add('has-text-success');
    return "Ferris Wheel Status: Running 🟢";
}