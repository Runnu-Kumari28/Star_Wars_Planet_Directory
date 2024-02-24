function myFunction() {
    const starSpan = document.createElement('span');
    starSpan.classList.add("animation-span");
    const starDiv = document.querySelector('div');
    var value = Math.random() * 5;

    starSpan.style.width = value + 'px';
    starSpan.style.height = value + 'px';

    starSpan.style.top = Math.random() * innerHeight + 'px';
    starSpan.style.left = Math.random() * innerWidth + 'px';

    starDiv.appendChild(starSpan);

    setTimeout(() => {
        starSpan.remove();
    }, 5000);
}
setInterval(myFunction, 50);