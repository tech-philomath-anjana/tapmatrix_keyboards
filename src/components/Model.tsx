import * as THREE from "three";
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import type { JSX } from "react";

/**
 * Keyboard Component with Animation Refs
 *
 * This component exposes grouped refs for animating different parts of the keyboard:
 *
 * Usage Example:
 * ```tsx
 * const keyboardRef = useRef<KeyboardRef>(null);
 *
 * // Access refs in your animation code:
 * const keycaps = keyboardRef.current?.keycaps;
 * const switches = keyboardRef.current?.switches;
 *
 * // Animate specific rows:
 * gsap.to(keycaps.row2.current?.children.map(child => child.position), {
 *   y: '+=0.1',
 *   duration: 0.5
 * });
 *
 * // Use in JSX:
 * <Keyboard ref={keyboardRef} scale={9} />
 * ```
 *
 * KEYBOARD LAYOUT (for attaching individual key refs):
 * Row 1 (keycapRow1Ref): ESC, F1-F12, DEL (function row)
 * Row 2 (keycapRow2Ref): `, 1-9, 0, -, =, BACKSPACE (number row)
 * Row 3 (keycapRow3Ref): TAB, Q-P, [, ], \, PAGEUP (top letter row)
 * Row 4 (keycapRow4Ref): CAPS, A-L, ;, ', ENTER, PAGEDOWN (home row)
 * Row 5 (keycapRow5Ref): LSHIFT, Z-M, ,, ., /, RSHIFT, ↑, END (bottom row)
 * Additional: LCTRL, LWIN, LALT, SPACE, RALT, FN, ←, ↓, → (modifier/arrow row)
 *
 * To attach more refs: Add `ref={keyRefs.keyname}` to the first <mesh> with geometry={nodes.Boole_*}
 * Pattern: The Boole meshes are the keycap surfaces (second mesh is just UV/texture)
 *
 * Current status: ESC, F1-F6 have refs attached. Continue pattern for remaining keys.
 */

// Type definition for individual switch components
export type SwitchComponents = {
  keycap: React.RefObject<THREE.Mesh | null>;
  stem: React.RefObject<THREE.Group | null>;
  topHousing: React.RefObject<THREE.Mesh | null>;
  bottomHousing: React.RefObject<THREE.Mesh | null>;
  centerMast: React.RefObject<THREE.Mesh | null>;
  metalSpring: React.RefObject<THREE.Mesh | null>;
  ml1: React.RefObject<THREE.Mesh | null>;
  ml2: React.RefObject<THREE.Mesh | null>;
};

// Type definition for exposed refs
export type KeyboardRef = {
  // Main container
  mainGroup: React.RefObject<THREE.Group | null>;

  // Main structure refs
  keyboardStructure: React.RefObject<THREE.Group | null>;
  plate: React.RefObject<THREE.Mesh | null>;
  frame: React.RefObject<THREE.Group | null>;

  // Switch group refs - organized by rows
  switches: {
    row1: React.RefObject<THREE.Group | null>; // Top row (function keys area)
    row2: React.RefObject<THREE.Group | null>; // Number row
    row3: React.RefObject<THREE.Group | null>; // Top letter row (QWERTY)
    row4: React.RefObject<THREE.Group | null>; // Home row (ASDF)
    row5: React.RefObject<THREE.Group | null>; // Bottom row (ZXCV)
  };

  // Keycap group refs - organized by rows
  keycaps: {
    row1: React.RefObject<THREE.Group | null>; // Top row keycaps
    row2: React.RefObject<THREE.Group | null>; // Number row keycaps
    row3: React.RefObject<THREE.Group | null>; // Top letter row keycaps
    row4: React.RefObject<THREE.Group | null>; // Home row keycaps
    row5: React.RefObject<THREE.Group | null>; // Bottom row keycaps
  };

  // Individual key refs - access keys by name for precise animations
  keys: {
    [key: string]: React.RefObject<THREE.Mesh | null>;
  };

  // Individual switch component refs - for advanced animations
  switchComponents: {
    [key: string]: SwitchComponents;
  };

  // Extrude group (symbols/legends on top of keycaps)
  extrudeGroup: React.RefObject<THREE.Group | null>;
};

