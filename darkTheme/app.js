const iconTheme = document.getElementById('iconTheme')
const themeInput = document.getElementById('themeModeInput')
const html = document.querySelector('html')

if (localStorage.getItem('theme') == 'dark'){
    themeInput.checked = true
    setThemeDark()
}

// Listeners

themeInput.addEventListener('change',(e)=>{

    if(e.currentTarget.checked){
        setThemeDark()
    }else{
        setThemeLight()
    }
    
})

// funciones


function setThemeDark(){
    localStorage.setItem('theme','dark')
    html.classList.add('dark')
    iconTheme.className = 'bi bi-brightness-high-fill'
    
}

function setThemeLight(){
    html.classList.remove('dark')
    localStorage.setItem('theme','normal')
    iconTheme.className = 'bi bi-moon-fill'
}