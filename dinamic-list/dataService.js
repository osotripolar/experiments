
// DUMMY DATA

let countId = 6

const notes = [
    {
        "id" : 1,
        "list_id": null,
        "content": "primera nota - primera nota - primera nota - primera nota - primera nota - primera nota - primera nota"
        // "content": "primera nota"
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

const lists = [
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

// FAKE FETCH

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

export async function getLists(){

    await delay(300)
    
    return [...lists]
}