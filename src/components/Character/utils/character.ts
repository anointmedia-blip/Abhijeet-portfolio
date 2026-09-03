import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            // Realistic Human Skin Material (Face, Ears, Nose/Head, Neck, Hands, Arms)
            const skinMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#e5aa8e"),
              roughness: 0.58,
              metalness: 0.02,
            });

            // Sky Blue Shirt Material
            const shirtMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#5ea9f8"),
              roughness: 0.65,
              metalness: 0.04,
            });

            // Black Pants Material
            const pantMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#1c1e25"),
              roughness: 0.8,
              metalness: 0.06,
            });

            // Dark Hair Material
            const hairMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#241c16"),
              roughness: 0.72,
              metalness: 0.04,
            });

            // Eyebrow Material
            const eyebrowMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#1d1510"),
              roughness: 0.85,
              metalness: 0.0,
            });

            // Shoes Material
            const shoeMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#252732"),
              roughness: 0.6,
              metalness: 0.08,
            });

            // Shoe Sole Material
            const soleMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#f2f3f7"),
              roughness: 0.5,
              metalness: 0.02,
            });

            // Brown Wood Table Material
            const tableMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#6b4226"),
              roughness: 0.38,
              metalness: 0.06,
            });

            // Brown Chair Material
            const chairMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#4a2c12"),
              roughness: 0.45,
              metalness: 0.08,
            });

            // Black PC / Monitor Frame Material
            const pcFrameMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#121215"),
              roughness: 0.35,
              metalness: 0.25,
            });

            // Keyboard Chassis Material
            const keyboardMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#181920"),
              roughness: 0.45,
              metalness: 0.15,
            });

            // Keyboard Keys Material
            const keysMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#2a2b34"),
              roughness: 0.55,
              metalness: 0.08,
            });

            // Ceramic Mug / Table Accessory Material
            const mugMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#f0f2f7"),
              roughness: 0.25,
              metalness: 0.05,
            });

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const name = mesh.name || "";
                const geomName = mesh.geometry?.name || "";

                // 1. Human Skin: Face, Nose, Head (Plane.007), Ears (Ear.001), Neck, Hands
                if (
                  name === "Plane.007" ||
                  name === "Plane007" ||
                  name === "Face" ||
                  name === "Face.002" ||
                  name === "Ear.001" ||
                  name === "Ear001" ||
                  name === "Neck" ||
                  name === "Hand" ||
                  geomName === "Plane.007" ||
                  geomName === "Plane.003" ||
                  geomName === "Plane.005" ||
                  geomName === "Mesh.002"
                ) {
                  mesh.material = skinMaterial;
                }
                // 2. Sky Blue Shirt
                else if (
                  name === "BODY.SHIRT" ||
                  name === "BODYSHIRT" ||
                  name === "Shirt" ||
                  geomName === "Cube.002"
                ) {
                  mesh.material = shirtMaterial;
                }
                // 3. Black Pants
                else if (
                  name === "Pant" ||
                  name === "Pants" ||
                  geomName === "Cube.004"
                ) {
                  mesh.material = pantMaterial;
                }
                // 4. Hair
                else if (
                  name === "hair" ||
                  name === "Hair" ||
                  name === "Iron:pCube3.004" ||
                  geomName === "Iron:pCube3.004"
                ) {
                  mesh.material = hairMaterial;
                }
                // 5. Eyebrows
                else if (
                  name === "Eyebrow" ||
                  name === "Eyebrows" ||
                  geomName === "Plane.004"
                ) {
                  mesh.material = eyebrowMaterial;
                }
                // 6. Shoes & Soles
                else if (name === "Shoe" || geomName === "Cylinder.005") {
                  mesh.material = shoeMaterial;
                } else if (name === "Sole" || geomName === "Cylinder.008") {
                  mesh.material = soleMaterial;
                }
                // 7. Brown Table Top
                else if (
                  name === "Plane.002" ||
                  name === "Plane002" ||
                  geomName === "Plane.015"
                ) {
                  mesh.material = tableMaterial;
                }
                // 8. Brown Chair
                else if (
                  name === "Plane" ||
                  name === "Chair" ||
                  geomName === "Plane.009"
                ) {
                  mesh.material = chairMaterial;
                }
                // 9. Ceramic Mug
                else if (
                  name === "Plane.003" ||
                  name === "Plane003" ||
                  geomName === "Plane.016"
                ) {
                  mesh.material = mugMaterial;
                }
                // 10. Black Keyboard & Keys
                else if (name === "Keyboard" || geomName === "Cube.011") {
                  mesh.material = keyboardMaterial;
                } else if (name.startsWith("KEYS") || name.startsWith("Cube.0")) {
                  if (
                    name !== "Cube.002" &&
                    name !== "Cube.004" &&
                    name !== "Cube.007"
                  ) {
                    mesh.material = keysMaterial;
                  }
                }
                // 11. PC / Monitor Frame
                else if (
                  name === "Plane.004" ||
                  name === "Plane004" ||
                  geomName === "Plane.017"
                ) {
                  if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((mat) => {
                      if (mat.name === "Material.028") {
                        return pcFrameMaterial;
                      }
                      return mat;
                    });
                  } else if (
                    mesh.material &&
                    (mesh.material as any).name === "Material.028"
                  ) {
                    mesh.material = pcFrameMaterial;
                  }
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR =
              character!.getObjectByName("footR") ||
              character!.getObjectByName("foot.R");
            if (footR) footR.position.y = 3.36;
            const footL =
              character!.getObjectByName("footL") ||
              character!.getObjectByName("foot.L");
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;


