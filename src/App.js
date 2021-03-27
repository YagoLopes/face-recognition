import * as p5 from "p5";
import "p5/lib/addons/p5.dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as faceapi from "face-api.js";

const MODEL_URL = "/models";

export default function sketch(p) {
  let capture = null;

  let cocossdModel = null;

  let cocoDrawings = [];
  let faceDrawings = [];
}
