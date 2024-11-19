// @vitest-environment node
import { describe, it, expect } from "vitest";
import { UtilService } from "~/lib/services/utils.service";

describe("UtilService", () => {
  it("should add months correctly", () => {
    const initialDate = new Date("2024-01-31");
    const result = UtilService.addMonths(initialDate, 1);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // February -> Monath are zero based... -.-
    expect(result.getDate()).toBe(29);
  });

  it("should handle adding negative days and set date to max date when days is -1", () => {
    const initialDate = new Date("2024-01-01");

    // Case where days is -1, set to max date
    const maxDate = new Date(9999, 11, 31);
    const result = UtilService.addDays(initialDate, -1);

    expect(result).toEqual(maxDate);
  });

  it("should add days correctly", () => {
    const initialDate = new Date("2024-01-01");
    const result = UtilService.addDays(initialDate, 10);

    expect(result.getDate()).toBe(11);
  });
});
