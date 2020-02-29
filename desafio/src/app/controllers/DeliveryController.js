import { Op } from 'sequelize';
import { startOfDay, addHours, isBefore, isAfter, parseISO } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Order.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        courier_id: req.params.id,
        canceled_at: null,
        start_date: null,
        end_date: null,
      },
    });

    return res.json(deliveries);
  }

  async withdrawn(req, res) {
    const withdrawn = await Order.findAll({
      where: {
        courier_id: req.params.id,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
        end_date: null,
      },
    });

    return res.json(withdrawn);
  }

  async delivered(req, res) {
    const delivered = await Order.findAll({
      where: {
        courier_id: req.params.id,
        canceled_at: null,
        end_date: {
          [Op.ne]: null,
        },
      },
    });

    return res.json(delivered);
  }

  async withdraw(req, res) {
    const courier = await Courier.findByPk(req.params.courier_id);

    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }

    const order = await Order.findByPk(req.params.order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.courier_id !== courier.id) {
      return res
        .status(401)
        .json({ error: 'Courier not assigned to this order' });
    }

    if (order.start_date !== null) {
      return res.status(400).json({ error: 'Order already withdrawn' });
    }

    const courierDeliveries = await Order.findAll({
      where: {
        courier_id: courier.id,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
        end_date: null,
      },
    });

    if (courierDeliveries.length > 5) {
      return res.status(400).json({
        error: 'Courier cannot make more than 5 deliveries at a time',
      });
    }

    const currentDate = parseISO(
      formatToTimeZone(new Date(), 'YYYY-MM-DDTHH:mm:ss.sssZ', {
        timeZone: 'America/Sao_Paulo',
      })
    );

    const isBeforeEightAM = isBefore(
      currentDate,
      addHours(startOfDay(currentDate), 8)
    );
    const isAfterSixPM = isAfter(
      currentDate,
      addHours(startOfDay(currentDate), 18)
    );

    if (isBeforeEightAM || isAfterSixPM) {
      return res.status(400).json({
        error: 'Courier can only make withdrawals between 08:00 and 18:00',
      });
    }

    order.start_date = currentDate;
    await order.save();

    return res.json(`Item ${order.product} succesfully withdrawn`);
  }

  async deliver(req, res) {
    const courier = await Courier.findByPk(req.params.courier_id);

    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }

    const order = await Order.findByPk(req.params.order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.courier_id !== courier.id) {
      return res
        .status(401)
        .json({ error: 'Courier not assigned to this order' });
    }

    if (order.start_date === null) {
      return res.status(400).json({
        error: 'Order must be withdrawn before it can be delivered',
      });
    }

    if (order.end_date !== null) {
      return res.status(400).json({
        error: 'Order already delivered',
      });
    }

    // Format date to correct timezone
    const currentDate = parseISO(
      formatToTimeZone(new Date(), 'YYYY-MM-DDTHH:mm:ss.sssZ', {
        timeZone: 'America/Sao_Paulo',
      })
    );

    // Signature upload
    if (req.file === undefined) {
      return res.status(400).json({
        error: 'Missing signature',
      });
    }
    const { originalname: originalFileName, filename: path } = req.file;
    const file = await File.create({
      name: originalFileName,
      path,
    });

    order.signature_id = file.id;
    order.end_date = currentDate;

    await order.save();

    return res.json(`Item ${order.product} succesfully delivered`);
  }
}

export default new DeliveryController();
