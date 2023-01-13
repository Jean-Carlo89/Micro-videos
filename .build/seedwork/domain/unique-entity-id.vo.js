"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const invalid_uuid_error_1 = require("../errors/invalid-uuid.error");
class UniqueEntityId {
    constructor(id) {
        this.id = id;
        this.id = this.id || (0, uuid_1.v4)();
        this.validate();
    }
    validate() {
        const isValid = (0, uuid_1.validate)(this.id);
        if (!isValid) {
            throw new invalid_uuid_error_1.InvalidUuidError();
        }
    }
}
exports.default = UniqueEntityId;
