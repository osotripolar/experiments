// DUMMY DATA

let notes = [
    {
        "id" : 1,
        "list_id": 1,
        "content": "nota en A"
    },
    {
        "id" : 2,
        "list_id": 2,
        "content": "nota en B"
    },
    {
        "id" : 3,
        "list_id": null,
        "content": "nota suelta"
    }
]

let lists = [
    {
        "id" : "1",
        "title" : "grupo a"
    },
    {
        "id" : "2",
        "title" : "grupo b"
    }
]

let countIdNotes = notes.length
let countIdList = lists.length

// AUXILIAR FUNCTIONS

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// FAKE FETCH : NOTES

export async function updateNote(newNote){

    const index = notes.findIndex(note => note.id == newNote.id)

    if(index == -1){
        console.log('algo falló')
    }else{
        notes[index] = newNote
    }
}

export async function postNote(note){

    await delay(300)

    countIdNotes++
    const newNote =  {...note, id : countIdNotes}

    notes.push(newNote)
}

export async function getNotes(){

    await delay(300)
    
    return [...notes]
}

export async function deleteNote(idNote){
    
    const index = notes.findIndex(note => note.id == idNote)

    if(index == -1){
        console.log('algo falló')
    }else{
        notes.splice(index,1)
    }

}

// FAKE FETCH: LISTS

export async function updateList(newList){

    const index = lists.findIndex(list => list.id == newList.id)

    if(index == -1){
        console.log('algo falló')
    }else{
        lists[index] = newList
    }

}

export async function getLists(){

    await delay(300)
    
    return [...lists]
}

export async function deleteList(idList) {

    const index = lists.findIndex(list => list.id == idList)

    if(index == -1){
        console.log('algo falló')
    }else{
        lists.splice(index,1)
    }

    // tambien borramos sus notas asociadas
    notes = notes.filter(note => note.list_id != idList);


}

export async function postList(listName) {

    countIdList++

    const newList = {
        id : countIdList,
        title : listName
    }

    lists.push(newList)

}