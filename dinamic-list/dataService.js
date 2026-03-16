
// DUMMY DATA

let countId = 6
let countIdLIst = 4

let notes = [
    {
        "id" : 1,
        "list_id": null,
        "content": "primera nota"
    },
    {
        "id" : 2,
        "list_id": null,
        "content": "segunda nota"
    },
    {
        "id" : 3,
        "list_id": 1,
        "content": "tercera nota"
    },
    {
        "id" : 4,
        "list_id": 2,
        "content": "cuarta nota"
    },
    {
        "id" : 5,
        "list_id": null,
        "content": "quinta nota"
    },
    {
        "id" : 6,
        "list_id": null,
        "content": "sexta nota"
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
    },
    {
        "id" : "3",
        "title" : "grupo c"
    },
    {
        "id" : "4",
        "title" : "grupo d"
    },
]

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

    countId++
    const newNote =  {...note, id : countId}

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

    countIdLIst++

    const newList = {
        id : countIdLIst,
        title : listName
    }

    lists.push(newList)

}