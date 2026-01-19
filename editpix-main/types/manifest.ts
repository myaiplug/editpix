/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ManifestImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

export interface ManifestText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: string;
  rotation: number;
  zIndex: number;
}

export interface ManifestCanvas {
  id: string;
  name: string;
  images: ManifestImage[];
  texts: ManifestText[];
  backgroundColor: string;
  width: number;
  height: number;
  createdAt: number;
  updatedAt: number;
}
