
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


let homeNav = document.querySelector(".home-nav ul");
let homeNavLi = document.querySelectorAll(".home-nav ul li");
Array.from(homeNavLi).forEach((ele, i)=>{
    ele.onmouseover = ()=>{
        homeNav.dataset.active = i;
    };
})




let rightButtonFlip = document.querySelector('.right.flip-button');
let leftButtonFlip = document.querySelector('.left.flip-button')

let pages = [...document.getElementsByClassName('bio-page')].reverse();
let images = [...document.getElementsByClassName('p-image')];

let root = document.querySelector(':root');
let rootValues = getComputedStyle(root);
let gray = rootValues.getPropertyValue('--gray')
let pageNumber = 1;

rightButtonFlip.onclick = function(){
    if (pageNumber >= 3){
        return true;
    }

    leftButtonFlip.style.cssText = `border-right-color: ${gray}`

    pages[pageNumber - 1].classList.add('read-ed');
    pageNumber++;
    
    images.forEach(function(el, index){
        el.classList.remove('active')
        if (index + 1 == pageNumber){
            el.classList.add('active')
        }
    })
    if (pageNumber >= 3){
        rightButtonFlip.style.cssText = 'border-left-color: gray'

    }
}

leftButtonFlip.onclick = function(){
    if (pageNumber <= 1){
        return true;
    }

    rightButtonFlip.style.cssText = `border-left-color: ${gray}`


    pages[pageNumber - 2].classList.remove('read-ed');
    pageNumber--;

    images.forEach(function(el, index){
        el.classList.remove('active')
        if (index + 1 == pageNumber){
            el.classList.add('active')
        }
    })

    if (pageNumber <= 1){
        leftButtonFlip.style.cssText = 'border-right-color: gray'
    }
}


let seeMoreButton = document.getElementsByClassName("more-skills")[0]
let skillUniverseXtra = document.querySelector(".skills-universe.xtra")
seeMoreButton.clicked = false;

seeMoreButton.onclick = function(){
    if(seeMoreButton.clicked == false){
        seeMoreButton.clicked = true
        
        seeMoreButton.style.transform = 'scale(1.2)'
        skillUniverseXtra.classList.add('visible');
        
    }
    else{
        seeMoreButton.clicked = false;
        seeMoreButton.style.transform = 'scale(1)'
        skillUniverseXtra.classList.remove('visible');
    }
}

seeMoreButton.addEventListener('hover', function(){
    seeMoreButton.style.cssText = 'transform: scale(1.2);'
})


let skillsSegment = document.getElementById('skills')
function createStars(){
    prevStars = document.querySelectorAll('.star')
    prevStars.forEach(function(el){
        el.style.display = 'none'
    })
    let numberOfStars = 200

    if(document.body.clientWidth >= 700){
        numberOfStars = 150;
        
    }else if (document.body.clientWidth < 700){
        numberOfStars = 90;
    }

    for (let i = 0; i < numberOfStars; i++) {
            let randomTop = getRndInteger(10, skillsSegment.clientHeight - 20 );
            let randomLeft = getRndInteger(10, skillsSegment.clientWidth - 20)
            let star = document.createElement('span');
            star.style.cssText = `    position: absolute;
                                        top: ${randomTop}px;
                                        left: ${randomLeft}px;

                                        width: 2px;
                                        height: 2px;
                                        border-radius: 50%;
                                        background-color: white;
                                        box-shadow: 0 0 10px whitesmoke;     
                                        z-index: -1;`
            star.classList.add('star')
            skillsSegment.appendChild(star)

    }
}
createStars();
window.onresize = createStars;


let mouseX = 0;
let mouseY = 0;
function handleTouchActivity(event){
  event.preventDefault(); // we don't want to scroll
  var touch = event.touches[0];
  var x = touch.clientX;
  var y = touch.clientY;
  return [x,y]
}

let projectSegment = document.getElementById('projects');
let slider = document.querySelector('.slider');

let lastDeltaPercentage = 0;

let sliderImages = document.querySelectorAll('.image-canvas img');

let instructions = document.querySelector('#projects .instructions');

projectSegment.onmousedown = e =>{
    slider.dataset.mouseDownAt = e.clientX
    instructions.style.opacity = '0'
}
projectSegment.addEventListener('touchstart', function(event){
    let cords= handleTouchActivity(event);
    mouseX = cords[0];
    mouseY = cords[1];
    slider.dataset.mouseDownAt = mouseX
    slider.dataset.mouseDownAtY = mouseY
    instructions.style.opacity = '0'
    

})

