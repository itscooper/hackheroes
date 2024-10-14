function initRoot(root) {
    root.getElementById('onButton').addEventListener('click', function() {
        console.log('hi2');
        root.getElementById('camera1').src = 'cameracomeback/live1.png';
        root.getElementById('camera2').src = 'cameracomeback/live2.png';
        root.getElementById('camera3').src = 'cameracomeback/live3.png';
        root.getElementById('camera4').src = 'cameracomeback/live4.png';
        var cameras = root.getElementsByClassName('camera-feed');
        for (var i = 0; i < cameras.length; i++) {
        cameras[i].classList.remove('static-feed');
        }
    });
}
function getDetector() {
    return function(root) {
        return [1,2,3,4].map(i => root.getElementById(`camera${i}`).getAttribute("src")).join('');
    };
}