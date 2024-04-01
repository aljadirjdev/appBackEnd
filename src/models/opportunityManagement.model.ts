import { Schema, model } from "mongoose";
import OpportunityManagementInterface from "../Interfaces/CRM/OpportunityManagement";

const OpportunityManagementSchema = new Schema<OpportunityManagementInterface>(
  {
    nameOpportunity: { type: String, required: true },
    relatedWith: { type: String, required: true },
    source: { type: String, required: true },
    assignedTo: { type: Object, required: true },
    salesPhase: { type: String, required: true },
    opportunityStatus: { type: Boolean, required: true },
    estimatedClosingDate: { type: Date, required: true },
    priority: { type: String, required: true },
    type: { type: String, required: true },
  },
  {}
);
const OpportunityManagementModel = model(
  "opportunityManagement",
  OpportunityManagementSchema
);
export default OpportunityManagementModel;
