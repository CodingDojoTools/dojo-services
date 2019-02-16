export interface Cert {
  verification: {
    publicKey: string;
  };
  WebFun: string;
  iOS: string;
  C_SHARP: string;
  MEAN: string;
  RoR: string;
  LAMP: string;
  Java: string;
  Python: string;
  id: string;
  issuedOn: string;
  issuer: {
    name: string;
    email: string;
    url: string;
    revocationList: string;
    id: string;
  };
  recipient: {
    identity: string;
  };
  recipientProfile: {
    name: string;
    publicKey: string;
  };
}
