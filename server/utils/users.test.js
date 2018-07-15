const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Sue',
      room: 'React Course'
    },
    {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove user', () => {
    let userList = users.removeUser('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    let userList = users.removeUser('4');
    expect(users.users.length).toBe(3);
  })
  it('should return a list of users in Node Course', () => {
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return a user', () => {
    let user = users.getUser('1');
    expect(user).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    })
  })
  it('should not return a user', () => {
    let user = users.getUser('4');
    expect(user).toBe(undefined);
  })


  
  it('should return a list of users in React Course', () => {
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['Sue']);
  });

});
