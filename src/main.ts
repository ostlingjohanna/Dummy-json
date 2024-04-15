
const baseurl: string = "https://dummyjson.com/products";
fetch(baseurl)
  .then((res) => res.json())
  .then(console.log);

const formEl = document.querySelector("form") as HTMLFormElement;

//Listener for when someone submit
formEl.addEventListener("submit", handleform);
function handleform(event: Event): void {
  event.preventDefault();
  console.log("i handleForm");
  const userinput: string = (
    document.querySelector("input") as HTMLInputElement
  ).value;
  console.log(userinput);
  searchresult(userinput);
}

//Result of searched submit
async function searchresult(userinput:string): Promise<Product[]> {
  let searchurl: string = baseurl + "/search?q=" + userinput;
  const res = await fetch(searchurl);
  const data = await res.json();
  const products:Product[] = data.products;
  console.log(products)
  display(products);
  return products as Product[]
}

const showingResultDiv = document.querySelector(
  "#showingResultDiv"
) as HTMLDivElement;

type Product= {
    images: string[],
    title: string,
    description: string,
    rating: number,
    stock: number,
    category: string
}
//Display function
function display(products:Product[]): void{
  showingResultDiv.innerHTML = "";

    for(const product of products)
    {console.log(product)
    const {images, title, description, rating, stock, category} = product

    const imgEl= document.createElement('img')
    const titelEl = document.createElement("h1");
    const descriptionEl = document.createElement("h2");
    const ratingEl = document.createElement("p");
    const stockEl = document.createElement("p");
    const categoryEl = document.createElement("p");
    const cartBtn = document.createElement("button");

    imgEl.src = images[0]
    titelEl.innerText = title;
    descriptionEl.innerText = description;
    ratingEl.innerText = "Rating: " + rating.toString();

    stockEl.innerText = stock.toString();
    if (stock <= 10) {
      stockEl.innerText =stock + " (VARNING: few left)";
    }

    categoryEl.innerText = "Category: " + category;
    cartBtn.innerText = "add to cart";

    const productbox = document.createElement("div");
    productbox.append(
      imgEl,
      titelEl,
      descriptionEl,
      ratingEl,
      stockEl,
      categoryEl,
      cartBtn
    );
    showingResultDiv.append(productbox)
  } 
}
