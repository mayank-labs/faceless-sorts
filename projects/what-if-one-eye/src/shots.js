// WHAT HAPPENS IF HUMANS HAD ONE EYE? : Deep Dive 3D shot list.
import * as THREE from 'three';
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets.js';
import { label, pill, warning, blackout } from './core/look2d.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, k) => a.clone().lerp(b, k);
function screen(p, cam) { const v = p.clone().project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; }

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const cam = camera(30);
  const KLOOK = { aperture: 0.003, maxblur: 0.012, bloom: 0.18 };
  const XLOOK = { aperture: 0.0015, bloom: 0.5, bloomThreshold: 0.42, vignette: 0.45 };

  const K = SETS.kitchen(E);
  const hero = new Human({});
  hero.group.position.set(0.12, 0, -0.6);
  K.scene.add(hero.group);

  const X = SETS.xrayStage(E);
  const xh = new Human({});
  const xmat = SETS.xrayMaterial();
  xh.setBodyMaterial(xmat);
  X.scene.add(xh.group);

  const reset = () => {
    hero.pose({ head: [0, 0, 0], lid: -0.1 });
    xh.pose({ head: [0, 0, 0] });
  };

  // 1 · Hook: a curious person covers one eye.
  { const st = cut(0);
    add({ id: 'S01', at: st, note: 'hero covers one eye, wide-eyed question', draw(lt, d, t, blit) {
      reset();
      const k = eo(seg(lt, 0.15, 1.0));
      hero.pose({ head: [-5 * k, 8 * k, 0], lid: lerp(-0.35, -0.05, k), shR: [30, 0, 10], elR: 85 - k * 25 });
      cam.position.copy(lerpV(V3(0.45, 1.68, 0.42), V3(0.32, 1.66, 0.12), eio(lt / d)));
      cam.lookAt(V3(0.12, 1.65, -0.6));
      E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(V3(0.12, 1.65, -0.6)) }); blit();
      pill('ONE EYE', 540, 1180, eob(seg(lt, 0.2, 0.45)), '#FFD43B');
    } });
    cue(st, 'whoosh');
  }

  // 2 · The view stays familiar.
  { const st = cut(1);
    add({ id: 'S02', at: st, note: 'slow orbit through the kitchen; scene remains recognizable', draw(lt, d, t, blit) {
      reset();
      hero.pose({ head: [2, -8 + 10 * eio(lt / d), 0], lid: -0.1 });
      const a = lerp(0.58, 0.18, eio(lt / d));
      cam.position.set(0.12 + Math.sin(a) * 1.9, 1.48, -0.6 + Math.cos(a) * 1.9);
      cam.lookAt(0.12, 1.25, -0.6);
      E.render(K.scene, cam, { ...KLOOK, focus: 2.05 }); blit();
      pill('STILL CLEAR', 540, 1180, eob(seg(lt, 0.12, 0.35)), '#7CF29A');
    } });
    cue(st, 'whoosh');
  }

  // 3 · Shape, color, and motion remain.
  { const st = cut(2);
    add({ id: 'S03', at: st, note: 'x-ray head with colored vision cues', draw(lt, d, t, blit) {
      reset();
      xh.pose({ head: [5, -12, 0], lid: -0.2 });
      cam.position.copy(lerpV(V3(-0.42, 1.62, 1.45), V3(-0.18, 1.58, 1.05), eio(lt / d)));
      cam.lookAt(0, 1.44, 0);
      E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0, 1.44, 0)) }); blit();
      pill('SHAPE', 330, 520, eob(seg(lt, 0.05, 0.28)), '#FFD43B');
      pill('COLOR', 540, 520, eob(seg(lt, 0.18, 0.40)), '#4FD1E8');
      pill('MOTION', 770, 520, eob(seg(lt, 0.31, 0.52)), '#F4A261');
    } });
    cue(st, 'whoosh');
  }

  // 4 · Binocular depth disappears.
  { const st = cut(3);
    add({ id: 'S04', at: st, note: 'two-eye rays merge into one eye', draw(lt, d, t, blit) {
      reset();
      xh.pose({ head: [2, 0, 0], lid: -0.1 });
      cam.position.copy(lerpV(V3(0.52, 1.54, 1.6), V3(0.3, 1.48, 1.15), eio(lt / d)));
      cam.lookAt(0, 1.44, 0);
      E.render(X.scene, cam, { ...XLOOK, bloom: 0.72, focus: cam.position.distanceTo(V3(0, 1.44, 0)) }); blit();
      const p = eob(seg(lt, 0.12, 0.45));
      label('BINOCULAR', 245, 720, 540, 780, p);
      label('DEPTH', 820, 720, 540, 780, p);
      pill('STEREOPSIS ↓', 540, 1180, p, '#FF8A8A');
    } });
    cue(st, 'whoosh');
  }

  // 5 · A tiny difference between the eyes.
  { const st = cut(4);
    add({ id: 'S05', at: st, note: 'two view lines from the eyes converge on a cup', draw(lt, d, t, blit) {
      reset();
      hero.pose({ head: [4, 0, 0], lid: -0.15 });
      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.55, 1.6, 0.75), V3(0.38, 1.52, 0.38), k));
      cam.lookAt(0.12, 1.38, -0.6);
      E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(V3(0.12, 1.38, -0.6)) }); blit();
      ctx.save();
      ctx.strokeStyle = '#4FD1E8'; ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo(465, 560); ctx.lineTo(540, 980); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(615, 560); ctx.lineTo(540, 980); ctx.stroke();
      ctx.restore();
      pill('TWO VIEWS', 540, 1180, eob(seg(lt, 0.15, 0.35)), '#4FD1E8');
    } });
    cue(st, 'whoosh');
  }

  // 6 · Real-world tasks become harder.
  { const st = cut(5);
    add({ id: 'S06', at: st, note: 'three depth tasks: cup, parking, ball', draw(lt, d, t, blit) {
      reset();
      hero.pose({ head: [-8, -12, 0], lid: -0.05, shR: [12, 0, 12], elR: 50 });
      cam.position.copy(lerpV(V3(0.25, 1.58, 1.0), V3(0.1, 1.52, 0.5), eio(lt / d)));
      cam.lookAt(0.12, 1.42, -0.6);
      E.render(K.scene, cam, { ...KLOOK, aperture: 0.004 }); blit();
      pill('CUP', 300, 1120, eob(seg(lt, 0.05, 0.25)), '#FFD43B');
      pill('CAR', 540, 1120, eob(seg(lt, 0.22, 0.42)), '#FFD43B');
      pill('BALL', 780, 1120, eob(seg(lt, 0.39, 0.58)), '#FFD43B');
    } });
    cue(st, 'whoosh');
  }

  // 7 · Monocular cues become more important.
  { const st = cut(6);
    add({ id: 'S07', at: st, note: 'depth cues appear around the hero', draw(lt, d, t, blit) {
      reset();
      hero.pose({ head: [2, 6 * Math.sin(lt * 1.2), 0], lid: -0.12 });
      const a = lerp(0.5, 0.15, eio(lt / d));
      cam.position.set(0.12 + Math.sin(a) * 1.9, 1.48, -0.6 + Math.cos(a) * 1.9);
      cam.lookAt(0.12, 1.28, -0.6);
      E.render(K.scene, cam, { ...KLOOK, focus: 2.1 }); blit();
      pill('SHADOW', 300, 550, eob(seg(lt, 0.05, 0.25)), '#7CF29A');
      pill('MOTION', 770, 550, eob(seg(lt, 0.16, 0.36)), '#7CF29A');
      pill('FOCUS', 540, 1120, eob(seg(lt, 0.30, 0.50)), '#7CF29A');
    } });
    cue(st, 'whoosh');
  }

  // 8 · The brain combines the clues.
  { const st = cut(7);
    add({ id: 'S08', at: st, note: 'x-ray brain receiving monocular depth clues', draw(lt, d, t, blit) {
      reset();
      xh.pose({ head: [-2, 12 * Math.sin(lt * 1.1), 0], lid: -0.18 });
      cam.position.copy(lerpV(V3(-0.52, 1.66, 1.2), V3(-0.18, 1.58, 0.82), eio(lt / d)));
      cam.lookAt(0, 1.48, 0);
      E.render(X.scene, cam, { ...XLOOK, bloom: 0.68, focus: cam.position.distanceTo(V3(0, 1.48, 0)) }); blit();
      pill('BRAIN + CLUES', 540, 1180, eob(seg(lt, 0.12, 0.38)), '#4FD1E8');
    } });
    cue(st, 'whoosh');
  }

  // 9 · Adaptation makes ordinary life possible.
  { const st = cut(8);
    add({ id: 'S09', at: st, note: 'hero walks and looks confident', draw(lt, d, t, blit) {
      reset();
      hero.walk(lt * 2.4, 0.7);
      hero.pose({ head: [2, -4 + 8 * eio(lt / d), 0], lid: -0.08 });
      cam.position.copy(lerpV(V3(-0.7, 1.45, 1.8), V3(-0.25, 1.38, 1.25), eio(lt / d)));
      cam.lookAt(0.12, 1.2, -0.6);
      E.render(K.scene, cam, { ...KLOOK, aperture: 0.004 }); blit();
      pill('ADAPT', 540, 1180, eob(seg(lt, 0.12, 0.35)), '#7CF29A');
    } });
    cue(st, 'whoosh');
  }

  // 10 · The distinction: sight remains, instant depth does not.
  { const st = cut(9);
    add({ id: 'S10', at: st, note: 'hero looks into camera with depth split graphic', draw(lt, d, t, blit) {
      reset();
      hero.pose({ head: [-2, 0, 0], lid: -0.02, look: [0, 0] });
      cam.position.copy(lerpV(V3(0.1, 1.62, 0.9), V3(0.12, 1.64, 0.52), eio(lt / d)));
      cam.lookAt(0.12, 1.61, -0.6);
      E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(V3(0.12, 1.61, -0.6)) }); blit();
      warning(540, 1180, eob(seg(lt, 0.22, 0.55)) * 0.75);
      pill('DEPTH AT A GLANCE', 540, 1320, eob(seg(lt, 0.30, 0.58)), '#FFD43B');
    } });
    cue(st, 'whoosh'); cue(st + 0.30, 'slam', { gain: 0.7 });
  }

  return { shots: S, cues: CUES };
}
