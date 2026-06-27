import { updateSceneStatus } from "./systemStatus";

let currentScene = 0;

const scenes = [

    "INTRO",

    "PLAY1",

    "PLAY2",

    "PLAY3",

    "ENDING"

];

export function nextScene(){

    if(currentScene < scenes.length-1){

        currentScene++;

        updateSceneStatus(scenes[currentScene]);

    }

}

export function resetScene(){

    currentScene = 0;

    updateSceneStatus(scenes[currentScene]);

}

export function getScene(){

    return scenes[currentScene];

}