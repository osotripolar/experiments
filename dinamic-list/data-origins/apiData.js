let links

function asignarLinks() {
  const linkStorage = JSON.parse(localStorage.getItem('links'))
  
  try{
    links = {
      getN: linkStorage.getN,
      postN: linkStorage.postN,
      putN: linkStorage.putN,
      deleteN: linkStorage.deleteN,
      getL: linkStorage.getL,
      postL: linkStorage.postL,
      putL: linkStorage.putL,
      deleteL: linkStorage.deleteL,
    }

  }catch(error){
    console.log('No se pudieron obtener los datos endpoints de la api')
  }

}

asignarLinks()

export async function asignarNewLinksApi(link) {
  const res = await fetch(link)
  const data = await res.json()

  localStorage.setItem('links',JSON.stringify(data))
  asignarLinks()

}

// NOTES===========================

export async function getNotes() {
  const res = await fetch(links.getN)
  return res
}


export async function postNote(data) {

  const { content, id_list } = data

  const res = await fetch(links.postN, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      content: content,
      id_list: id_list
    })
  })

  return res
}

export async function putNote(data) {

  const { content, id_list, id } = data

  const res = await fetch(`${links.putN}${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      content: content,
      id_list: id_list
    })
  })

  return res
}

export async function deleteNote(id) {
  const res = await fetch(`${links.deleteN}${id}`, {
    method: 'DELETE'
  })
  return res
}

// LISTS===============================

export async function getLists() {
  const res = await fetch(links.getL)
  return res
}

export async function postList(title) {

  const res = await fetch(`${links.postL}`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      title: title,
    })
  })

  return res
}

export async function putList(data) {

  const { title, id } = data

  const res = await fetch(`${links.putL}${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      title: title,
    })
  })

  return res
}

export async function deleteList(id) {
  const res = await fetch(`${links.deleteL}${id}`, {
    method: 'DELETE'
  })
  return res
}