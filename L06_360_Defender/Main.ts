namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  let gameRoot: ƒ.Node = new ƒ.Node("GameRoot");
  let lanesRoot: ƒ.Node = new ƒ.Node("Lanes_Root");
  let canon: ƒ.Node = new ƒ.Node("canon"); 
  let boden: ƒ.Node = new ƒ.Node("boden"); 
  let kugel_spawner : ƒ.Node = new ƒ.Node("kugelSpawner"); 

  let audioManager: ƒ.AudioManager = new ƒ.AudioManager();
  let audioListener: ƒ.ComponentAudioListener = new  ƒ.ComponentAudioListener();
  let audioShoot: ƒ.Audio = new  ƒ.Audio("Audio/shoot.mp3");
  let audioComponentShoot : ƒ.ComponentAudio = new ƒ.ComponentAudio(audioShoot, false, false, audioManager);
  

  let vector_zero: ƒ.Vector3 =  new ƒ.Vector3(0, 1, 0);

  let ctrRotationY: ƒ.Control = new ƒ.Control("AvatarRotationY", -0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotationY.setDelay(100);
  let ctrRotationX: ƒ.Control = new ƒ.Control("AvatarRotationX", -0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotationX.setDelay(100);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    //Init Listener vor Keypress events
    document.addEventListener("keypress", handler_Key_Pressed);

    
    //Physic Settings
    ƒ.Physics.settings.defaultRestitution = 0.5;
    ƒ.Physics.settings.defaultFriction = 0.8;
    ƒ.Physics.world.setGravity(new ƒ.Vector3(0, 0, -1) );



    //Boden Material
    let material_Boden: ƒ.Material = new ƒ.Material("Boden_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    let cmpMaterialBoden: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_Boden);

    //Init Game Root / Boden
    let meshBoden: ƒ.MeshCube = new ƒ.MeshCube("Boden");
    let cmpMeshBoden: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshBoden);
    //cmpMeshBoden.mtxPivot.scale(new ƒ.Vector3(20, 20, 1));


    gameRoot.addComponent(new ƒ.ComponentTransform()); //Wurzelknoten

    //Erstelle Boden
    let transformBoden:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformBoden.mtxLocal.scale(new ƒ.Vector3(20, 20, 1));
    boden.addComponent(transformBoden);
    boden.addComponent(cmpMaterialBoden);
    boden.addComponent(cmpMeshBoden);
    boden.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));

    //Erstelle KugelSpawner
    let material_KS: ƒ.Material = new ƒ.Material("KS_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)));
    let cmpMaterialKS: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_KS);
    let meshKugelSpawner: ƒ.MeshCube = new ƒ.MeshCube("KugelSpawner");
    let cmpMeshKS: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshKugelSpawner);
    let transformKugelSpawner:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
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
    for (let i: number = 0; i < 4; i++) {
      let lane: QuadLane = new QuadLane("Lane" + i, new ƒ.Vector3(0, 0, 1), new ƒ.Vector3(6, 1, 1 ));
      switch (i) {
        //Setup LanePositions

        case 0:
          lane.setTransform(new ƒ.Vector3(-5, 0, 1), new ƒ.Vector3(0, 0, 0));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
          //lane.addChild(new Einzelgeometrie("Test_1", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
          break;
        case 1:
          lane.setTransform(new ƒ.Vector3(0, 5, 1), new ƒ.Vector3(0, 0, 90));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
          //lane.addChild(new Einzelgeometrie("Test_2", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
          break;
          case 2:
          lane.setTransform(new ƒ.Vector3(5, 0, 1), new ƒ.Vector3(0, 0, 0));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));

          //lane.addChild(new Einzelgeometrie("Test_3", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
          break;
          case 3:
          lane.setTransform(new ƒ.Vector3(0, -5, 1), new ƒ.Vector3(0, 0, 90));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
          //lane.addChild(new Einzelgeometrie("Test_4", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true));
          break;

      }
      lanesRoot.appendChild(lane);

    }
    lanesRoot.addComponent(new ƒ.ComponentTransform());

    //Init first Camera Setup
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    //cmpCamera.mtxPivot.translateZ(10.5);
    //cmpCamera.mtxPivot.rotateX(0);
    cmpCamera.mtxPivot.translateZ(4.5);
    cmpCamera.mtxPivot.rotateX(75);
    cmpCamera.mtxPivot.rotateY(180);
   
    console.log(cmpCamera);


    //Init Canon / Player
    let meshCanon: ƒ.MeshCube = new ƒ.MeshCube("Cube_Player");
    let transformCanon: ƒ.ComponentTransform = new ƒ.ComponentTransform(new ƒ.Matrix4x4());
    transformCanon.mtxLocal.translateZ(0);
    let cmpMeshCanon = (new ƒ.ComponentMesh(meshCanon));
    //cmpMeshGameRoot.mtxPivot.scale(new ƒ.Vector3(1, 1, 1));


    let canon_material: ƒ.Material = new ƒ.Material("Canon_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
    let canon_cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(canon_material);
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
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);


    //Init Viewport
    viewport.initialize("Viewport", gameRoot, cmpCamera, canvas);
    viewport.draw();
  }


  function hndMouse(_event: MouseEvent): void {
    // console.log(_event.movementX, _event.movementY);
    ctrRotationX.setInput(_event.movementX);
    ctrRotationY.setInput(_event.movementY);
  }

  function handler_Key_Pressed(_event: KeyboardEvent): void {

    if (_event.code ==  ƒ.KEYBOARD_CODE.SPACE ) {
      let kugel: Kugeln = new Kugeln("Kugel", kugel_spawner.mtxWorld.translation, ƒ.Vector3.ONE(.1), kugel_spawner.mtxWorld.rotation);

      /*for (let lanes of lanesRoot.getChildren() as QuadLane[]) {
        for (let einzelGeo of lanes.getChildren() as Einzelgeometrie[]) {
          einzelGeo.triggerPhysic();  // Hier der Versuch über Tasteneingabe die Physik zu triggern
          //console.log(einzelGeo.name);
        }
      }*/

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


  function update(_event: Event): void {
    

    for (let lanes of lanesRoot.getChildren() as QuadLane[]) {
      for (let gegnerGeo of lanes.getChildren() as Gegnergeometrie[]) {
        gegnerGeo.move();
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
}