import * as Yup from 'yup';
import Job from '../models/Job';

class JobController {
  async index(req, res) {
    const jobs = await Job.findAll({
      where: { active: true },
      attributes: ['id', 'title', 'description', 'active', 'user_id'],
      include: [
        {
          association: 'client',
          attributes: ['id', 'name'],
        },
        {
          association: 'images',
          // Next line allow vizualization job without images
          // required: false,
          where: { active: true },
          attributes: ['id', 'path', 'active'],
        },
        {
          association: 'techs',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'categories',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json(jobs);
  }

  async show(req, res) {
    const { job_id } = req.params;

    const job = await Job.findByPk(job_id, {
      where: { active: true },
      attributes: ['id', 'title', 'description', 'active', 'user_id'],
      include: [
        {
          association: 'client',
          attributes: ['id', 'name'],
        },
        {
          association: 'images',
          where: { active: true },
          attributes: ['id', 'path', 'active'],
        },
        {
          association: 'techs',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'categories',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!job) {
      return res.status(400).json({ error: 'Job not found' });
    }

    return res.json(job);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      client_id: Yup.number().required(),
      categories: Yup.array().of(Yup.number().required()),
      techs: Yup.array().of(Yup.number().required()),
      active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const {
      title,
      description,
      client_id,
      categories,
      techs,
      active,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      client_id,
      user_id,
      active,
    });

    await job.addCategory(categories);

    await job.addTech(techs);

    return res.json(job);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      client_id: Yup.number(),
      categories: Yup.array().of(Yup.number()),
      techs: Yup.array().of(Yup.number()),
      active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { job_id } = req.params;

    const job = await Job.findByPk(job_id);

    if (!job) {
      return res.status(400).json({ error: 'Job not found' });
    }

    const {
      title,
      description,
      client_id,
      categories,
      techs,
      active,
    } = req.body;

    const new_job = await job.update({
      title,
      description,
      client_id,
      active,
    });

    await job.addCategory(categories);

    await job.addTech(techs);

    return res.json(new_job);
  }
}

export default new JobController();
