import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class NewPostArgs {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  @IsOptional()
  published?: boolean;
}
