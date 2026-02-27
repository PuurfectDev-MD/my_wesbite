import './style.css';
import  {projects} from './project'
import { beenInfo } from './been'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrollTrigger)

gsap.set(".been_svg_item path", {visibility:"visible"})

const beenAtcount = 7
const main_pg_drawings = document.querySelectorAll(".project-drawing");
const svg_item = document.querySelector("#svg_item_main")

if (svg_item){
  window.addEventListener('load', () => {
    const path =svg_item.querySelector("path")
    if (!path) return

    const totalLength = path.getTotalLength()
    const numDots =20

    for(let i=0; i<numDots; i++){
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      const distance = Math.random() * totalLength

      const point = path.getPointAtLength(distance)

      circle.setAttribute("cx", point.x)
      circle.setAttribute("cy", point.y)

      circle.setAttribute("r", Math.random()*10 +5)
      var color = Math.floor(Math.random()*3)
      var colorValue
      if(color ==0){
          colorValue= "oklch(51.4% 0.222 16.935)" 
        }else if (color ==1){
          colorValue ="oklch(62.7% 0.194 149.214)"
        }else{
          colorValue = "oklch(54.6% 0.245 262.881)"
        }

      circle.setAttribute("fill", colorValue )
      circle.classList.add("flicker-dot")
      circle.style.animationDelay = `${Math.random() *2}s`

      svg_item.appendChild(circle)
    }
  })
}

if (main_pg_drawings.length >0){  /*checks if drawings exist and then listens for events  -this way the js doesnt crash in a different page */
    main_pg_drawings.forEach((drawing) =>{
    setTimeout(() => {
        drawing.style.opacity ="1"
    },50)
    
    drawing.addEventListener("click", ()=>{
          window.location.href= "/pages/project.html"
          console.log("Project clicked")
    })

  })

}


// for project page
const searchInput = document.getElementById("search_input")
const projectGrid = document.getElementById("project-grid")


if (projectGrid){

  const projectCards = projects.map(project =>
    ` <div class="bg-card-background p-6 rounded-2xl transition-all  border-2 text-card-text dark:border-amber-100  hover:border-3 hover:scale-105 dark:text-black dark:hover:shadow-[0_0_20px_rgba(251,191,36,0.8)]">
           <a href= "${project.link}">
            <h2 class="font-bitcountGridDouble_medium text-2xl">${project.title}</h2>
            <p class="py-4 font-schoolbell">${project.description}</p>
            </a>
        </div>`
  ).join('')
  
    projectGrid.innerHTML = projectCards

    searchInput.addEventListener('input', function(e){
      if (e.searchInput != ""){
        const searchTerm = e.target.value.toLowerCase()
        handleSearch(searchTerm)
      }
    })

    searchInput.addEventListener(('focus'), () =>{
      searchInput.style.transform = "scale(1.05)"
    })
    
    searchInput.addEventListener(('blur'), () =>{
      searchInput.style.transform = "scale(1.0)"
    })
}


function handleSearch(query){
  const LcQuery = query.toLowerCase()
  console.log("Seraching for: ", query)
  var search_display = []
  projects.forEach((project) => {
    const titleMatch = project.title.toLowerCase().includes(LcQuery)
    const tagMatch = project.tags.some(tag => tag.toLowerCase().includes(LcQuery))
    if (titleMatch || tagMatch){
      var search_result =  ` <div class="bg-card-background p-6 rounded-2xl transition-all border border-card-hover border-2 text-card-text hover:border-black hover:border-3 hover:scale-105 dark:text-black">
           <a href= "${project.link}">
            <h2 class="font-bitcountGridDouble_medium text-2xl">${project.title}</h2>
            <p class="py-4 font-schoolbell">${project.description}</p>
            </a>
        </div>`
        search_display.push(search_result)
    }
  }
)

projectGrid.innerHTML = search_display.join('')
  }


// for .been page



const cardElements = []
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrambleTextPlugin)
gsap.set(".hero_text", {visibility:"visible"})  //only sets them visible when the js file loads for smooth effect
gsap.set(".second_text", {visibility:"visible"})

document.fonts.ready.then(() => {  //for the scroll text 
    gsap.to(".second_text", {
    duration: 1, 
    scrambleText: {
      text: "Scroll >>>", 
      chars: "???#### :((( :)))", 
      revealDelay: 1, 
      speed: 0.5
    }
    })


    let split= SplitText.create(".hero_text",{  //split text animation for the main text
    type: "chars, words",
    wordsClass: "word++",
    } )

    gsap.from(split.chars,{   
    yPercent: "random([100,100])",
    rotation: "random(-30,30)",
    ease: "back.out",
    autoAlpha:0,
    stagger: {
      each: 0.06,
      from: "random",
    }

    })

})





const been_placeholder = document.getElementById("been_placeholder")

