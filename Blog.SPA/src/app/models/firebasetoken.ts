export type FireBaseToken =
{
  audience: string;
  claims: { [key: string]: object };
  expirationTimeSeconds: number;
  issuedAtTimeSeconds: number;
  issuer: string;
  subject: string;
  uid: string;
  tenantId: string;
}
