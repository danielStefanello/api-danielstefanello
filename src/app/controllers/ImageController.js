import * as Yup from 'yup';
import Job from '../models/Job';
import Image from '../models/Image';

class ImageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { originalname: name, filename: path } = req.file;

    const { job_id } = req.params;

    const job = await Job.findByPk(job_id);

    if (!job) {
      return res.status(400).json({ error: 'Job not found' });
    }

    const { active } = req.body;

    const image = await Image.create({
      name,
      path,
      job_id,
      active,
    });

    return res.json(image);
  }

  async update(req, res) {
    const { image_id } = req.params;

    const image = await Image.findByPk(image_id);

    const up_image = await image.update(req.body);

    return res.json(up_image);
  }
}

export default new ImageController();
