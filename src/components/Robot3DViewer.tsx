import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { EyeMode } from '../data/robotData';

interface Robot3DViewerProps {
  eyeMode: EyeMode;
  wireframe: boolean;
  finishId: string;
}

function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

/** Creates a V-tapered rounded trapezoid: wider at top, narrower at bottom */
function createRoundedTrapezoidShape(
  topWidth: number,
  bottomWidth: number,
  height: number,
  radius: number,
) {
  const shape = new THREE.Shape();
  const halfTop = topWidth / 2;
  const halfBot = bottomWidth / 2;
  const halfH = height / 2;

  shape.moveTo(-halfBot + radius, -halfH);
  shape.lineTo(halfBot - radius, -halfH);
  shape.quadraticCurveTo(halfBot, -halfH, halfBot + radius * 0.35, -halfH + radius);
  shape.lineTo(halfTop - radius * 0.25, halfH - radius);
  shape.quadraticCurveTo(halfTop, halfH, halfTop - radius, halfH);
  shape.lineTo(-halfTop + radius, halfH);
  shape.quadraticCurveTo(-halfTop, halfH, -halfTop + radius * 0.25, halfH - radius);
  shape.lineTo(-halfBot - radius * 0.35, -halfH + radius);
  shape.quadraticCurveTo(-halfBot, -halfH, -halfBot + radius, -halfH);
  return shape;
}

function createBrushedMetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y++) {
      const shade = 108 + Math.floor(Math.random() * 44);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
    for (let i = 0; i < 420; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const len = 18 + Math.random() * 70;
      const v = 90 + Math.floor(Math.random() * 80);
      ctx.fillStyle = `rgba(${v},${v},${v},0.35)`;
      ctx.fillRect(x, y, len, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function drawOledFace(ctx: CanvasRenderingContext2D, mode: EyeMode, t: number) {
  const w = 256;
  const h = 144;
  ctx.fillStyle = '#030407';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
  for (let y = 0; y < h; y += 6) {
    ctx.fillRect(0, y, w, 1);
  }

  const blinkPhase = t % 3.8;
  const isBlinking = blinkPhase > 3.65;

  ctx.save();
  if (mode === 'scan') {
    ctx.fillStyle = '#38BDF8';
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 18;
    const sweepX = ((Math.sin(t * 2.6) + 1) / 2) * 32 - 16;
    if (isBlinking) {
      ctx.fillRect(54, 70, 48, 4);
      ctx.fillRect(154, 70, 48, 4);
    } else {
      ctx.fillRect(54 + sweepX * 0.4, 62, 48, 12);
      ctx.fillRect(154 + sweepX * 0.4, 62, 48, 12);
      ctx.fillStyle = 'rgba(56,189,248,0.45)';
      ctx.fillRect(22, 114, 212, 3);
    }
  } else if (mode === 'focus') {
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#7DD3FC';
    ctx.shadowBlur = 16;
    const dx = Math.sin(t * 1.4) * 6;
    if (isBlinking) {
      ctx.fillRect(58, 70, 40, 5);
      ctx.fillRect(158, 70, 40, 5);
    } else {
      ctx.beginPath();
      ctx.arc(82 + dx, 72, 19, 0, Math.PI * 2);
      ctx.arc(174 + dx, 72, 19, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(82 + dx, 72, 6, 0, Math.PI * 2);
      ctx.arc(174 + dx, 72, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (mode === 'happy') {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 14;
    if (isBlinking) {
      ctx.beginPath();
      ctx.moveTo(58, 74);
      ctx.lineTo(102, 74);
      ctx.moveTo(154, 74);
      ctx.lineTo(198, 74);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(80, 80, 22, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(176, 80, 22, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 12;
    if (isBlinking) {
      ctx.fillRect(52, 70, 50, 4);
      ctx.fillRect(154, 70, 50, 4);
    } else {
      ctx.beginPath();
      ctx.roundRect(52, 56, 50, 28, 4);
      ctx.roundRect(154, 56, 50, 28, 4);
      ctx.fill();
    }
  }
  ctx.restore();
}

export function Robot3DViewer({ eyeMode, wireframe, finishId }: Robot3DViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const eyeRef = useRef(eyeMode);
  const wireRef = useRef(wireframe);
  const finishRef = useRef(finishId);
  eyeRef.current = eyeMode;
  wireRef.current = wireframe;
  finishRef.current = finishId;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = el.clientWidth || 320;
    const height = el.clientHeight || 360;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 7.0);

    const ambient = new THREE.AmbientLight(0xdbeafe, 0.95);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.9);
    keyLight.position.set(3.6, 4.6, 5.2);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 13, 18);
    cyanRim.position.set(-3.4, 1.4, 2.6);
    scene.add(cyanRim);

    const backRim = new THREE.PointLight(0x818cf8, 9, 18);
    backRim.position.set(3.0, -2.0, -3.2);
    scene.add(backRim);

    const brushedTex = createBrushedMetalTexture();

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e28,
      metalness: 0.86,
      roughness: 0.34,
      roughnessMap: brushedTex,
      bumpMap: brushedTex,
      bumpScale: 0.014,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x2a3140,
      metalness: 0.9,
      roughness: 0.25,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const botGroup = new THREE.Group();
    botGroup.rotation.set(0.08, -0.36, 0.03);
    scene.add(botGroup);

    // 1. Upper Head Module — thicker anodized block (depth 0.78 + bevels)
    const headShape = createRoundedRectShape(2.48, 1.34, 0.18);
    const headGeo = new THREE.ExtrudeGeometry(headShape, {
      depth: 0.78,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.055,
      bevelSegments: 4,
    });
    headGeo.center();
    const headMesh = new THREE.Mesh(headGeo, chassisMat);
    headMesh.position.set(0, 0.92, 0);
    botGroup.add(headMesh);

    const headWire = new THREE.Mesh(headGeo, wireMat);
    headWire.position.copy(headMesh.position);
    headWire.scale.setScalar(1.005);
    headWire.visible = false;
    botGroup.add(headWire);

    // 2. OLED Visor Screen (flush on thicker front face: 0.78/2 + 0.06 = 0.45)
    const oledCanvas = document.createElement('canvas');
    oledCanvas.width = 256;
    oledCanvas.height = 144;
    const oledCtx = oledCanvas.getContext('2d')!;
    const oledTex = new THREE.CanvasTexture(oledCanvas);
    oledTex.colorSpace = THREE.SRGBColorSpace;

    const screenGeo = new THREE.PlaneGeometry(1.22, 0.72);
    const screenMat = new THREE.MeshBasicMaterial({ map: oledTex });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(-0.26, 0.92, 0.455);
    botGroup.add(screenMesh);

    const bezelGeo = new THREE.PlaneGeometry(1.29, 0.78);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x050609,
      metalness: 0.3,
      roughness: 0.12,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(-0.26, 0.92, 0.452);
    botGroup.add(bezelMesh);

    // 3. Optical Camera Module
    const camGroup = new THREE.Group();
    camGroup.position.set(0.72, 0.91, 0.452);
    botGroup.add(camGroup);

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.032, 16, 48),
      accentMat,
    );
    camGroup.add(outerRing);

    const innerBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.21, 0.1, 32),
      new THREE.MeshStandardMaterial({ color: 0x080a0f, metalness: 0.8, roughness: 0.2 }),
    );
    innerBarrel.rotation.x = Math.PI / 2;
    camGroup.add(innerBarrel);

    const lensGlass = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x0ea5e9,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.4,
        clearcoat: 1.0,
      }),
    );
    lensGlass.rotation.x = Math.PI / 2;
    lensGlass.position.z = 0.025;
    camGroup.add(lensGlass);

    // 4. Servo Hinge Cylinders (Acebot + TowerPro bridge)
    const hingeGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.05, 24);
    hingeGeo.rotateZ(Math.PI / 2);
    const hingeMesh = new THREE.Mesh(hingeGeo, accentMat);
    hingeMesh.position.set(0, 0.12, -0.02);
    botGroup.add(hingeMesh);

    // 5. Lower V-Shaped Longer Chassis (wider top 2.38 -> narrow bottom 1.12, height 1.94, depth 0.72)
    const bodyShape = createRoundedTrapezoidShape(2.38, 1.12, 1.94, 0.18);
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.72,
      bevelEnabled: true,
      bevelThickness: 0.055,
      bevelSize: 0.05,
      bevelSegments: 4,
    });
    bodyGeo.center();
    const bodyMesh = new THREE.Mesh(bodyGeo, chassisMat);
    bodyMesh.position.set(0, -0.96, 0);
    bodyMesh.rotation.x = -0.04;
    botGroup.add(bodyMesh);

    const bodyWire = new THREE.Mesh(bodyGeo, wireMat);
    bodyWire.position.copy(bodyMesh.position);
    bodyWire.rotation.copy(bodyMesh.rotation);
    bodyWire.scale.setScalar(1.005);
    bodyWire.visible = false;
    botGroup.add(bodyWire);

    // Front recessed V-accent telemetry groove
    const frontStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.06, 0.03),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 }),
    );
    frontStrip.position.set(0, -0.35, 0.415);
    botGroup.add(frontStrip);

    // Back glowing core strip (visible when orbited 360°)
    const backCore = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.2, 0.05),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 }),
    );
    backCore.position.set(0, -0.85, -0.42);
    botGroup.add(backCore);

    // 6. Floating Side Stabilizer Bar angled to follow the V-taper
    const barShape = createRoundedRectShape(0.24, 2.0, 0.05);
    const barGeo = new THREE.ExtrudeGeometry(barShape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 3,
    });
    barGeo.center();
    const barMesh = new THREE.Mesh(barGeo, chassisMat);
    barMesh.position.set(1.42, -0.78, 0.16);
    barMesh.rotation.set(0, -0.18, -0.31);
    botGroup.add(barMesh);

    // 7. Holographic Triangular Orbit Ring underneath
    const orbitRing = new THREE.Mesh(
      new THREE.RingGeometry(1.9, 1.93, 3),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      }),
    );
    orbitRing.rotation.x = Math.PI / 2;
    orbitRing.position.set(0, -2.2, 0);
    scene.add(orbitRing);

    const circleRing = new THREE.Mesh(
      new THREE.RingGeometry(2.15, 2.17, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.18,
      }),
    );
    circleRing.rotation.x = Math.PI / 2;
    circleRing.position.set(0, -2.2, 0);
    scene.add(circleRing);

    // Pointer Drag Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = -0.36;
    let targetRotX = 0.08;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotY += dx * 0.01;
      targetRotX = Math.max(-0.55, Math.min(0.65, targetRotX + dy * 0.008));
    };
    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    const onResize = () => {
      if (!el) return;
      const nw = el.clientWidth || 320;
      const nh = el.clientHeight || 360;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(el);
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      if (finishRef.current === 'titanium') {
        chassisMat.color.setHex(0x8892a4);
        chassisMat.roughness = 0.28;
      } else if (finishRef.current === 'stealth') {
        chassisMat.color.setHex(0x0c0e13);
        chassisMat.roughness = 0.56;
      } else {
        chassisMat.color.setHex(0x1a1e28);
        chassisMat.roughness = 0.34;
      }

      const isWire = wireRef.current;
      headWire.visible = isWire;
      bodyWire.visible = isWire;
      chassisMat.opacity = isWire ? 0.45 : 1;
      chassisMat.transparent = isWire;

      drawOledFace(oledCtx, eyeRef.current, t);
      oledTex.needsUpdate = true;

      if (!prefersReduced) {
        if (!isDragging) {
          targetRotY += 0.0028;
        }
        botGroup.position.y = Math.sin(t * 1.4) * 0.06;
        headMesh.rotation.z = Math.sin(t * 0.8) * 0.022;
        orbitRing.rotation.z = t * 0.35;
      }

      botGroup.rotation.y += (targetRotY - botGroup.rotation.y) * 0.09;
      botGroup.rotation.x += (targetRotX - botGroup.rotation.x) * 0.09;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      brushedTex.dispose();
      oledTex.dispose();
      headGeo.dispose();
      bodyGeo.dispose();
      barGeo.dispose();
      screenGeo.dispose();
      bezelGeo.dispose();
      hingeGeo.dispose();
      chassisMat.dispose();
      accentMat.dispose();
      wireMat.dispose();
      screenMat.dispose();
      bezelMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs font-mono theme-text-muted">
        3D WebGL недоступен — переключитесь на режим фото прототипа
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
      aria-label="Интерактивная 3D-модель робота iWA ONE PRO — потяните для вращения"
    />
  );
}
