import Mail from '../../lib/Mail';

class DeliveryNotifyMail {
  get key() {
    return 'DeliveryNotifyMail';
  }

  async handle({ data }) {
    const { order, courier, recipient } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: `Pedido cadastrado - ${order.product}`,
      template: 'deliverynotify',
      context: {
        courier: courier.name,
        order: order.id,
        product: order.product,
        recipientName: recipient.name,
        recipientEmail: recipient.email,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        zipCode: recipient.zip_code,
      },
    });
  }
}

export default new DeliveryNotifyMail();
