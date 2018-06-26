let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('shoul generate correct message object', () => {
        message = generateMessage('adrian@gmail.com', 'test');
        expect(message.from).toBe('adrian@gmail.com');
        expect(message.text).toBe('test');
        expect(typeof message.createdAt).toBe('number');
    })
})