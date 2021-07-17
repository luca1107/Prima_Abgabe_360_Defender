namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;

  export class Gegnergeometrie extends ƒ.Node  {

    direction: boolean;

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3, _dir: boolean, _count: number) {
      super(_name);

      this.direction = _dir;

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Einzelgeometrie.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      cmpMesh.mtxPivot.scaleZ(_scale.z);


      //Setup der Gegnerstruktur
      for ( let i: number = 0; i < _count; i++) {

        for (let j: number = 0; j < _count; j++) {

          let pos: ƒ.Vector3 = new ƒ.Vector3(0, j, i);

          this.appendChild(new Einzelgeometrie(_name, pos, _scale, _dir));       
        }
      }
      //this.direction = _dir;
    }

    public move(): void {
      if (!this.direction)
      this.mtxLocal.translateX( - 1 / 4 * ƒ.Loop.timeFrameReal / 1000);
      else
      this.mtxLocal.translateX(  1 / 4 * ƒ.Loop.timeFrameReal / 1000);
    }
    


    
  }
}