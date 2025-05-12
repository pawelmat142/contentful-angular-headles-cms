export abstract class Util {

    public static capitalizeFirstLetter(input: string = '') {
        if (input.length === 0) return input
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    public static formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = String(date.getFullYear()).slice(-4)
        return `${day}-${month}-${year}`
    }

    public static fromSnakeCase(input: string): string {
        let words = input.split('_')
        if (words.length) {
            words[0] = this.capitalizeFirstLetter(words[0])
        }
        return words.join(' ')
    }

    public static get<T>(item: any, path: string): T | string {
        const properties = path.split('.')
        let current: any = item;
    
        for (const prop of properties) {
            if (current == null || !current.hasOwnProperty(prop)) {
              return '-'
            }
            current = current[prop]
        }
        return current;
    }

}