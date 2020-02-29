import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';

import Queue from '../../lib/Queue';
import DeliveryNotifyMail from '../jobs/DeliveryNotifyMail';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation errors' });
    }

    const { recipient_id, courier_id, product } = req.body;

    // Check if recipient exists
    const recipient = await Recipient.findOne({
      where: { id: recipient_id },
    });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Check if courier exists
    const courier = await Courier.findOne({
      where: { id: courier_id },
    });
    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }

    const order = await Order.create({
      recipient_id,
      courier_id,
      product,
    });

    await Queue.add(DeliveryNotifyMail.key, {
      order,
      courier,
      recipient,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation errors' });
    }

    const order = await Order.findOne({
      where: { id: req.params.id },
    });

    // Check if order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update(req.body);

    return res.json(order);
  }

  async cancel(req, res) {
    const orderToCancel = await Order.findByPk(req.params.id);

    if (!orderToCancel) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const currentDate = parseISO(
      formatToTimeZone(new Date(), 'YYYY-MM-DDTHH:mm:ss.sssZ', {
        timeZone: 'America/Sao_Paulo',
      })
    );

    orderToCancel.canceled_at = currentDate;

    await orderToCancel.save();

    return res.json(orderToCancel);
  }

  async delete(req, res) {
    const orderToDelete = await Order.findByPk(req.params.id);

    if (!orderToDelete) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await Order.destroy({
      where: { id: req.params.id },
    });

    return res.json(orderToDelete);
  }
}

export default new OrderController();
