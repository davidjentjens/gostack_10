import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

import Problem from '../models/Problem';
import Order from '../models/Order';

class ProblemController {
  async deliveriesWithProblems(req, res) {
    const problemsFromDelivery = await Problem.findAll().map(
      problem => problem.delivery_id
    );

    const deliveriesWithProblems = await Order.findAll({
      where: {
        id: problemsFromDelivery,
      },
    });

    return res.json(deliveriesWithProblems);
  }

  async problemsFromDelivery(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const problemsFromDelivery = await Problem.findAll({
      where: { delivery_id: order.id },
    });

    return res.json(problemsFromDelivery);
  }

  async reportProblem(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation errors' });
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const problem = await Problem.create({
      delivery_id: order.id,
      description: req.body.description,
    });

    return res.json(problem);
  }

  async cancelDeliveryByProblem(req, res) {
    const problem = await Problem.findByPk(req.params.id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const orderToCancel = await Order.findByPk(problem.delivery_id);
    if (!orderToCancel) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (orderToCancel.canceled_at !== null) {
      return res.status(400).json('Order already cancelled');
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
}

export default new ProblemController();
