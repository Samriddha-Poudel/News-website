const api_key = "77427715f52c4ca2ba93642c741a7a8f";
const url="https://newsapi.org/v2/everything?q="


window.addEventListener('load', () => fetchNews("Nepal"))

async function fetchNews(query){

   
        const response= await fetch(`${url}${query}&apikey=${api_key}`)
    const data= await response.json();
    console.log(data);
    bindData(data.articles);

    }



    function bindData(articles){
        const cardsContainer=document.getElementById("cards-container");
        const newsTemplate=document.getElementById("template-news-card");

        cardsContainer.innerHTML="";

        articles.forEach(article => {
            if(!article.urlToImage) return;
            const cardClone=newsTemplate.content.cloneNode(true);
            filldataInCard(cardClone,article);
            cardsContainer.appendChild(cardClone);
        })
    }


    function filldataInCard(cardClone,article){
        const newsImg= cardClone.querySelector("#news-img");
        const newsTitle=cardClone.querySelector("#news-title");
const newsSource=cardClone.querySelector("#news-source");
const newsDesc=cardClone.querySelector("#news-decs");


newsImg.src=article.urlToImage;
newsTitle.innerHTML=article.title;
newsDesc.innerHTML=article.description;




const date=new Date(article.publishedAt).toLocaleString("en-us",{
    timezone:"Asia/Kathmandu"
});


newsSource.innerHTML=`${article.source.name}. ${date}`;

cardClone.firstElementChild.addEventListener('click',() => {
    window.open(article.url,"_blank");
});


        
    }


    let currentSelectedNav= null;
function onnavitemclick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav= navitem;
    currentSelectedNav.classList.add("active");

    
}
const input=document.getElementById("searchtext");
const searchbtn=document.getElementById("searchbtn");

searchbtn.addEventListener('click',() =>{
    const query=input.value;
    if(!query) return;
    fetchNews(query);

})