export abstract class DateUtil {

    public static sameDay(date1: Date, date2: Date): boolean {
        if (!date1 || !date2) {
            return false
        }
        return date1.getDay() === date2.getDay()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear()
    }

    public static formatDDMMYYYY(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    public static isDate(input: any): boolean {
        if (input instanceof Date) {
            return !isNaN(input.getTime())
        }
        if (typeof input !== "string") {
            return false;
        }
        if (!isNaN(Number(input))) {
            return false;
        }
        const parsedDate = new Date(input)
        return !isNaN(parsedDate.getTime())
    }
}