export const storeThemeInCookies = (req, res, next) => {
  const { theme } = req.body;
  if (!theme) {
    next(new GeneralServerError(400, 'Theme not provided'))
  }

  res.cookie("theme", theme, {
    httpOnly: false,   
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict"
  });

  res.json({ message: `Theme "${theme}" is stored in cookies` });
};

export const storeTokenInCookies = (res, token) => {
    res.cookie('token', token, {
    httpOnly: true,   //no access at frontend
    secure: true,     //  HTTPS only
    sameSite: 'strict', //  CSRF
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  });    
}


