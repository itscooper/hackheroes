function initRoot(root) {
    root.getElementById('onButton').addEventListener('click', function() {
        console.log('hi2');
        root.getElementById('camera1').src = 'challenges/cameracomeback/live1.png';
        root.getElementById('camera2').src = 'challenges/cameracomeback/live2.png';
        root.getElementById('camera3').src = 'challenges/cameracomeback/live3.png';
        root.getElementById('camera4').src = 'challenges/cameracomeback/live4.png';
    });
}
function getDetector() {
    return function(root) {
        return [1,2,3,4].map(i => root.getElementById(`camera${i}`).getAttribute("src")).join('');
    };
}