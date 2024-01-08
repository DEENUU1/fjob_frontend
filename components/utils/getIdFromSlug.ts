

export function getIdFromSlug(slug: string){
    const digit = slug.split("").filter(char => !isNaN(parseInt(char, 10)))
    return parseInt(digit.join(""), 10)
}