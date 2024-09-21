export enum Resources {
  Home = '/',

  Problems = 'problems',
  ProblemById = `problems/problem/:id`,

  Contests = 'contests',
}

export function getResourceById(resource: Resources, id: number | string) {
  return resource.replace(':id', id.toString());
}
