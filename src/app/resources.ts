export enum Resources {
  Home = '/',

  Problems = 'problems',
  ProblemById = `${Problems}/:id`,
}

export function getResourceById(resource: Resources, id: number | string) {
  return resource.replace(':id', id.toString());
}
