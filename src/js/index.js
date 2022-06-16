import '../css/index.scss'
import axios from 'axios'

window.onload = main
const getUrlParams = () => window.location.search.substring(1).split('&').reduce((result, query) => { const [k, v] = query.split('='); result[k] = decodeURI(v); return result; }, {})
async function main() {
    const target = getUrlParams().url
    if (!target) return false
    try {
        const raw = await axios.get(`http://localhost:9000/.netlify/functions/title?url=${target}`)
        const title = raw.data.title || ''
        const a = document.querySelector('.share')
        const url = `http://twitter.com/share?url=${encodeURI(target)}&text=${encodeURI(title)}`
        a.setAttribute('href', url)
    } catch (e) {

    }
}