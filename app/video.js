const VideoManager = {

    videoElement: null,
    currentVideoURL: null,

    initialize(videoElement) {
        this.videoElement = videoElement;
    },

    loadVideo(file) {

        if (!file) {
            return;
        }

        if (!file.type.startsWith("video/")) {
            throw new Error("Please select a valid video file.");
        }

        // Release the previous video URL
        if (this.currentVideoURL) {
            URL.revokeObjectURL(this.currentVideoURL);
        }

        // Create a temporary local URL
        this.currentVideoURL =
            URL.createObjectURL(file);

        // Load video into the player
        this.videoElement.src =
            this.currentVideoURL;

        this.videoElement.load();
    },

    getVideoElement() {
        return this.videoElement;
    },

    getVideoDimensions() {

        return {
            width: this.videoElement.videoWidth,
            height: this.videoElement.videoHeight
        };
    },

    destroy() {

        if (this.currentVideoURL) {

            URL.revokeObjectURL(
                this.currentVideoURL
            );

            this.currentVideoURL = null;
        }

        this.videoElement.removeAttribute("src");

        this.videoElement.load();
    }
};