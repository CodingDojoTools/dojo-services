import { IndifferentSortPipe } from './indifferent-sort.pipe';

import { User } from '../../auth/models';

const users: User[] = [
  {
    _id: 'asldkjfhalskdjfhalksjdf',
    firstName: 'Bob',
    lastName: 'Marley',
    email: 'b@marley.com',
    lastIpAddress: '192.168.1.100',
    lastSignIn: new Date(),
    active: false,
    location: 'Somewhere',
    photoUrl: 'https://photos.to/bob.png',
  },
  {
    _id: 'vkajneroufamnvoiearofhikjnv',
    firstName: 'Alice',
    lastName: 'Wonderland',
    email: 'a@wonderland.com',
    lastIpAddress: '192.168.2.12',
    lastSignIn: new Date(),
    active: true,
    location: 'Wonderland',
    photoUrl: 'https://photos.to/alice.png',
  },
  {
    _id: 'weoivnaowivaoinvawoilskfnvwpreiaf',
    firstName: 'Edward',
    lastName: 'Scissorhands',
    email: 'ed@scizzors.io',
    lastIpAddress: '192.168.3.98',
    lastSignIn: new Date(),
    active: true,
    location: 'Burbank',
    photoUrl: 'https://photos.to/scissor.png',
  },
];

describe('IndifferentSortPipe', () => {
  let pipe: IndifferentSortPipe<User>;

  beforeEach(() => (pipe = new IndifferentSortPipe()));

  it('create an instance', () => {
    // const pipe = new IndifferentSortPipe();
    expect(pipe).toBeTruthy();
  });

  it('sorts an array of objects by a given field', () => {});
});
