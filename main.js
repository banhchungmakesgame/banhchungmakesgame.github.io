THREEx.ArToolkitContext.baseURL = './';
//////////////////////////////////////////////////////////////////////////////////
//		Init
//////////////////////////////////////////////////////////////////////////////////

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: 'mediump',
});

var clock = new THREE.Clock();

var mixers = [];

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setClearColor(new THREE.Color('lightgrey'), 0)
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = '0px'
renderer.domElement.style.left = '0px'
document.body.appendChild( renderer.domElement );

// init scene and camera
var scene = new THREE.Scene();

//////////////////////////////////////////////////////////////////////////////////
//		Initialize a basic camera
//////////////////////////////////////////////////////////////////////////////////

// Create a camera
var camera = new THREE.Camera();
scene.add(camera);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

////////////////////////////////////////////////////////////////////////////////
//          handle arToolkitSource
////////////////////////////////////////////////////////////////////////////////

var arToolkitSource = new THREEx.ArToolkitSource({
    sourceType : 'webcam',
    sourceWidth: 1920,
    sourceHeight: 1080,
})

arToolkitSource.init(function onReady(){
    // use a resize to fullscreen mobile devices
    setTimeout(function() {
        onResize()
    }, 1000);
})

// handle resize
window.addEventListener('resize', function(){
    onResize()
})

// listener for end loading of NFT marker
window.addEventListener('arjs-nft-loaded', function(ev){
    console.log(ev);
})

function onResize(){
    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(renderer.domElement)
    if( arToolkitContext.arController !== null ){
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
}

////////////////////////////////////////////////////////////////////////////////
//          initialize arToolkitContext
////////////////////////////////////////////////////////////////////////////////

// create atToolkitContext
var arToolkitContext = new THREEx.ArToolkitContext({
    detectionMode: 'color_and_matrix',
    canvasWidth: 640,
    canvasHeight: 480,
}, {
    sourceWidth: 640,
    sourceHeight: 480,
})

// initialize it
arToolkitContext.init(function onCompleted(){
    // copy projection matrix to camera
    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})
console.log(arToolkitContext);

////////////////////////////////////////////////////////////////////////////////
//          Create a ArMarkerControls
////////////////////////////////////////////////////////////////////////////////

// init controls for camera
var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type : 'nft',
    descriptorsUrl : './image-tracker/mogivi',
    changeMatrixMode: 'cameraTransformMatrix'
})

scene.visible = false

var root = new THREE.Object3D();
scene.add(root);

//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

var threeGLTFLoader = new THREE.GLTFLoader();
var model;

threeGLTFLoader.load("./model/scene.gltf", function (gltf) {
    model = gltf.scene.children[0];
    model.name = 'scene';

    root.matrixAutoUpdate = false;
    root.add(model);

    model.position.z = 0;
    model.position.x = 0;
    model.position.y = 0;
    model.scale.set(0.3, 0.3, 0.3);


    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////

    var animate = function() {
        requestAnimationFrame(animate);

        if (!arToolkitSource.ready) {
            return;
        }

        arToolkitContext.update( arToolkitSource.domElement )

        // update scene.visible if the marker is seen
        scene.visible = camera.visible;

        renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);
});