type GLTFResult = GLTF & {
  nodes: {
    Boole_2_2: THREE.Mesh;
    R4_UV_1_2: THREE.Mesh;
    Boole_2_3: THREE.Mesh;
    R4_UV_1_3: THREE.Mesh;
    Boole_2_4: THREE.Mesh;
    R4_UV_1_4: THREE.Mesh;
    Boole_2_5: THREE.Mesh;
    R4_UV_1_5: THREE.Mesh;
    Boole_2_6: THREE.Mesh;
    R4_UV_1_6: THREE.Mesh;
    Boole_2_7: THREE.Mesh;
    R4_UV_1_7: THREE.Mesh;
    Boole_2_8: THREE.Mesh;
    R4_UV_1_8: THREE.Mesh;
    Boole_2_9: THREE.Mesh;
    R4_UV_1_9: THREE.Mesh;
    Boole_2_11: THREE.Mesh;
    R4_UV_1_11: THREE.Mesh;
    Boole_2_12: THREE.Mesh;
    R4_UV_1_12: THREE.Mesh;
    Boole_2_13: THREE.Mesh;
    R4_UV_1_13: THREE.Mesh;
    Boole_2_10: THREE.Mesh;
    R4_UV_1_10: THREE.Mesh;
    Boole_2_14: THREE.Mesh;
    R4_UV_1_14: THREE.Mesh;
    Boole_2_15: THREE.Mesh;
    R4_UV_1_15: THREE.Mesh;
    Boole_2_16: THREE.Mesh;
    R4_UV_1_16: THREE.Mesh;
    Boole_2: THREE.Mesh;
    R4_UV_1: THREE.Mesh;
    Mesh2884: THREE.Mesh;
    Mesh2884_1: THREE.Mesh;
    Mesh2884_2: THREE.Mesh;
    Boole_2_18: THREE.Mesh;
    R4_UV_1_18: THREE.Mesh;
    st1: THREE.Mesh;
    st2: THREE.Mesh;
    Polygon_2_2: THREE.Mesh;
    Polygon_2_3: THREE.Mesh;
    stabilizers_m: THREE.Mesh;
    Boole_2_33: THREE.Mesh;
    R4_UV_1_33: THREE.Mesh;
    Boole_2_32: THREE.Mesh;
    R4_UV_1_32: THREE.Mesh;
    Boole_2_34: THREE.Mesh;
    R4_UV_1_34: THREE.Mesh;
    Boole_2_21: THREE.Mesh;
    R4_UV_1_21: THREE.Mesh;
    Boole_2_25: THREE.Mesh;
    R4_UV_1_25: THREE.Mesh;
    Boole_2_29: THREE.Mesh;
    R4_UV_1_29: THREE.Mesh;
    Boole_2_20: THREE.Mesh;
    R4_UV_1_20: THREE.Mesh;
    Boole_2_22: THREE.Mesh;
    R4_UV_1_22: THREE.Mesh;
    Boole_2_23: THREE.Mesh;
    R4_UV_1_23: THREE.Mesh;
    Boole_2_24: THREE.Mesh;
    R4_UV_1_24: THREE.Mesh;
    Boole_2_26: THREE.Mesh;
    R4_UV_1_26: THREE.Mesh;
    Boole_2_27: THREE.Mesh;
    R4_UV_1_27: THREE.Mesh;
    Boole_2_28: THREE.Mesh;
    R4_UV_1_28: THREE.Mesh;
    Boole_2_19: THREE.Mesh;
    R4_UV_1_19: THREE.Mesh;
    Boole_2_30: THREE.Mesh;
    R4_UV_1_30: THREE.Mesh;
    Boole_2_31: THREE.Mesh;
    R4_UV_1_31: THREE.Mesh;
    Boole_2_36: THREE.Mesh;
    R4_UV_1_36: THREE.Mesh;
    Boole_2_49: THREE.Mesh;
    R4_UV_1_49: THREE.Mesh;
    Boole_2_50: THREE.Mesh;
    R4_UV_1_50: THREE.Mesh;
    Boole_2_51: THREE.Mesh;
    R4_UV_1_51: THREE.Mesh;
    Boole_2_47: THREE.Mesh;
    R4_UV_1_47: THREE.Mesh;
    Boole_2_48: THREE.Mesh;
    R4_UV_1_48: THREE.Mesh;
    Boole_2_39: THREE.Mesh;
    R4_UV_1_39: THREE.Mesh;
    Boole_2_44: THREE.Mesh;
    R4_UV_1_44: THREE.Mesh;
    Boole_2_45: THREE.Mesh;
    R4_UV_1_45: THREE.Mesh;
    Boole_2_46: THREE.Mesh;
    R4_UV_1_46: THREE.Mesh;
    Boole_2_37: THREE.Mesh;
    R4_UV_1_37: THREE.Mesh;
    Boole_2_40: THREE.Mesh;
    R4_UV_1_40: THREE.Mesh;
    Boole_2_41: THREE.Mesh;
    R4_UV_1_41: THREE.Mesh;
    Boole_2_43: THREE.Mesh;
    R4_UV_1_43: THREE.Mesh;
    Boole_2_38: THREE.Mesh;
    R4_UV_1_38: THREE.Mesh;
    Boole_2_42: THREE.Mesh;
    R4_UV_1_42: THREE.Mesh;
    Boole_2_35: THREE.Mesh;
    R4_UV_1_35: THREE.Mesh;
    Boole_2_52: THREE.Mesh;
    R4_UV_1_52: THREE.Mesh;
    Boole_2_54: THREE.Mesh;
    R4_UV_1_54: THREE.Mesh;
    Boole_2_56: THREE.Mesh;
    R4_UV_1_56: THREE.Mesh;
    f_mark: THREE.Mesh;
    Boole_2_57: THREE.Mesh;
    R4_UV_1_57: THREE.Mesh;
    Boole_2_58: THREE.Mesh;
    R4_UV_1_58: THREE.Mesh;
    Boole_2_59: THREE.Mesh;
    R4_UV_1_59: THREE.Mesh;
    j_mark: THREE.Mesh;
    Boole_2_60: THREE.Mesh;
    R4_UV_1_60: THREE.Mesh;
    Boole_2_61: THREE.Mesh;
    R4_UV_1_61: THREE.Mesh;
    Boole_2_62: THREE.Mesh;
    R4_UV_1_62: THREE.Mesh;
    Boole_2_64: THREE.Mesh;
    R4_UV_1_64: THREE.Mesh;
    Boole_2_63: THREE.Mesh;
    R4_UV_1_63: THREE.Mesh;
    Boole_2_55: THREE.Mesh;
    R4_UV_1_55: THREE.Mesh;
    Boole_2_53: THREE.Mesh;
    R4_UV_1_53: THREE.Mesh;
    st1_2: THREE.Mesh;
    st2_2: THREE.Mesh;
    Polygon_2_4: THREE.Mesh;
    Polygon_2_5: THREE.Mesh;
    stabilizers_m_2: THREE.Mesh;
    Boole_2_68: THREE.Mesh;
    R4_UV_1_68: THREE.Mesh;
    Boole_2_69: THREE.Mesh;
    R4_UV_1_69: THREE.Mesh;
    Boole_2_70: THREE.Mesh;
    R4_UV_1_70: THREE.Mesh;
    Boole_2_71: THREE.Mesh;
    R4_UV_1_71: THREE.Mesh;
    Boole_2_72: THREE.Mesh;
    R4_UV_1_72: THREE.Mesh;
    Boole_2_73: THREE.Mesh;
    R4_UV_1_73: THREE.Mesh;
    Boole_2_74: THREE.Mesh;
    R4_UV_1_74: THREE.Mesh;
    Boole_2_75: THREE.Mesh;
    R4_UV_1_75: THREE.Mesh;
    Boole_2_76: THREE.Mesh;
    R4_UV_1_76: THREE.Mesh;
    Boole_2_67: THREE.Mesh;
    R4_UV_1_67: THREE.Mesh;
    Boole_2_65: THREE.Mesh;
    R4_UV_1_65: THREE.Mesh;
    st1_3: THREE.Mesh;
    st2_3: THREE.Mesh;
    Polygon_2_6: THREE.Mesh;
    Polygon_2_7: THREE.Mesh;
    stabilizers_m_3: THREE.Mesh;
    Boole_2_77: THREE.Mesh;
    R4_UV_1_77: THREE.Mesh;
    Boole_2_66: THREE.Mesh;
    R4_UV_1_66: THREE.Mesh;
    st1_4: THREE.Mesh;
    st2_4: THREE.Mesh;
    Polygon_2_8: THREE.Mesh;
    Polygon_2_9: THREE.Mesh;
    stabilizers_m_4: THREE.Mesh;
    Boole_2_82: THREE.Mesh;
    R4_UV_1_82: THREE.Mesh;
    Boole_2_85: THREE.Mesh;
    R4_UV_1_85: THREE.Mesh;
    Boole_2_83: THREE.Mesh;
    R4_UV_1_83: THREE.Mesh;
    Boole_2_84: THREE.Mesh;
    R4_UV_1_84: THREE.Mesh;
    Boole_2_86: THREE.Mesh;
    R4_UV_1_86: THREE.Mesh;
    Boole_2_88: THREE.Mesh;
    R4_UV_1_88: THREE.Mesh;
    Boole_2_87: THREE.Mesh;
    R4_UV_1_87: THREE.Mesh;
    Boole_2_81: THREE.Mesh;
    R4_UV_1_81: THREE.Mesh;
    Boole_2_79: THREE.Mesh;
    R4_UV_1_79: THREE.Mesh;
    Boole_2_80: THREE.Mesh;
    R4_UV_1_80: THREE.Mesh;
    Boole_2_78: THREE.Mesh;
    R4_UV_1_78: THREE.Mesh;
    st1_5: THREE.Mesh;
    st2_5: THREE.Mesh;
    Polygon_2_10: THREE.Mesh;
    Polygon_2_11: THREE.Mesh;
    stabilizers_m_5: THREE.Mesh;
    Curve018: THREE.Mesh;
    Curve018_1: THREE.Mesh;
    Mesh3086: THREE.Mesh;
    Mesh3086_1: THREE.Mesh;
    Mode_Switch: THREE.Mesh;
    Wired_logo: THREE.Mesh;
    Wireless_logo: THREE.Mesh;
    l1002: THREE.Mesh;
    l2002: THREE.Mesh;
    l1_2: THREE.Mesh;
    l2_2: THREE.Mesh;
    Cylinder_1_2: THREE.Mesh;
    Cylinder_2_86: THREE.Mesh;
    Cylinder_2_87: THREE.Mesh;
    Cylinder_3: THREE.Mesh;
    type_c_f: THREE.Mesh;
    plate001: THREE.Mesh;
    ML1087: THREE.Mesh;
    ML2087: THREE.Mesh;
    Metal_Spring: THREE.Mesh;
    Sphere348: THREE.Mesh;
    Sphere_1: THREE.Mesh;
    Sphere_2: THREE.Mesh;
    Sphere_3: THREE.Mesh;
    Stem_1: THREE.Mesh;
    Bottom_Housing: THREE.Mesh;
    Center_Mast: THREE.Mesh;
    Cylinder_2: THREE.Mesh;
    L1087: THREE.Mesh;
    L2087: THREE.Mesh;
    Top_Housing: THREE.Mesh;
    ML1_10: THREE.Mesh;
    ML2_10: THREE.Mesh;
    Metal_Spring_10: THREE.Mesh;
    Sphere_10: THREE.Mesh;
    Sphere_1_10: THREE.Mesh;
    Sphere_2_11: THREE.Mesh;
    Sphere_3_11: THREE.Mesh;
    Stem_1_10: THREE.Mesh;
    Bottom_Housing_10: THREE.Mesh;
    Center_Mast_10: THREE.Mesh;
    Cylinder_2_10: THREE.Mesh;
    L1_10: THREE.Mesh;
    L2_10: THREE.Mesh;
    Top_Housing_10: THREE.Mesh;
    ML1_11: THREE.Mesh;
    ML2_11: THREE.Mesh;
    Metal_Spring_11: THREE.Mesh;
    Sphere_11: THREE.Mesh;
    Sphere_1_11: THREE.Mesh;
    Sphere_2_12: THREE.Mesh;
    Sphere_3_12: THREE.Mesh;
    Stem_1_11: THREE.Mesh;
    Bottom_Housing_11: THREE.Mesh;
    Center_Mast_11: THREE.Mesh;
    Cylinder_2_11: THREE.Mesh;
    L1_11: THREE.Mesh;
    L2_11: THREE.Mesh;
    Top_Housing_11: THREE.Mesh;
    ML1_12: THREE.Mesh;
    ML2_12: THREE.Mesh;
    Metal_Spring_12: THREE.Mesh;
    Sphere_12: THREE.Mesh;
    Sphere_1_12: THREE.Mesh;
    Sphere_2_13: THREE.Mesh;
    Sphere_3_13: THREE.Mesh;
    Stem_1_12: THREE.Mesh;
    Bottom_Housing_12: THREE.Mesh;
    Center_Mast_12: THREE.Mesh;
    Cylinder_2_12: THREE.Mesh;
    L1_12: THREE.Mesh;
    L2_12: THREE.Mesh;
    Top_Housing_12: THREE.Mesh;
    ML1_13: THREE.Mesh;
    ML2_13: THREE.Mesh;
    Metal_Spring_13: THREE.Mesh;
    Sphere_13: THREE.Mesh;
    Sphere_1_13: THREE.Mesh;
    Sphere_2_14: THREE.Mesh;
    Sphere_3_14: THREE.Mesh;
    Stem_1_13: THREE.Mesh;
    Bottom_Housing_13: THREE.Mesh;
    Center_Mast_13: THREE.Mesh;
    Cylinder_2_13: THREE.Mesh;
    L1_13: THREE.Mesh;
    L2_13: THREE.Mesh;
    Top_Housing_13: THREE.Mesh;
    ML1_14: THREE.Mesh;
    ML2_14: THREE.Mesh;
    Metal_Spring_14: THREE.Mesh;
    Sphere_14: THREE.Mesh;
    Sphere_1_14: THREE.Mesh;
    Sphere_2_15: THREE.Mesh;
    Sphere_3_15: THREE.Mesh;
    Stem_1_14: THREE.Mesh;
    Bottom_Housing_14: THREE.Mesh;
    Center_Mast_14: THREE.Mesh;
    Cylinder_2_14: THREE.Mesh;
    L1_14: THREE.Mesh;
    L2_14: THREE.Mesh;
    Top_Housing_14: THREE.Mesh;
    ML1_15: THREE.Mesh;
    ML2_15: THREE.Mesh;
    Metal_Spring_15: THREE.Mesh;
    Sphere_15: THREE.Mesh;
    Sphere_1_15: THREE.Mesh;
    Sphere_2_16: THREE.Mesh;
    Sphere_3_16: THREE.Mesh;
    Stem_1_15: THREE.Mesh;
    Bottom_Housing_15: THREE.Mesh;
    Center_Mast_15: THREE.Mesh;
    Cylinder_2_15: THREE.Mesh;
    L1_15: THREE.Mesh;
    L2_15: THREE.Mesh;
    Top_Housing_15: THREE.Mesh;
    ML1_16: THREE.Mesh;
    ML2_16: THREE.Mesh;
    Metal_Spring_16: THREE.Mesh;
    Sphere_16: THREE.Mesh;
    Sphere_1_16: THREE.Mesh;
    Sphere_2_17: THREE.Mesh;
    Sphere_3_17: THREE.Mesh;
    Stem_1_16: THREE.Mesh;
    Bottom_Housing_16: THREE.Mesh;
    Center_Mast_16: THREE.Mesh;
    Cylinder_2_16: THREE.Mesh;
    L1_16: THREE.Mesh;
    L2_16: THREE.Mesh;
    Top_Housing_16: THREE.Mesh;
    ML1_17: THREE.Mesh;
    ML2_17: THREE.Mesh;
    Metal_Spring_17: THREE.Mesh;
    Sphere_17: THREE.Mesh;
    Sphere_1_17: THREE.Mesh;
    Sphere_2_18: THREE.Mesh;
    Sphere_3_18: THREE.Mesh;
    Stem_1_17: THREE.Mesh;
    Bottom_Housing_17: THREE.Mesh;
    Center_Mast_17: THREE.Mesh;
    Cylinder_2_17: THREE.Mesh;
    L1_17: THREE.Mesh;
    L2_17: THREE.Mesh;
    Top_Housing_17: THREE.Mesh;
    ML1_18: THREE.Mesh;
    ML2_18: THREE.Mesh;
    Metal_Spring_18: THREE.Mesh;
    Sphere_18: THREE.Mesh;
    Sphere_1_18: THREE.Mesh;
    Sphere_2_19: THREE.Mesh;
    Sphere_3_19: THREE.Mesh;
    Stem_1_18: THREE.Mesh;
    Bottom_Housing_18: THREE.Mesh;
    Center_Mast_18: THREE.Mesh;
    Cylinder_2_18: THREE.Mesh;
    L1_18: THREE.Mesh;
    L2_18: THREE.Mesh;
    Top_Housing_18: THREE.Mesh;
    ML1_19: THREE.Mesh;
    ML2_19: THREE.Mesh;
    Metal_Spring_19: THREE.Mesh;
    Sphere_19: THREE.Mesh;
    Sphere_1_19: THREE.Mesh;
    Sphere_2_20: THREE.Mesh;
    Sphere_3_20: THREE.Mesh;
    Stem_1_19: THREE.Mesh;
    Bottom_Housing_19: THREE.Mesh;
    Center_Mast_19: THREE.Mesh;
    Cylinder_2_19: THREE.Mesh;
    L1_19: THREE.Mesh;
    L2_19: THREE.Mesh;
    Top_Housing_19: THREE.Mesh;
    ML1_2: THREE.Mesh;
    ML2_2: THREE.Mesh;
    Metal_Spring_2: THREE.Mesh;
    Sphere_1_2: THREE.Mesh;
    Sphere_2_2: THREE.Mesh;
    Sphere_2_3: THREE.Mesh;
    Sphere_3_2: THREE.Mesh;
    Stem_1_2: THREE.Mesh;
    Bottom_Housing_2: THREE.Mesh;
    Center_Mast_2: THREE.Mesh;
    Cylinder_2_2: THREE.Mesh;
    L1_2: THREE.Mesh;
    L2_2: THREE.Mesh;
    Top_Housing_2: THREE.Mesh;
    ML1_20: THREE.Mesh;
    ML2_20: THREE.Mesh;
    Metal_Spring_20: THREE.Mesh;
    Sphere_1_20: THREE.Mesh;
    Sphere_20: THREE.Mesh;
    Sphere_2_21: THREE.Mesh;
    Sphere_3_21: THREE.Mesh;
    Stem_1_20: THREE.Mesh;
    Bottom_Housing_20: THREE.Mesh;
    Center_Mast_20: THREE.Mesh;
    Cylinder_2_20: THREE.Mesh;
    L1_20: THREE.Mesh;
    L2_20: THREE.Mesh;
    Top_Housing_20: THREE.Mesh;
    ML1_21: THREE.Mesh;
    ML2_21: THREE.Mesh;
    Metal_Spring_21: THREE.Mesh;
    Sphere_1_21: THREE.Mesh;
    Sphere_21: THREE.Mesh;
    Sphere_2_22: THREE.Mesh;
    Sphere_3_22: THREE.Mesh;
    Stem_1_21: THREE.Mesh;
    Bottom_Housing_21: THREE.Mesh;
    Center_Mast_21: THREE.Mesh;
    Cylinder_2_21: THREE.Mesh;
    L1_21: THREE.Mesh;
    L2_21: THREE.Mesh;
    Top_Housing_21: THREE.Mesh;
    ML1_22: THREE.Mesh;
    ML2_22: THREE.Mesh;
    Metal_Spring_22: THREE.Mesh;
    Sphere_1_22: THREE.Mesh;
    Sphere_22: THREE.Mesh;
    Sphere_2_23: THREE.Mesh;
    Sphere_3_23: THREE.Mesh;
    Stem_1_22: THREE.Mesh;
    Bottom_Housing_22: THREE.Mesh;
    Center_Mast_22: THREE.Mesh;
    Cylinder_2_22: THREE.Mesh;
    L1_22: THREE.Mesh;
    L2_22: THREE.Mesh;
    Top_Housing_22: THREE.Mesh;
    ML1_23: THREE.Mesh;
    ML2_23: THREE.Mesh;
    Metal_Spring_23: THREE.Mesh;
    Sphere_1_23: THREE.Mesh;
    Sphere_23: THREE.Mesh;
    Sphere_2_24: THREE.Mesh;
    Sphere_3_24: THREE.Mesh;
    Stem_1_23: THREE.Mesh;
    Bottom_Housing_23: THREE.Mesh;
    Center_Mast_23: THREE.Mesh;
    Cylinder_2_23: THREE.Mesh;
    L1_23: THREE.Mesh;
    L2_23: THREE.Mesh;
    Top_Housing_23: THREE.Mesh;
    ML1_24: THREE.Mesh;
    ML2_24: THREE.Mesh;
    Metal_Spring_24: THREE.Mesh;
    Sphere_1_24: THREE.Mesh;
    Sphere_24: THREE.Mesh;
    Sphere_2_25: THREE.Mesh;
    Sphere_3_25: THREE.Mesh;
    Stem_1_24: THREE.Mesh;
    Bottom_Housing_24: THREE.Mesh;
    Center_Mast_24: THREE.Mesh;
    Cylinder_2_24: THREE.Mesh;
    L1_24: THREE.Mesh;
    L2_24: THREE.Mesh;
    Top_Housing_24: THREE.Mesh;
    ML1_25: THREE.Mesh;
    ML2_25: THREE.Mesh;
    Metal_Spring_25: THREE.Mesh;
    Sphere_1_25: THREE.Mesh;
    Sphere_25: THREE.Mesh;
    Sphere_2_26: THREE.Mesh;
    Sphere_3_26: THREE.Mesh;
    Stem_1_25: THREE.Mesh;
    Bottom_Housing_25: THREE.Mesh;
    Center_Mast_25: THREE.Mesh;
    Cylinder_2_25: THREE.Mesh;
    L1_25: THREE.Mesh;
    L2_25: THREE.Mesh;
    Top_Housing_25: THREE.Mesh;
    ML1_26: THREE.Mesh;
    ML2_26: THREE.Mesh;
    Metal_Spring_26: THREE.Mesh;
    Sphere_1_26: THREE.Mesh;
    Sphere_26: THREE.Mesh;
    Sphere_2_27: THREE.Mesh;
    Sphere_3_27: THREE.Mesh;
    Stem_1_26: THREE.Mesh;
    Bottom_Housing_26: THREE.Mesh;
    Center_Mast_26: THREE.Mesh;
    Cylinder_2_26: THREE.Mesh;
    L1_26: THREE.Mesh;
    L2_26: THREE.Mesh;
    Top_Housing_26: THREE.Mesh;
    ML1_27: THREE.Mesh;
    ML2_27: THREE.Mesh;
    Metal_Spring_27: THREE.Mesh;
    Sphere_1_27: THREE.Mesh;
    Sphere_27: THREE.Mesh;
    Sphere_2_28: THREE.Mesh;
    Sphere_3_28: THREE.Mesh;
    Stem_1_27: THREE.Mesh;
    Bottom_Housing_27: THREE.Mesh;
    Center_Mast_27: THREE.Mesh;
    Cylinder_2_27: THREE.Mesh;
    L1_27: THREE.Mesh;
    L2_27: THREE.Mesh;
    Top_Housing_27: THREE.Mesh;
    ML1_28: THREE.Mesh;
    ML2_28: THREE.Mesh;
    Metal_Spring_28: THREE.Mesh;
    Sphere_1_28: THREE.Mesh;
    Sphere_28: THREE.Mesh;
    Sphere_2_29: THREE.Mesh;
    Sphere_3_29: THREE.Mesh;
    Stem_1_28: THREE.Mesh;
    Bottom_Housing_28: THREE.Mesh;
    Center_Mast_28: THREE.Mesh;
    Cylinder_2_28: THREE.Mesh;
    L1_28: THREE.Mesh;
    L2_28: THREE.Mesh;
    Top_Housing_28: THREE.Mesh;
    ML1_29: THREE.Mesh;
    ML2_29: THREE.Mesh;
    Metal_Spring_29: THREE.Mesh;
    Sphere_1_29: THREE.Mesh;
    Sphere_29: THREE.Mesh;
    Sphere_2_30: THREE.Mesh;
    Sphere_3_30: THREE.Mesh;
    Stem_1_29: THREE.Mesh;
    Bottom_Housing_29: THREE.Mesh;
    Center_Mast_29: THREE.Mesh;
    Cylinder_2_29: THREE.Mesh;
    L1_29: THREE.Mesh;
    L2_29: THREE.Mesh;
    Top_Housing_29: THREE.Mesh;
    ML1_3: THREE.Mesh;
    ML2_3: THREE.Mesh;
    Metal_Spring_3: THREE.Mesh;
    Sphere_1_3: THREE.Mesh;
    Sphere_2_4: THREE.Mesh;
    Sphere_3_3: THREE.Mesh;
    Sphere_3_4: THREE.Mesh;
    Stem_1_3: THREE.Mesh;
    Bottom_Housing_3: THREE.Mesh;
    Center_Mast_3: THREE.Mesh;
    Cylinder_2_3: THREE.Mesh;
    L1_3: THREE.Mesh;
    L2_3: THREE.Mesh;
    Top_Housing_3: THREE.Mesh;
    ML1_30: THREE.Mesh;
    ML2_30: THREE.Mesh;
    Metal_Spring_30: THREE.Mesh;
    Sphere_1_30: THREE.Mesh;
    Sphere_2_31: THREE.Mesh;
    Sphere_30: THREE.Mesh;
    Sphere_3_31: THREE.Mesh;
    Stem_1_30: THREE.Mesh;
    Bottom_Housing_30: THREE.Mesh;
    Center_Mast_30: THREE.Mesh;
    Cylinder_2_30: THREE.Mesh;
    L1_30: THREE.Mesh;
    L2_30: THREE.Mesh;
    Top_Housing_30: THREE.Mesh;
    ML1_31: THREE.Mesh;
    ML2_31: THREE.Mesh;
    Metal_Spring_31: THREE.Mesh;
    Sphere_1_31: THREE.Mesh;
    Sphere_2_32: THREE.Mesh;
    Sphere_31: THREE.Mesh;
    Sphere_3_32: THREE.Mesh;
    Stem_1_31: THREE.Mesh;
    Bottom_Housing_31: THREE.Mesh;
    Center_Mast_31: THREE.Mesh;
    Cylinder_2_31: THREE.Mesh;
    L1_31: THREE.Mesh;
    L2_31: THREE.Mesh;
    Top_Housing_31: THREE.Mesh;
    ML1_32: THREE.Mesh;
    ML2_32: THREE.Mesh;
    Metal_Spring_32: THREE.Mesh;
    Sphere_1_32: THREE.Mesh;
    Sphere_2_33: THREE.Mesh;
    Sphere_32: THREE.Mesh;
    Sphere_3_33: THREE.Mesh;
    Stem_1_32: THREE.Mesh;
    Bottom_Housing_32: THREE.Mesh;
    Center_Mast_32: THREE.Mesh;
    Cylinder_2_32: THREE.Mesh;
    L1_32: THREE.Mesh;
    L2_32: THREE.Mesh;
    Top_Housing_32: THREE.Mesh;
    ML1_33: THREE.Mesh;
    ML2_33: THREE.Mesh;
    Metal_Spring_33: THREE.Mesh;
    Sphere_1_33: THREE.Mesh;
    Sphere_2_34: THREE.Mesh;
    Sphere_33: THREE.Mesh;
    Sphere_3_34: THREE.Mesh;
    Stem_1_33: THREE.Mesh;
    Bottom_Housing_33: THREE.Mesh;
    Center_Mast_33: THREE.Mesh;
    Cylinder_2_33: THREE.Mesh;
    L1_33: THREE.Mesh;
    L2_33: THREE.Mesh;
    Top_Housing_33: THREE.Mesh;
    ML1_34: THREE.Mesh;
    ML2_34: THREE.Mesh;
    Metal_Spring_34: THREE.Mesh;
    Sphere_1_34: THREE.Mesh;
    Sphere_2_35: THREE.Mesh;
    Sphere_34: THREE.Mesh;
    Sphere_3_35: THREE.Mesh;
    Stem_1_34: THREE.Mesh;
    Bottom_Housing_34: THREE.Mesh;
    Center_Mast_34: THREE.Mesh;
    Cylinder_2_34: THREE.Mesh;
    L1_34: THREE.Mesh;
    L2_34: THREE.Mesh;
    Top_Housing_34: THREE.Mesh;
    ML1_35: THREE.Mesh;
    ML2_35: THREE.Mesh;
    Metal_Spring_35: THREE.Mesh;
    Sphere_1_35: THREE.Mesh;
    Sphere_2_36: THREE.Mesh;
    Sphere_35: THREE.Mesh;
    Sphere_3_36: THREE.Mesh;
    Stem_1_35: THREE.Mesh;
    Bottom_Housing_35: THREE.Mesh;
    Center_Mast_35: THREE.Mesh;
    Cylinder_2_35: THREE.Mesh;
    L1_35: THREE.Mesh;
    L2_35: THREE.Mesh;
    Top_Housing_35: THREE.Mesh;
    ML1_36: THREE.Mesh;
    ML2_36: THREE.Mesh;
    Metal_Spring_36: THREE.Mesh;
    Sphere_1_36: THREE.Mesh;
    Sphere_2_37: THREE.Mesh;
    Sphere_36: THREE.Mesh;
    Sphere_3_37: THREE.Mesh;
    Stem_1_36: THREE.Mesh;
    Bottom_Housing_36: THREE.Mesh;
    Center_Mast_36: THREE.Mesh;
    Cylinder_2_36: THREE.Mesh;
    L1_36: THREE.Mesh;
    L2_36: THREE.Mesh;
    Top_Housing_36: THREE.Mesh;
    ML1_37: THREE.Mesh;
    ML2_37: THREE.Mesh;
    Metal_Spring_37: THREE.Mesh;
    Sphere_1_37: THREE.Mesh;
    Sphere_2_38: THREE.Mesh;
    Sphere_37: THREE.Mesh;
    Sphere_3_38: THREE.Mesh;
    Stem_1_37: THREE.Mesh;
    Bottom_Housing_37: THREE.Mesh;
    Center_Mast_37: THREE.Mesh;
    Cylinder_2_37: THREE.Mesh;
    L1_37: THREE.Mesh;
    L2_37: THREE.Mesh;
    Top_Housing_37: THREE.Mesh;
    ML1_38: THREE.Mesh;
    ML2_38: THREE.Mesh;
    Metal_Spring_38: THREE.Mesh;
    Sphere_1_38: THREE.Mesh;
    Sphere_2_39: THREE.Mesh;
    Sphere_38: THREE.Mesh;
    Sphere_3_39: THREE.Mesh;
    Stem_1_38: THREE.Mesh;
    Bottom_Housing_38: THREE.Mesh;
    Center_Mast_38: THREE.Mesh;
    Cylinder_2_38: THREE.Mesh;
    L1_38: THREE.Mesh;
    L2_38: THREE.Mesh;
    Top_Housing_38: THREE.Mesh;
    ML1_39: THREE.Mesh;
    ML2_39: THREE.Mesh;
    Metal_Spring_39: THREE.Mesh;
    Sphere_1_39: THREE.Mesh;
    Sphere_2_40: THREE.Mesh;
    Sphere_39: THREE.Mesh;
    Sphere_3_40: THREE.Mesh;
    Stem_1_39: THREE.Mesh;
    Bottom_Housing_39: THREE.Mesh;
    Center_Mast_39: THREE.Mesh;
    Cylinder_2_39: THREE.Mesh;
    L1_39: THREE.Mesh;
    L2_39: THREE.Mesh;
    Top_Housing_39: THREE.Mesh;
    ML1_4: THREE.Mesh;
    ML2_4: THREE.Mesh;
    Metal_Spring_4: THREE.Mesh;
    Sphere_1_4: THREE.Mesh;
    Sphere_2_5: THREE.Mesh;
    Sphere_3_5: THREE.Mesh;
    Sphere_4: THREE.Mesh;
    Stem_1_4: THREE.Mesh;
    Bottom_Housing_4: THREE.Mesh;
    Center_Mast_4: THREE.Mesh;
    Cylinder_2_4: THREE.Mesh;
    L1_4: THREE.Mesh;
    L2_4: THREE.Mesh;
    Top_Housing_4: THREE.Mesh;
    ML1_40: THREE.Mesh;
    ML2_40: THREE.Mesh;
    Metal_Spring_40: THREE.Mesh;
    Sphere_1_40: THREE.Mesh;
    Sphere_2_41: THREE.Mesh;
    Sphere_3_41: THREE.Mesh;
    Sphere_40: THREE.Mesh;
    Stem_1_40: THREE.Mesh;
    Bottom_Housing_40: THREE.Mesh;
    Center_Mast_40: THREE.Mesh;
    Cylinder_2_40: THREE.Mesh;
    L1_40: THREE.Mesh;
    L2_40: THREE.Mesh;
    Top_Housing_40: THREE.Mesh;
    ML1_41: THREE.Mesh;
    ML2_41: THREE.Mesh;
    Metal_Spring_41: THREE.Mesh;
    Sphere_1_41: THREE.Mesh;
    Sphere_2_42: THREE.Mesh;
    Sphere_3_42: THREE.Mesh;
    Sphere_41: THREE.Mesh;
    Stem_1_41: THREE.Mesh;
    Bottom_Housing_41: THREE.Mesh;
    Center_Mast_41: THREE.Mesh;
    Cylinder_2_41: THREE.Mesh;
    L1_41: THREE.Mesh;
    L2_41: THREE.Mesh;
    Top_Housing_41: THREE.Mesh;
    ML1_42: THREE.Mesh;
    ML2_42: THREE.Mesh;
    Metal_Spring_42: THREE.Mesh;
    Sphere_1_42: THREE.Mesh;
    Sphere_2_43: THREE.Mesh;
    Sphere_3_43: THREE.Mesh;
    Sphere_42: THREE.Mesh;
    Stem_1_42: THREE.Mesh;
    Bottom_Housing_42: THREE.Mesh;
    Center_Mast_42: THREE.Mesh;
    Cylinder_2_42: THREE.Mesh;
    L1_42: THREE.Mesh;
    L2_42: THREE.Mesh;
    Top_Housing_42: THREE.Mesh;
    ML1_43: THREE.Mesh;
    ML2_43: THREE.Mesh;
    Metal_Spring_43: THREE.Mesh;
    Sphere_1_43: THREE.Mesh;
    Sphere_2_44: THREE.Mesh;
    Sphere_3_44: THREE.Mesh;
    Sphere_43: THREE.Mesh;
    Stem_1_43: THREE.Mesh;
    Bottom_Housing_43: THREE.Mesh;
    Center_Mast_43: THREE.Mesh;
    Cylinder_2_43: THREE.Mesh;
    L1_43: THREE.Mesh;
    L2_43: THREE.Mesh;
    Top_Housing_43: THREE.Mesh;
    ML1_44: THREE.Mesh;
    ML2_44: THREE.Mesh;
    Metal_Spring_44: THREE.Mesh;
    Sphere_1_44: THREE.Mesh;
    Sphere_2_45: THREE.Mesh;
    Sphere_3_45: THREE.Mesh;
    Sphere_44: THREE.Mesh;
    Stem_1_44: THREE.Mesh;
    Bottom_Housing_44: THREE.Mesh;
    Center_Mast_44: THREE.Mesh;
    Cylinder_2_44: THREE.Mesh;
    L1_44: THREE.Mesh;
    L2_44: THREE.Mesh;
    Top_Housing_44: THREE.Mesh;
    ML1_45: THREE.Mesh;
    ML2_45: THREE.Mesh;
    Metal_Spring_45: THREE.Mesh;
    Sphere_1_45: THREE.Mesh;
    Sphere_2_46: THREE.Mesh;
    Sphere_3_46: THREE.Mesh;
    Sphere_45: THREE.Mesh;
    Stem_1_45: THREE.Mesh;
    Bottom_Housing_45: THREE.Mesh;
    Center_Mast_45: THREE.Mesh;
    Cylinder_2_45: THREE.Mesh;
    L1_45: THREE.Mesh;
    L2_45: THREE.Mesh;
    Top_Housing_45: THREE.Mesh;
    ML1_46: THREE.Mesh;
    ML2_46: THREE.Mesh;
    Metal_Spring_46: THREE.Mesh;
    Sphere_1_46: THREE.Mesh;
    Sphere_2_47: THREE.Mesh;
    Sphere_3_47: THREE.Mesh;
    Sphere_46: THREE.Mesh;
    Stem_1_46: THREE.Mesh;
    Bottom_Housing_46: THREE.Mesh;
    Center_Mast_46: THREE.Mesh;
    Cylinder_2_46: THREE.Mesh;
    L1_46: THREE.Mesh;
    L2_46: THREE.Mesh;
    Top_Housing_46: THREE.Mesh;
    ML1_47: THREE.Mesh;
    ML2_47: THREE.Mesh;
    Metal_Spring_47: THREE.Mesh;
    Sphere_1_47: THREE.Mesh;
    Sphere_2_48: THREE.Mesh;
    Sphere_3_48: THREE.Mesh;
    Sphere_47: THREE.Mesh;
    Stem_1_47: THREE.Mesh;
    Bottom_Housing_47: THREE.Mesh;
    Center_Mast_47: THREE.Mesh;
    Cylinder_2_47: THREE.Mesh;
    L1_47: THREE.Mesh;
    L2_47: THREE.Mesh;
    Top_Housing_47: THREE.Mesh;
    ML1_48: THREE.Mesh;
    ML2_48: THREE.Mesh;
    Metal_Spring_48: THREE.Mesh;
    Sphere_1_48: THREE.Mesh;
    Sphere_2_49: THREE.Mesh;
    Sphere_3_49: THREE.Mesh;
    Sphere_48: THREE.Mesh;
    Stem_1_48: THREE.Mesh;
    Bottom_Housing_48: THREE.Mesh;
    Center_Mast_48: THREE.Mesh;
    Cylinder_2_48: THREE.Mesh;
    L1_48: THREE.Mesh;
    L2_48: THREE.Mesh;
    Top_Housing_48: THREE.Mesh;
    ML1_49: THREE.Mesh;
    ML2_49: THREE.Mesh;
    Metal_Spring_49: THREE.Mesh;
    Sphere_1_49: THREE.Mesh;
    Sphere_2_50: THREE.Mesh;
    Sphere_3_50: THREE.Mesh;
    Sphere_49: THREE.Mesh;
    Stem_1_49: THREE.Mesh;
    Bottom_Housing_49: THREE.Mesh;
    Center_Mast_49: THREE.Mesh;
    Cylinder_2_49: THREE.Mesh;
    L1_49: THREE.Mesh;
    L2_49: THREE.Mesh;
    Top_Housing_49: THREE.Mesh;
    ML1_5: THREE.Mesh;
    ML2_5: THREE.Mesh;
    Metal_Spring_5: THREE.Mesh;
    Sphere_1_5: THREE.Mesh;
    Sphere_2_6: THREE.Mesh;
    Sphere_3_6: THREE.Mesh;
    Sphere_5: THREE.Mesh;
    Stem_1_5: THREE.Mesh;
    Bottom_Housing_5: THREE.Mesh;
    Center_Mast_5: THREE.Mesh;
    Cylinder_2_5: THREE.Mesh;
    L1_5: THREE.Mesh;
    L2_5: THREE.Mesh;
    Top_Housing_5: THREE.Mesh;
    ML1_50: THREE.Mesh;
    ML2_50: THREE.Mesh;
    Metal_Spring_50: THREE.Mesh;
    Sphere_1_50: THREE.Mesh;
    Sphere_2_51: THREE.Mesh;
    Sphere_3_51: THREE.Mesh;
    Sphere_50: THREE.Mesh;
    Stem_1_50: THREE.Mesh;
    Bottom_Housing_50: THREE.Mesh;
    Center_Mast_50: THREE.Mesh;
    Cylinder_2_50: THREE.Mesh;
    L1_50: THREE.Mesh;
    L2_50: THREE.Mesh;
    Top_Housing_50: THREE.Mesh;
    ML1_51: THREE.Mesh;
    ML2_51: THREE.Mesh;
    Metal_Spring_51: THREE.Mesh;
    Sphere_1_51: THREE.Mesh;
    Sphere_2_52: THREE.Mesh;
    Sphere_3_52: THREE.Mesh;
    Sphere_51: THREE.Mesh;
    Stem_1_51: THREE.Mesh;
    Bottom_Housing_51: THREE.Mesh;
    Center_Mast_51: THREE.Mesh;
    Cylinder_2_51: THREE.Mesh;
    L1_51: THREE.Mesh;
    L2_51: THREE.Mesh;
    Top_Housing_51: THREE.Mesh;
    ML1_52: THREE.Mesh;
    ML2_52: THREE.Mesh;
    Metal_Spring_52: THREE.Mesh;
    Sphere_1_52: THREE.Mesh;
    Sphere_2_53: THREE.Mesh;
    Sphere_3_53: THREE.Mesh;
    Sphere_52: THREE.Mesh;
    Stem_1_52: THREE.Mesh;
    Bottom_Housing_52: THREE.Mesh;
    Center_Mast_52: THREE.Mesh;
    Cylinder_2_52: THREE.Mesh;
    L1_52: THREE.Mesh;
    L2_52: THREE.Mesh;
    Top_Housing_52: THREE.Mesh;
    ML1_53: THREE.Mesh;
    ML2_53: THREE.Mesh;
    Metal_Spring_53: THREE.Mesh;
    Sphere_1_53: THREE.Mesh;
    Sphere_2_54: THREE.Mesh;
    Sphere_3_54: THREE.Mesh;
    Sphere_53: THREE.Mesh;
    Stem_1_53: THREE.Mesh;
    Bottom_Housing_53: THREE.Mesh;
    Center_Mast_53: THREE.Mesh;
    Cylinder_2_53: THREE.Mesh;
    L1_53: THREE.Mesh;
    L2_53: THREE.Mesh;
    Top_Housing_53: THREE.Mesh;
    ML1_54: THREE.Mesh;
    ML2_54: THREE.Mesh;
    Metal_Spring_54: THREE.Mesh;
    Sphere_1_54: THREE.Mesh;
    Sphere_2_55: THREE.Mesh;
    Sphere_3_55: THREE.Mesh;
    Sphere_54: THREE.Mesh;
    Stem_1_54: THREE.Mesh;
    Bottom_Housing_54: THREE.Mesh;
    Center_Mast_54: THREE.Mesh;
    Cylinder_2_54: THREE.Mesh;
    L1_54: THREE.Mesh;
    L2_54: THREE.Mesh;
    Top_Housing_54: THREE.Mesh;
    ML1_55: THREE.Mesh;
    ML2_55: THREE.Mesh;
    Metal_Spring_55: THREE.Mesh;
    Sphere_1_55: THREE.Mesh;
    Sphere_2_56: THREE.Mesh;
    Sphere_3_56: THREE.Mesh;
    Sphere_55: THREE.Mesh;
    Stem_1_55: THREE.Mesh;
    Bottom_Housing_55: THREE.Mesh;
    Center_Mast_55: THREE.Mesh;
    Cylinder_2_55: THREE.Mesh;
    L1_55: THREE.Mesh;
    L2_55: THREE.Mesh;
    Top_Housing_55: THREE.Mesh;
    ML1_56: THREE.Mesh;
    ML2_56: THREE.Mesh;
    Metal_Spring_56: THREE.Mesh;
    Sphere_1_56: THREE.Mesh;
    Sphere_2_57: THREE.Mesh;
    Sphere_3_57: THREE.Mesh;
    Sphere_56: THREE.Mesh;
    Stem_1_56: THREE.Mesh;
    Bottom_Housing_56: THREE.Mesh;
    Center_Mast_56: THREE.Mesh;
    Cylinder_2_56: THREE.Mesh;
    L1_56: THREE.Mesh;
    L2_56: THREE.Mesh;
    Top_Housing_56: THREE.Mesh;
    ML1_57: THREE.Mesh;
    ML2_57: THREE.Mesh;
    Metal_Spring_57: THREE.Mesh;
    Sphere_1_57: THREE.Mesh;
    Sphere_2_58: THREE.Mesh;
    Sphere_3_58: THREE.Mesh;
    Sphere_57: THREE.Mesh;
    Stem_1_57: THREE.Mesh;
    Bottom_Housing_57: THREE.Mesh;
    Center_Mast_57: THREE.Mesh;
    Cylinder_2_57: THREE.Mesh;
    L1_57: THREE.Mesh;
    L2_57: THREE.Mesh;
    Top_Housing_57: THREE.Mesh;
    ML1_58: THREE.Mesh;
    ML2_58: THREE.Mesh;
    Metal_Spring_58: THREE.Mesh;
    Sphere_1_58: THREE.Mesh;
    Sphere_2_59: THREE.Mesh;
    Sphere_3_59: THREE.Mesh;
    Sphere_58: THREE.Mesh;
    Stem_1_58: THREE.Mesh;
    Bottom_Housing_58: THREE.Mesh;
    Center_Mast_58: THREE.Mesh;
    Cylinder_2_58: THREE.Mesh;
    L1_58: THREE.Mesh;
    L2_58: THREE.Mesh;
    Top_Housing_58: THREE.Mesh;
    ML1_59: THREE.Mesh;
    ML2_59: THREE.Mesh;
    Metal_Spring_59: THREE.Mesh;
    Sphere_1_59: THREE.Mesh;
    Sphere_2_60: THREE.Mesh;
    Sphere_3_60: THREE.Mesh;
    Sphere_59: THREE.Mesh;
    Stem_1_59: THREE.Mesh;
    Bottom_Housing_59: THREE.Mesh;
    Center_Mast_59: THREE.Mesh;
    Cylinder_2_59: THREE.Mesh;
    L1_59: THREE.Mesh;
    L2_59: THREE.Mesh;
    Top_Housing_59: THREE.Mesh;
    ML1_6: THREE.Mesh;
    ML2_6: THREE.Mesh;
    Metal_Spring_6: THREE.Mesh;
    Sphere_1_6: THREE.Mesh;
    Sphere_2_7: THREE.Mesh;
    Sphere_3_7: THREE.Mesh;
    Sphere_6: THREE.Mesh;
    Stem_1_6: THREE.Mesh;
    Bottom_Housing_6: THREE.Mesh;
    Center_Mast_6: THREE.Mesh;
    Cylinder_2_6: THREE.Mesh;
    L1_6: THREE.Mesh;
    L2_6: THREE.Mesh;
    Top_Housing_6: THREE.Mesh;
    ML1_60: THREE.Mesh;
    ML2_60: THREE.Mesh;
    Metal_Spring_60: THREE.Mesh;
    Sphere_1_60: THREE.Mesh;
    Sphere_2_61: THREE.Mesh;
    Sphere_3_61: THREE.Mesh;
    Sphere_60: THREE.Mesh;
    Stem_1_60: THREE.Mesh;
    Bottom_Housing_60: THREE.Mesh;
    Center_Mast_60: THREE.Mesh;
    Cylinder_2_60: THREE.Mesh;
    L1_60: THREE.Mesh;
    L2_60: THREE.Mesh;
    Top_Housing_60: THREE.Mesh;
    ML1_61: THREE.Mesh;
    ML2_61: THREE.Mesh;
    Metal_Spring_61: THREE.Mesh;
    Sphere_1_61: THREE.Mesh;
    Sphere_2_62: THREE.Mesh;
    Sphere_3_62: THREE.Mesh;
    Sphere_61: THREE.Mesh;
    Stem_1_61: THREE.Mesh;
    Bottom_Housing_61: THREE.Mesh;
    Center_Mast_61: THREE.Mesh;
    Cylinder_2_61: THREE.Mesh;
    L1_61: THREE.Mesh;
    L2_61: THREE.Mesh;
    Top_Housing_61: THREE.Mesh;
    ML1_62: THREE.Mesh;
    ML2_62: THREE.Mesh;
    Metal_Spring_62: THREE.Mesh;
    Sphere_1_62: THREE.Mesh;
    Sphere_2_63: THREE.Mesh;
    Sphere_3_63: THREE.Mesh;
    Sphere_62: THREE.Mesh;
    Stem_1_62: THREE.Mesh;
    Bottom_Housing_62: THREE.Mesh;
    Center_Mast_62: THREE.Mesh;
    Cylinder_2_62: THREE.Mesh;
    L1_62: THREE.Mesh;
    L2_62: THREE.Mesh;
    Top_Housing_62: THREE.Mesh;
    ML1_63: THREE.Mesh;
    ML2_63: THREE.Mesh;
    Metal_Spring_63: THREE.Mesh;
    Sphere_1_63: THREE.Mesh;
    Sphere_2_64: THREE.Mesh;
    Sphere_3_64: THREE.Mesh;
    Sphere_63: THREE.Mesh;
    Stem_1_63: THREE.Mesh;
    Bottom_Housing_63: THREE.Mesh;
    Center_Mast_63: THREE.Mesh;
    Cylinder_2_63: THREE.Mesh;
    L1_63: THREE.Mesh;
    L2_63: THREE.Mesh;
    Top_Housing_63: THREE.Mesh;
    ML1_64: THREE.Mesh;
    ML2_64: THREE.Mesh;
    Metal_Spring_64: THREE.Mesh;
    Sphere_1_64: THREE.Mesh;
    Sphere_2_65: THREE.Mesh;
    Sphere_3_65: THREE.Mesh;
    Sphere_64: THREE.Mesh;
    Stem_1_64: THREE.Mesh;
    Bottom_Housing_64: THREE.Mesh;
    Center_Mast_64: THREE.Mesh;
    Cylinder_2_64: THREE.Mesh;
    L1_64: THREE.Mesh;
    L2_64: THREE.Mesh;
    Top_Housing_64: THREE.Mesh;
    ML1_65: THREE.Mesh;
    ML2_65: THREE.Mesh;
    Metal_Spring_65: THREE.Mesh;
    Sphere_1_65: THREE.Mesh;
    Sphere_2_66: THREE.Mesh;
    Sphere_3_66: THREE.Mesh;
    Sphere_65: THREE.Mesh;
    Stem_1_65: THREE.Mesh;
    Bottom_Housing_65: THREE.Mesh;
    Center_Mast_65: THREE.Mesh;
    Cylinder_2_65: THREE.Mesh;
    L1_65: THREE.Mesh;
    L2_65: THREE.Mesh;
    Top_Housing_65: THREE.Mesh;
    ML1_66: THREE.Mesh;
    ML2_66: THREE.Mesh;
    Metal_Spring_66: THREE.Mesh;
    Sphere_1_66: THREE.Mesh;
    Sphere_2_67: THREE.Mesh;
    Sphere_3_67: THREE.Mesh;
    Sphere_66: THREE.Mesh;
    Stem_1_66: THREE.Mesh;
    Bottom_Housing_66: THREE.Mesh;
    Center_Mast_66: THREE.Mesh;
    Cylinder_2_66: THREE.Mesh;
    L1_66: THREE.Mesh;
    L2_66: THREE.Mesh;
    Top_Housing_66: THREE.Mesh;
    ML1_67: THREE.Mesh;
    ML2_67: THREE.Mesh;
    Metal_Spring_67: THREE.Mesh;
    Sphere_1_67: THREE.Mesh;
    Sphere_2_68: THREE.Mesh;
    Sphere_3_68: THREE.Mesh;
    Sphere_67: THREE.Mesh;
    Stem_1_67: THREE.Mesh;
    Bottom_Housing_67: THREE.Mesh;
    Center_Mast_67: THREE.Mesh;
    Cylinder_2_67: THREE.Mesh;
    L1_67: THREE.Mesh;
    L2_67: THREE.Mesh;
    Top_Housing_67: THREE.Mesh;
    ML1_68: THREE.Mesh;
    ML2_68: THREE.Mesh;
    Metal_Spring_68: THREE.Mesh;
    Sphere_1_68: THREE.Mesh;
    Sphere_2_69: THREE.Mesh;
    Sphere_3_69: THREE.Mesh;
    Sphere_68: THREE.Mesh;
    Stem_1_68: THREE.Mesh;
    Bottom_Housing_68: THREE.Mesh;
    Center_Mast_68: THREE.Mesh;
    Cylinder_2_68: THREE.Mesh;
    L1_68: THREE.Mesh;
    L2_68: THREE.Mesh;
    Top_Housing_68: THREE.Mesh;
    ML1_69: THREE.Mesh;
    ML2_69: THREE.Mesh;
    Metal_Spring_69: THREE.Mesh;
    Sphere_1_69: THREE.Mesh;
    Sphere_2_70: THREE.Mesh;
    Sphere_3_70: THREE.Mesh;
    Sphere_69: THREE.Mesh;
    Stem_1_69: THREE.Mesh;
    Bottom_Housing_69: THREE.Mesh;
    Center_Mast_69: THREE.Mesh;
    Cylinder_2_69: THREE.Mesh;
    L1_69: THREE.Mesh;
    L2_69: THREE.Mesh;
    Top_Housing_69: THREE.Mesh;
    ML1_7: THREE.Mesh;
    ML2_7: THREE.Mesh;
    Metal_Spring_7: THREE.Mesh;
    Sphere_1_7: THREE.Mesh;
    Sphere_2_8: THREE.Mesh;
    Sphere_3_8: THREE.Mesh;
    Sphere_7: THREE.Mesh;
    Stem_1_7: THREE.Mesh;
    Bottom_Housing_7: THREE.Mesh;
    Center_Mast_7: THREE.Mesh;
    Cylinder_2_7: THREE.Mesh;
    L1_7: THREE.Mesh;
    L2_7: THREE.Mesh;
    Top_Housing_7: THREE.Mesh;
    ML1_70: THREE.Mesh;
    ML2_70: THREE.Mesh;
    Metal_Spring_70: THREE.Mesh;
    Sphere_1_70: THREE.Mesh;
    Sphere_2_71: THREE.Mesh;
    Sphere_3_71: THREE.Mesh;
    Sphere_70: THREE.Mesh;
    Stem_1_70: THREE.Mesh;
    Bottom_Housing_70: THREE.Mesh;
    Center_Mast_70: THREE.Mesh;
    Cylinder_2_70: THREE.Mesh;
    L1_70: THREE.Mesh;
    L2_70: THREE.Mesh;
    Top_Housing_70: THREE.Mesh;
    ML1_71: THREE.Mesh;
    ML2_71: THREE.Mesh;
    Metal_Spring_71: THREE.Mesh;
    Sphere_1_71: THREE.Mesh;
    Sphere_2_72: THREE.Mesh;
    Sphere_3_72: THREE.Mesh;
    Sphere_71: THREE.Mesh;
    Stem_1_71: THREE.Mesh;
    Bottom_Housing_71: THREE.Mesh;
    Center_Mast_71: THREE.Mesh;
    Cylinder_2_71: THREE.Mesh;
    L1_71: THREE.Mesh;
    L2_71: THREE.Mesh;
    Top_Housing_71: THREE.Mesh;
    ML1_72: THREE.Mesh;
    ML2_72: THREE.Mesh;
    Metal_Spring_72: THREE.Mesh;
    Sphere_1_72: THREE.Mesh;
    Sphere_2_73: THREE.Mesh;
    Sphere_3_73: THREE.Mesh;
    Sphere_72: THREE.Mesh;
    Stem_1_72: THREE.Mesh;
    Bottom_Housing_72: THREE.Mesh;
    Center_Mast_72: THREE.Mesh;
    Cylinder_2_72: THREE.Mesh;
    L1_72: THREE.Mesh;
    L2_72: THREE.Mesh;
    Top_Housing_72: THREE.Mesh;
    ML1_73: THREE.Mesh;
    ML2_73: THREE.Mesh;
    Metal_Spring_73: THREE.Mesh;
    Sphere_1_73: THREE.Mesh;
    Sphere_2_74: THREE.Mesh;
    Sphere_3_74: THREE.Mesh;
    Sphere_73: THREE.Mesh;
    Stem_1_73: THREE.Mesh;
    Bottom_Housing_73: THREE.Mesh;
    Center_Mast_73: THREE.Mesh;
    Cylinder_2_73: THREE.Mesh;
    L1_73: THREE.Mesh;
    L2_73: THREE.Mesh;
    Top_Housing_73: THREE.Mesh;
    ML1_74: THREE.Mesh;
    ML2_74: THREE.Mesh;
    Metal_Spring_74: THREE.Mesh;
    Sphere_1_74: THREE.Mesh;
    Sphere_2_75: THREE.Mesh;
    Sphere_3_75: THREE.Mesh;
    Sphere_74: THREE.Mesh;
    Stem_1_74: THREE.Mesh;
    Bottom_Housing_74: THREE.Mesh;
    Center_Mast_74: THREE.Mesh;
    Cylinder_2_74: THREE.Mesh;
    L1_74: THREE.Mesh;
    L2_74: THREE.Mesh;
    Top_Housing_74: THREE.Mesh;
    ML1_75: THREE.Mesh;
    ML2_75: THREE.Mesh;
    Metal_Spring_75: THREE.Mesh;
    Sphere_1_75: THREE.Mesh;
    Sphere_2_76: THREE.Mesh;
    Sphere_3_76: THREE.Mesh;
    Sphere_75: THREE.Mesh;
    Stem_1_75: THREE.Mesh;
    Bottom_Housing_75: THREE.Mesh;
    Center_Mast_75: THREE.Mesh;
    Cylinder_2_75: THREE.Mesh;
    L1_75: THREE.Mesh;
    L2_75: THREE.Mesh;
    Top_Housing_75: THREE.Mesh;
    ML1_76: THREE.Mesh;
    ML2_76: THREE.Mesh;
    Metal_Spring_76: THREE.Mesh;
    Sphere_1_76: THREE.Mesh;
    Sphere_2_77: THREE.Mesh;
    Sphere_3_77: THREE.Mesh;
    Sphere_76: THREE.Mesh;
    Stem_1_76: THREE.Mesh;
    Bottom_Housing_76: THREE.Mesh;
    Center_Mast_76: THREE.Mesh;
    Cylinder_2_76: THREE.Mesh;
    L1_76: THREE.Mesh;
    L2_76: THREE.Mesh;
    Top_Housing_76: THREE.Mesh;
    ML1_77: THREE.Mesh;
    ML2_77: THREE.Mesh;
    Metal_Spring_77: THREE.Mesh;
    Sphere_1_77: THREE.Mesh;
    Sphere_2_78: THREE.Mesh;
    Sphere_3_78: THREE.Mesh;
    Sphere_77: THREE.Mesh;
    Stem_1_77: THREE.Mesh;
    Bottom_Housing_77: THREE.Mesh;
    Center_Mast_77: THREE.Mesh;
    Cylinder_2_77: THREE.Mesh;
    L1_77: THREE.Mesh;
    L2_77: THREE.Mesh;
    Top_Housing_77: THREE.Mesh;
    ML1_78: THREE.Mesh;
    ML2_78: THREE.Mesh;
    Metal_Spring_78: THREE.Mesh;
    Sphere_1_78: THREE.Mesh;
    Sphere_2_79: THREE.Mesh;
    Sphere_3_79: THREE.Mesh;
    Sphere_78: THREE.Mesh;
    Stem_1_78: THREE.Mesh;
    Bottom_Housing_78: THREE.Mesh;
    Center_Mast_78: THREE.Mesh;
    Cylinder_2_78: THREE.Mesh;
    L1_78: THREE.Mesh;
    L2_78: THREE.Mesh;
    Top_Housing_78: THREE.Mesh;
    ML1_79: THREE.Mesh;
    ML2_79: THREE.Mesh;
    Metal_Spring_79: THREE.Mesh;
    Sphere_1_79: THREE.Mesh;
    Sphere_2_80: THREE.Mesh;
    Sphere_3_80: THREE.Mesh;
    Sphere_79: THREE.Mesh;
    Stem_1_79: THREE.Mesh;
    Bottom_Housing_79: THREE.Mesh;
    Center_Mast_79: THREE.Mesh;
    Cylinder_2_79: THREE.Mesh;
    L1_79: THREE.Mesh;
    L2_79: THREE.Mesh;
    Top_Housing_79: THREE.Mesh;
    ML1_8: THREE.Mesh;
    ML2_8: THREE.Mesh;
    Metal_Spring_8: THREE.Mesh;
    Sphere_1_8: THREE.Mesh;
    Sphere_2_9: THREE.Mesh;
    Sphere_3_9: THREE.Mesh;
    Sphere_8: THREE.Mesh;
    Stem_1_8: THREE.Mesh;
    Bottom_Housing_8: THREE.Mesh;
    Center_Mast_8: THREE.Mesh;
    Cylinder_2_8: THREE.Mesh;
    L1_8: THREE.Mesh;
    L2_8: THREE.Mesh;
    Top_Housing_8: THREE.Mesh;
    ML1_80: THREE.Mesh;
    ML2_80: THREE.Mesh;
    Metal_Spring_80: THREE.Mesh;
    Sphere_1_80: THREE.Mesh;
    Sphere_2_81: THREE.Mesh;
    Sphere_3_81: THREE.Mesh;
    Sphere_80: THREE.Mesh;
    Stem_1_80: THREE.Mesh;
    Bottom_Housing_80: THREE.Mesh;
    Center_Mast_80: THREE.Mesh;
    Cylinder_2_80: THREE.Mesh;
    L1_80: THREE.Mesh;
    L2_80: THREE.Mesh;
    Top_Housing_80: THREE.Mesh;
    ML1_81: THREE.Mesh;
    ML2_81: THREE.Mesh;
    Metal_Spring_81: THREE.Mesh;
    Sphere_1_81: THREE.Mesh;
    Sphere_2_82: THREE.Mesh;
    Sphere_3_82: THREE.Mesh;
    Sphere_81: THREE.Mesh;
    Stem_1_81: THREE.Mesh;
    Bottom_Housing_81: THREE.Mesh;
    Center_Mast_81: THREE.Mesh;
    Cylinder_2_81: THREE.Mesh;
    L1_81: THREE.Mesh;
    L2_81: THREE.Mesh;
    Top_Housing_81: THREE.Mesh;
    ML1_82: THREE.Mesh;
    ML2_82: THREE.Mesh;
    Metal_Spring_82: THREE.Mesh;
    Sphere_1_82: THREE.Mesh;
    Sphere_2_83: THREE.Mesh;
    Sphere_3_83: THREE.Mesh;
    Sphere_82: THREE.Mesh;
    Stem_1_82: THREE.Mesh;
    Bottom_Housing_82: THREE.Mesh;
    Center_Mast_82: THREE.Mesh;
    Cylinder_2_82: THREE.Mesh;
    L1_82: THREE.Mesh;
    L2_82: THREE.Mesh;
    Top_Housing_82: THREE.Mesh;
    ML1_83: THREE.Mesh;
    ML2_83: THREE.Mesh;
    Metal_Spring_83: THREE.Mesh;
    Sphere_1_83: THREE.Mesh;
    Sphere_2_84: THREE.Mesh;
    Sphere_3_84: THREE.Mesh;
    Sphere_83: THREE.Mesh;
    Stem_1_83: THREE.Mesh;
    Bottom_Housing_83: THREE.Mesh;
    Center_Mast_83: THREE.Mesh;
    Cylinder_2_83: THREE.Mesh;
    L1_83: THREE.Mesh;
    L2_83: THREE.Mesh;
    Top_Housing_83: THREE.Mesh;
    ML1_84: THREE.Mesh;
    ML2_84: THREE.Mesh;
    Metal_Spring_84: THREE.Mesh;
    Sphere_1_84: THREE.Mesh;
    Sphere_2_85: THREE.Mesh;
    Sphere_3_85: THREE.Mesh;
    Sphere_84: THREE.Mesh;
    Stem_1_84: THREE.Mesh;
    Bottom_Housing_84: THREE.Mesh;
    Center_Mast_84: THREE.Mesh;
    Cylinder_2_84: THREE.Mesh;
    L1_84: THREE.Mesh;
    L2_84: THREE.Mesh;
    Top_Housing_84: THREE.Mesh;
    ML1_85: THREE.Mesh;
    ML2_85: THREE.Mesh;
    Metal_Spring_85: THREE.Mesh;
    Sphere_1_85: THREE.Mesh;
    Sphere_2_86: THREE.Mesh;
    Sphere_3_86: THREE.Mesh;
    Sphere_85: THREE.Mesh;
    Stem_1_85: THREE.Mesh;
    Bottom_Housing_85: THREE.Mesh;
    Center_Mast_85: THREE.Mesh;
    Cylinder_2_85: THREE.Mesh;
    L1_85: THREE.Mesh;
    L2_85: THREE.Mesh;
    Top_Housing_85: THREE.Mesh;
    ML1_9: THREE.Mesh;
    ML2_9: THREE.Mesh;
    Metal_Spring_9: THREE.Mesh;
    Sphere_1_9: THREE.Mesh;
    Sphere_2_10: THREE.Mesh;
    Sphere_3_10: THREE.Mesh;
    Sphere_9: THREE.Mesh;
    Stem_1_9: THREE.Mesh;
    Bottom_Housing_9: THREE.Mesh;
    Center_Mast_9: THREE.Mesh;
    Cylinder_2_9: THREE.Mesh;
    L1_9: THREE.Mesh;
    L2_9: THREE.Mesh;
    Top_Housing_9: THREE.Mesh;
    Extrude_1: THREE.Mesh;
    Extrude_10: THREE.Mesh;
    Extrude_100: THREE.Mesh;
    Extrude_101: THREE.Mesh;
    Extrude_102: THREE.Mesh;
    Extrude_103: THREE.Mesh;
    Extrude_104: THREE.Mesh;
    Extrude_105: THREE.Mesh;
    Extrude_106: THREE.Mesh;
    Extrude_11: THREE.Mesh;
    Extrude_12: THREE.Mesh;
    Extrude_13: THREE.Mesh;
    Extrude_14: THREE.Mesh;
    Extrude_15: THREE.Mesh;
    Extrude_16: THREE.Mesh;
    Extrude_17: THREE.Mesh;
    Extrude_18: THREE.Mesh;
    Extrude_19: THREE.Mesh;
    Extrude_2: THREE.Mesh;
    Extrude_20: THREE.Mesh;
    Extrude_21: THREE.Mesh;
    Extrude_22: THREE.Mesh;
    Extrude_23: THREE.Mesh;
    Extrude_24: THREE.Mesh;
    Extrude_25: THREE.Mesh;
    Extrude_26: THREE.Mesh;
    Extrude_27: THREE.Mesh;
    Extrude_28: THREE.Mesh;
    Extrude_29: THREE.Mesh;
    Extrude_3: THREE.Mesh;
    Extrude_30: THREE.Mesh;
    Extrude_31: THREE.Mesh;
    Extrude_32: THREE.Mesh;
    Extrude_33: THREE.Mesh;
    Extrude_34: THREE.Mesh;
    Extrude_35: THREE.Mesh;
    Extrude_36: THREE.Mesh;
    Extrude_37: THREE.Mesh;
    Extrude_38: THREE.Mesh;
    Extrude_39: THREE.Mesh;
    Extrude_4: THREE.Mesh;
    Extrude_40: THREE.Mesh;
    Extrude_41: THREE.Mesh;
    Extrude_42: THREE.Mesh;
    Extrude_43: THREE.Mesh;
    Extrude_44: THREE.Mesh;
    Extrude_45: THREE.Mesh;
    Extrude_46: THREE.Mesh;
    Extrude_47: THREE.Mesh;
    Extrude_48: THREE.Mesh;
    Extrude_49: THREE.Mesh;
    Extrude_5: THREE.Mesh;
    Extrude_50: THREE.Mesh;
    Extrude_51: THREE.Mesh;
    Extrude_52: THREE.Mesh;
    Extrude_53: THREE.Mesh;
    Extrude_54: THREE.Mesh;
    Extrude_55: THREE.Mesh;
    Extrude_56: THREE.Mesh;
    Extrude_57: THREE.Mesh;
    Extrude_58: THREE.Mesh;
    Extrude_59: THREE.Mesh;
    Extrude_6: THREE.Mesh;
    Extrude_60: THREE.Mesh;
    Extrude_61: THREE.Mesh;
    Extrude_62: THREE.Mesh;
    Extrude_63: THREE.Mesh;
    Extrude_64: THREE.Mesh;
    Extrude_65: THREE.Mesh;
    Extrude_66: THREE.Mesh;
    Extrude_67: THREE.Mesh;
    Extrude_68: THREE.Mesh;
    Extrude_69: THREE.Mesh;
    Extrude_7: THREE.Mesh;
    Extrude_70: THREE.Mesh;
    Extrude_71: THREE.Mesh;
    Extrude_72: THREE.Mesh;
    Extrude_73: THREE.Mesh;
    Extrude_74: THREE.Mesh;
    Extrude_75: THREE.Mesh;
    Extrude_76: THREE.Mesh;
    Extrude_77: THREE.Mesh;
    Extrude_78: THREE.Mesh;
    Extrude_79: THREE.Mesh;
    Extrude_8: THREE.Mesh;
    Extrude_80: THREE.Mesh;
    Extrude_81: THREE.Mesh;
    Extrude_82: THREE.Mesh;
    Extrude_83: THREE.Mesh;
    Extrude_84: THREE.Mesh;
    Extrude_85: THREE.Mesh;
    Extrude_86: THREE.Mesh;
    Extrude_87: THREE.Mesh;
    Extrude_88: THREE.Mesh;
    Extrude_89: THREE.Mesh;
    Extrude_9: THREE.Mesh;
    Extrude_90: THREE.Mesh;
    Extrude_91: THREE.Mesh;
    Extrude_92: THREE.Mesh;
    Extrude_93: THREE.Mesh;
    Extrude_94: THREE.Mesh;
    Extrude_95: THREE.Mesh;
    Extrude_96: THREE.Mesh;
    Extrude_97: THREE.Mesh;
    Extrude_98: THREE.Mesh;
    Extrude_99: THREE.Mesh;
    Fill004: THREE.Mesh;
    Fill_2: THREE.Mesh;
  };
  materials: {
    ["Keycaps 1"]: THREE.MeshStandardMaterial;
    ["Keycaps 2"]: THREE.MeshStandardMaterial;
    Symbols: THREE.MeshStandardMaterial;
    ["Black plastic.001"]: THREE.MeshStandardMaterial;
    ["stabilizers Metal.001"]: THREE.MeshStandardMaterial;
    ["B Keys.001"]: THREE.MeshStandardMaterial;
    ["Main Frame"]: THREE.MeshStandardMaterial;
    dark: THREE.MeshStandardMaterial;
    ["Legs.001"]: THREE.MeshStandardMaterial;
    ["rubber.001"]: THREE.MeshStandardMaterial;
    chrome: THREE.MeshStandardMaterial;
    ["Plate.001"]: THREE.MeshStandardMaterial;
    ["bronze.001"]: THREE.MeshStandardMaterial;
    ["Bottom Housing.001"]: THREE.MeshStandardMaterial;
    ["Stem.001"]: THREE.MeshStandardMaterial;
    ["Top Housing.001"]: THREE.MeshStandardMaterial;
  };
};

