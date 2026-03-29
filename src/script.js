const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")
const emptySrchBarMsg = document.getElementById("empty-srch-bar-msg")
const message = document.getElementById("message")
const resultCount = document.getElementById("result-count")
const countryCards = document.getElementById("country-cards")
const filterBtns = document.querySelectorAll(".filter-btn")
const countryDetails = document.getElementById("country-details")
const currentDate = document.getElementById("current-date")
const logo = document.getElementById("logo")
console.log("hello")

function setDate(){
    const today = new Date()
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    const todayDate = today.toLocaleDateString("en-US", options)
    
    currentDate.textContent = todayDate.toUpperCase()
}
setDate()



async function search(){
    resetUI()
    const searchInput = searchBar.value.trim()
    if(searchInput === ""){
        message.classList.add("hidden")
        message.classList.remove("flex")
        emptySrchBarMsg.classList.remove("hidden")
        emptySrchBarMsg.classList.add("flex")
        document.getElementById("after-search").classList.add("hidden")

        
    } else{
        try{
            message.classList.add("hidden")
            message.classList.remove("flex")
            emptySrchBarMsg.classList.remove("flex")
            emptySrchBarMsg.classList.add("hidden")
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
            const data = await response.json()
            // countryCards.innerHTML = ``
            // resultCount.innerHTML = `
            //     <span class="text-3xl text-indigo-600 font-bold font-serif ">${data.length} results</span>
            //     <span class="px-3 text-white text-2xl font-[Dancing_Script]">for "${searchInput}"</span>`
            // data.forEach(country => {
            //     let countryCard = `
            //         <div class="my-3 bg-amber-200  mx-4">
            //             <div>
            //                 <img src="${country.flags.png}" alt="${country.name.common}" class="h-50 w-auto py-3 px-4">
            //             </div>
            //             <div class="py-3">
            //                 <p id="country" class="text-2xl font-serif text-indigo-700 px-5">${country.name.common}</p>
            //                 <p id="continent" class="text-green-800 font-bold px-5">${country.region}</p>
            //             </div>
            //         </div>`
            //     countryCards.innerHTML += countryCard
            // }); 
            displayCards(data, searchInput)

            console.log(data)
        } catch{
            console.log("some error")
        }
    }
}

async function fetchByRegion(region) {
    resetUI()
    try{
        message.classList.add("hidden")
        message.classList.remove("flex")
        emptySrchBarMsg.classList.remove("flex")
        emptySrchBarMsg.classList.add("hidden")
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await response.json()
        console.log(data)
        displayCards(data, region)
    } catch(error){
        console.error(error)
    }
}

function displayCards(data, searchArea){
    countryCards.innerHTML = ``
    resultCount.innerHTML = `
                <span class="text-3xl text-indigo-600 font-bold font-serif">${data.length} results</span>
                <span class="px-3 text-white text-2xl font-[Dancing_Script]">for "${searchArea}"</span>`
    data.forEach(country => {
        let countryCard = document.createElement("div")
        countryCard.className = "my-3 bg-amber-200  mx-4 countryCard hover:cursor-pointer"
        countryCard.innerHTML = `
                        <div>
                            <img src="${country.flags.png}" alt="${country.name.common}" class="h-50 w-auto py-3 px-4">
                        </div>
                        <div class="py-3">
                            <p id="country" class="text-2xl font-serif text-indigo-700 px-5">${country.name.common}</p>
                            <p id="continent" class="text-green-800 font-bold px-5">${country.region}</p>
                        </div>`
        countryCard.addEventListener("click", () => {
            console.log("clicked")
            displayDetails(country)
        })
        countryCards.appendChild(countryCard)
    });
}

async function displayDetails(country) {
    try{
        // message.classList.add("hidden")
        // message.classList.remove("flex")
        emptySrchBarMsg.classList.remove("flex")
        emptySrchBarMsg.classList.add("hidden")
        countryDetails.classList.remove("hidden")
        countryDetails.classList.add("flex")
        document.getElementById("after-search").classList.add("hidden")
        // countryCards.classList.add("hidden")
        // countryCards.classList.remove("flex")
        


        countryDetails.innerHTML = `<div>
                    <div class="flex">
                        <p class="px-4 py-1 tracking-widest border border-amber-200">${country.region}</p>
                        <p class="mx-6 px-4 py-1 border border-amber-200">${country.subregion}</p>
                        <p class="px-4 py-1 border border-amber-200">${country.cca3}</p>
                    </div>
                    <div class="my-4">
                        <p class="text-5xl font-serif font-extrabold text-blue-600">${country.name.common}</p>
                        <p class="text-2xl text-green-600 font-[Dancing_Script] font-extrabold my-2">${country.name.official}</p>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row bg-amber-300">
                    <div>
                        <img src="${country.flags.png}" class="h-full w-100" alt="flag">
                    </div>
                    <div>
                        <div class="grid grid-cols-2 px-12 py-8 gap-y-6 gap-x-16">
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">CAPITAL</p>
                                <p class="text-white text-xl">${country.capital}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">POPULATION</p>
                                <p class="text-white text-xl">${country.population}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">AREA</p>
                                <span class="text-white text-xl">${country.area} <span>km<sup>2</sup></span></span>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">CURRENCY</p>
                                <p class="text-white text-xl">${Object.values(country.currencies).map(c => c.name).join(", ")}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">LANGUAGES</p>
                                <p class="text-white text-xl">${Object.values(country.languages).join(", ")}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">DRIVING SIDE</p>
                                <p class="text-white text-xl">${country.car.side}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">CALLING CODE</p>
                                <p class="text-white text-xl">${country.idd.root}${country.idd.suffixes}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">TIME ZONE</p>
                                <p class="text-white text-xl">${country.timezones}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">UN MEMBER</p>
                                <p class="text-white text-xl">${country.unMember ? "Yes": "No"}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">LANDLOCKED</p>
                                <p class="text-white text-xl">${country.landlocked ? "Yes":"No"}</p>
                            </div>
                            <div>
                                <p class="text-green-600 tracking-widest font-bold text-xs">BORDERING COUNTRIES</p>
                                <div class="text-white text-xl">
                                    <p>${country.borders || "No bordering country"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    } catch{
        console.log("some error")
    }
}
function resetUI(){
    countryDetails.classList.add("hidden")
    document.getElementById("after-search").classList.remove("hidden")
}

async function fetchAllCountries(){
    resetUI()

    try{
        const response = await fetch("https://restcountries.com/v3.1/all")
        const data = await response.json()
        displayCards(data, "All Countries")
    } catch(error){
        console.error(error)
    }
}

function logoClick(){
    resetUI()
    message.classList.add("flex")
    message.classList.remove("hidden")
    emptySrchBarMsg.classList.remove("flex")
    emptySrchBarMsg.classList.add("hidden")
    document.getElementById("after-search").classList.add("hidden")

}


filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const region = btn.getAttribute("data-region")
        if(region === ""){
            fetchAllCountries()
        }else{
            fetchByRegion(region)
        }
        
    })
})

searchBtn.addEventListener('click', search)
logo.addEventListener("click", logoClick)


