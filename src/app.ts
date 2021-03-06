import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
} from "@babylonjs/core";

class App {
  constructor() {
    /**
     *
     * Canvas
     */
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    /**
     *
     * Engine
     */
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    const light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene
    );
    const sphere: Mesh = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1 },
      scene
    );

    /**
     *
     * on Initial reload
     */
    scene.onBeforeRenderObservable.addOnce(() => {
      engine.resize();
    });

    /**
     *
     * Run main render loop
     */
    engine.runRenderLoop(() => {
      scene.render();
    });

    /**
     *
     * Window resize
     */
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }
}
// Run app
new App();
