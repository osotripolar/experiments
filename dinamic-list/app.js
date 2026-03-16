import { getNotes , getLists , postNote } from "./dataService.js";

let localNotes
let localLists

let activeButton

const notesContainer = document.getElementById('notesContainer')
const selectOptions = document.getElementById('listOptions')
const addNoteBtn = document.getElementById('addNoteBtn')
const inputNote = document.getElementById('inputNote')
const btnLists = document.getElementById('btnLists')
const noteTemplate = document.getElementById('noteTemplate')

// moda editar nota
const containerModalEditNote = document.getElementById('modalEditNote')
const closeModalEditNote = document.getElementById('closeModalEditNote')
const selectOptionsEditNotes = document.getElementById('listOptionsModalEditNote')
const inputEditNote = document.getElementById('inputEditNote')

// const btnListEdit = document.getElementById('btnListEdit')


// ================= LISTENERS

inputNote.addEventListener('keydown',(e) =>{
    if(e.key === 'Enter') addNoteBtn.click()
})

addNoteBtn.addEventListener('click',()=>{

    if(!inputNote.value) return

    const newNote = {
        content : inputNote.value,
        list_id : selectOptions.value === "" ? null : selectOptions.value
    }
    
    postNote(newNote)
    
    // limpiamos el input
    inputNote.value = ''

    init()

})

notesContainer.addEventListener('click',(e)=>{

    if(e.target.tagName !== 'BUTTON') return

    if(e.target.classList.contains('btn--edit')){
        openEditModal(e)
    }
    
})

closeModalEditNote.addEventListener('click',(e)=>{
    containerModalEditNote.classList.remove('show')
})

// ================= MODALS

function openEditModal(e){

    const li = e.target.closest('li')
    const text = li.querySelector('p').textContent

    inputEditNote.value = text
    inputEditNote.focus()
    
    console.log(li)
    console.log(text)
    containerModalEditNote.classList.add('show')
}

// ================= RENDER

function render(notes = undefined){

    fillSelectOptions()
    fillNotes(notes)
    fillBtnLists()

    // modal - edit note
    fillSelectOptionsModalEditNotes()
    
}

// constructores de elementos

function fillBtnLists(){

    btnLists.innerHTML = ''
    const fragment = document.createDocumentFragment()

    // Añadimos All
    const btnListAll = el('button', undefined ,'All')
    activeButton || btnListAll.classList.add('btnActive')
    fragment.appendChild(btnListAll)
    
    // Añadimos botones por cada lista
    localLists.forEach(list =>{

        const btnList = el('button', undefined ,list.title)
        list.id !== activeButton ||  btnList.classList.add('btnActive')
        btnList.dataset.id = list.id
        fragment.appendChild(btnList)

    })

    // añadimos funcionalidad a los botones
    btnLists.addEventListener('click',filterViewByList)
    btnLists.appendChild(fragment)

}

function fillNotes(filteredNotes = undefined){

    const fragment = document.createDocumentFragment()
    notesContainer.innerHTML = ''
    const dataFilter = filteredNotes || localNotes

    if(dataFilter.length != 0){
        
        dataFilter.forEach(note =>{

            const notexxx = noteTemplate.content.cloneNode(true)
            const pNote = notexxx.querySelector('p')
            const liNote = notexxx.querySelector('li')

            pNote.textContent = note.content
            liNote.dataset.id = note.id
            
            fragment.appendChild(notexxx)
        })

    }else{
        const message = el('p','italic','Vacío: inserte una nota')
        fragment.appendChild(message)
    }


    notesContainer.appendChild(fragment)

}

function fillSelectOptions(){

    selectOptions.innerHTML=''

    const fragment = document.createDocumentFragment()

    const defaultOption = el('option',undefined,'Seleccione una lista')
    defaultOption.value = ""
    defaultOption.selected = true
    
    fragment.appendChild(defaultOption)
    
    localLists.forEach( list =>{
        
        const optionEl = el('option',undefined,list.title)
        optionEl.value = list.id

        fragment.appendChild(optionEl)

    })
    
    selectOptions.appendChild(fragment)
}

function fillSelectOptionsModalEditNotes(){
    selectOptionsEditNotes.innerHTML=''

    const fragment = document.createDocumentFragment()
    const xd = el('option',undefined,'Sin Lista')
    xd.value = ''
    fragment.appendChild(xd)

    localLists.forEach( list =>{
        
        const optionEl = el('option',undefined,list.title)
        optionEl.value = list.id

        fragment.appendChild(optionEl)

    }) 

    selectOptionsEditNotes.appendChild(fragment)



}

// funciones auxiliares

function filterViewByList(e){

    if(!(e.target.tagName === 'BUTTON')) return

    const id = e.target.dataset.id

    activeButton = id //seteamos el botón activo

    if(id){

        const idBotonPulsado = e.target.dataset.id
        const datosFiltrados = localNotes.filter(nota => nota.list_id == idBotonPulsado )

        render(datosFiltrados)
        
    }else{
        render()
    }

}

function el(tag, className = undefined, text = undefined){
    // creador de elementos html
    const element = document.createElement(tag)
    if(className) element.className = className
    if(text) element.textContent = text
    return element
}

// ================= APP START

async function initializeData() {

    try{

        [
            localLists,
            localNotes
        ] = await Promise.all([
            getLists(),
            getNotes()   
        ])

    }catch(error){
        console.log('Error al traer los datos', error)
    }
    
}

async function init(){

    await initializeData()

    console.log(localLists)
    console.log(localNotes)

    render()
}

init()