const api_key = "4e0ed31d-6f95-46ae-b369-3b124776f934";
const url="https://content.guardianapis.com/search?q="


window.addEventListener('load', () => fetchNews("Nepal"))

async function fetchNews(query){

   
        const response = await fetch(`${url}${query}&api-key=${api_key}&show-fields=thumbnail,trailText,headline&page-size=20`)
    const data= await response.json();
    console.log(data);
    bindData(data.response.results);

    }



    function bindData(articles){
        const cardsContainer=document.getElementById("cards-container");
        const newsTemplate=document.getElementById("template-news-card");

        cardsContainer.innerHTML="";

        articles.forEach(article => {
            if(!article.fields?.thumbnail) return;
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


newsImg.src=article.fields.thumbnail;
newsTitle.innerHTML=article.fields.headline;
newsDesc.innerHTML=article.fields.trailText;




const date=new Date(article.webPublicationDate).toLocaleString("en-us",{
    timezone:"Asia/Kathmandu"
});


newsSource.innerHTML=`The Guardian . ${date}`;

cardClone.firstElementChild.addEventListener('click',() => {
    window.open(article.webUrl,"_blank");
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