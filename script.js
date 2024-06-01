const workbg = document.querySelector('#work');
const workData = document.querySelectorAll('.work-data');
let scroller = document.querySelectorAll('.scroller');
let intervalId;

function changeBackgroundAutomatically() {
  let currentIndex = 0;
  const images = Array.from(workData).map((work) => work.getAttribute('data-image'));
  intervalId = setInterval(() => {
    workbg.style.backgroundImage = `url(${images[currentIndex]})`;

    scroller.forEach((singleScroller) => {
      singleScroller.style.transform = 'translate(0, -50%) scaleY(0)';
    });

    workData.forEach((w) => {
      w.style.color = 'white';
      w.style.fontStyle = 'normal';
    });

    scroller[currentIndex].style.transform = 'translate(0, -50%) scaleY(1)';
    workData[currentIndex].style.color = 'black';
    workData[currentIndex].style.fontStyle = 'italic';
    currentIndex = (currentIndex + 1) % images.length;
  }, 1000);
}

function stopAutomaticChange() {
  clearInterval(intervalId);
  scroller.forEach((singleScroller) => {
    singleScroller.style.transform = 'translate(0, -50%) scaleY(0)';
  });
  workData.forEach((w) => {
    w.style.color = 'white';
    w.style.fontStyle = 'normal';
  });
}

workData.forEach((work) => {
  work.addEventListener('mouseenter', () => {
    stopAutomaticChange();
    let scrollbar = work.querySelector('.scroller');
    console.log(scrollbar);
    if (scrollbar) {
      scrollbar.style.transform = 'translate(0, -50%) scaleY(1)';
    }
    let bgImage = work.getAttribute('data-image');
    workbg.style.backgroundImage = `url(${bgImage})`;
  });

  work.addEventListener('mouseleave', () => {
    changeBackgroundAutomatically();
  });
});

changeBackgroundAutomatically();

const loader = () => {
  let loader = gsap.timeline();
  loader.to('.first-slide', {
    top: '-100%',
    delay: 1,
    duration: 0.3,
  });

  loader.to('.second-slide', {
    top: '-100%',
    delay: 1,
    duration: 0.1,
  });

  loader.from(
    '.text-display em, .text-display span',
    {
      opacity: 0,
      y: 70,
      duration: 2,
      stagger: 0.2,
    },
    'animateText'
  );
};
loader();

const menuBtn = document.querySelector('.menu-icon');
let isOpen = false;

menuBtn.addEventListener('click', () => {
  const menu = gsap.timeline();

  if (isOpen) {
    menu.to('.menu-icon i', {
      rotate: 360,
    });
    menu.to('.menu-item', {
      left: '-100%',
    });
    isOpen = false;
  } else {
    menu.to('.menu-icon i', {
      rotate: 360,
    });
    menu.to('.menu-item', {
      left: '50%',
      duration: 1,
    });
    menu.from('.menu-item a', {
      opacity: 0,
      right: 100,
      stagger: 0.1,
    });
    isOpen = true;
    console.log(isOpen);
  }
});
