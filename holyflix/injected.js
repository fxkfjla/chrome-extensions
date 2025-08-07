const handleLoad = () => {
    const modalParent = document.querySelector('body');
    const videoParent = document.querySelector('body');

    const modalObserver = new MutationObserver(elements => {
        elements.forEach(element => {
            if(element.target.className.includes('interstitial-full-screen')) {
                element.target.parentNode.removeChild(element.target);

                const video = document.querySelector('.ltr-18tyyic')

                if(video) {
                    video.querySelector('video').play();
                }
            }
        });
    });

    const videoObserver = new MutationObserver(elements => {
        elements.forEach(element => {
            element.addedNodes.forEach(node => {
                if(node.className.includes('watch-video--player-view')) {
                    const controls = document.querySelector('.ltr-1m81c36');
                    controls.parentNode.append(cloneControls(controls));
                }
            });

            // if(element.target.tagName === 'VIDEO') {
            //     element.target.setAttribute('controls', true);
            //     element.target.setAttribute('autoplay', true);
            // }
        });
    });

    modalObserver.observe(modalParent, { childList: true, subtree: true });
    videoObserver.observe(videoParent, { childList: true, subtree: true, attributes: true });
}

const cloneControls = (controls) => {
    const clone = controls.cloneNode(true);
    const video = document.querySelector('video');

    const handlePlay = () => {
        if(video.paused) {
            video.play()
        } else {
            video.pause();
        }
    }

    const handleSpacebar = event => {
        if (event.code === 'Space') {
            event.preventDefault();
            handlePlay();
        }
    }

    const pause = clone.querySelector('[data-uia="control-play-pause-pause"]');
    pause.addEventListener('click', handlePlay);

    let hideTimeout;

    const startInactivityTimer = () => {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            clone.style.opacity = '0';
            clone.style.pointerEvents = 'none';
        }, 3000);
    };

    const handleControls = () => {
        clone.style.opacity = '1';
        clone.style.pointerEvents = 'auto';
        startInactivityTimer();
    };


    startInactivityTimer();
    document.addEventListener('mousemove', handleControls);
    document.addEventListener('keyup', handleSpacebar);

    return clone;
}


window.addEventListener("load", handleLoad);
