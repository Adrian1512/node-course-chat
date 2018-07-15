const expect = require('expect');
let {isRealString} = require('./validation');

describe('string validation', () => {
    it('should reject non-string values', () =>  {
        let name = 312;
        let room = true;
        let resultName  = isRealString(name);
        let resultRoom = isRealString(room);
        expect(resultName).toBeFalsy();
        expect(resultRoom).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        let name = "      ";
        let result = isRealString(name);
        expect(result).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        let name = 'Arthur';
        let result = isRealString(name);
        expect(name).toBeTruthy();
    })
})
