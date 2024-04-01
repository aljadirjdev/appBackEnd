"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OpportunityManagementSchema = new mongoose_1.Schema({
    nameOpportunity: { type: String, required: true },
    relatedWith: { type: String, required: true },
    source: { type: String, required: true },
    assignedTo: { type: Object, required: true },
    salesPhase: { type: String, required: true },
    opportunityStatus: { type: Boolean, required: true },
    estimatedClosingDate: { type: Date, required: true },
    priority: { type: String, required: true },
    type: { type: String, required: true },
}, {});
const OpportunityManagementModel = (0, mongoose_1.model)("opportunityManagement", OpportunityManagementSchema);
exports.default = OpportunityManagementModel;
//# sourceMappingURL=opportunityManagement.model.js.map