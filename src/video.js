export function createVideoElement() {

    const video = document.createElement("video");

    video.id = "camera";

    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    video.style.position = "fixed";
    video.style.right = "20px";
    video.style.bottom = "20px";

    video.style.width = "320px";
    video.style.border = "2px solid #66ccff";
    video.style.borderRadius = "8px";

    document.body.appendChild(video);

    return video;

}

export async function startVideo(video){

    const stream = await navigator.mediaDevices.getUserMedia({

        video:true

    });

    video.srcObject = stream;

    await video.play();

}