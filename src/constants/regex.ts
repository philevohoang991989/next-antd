const regex = {
  email: /^[a-z0-9.\-_a-z0-9]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
  phoneNumber:
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/,
};

export default regex;
