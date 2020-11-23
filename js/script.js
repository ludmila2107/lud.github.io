let btnCreate=document.querySelector('.btn-create');
let newElements=document.querySelector('.new-elements');
let elem=document.createElement('p');
elem.textContent="Новый абзац";
elem.classList.add('elem');
btnCreate.onclick=function(){
	newElements.append(elem);
}