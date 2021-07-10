const textInput = document.querySelector('#text-input')
const allItemsList = document.querySelector('#all-items')
const activeItemsList = document.querySelector('#active-items')
const completedItemsList = document.querySelector('#completed-items')
const allItemsDisplay = document.querySelector('.all')
const activeItemsDisplay = document.querySelector('.active')
const completedItemsDisplay = document.querySelector('.completed')

allItemsDisplay.addEventListener('click', ()=>{
    activeItemsList.classList.add('hide')
    completedItemsList.classList.add('hide')
    allItemsList.classList.remove('hide')
})
activeItemsDisplay.addEventListener('click', ()=>{
    activeItemsList.classList.remove('hide')
    completedItemsList.classList.add('hide')
    allItemsList.classList.add('hide')
})
completedItemsDisplay.addEventListener('click', ()=>{
    activeItemsList.classList.add('hide')
    completedItemsList.classList.remove('hide')
    allItemsList.classList.add('hide')
})



textInput.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter' && textInput.value !== ''){
        appendAllItemsList(textInput.value)
        makeActiveItemLi(textInput.value)
        textInput.value =''
    }
})

let li
let div
let innerCircle
let textDiv
let cancelDiv

let activeArr
let completedArr

function appendAllItemsList(text){
     li = document.createElement('li')
    li.classList.add('all-items-list', 'bar')

    div = document.createElement('div')
    div.classList.add('circle')
    div.setAttribute('aria-checked' , 'false')
    innerCircle = document.createElement('div')
    innerCircle.classList.add('inner-circle')
    div.addEventListener('click', markCompleted)

    textDiv = document.createElement('div')
    textDiv.classList.add('text')
    textDiv.innerText = text

    cancelDiv = document.createElement('div')
    cancelDiv.classList.add('cancle')
    cancelDiv.innerHTML = '<img src="./images/icon-cross.svg" alt="">'
    cancelDiv.addEventListener('click', removeLi)

    //appending
    div.append(innerCircle)
    li.append(div , textDiv , cancelDiv)

    allItemsList.append(li)
}
    //making active item li
    let activeLi
    let activeDiv
    function makeActiveItemLi(text){
        activeLi = document.createElement('li')
        activeLi.classList.add('active-list-item' , 'bar')

        activeDiv = document.createElement('div')
        activeDiv.classList.add('text')
        activeDiv.innerText = text

        activeLi.append(activeDiv)
        activeItemsList.append(activeLi)
    }

    //making completed item li
     let completedLi
     let completedDiv
     function completedItemLi(text){
         completedLi = document.createElement('li')
         completedLi.classList.add('completed-list-item', 'bar')

         completedDiv = document.createElement('div')
         completedDiv.classList.add('text')
         completedDiv.innerText = text

         completedLi.append(completedDiv)
         completedItemsList.append(completedLi)
     }


    //Removing list item from allitems and from active list
function removeLi(){
    activeArr = Array.from(activeItemsList.childNodes)
    activeArr = activeArr.slice(3 , activeArr.length)
    this.parentElement.style.display = 'none'
    activeArr.forEach(item=>{
        if(this.parentElement.childNodes[1].innerText === item.innerText){
            item.style.display = 'none'
        }
    })
}
    //Completion mark , now when we complete , we need to append the completed ones to completed list and toggle the items in the active list
function markCompleted(){
    if(this.getAttribute('aria-checked') === 'false'){
        this.setAttribute('aria-checked', 'true')
        completedItemLi(this.parentElement.childNodes[1].innerText)

        this.childNodes[0].classList.add('check')
        activeArr = Array.from(activeItemsList.childNodes)
        activeArr = activeArr.slice(3 , activeArr.length)
        activeArr.forEach(item=>{
            if(this.parentElement.childNodes[1].innerText === item.innerText){
                item.style.display = 'none'
            }
        })
    }else{
        this.setAttribute('aria-checked', 'false')
        this.childNodes[0].classList.remove('check')
        activeArr.forEach(item=>{
            if(this.parentElement.childNodes[1].innerText === item.innerText){
                item.style.display = 'inline-block'
            }
        })
        completedArr = Array.from(completedItemsList.childNodes)
        completedArr = completedArr.slice(3 , completedArr.length)
        completedArr.forEach(item=>{
            if(this.parentElement.childNodes[1].innerText === item.innerText){
                item.style.display = 'none'
            }
        })
    }
    
}