if (been_placeholder){
  console.log("Beeninfo placeholder found")
  const parser = new DOMParser();
  beenInfo.forEach((been) =>{
    const beenDisplay = `<div class="been-card w-full h-full fixed md:inset-0 top-5 left-0 flex items-center justify-center pointer-events-none z-0">
                <div class="glowXl bg-been_card_background md:p-10 p-4 rounded-2xl pointer-events-auto border-been_border_card text-been_text_card" style="width: 80%; max-width: 800px;">
                    <h1 class="font-bold font-pixelify_bold text-2xl md:text-4xl">Been ${been.connecter}</h1>
                    <div class="grid grid-cols-2 md:gap-8 gap-6">
                        <div>
                            <h2 class="mt-5 font-pixelify_bold">${been.title}</h2>
                            <p class= "mt-2 md:block hidden font-doto_semibold">> ${been.description}</p>
                                <p class="md:block hidden font-doto_semibold pt-2">(?) ${been.comments}</p>
                          
                        </div>
                        <div class="flex gap-2">
                        ${been.photos[0] ? ` <img src="${been.photos[0]}"class="md:block md:w-1/2 h-auto w-full object-cover">` 
                        : `<p class="font-doto_semibold"> :( </p>` }

                            ${been.photos[1] ? ` <img src="${been.photos[1]}"class="md:block hidden w-1/2 h-auto object-cover" >` 
                        : `<p class="font-doto_semibold "> :( </p>` }

                        </div>
                          <div>

                             <p class="pt-4 md:block font-bitcountGridDouble_medium text-md">> ${been.date}</p>
                             ${been.resources ?  been.resources.map(resource => `
                                          <p> >
                                            <a href="${resource}" target="_blank" class="underline text-blue-400 hover:text-blue-200">
                                              ${resource}
                                            </a>
                                          </p>
                                        `).join(``) : '<p class="font-doto_semibold pt-2">> No resources :(</p>'
                             }
                           </div>

                            ${been.video ? `<video class="relative right-0 pointer-events-auto" width="640" height= "auto" controls preload="none">
                          <source src="${been.video}" type="video/mp4"> 
                          </video>` : `
                          <p class="text-xl md:text-2xl p-4 font-doto_semibold text-center"> No vid :(</p>
                          ` }
                      
                        <div class= "grid grid-cols-2 gap-8 ">
                        
                        
                      
                </div>
            </div>`.trim()

        const doc = parser.parseFromString(beenDisplay, 'text/html')
        const cardNode = doc.body.firstChild
        gsap.set(cardNode, {
          opacity:0,
           y:30,
          })
        cardElements.push(cardNode)
        been_placeholder.appendChild(cardNode);
  })

  const been_svg_item = document.querySelector("#been_svg_item")
  const path = been_svg_item.querySelector("path")
  
  if (path){
      console.log("Height set for svg")
      const pathLength = path.getTotalLength()
      console.log(pathLength)
      
      gsap.set(path, {strokeDasharray:pathLength})

        const restrictedLength = 2500
        const availableLength = pathLength-restrictedLength
        const segmentLegnth = availableLength/beenAtcount
        let attempts = 0
        let maxattempts = 500
        let placedDots = 0

        while (attempts <maxattempts && placedDots <beenAtcount){
          attempts ++
          const randomPointPlace =restrictedLength + (placedDots*segmentLegnth) 
          const Cardpoint = path.getPointAtLength(randomPointPlace)

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", Cardpoint.x)
          circle.setAttribute("cy", Cardpoint.y)
          circle.setAttribute("r", 50)
          circle.setAttribute("fill", "red")
          circle.style.zIndex = "100"
          circle.style.opacity = "0"
          circle.style.pointerEvents = "auto"
          circle.style.cursor = "pointer"
          circle.dataset.index = placedDots
          circle.dataset.distance = randomPointPlace
          circle.classList.add("attentionDot")
          
          been_svg_item.querySelector("svg").appendChild(circle)
        
          const currentCard = cardElements[placedDots]

          gsap.set(currentCard, {
            y: Cardpoint.y
          })

            placedDots ++


        }

        gsap.fromTo(
          path,{
            strokeDashoffset: pathLength,
          },
          {
            strokeDashoffset: 0,
            duration:10,
            ease:"none",
            scrollTrigger:{
              trigger:"#been_svg_item",
              start: "top top",
              end: "bottom bottom",
              scrub:1,
              onUpdate: (self) => {

                const currentlengthDrawn = pathLength * self.progress
                console.log("current legnth draw" + currentlengthDrawn)
                const dots = document.querySelectorAll(".attentionDot")
              

                dots.forEach((dot) =>{
                  const dotDistance = parseFloat(dot.dataset.distance)
                  const dotVisible = dot.getAttribute("data-visible") === "true"
                  console.log("dotdistance= " + dotDistance)

                  const cardIndex = dot.dataset.index
                  const targetElement = cardElements[cardIndex]

                  

                  if (currentlengthDrawn >= dotDistance){  // this compares the dot distance for all dots to see if its passed the stroke
                    if(!dotVisible){  // if the dot is farther from the stroke and is notvisbile then turns on visibiltity
                      dot.setAttribute("data-visible","true")
                      gsap.to(dot, {opacity:1, duration: 0.3,overwrite: "auto"})
                      dot.style.animation = "scaleAndBlur 2s infinite ease-in-out";  // for the dot blinking


                      cardElements.forEach((card, idx) =>{ //loops through all the cards with idx as index
                        if(idx!= cardIndex){ // slects only the one that is not the current becasue current one should be visible
                          gsap.to(card, { 
                            opacity: 0, 
                            y: -20, 
                            autoAlpha:0,
                            duration: 0.4, 
                            pointerEvents: "none",
                            overwrite: "auto" ,

                        });
                        }
                      })

                      gsap.to(targetElement,{  
                        opacity:1,
                        overwrite: "auto",
                        duration: 0.8,
                        autoAlpha:1,
                        y:0,
                        pointerEvents:"auto"
                    
                      })
                      
                    }
                    
                  }else{  // if the dots are up the stroke as in at a distance less than stroke then it hides it 
                    if (dotVisible){
                      dot.setAttribute("data-visible", "false")
                      dot.style.animation = "none"
                      gsap.to(dot,{opacity:0, duration:0.3, overwrite: "auto" })


                      gsap.to(targetElement,{
                        opacity:0,
                        overwrite: "auto",
                        duration: 0.8,
                        y:30,
                        pointerEvents: "none"

                      })
                      
                    }
                    
                  }

                })

              }
            }
          }

        )


  }else{
    console.log("couldnt calculate length")
  }

   
}






