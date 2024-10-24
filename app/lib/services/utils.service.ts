export namespace UtilService {
  export function addMonths(date: Date, months: number): Date {
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  /**
   * Adds days to date. If days is -1 will return max date
   * @param {Date} Date - start date
   * @param {number} days - days to add, if -1 return inf. date
   * @return {Date} new date
   */
  export function addDays(date: Date, days: number) {
    if (-1 === days) return new Date(9999, 11, 31);

    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }

  export function stringifySafely(obj: any) {
    let cache: any[] = [];
    let str = JSON.stringify(obj, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = []; // reset the cache
    return str;
  }
}