projectSegment.addEventListener('touchmove', function(event){
    if(slider.dataset.mouseDownAt == '0'){return}
    let cords= handleTouchActivity(event);
    mouseX = cords[0];
    mouseY = cords[1];

    let moveDelta = parseFloat(slider.dataset.mouseDownAt) - mouseX
    let maxDelta = innerWidth 

    let deltaPercentage = (moveDelta / maxDelta) * -100
    lastDeltaPercentage = deltaPercentage + parseInt(slider.dataset.doneDeltaPercentage)
    if(lastDeltaPercentage < -100 || lastDeltaPercentage > 0) return;


    slider.animate(
        {transform: `translate(${lastDeltaPercentage}%, -90%)`},
        {duration: 1400,
        fill: 'forwards'}
    )

    sliderImages.forEach(
            function(el){
                el.animate(
                    {objectPosition: `${lastDeltaPercentage * -10 - 100}% 0%`},
                {duration: 1400,
                fill: 'forwards'}
                )
            }
        )
        // ------------------------------------
        // now for the Y touch scroll

    let moveDeltaY = parseFloat(slider.dataset.mouseDownAtY) - mouseY
    if(moveDeltaY < 100 && moveDeltaY > -100){return}
    else{
    window.scrollBy({
        left: 0,
        top: moveDeltaY,
        behavior: 'smooth'
    })}
})
projectSegment.onmousemove = e =>{
    if(slider.dataset.mouseDownAt == '0'){return}

    let moveDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX
    let maxDelta = innerWidth 

    let deltaPercentage = (moveDelta / maxDelta) * -100
    lastDeltaPercentage = deltaPercentage + parseInt(slider.dataset.doneDeltaPercentage)
    if(lastDeltaPercentage < -100 || lastDeltaPercentage > 0) return;


    slider.animate(
        {transform: `translate(${lastDeltaPercentage}%, -90%)`},
        {duration: 1400,
        fill: 'forwards'}
    )

    sliderImages.forEach(
            function(el){
                el.animate(
                    {objectPosition: `${lastDeltaPercentage * -10 - 100}% 0%`},
                {duration: 1400,
                fill: 'forwards'}
                )
            }
        )
    }
    
projectSegment.addEventListener('touchend', function(event){
    slider.dataset.mouseDownAt = '0'
    if(lastDeltaPercentage < -100 || lastDeltaPercentage > 0) return;
    slider.dataset.doneDeltaPercentage = lastDeltaPercentage


})
projectSegment.onmouseup = e =>{
    slider.dataset.mouseDownAt = '0'
    if(lastDeltaPercentage < -100 || lastDeltaPercentage > 0) return;
    slider.dataset.doneDeltaPercentage = lastDeltaPercentage

}
let imageCanvas = document.querySelectorAll('.image-canvas')
let imageHover = document.querySelectorAll('.slider .image-hover')
let visitProjectButton = document.querySelectorAll('.slider .visit-project');
let projectsURL = ['Projects/full-digital-agency-intro/digital-agency-website.html',
    'Projects/Kasper-agency/Kasper.html',
    'Projects/testimonials-grid-section/testimonial-review.html',
    'Projects/pricing-table/pricing-table.html',
    'Projects/Choose-Interests/choose-interests.html',
    'Projects/login-form/login-form.html',
    'Projects/Gym-Intro/gym-intro.html']

imageCanvas.forEach((ele, i) =>{
    ele.addEventListener('touchstart', function(){
        if(ele.dataset.touched == '0'){
            ele.dataset.touched = '1'
            imageHover[i].style.transform = `translateY(0px)`
            sliderImages[i].style.filter = 'blur(2px)'

        }
        else if(ele.dataset.touched == '1'){
            ele.dataset.touched = '0'
            imageHover[i].style.transform = `translateY(100%)`
            sliderImages[i].style.filter = 'blur(0px)'
        }
    })


    ele.onmouseover = function(){
        imageHover[i].style.transform = `translateY(0px)`
        sliderImages[i].style.filter = 'blur(2px)'
    }
})

imageCanvas.forEach((ele, i) =>{
    ele.onmouseleave = function(){
        imageHover[i].style.transform = `translateY(100%)`
        sliderImages[i].style.filter = 'blur(0px)'
    }
})

function goToProject(url){
    window.location = url
}

visitProjectButton.forEach(function(ele, i){
    ele.onclick = () =>{goToProject(projectsURL[i])}
    ele.addEventListener('touchstart', () =>{goToProject(projectsURL[i])})
})


//make sure that the slider doesn't create a scrollbar + not shifting the viewport to the right neglecting the main content
window.onload= function(){
        
    window.scrollTo({
        top:0,
        left: 0,
        behavior: 'instant'
    });
}

window.scrollTo({
    top:0,
    left: 0,
    behavior: 'instant'
});
document.body.style.overflowX = 'hidden';
