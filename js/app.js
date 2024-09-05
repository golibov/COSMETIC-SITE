"use strict"

let dogs = document.querySelector(".dogs")
let search = document.querySelector(".search")

function getRequest() {
    axios.get("https://dummyjson.com/products").then(res => {
        localStorage.setItem("products", JSON.stringify(res.data.products))
        res.data.products.map(item => {
            let elItem = document.createElement("li")
            elItem.className = "w-[400px] bg-[#1f2937] p-5 rounded-lg"
            elItem.innerHTML = `
         <img class="object-contain h-[200px] bg-white rounded-[20px]"src="${item.images[0]}" alt="Product" width="100%" height="70"/>
         <h2 class="text-[20px] text-white font-bold pb-[5px]">${item.title}</h2>
         <p class="line-clamp-3 text-white ">${item.description}</p>
         <button onclick="sendTelegram(${item.id})" class="text-[15px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5  rounded">Send message</button>
         <button onclick="deleted(${item.id})" class="text-[15px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-5  rounded">deleted</button>

         `
            dogs.appendChild(elItem)
        })
    })
}

getRequest()



const TOKEN = "7453900594:AAG-ahB7BivY8r9MVWThTe-mlw7dshhrxHs";
const CHAT_ID = "-1002149897275"
const HTTP = `https://api.telegram.org/bot${TOKEN}/sendMessage`


function sendTelegram(id) {
    axios.get(`https://dummyjson.com/products/${id} `).then(res => {
        console.log(res);
        let message = `<b>Product Info:</b>\n`;
        message += `<b> Product name: ${res.data.title}</b>\n`
        message += `<b> Product description: ${res.data.description}</b>\n`
        axios.post(HTTP, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message
        })


    })
}




function deleted(id) {
    axios
        .delete(`https://dummyjson.com/products/${id}`)
        .then((res) => {
            console.log(`Product with ID: ${id} deleted successfully`, res.data);

            // Mahsulotni ro'yxatdan o'chirib tashlaymiz
            const products = JSON.parse(localStorage.getItem("products"));
            const updatedProducts = products.filter((item) => item.id !== id);
            localStorage.setItem("products", JSON.stringify(updatedProducts));

            // HTML dan ham o'chirish
            dogs.innerHTML = "";
            updatedProducts.forEach((item) => {
                let elItem = document.createElement("li");
                elItem.className = "w-[400px] bg-[#1f2937] p-5 rounded-lg";
                elItem.innerHTML = `
          <img class="object-contain h-[200px] bg-white rounded-[20px]" src="${item.images[0]}" alt="Product" width="100%" height="70"/>
          <h2 class="text-[20px] text-white font-bold pb-[5px]">${item.title}</h2>
          <p class="line-clamp-3 text-white ">${item.description}</p>
          <button onclick="sendTelegram(${item.id})" class="text-[15px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5  rounded">Send message</button>
          <button onclick="deleted(${item.id})" class="text-[15px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-5  rounded">Delete</button>
        `;
                dogs.appendChild(elItem);
            });
        })

}



search.addEventListener("keyup", (e) => {
    let value = e.target.value
    let filtered = JSON.parse(localStorage.getItem("products")).filter(item => item.title.toLowerCase().includes(value.toLowerCase()))

    dogs.innerHTML = ""

    filtered.map(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[400px] bg-[#1f2937] p-5 rounded-lg"
        elItem.innerHTML = `
         <img class="object-contain h-[200px] bg-white rounded-[20px]"src="${item.images[0]}" alt="Product" width="100%" height="70"/>
         <h2 class="text-[20px] text-white font-bold pb-[5px]">${item.title}</h2>
         <p class="line-clamp-3 text-white ">${item.description}</p>
         <button onclick="sendTelegram(${item.id})" class="text-[15px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5  rounded">Send message</button>
         <button onclick="deleted(${item.id})" class="text-[15px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-5  rounded">deleted</button>

         `
        dogs.appendChild(elItem)
    })
})