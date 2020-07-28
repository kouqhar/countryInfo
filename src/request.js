const countriesApi = '//restcountries.eu/rest/v2/all'
const ipInfo = '//ipinfo.io/json?token=db10247e8bca3f'

const countryCode = async () => {
    const response = await fetch(ipInfo)
    if(response.status === 200){
        const data = await response.json()
        return data.country
    }else{
        throw new Error('Unable to fetch your country code, Please refresh the page')
    }
}

const countryDetails = async (alphaCode) => {
    const response = await fetch(countriesApi)
    if(response.status === 200){
        let data = await response.json()
        return data.find(code => code.alpha2Code === alphaCode )
    }else{
        throw new Error('Unable to fetch your country details, Please refresh the page')
    }
}

const alphaCode = async (alpha3Code) => {
    const response = await fetch(countriesApi)
    if(response.status === 200){
        let data = await response.json()
        return data.find(code => code.alpha3Code === alpha3Code )
    }else{
        throw new Error('Unable to fetch your country details, Please refresh the page')
    }
}

export { countryCode, countryDetails, alphaCode }