import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
  async index(req, res) {
    const client = await Client.findAll();

    return res.json(client);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const clientExists = await Client.findOne({
      where: { name: req.body.name },
    });

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists' });
    }

    const client = await Client.create(req.body);

    return res.json(client);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const client = await Client.findByPk(req.params.client_id);

    if (!client) {
      return res.status(400).json({ error: 'Client not found' });
    }

    const { id, name } = await client.update(req.body);

    return res.json({ id, name });
  }
}

export default new ClientController();
