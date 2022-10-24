export function getAffilateURL(url) {
    const encodedURL = encodeURIComponent(url)
    return `https://adobe.prf.hn/click/camref:1011lrgs8/pubref:figma/ar:image/destination:${encodedURL}`
}
