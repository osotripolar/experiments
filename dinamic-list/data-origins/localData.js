export const data = ['local1', 'local2']

export function paintData() {
  return data
}

//=========================================

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

// NOTES

export async function getNotes() {

  const localNotes = localStorage.getItem('localNotes')

  // en caso no exista creamos datos fake
  if (!localNotes) {
    asignarNotesFake()
    return console.log('creamos datos fake')
  }

  return JSON.parse(localStorage.getItem('localNotes'))


}

// LISTS

export async function getLists() {

  const localLists = localStorage.getItem('localLists')

  // en caso no exista creamos datos fake
  if (!localLists) {
    asignarListasFake()
    return console.log('creamos datos fake')
  }

  return JSON.parse(localStorage.getItem('localLists'))


}