import OpportunityManagementInterface from "./CRM/OpportunityManagement";

interface ContactMeInterface {
  name: string;
  email: string;
  phone: string;
  message: string;
  oportunity?: OpportunityManagementInterface;
}
export default ContactMeInterface;
