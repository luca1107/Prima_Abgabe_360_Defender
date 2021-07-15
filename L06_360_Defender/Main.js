"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new ƒ.Viewport();
    let gameRoot = new ƒ.Node("GameRoot");
    let lanesRoot = new ƒ.Node("Lanes_Root");
    let canon = new ƒ.Node("canon");
    let boden = new ƒ.Node("boden");
    let kugel_spawner = new ƒ.Node("kugelSpawner");
    let audioManager = new ƒ.AudioManager();
    let audioListener = new ƒ.ComponentAudioListener();
    let audioShoot = new ƒ.Audio("Audio/shoot.mp3");
    let audioComponentShoot = new ƒ.ComponentAudio(audioShoot, false, false, audioManager);
    let vector_zero = new ƒ.Vector3(0, 1, 0);
    let ctrRotationY = new ƒ.Control("AvatarRotationY", -0.1, 0 /* PROPORTIONAL */);
    ctrRotationY.setDelay(100);
    let ctrRotationX = new ƒ.Control("AvatarRotationX", -0.1, 0 /* PROPORTIONAL */);
    ctrRotationX.setDelay(100);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        //Init Listener vor Keypress events
        document.addEventListener("keypress", handler_Key_Pressed);
        //Physic Settings
        ƒ.Physics.settings.defaultRestitution = 0.5;
        ƒ.Physics.settings.defaultFriction = 0.8;
        ƒ.Physics.world.setGravity(new ƒ.Vector3(0, 0, -1));
        //Boden Material
        let material_Boden = new ƒ.Material("Boden_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        let cmpMaterialBoden = new ƒ.ComponentMaterial(material_Boden);
        //Init Game Root / Boden
        let meshBoden = new ƒ.MeshCube("Boden");
        let cmpMeshBoden = new ƒ.ComponentMesh(meshBoden);
        //cmpMeshBoden.mtxPivot.scale(new ƒ.Vector3(20, 20, 1));
        gameRoot.addComponent(new ƒ.ComponentTransform()); //Wurzelknoten
        //Erstelle Boden
        let transformBoden = new ƒ.ComponentTransform();
        transformBoden.mtxLocal.scale(new ƒ.Vector3(20, 20, 1));
        boden.addComponent(transformBoden);
        boden.addComponent(cmpMaterialBoden);
        boden.addComponent(cmpMeshBoden);
        boden.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        //Erstelle KugelSpawner
        let material_KS = new ƒ.Material("KS_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)));
        let cmpMaterialKS = new ƒ.ComponentMaterial(material_KS);
        let meshKugelSpawner = new ƒ.MeshCube("KugelSpawner");
        let cmpMeshKS = new ƒ.ComponentMesh(meshKugelSpawner);
        let transformKugelSpawner = new ƒ.ComponentTransform();
        transformKugelSpawner.mtxLocal.translate(new ƒ.Vector3(0, 3, 3.5));
        transformKugelSpawner.mtxLocal.scale(new ƒ.Vector3(.25, .25, .25));
        kugel_spawner.addComponent(transformKugelSpawner);
        kugel_spawner.addComponent(cmpMaterialKS);
        kugel_spawner.addComponent(cmpMeshKS);
        //Init Mouse Listener
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        //Audio
        gameRoot.addComponent(audioListener);
        gameRoot.addComponent(audioComponentShoot);
        audioManager.listenTo(gameRoot);
        //Init Lanes
        for (let i = 0; i < 4; i++) {
            let lane = new Endabgabe_360_Defender.QuadLane("Lane" + i, new ƒ.Vector3(0, 0, 1), new ƒ.Vector3(6, 1, 1));
            switch (i) {
                //Setup LanePositions
                case 0:
                    lane.setTransform(new ƒ.Vector3(-5, 0, 1), new ƒ.Vector3(0, 0, 0));
                    lane.addChild(new Endabgabe_360_Defender.Einzelgeometrie("Test_1", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
                    break;
                case 1:
                    lane.setTransform(new ƒ.Vector3(0, 5, 1), new ƒ.Vector3(0, 0, 90));
                    lane.addChild(new Endabgabe_360_Defender.Einzelgeometrie("Test_2", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
                    break;
                case 2:
                    lane.setTransform(new ƒ.Vector3(5, 0, 1), new ƒ.Vector3(0, 0, 0));
                    lane.addChild(new Endabgabe_360_Defender.Einzelgeometrie("Test_3", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
                    break;
                case 3:
                    lane.setTransform(new ƒ.Vector3(0, -5, 1), new ƒ.Vector3(0, 0, 90));
                    lane.addChild(new Endabgabe_360_Defender.Einzelgeometrie("Test_4", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true));
                    break;
            }
            lanesRoot.appendChild(lane);
        }
        lanesRoot.addComponent(new ƒ.ComponentTransform());
        //Init first Camera Setup
        let cmpCamera = new ƒ.ComponentCamera();
        //cmpCamera.mtxPivot.translateZ(10.5);
        //cmpCamera.mtxPivot.rotateX(0);
        cmpCamera.mtxPivot.translateZ(4.5);
        cmpCamera.mtxPivot.rotateX(75);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        //Init Canon / Player
        let meshCanon = new ƒ.MeshCube("Cube_Player");
        let transformCanon = new ƒ.ComponentTransform(new ƒ.Matrix4x4());
        transformCanon.mtxLocal.translateZ(0);
        let cmpMeshCanon = (new ƒ.ComponentMesh(meshCanon));
        //cmpMeshGameRoot.mtxPivot.scale(new ƒ.Vector3(1, 1, 1));
        let canon_material = new ƒ.Material("Canon_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        let canon_cmpMaterial = new ƒ.ComponentMaterial(canon_material);
        canon.addComponent(canon_cmpMaterial);
        canon.addComponent(cmpMeshCanon);
        canon.addComponent(transformCanon);
        canon.addComponent(cmpCamera);
        canon.appendChild(kugel_spawner);
        //Appending Children to GameRoot
        gameRoot.appendChild(boden);
        gameRoot.appendChild(lanesRoot);
        gameRoot.appendChild(canon);
        console.log(gameRoot);
        //Init Update Method
        ƒ.Physics.settings.debugDraw = true;
        ƒ.Physics.adjustTransforms(gameRoot);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        //Init Viewport
        viewport.initialize("Viewport", gameRoot, cmpCamera, canvas);
        viewport.draw();
    }
    function hndMouse(_event) {
        // console.log(_event.movementX, _event.movementY);
        ctrRotationX.setInput(_event.movementX);
        ctrRotationY.setInput(_event.movementY);
    }
    function handler_Key_Pressed(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            let kugel = new Endabgabe_360_Defender.Kugeln("Kugel", kugel_spawner.mtxWorld.translation, ƒ.Vector3.ONE(.1), kugel_spawner.mtxWorld.rotation);
            for (let lanes of lanesRoot.getChildren()) {
                for (let einzelGeo of lanes.getChildren()) {
                    einzelGeo.triggerPhysic(); // Hier der Versuch über Tasteneingabe die Physik zu triggern
                    //console.log(einzelGeo.name);
                }
            }
            gameRoot.addChild(kugel);
            gameRoot.getComponent(ƒ.ComponentAudio).play(true);
            ƒ.Physics.adjustTransforms(gameRoot);
        }
        if (_event.code == ƒ.KEYBOARD_CODE.T) {
            ƒ.Physics.settings.debugMode = ƒ.Physics.settings.debugMode == ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER ? ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY : ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
        }
        if (_event.code == ƒ.KEYBOARD_CODE.Y) {
            ƒ.Physics.settings.debugDraw = !ƒ.Physics.settings.debugDraw;
        }
    }
    function update(_event) {
        for (let lanes of lanesRoot.getChildren()) {
            for (let einzelGeo of lanes.getChildren()) {
                einzelGeo.move();
                //console.log(einzelGeo.name);
            }
            //Bewegung der Geometrie etc.
            canon.mtxLocal.rotateZ(ctrRotationX.getOutput()); //Z Achse weil Objekt gedreht wurde --> X Achse ist jetzt die Z Achse
            canon.mtxLocal.rotateX(ctrRotationY.getOutput());
            canon.mtxLocal.rotation.y = 0;
            ctrRotationX.setInput(0);
            ctrRotationY.setInput(0);
            //Refresh Viewport
            ƒ.Physics.adjustTransforms(gameRoot);
            ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
            viewport.draw();
        }
    }
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Main.js.map