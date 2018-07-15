let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        message = generateMessage('adrian@gmail.com', 'test');
        expect(message.from).toBe('adrian@gmail.com');
        expect(message.text).toBe('test');
        expect(typeof message.createdAt).toBe('number');
    })
});
describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let user = "admin";
        let latitude = "9.9036533";
        let longitude = "-84.09619029999999"

        message = generateLocationMessage(user, latitude, longitude );
        expect(message.from).toBe('admin');
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude}, ${longitude}`);
        expect(typeof message.createdAt).toBe('number');
    })
})