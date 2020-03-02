import * as Yup from 'yup';
import Job from '../models/Job';

class JobController {
  async index(req, res) {
    const jobs = await Job.findAll({
      where: { active: true },
      include: { association: 'images', where: { active: true } },
    });

    return res.json(jobs);
  }

  async show(req, res) {
    const { job_id } = req.params;

    const job = await Job.findByPk(job_id, {
      include: { association: 'images' },
    });

    if (!job) {
      return res.status(400).json({ error: 'Job not found' });
    }

    return res.json(job);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      thumbnail: Yup.string().required(),
      description: Yup.string().required(),
      category: Yup.string().required(),
      techs: Yup.string().required(),
      client: Yup.string().required(),
      active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const { title, thumbnail, description, category, techs, client } = req.body;

    const job = await Job.create({
      title,
      thumbnail,
      description,
      category,
      techs,
      client,
      user_id,
    });

    return res.json(job);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      thumbnail: Yup.string(),
      description: Yup.string(),
      category: Yup.string(),
      techs: Yup.string(),
      client: Yup.string(),
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

    const new_job = await job.update(req.body);

    return res.json(new_job);
  }
}

export default new JobController();
