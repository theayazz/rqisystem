web: node src/app.js



    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN);
  res.header('Authorization', accessToken).json({ accessToken });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: '7d',
  });
  await User.update({ refreshToken: refreshToken }, { where: { id: user.id } });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 9 * 24 * 60 * 60 * 1000,
  });