import * as Yup from 'yup';
import Tech from '../models/Tech';

class TechController {
  async index(req, res) {
    const techs = await Tech.findAll();

    return res.json(techs);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const techExists = await Tech.findOne({ where: { name: req.body.name } });

    if (techExists) {
      return res.status(400).json({ error: 'Technology already exists' });
    }

    const tech = await Tech.create(req.body);

    return res.json(tech);
  }
}

export default new TechController();
