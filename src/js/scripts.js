// Swipper slider

const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});


const galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});


// Open call button

const triggersButton = document.querySelector('.js-call-btn');
const messengerButtons = document.querySelectorAll('.messenger_bnt');

triggersButton.onclick = function () {
  messengerButtons.forEach(item => {
    item.classList.toggle('is-open');
  });
};

document.body.addEventListener('click', e => {
  if (
    e.target !== triggersButton &&
    messengerButtons[0].classList.contains('is-open')
  ) {
    messengerButtons.forEach(item => item.classList.remove('is-open'));
  } else {
    return;
  }
});

// fixed menu scrilling

function fixedMenu(menuSelector) {
  const menu = document.querySelector(menuSelector);
  window.addEventListener('scroll', () => {
    if (
      document.documentElement.scrollTop >
      menu.getBoundingClientRect().bottom + 30
    ) {
      menu.classList.add('fixed');
    } else {
      menu.classList.remove('fixed');
    }
  });
}

fixedMenu('.js-fixedMenu');

// Scrolling link with requestAnimationFrame

const links = document.querySelectorAll('[href^="#"]'),
  menuItems = document.querySelectorAll('.js-menuItems'),
  speed = 0.2;

links.forEach(link => {
  link.addEventListener('click', function (event) {
    menuItems.forEach(item => item.classList.remove('is-active'));
    event.preventDefault();
    let widthTop = document.documentElement.scrollTop,
      hash = this.hash,
      item = link.parentNode,
      toBlock = document.querySelector(hash).getBoundingClientRect().top,
      start = null;

    item.classList.add('is-active');

    requestAnimationFrame(step);

    function step(time) {
      if (start === null) {
        start = time;
      }

      let progress = time - start,
        r =
          toBlock < 0
            ? Math.max(widthTop - progress / speed, widthTop + toBlock)
            : Math.min(widthTop + progress / speed, widthTop + toBlock);

      document.documentElement.scrollTo(0, r);

      if (r != widthTop + toBlock) {
        requestAnimationFrame(step);
      } else {
        location.hash = hash;
      }
    }
  });
});

// Animation scroll

function animOnScroll(animSelector, animActiveClass) {

  const animItems = document.querySelectorAll(animSelector);

  function offsetTop(el) {
    const rest = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop,
      topHight = rest.top + scrollTop;
    return topHight;
  }
  if (animItems.length > 0) {
    window.addEventListener('scroll', e => {
      animItems.forEach(animItem => {
        const animItemHeight = animItem.offsetHeight;
        const animItemOffsetTop = offsetTop(animItem);
        const animStart = 4;
        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (
          pageYOffset > animItemOffsetTop - animItemPoint &&
          pageYOffset < animItemOffsetTop + animItemHeight
        ) {
          animItem.classList.add(animActiveClass);
        } else {
          animItem.classList.remove(animActiveClass);
        }
      });
    });
  }
}

animOnScroll('.js-animate', 'is_active');



//   Burger menu screen <= 768

const burger = document.querySelector('#burger');
const burgerMenu = document.querySelector('.js-menu');

burger.onclick = function () {
  burger.classList.toggle('burger_active');
  burgerMenu.classList.toggle('is-open');
};


// Open-close submenu screen <=768

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (item.classList.contains("js-submenu")) {
      if (item.classList.contains("is-open")) {
        item.classList.remove("is-open");
        burger.classList.toggle('burger_active');
        burgerMenu.classList.toggle('is-open');
        return;
      }
      item.classList.add("is-open");
      return;
    }

    else {
      burger.classList.toggle('burger_active');
      burgerMenu.classList.toggle('is-open');
    }
  }
  );
});

// Filter schedule by month

function filterMonth() {
  const selectMonth = document.querySelector(".js-select-month");

  if(selectMonth == null) {
    return;
  }
  const schedule = document.querySelectorAll (".js-schedule");
  selectMonth.addEventListener("change", function () {
    schedule.forEach(item => {
     
      item.classList.remove('is-active');
      if (item.dataset.name === this.value) { 
        item.classList.add('is-active');
      }
    });
  });

}

filterMonth();