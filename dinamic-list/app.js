import { getLists , deleteList , postList, updateList , getNotes  , postNote , updateNote , deleteNote} from "./dataService.js";

let localNotes
let localLists
let activeButton

const notesContainer = document.getElementById('notesContainer')
const selectOptions = document.getElementById('listOptions')
const addNoteBtn = document.getElementById('addNoteBtn')
const inputNote = document.getElementById('inputNote')
const btnLists = document.getElementById('btnLists')
const noteTemplate = document.getElementById('noteTemplate')
const btnListEdit = document.getElementById('btnListEdit')

// moda editar nota
const containerModalEditNote = document.getElementById('modalEditNote')
const closeModalEditNote = document.getElementById('closeModalEditNote')
const selectOptionsEditNotes = document.getElementById('listOptionsModalEditNote')
const inputEditNote = document.getElementById('inputEditNote')
const updateNoteButton = document.getElementById('updateNote')
const spanId = document.getElementById('modalEditIdNote')

// modal edit listas
const closeModalEditLists = document.getElementById('closeModalEditLists')
const modalEditLists = document.getElementById('modalEditLists')
const selectOptionsEditLists = document.getElementById('selectOptionsEditLists')
const inputEditList = document.getElementById('inputEditList')
const modalEditIdList = document.getElementById('modalEditIdList')
const btnUpdateList = document.getElementById('updateList')
const btnDeleteList = document.getElementById('deleteList')
const btnCreateList = document.getElementById('createList')

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

    if(e.target.classList.contains('btn--delete')){

        const idNote = e.target.closest('li').dataset.id

        deleteNote(idNote)
        init()
    }
    
})

// ================= MODALS

btnCreateList.addEventListener('click',()=>{

    if(!inputEditList.value) return
    
    const newListName = inputEditList.value 

    postList(newListName)
    closeModalEditLists.click()
    init()
})

btnUpdateList.addEventListener('click',async()=>{

    const newListData = {
        id: modalEditIdList.textContent,
        title: inputEditList.value
    }

    await updateList(newListData)
    closeModalEditLists.click()
    init()

    
})

btnDeleteList.addEventListener('click',async()=>{
    const idList = modalEditIdList.textContent
    await deleteList(idList)
    closeModalEditLists.click()
    init()
})

btnListEdit.addEventListener('click',()=>{
    modalEditLists.classList.add('show')
})

closeModalEditLists.addEventListener('click',(e)=>{
    const label = modalEditLists.querySelector('label')
    selectOptionsEditLists.value = ''
            // normalizamos 
            modalEditIdList.textContent = '-'
            btnCreateList.removeAttribute('disabled')
            btnUpdateList.setAttribute('disabled','') 
            btnDeleteList.setAttribute('disabled','')
            label.textContent = 'Nueva Lista'
            inputEditList.value = ''
    modalEditLists.classList.remove('show')
})

// 

closeModalEditNote.addEventListener('click',(e)=>{
    containerModalEditNote.classList.remove('show')
})

updateNoteButton.addEventListener('click',async()=>{

    const idNewNote = spanId.textContent
    const newText = inputEditNote.value
    const newIdList = selectOptionsEditNotes.value

    const newData = {
        id: idNewNote,
        content : newText,
        list_id : newIdList === "" ? null : newIdList
    }

    await updateNote(newData)

    closeModalEditNote.click()
    init()

})

document.addEventListener('keydown',(e)=>{
    if(containerModalEditNote.classList.contains('show')){
        if(e.key === 'Escape'){
            closeModalEditNote.click()
        }
    }
    if(modalEditLists.classList.contains('show')){
        if(e.key === 'Escape'){
            closeModalEditLists.click()
        }
    }
}) // atajo para cerrar el modal

function openEditModal(e){

    const li = e.target.closest('li')
    const noteText = li.querySelector('p').textContent
    const noteId = li.dataset.id
    const noteListId =  li.dataset.idList

    spanId.textContent = noteId
    inputEditNote.value = noteText
    inputEditNote.focus()
    inputEditNote.select()


    if(noteListId){
        const option = selectOptionsEditNotes.querySelector(`option[value="${noteListId}"]`)
        option.selected = true
    }
    
    containerModalEditNote.classList.add('show')
}

// ================= RENDER

function render(notes = undefined){

    fillSelectOptions()
    fillNotes(notes)
    fillBtnLists()

    // modal - edit note
    fillSelectOptionsModalEditNotes()
    // modal - edit note
    fillSelectOptionsModalEditLists()
    
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

            const noteContent = noteTemplate.content.cloneNode(true)
            const pNote = noteContent.querySelector('p')
            const liNote = noteContent.querySelector('li')

            pNote.textContent = note.content
            liNote.dataset.id = note.id
            if(note.list_id) liNote.dataset.idList = note.list_id
            
            fragment.appendChild(noteContent)
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

function fillSelectOptionsModalEditLists(){

    selectOptionsEditLists.innerHTML=''

    const fragment = document.createDocumentFragment()
    const xd = el('option',undefined,'Sin Lista')
    xd.value = ''
    fragment.appendChild(xd)

    localLists.forEach( list =>{
        
        const optionEl = el('option',undefined,list.title)
        optionEl.value = list.id

        fragment.appendChild(optionEl)

    }) 

    selectOptionsEditLists.appendChild(fragment)

    selectOptionsEditLists.addEventListener('change',()=>{

        const idList = selectOptionsEditLists.value
        const label = modalEditLists.querySelector('label')

        if(idList) {
            const nameList = selectOptionsEditLists.querySelector(`[value="${idList}"]`).textContent
            inputEditList.value = nameList
            modalEditIdList.textContent = idList
            // remover disabled
            btnUpdateList.removeAttribute('disabled') 
            btnDeleteList.removeAttribute('disabled')
            btnCreateList.setAttribute('disabled','') 
            label.textContent = 'Editar Lista'
        }else{
            modalEditIdList.textContent = '-'
            btnCreateList.removeAttribute('disabled')
            btnUpdateList.setAttribute('disabled','') 
            btnDeleteList.setAttribute('disabled','')
            label.textContent = 'Nueva Lista'
        }

    })

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