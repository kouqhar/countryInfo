import { countryCode, countryDetails, alphaCode } from './request'

const countryFlag = document.querySelector('#country-flag')
const bodyDetails = document.querySelector('#wrapper')
let userFlag = document.createElement('img')
let details = document.createElement('div')
let subDetails = document.createElement('div')
details.classList = 'country-details'
subDetails.classList = 'country-subDetails'


const checkCountry = () => {

    countryCode()
    .then(data => countryDetails(data))
    .then(country => {
        let { altSpellings, alpha2Code, alpha3Code, borders, callingCodes, capital, cioc, currencies, demonym, flag, languages, name, nativeName, numericCode, population, region, regionalBlocs , subregion, timezones, topLevelDomain, translations } = country;

        let str = [], lang = [], curr = [];
        for(let [key, value] of Object.entries(translations)){
            str.push(`<li>${key} : <span class="code">${value}</span></li>`)
        }
        translations = str.toString().split(',').join('')
        
        languages = languages[0]
        for(let [key, value] of Object.entries(languages)){
            lang.push(`<li>${key} : <span class="code">${value}</span></li>`)
        }
        languages = lang.toString().split(',').join('')
        
        
        currencies = currencies[0]
        for(let [key, value] of Object.entries(currencies)){
            curr.push(`<li>${key} : <span class="code">${value}</span></li>`);
        }
        currencies = curr.toString().split(',').join('')
        
        const border = borders.length
        const callingCode = callingCodes.length
        const altSpelling = altSpellings.length
        const numericCodes = numericCode.length
        const subRegions = subregion.length
        const timezone = timezones.length
        const domain = topLevelDomain.length
        const translation = translations.length
        const ciocs = cioc.split(' ').length
        let countryAcronyms;

        if(border > 0){
            borders = borders.map(border => `${border}`).toString().split(',').join(', ')
        }
        else borders = `${name} country has no borders`

        if(altSpelling > 0) altSpellings = altSpellings.map(altSpell => ` ${altSpell}`).toString().split(', ').join(', ')
        else altSpellings = `${name} has no alternative spellings`

        if(timezone > 0) timezones = timezones.map(time => ` ${time}`).toString().split(', ').join(', ')
        else timezones = `${name} has no time zone`
        
        if(translations.length > 0) translations
        else translations = `${name} has no other language translation`

        if(regionalBlocs.length > 0 ) {
            countryAcronyms = `<div><p>Country Regional Bloc : </p> <span>Acronym : <span class="code">${regionalBlocs[0].acronym}</span></span>, <span>Acronym Name : <span class="code">${regionalBlocs[0].name}</span></span> </div>`
        } else countryAcronyms = ''
        

        subDetails.innerHTML = `
        <div>
        <p>Country Name : <span>${name}</span></p>
        
        <p>Country Capital : <span>${capital}</span></p>
        
        <p>Country Region : <span>${region}</span></p>

        <p>Calling Code${callingCode > 1 ? 's' : ''} : <span>+${callingCodes}</span></p>

        <p>Country Cioc${ciocs > 1 ? 's' : ''} : <span>${cioc}</span></p>
        </div>`

        details.innerHTML = `

        <div><p>Native Name : </p> <span>${nativeName}</span> </div>

        <div><p>Alternative Spelling : </p> <span>${altSpellings}</span> </div> 

        <div><p>Country Border${border > 1 ? 's' : ''} : </p> <span>${borders}</span> </div> 

        <div><p>Alpha 2 Code${callingCode > 1 ? 's' : ''} : </p> <span>${alpha2Code}</span> </div>

        <div><p>Alpha 3 Code${callingCode > 1 ? 's' : ''} : </p> <span>${alpha3Code}</span> </div>
        
        <div><p>Numeric Code${numericCodes > 1 ? 's' : ''} : </p> <span>${numericCode}</span> </div>
        
        <div><p>Country Time-Zone${timezone > 1 ? 's' : ''} : </p> <span>${timezones}</span> </div>
        
        <div><p>Country Sub-Region${subRegions > 1 ? 's' : ''} : </p> <span>${subregion}</span> </div>
        
        ${countryAcronyms}
        
        <div><p>Country Population : </p> <span>${population}</span> </div>
        
        <div><p>Country Residents : </p> <span>${demonym}</span> </div>
        
        <div><p>Country Domain${domain > 1 ? 's' : ''} : </p> <span>${topLevelDomain}</span> </div>
        
        <div><p>Country Currency : </p> <span><ul>${currencies}</ul></span> </div>
        
        <div><p>International standards languages : </p> <span><ul>${languages}</ul></span> </div>
        
        <div><p>Country Translation${translation > 1 ? 's' : ''} : </p> <span><ul>${translations}</ul></span> </div>
        `

        if(flag !== undefined){
            userFlag.id = 'flag'
            userFlag.alt = `${name} flag`
            userFlag.src = flag
        }else{
            userFlag.innerHTML = `<h2>${name} flag is currently un-available for display</h2>`
        }

        countryFlag.appendChild(userFlag)
        countryFlag.appendChild(subDetails)
        bodyDetails.appendChild(details)
    })
    .catch(err => console.log('Error : ', err.message))
}

export { checkCountry as default }