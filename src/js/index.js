import '../css/index.scss'
import axios from 'axios'

window.onload = main
const getUrlParams = () => window.location.search.substring(1).split('&').reduce((result, query) => { const [k, v] = query.split('='); result[k] = decodeURI(v); return result; }, {})
async function main() {
    const a = document.querySelector('.share')
    const target = getUrlParams().url
    if (!target) {
        a.classList.add('hide')
        return
    }
    const url = `http://twitter.com/share?url=${encodeURI(target)}`
    a.setAttribute('href', url)
    const bgColor = getUrlParams().bgColor || 'fff'
    document.querySelector('html').style.backgroundColor = `#${encodeURI(bgColor)}`
    if (!target) return false
    try {
        const raw = await axios.get(`/.netlify/functions/title?url=${target}`)
        const title = raw.data.title || ''
        const url = `http://twitter.com/share?url=${encodeURIComponent(target)}&text=${encodeURIComponent(title)}`
        a.setAttribute('href', url)
    } catch (e) {
        const url = `http://twitter.com/share?url=${encodeURIComponent(target)}`
        a.setAttribute('href', url)
    } finally {
        a.classList.remove('loading')
        a.innerHTML = 'Twitterでシェア'
    }
}
