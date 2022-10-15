import * as Joi from 'joi';
import { UpdateGeolocationDto } from '@smart-home/shared/data-access';

export const updateGeolocationValidator = Joi.object<UpdateGeolocationDto>({
  zipCode: Joi.string()
    .regex(new RegExp('[0-9]{2}-[0-9]{3}'))
    .error(new Error('Provide a valid zip code')),
});
