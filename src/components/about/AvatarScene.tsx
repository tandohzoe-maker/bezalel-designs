"use client";

/**
 * Original 3D founder avatar, built from primitives (no third-party model).
 * Stylised "designer toy" figure: navy zip-up with "Bezalel" on the chest,
 * wristwatch, short black hair.
 *
 * Behaviour (driven by `actionRef`, set by the parent):
 *  - idle: breathing, slight sway, head follows the pointer
 *  - face: the founder's own face, wrapped onto the head (see FACE_* constants)
 *  - "jump": hop with a full spin and raised arms
 *  - "wave": right arm raised, forearm waving
 * With reduced motion the idle is calmer and the jump has no spin.
 */

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type AvatarAction = { type: "jump" | "wave"; start: number } | null;

const SKIN = "#885c51"; // sampled from the founder photo
const SKIN_DARK = "#7a5147";
const HAIR = "#121212";
const SWEATER = "#22326c";
const TROUSERS = "#1f1f27";
const SHOE = "#f1f1f3";
const SOLE = "#2a2a30";

/* Face texture: the founder's face, pre-warped for this patch of the head.
   Patch = longitude ±FACE_HALF_ANGLE around the front, latitude FACE_THETA_START
   (hairline) to FACE_THETA_START + FACE_THETA_LENGTH (chin). */
const FACE_TEXTURE = "/images/avatar-face.png";
const FACE_HALF_ANGLE = 0.9;
const FACE_THETA_START = 0.85;
const FACE_THETA_LENGTH = 1.75;
const HEAD_RADIUS = 0.265;
const HEAD_SCALE: [number, number, number] = [0.9, 1.25, 0.98];

const JUMP_DURATION = 1.15;
const WAVE_DURATION = 2.4;

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function useChestText() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 160;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#f4f1ea";
    ctx.font = "600 92px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Bezalel", 256, 86);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

function useShadowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Avatar({
  actionRef,
  pointer,
  reduced,
  onReady,
}: {
  actionRef: React.RefObject<AvatarAction>;
  pointer: React.RefObject<{ x: number; y: number }>;
  reduced: boolean;
  onReady?: () => void;
}) {
  const root = useRef<THREE.Group>(null!);
  const torso = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Group>(null!);
  const lShoulder = useRef<THREE.Group>(null!);
  const rShoulder = useRef<THREE.Group>(null!);
  const lElbow = useRef<THREE.Group>(null!);
  const rElbow = useRef<THREE.Group>(null!);
  const shadow = useRef<THREE.Mesh>(null!);
  const chest = useChestText();
  const shadowTex = useShadowTexture();
  const faceTex = useLoader(THREE.TextureLoader, FACE_TEXTURE);
  useEffect(() => {
    faceTex.colorSpace = THREE.SRGBColorSpace;
    faceTex.anisotropy = 4;
    faceTex.needsUpdate = true;
    onReady?.(); // shown once the face has loaded
  }, [faceTex, onReady]);

  const mat = useMemo(
    () => ({
      skin: new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.55 }),
      skinDark: new THREE.MeshStandardMaterial({ color: SKIN_DARK, roughness: 0.6 }),
      hair: new THREE.MeshStandardMaterial({ color: HAIR, roughness: 0.95 }),
      sweater: new THREE.MeshStandardMaterial({ color: SWEATER, roughness: 0.78 }),
      trousers: new THREE.MeshStandardMaterial({ color: TROUSERS, roughness: 0.8 }),
      shoe: new THREE.MeshStandardMaterial({ color: SHOE, roughness: 0.5 }),
      sole: new THREE.MeshStandardMaterial({ color: SOLE, roughness: 0.7 }),
      dark: new THREE.MeshStandardMaterial({ color: "#151012", roughness: 0.4 }),
      white: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.2 }),
      metal: new THREE.MeshStandardMaterial({ color: "#c9cbd1", roughness: 0.25, metalness: 0.8 }),
      watch: new THREE.MeshStandardMaterial({ color: "#0d0d10", roughness: 0.35, metalness: 0.4 }),
      watchFace: new THREE.MeshStandardMaterial({ color: "#2d3a63", roughness: 0.2, metalness: 0.3 }),
      lips: new THREE.MeshStandardMaterial({ color: "#4a2219", roughness: 0.55 }),
      sclera: new THREE.MeshStandardMaterial({ color: "#f3ede6", roughness: 0.3 }),
      iris: new THREE.MeshStandardMaterial({ color: "#3a2416", roughness: 0.25 }),
    }),
    [],
  );

  const look = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const action = actionRef.current;
    const calm = reduced ? 0.4 : 1;

    // ── Idle ────────────────────────────────────────────────────────
    const breath = Math.sin(t * 1.6) * 0.012 * calm;
    torso.current.scale.set(1 + breath * 0.5, 1 + breath, 1 + breath * 0.5);
    root.current.rotation.z = Math.sin(t * 0.7) * 0.015 * calm;

    // head follows the pointer (smoothed)
    const p = pointer.current ?? { x: 0, y: 0 };
    look.current.x += (p.x * 0.55 - look.current.x) * 0.08;
    look.current.y += (p.y * 0.3 - look.current.y) * 0.08;
    let headY = look.current.x;
    const headX = -look.current.y + Math.sin(t * 1.1) * 0.02 * calm;
    let headZ = 0;

    // rest pose
    let lz = 0.13 + Math.sin(t * 1.6) * 0.015 * calm;
    let rz = -0.13 - Math.sin(t * 1.6) * 0.015 * calm;
    let lElbowZ = 0.12;
    let rElbowZ = -0.12;
    let rShoulderX = 0;
    let y = 0;
    let spin = 0;
    let squash = 1;

    // ── Actions ─────────────────────────────────────────────────────
    if (action) {
      const elapsed = t - action.start;
      if (action.type === "jump") {
        const k = clamp01(elapsed / JUMP_DURATION);
        // crouch (0–0.15), air (0.15–0.85), land (0.85–1)
        if (k < 0.15) squash = 1 - Math.sin((k / 0.15) * Math.PI) * 0.08;
        else if (k > 0.85) squash = 1 - Math.sin(((k - 0.85) / 0.15) * Math.PI) * 0.07;
        const air = clamp01((k - 0.15) / 0.7);
        y = Math.sin(air * Math.PI) * (reduced ? 0.18 : 0.6);
        spin = reduced ? 0 : ease(air) * Math.PI * 2;
        const lift = Math.sin(air * Math.PI);
        lz += lift * 1.9;
        rz -= lift * 1.9;
        lElbowZ += lift * 0.5;
        rElbowZ -= lift * 0.5;
        if (k >= 1) actionRef.current = null;
      } else {
        const k = clamp01(elapsed / WAVE_DURATION);
        const env = Math.min(1, k / 0.12, (1 - k) / 0.15); // raise, hold, lower
        const e = ease(clamp01(env));
        rz = rz + (-2.55 - rz) * e; // arm up and out
        rShoulderX = -0.25 * e;
        rElbowZ = -0.12 + (-0.55 + Math.sin(elapsed * 13) * 0.5 - -0.12) * e; // forearm waves
        headZ = 0.12 * e;
        headY += 0.15 * e;
        if (k >= 1) actionRef.current = null;
      }
    }

    root.current.position.y = y;
    root.current.rotation.y = spin;
    root.current.scale.set(1 + (1 - squash) * 0.6, squash, 1 + (1 - squash) * 0.6);
    head.current.rotation.set(headX, headY, headZ);
    lShoulder.current.rotation.z = lz;
    rShoulder.current.rotation.z = rz;
    rShoulder.current.rotation.x = rShoulderX;
    lElbow.current.rotation.z = lElbowZ;
    rElbow.current.rotation.z = rElbowZ;

    // shadow shrinks while airborne
    const s = 1 - y * 0.6;
    shadow.current.scale.set(s, s, 1);
    (shadow.current.material as THREE.MeshBasicMaterial).opacity = 0.9 - y * 0.8;
  });

  return (
    <>
      <mesh ref={shadow} rotation-x={-Math.PI / 2} position={[0, 0.005, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} />
      </mesh>

      <group ref={root}>
        {/* Legs and shoes — taller, adult proportions (head ≈ 1/6.5 of height) */}
        {[-0.15, 0.15].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.66, 0]} material={mat.trousers}>
              <capsuleGeometry args={[0.13, 0.95, 8, 20]} />
            </mesh>
            <mesh position={[0, 0.1, 0.06]} rotation-x={Math.PI / 2} scale={[1.05, 1, 0.75]} material={mat.shoe}>
              <capsuleGeometry args={[0.12, 0.18, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.025, 0.06]} scale={[1.1, 0.25, 1.75]} material={mat.sole}>
              <sphereGeometry args={[0.13, 20, 12]} />
            </mesh>
          </group>
        ))}

        {/* Upper body */}
        <group ref={torso} position={[0, 1.25, 0]}>
          {/* sweater */}
          <mesh position={[0, 0.48, 0]} scale={[1, 1, 0.72]} material={mat.sweater}>
            <capsuleGeometry args={[0.35, 0.56, 12, 24]} />
          </mesh>
          {/* waistband */}
          <mesh position={[0, 0, 0]} scale={[1, 1, 0.72]} material={mat.sweater}>
            <cylinderGeometry args={[0.335, 0.325, 0.09, 24]} />
          </mesh>
          {/* collar */}
          <mesh position={[0, 1.06, 0]} rotation-x={Math.PI / 2} scale={[1, 0.8, 1]} material={mat.sweater}>
            <torusGeometry args={[0.12, 0.05, 12, 28]} />
          </mesh>
          {/* zip */}
          <mesh position={[0, 0.84, 0.256]} rotation-x={-0.1} material={mat.metal}>
            <boxGeometry args={[0.013, 0.42, 0.01]} />
          </mesh>
          <mesh position={[0, 0.76, 0.263]} material={mat.metal}>
            <boxGeometry args={[0.028, 0.05, 0.015]} />
          </mesh>
          {/* "Bezalel" on the chest */}
          <mesh position={[0.155, 0.74, 0.246]} rotation-y={0.38}>
            <planeGeometry args={[0.26, 0.081]} />
            <meshStandardMaterial map={chest} transparent roughness={0.8} />
          </mesh>

          {/* Neck */}
          <mesh position={[0, 1.12, 0]} material={mat.skin}>
            <cylinderGeometry args={[0.088, 0.1, 0.2, 18]} />
          </mesh>

          {/* Head: oval cranium + jaw, defined features */}
          <group ref={head} position={[0, 1.18, 0]}>
            {/* head: a natural oval, proportioned to the founder's face */}
            <mesh position={[0, 0.29, 0]} scale={HEAD_SCALE} material={mat.skin}>
              <sphereGeometry args={[HEAD_RADIUS, 48, 48]} />
            </mesh>

            {/* the founder's face, wrapped onto the front of the head */}
            <group position={[0, 0.29, 0]} scale={HEAD_SCALE}>
              <mesh renderOrder={1}>
                <sphereGeometry
                  args={[
                    HEAD_RADIUS * 1.003,
                    64,
                    48,
                    Math.PI / 2 - FACE_HALF_ANGLE,
                    FACE_HALF_ANGLE * 2,
                    FACE_THETA_START,
                    FACE_THETA_LENGTH,
                  ]}
                />
                <meshStandardMaterial map={faceTex} transparent depthWrite={false} roughness={0.62} />
              </mesh>
            </group>

            {/* hair: short crop. Caps are tilted on a sphere, then the group stretches
                them with the head's own proportions so they sit flush. */}
            <group position={[0, 0.295, -0.004]} scale={[HEAD_SCALE[0] * 1.07, HEAD_SCALE[1] * 1.06, HEAD_SCALE[2] * 1.06]}>
              <mesh rotation-x={-0.3} material={mat.hair}>
                <sphereGeometry args={[HEAD_RADIUS, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
              </mesh>
              <mesh rotation-x={-1.15} material={mat.hair}>
                <sphereGeometry args={[HEAD_RADIUS, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
              </mesh>
            </group>

            {/* ears */}
            {[-0.24, 0.24].map((x) => (
              <mesh key={x} position={[x, 0.29, 0]} scale={[0.55, 1, 0.8]} material={mat.skinDark}>
                <sphereGeometry args={[0.06, 16, 16]} />
              </mesh>
            ))}
          </group>

          {/* Arms (left = avatar's left = screen right, +x) */}
          {(
            [
              { side: 1, shoulder: lShoulder, elbow: lElbow, watch: true },
              { side: -1, shoulder: rShoulder, elbow: rElbow, watch: false },
            ] as const
          ).map(({ side, shoulder, elbow, watch }) => (
            <group key={side} ref={shoulder} position={[0.37 * side, 0.93, 0]}>
              <mesh position={[0, -0.02, 0]} material={mat.sweater}>
                <sphereGeometry args={[0.108, 20, 20]} />
              </mesh>
              <mesh position={[0, -0.28, 0]} material={mat.sweater}>
                <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
              </mesh>
              <group ref={elbow} position={[0, -0.55, 0]}>
                <mesh position={[0, -0.24, 0]} material={mat.sweater}>
                  <capsuleGeometry args={[0.09, 0.34, 8, 16]} />
                </mesh>
                <mesh position={[0, -0.49, 0]} scale={[0.9, 1.1, 0.8]} material={mat.skin}>
                  <sphereGeometry args={[0.095, 20, 20]} />
                </mesh>
                {watch ? (
                  <group position={[0, -0.38, 0]}>
                    <mesh rotation-x={Math.PI / 2} material={mat.watch}>
                      <torusGeometry args={[0.082, 0.022, 10, 24]} />
                    </mesh>
                    <mesh position={[0, 0, 0.096]} rotation-x={Math.PI / 2} material={mat.watchFace}>
                      <cylinderGeometry args={[0.043, 0.043, 0.02, 20]} />
                    </mesh>
                  </group>
                ) : null}
              </group>
            </group>
          ))}
        </group>
      </group>
    </>
  );
}

/** Pauses rendering when the stage is off-screen. */
function FrameloopController({ active }: { active: boolean }) {
  const { setFrameloop } = useThree();
  useEffect(() => setFrameloop(active ? "always" : "never"), [active, setFrameloop]);
  return null;
}

export default function AvatarScene({
  actionRef,
  pointer,
  reduced,
  active,
  onReady,
}: {
  actionRef: React.RefObject<AvatarAction>;
  pointer: React.RefObject<{ x: number; y: number }>;
  reduced: boolean;
  active: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.95, 7.5], fov: 29, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ camera, gl }) => {
        camera.lookAt(0, 1.85, 0);
        gl.setClearColor(0x000000, 0);
      }}
      aria-hidden
    >
      <FrameloopController active={active} />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#ffffff", "#2a1050", 0.7]} />
      <directionalLight position={[2.5, 5, 4]} intensity={2.3} />
      <directionalLight position={[-4, 3, -3]} intensity={3.2} color="#b98cff" />
      <directionalLight position={[4, 1.5, -2]} intensity={1.4} color="#8b3dff" />
      {/* soft warm light on the face */}
      <directionalLight position={[0.5, 3, 6]} intensity={1.5} color="#fff1e6" />
      <pointLight position={[0, 2.8, 1.6]} intensity={1.1} distance={4} color="#ffe9dc" />
      <SceneClock actionRef={actionRef} />
      <Suspense fallback={null}>
        <Avatar actionRef={actionRef} pointer={pointer} reduced={reduced} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

/**
 * Actions are requested with start = -1 from outside the canvas; this stamps
 * them with the scene clock on the next frame.
 */
function SceneClock({ actionRef }: { actionRef: React.RefObject<AvatarAction> }) {
  useFrame(({ clock }) => {
    const a = actionRef.current;
    if (a && a.start < 0) actionRef.current = { ...a, start: clock.getElapsedTime() };
  });
  return null;
}
