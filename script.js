
const canvas = document.querySelector('#canvas');
const context = canvas.getContext("2d");


const frames = {
    currentIndex: 0,
    maxIndex:538
}

const images = [];

let imagesLoaded = 0;


function preloadImages(){
    for(var i = 1; i<=frames.maxIndex; i++){
        const imageUrl = `./compressed_images/frame_${i.toString().padStart(4,"0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;

        img.onload = function (){
            imagesLoaded++;
            if(imagesLoaded === frames.maxIndex){
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }

        images.push(img);
    }
}

function loadImage(index){
    if(index >= 0 && index<= frames.maxIndex){
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;



    }
}

function startAnimation(){
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger : ".parent",
            start: "top top",
            scrub:2,
            end: "bottom bottom"
        }
    })

    function updateFrame(index){
        return{
            currentIndex: index,
            onUpdate: function(){
            loadImage(Math.floor(frames.currentIndex));
        }
        }
    }

    t1
    .to(frames, updateFrame(50),"a")
    .to(".animate1",{opacity : 0, ease: "linear"},"a")

    .to(frames, updateFrame(85),"b")
    .to(".animate2",{opacity : 1, ease: "linear"},"b")

    .to(frames, updateFrame(120),"c")
    .to(".animate2",{opacity : 0, ease: "linear"},"c")

    .to(frames, updateFrame(155),"d")
    .to(".animate3",{opacity : 1, ease: "linear"},"d")

    .to(frames, updateFrame(170),"e")
    .to(".animate3",{opacity : 1, ease: "linear"},"e")

    .to(frames, updateFrame(200),"f")
    .to(".animate3",{opacity : 0, ease: "linear"},"f")

    .to(frames, updateFrame(230),"g")
    .to(".panel",{x:"0%", ease: "expo"},"g")

    .to(frames, updateFrame(250),"h")
    .to(".panel",{x:"-150%", ease: "expo"},"h")

    .to(frames, updateFrame(250),"h")
    .to(".panel",{scale: 0.3, ease: "expo"},"h")

    .to(frames, updateFrame(270),"i")
    .to(".panel",{x:"-200%", ease: "expo"},"i")

    .to(frames, updateFrame(270),"i")
    .to(".panel",{scale: 1, ease: "expo"},"i")

    .to(frames, updateFrame(280),"j")
    .to(".panel",{x:"-300%", ease: "expo"},"j")

    .to(frames, updateFrame(310),"k")
    .to("canvas",{scale:0.5, ease: "liner"},"k")

    .to(frames, updateFrame(320),"l")
    .to(".panelism",{opacity:1, ease: "expo"},"l")

    .to(frames, updateFrame(325),"m")
    .to(".panelism span",{width: 200, ease: "expo"},"m")

    .to(frames, updateFrame(350),"n")
    .to("canvas",{scale:1, ease: "liner"},"n")

    .to(frames, updateFrame(380),"o")
    .to(".panelism",{scale:3, ease: "circ"},"o")

    .to(frames, updateFrame(538),"p")
    .to(".panelism",{opacity:0, ease: "expo"},"p")

}

window.addEventListener("resize",function(){
    loadImage(Math.floor(frames.currentIndex));
})

preloadImages();

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

document.querySelectorAll(".headings h3")
    .forEach(function (elem){
    gsap.from(elem, {
        scrollTrigger:{
            trigger: elem,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 2
        },

        opacity:0.3
    })
})