// FUNCIONES AUXILIARES

function asignarNotesFake() {

  let notes = [
    {
      "id": 1,
      "list_id": 1,
      "content": "nota en A desde Local"
    },
    {
      "id": 2,
      "list_id": 2,
      "content": "nota en B desde Local"
    },
    {
      "id": 3,
      "list_id": 2,
      "content": "nota en C desde Local"
    },
  ]

  localStorage.setItem('localNotes', JSON.stringify(notes))
}

function asignarListasFake() {

  let lists = [
    {
      "id": "1",
      "title": "local a"
    },
    {
      "id": "2",
      "title": "local b"
    }
  ]

  localStorage.setItem('localLists', JSON.stringify(lists))
}

function asignarIndexAux() {

  const lists = JSON.parse(localStorage.getItem('localLists')).length
  const notes = JSON.parse(localStorage.getItem('localNotes')).length

  const auxIndex = {
    indexNote: notes,
    indexList: lists,
  }
  localStorage.setItem('localAuxIndex', JSON.stringify(auxIndex))
}

function initLocalData() {

  // revisamos si existia info anterior, en caso no exista lo creamos inicianizandolo

  if (!(localStorage.getItem('localNotes')) || !(localStorage.getItem('localLists') || !(localStorage.getItem('localAuxIndex')))) {
    asignarListasFake()
    asignarNotesFake()
    asignarIndexAux()
  }

}

initLocalData()

// NOTES

export async function getNotes() {

  const localNotes = localStorage.getItem('localNotes')

  // en caso no exista creamos datos fake
  if (!localNotes) {
    asignarNotesFake()
    console.log('creamos datos fake')
  }

  return JSON.parse(localStorage.getItem('localNotes'))


}

export async function postNote(data) {

  const localNote = JSON.parse(localStorage.getItem('localNotes'))
  const localAux = JSON.parse(localStorage.getItem('localAuxIndex'))

  localAux.indexNote++

  const newData = {
    id: localAux.indexNote,
    list_id: data.list_id,
    content: data.content
  }

  localNote.push(newData)

  localStorage.setItem('localAuxIndex', JSON.stringify(localAux))
  localStorage.setItem('localNotes', JSON.stringify(localNote))

}

export async function deleteNote(idNote) {

  const localNotes = JSON.parse(localStorage.getItem('localNotes'))
  console.log(idNote)

  const dataLocalFiltred = localNotes.filter((element) => element.id != idNote)
  // console.log(dataLocalFiltred)

  localStorage.setItem('localNotes', JSON.stringify(dataLocalFiltred))

}

export async function updateNote(noteUpdated) {
  const localNotes = JSON.parse(localStorage.getItem('localNotes'))

  const indexNote = localNotes.findIndex(element => element.id == noteUpdated.id)


  localNotes[indexNote] = {
    id: parseInt(noteUpdated.id),
    list_id: parseInt(noteUpdated.list_id) || null,
    content: noteUpdated.content
  }

  localStorage.setItem('localNotes', JSON.stringify(localNotes))

}

// LISTS

export async function getLists() {

  const localLists = localStorage.getItem('localLists')

  // en caso no exista creamos datos fake
  if (!localLists) {
    asignarListasFake()
    console.log('creamos datos fake')
  }

  return JSON.parse(localStorage.getItem('localLists'))


}

export async function postList(newList) {

  const localLists = JSON.parse(localStorage.getItem('localLists'))
  const localAux = JSON.parse(localStorage.getItem('localAuxIndex'))

  localAux.indexList++

  const newListObject = {
    id: (localAux.indexList).toString(),
    title: newList
  }

  localLists.push(newListObject)

  localStorage.setItem('localLists', JSON.stringify(localLists))
  localStorage.setItem('localAuxIndex', JSON.stringify(localAux))

}

export async function deleteList(idList) {

  const localLists = JSON.parse(localStorage.getItem('localLists'))
  const localNotes = JSON.parse(localStorage.getItem('localNotes'))



  const dataLocalFiltred = localLists.filter((element) => element.id != idList)
  // esta data entonces la actualizamos

  const dataNotesFiltred = localNotes.filter((element) => element.list_id != idList)

  localStorage.setItem('localLists', JSON.stringify(dataLocalFiltred))
  localStorage.setItem('localNotes', JSON.stringify(dataNotesFiltred))

}

export async function updateList(newList) {

  // return console.log('update')

  const localList = JSON.parse(localStorage.getItem('localLists'))

  const indexList = localList.findIndex(element => element.id == newList.id)

  localList[indexList] = {
    id: newList.id || null,
    title: newList.title
  }

  localStorage.setItem('localLists', JSON.stringify(localList))

}