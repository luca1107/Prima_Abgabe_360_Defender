"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    class Einzelgeometrie extends ƒ.Node {
        constructor(_name, _pos, _scale, _dir) {
            super(_name);
            this.rigidbody = new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            let cmpMesh = new ƒ.ComponentMesh(Einzelgeometrie.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            cmpMesh.mtxPivot.scaleZ(_scale.z);
            this.direction = _dir;
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(Einzelgeometrie.material));
            this.addComponent(this.rigidbody);
            this.rigidbody.addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, this.activatePhysics);
        }
        setTransform(_pos, _rot) {
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            this.mtxLocal.rotateX(_rot.x);
            this.mtxLocal.rotateY(_rot.y);
            this.mtxLocal.rotateZ(_rot.z);
        }
        move() {
            if (!this.direction)
                this.mtxLocal.translateX(-1 / 4 * ƒ.Loop.timeFrameReal / 1000);
            else
                this.mtxLocal.translateX(1 / 4 * ƒ.Loop.timeFrameReal / 1000);
        }
        triggerPhysic() {
            this.activatePhysics();
        }
        activatePhysics() {
            console.log("Col");
            this.rigidbody.physicsType = ƒ.PHYSICS_TYPE.DYNAMIC;
        }
    }
    Einzelgeometrie.mesh = new ƒ.MeshCube("Cube");
    Einzelgeometrie.material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)));
    Endabgabe_360_Defender.Einzelgeometrie = Einzelgeometrie;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=EinzelGeometrie.js.map