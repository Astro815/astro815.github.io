const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

window.onload = () => {
    $$(".cassosel").forEach(carousel => {
        if (carousel.children.length === 0) return;

        carousel.children[0].classList.add("cur");
        let currentIndex = 0;

        setInterval(() => {
            const items = Array.from(carousel.children);
            if (items.length < 2) return;
            const firstRects = items.map(item => item.getBoundingClientRect());
            const nextIndex = (currentIndex + 1) % items.length;

            items[currentIndex].classList.remove("cur");
            items[nextIndex].classList.add("cur");

            const lastRects = items.map(item => item.getBoundingClientRect());

            items.forEach((item, i) => {
                const first = firstRects[i];
                const last = lastRects[i];

                const deltaX = first.left - last.left + first.width/3.0;
                const deltaY = first.top - last.top;
                const deltaW = first.width / last.width;
                const deltaH = (first.height / last.height);

                if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1 && Math.abs(deltaW - 1) < 0.01 && Math.abs(deltaH - 1) < 0.01) {
                    return;
                }

                item.style.transition = 'none';
                item.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
                item.offsetHeight; 
                item.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.transform = 'none';
            });

            currentIndex = nextIndex;
        }, 3000);
    });
};