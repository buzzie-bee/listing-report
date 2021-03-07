import { DefaultMessage } from './default.interface';

let defaultMessage: DefaultMessage = {
  message: 'App is initialised',
};

let messages: DefaultMessage[] = [defaultMessage];

export const findOne = async (): Promise<DefaultMessage> => messages[0];
