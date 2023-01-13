"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const unique_entity_id_vo_1 = __importDefault(require("../../../seedwork/domain/unique-entity-id.vo"));
class Category {
    constructor(props, id) {
        var _a;
        this.props = props;
        this.id = id || new unique_entity_id_vo_1.default();
        this.description = this.props.description;
        this.props.is_active = this.props.is_active;
        this.props.created_at = (_a = this.props.created_at) !== null && _a !== void 0 ? _a : new Date();
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value !== null && value !== void 0 ? value : null;
    }
    get is_active() {
        return this.props.is_active;
    }
    set is_active(value) {
        this.props.is_active = value !== null && value !== void 0 ? value : true;
    }
    get created_at() {
        return this.props.created_at;
    }
}
exports.Category = Category;
