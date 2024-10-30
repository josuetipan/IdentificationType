import { ApiProperty } from "@nestjs/swagger";

export class IdentificationResponse {
    @ApiProperty({
      description: 'ID of the country',
    })
    identificationId?: string;
  
    @ApiProperty({
      description: 'Name of the country',
    })
    identificationName?: string;
  
   
  }
  