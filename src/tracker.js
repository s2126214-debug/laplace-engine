import {
  FilesetResolver,
  PoseLandmarker
} from "@mediapipe/tasks-vision";

let poseLandmarker;

let running = false;

export async function initTracker() {

  const vision = await FilesetResolver.forVisionTasks(

    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"

  );

  poseLandmarker =
    await PoseLandmarker.createFromOptions(
      vision,
      {

        baseOptions: {

          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task"

        },

        runningMode: "VIDEO",

        numPoses: 1

      }

    );

}

export async function startCamera(video){

  const stream =
    await navigator.mediaDevices.getUserMedia({

      video:true

    });

  video.srcObject = stream;

  await video.play();

  running = true;

}

export async function detect(video){

  if(!running)return null;

  return poseLandmarker.detectForVideo(

    video,

    performance.now()

  );

}