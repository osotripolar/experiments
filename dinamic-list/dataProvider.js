// PRIMERO HAY QUE VERIFICAR QUE MARCÓ EL USUARIO

import { paintData as mockData } from "./data-origins/mockData.js"
import { paintData as localData } from "./data-origins/localData.js"
import { paintData as apiData } from "./data-origins/apiData.js"

export function getInfoTest() {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      console.log(mockData())
      break;

    case "api":
      console.log(apiData())
      break;

    case "localStorage":
      console.log(localData())
      break;

    default:
      console.log('mi webo')
  }

}

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

// NOTES

export async function getNotes() {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await getNotesMock()

  }
}

export async function postNote(newNote) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await postNoteMock(newNote)

  }
}

export async function updateNote(newData) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await updateNoteMock(newData)

  }
}

export async function deleteNote(idNote) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await deleteNoteMock(idNote)

  }
}

// LISTS

export async function getLists() {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await getListsMock()

  }

}

export async function postList(newListName) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await postListMock(newListName)

  }

}

export async function updateList(newListData) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await updateListMock(newListData)

  }

}

export async function deleteList(idList) {

  switch (localStorage.getItem('dataConfigOrigin')) {

    case "mock":
      return await deleteListMock(idList)

  }

}