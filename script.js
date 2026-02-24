import './style.css';
import  {projects} from './project'
import { beenInfo } from './been'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

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

const been_placeholder = document.getElementById("been_placeholder")

if (been_placeholder){
  console.log("Beeninfo placeholder found")
 

  const beenDisplay = beenInfo.map(been =>
    ` <div class= "w-screen z-10">
        <h1 class=" font-bold font-pixelify_bold text-4xl pl-10">Been ${been.connecter}</h1>
        <div class="grid grid-cols-2">
            <div class= " p-[10%]">
                  <h2 class="">${been.title}</h2>
                    <p>${been.description}</p>
                    <p>${been.date}</p>
            </div>
            <div>
                <img src="${been.photos[0]}" class= "w-[30%] h-[60%]">
                 <img src="${been.photos[1]}" class= "w-[30%] h-[60%]">


            </div>
      
        </div>

    </div>`
  ).join(``)

  been_placeholder.innerHTML = beenDisplay

  const been_svg_item = document.querySelector("#been_svg_item")
  const path = been_svg_item.querySelector("path")
  
  if (path){
      const content_height = (been_placeholder.scrollHeight) + 450
      been_svg_item.style.height = content_height + "px"
      console.log("Height set for svg")
      const pathLength = path.getTotalLength()
      console.log(pathLength)
      
      gsap.set(path, {strokeDasharray:pathLength})

        const restrictedLength = 1300
        const availableLength = pathLength-restrictedLength
        const segmentLegnth = availableLength/beenAtcount
        let attempts = 0
        let maxattempts = 500
        let placedDots = 0

        while (attempts <maxattempts && placedDots <beenAtcount){
          attempts ++
          const minRange = restrictedLength + (placedDots*segmentLegnth)

          const randomWithinSegment = Math.random()* segmentLegnth
          const randomPointPlace = minRange + randomWithinSegment
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
          circle.dataset.distance = randomPointPlace
          circle.classList.add("attentionDot")
          
          been_svg_item.querySelector("svg").appendChild(circle)
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

                  if (currentlengthDrawn >= dotDistance){
                    if(!dotVisible){
                      dot.setAttribute("data-visible","true")
                      gsap.to(dot, {opacity:1, duration: 0.3,overwrite: "auto"})
                      dot.style.animation = "scaleAndBlur 2s infinite ease-in-out";
                      
                    }
                    
                  }else{
                    if (dotVisible){
                      dot.setAttribute("data-visible", "false")
                      dot.style.animation = "none"
                      gsap.to(dot,{opacity:0, duration:0.3, overwrite: "auto" })
                      
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






