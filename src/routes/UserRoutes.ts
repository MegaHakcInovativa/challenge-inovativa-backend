import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import UploadConfig from '../config/upload';
import User from '../models/User';
import CreateUserService from '../services/users/CreateUserService';
import UpdateUserService from '../services/users/UpdateUserService';
import DeleteUserServices from '../services/users/DeleteUserServices';
import UploadAvatarServices from '../services/users/UploadAvatarServices';

const userRouter = Router();
const upload = multer(UploadConfig);

userRouter.get('/', async (request, response) => {
  const users = getRepository(User);

  const listAll = await users.find();

  const usersAll = listAll.map(user => {
    const userWithOutPwd = {
      id: user.id,
      name: user.name,
      email: user.email,
      terms: user.terms,
      telephone: user.telephone,
      location: user.location,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return userWithOutPwd;
  });

  return response.json(usersAll);
});

userRouter.post('/', async (request, response) => {
  const { name, email, password, terms } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password, terms });

  const userToReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.status(201).json(userToReturn);
});

userRouter.put('/', upload.single('avatar'), async (request, response) => {
  const { id, name, email, telephone, location } = request.body;

  if (request.file.filename) {
    const UpdatedAvatar = new UploadAvatarServices();

    await UpdatedAvatar.execute({
      table: 'users',
      user_id: id,
      avatarFileName: request.file.filename,
    });
  }

  const updateUserService = new UpdateUserService();

  const user = await updateUserService.execute({
    id,
    name,
    email,
    telephone,
    location,
  });

  const userToReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
    terms: user.terms,
    telephone: user.telephone,
    location: user.location,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.status(201).json(userToReturn);
});

userRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  if (id === '' || id === null) {
    return response
      .status(400)
      .json({ error: 'this id cannot be delete without ID valide' });
  }

  const deleteUserServices = new DeleteUserServices();

  await deleteUserServices.execute({ id });

  return response.status(200).send();
});
export default userRouter;
