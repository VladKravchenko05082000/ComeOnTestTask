export type LocationState = {
  from?: { pathname: string };
};

export type LoginState = {
  success: boolean;
  formError?: string;
  fieldErrors?: {
    username?: string;
    password?: string;
  };
  values: {
    username: string;
    password: string;
  };
};
