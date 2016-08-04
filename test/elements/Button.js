import { expect } from 'chai';

import Button from '../../lib/elements/Button';

describe('Button', () => {
  describe('new', () => {
    describe('with type of web_url', () => {
      it('returns proper object', () => {
        const button = new Button({
          type: 'web_url',
          url: 'http://www.example.com',
          title: 'Example Title'
        });

        expect(button).to.deep.equal({
          type: 'web_url',
          url: 'http://www.example.com',
          title: 'Example Title'
        });
      });
    });

    describe('with type of postback', () => {
      it('returns proper object', () => {
        const button = new Button({
          type: 'postback',
          title: 'Example Title',
          payload: 'EXAMPLE'
        });

        expect(button).to.deep.equal({
          type: 'postback',
          title: 'Example Title',
          payload: 'EXAMPLE'
        });
      });
    });
  });

  describe('errors', () => {
    describe('title length', () => {
      it('throws error', () => {
        expect(() => {
          const button = new Button({
            type: 'web_url',
            title: 'This title is too long and will throw an error',
            url: 'https://example.com'
          });
        }).to.throw('Title cannot be longer 20 characters.');
      });
    });

    describe('button type', () => {
      it('throws error', () => {
        expect(() => {
          const button = new Button({
            type: 'wrong',
            title: 'This title is too long and will throw an error',
            url: 'https://example.com'
          });
        }).to.throw('Invalid button type provided.');
      });
    });


  });
});
