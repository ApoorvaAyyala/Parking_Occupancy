const CanvasManager = {

    canvas: null,
    context: null,

    animationFrameId: null,

    initialize(canvasElement) {

        this.canvas = canvasElement;

        this.context =
            this.canvas.getContext("2d");

        console.log(
            "CanvasManager initialized."
        );
    },

    resizeToVideo(videoElement) {

        if (!videoElement) {
            return;
        }

        const videoWidth =
            videoElement.videoWidth;

        const videoHeight =
            videoElement.videoHeight;

        if (!videoWidth || !videoHeight) {
            return;
        }

        this.canvas.width = videoWidth;
        this.canvas.height = videoHeight;

        this.updateDisplaySize(videoElement);

        console.log(
            `Canvas resized: ${videoWidth} × ${videoHeight}`
        );
    },

    updateDisplaySize(videoElement) {

        const rect =
            videoElement.getBoundingClientRect();

        this.canvas.style.width =
            `${rect.width}px`;

        this.canvas.style.height =
            `${rect.height}px`;

        this.canvas.style.left =
            `${videoElement.offsetLeft}px`;

        this.canvas.style.top =
            `${videoElement.offsetTop}px`;
    },

    clear() {

        if (!this.context) {
            return;
        }

        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    },

    drawTestOverlay() {

        if (!this.context) {
            return;
        }

        const width =
            this.canvas.width;

        const height =
            this.canvas.height;

        this.clear();

        // Test border

        this.context.strokeStyle = "red";

        this.context.lineWidth = 12;

        this.context.strokeRect(
            10,
            10,
            width - 20,
            height - 20
        );

        // Center marker

        const centerX =
            width / 2;

        const centerY =
            height / 2;

        this.context.beginPath();

        this.context.moveTo(
            centerX - 30,
            centerY
        );

        this.context.lineTo(
            centerX + 30,
            centerY
        );

        this.context.moveTo(
            centerX,
            centerY - 30
        );

        this.context.lineTo(
            centerX,
            centerY + 30
        );

        this.context.stroke();

    // Research watermark

        this.context.save();

        this.context.font = "bold 24px Arial";

        this.context.fillStyle = "rgba(255, 255, 255, 0.75)";

        this.context.textAlign = "right";

        this.context.textBaseline = "bottom";

        this.context.fillText(
            "Apoorva Ayyalasomayajula • Vehicle Vision",
            this.canvas.width - 25,
            this.canvas.height - 20
        );

        this.context.restore();
    },

    startRendering(videoElement) {

        this.stopRendering();

        const render = () => {

            if (
                videoElement.paused ||
                videoElement.ended
            ) {

                this.animationFrameId =
                    null;

                return;
            }

            this.updateDisplaySize(
                videoElement
            );

            this.drawTestOverlay();

            this.animationFrameId =
                requestAnimationFrame(render);
        };

        render();
    },

    stopRendering() {

        if (
            this.animationFrameId !== null
        ) {

            cancelAnimationFrame(
                this.animationFrameId
            );

            this.animationFrameId = null;
        }
    }
};