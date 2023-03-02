const fetchCategories = async () => {
    const URL = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(URL)
    const data = await res.json();
    showCategories(data.data);
};

const showCategories = data => {
    // console.log(data);
    // capture categories container
    const categoriesContainer = document.getElementById('categorie-container');
    data.news_category.forEach(singleCategories => {
        // console.log(singleCategories);
        // step:1(shourtcut way)
        // categoriesContainer.innerHTML += `<a href="#">${singleCategories?.category_name}</a>`
        // step:2(normal way)
        const linkContainer = document.createElement('p')
        linkContainer.innerHTML = `<a href="#" onclick="fetchCategoryNews('${singleCategories.category_id}', '${singleCategories.category_name}')">${singleCategories.category_name}</a>`;
        categoriesContainer.appendChild(linkContainer);
        
    })
    
}

// fetch all news available in a category

const fetchCategoryNews = (categoryId, categoryName) => {
    const URL = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => showAllNews(data.data, categoryName));
}


const showAllNews = (data, categoryName) => {
    // console.log(data, categoryName);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('catagory-name').innerText = categoryName;
    
    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = "";
    data.forEach(singleNews => {
      const {image_url,title,details,author, _id} = singleNews;
        newsContainer.innerHTML += `<div class="card lg:card-side bg-base-100 shadow-2xl my-5">
        <div class="w-full">
        <figure><img class="p-2" src="${image_url}" alt="Album"/></figure>
        </div>
        <div class="card-body w-full">
          <h2 class="card-title">${title}</h2>
          <p>${details.slice(0,200)}...</p>
          <div class="border-0 flex justify-between items-center">
            <div class="flex gap-2 items-center">
              <div>
                <figure><img class=" w-14 h-14 rounded-full" src="${author.img}"></figure>
              </div>
              <div>
                 <p class="font-semibold p-0 m-0">${singleNews.author.name}</p>
                 <p class="p-0 m-0">${singleNews.author.published_date}</p>
              </div>
            </div>
           <div class="flex items-center">
             <i class="fa-solid fa-eye"></i>
             <p>${singleNews.total_view}</p>
           </div>
           <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
           </div>
           <div>
              
           </div>
           <div onclick="fetchAllDetails('${_id}')">
           <!-- The button to open modal -->
           <label for="my-modal"><i class="fa-solid fa-arrow-right" onclick="fetchAllDetails('${_id}')"></i></label>
           
           <!-- Put this part before </body> tag -->
           <input type="checkbox" id="my-modal" class="modal-toggle" />
           <div class="modal">
             <div class="modal-box">
               <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
               <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
               <div class="modal-action">
                 <label for="my-modal" class="btn">Yay!</label>
               </div>
             </div>
           </div>
           </div>
         </div>
        </div> 
      </div>`;

    })
}

const fetchAllDetails = (news_id) => {
  const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => showNewsDetails(data.data[0]))
}



