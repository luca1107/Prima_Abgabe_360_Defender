namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;

  export class Einzelgeometrie extends ƒ.Node {
    static mesh: ƒ.Mesh = new ƒ.MeshCube("Cube");
    static material: ƒ.Material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)));
    rigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
    direction: boolean ;

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3, _dir: boolean ) {
      super(_name);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Einzelgeometrie.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      cmpMesh.mtxPivot.scaleZ(_scale.z);

      this.direction = _dir;


      this.addComponent(cmpMesh);

      this.addComponent(new ƒ.ComponentMaterial(Einzelgeometrie.material));
      this.addComponent(this.rigidbody);
      this.rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.handleCollision);
    }

    public setTransform(_pos: ƒ.Vector3, _rot: ƒ.Vector3): void {
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      this.mtxLocal.rotateX(_rot.x);
      this.mtxLocal.rotateY(_rot.y);
      this.mtxLocal.rotateZ(_rot.z);

    }

    public move(): void {
      if (!this.direction)
      this.mtxLocal.translateX( - 1 / 4 * ƒ.Loop.timeFrameReal / 1000);
      else
      this.mtxLocal.translateX(  1 / 4 * ƒ.Loop.timeFrameReal / 1000);
    }

    public handleCollision (_event: ƒ.EventPhysics): void
    {
      if(_event.cmpRigidbody.getContainer().name == "Kugel")
      {
        /*let root: ƒ.Node = _event.cmpRigidbody.getContainer().getParent();s
        root.removeChild(_event.cmpRigidbody.getContainer());*/
      }
    }
    

    private activatePhysics(): void {
      console.log("Col");
      this.rigidbody.physicsType = ƒ.PHYSICS_TYPE.DYNAMIC;
    }

  }
}