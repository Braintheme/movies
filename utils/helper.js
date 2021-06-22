export function filterNullObject(object) {
    const result = [object].map(el => {

        return Object.keys(el).reduce((newObj, key) => {
            const value = el[key];
            if (value !== null) {
                newObj[key] = value;
            }
            return newObj;
        }, {});

    });

    return result[0]
} 

export function getQueryUrlFromObject(object) {

    const string = '?' + Object.keys(object).reduce(function(a, k){
        a.push(k + '=' + encodeURIComponent(object[k]));
        return a;
    }, []).join('&');

    return string;
}