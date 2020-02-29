import * as Yup from 'yup';

import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const couriers = await Courier.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      order: [['createdAt', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation errors' });
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already registered' });
    }

    const { name, email } = await Courier.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation errors' });
    }

    const courier = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }

    const { originalname: originalFileName, filename: path } = req.file;
    const file = await File.create({
      name: originalFileName,
      path,
    });

    req.body.avatar_id = file.id;

    const { id, name, email } = await courier.update(req.body);

    return res.json({ id, name, email, avatar: file });
  }

  async delete(req, res) {
    const courierToDelete = await Courier.findByPk(req.params.id);

    if (!courierToDelete) {
      return res.status(404).json({ error: 'Courier not found' });
    }

    await Courier.destroy({
      where: { id: req.params.id },
    });

    return res.json(courierToDelete);
  }
}

export default new CourierController();