export const Keyboard = forwardRef<KeyboardRef, JSX.IntrinsicElements["group"]>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/uploads-files-4500971-Arcade_Mechanical_Keyboard_v2.gltf",
    ) as unknown as GLTFResult;

    // Main container ref
    const mainGroupRef = useRef<THREE.Group>(null);

    // Main structure refs
    const keyboardStructureRef = useRef<THREE.Group>(null);
    const plateRef = useRef<THREE.Mesh>(null);
    const frameRef = useRef<THREE.Group>(null);

    // Switch group refs - one for each row
    const switchRow1Ref = useRef<THREE.Group>(null);
    const switchRow2Ref = useRef<THREE.Group>(null);
    const switchRow3Ref = useRef<THREE.Group>(null);
    const switchRow4Ref = useRef<THREE.Group>(null);
    const switchRow5Ref = useRef<THREE.Group>(null);

    // Keycap group refs - one for each row
    const keycapRow1Ref = useRef<THREE.Group>(null);
    const keycapRow2Ref = useRef<THREE.Group>(null);
    const keycapRow3Ref = useRef<THREE.Group>(null);
    const keycapRow4Ref = useRef<THREE.Group>(null);
    const keycapRow5Ref = useRef<THREE.Group>(null);

    // Extrude group ref - symbols/legends on top of keycaps
    const extrudeGroupRef = useRef<THREE.Group>(null);

    // Individual key refs - for precise animation control
    // Create the mapping inside a single useRef so the refs are created once
    // and the object identity remains stable across renders. This prevents
    // ESLint/react-hooks from warning about refs being (re)created or accessed
    // during render.
    const keyRefs = useRef<Record<string, React.RefObject<THREE.Mesh | null>>>(
      {
        // Function row
        esc: React.createRef<THREE.Mesh>(),
        f1: React.createRef<THREE.Mesh>(),
        f2: React.createRef<THREE.Mesh>(),
        f3: React.createRef<THREE.Mesh>(),
        f4: React.createRef<THREE.Mesh>(),
        f5: React.createRef<THREE.Mesh>(),
        f6: React.createRef<THREE.Mesh>(),
        f7: React.createRef<THREE.Mesh>(),
        f8: React.createRef<THREE.Mesh>(),
        f9: React.createRef<THREE.Mesh>(),
        f10: React.createRef<THREE.Mesh>(),
        f11: React.createRef<THREE.Mesh>(),
        f12: React.createRef<THREE.Mesh>(),
        del: React.createRef<THREE.Mesh>(),
        // Number row
        grave: React.createRef<THREE.Mesh>(),
        one: React.createRef<THREE.Mesh>(),
        two: React.createRef<THREE.Mesh>(),
        three: React.createRef<THREE.Mesh>(),
        four: React.createRef<THREE.Mesh>(),
        five: React.createRef<THREE.Mesh>(),
        six: React.createRef<THREE.Mesh>(),
        seven: React.createRef<THREE.Mesh>(),
        eight: React.createRef<THREE.Mesh>(),
        nine: React.createRef<THREE.Mesh>(),
        zero: React.createRef<THREE.Mesh>(),
        dash: React.createRef<THREE.Mesh>(),
        equal: React.createRef<THREE.Mesh>(),
        backspace: React.createRef<THREE.Mesh>(),
        // Top letter row
        tab: React.createRef<THREE.Mesh>(),
        q: React.createRef<THREE.Mesh>(),
        w: React.createRef<THREE.Mesh>(),
        e: React.createRef<THREE.Mesh>(),
        r: React.createRef<THREE.Mesh>(),
        t: React.createRef<THREE.Mesh>(),
        y: React.createRef<THREE.Mesh>(),
        u: React.createRef<THREE.Mesh>(),
        i: React.createRef<THREE.Mesh>(),
        o: React.createRef<THREE.Mesh>(),
        p: React.createRef<THREE.Mesh>(),
        lsquarebracket: React.createRef<THREE.Mesh>(),
        rsquarebracket: React.createRef<THREE.Mesh>(),
        backslash: React.createRef<THREE.Mesh>(),
        // Home row
        caps: React.createRef<THREE.Mesh>(),
        a: React.createRef<THREE.Mesh>(),
        s: React.createRef<THREE.Mesh>(),
        d: React.createRef<THREE.Mesh>(),
        f: React.createRef<THREE.Mesh>(),
        g: React.createRef<THREE.Mesh>(),
        h: React.createRef<THREE.Mesh>(),
        j: React.createRef<THREE.Mesh>(),
        k: React.createRef<THREE.Mesh>(),
        l: React.createRef<THREE.Mesh>(),
        semicolon: React.createRef<THREE.Mesh>(),
        quote: React.createRef<THREE.Mesh>(),
        enter: React.createRef<THREE.Mesh>(),
        pageup: React.createRef<THREE.Mesh>(),
        // Bottom row
        lshift: React.createRef<THREE.Mesh>(),
        z: React.createRef<THREE.Mesh>(),
        x: React.createRef<THREE.Mesh>(),
        c: React.createRef<THREE.Mesh>(),
        v: React.createRef<THREE.Mesh>(),
        b: React.createRef<THREE.Mesh>(),
        n: React.createRef<THREE.Mesh>(),
        m: React.createRef<THREE.Mesh>(),
        comma: React.createRef<THREE.Mesh>(),
        period: React.createRef<THREE.Mesh>(),
        slash: React.createRef<THREE.Mesh>(),
        rshift: React.createRef<THREE.Mesh>(),
        arrowup: React.createRef<THREE.Mesh>(),
        pagedown: React.createRef<THREE.Mesh>(),
        // Modifier row
        lcontrol: React.createRef<THREE.Mesh>(),
        lwin: React.createRef<THREE.Mesh>(),
        lalt: React.createRef<THREE.Mesh>(),
        space: React.createRef<THREE.Mesh>(),
        ralt: React.createRef<THREE.Mesh>(),
        fn: React.createRef<THREE.Mesh>(),
        arrowleft: React.createRef<THREE.Mesh>(),
        arrowdown: React.createRef<THREE.Mesh>(),
        arrowright: React.createRef<THREE.Mesh>(),
        end: React.createRef<THREE.Mesh>(),
      }
    );

    // Expose refs to parent component through imperative handle
    useImperativeHandle(ref, () => ({
      mainGroup: mainGroupRef,
      keyboardStructure: keyboardStructureRef,
      plate: plateRef,
      frame: frameRef,
      switches: {
        row1: switchRow1Ref,
        row2: switchRow2Ref,
        row3: switchRow3Ref,
        row4: switchRow4Ref,
        row5: switchRow5Ref,
      },
      keycaps: {
        row1: keycapRow1Ref,
        row2: keycapRow2Ref,
        row3: keycapRow3Ref,
        row4: keycapRow4Ref,
        row5: keycapRow5Ref,
      },
      keys: keyRefs,
      switchComponents: {}, // Empty for now - can be populated later for advanced animations
      extrudeGroup: extrudeGroupRef,
    }));

    return (
      <group {...props} dispose={null} ref={mainGroupRef}>
        <group
          position={[-0.133, 0.021, -0.039]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          ref={keyboardStructureRef}
        >
          <group position={[-0.101, 0.042, -0.004]}>
            <group position={[0.061, -0.03, 0]}>
              {/* Row 1 - Top row with function keys area */}
              <group position={[0.008, -0.052, 0]} ref={keycapRow1Ref}>
                <group position={[-0.092, 0, 0]}>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f1}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_3.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.145, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      visible={false}
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_3.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.145, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f2}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_4.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.126, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_4.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.126, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.056, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f3}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_5.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.108, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_5.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.108, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.esc}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_2.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.163, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_2.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.163, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.008, 0, 0]}>
                  <group position={[0.018, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f4}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_7.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.061, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_7.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.061, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f5}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_8.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.043, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_8.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.043, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.055, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f6}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_9.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.024, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_9.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.024, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_6.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.08, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_6.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.08, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[0.076, 0, 0]}>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f9}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_11.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.023, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_11.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.023, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f10}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_12.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.041, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_12.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.041, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.056, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f11}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_13.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.06, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_13.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.06, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.f7}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_10.geometry}
                    material={materials["Keycaps 1"]}
                    position={[-0.004, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_10.geometry}
                    material={materials["Keycaps 1"]}
                    position={[-0.004, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[0.153, 0, 0]}>
                  <group position={[0.018, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f12}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_15.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_15.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.del}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_16.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_16.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.093, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.f8}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_14.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_14.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.129, 0, 0]}>
                  <group
                    position={[0.201, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh2884.geometry}
                      material={materials["Keycaps 2"]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh2884_1.geometry}
                      material={materials.Symbols}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh2884_2.geometry}
                      material={materials["Keycaps 1"]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.201, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.201, -0.093, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
              </group>
              {/* Row 2 - Number row */}
              <group position={[0.008, -0.029, 0]} ref={keycapRow2Ref}>
                <group position={[0.119, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.backspace}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_18.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.048, -0.116, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_18.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.048, -0.116, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <group
                    position={[0.003, 0.001, 0.001]}
                    rotation={[0, 0, Math.PI / 2]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st1.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.117, 0.051, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st2.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.117, 0.051, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <group position={[0.003, -0.005, 0.012]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_2.geometry}
                      material={materials["Black plastic.001"]}
                      position={[-0.051, -0.111, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_3.geometry}
                      material={materials["Black plastic.001"]}
                      position={[-0.051, -0.111, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.stabilizers_m.geometry}
                      material={materials["stabilizers Metal.001"]}
                      position={[-0.051, -0.111, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
                <group position={[0.153, 0, 0]}>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.equal}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_33.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_33.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.pageup}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_34.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_34.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.dash}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_32.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.116, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_32.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.116, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.129, 0, 0]}>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.one}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_21.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.163, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_21.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.163, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.112, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.five}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_25.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.089, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_25.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.089, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.186, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.nine}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_29.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.014, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_29.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.014, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.grave}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_20.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.182, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_20.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.182, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.056, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.two}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_22.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.145, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_22.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.145, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.074, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.three}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_23.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.126, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_23.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.126, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.093, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.four}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_24.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.107, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_24.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.107, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.13, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.six}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_26.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.07, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_26.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.07, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.149, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.seven}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_27.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.052, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_27.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.052, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.168, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.eight}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_28.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.033, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_28.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.033, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.205, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.zero}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_30.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.004, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_30.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.004, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.223, 0, 0]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_31.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.023, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_31.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.023, -0.116, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_19.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.201, -0.116, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_19.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.201, -0.116, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
              </group>
              {/* Row 3 - Top letter row (QWERTY) */}
              <group position={[0.008, -0.01, 0]} ref={keycapRow3Ref}>
                <group position={[0.122, 0, 0]}>
                  <group position={[0.004, 0, 0.001]}>
                    <mesh
                      ref={keyRefs.current.tab}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_36.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.055, -0.135, 0.025]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_36.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.055, -0.135, 0.025]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
                <group position={[0.153, 0, 0]}>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.lsquarebracket}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_50.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_50.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.rsquarebracket}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_51.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_51.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.p}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_49.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.135, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_49.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.135, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.101, 0, 0]}>
                  <group position={[0.186, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.i}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_47.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.013, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_47.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.013, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.205, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.o}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_48.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.032, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_48.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.032, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.q}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_39.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.136, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_39.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.136, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.13, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.t}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_44.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.043, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_44.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.043, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                    <group position={[0.149, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.y}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_45.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.024, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_45.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.024, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                    <group position={[0.168, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.u}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_46.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.005, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_46.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.005, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.056, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.w}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_40.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.117, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_40.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.117, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.074, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.e}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_41.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.099, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_41.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.099, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.112, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.r}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_43.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.061, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_43.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.061, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_38.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.154, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_38.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.154, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.093, 0, 0]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_42.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.08, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_42.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.08, -0.135, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_37.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.173, -0.135, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_37.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.173, -0.135, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.129, 0, 0]}>
                  <group position={[0.004, 0, 0.001]}>
                    <mesh
                      ref={keyRefs.current.backslash}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_35.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.196, -0.135, 0.025]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_35.geometry}
                      material={materials["Keycaps 2"]}
                      position={[0.196, -0.135, 0.025]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
              </group>
              {/* Row 4 - Home row (ASDF) */}
              <group position={[0.008, 0.01, 0]} ref={keycapRow4Ref}>
                <group position={[-0.119, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.caps}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_52.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.19, -0.155, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_52.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.19, -0.155, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.097, 0, 0]}>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.a}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_56.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.131, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_56.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.131, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.056, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.f}
                      castShadow
                      receiveShadow
                      geometry={nodes.f_mark.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.112, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_57.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.112, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_57.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.112, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.075, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.g}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_58.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.094, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_58.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.094, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.093, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.h}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_59.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.075, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_59.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.075, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.112, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.j}
                      castShadow
                      receiveShadow
                      geometry={nodes.j_mark.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.056, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_60.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.056, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_60.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.056, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.131, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.k}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_61.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.038, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_61.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.038, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.149, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.l}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_62.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.019, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_62.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.019, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.187, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.quote}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_64.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.018, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_64.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.018, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.168, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.semicolon}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_63.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_63.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.s}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_55.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.15, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_55.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.15, -0.155, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.d}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_54.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.168, -0.155, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_54.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.168, -0.155, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[0.12, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.enter}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_53.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.048, -0.155, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_53.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.048, -0.155, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <group
                    position={[0.001, 0.002, 0.001]}
                    rotation={[0, 0, Math.PI / 2]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st1_2.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.156, 0.049, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st2_2.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.156, 0.049, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <group position={[0.001, -0.005, 0.012]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_4.geometry}
                      material={materials["Black plastic.001"]}
                      position={[-0.049, -0.15, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_5.geometry}
                      material={materials["Black plastic.001"]}
                      position={[-0.049, -0.15, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.stabilizers_m_2.geometry}
                      material={materials["stabilizers Metal.001"]}
                      position={[-0.049, -0.15, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
              </group>
              {/* Row 5 - Bottom row (ZXCV) */}
              <group position={[0.008, 0.03, 0]} ref={keycapRow5Ref}>
                <group position={[-0.088, 0, 0]}>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.z}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_68.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.141, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_68.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.141, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.x}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_69.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.122, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_69.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.122, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.056, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.c}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_70.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.103, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_70.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.103, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.075, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.v}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_71.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.084, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_71.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.084, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.093, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.b}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_72.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.066, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_72.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.066, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.112, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.n}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_73.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.047, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_73.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.047, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.131, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.m}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_74.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.028, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_74.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.028, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.15, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.comma}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_75.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.01, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_75.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.01, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.168, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.period}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_76.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.009, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_76.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.009, -0.175, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.slash}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_67.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.159, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_67.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.159, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.118, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.lshift}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_65.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.19, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_65.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.19, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <group
                    position={[0.001, 0, 0.001]}
                    rotation={[0, 0, Math.PI / 2]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st1_3.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.175, -0.189, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st2_3.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.175, -0.189, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <group position={[0.001, -0.002, 0.012]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_6.geometry}
                      material={materials["Black plastic.001"]}
                      position={[0.189, -0.173, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_7.geometry}
                      material={materials["Black plastic.001"]}
                      position={[0.189, -0.173, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.stabilizers_m_3.geometry}
                      material={materials["stabilizers Metal.001"]}
                      position={[0.189, -0.173, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
                <group position={[0.172, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.arrowup}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_77.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.101, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_77.geometry}
                    material={materials["Keycaps 1"]}
                    position={[-0.101, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[0.11, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.rshift}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_66.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.039, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_66.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.039, -0.175, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <group
                    position={[0.005, 0, 0.001]}
                    rotation={[0, 0, Math.PI / 2]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st1_4.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.175, 0.044, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st2_4.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.175, 0.044, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <group position={[0.002, -0.001, 0.012]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_8.geometry}
                      material={materials["Black plastic.001"]}
                      position={[-0.041, -0.173, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_9.geometry}
                      material={materials["Black plastic.001"]}
                      position={[-0.041, -0.173, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.stabilizers_m_4.geometry}
                      material={materials["stabilizers Metal.001"]}
                      position={[-0.041, -0.173, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
              </group>
              <group position={[-0.04, 0.05, 0]}>
                <group position={[0.105, 0, 0]}>
                  <group position={[0.07, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.pagedown}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_85.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.056, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_85.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.056, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.023, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.arrowleft}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_83.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.009, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_83.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.009, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.047, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.arrowright}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_84.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.032, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_84.geometry}
                      material={materials["Keycaps 1"]}
                      position={[-0.032, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.arrowdown}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_82.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.014, -0.195, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_82.geometry}
                    material={materials["Keycaps 1"]}
                    position={[0.014, -0.195, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[0.201, 0, 0]}>
                  <group position={[0.037, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.ralt}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_88.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_88.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.119, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.019, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.fn}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_87.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_87.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.1, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <mesh
                    ref={keyRefs.current.end}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_86.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.195, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_86.geometry}
                    material={materials["Keycaps 2"]}
                    position={[-0.082, -0.195, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                </group>
                <group position={[-0.081, 0, 0]}>
                  <group position={[0.046, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.lcontrol}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_81.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.155, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_81.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.155, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.023, 0, 0]}>
                    <mesh
                      ref={keyRefs.current.lwin}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_80.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.178, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_80.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.178, -0.195, 0.026]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                  <group position={[0.002, 0, 0.002]}>
                    <mesh
                      ref={keyRefs.current.lalt}
                      castShadow
                      receiveShadow
                      geometry={nodes.Boole_2_79.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.199, -0.195, 0.023]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.R4_UV_1_79.geometry}
                      material={materials["Keycaps 1"]}
                      position={[0.199, -0.195, 0.023]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
                <group position={[0.035, 0, 0]}>
                  <mesh
                    ref={keyRefs.current.space}
                    castShadow
                    receiveShadow
                    geometry={nodes.Boole_2_78.geometry}
                    material={materials["Keycaps 2"]}
                    position={[0.084, -0.194, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.R4_UV_1_78.geometry}
                    material={materials["B Keys.001"]}
                    position={[0.084, -0.194, 0.026]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  />
                  <group
                    position={[0.001, 0.001, 0.001]}
                    rotation={[0, 0, Math.PI / 2]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st1_5.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.195, -0.083, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.st2_5.geometry}
                      material={materials["Keycaps 2"]}
                      position={[-0.195, -0.083, 0.025]}
                      rotation={[Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <group position={[-0.002, -0.002, 0.012]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_10.geometry}
                      material={materials["Black plastic.001"]}
                      position={[0.086, -0.193, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.Polygon_2_11.geometry}
                      material={materials["Black plastic.001"]}
                      position={[0.086, -0.193, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.stabilizers_m_5.geometry}
                      material={materials["stabilizers Metal.001"]}
                      position={[0.086, -0.193, 0.014]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
          <group
            position={[0.039, -0.133, 0.021]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Curve018.geometry}
              material={materials.Symbols}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Curve018_1.geometry}
              material={materials["Keycaps 1"]}
            />
          </group>
          <group position={[-0.102, 0.043, -0.008]} ref={frameRef}>
            <group
              position={[0.141, -0.175, 0.029]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh3086.geometry}
                material={materials["Main Frame"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh3086_1.geometry}
                material={materials.dark}
              />
            </group>
          </group>
          <group
            position={[-0.076, -0.077, 0.014]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <group position={[0.012, 0.028, -0.009]} rotation={[0, -1.571, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mode_Switch.geometry}
                material={materials["Keycaps 2"]}
                position={[0.016, -0.143, 0.068]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Wired_logo.geometry}
                material={materials["Keycaps 2"]}
                position={[0.016, -0.143, 0.068]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Wireless_logo.geometry}
                material={materials["Keycaps 2"]}
                position={[0.016, -0.143, 0.068]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
              />
            </group>
            <group
              position={[-0.024, -0.081, 0.014]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <group
                position={[0.001, -0.056, -0.008]}
                rotation={[-Math.PI, 0, -Math.PI / 2]}
              >
                <group position={[-0.004, 0.146, 0]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.l1002.geometry}
                    material={materials["Legs.001"]}
                    position={[0.091, -0.181, -0.002]}
                    rotation={[Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.l2002.geometry}
                    material={materials["Legs.001"]}
                    position={[0.091, -0.181, -0.002]}
                    rotation={[Math.PI / 2, 0, 0]}
                  />
                </group>
                <group position={[-0.003, -0.133, 0]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.l1_2.geometry}
                    material={materials["Legs.001"]}
                    position={[0.09, 0.098, -0.002]}
                    rotation={[Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.l2_2.geometry}
                    material={materials["Legs.001"]}
                    position={[0.09, 0.098, -0.002]}
                    rotation={[Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <group
                position={[0.001, -0.07, -0.008]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_1_2.geometry}
                  material={materials["rubber.001"]}
                  position={[0.102, 0.034, 0.002]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_2_86.geometry}
                  material={materials["rubber.001"]}
                  position={[0.102, 0.034, 0.002]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_2_87.geometry}
                  material={materials["rubber.001"]}
                  position={[0.102, 0.034, 0.002]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_3.geometry}
                  material={materials["rubber.001"]}
                  position={[0.102, 0.034, 0.002]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.type_c_f.geometry}
                material={materials.chrome}
                position={[-0.034, 0.032, -0.006]}
                rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
              />
            </group>
          </group>
          <mesh
            ref={plateRef}
            castShadow
            receiveShadow
            geometry={nodes.plate001.geometry}
            material={materials["Plate.001"]}
            position={[0.039, -0.133, 0.021]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          />
          <group
            position={[-0.01, 0.008, 0.006]}
            rotation={[0, 0, -Math.PI / 2]}
            ref={switchRow1Ref}
          >
            <group position={[0.048, -0.151, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1087.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.2, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2087.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.2, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.201, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere348.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.201, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1087.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.201, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2087.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.201, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.054, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_10.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.004, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_10.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.004, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_10.geometry}
                material={materials["bronze.001"]}
                position={[0.093, -0.004, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_10.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_10.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_11.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_11.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_10.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, 0.004, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_10.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_10.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_10.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_10.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.004, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_10.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.004, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_10.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.072, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_11.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.023, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_11.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.023, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_11.geometry}
                material={materials["bronze.001"]}
                position={[0.093, -0.023, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_11.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_11.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_12.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_12.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_11.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, 0.023, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_11.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_11.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_11.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_11.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.023, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_11.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.023, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_11.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.091, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_12.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.041, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_12.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.041, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_12.geometry}
                material={materials["bronze.001"]}
                position={[0.093, -0.041, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_12.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.041, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_12.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.041, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_13.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.041, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_13.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.041, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_12.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, 0.041, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_12.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.041, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_12.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.041, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_12.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.041, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_12.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.041, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_12.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.041, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_12.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, -0.041, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.109, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_13.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.06, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_13.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.06, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_13.geometry}
                material={materials["bronze.001"]}
                position={[0.093, -0.06, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_13.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.06, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_13.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.06, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_14.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.06, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_14.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.06, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_13.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, 0.06, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_13.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.06, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_13.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.06, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_13.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.06, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_13.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.06, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_13.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.06, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_13.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, -0.06, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.131, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_14.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_14.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_14.geometry}
                material={materials["bronze.001"]}
                position={[0.093, -0.082, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_14.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_14.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_15.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_15.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_14.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, 0.082, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_14.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_14.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_14.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_14.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_14.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_14.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.025, 0.1, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_15.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.051, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_15.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.051, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_15.geometry}
                material={materials["bronze.001"]}
                position={[0.116, -0.051, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_15.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.116, -0.051, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_15.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.116, -0.051, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_16.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.116, -0.051, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_16.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.116, -0.051, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_15.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, 0.051, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_15.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.116, -0.051, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_15.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.116, -0.051, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_15.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.116, -0.051, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_15.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.051, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_15.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.051, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_15.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.116, -0.051, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.151, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_16.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.2, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_16.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.2, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_16.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.201, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_16.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_16.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_17.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_17.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.2, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_16.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.201, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_16.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_16.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_16.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_16.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.201, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_16.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.201, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_16.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.201, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.132, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_17.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.182, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_17.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.182, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_17.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.182, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_17.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.182, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_17.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.182, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_18.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.182, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_18.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.182, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_17.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.182, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_17.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.182, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_17.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.182, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_17.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.182, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_17.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.182, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_17.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.182, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_17.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.182, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.114, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_18.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.163, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_18.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.163, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_18.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.163, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_18.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_18.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_19.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_19.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_18.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.163, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_18.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_18.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_18.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_18.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.163, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_18.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.163, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_18.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.095, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_19.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.145, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_19.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.145, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_19.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.145, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_19.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_19.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_20.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_20.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_19.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.145, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_19.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_19.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_19.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_19.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.145, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_19.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.145, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_19.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, -0.114, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_2.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.163, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_2.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.163, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_2.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.163, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_2.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_2.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_3.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_2.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.163, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_2.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.163, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_2.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_2.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_2.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_2.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.163, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_2.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.163, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_2.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.163, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.076, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_20.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.126, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_20.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.126, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_20.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.126, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_20.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_20.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_21.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_21.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_20.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.126, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_20.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_20.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_20.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_20.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.126, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_20.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.126, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_20.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.058, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_21.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.107, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_21.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.107, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_21.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.107, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_21.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.107, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_21.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.107, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_22.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.107, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_22.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.107, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_21.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.107, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_21.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.107, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_21.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.107, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_21.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.107, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_21.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.107, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_21.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.107, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_21.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.107, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.039, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_22.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.089, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_22.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.089, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_22.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.089, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_22.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.089, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_22.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.089, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_23.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.089, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_23.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.089, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_22.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.089, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_22.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.089, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_22.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.089, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_22.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.089, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_22.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.089, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_22.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.089, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_22.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.089, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.021, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_23.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.07, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_23.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.07, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_23.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.07, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_23.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.07, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_23.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.07, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_24.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.07, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_24.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.07, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_23.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.07, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_23.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.07, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_23.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.07, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_23.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.07, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_23.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.07, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_23.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.07, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_23.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.07, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, -0.002, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_24.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.051, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_24.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.051, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_24.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.052, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_24.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.052, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_24.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.052, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_25.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.052, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_25.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.052, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_24.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.052, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_24.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.052, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_24.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.052, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_24.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.052, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_24.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.052, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_24.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.052, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_24.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.052, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.017, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_25.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.033, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_25.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.033, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_25.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.033, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_25.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.033, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_25.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.033, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_26.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.033, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_26.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.033, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_25.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.033, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_25.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.033, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_25.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.033, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_25.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.033, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_25.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.033, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_25.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.033, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_25.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.033, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.035, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_26.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.014, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_26.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, 0.014, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_26.geometry}
                material={materials["bronze.001"]}
                position={[0.115, 0.014, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_26.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.014, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_26.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.014, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_27.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.014, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_27.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, 0.014, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_26.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, -0.014, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_26.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.014, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_26.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.014, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_26.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, 0.014, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_26.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.014, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_26.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, 0.014, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_26.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, 0.014, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.054, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_27.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.004, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_27.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.004, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_27.geometry}
                material={materials["bronze.001"]}
                position={[0.115, -0.004, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_27.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_27.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_28.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_28.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.004, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_27.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, 0.004, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_27.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_27.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_27.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_27.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.004, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_27.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.004, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_27.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, -0.004, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.073, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_28.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.023, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_28.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.023, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_28.geometry}
                material={materials["bronze.001"]}
                position={[0.115, -0.023, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_28.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_28.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_29.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_29.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.023, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_28.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, 0.023, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_28.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_28.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_28.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_28.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.023, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_28.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.023, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_28.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, -0.023, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.131, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_29.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_29.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_29.geometry}
                material={materials["bronze.001"]}
                position={[0.115, -0.082, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_29.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_29.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_30.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_30.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_29.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, 0.082, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_29.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_29.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_29.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_29.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_29.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_29.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, -0.095, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_3.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.145, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_3.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.145, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_3.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.145, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_3.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_4.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_3.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_4.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.145, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_3.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.145, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_3.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_3.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_3.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_3.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.145, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_3.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.145, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_3.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.145, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.15, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_30.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.1, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_30.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.1, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_30.geometry}
                material={materials["bronze.001"]}
                position={[0.115, -0.1, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_30.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_31.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_30.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_31.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_30.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, 0.1, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_30.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_30.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_30.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_30.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.1, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_30.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.1, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_30.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.026, 0.168, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_31.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.119, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_31.geometry}
                    material={materials["bronze.001"]}
                    position={[0.119, -0.119, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_31.geometry}
                material={materials["bronze.001"]}
                position={[0.115, -0.119, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_31.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_32.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_31.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_32.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.115, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_31.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.116, 0.119, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_31.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_31.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_31.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.115, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_31.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.119, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_31.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.116, -0.119, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_31.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.115, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.146, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_32.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.196, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_32.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.196, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_32.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.196, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_32.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.196, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_33.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.196, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_32.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.196, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_33.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.196, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_32.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.196, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_32.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.196, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_32.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.196, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_32.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.196, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_32.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.196, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_32.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.196, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_32.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.196, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.105, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_33.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.055, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_33.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.055, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_33.geometry}
                material={materials["bronze.001"]}
                position={[0.135, -0.055, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_33.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.055, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_34.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.055, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_33.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.055, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_34.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.055, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_33.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, 0.055, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_33.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.055, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_33.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.055, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_33.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.055, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_33.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.055, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_33.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.055, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_33.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, -0.055, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.123, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_34.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.173, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_34.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.173, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_34.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.173, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_34.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.173, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_35.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.173, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_34.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.173, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_35.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.173, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_34.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.173, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_34.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.173, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_34.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.173, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_34.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.173, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_34.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.173, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_34.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.173, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_34.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.173, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.105, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_35.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.154, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_35.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.154, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_35.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.154, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_35.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.154, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_36.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.154, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_35.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.154, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_36.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.154, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_35.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.154, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_35.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.154, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_35.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.154, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_35.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.154, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_35.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.154, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_35.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.154, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_35.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.154, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.086, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_36.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.136, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_36.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.136, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_36.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.136, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_36.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.136, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_37.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.136, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_36.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.136, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_37.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.136, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_36.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.136, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_36.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.136, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_36.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.136, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_36.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.136, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_36.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.136, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_36.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.136, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_36.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.136, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.068, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_37.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.117, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_37.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.117, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_37.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.117, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_37.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.117, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_38.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.117, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_37.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.117, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_38.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.117, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_37.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.117, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_37.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.117, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_37.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.117, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_37.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.117, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_37.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.117, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_37.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.117, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_37.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.117, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.049, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_38.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.098, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_38.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.098, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_38.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.099, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_38.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.099, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_39.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.099, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_38.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.099, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_39.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.099, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_38.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.099, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_38.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.099, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_38.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.099, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_38.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.099, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_38.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.099, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_38.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.099, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_38.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.099, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.03, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_39.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.08, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_39.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.08, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_39.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.08, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_39.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_40.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_39.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_40.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_39.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.08, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_39.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_39.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_39.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_39.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.08, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_39.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.08, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_39.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, -0.077, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_4.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.126, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_4.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.126, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_4.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.126, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_4.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_5.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_5.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_4.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.126, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_4.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.126, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_4.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_4.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_4.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_4.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.126, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_4.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.126, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_4.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.126, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, -0.012, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_40.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.061, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_40.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.061, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_40.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.061, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_40.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_41.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_41.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_40.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_40.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.061, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_40.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_40.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_40.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_40.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.061, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_40.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.061, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_40.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.007, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_41.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.043, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_41.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.043, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_41.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.043, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_41.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_42.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_42.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_41.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_41.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.043, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_41.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_41.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_41.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_41.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.043, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_41.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.043, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_41.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.026, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_42.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.024, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_42.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.024, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_42.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.024, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_42.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_43.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_43.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_42.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_42.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.024, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_42.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_42.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_42.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_42.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.024, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_42.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.024, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_42.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.044, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_43.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.005, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_43.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, 0.005, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_43.geometry}
                material={materials["bronze.001"]}
                position={[0.135, 0.005, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_43.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.005, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_44.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.005, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_44.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.005, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_43.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, 0.005, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_43.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, -0.005, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_43.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.005, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_43.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.005, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_43.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, 0.005, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_43.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.005, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_43.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, 0.005, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_43.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, 0.005, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.063, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_44.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.013, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_44.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.013, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_44.geometry}
                material={materials["bronze.001"]}
                position={[0.135, -0.013, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_44.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.013, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_45.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.013, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_45.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.013, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_44.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.013, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_44.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, 0.013, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_44.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.013, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_44.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.013, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_44.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.013, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_44.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.013, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_44.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.013, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_44.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, -0.013, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.081, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_45.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.032, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_45.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.032, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_45.geometry}
                material={materials["bronze.001"]}
                position={[0.135, -0.032, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_45.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.032, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_46.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.032, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_46.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.032, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_45.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.032, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_45.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, 0.032, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_45.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.032, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_45.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.032, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_45.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.032, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_45.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.032, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_45.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.032, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_45.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, -0.032, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.131, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_46.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_46.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_46.geometry}
                material={materials["bronze.001"]}
                position={[0.135, -0.082, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_46.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_47.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_47.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_46.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_46.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, 0.082, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_46.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_46.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_46.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_46.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_46.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_46.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.15, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_47.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.1, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_47.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.1, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_47.geometry}
                material={materials["bronze.001"]}
                position={[0.135, -0.1, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_47.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_48.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_48.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_47.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_47.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, 0.1, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_47.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_47.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_47.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_47.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.1, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_47.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.1, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_47.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.006, 0.168, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_48.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.119, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_48.geometry}
                    material={materials["bronze.001"]}
                    position={[0.139, -0.119, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_48.geometry}
                material={materials["bronze.001"]}
                position={[0.135, -0.119, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_48.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_49.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_49.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_48.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.135, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_48.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.135, 0.119, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_48.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_48.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_48.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.135, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_48.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.119, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_48.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.135, -0.119, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_48.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.135, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.145, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_49.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.194, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_49.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.194, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_49.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.194, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_49.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.194, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_50.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.194, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_50.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.194, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_49.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.194, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_49.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.194, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_49.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.194, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_49.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.194, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_49.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.194, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_49.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.194, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_49.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.194, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_49.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.194, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, -0.058, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_5.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.108, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_5.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.108, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_5.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.108, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_5.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.108, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_6.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.108, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_6.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.108, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_5.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.108, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_5.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.108, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_5.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.108, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_5.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.108, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_5.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.108, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_5.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.108, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_5.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.108, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_5.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.108, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, 0.098, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_50.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, -0.049, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_50.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, -0.049, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_50.geometry}
                material={materials["bronze.001"]}
                position={[0.155, -0.049, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_50.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.049, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_51.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.049, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_51.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.049, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_50.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.049, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_50.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, 0.049, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_50.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, -0.049, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_50.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, -0.049, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_50.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, -0.049, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_50.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, -0.049, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_50.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, -0.049, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_50.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, -0.049, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.119, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_51.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.168, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_51.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.168, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_51.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.168, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_51.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.168, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_52.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.168, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_52.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.168, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_51.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.168, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_51.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.168, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_51.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.168, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_51.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.168, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_51.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.168, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_51.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.168, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_51.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.168, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_51.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.168, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.1, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_52.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.15, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_52.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.15, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_52.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.15, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_52.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.15, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_53.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.15, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_53.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.15, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_52.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.15, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_52.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.15, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_52.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.15, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_52.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.15, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_52.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.15, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_52.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.15, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_52.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.15, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_52.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.15, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.081, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_53.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.131, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_53.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.131, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_53.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.131, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_53.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.131, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_54.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.131, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_54.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.131, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_53.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.131, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_53.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.131, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_53.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.131, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_53.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.131, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_53.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.131, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_53.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.131, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_53.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.131, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_53.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.131, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.063, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_54.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.112, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_54.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.112, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_54.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.112, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_54.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.112, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_55.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.112, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_55.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.112, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_54.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.112, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_54.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.112, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_54.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.112, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_54.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.112, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_54.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.112, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_54.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.112, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_54.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.112, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_54.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.112, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.044, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_55.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.094, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_55.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.094, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_55.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.094, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_55.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.094, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_56.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.094, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_56.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.094, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_55.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.094, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_55.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.094, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_55.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.094, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_55.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.094, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_55.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.094, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_55.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.094, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_55.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.094, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_55.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.094, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.025, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_56.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.075, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_56.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.075, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_56.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.075, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_56.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.075, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_57.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.075, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_57.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.075, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_56.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.075, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_56.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.075, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_56.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.075, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_56.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.075, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_56.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.075, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_56.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.075, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_56.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.075, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_56.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.075, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, -0.007, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_57.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.056, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_57.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.056, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_57.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.056, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_57.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.056, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_58.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.056, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_58.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.056, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_57.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.056, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_57.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.056, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_57.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.056, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_57.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.056, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_57.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.056, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_57.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.056, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_57.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.056, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_57.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.056, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, 0.012, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_58.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.037, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_58.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.037, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_58.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.038, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_58.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.038, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_59.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.038, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_59.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.038, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_58.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.038, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_58.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.038, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_58.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.038, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_58.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.038, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_58.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.038, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_58.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.038, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_58.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.038, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_58.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.038, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, 0.031, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_59.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.019, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_59.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0.019, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_59.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0.019, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_59.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.019, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_60.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.019, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_60.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.019, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_59.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0.019, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_59.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, -0.019, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_59.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.019, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_59.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.019, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_59.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0.019, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_59.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.019, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_59.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0.019, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_59.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0.019, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, -0.03, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_6.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.08, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_6.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.08, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_6.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.08, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_6.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_7.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_7.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_6.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.08, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_6.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.08, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_6.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_6.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_6.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_6.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.08, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_6.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.08, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_6.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.08, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, 0.049, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_60.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_60.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, 0, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_60.geometry}
                material={materials["bronze.001"]}
                position={[0.155, 0, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_60.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_61.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_61.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_60.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, 0, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_60.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, 0, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_60.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_60.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_60.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, 0, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_60.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_60.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, 0, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_60.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, 0, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.014, 0.068, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_61.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, -0.019, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_61.geometry}
                    material={materials["bronze.001"]}
                    position={[0.159, -0.019, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_61.geometry}
                material={materials["bronze.001"]}
                position={[0.155, -0.018, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_61.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.018, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_62.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.018, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_62.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.018, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_61.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.155, -0.018, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_61.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.155, 0.018, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_61.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, -0.018, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_61.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, -0.018, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_61.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.155, -0.018, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_61.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, -0.018, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_61.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.155, -0.018, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_61.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.155, -0.018, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.14, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_62.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.189, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_62.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.189, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_62.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.189, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_62.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.189, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_63.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.189, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_63.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.189, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_62.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.189, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_62.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.189, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_62.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.189, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_62.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.189, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_62.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.189, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_62.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.189, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_62.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.189, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_62.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.189, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, 0.094, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_63.geometry}
                    material={materials["bronze.001"]}
                    position={[0.178, -0.044, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_63.geometry}
                    material={materials["bronze.001"]}
                    position={[0.178, -0.044, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_63.geometry}
                material={materials["bronze.001"]}
                position={[0.175, -0.044, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_63.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.174, -0.044, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_64.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.174, -0.044, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_64.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.174, -0.044, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_63.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.174, -0.044, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_63.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, 0.044, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_63.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.044, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_63.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.044, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_63.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.044, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_63.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, -0.044, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_63.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, -0.044, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_63.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, -0.044, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.11, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_64.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.159, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_64.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.159, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_64.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.159, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_64.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.159, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_65.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.159, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_65.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.159, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_64.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.159, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_64.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.159, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_64.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.159, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_64.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.159, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_64.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.159, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_64.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.159, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_64.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.159, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_64.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.159, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.091, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_65.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.14, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_65.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.14, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_65.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.141, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_65.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.14, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_66.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.14, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_66.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.14, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_65.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.14, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_65.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.141, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_65.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.141, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_65.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.141, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_65.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.141, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_65.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.14, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_65.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.14, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_65.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.141, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.072, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_66.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.122, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_66.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.122, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_66.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.122, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_66.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.122, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_67.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.122, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_67.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.122, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_66.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.122, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_66.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.122, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_66.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.122, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_66.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.122, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_66.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.122, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_66.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.122, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_66.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.122, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_66.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.122, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.054, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_67.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.103, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_67.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.103, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_67.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.103, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_67.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.103, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_68.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.103, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_68.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.103, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_67.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.103, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_67.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.103, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_67.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.103, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_67.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.103, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_67.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.103, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_67.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.103, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_67.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.103, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_67.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.103, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.035, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_68.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.084, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_68.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.084, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_68.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.084, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_68.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.084, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_69.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.084, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_69.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.084, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_68.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.084, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_68.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.084, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_68.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.084, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_68.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.084, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_68.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.084, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_68.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.084, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_68.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.084, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_68.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.084, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, -0.016, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_69.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.066, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_69.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.066, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_69.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.066, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_69.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.066, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_70.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.066, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_70.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.066, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_69.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.066, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_69.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.066, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_69.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.066, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_69.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.066, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_69.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.066, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_69.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.066, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_69.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.066, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_69.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.066, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, -0.012, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_7.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.061, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_7.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.061, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_7.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.061, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_7.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_8.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_8.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_7.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.061, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_7.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.061, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_7.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_7.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_7.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_7.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.061, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_7.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.061, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_7.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.061, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, 0.003, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_70.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.047, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_70.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.047, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_70.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.047, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_70.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.047, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_71.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.047, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_71.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.047, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_70.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.047, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_70.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.047, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_70.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.047, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_70.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.047, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_70.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.047, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_70.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.047, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_70.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.047, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_70.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.047, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, 0.021, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_71.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.028, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_71.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.028, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_71.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.028, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_71.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.028, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_72.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.028, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_72.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.028, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_71.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.028, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_71.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.028, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_71.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.028, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_71.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.028, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_71.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.028, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_71.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.028, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_71.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.028, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_71.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.028, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, 0.04, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_72.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.009, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_72.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, 0.009, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_72.geometry}
                material={materials["bronze.001"]}
                position={[0.175, 0.01, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_72.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.01, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_73.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.01, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_73.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.01, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_72.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, 0.01, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_72.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, -0.01, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_72.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.01, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_72.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.01, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_72.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, 0.01, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_72.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.01, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_72.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, 0.01, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_72.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, 0.01, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, 0.059, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_73.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, -0.009, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_73.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, -0.009, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_73.geometry}
                material={materials["bronze.001"]}
                position={[0.175, -0.009, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_73.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.009, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_74.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.009, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_74.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.009, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_73.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.009, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_73.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, 0.009, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_73.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.009, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_73.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.009, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_73.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.009, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_73.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, -0.009, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_73.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, -0.009, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_73.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, -0.009, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.034, 0.15, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_74.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, -0.101, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_74.geometry}
                    material={materials["bronze.001"]}
                    position={[0.179, -0.101, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_74.geometry}
                material={materials["bronze.001"]}
                position={[0.175, -0.101, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_74.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.101, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_75.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.101, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_75.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.101, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_74.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.175, -0.101, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_74.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.175, 0.101, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_74.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.101, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_74.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.101, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_74.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.175, -0.101, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_74.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, -0.101, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_74.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.175, -0.101, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_74.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.175, -0.101, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.053, -0.033, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_75.geometry}
                    material={materials["bronze.001"]}
                    position={[0.198, 0.083, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_75.geometry}
                    material={materials["bronze.001"]}
                    position={[0.198, 0.083, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_75.geometry}
                material={materials["bronze.001"]}
                position={[0.194, 0.083, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_75.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.194, 0.083, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_76.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.194, 0.083, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_76.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.194, 0.083, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_75.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.194, 0.083, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_75.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, -0.083, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_75.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.194, 0.083, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_75.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.194, 0.083, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_75.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.194, 0.083, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_75.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.083, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_75.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.083, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_75.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.194, 0.083, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, -0.149, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_76.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.198, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_76.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.198, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_76.geometry}
                material={materials["bronze.001"]}
                position={[0.195, 0.199, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_76.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.199, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_77.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.199, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_77.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.199, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_76.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.199, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_76.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, -0.199, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_76.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.199, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_76.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.199, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_76.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.199, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_76.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.199, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_76.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.199, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_76.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, 0.199, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, -0.126, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_77.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.175, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_77.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.175, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_77.geometry}
                material={materials["bronze.001"]}
                position={[0.195, 0.176, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_77.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.175, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_78.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.175, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_78.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.175, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_77.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.175, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_77.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, -0.176, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_77.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.176, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_77.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.176, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_77.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.176, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_77.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.175, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_77.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.175, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_77.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, 0.176, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, -0.103, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_78.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.152, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_78.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.152, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_78.geometry}
                material={materials["bronze.001"]}
                position={[0.195, 0.152, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_78.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.152, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_79.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.152, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_79.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.152, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_78.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.152, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_78.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, -0.152, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_78.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.152, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_78.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.152, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_78.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.152, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_78.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.152, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_78.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.152, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_78.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, 0.152, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.037, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_79.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.012, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_79.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, 0.012, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_79.geometry}
                material={materials["bronze.001"]}
                position={[0.195, 0.012, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_79.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.012, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_80.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.012, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_80.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.012, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_79.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, 0.012, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_79.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, -0.012, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_79.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.012, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_79.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.012, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_79.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, 0.012, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_79.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.012, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_79.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, 0.012, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_79.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, 0.012, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.007, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_8.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.043, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_8.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.043, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_8.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.043, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_8.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_9.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_9.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_8.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.043, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_8.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.043, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_8.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_8.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_8.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_8.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.043, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_8.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.043, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_8.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.043, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.061, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_80.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.011, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_80.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.011, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_80.geometry}
                material={materials["bronze.001"]}
                position={[0.195, -0.011, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_80.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.011, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_81.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.011, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_81.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.011, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_80.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.011, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_80.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, 0.011, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_80.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.011, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_80.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.011, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_80.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.011, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_80.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.011, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_80.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.011, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_80.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, -0.011, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.084, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_81.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.035, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_81.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.035, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_81.geometry}
                material={materials["bronze.001"]}
                position={[0.195, -0.035, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_81.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.035, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_82.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.035, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_82.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.035, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_81.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.035, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_81.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, 0.035, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_81.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.035, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_81.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.035, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_81.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.035, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_81.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.035, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_81.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.035, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_81.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, -0.035, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.108, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_82.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.058, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_82.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.058, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_82.geometry}
                material={materials["bronze.001"]}
                position={[0.195, -0.058, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_82.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.058, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_83.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.058, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_83.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.058, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_82.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.058, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_82.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, 0.058, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_82.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.058, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_82.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.058, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_82.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.058, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_82.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.058, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_82.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.058, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_82.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, -0.058, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.131, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_83.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_83.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.082, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_83.geometry}
                material={materials["bronze.001"]}
                position={[0.195, -0.082, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_83.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_84.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_84.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_83.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.082, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_83.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, 0.082, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_83.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_83.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_83.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_83.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_83.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.082, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_83.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, -0.082, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.15, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_84.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.1, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_84.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.1, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_84.geometry}
                material={materials["bronze.001"]}
                position={[0.195, -0.1, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_84.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_85.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_85.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_84.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.1, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_84.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, 0.1, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_84.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_84.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_84.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_84.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.1, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_84.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.1, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_84.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, -0.1, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[-0.054, 0.168, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_85.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.119, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_85.geometry}
                    material={materials["bronze.001"]}
                    position={[0.199, -0.119, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_85.geometry}
                material={materials["bronze.001"]}
                position={[0.195, -0.119, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_85.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_86.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_86.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_85.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.195, -0.119, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_85.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.195, 0.119, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_85.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_85.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_85.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.195, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_85.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.119, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_85.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.195, -0.119, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_85.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.195, -0.119, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
            <group position={[0.048, 0.025, 0]}>
              <group position={[0, 0, 0.005]}>
                <group position={[-0.004, 0, -0.002]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML1_9.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.024, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ML2_9.geometry}
                    material={materials["bronze.001"]}
                    position={[0.096, 0.024, 0.013]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Metal_Spring_9.geometry}
                material={materials["bronze.001"]}
                position={[0.093, 0.024, 0.016]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <group position={[0, 0, 0.005]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_1_9.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_2_10.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_3_10.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_9.geometry}
                  material={materials["Bottom Housing.001"]}
                  position={[0.093, 0.024, 0.01]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group position={[0, 0, -0.003]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Stem_1_9.geometry}
                  material={materials["Stem.001"]}
                  position={[-0.093, -0.024, 0.019]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                />
              </group>
              <group position={[0, 0, -0.007]}>
                <group position={[0, 0, 0.007]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bottom_Housing_9.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Center_Mast_9.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2_9.geometry}
                    material={materials["Bottom Housing.001"]}
                    position={[0.093, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    position={[0, 0, 0.005]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L1_9.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.024, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.L2_9.geometry}
                      material={materials["Bottom Housing.001"]}
                      position={[-0.093, 0.024, -0.01]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    />
                  </group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Top_Housing_9.geometry}
                    material={materials["Top Housing.001"]}
                    position={[0.093, 0.024, 0.015]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            position={[-0.016, 0.008, -0.008]}
            rotation={[0, 0, Math.PI / 2]}
            ref={extrudeGroupRef}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_1.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_10.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_100.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_101.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_102.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_103.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_104.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_105.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_106.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_11.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_12.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_13.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_14.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_15.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_16.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_17.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_18.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_19.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_2.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_20.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_21.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_22.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_23.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_24.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_25.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_26.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_27.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_28.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_29.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_3.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_30.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_31.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_32.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_33.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_34.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_35.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_36.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_37.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_38.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_39.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_4.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_40.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_41.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_42.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_43.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_44.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_45.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_46.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_47.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_48.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_49.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_5.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_50.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_51.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_52.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_53.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_54.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_55.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_56.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_57.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_58.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_59.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_6.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_60.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_61.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_62.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_63.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_64.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_65.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_66.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_67.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_68.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_69.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_7.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_70.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_71.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_72.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_73.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_74.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_75.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_76.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_77.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_78.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_79.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_8.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_80.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_81.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_82.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_83.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_84.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_85.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_86.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_87.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_88.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_89.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_9.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_90.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_91.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_92.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_93.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_94.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_95.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_96.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_97.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_98.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Extrude_99.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Fill004.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Fill_2.geometry}
              material={materials.Symbols}
              position={[-0.141, -0.055, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
          </group>
        </group>
      </group>
    );
  },
);

Keyboard.displayName = "Keyboard";

useGLTF.preload("/uploads-files-4500971-Arcade_Mechanical_Keyboard_v2.gltf");
