const toastDetails = {
  success: {
    icon: "fa-circle-check",
    message: "Succes: This is a success toast.",
  },
  error: {
    icon: "fa-circle-xmark",
    message: "Error: This is an error toast.",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    message: "Warning: This is a warning toast.",
  },
  info: {
    icon: "fa-circle-info",
    message: "Info: This is an information toast.",
  }
}

const body = document.querySelector('body')
let notifications = document.querySelector('.notifications')

// NOTIFICATIONS: Si no existe creamos uno
if (!notifications) {
  const toastContainer = document.createElement('ul')
  toastContainer.className = 'notifications'
  body.appendChild(toastContainer)

  notifications = toastContainer
}

notifications.addEventListener('click', (e) => {
  if (!(e.target.classList.contains('fa-xmark'))) return

  const toast = e.target.closest('.toast')
  removeToast(toast)
})

// FUNCIONES TOAST, =========> EXPORTAMOSS
export function createToast(typeToast, messageToast) {

  try {
    const { icon, message } = toastDetails[typeToast]

    const toast = document.createElement('li')
    toast.className = `toast ${typeToast}`

    toast.innerHTML = `
    <div class="column">
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    </div>
    <i class="fa-solid fa-xmark"></i>
    `

    if (messageToast) {
      const span = toast.querySelector('span')
      span.textContent = messageToast
    }

    notifications.appendChild(toast)

    setTimeout(() => {
      removeToast(toast)
    }, 3000)
  } catch (err) {
    console.log(err)
  }
}

export function removeToast(toast) {
  toast.classList.add('hiden')
  setTimeout(() => {
    toast.remove()
  }, 500)
}