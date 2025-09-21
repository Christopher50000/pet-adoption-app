export interface Pet {
  id?: number;
  name: string;
  image?: string | {base64: string};
  description: string;
  monthsOfAge: number;
  yearsOfAge: number;
}
