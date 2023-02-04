//Header
const search = document.getElementById('input');
const button = document.getElementById('button')
const dataAtual = document.getElementById('data-atual')
const nomeCidade = document.getElementById('nome-cidade')

//Temperature
const imagem = document.getElementById('imagem')
const descricao = document.getElementById('descricao')
const temperatura = document.getElementById('temperature')

//Bottom container
const vento = document.getElementById('vento')
const sensacao = document.getElementById('sensacao')
const umidade = document.getElementById('umidade')
const nascerDoSol = document.getElementById('nascer-do-sol')
const porDoSol = document.getElementById('por-do-sol')

const apiKey = "3e57485367dafafecbb48d887bef2916"


button.addEventListener("click", () =>{
    let nomeCidade = search.value
    getClimaCidade(nomeCidade)
})


navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => displayClima(data))
    },
    (err) => {
        if(err.code === 1){
            alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.")
        }else{
            console.log(err)
        }
    }
)

function getClimaCidade(nomeCidade){

    imagem.src=`./src/assets/loading-icon.svg`
    dataAtual.textContent = "..."
    descricao.textContent = "..."
    temperatura.textContent = "..."
    vento.textContent = "..."
    sensacao.textContent = "..."
    umidade.textContent = "..."
    nascerDoSol.textContent = "..."
    porDoSol.textContent = "..."

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&units=metric&lang=pt_br&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => displayClima(data))
}

function displayClima(data){
    let { 
        dt,
        name,
        weather: [{icon, description}],
        main: {temp, feels_like, humidity},
        wind: {speed},
        sys: {sunrise, sunset},
    } = data

    
    dataAtual.textContent = formatDate(dt)
    nomeCidade.textContent = name
    imagem.src=`./src/assets/${icon}.svg`
    descricao.textContent = description
    temperatura.textContent = `${Math.round(temp)}°C`
    vento.textContent = `${Math.round(speed * 3,6)}km/h`
    sensacao.textContent = `${Math.round(feels_like)}°C`
    umidade.textContent = `${humidity}%`
    nascerDoSol.textContent = formatTime(sunrise)
    porDoSol.textContent = formatTime(sunset)
  
}

function formatDate(epochTime){
    let date = new Date(epochTime * 1000)
    let dataFormatada = date.toLocaleDateString('pt-br', { month: "long", day:'numeric' })
    return `Hoje, ${dataFormatada}`
}



function formatTime(epochTime){
    let date = new Date(epochTime * 1000)
    let horas = date.getHours()
    let minutos = date.getMinutes()
    return`${horas}:${minutos}`
}

