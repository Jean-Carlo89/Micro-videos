import { EntityValidationError, ValidationError } from "../../../shared/domain/errors/validation-error";
import { Category } from "./category";

describe("Category Integration Tests", () => {
  describe("Create method", () => {
    it("Should throw error with a invalid category name when create", () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"],
      });

      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"],
      });

      expect(() => new Category({ name: "t".repeat(256) })).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("Should throw error with a invalid category description when create", () => {
      expect(() => new Category({ description: 5 as any, name: "name valido" })).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("Should throw error with a invalid category is_active when create", () => {
      expect(() => new Category({ is_active: 5 as any, name: "name valido" })).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });
  });

  describe("Update method", () => {
    it("Should throw error with a invalid category name when create", () => {
      let category = new Category({ name: "valid name" });

      expect(() => new Category({ name: null, description: null })).containsErrorMessages({
        name: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"],
      });

      expect(() => new Category({ name: "", description: null })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: 5 as any, description: null })).containsErrorMessages({
        name: ["name must be a string", "name must be shorter than or equal to 255 characters"],
      });

      expect(() => new Category({ name: "t".repeat(256), description: null })).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("Should throw error with a invalid category name when create", () => {
      let category = new Category({ name: "valid name" });

      expect(() => category.update("Valid", 5 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });
  });
});
