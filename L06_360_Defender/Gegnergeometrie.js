"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    class Gegnergeometrie extends ƒ.Node {
        constructor(_name, _pos, _scale, _dir, _count) {
            super(_name);
            this.direction = _dir;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            let cmpMesh = new ƒ.ComponentMesh(Endabgabe_360_Defender.Einzelgeometrie.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            cmpMesh.mtxPivot.scaleZ(_scale.z);
            //Setup der Gegnerstruktur
            for (let i = 0; i < _count; i++) {
                for (let j = 0; j < _count; j++) {
                    let pos = new ƒ.Vector3(0, j, i);
                    this.appendChild(new Endabgabe_360_Defender.Einzelgeometrie(_name, pos, _scale, _dir));
                }
            }
            //this.direction = _dir;
        }
        move() {
            if (!this.direction)
                this.mtxLocal.translateX(-1 / 4 * ƒ.Loop.timeFrameReal / 1000);
            else
                this.mtxLocal.translateX(1 / 4 * ƒ.Loop.timeFrameReal / 1000);
        }
    }
    Endabgabe_360_Defender.Gegnergeometrie = Gegnergeometrie;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Gegnergeometrie.js.map