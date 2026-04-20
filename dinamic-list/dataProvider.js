// =======================

import {
  getNotes as getNotesMock,
  postNote as postNoteMock,
  updateNote as updateNoteMock,
  deleteNote as deleteNoteMock,
  getLists as getListsMock,
  postList as postListMock,
  updateList as updateListMock,
  deleteList as deleteListMock
} from "./data-origins/mockData.js";

import {
  getNotes as getNotesLocal,
  deleteNote as deleteNoteLocal,
  updateNote as updateNoteLocal,
  postNote as postNoteLocal,
  getLists as getListsLocal,
  postList as postListLocal,
  deleteList as deleteListLocal,
  updateList as updateListLocal,
} from "./data-origins/localData.js"

import {
  getNotes as getNotesApi
} from "./data-origins/apiData.js"

// NOTES

export async function getNotes() {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await getNotesMock()

    case "localStorage":
      return await getNotesLocal()

    case "api":
      return await getNotesApi()

    default:
      return await getNotesMock()

  }
}

export async function postNote(newNote) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await postNoteMock(newNote)

    case "localStorage":
      return await postNoteLocal(newNote)

    default:
      return await postNoteMock(newNote)

  }
}

export async function updateNote(newData) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await updateNoteMock(newData)

    case "localStorage":
      return await updateNoteLocal(newData)

    default:
      return await updateNoteMock(newData)

  }
}

export async function deleteNote(idNote) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await deleteNoteMock(idNote)

    case "localStorage":
      return await deleteNoteLocal(idNote)

    default:
      return await deleteNoteMock(idNote)

  }
}

// LISTS

export async function getLists() {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await getListsMock()

    case "localStorage":
      return await getListsLocal()

    default:
      return await getListsMock()

  }

}

export async function postList(newListName) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await postListMock(newListName)

    case "localStorage":
      return await postListLocal(newListName)

    default:
      return await postListMock(newListName)

  }

}

export async function updateList(newListData) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await updateListMock(newListData)

    case "localStorage":
      return await updateListLocal(newListData)

    default:
      return await updateListMock(newListData)

  }

}

export async function deleteList(idList) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await deleteListMock(idList)

    case "localStorage":
      return await deleteListLocal(idList)

    default:
      return await deleteListMock(idList)

  }

}