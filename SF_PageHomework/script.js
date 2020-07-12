const rooms = [
    {
        city: "Rostov-on-Don",
        name: "Admiral",
        area: "81 m2",
        time: 3.5,
        cost: "Upon request"
    },
    {
        city: "Sochi",
        name: "Thieves",
        area: "105 m2",
        time: 4,
        cost: "Upon request"
    },
    {
        city: "Rostov-on-Don",
        name: "Patriotic",
        area: "93 m2",
        time: 3,
        cost: "Upon request"
    },

];

const allDots = document.querySelector('.all_dots');
let dots = [];
for (let i = 0; i < rooms.length; i++) {
    let dot = document.createElement('button');
    dot.classList.add('dot_circle');
    if (i === 0) {
        dot.classList.add('dot_circle_active')
    }
    dot.dataset.num = i;
    dots.push(dot);
}
allDots.append(...dots);

const allProjects = document.querySelector('.section-navigation');
let projectElement = [];
rooms.forEach(({city, name}, index) => {
    let li = document.createElement('li');
    li.textContent = `${city} ${name}`;
    li.dataset.num = index;
    li.classList.add('section_link', 'section_title', 'click');
    if (index === 0) {
        li.classList.add('section_title_active')
    }
    projectElement.push(li);
});
allProjects.append(...projectElement);


let curSlide = 0;
const firstSliderItem = document.querySelector('.section_img').firstElementChild;
const firstSliderItemMobile = document.querySelector('.mobile_section_2_image').firstElementChild;
const sliderActive = document.querySelector('.dot_line');
const dotElements = document.querySelectorAll('.dot_circle');
const navElements = document.querySelectorAll('.section_link');
const projectSlider = document.querySelector('.mobile_section_2_image');


sliderActive.addEventListener('click', event => {
    const currentElement = event.target;
    let num = null;
    if (currentElement.classList.contains('dot_circle')) {
        num = currentElement.dataset.num;
    } else if (currentElement.classList.contains('arrow_left')) {
        num = curSlide - 1;
    } else if (currentElement.classList.contains('arrow_right')) {
        num = curSlide + 1;
    }
    if (num > rooms.length - 1) {
        num = 0;
    } else if (num < 0) {
        num = rooms.length - 1
    }
    if (num === null || curSlide === num) return;
    changeProject(num);
});

allProjects.addEventListener('click', event => {
    const curElement = event.target;
    const isActive = curElement.classList.contains('section_title_active');
    const needClass = curElement.classList.contains('section_link');
    if (isActive || !needClass) return;
    changeProject(curElement.dataset.num)
})

projectSlider.addEventListener('click', event => {
    const curElement = event.target;
    const needClass = curElement.classList.contains('mobile_arrow');
    let num = null;
    if (!needClass) {
        return false;
    }
    if (curElement.classList.contains('mobile_arrow_left')) {
        num = curSlide - 1;
        console.log(event)
    } else if (curElement.classList.contains('mobile_arrow_right')) {
        num = curSlide + 1;
        console.log(event)
    }
    if (num > rooms.length -1) {
        num = 0;
    } else if (num < 0) {
        num = rooms.length - 1;
    }
    if (num === null) return;
    changeProject(num)
})

changeProject();

function changeProject(num = 0) {
    updateSlide(num);
    updateProjectDescr(rooms[num]);
    updateDotes(num);
    updateNav(num);
    curSlide = +num;
}

function updateProjectDescr(room) {
    const roomsInfo = document.querySelectorAll('.option');
    const {city, name, area, time, cost} = room;

    roomsInfo[0].innerHTML = `${city}<br>${name}`;
    roomsInfo[1].textContent = `${area}`;
    roomsInfo[2].textContent = `${time} month`;
    roomsInfo[3].textContent = cost;
}

function updateSlide(num) {
    firstSliderItem.style.marginLeft = `-${num * 100}%`;
    firstSliderItemMobile.style.marginLeft = `-${num * 100}%`;
}

function updateDotes(num) {
    dotElements.forEach(el => el.classList.remove('dot_circle_active'));
    dotElements[num].classList.add('dot_circle_active')
}

function updateNav(num) {
    navElements.forEach(el => el.classList.remove('section_title_active'));
    navElements[num].classList.add('section_title_active');
}

function getActiveProjectDescr() {
    const elements = document.querySelectorAll('.box_part');
    if (window.matchMedia("screen and (max-width: 1299px)").matches) {
        return elements[1]
    }
    return elements[0];
}