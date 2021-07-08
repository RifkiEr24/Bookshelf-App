const submitAction = document.getElementById("addbuku");
submitAction.addEventListener("submit", function(){
 const book= document.getElementById('bookname').value;
 const writer= document.getElementById('writer').value;
 const years= document.getElementById('years').value;
 const doneread=document.getElementById('doneread').checked;

 const textTitle = document.createElement("p");
 textTitle.innerText = book;
textTitle.setAttribute('class','bold mt-sm')
 const textWriter=document.createElement("p");
 textWriter.innerText=writer;
textWriter.classList.add('mt-sm')
 const textYear=document.createElement("p");
 textYear.innerText=years;
 textYear.classList.add('bold')

const icon = document.createElement("span");
icon.classList.add("iconify","book-icon","item-center","mt-sm");
icon.setAttribute("data-icon","bi:book");
icon.setAttribute("data-inline","false");

const button = document.createElement("button");
button.innerText="Selesai Dibaca";
button.setAttribute('class','secondary-color text-white submit bold b-rad-rounded item-center')
const container=document.createElement("div");
container.setAttribute('class', 'box primary-color b-rad-rounded-md text-white text-center')
container.append(textTitle);
container.append(icon)
container.append(textWriter);
container.append(textYear);
container.append(button);
const diva= document.getElementById('contentNotReaded');

diva.append(container);
event.preventDefault();
});