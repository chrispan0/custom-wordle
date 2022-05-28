const body = document.querySelector("body");
const linkIcon = `<i class="notifIcon fa-solid fa-clipboard-check"></i>`;
const generateIcon = `<i class="notifIcon fa-solid fa-arrows-rotate"></i>`;
export default class ToastNotification {
    constructor() {
        // this.notify(message, timeMS, color);
    }

    copyLink(message, timeMS = 2000, color = "orange") {
        let opacityFac = 1;
        let element = document.createElement("div");
        element.innerHTML = `${linkIcon}<p><strong>${message}</strong></p>`;
        element.style.background = color;
        element.style.opacity = 1 * opacityFac;
        this.appear(element, opacityFac);
        // element.style.position = "absolute";
        body.appendChild(element);

        element.classList.add("toastNotification");
        setTimeout(this.fadeOut, timeMS, element, opacityFac);

    }

    generate(message, timeMS = 2000, color = "orange") {
        let opacityFac = 0.9;
        let element = document.createElement("div");
        element.innerHTML = `${generateIcon}<p><strong>${message}</strong></p>`;
        element.style.background = color;
        element.style.opacity = 1 * opacityFac;
        this.appear(element, opacityFac);
        // element.style.position = "absolute";
        body.appendChild(element);

        element.classList.add("toastNotification");
        setTimeout(this.fadeOut, timeMS, element, opacityFac);

    }

    appear(element, opacityFac) {
        element.animate([
            // keyframes
            {
                opacity: 0,
                transform: "scale(.5)"
            },
            {
                opacity: 1 * opacityFac,
                transform: "scale(1)"
            },
        ], {
            duration: 50,
            iterations: 1,
            easing: "ease-out"
        });

    }

    fadeOut(element, opacityFac) {
        let start;
        let duration = 1;   // sec
        function fadeAnim(timestamp) {
            if (start == undefined) {
                start = timestamp;
            }

            let elapsed = (timestamp - start) / 1000;
            let opacity = (duration - elapsed) / duration;

            element.style.opacity = opacity * opacityFac;

            if (elapsed >= duration) {
                element.remove();
                return;
            }
            requestAnimationFrame(fadeAnim);
        }
        requestAnimationFrame(fadeAnim);
    }
}