namespace Endabgabe_360_Defender {

  import ƒ = FudgeCore;

  export class Kugeln extends ƒ.Node {
    static mesh: ƒ.Mesh = new ƒ.MeshSphere("Sphere");
    static material: ƒ.Material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 0, 1)));
    

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3, _rot: ƒ.Vector3) {
      super(_name);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translate(_pos);
      this.mtxLocal.scale(_scale);
      this.mtxLocal.rotate(_rot);

      this.addComponent(new ƒ.ComponentRigidbody(2, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT));
      this.getComponent(ƒ.ComponentRigidbody).restitution = 2;
      //this.getComponent(ƒ.ComponentRigidbody).rotationInfluenceFactor = ƒ.Vector3.ZERO();

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Kugeln.mesh);
      this.addComponent(cmpMesh);

      this.addComponent(new ƒ.ComponentMaterial(Kugeln.material));
      
      this.getComponent(ƒ.ComponentRigidbody).setVelocity(new ƒ.Vector3(_pos.x,_pos.y*2,.3));
      this.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(0, 0, 0));
     
    }
  }

}

 

