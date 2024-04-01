import { ObjectId } from "mongoose";
import EmployeeInterface from "../EmployeeInterface";

interface OpportunityManagementInterface {
  nameOpportunity: string; // name of opportunity - nombre de la oportunidad
  relatedWith: string; // related with - relacionado con
  source: string; // source of opportunity - fuente de la oportunidad
  assignedTo: EmployeeInterface; // assigned to - asignado a
  salesPhase: string; // sales phase - fase de ventas
  opportunityStatus: boolean; // opportunity status - estado de la oportunidad
  estimatedClosingDate: Date; // estimated closing date - fecha estimada de cierre
  customer: ObjectId; // customer id - id del cliente
  priority: string; // priority of opportunity - prioridad de la oportunidad
  type: string; // type of opportunity - tipo de oportunidad
  // timestamp
  createdAt: Date; // created at - creado en
  updatedAt: Date; // updated at - actualizado en
}
export default OpportunityManagementInterface;
