let scene, camera, renderer, loader;
let bgMusic = document.getElementById('bg-music');
let doorSound = document.getElementById('door-sound');
let objects = [];

init();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0,2,5);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff,0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff,1);
    directionalLight.position.set(5,10,7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    loader = new THREE.GLTFLoader();
    animate();
}

function loadClass(subject){
    document.getElementById('menu').style.display='none';
    doorSound.play();
    setTimeout(()=>{
        bgMusic.play();

        // الطاولة
        loader.load('models/table.glb', function(gltf){
            let table = gltf.scene;
            table.position.set(0,0,0);
            table.castShadow = true;
            scene.add(table);
            objects.push(table);
        });

        // الكرسي
        loader.load('models/chair.glb', function(gltf){
            let chair = gltf.scene;
            chair.position.set(0,0,-1);
            chair.castShadow = true;
            scene.add(chair);
            objects.push(chair);
        });

        // السبورة
        loader.load('models/board.glb', function(gltf){
            let board = gltf.scene;
            board.position.set(0,0,2);
            board.castShadow = true;
            scene.add(board);
            objects.push(board);
        });

        // نباتات وأدوات خاصة بالمادة
        if(subject==='chemistry'){
            loader.load('models/objects_per_subject/microscope.glb', function(gltf){
                let obj = gltf.scene;
                obj.position.set(1,0,0);
                scene.add(obj);
                objects.push(obj);
            });
        }
        if(subject==='biology'){
            loader.load('models/objects_per_subject/microscope.glb', function(gltf){
                let obj = gltf.scene;
                obj.position.set(1,0,0);
                scene.add(obj);
                objects.push(obj);
            });
        }
        // يمكن إضافة المزيد لكل مادة...
    },800);
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
