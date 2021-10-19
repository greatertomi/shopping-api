import jwt from 'jsonwebtoken';

const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET as string;
    req.user = jwt.verify(token, secret);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: 'Authentication Failed!' });
  }
};

export default auth;
