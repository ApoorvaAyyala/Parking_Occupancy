document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // DOM Elements
    // =========================

    const videoInput =
        document.getElementById("videoInput");

    const videoPlayer =
        document.getElementById("videoPlayer");

    const videoCanvas =
        document.getElementById("videoCanvas");

    const videoPlaceholder =
        document.getElementById("videoPlaceholder");

    const fileName =
        document.getElementById("fileName");

    const status =
        document.getElementById("status");

    const trafficMode =
        document.getElementById("trafficMode");

    const parkingMode =
        document.getElementById("parkingMode");


    // =========================
    // Initialize Modules
    // =========================

    VideoManager.initialize(videoPlayer);

    CanvasManager.initialize(videoCanvas);


    // =========================
    // Video Selection
    // =========================

    videoInput.addEventListener("change", (event) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        try {

            VideoManager.loadVideo(file);

            fileName.textContent =
                file.name;

            status.textContent =
                "Loading video...";

        } catch (error) {

            console.error(error);

            status.textContent =
                error.message;
        }
    });


    // =========================
    // Video Metadata
    // =========================

    videoPlayer.addEventListener(
        "loadedmetadata",
        () => {

            const dimensions =
                VideoManager.getVideoDimensions();

            CanvasManager.resizeToVideo(
                videoPlayer
            );

            videoPlayer.style.display =
                "block";

            videoPlaceholder.style.display =
                "none";

            status.textContent =
                `Video ready: ${dimensions.width} × ${dimensions.height}`;
        }
    );


    // =========================
    // Video Playback
    // =========================

    videoPlayer.addEventListener(
    "loadedmetadata",
    () => {

        videoPlayer.style.display =
            "block";

        videoPlaceholder.style.display =
            "none";

        CanvasManager.resizeToVideo(
            videoPlayer
        );

        status.textContent =
            `Video ready: ${
                videoPlayer.videoWidth
            } × ${
                videoPlayer.videoHeight
            }`;
        }
    );

    videoPlayer.addEventListener(
        "play",
        () => {

            status.textContent =
                "Video playing.";

            CanvasManager.startRendering(
                videoPlayer
            );
        }
    );


    videoPlayer.addEventListener(
        "pause",
        () => {

            status.textContent =
                "Video paused.";

            CanvasManager.stopRendering();
        }
    );


    videoPlayer.addEventListener(
        "ended",
        () => {

            status.textContent =
                "Video playback completed.";

            CanvasManager.stopRendering();
        }
    );

    videoPlayer.addEventListener(
    "error",
    () => {

        console.error(
            "Video error:",
            videoPlayer.error
        );

        status.textContent =
            "Unable to load this video.";
    }
);

    // =========================
    // Traffic Analysis Mode
    // =========================

    trafficMode.addEventListener(
        "click",
        () => {

            trafficMode.classList.add(
                "active"
            );

            parkingMode.classList.remove(
                "active"
            );

            status.textContent =
                "Traffic Analysis mode selected.";
        }
    );


    // =========================
    // Parking Analysis Mode
    // =========================

    parkingMode.addEventListener(
        "click",
        () => {

            parkingMode.classList.add(
                "active"
            );

            trafficMode.classList.remove(
                "active"
            );

            status.textContent =
                "Parking Analysis mode selected.";
        }
    );

});