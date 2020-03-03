import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const category = await Category.findAll();

    return res.json(category);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const categoryExists = await Category.findOne({
      where: { name: req.body.name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.create(req.body);

    return res.json(category);
  }
}

export default new CategoryController();
