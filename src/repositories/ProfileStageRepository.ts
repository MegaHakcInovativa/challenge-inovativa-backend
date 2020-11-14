import { EntityRepository, Repository, getRepository, Entity } from 'typeorm';

import profileStages from '../models/ProfileStages';

interface Request {
  id: string;
}

@EntityRepository(profileStages)
class ProfileStagesRepository extends Repository<profileStages> {
  public async createRelationship({ id }: Request): Promise<Request> {
    const createProfileRelations = getRepository(profileStages);

    const profile = createProfileRelations.create({ provider_id: id });

    await createProfileRelations.save(profile);

    return { id: profile.id };
  }
}

export default ProfileStagesRepository;
