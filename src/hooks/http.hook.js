export const useHttp = () => {
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    }

    return {request}
}


function checkAnagram(anagramArray) {
    let map = new Map();

    anagramArray.forEach(anagram => {
        const word = anagram.toLowerCase().split('').sort().join('');
        map.set(word, anagram);
    })
    
    return (map.size <= 1);
}

console.log(checkAnagram(['кот', 'ток', 'окт']));
