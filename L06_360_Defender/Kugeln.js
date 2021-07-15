"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    class Kugeln extends ƒ.Node {
        constructor(_name, _pos, _scale, _rot) {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(_pos);
            this.mtxLocal.scale(_scale);
            this.mtxLocal.rotate(_rot);
            this.addComponent(new ƒ.ComponentRigidbody(2, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT));
            this.getComponent(ƒ.ComponentRigidbody).restitution = 2;
            //this.getComponent(ƒ.ComponentRigidbody).rotationInfluenceFactor = ƒ.Vector3.ZERO();
            let cmpMesh = new ƒ.ComponentMesh(Kugeln.mesh);
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(Kugeln.material));
            this.getComponent(ƒ.ComponentRigidbody).setVelocity(new ƒ.Vector3(_pos.x, _pos.y * 2, .3));
            this.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(0, 0, 0));
        }
    }
    Kugeln.mesh = new ƒ.MeshSphere("Sphere");
    Kugeln.material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 0, 1)));
    Endabgabe_360_Defender.Kugeln = Kugeln;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Kugeln.js.map