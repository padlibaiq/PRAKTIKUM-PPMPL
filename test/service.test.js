import sinon from 'sinon';
import { expect } from 'chai';
import Service from '../src/service.js';
import Repository from '../src/repository.js';
import SecondaryRepository from '../src/secondaryRepository.js';

describe('Pengujian Integrasi Service dengan Banyak Stub', () => {
  let service;
  let primaryRepositoryStub;
  let secondaryRepositoryStub;

  beforeEach(() => {
    primaryRepositoryStub = sinon.createStubInstance(Repository);
    secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
    service = new Service();
    service.primaryRepository = primaryRepositoryStub;
    service.secondaryRepository = secondaryRepositoryStub;
  });

  it('harus mengembalikan item dari primary repository jika ditemukan', () => {
    const item = { id: 1, name: 'Item 1' };
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);

    const result = service.getItemById(1);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
  });

  it('harus mengembalikan item dari secondary repository jika tidak ditemukan di primary', () => {
    primaryRepositoryStub.getItemById.withArgs(3).returns(null);
    const item = { id: 3, name: 'Item 3' };
    secondaryRepositoryStub.getItemById.withArgs(3).returns(item);

    const result = service.getItemById(3);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
  });

  it('harus melemparkan error jika item tidak ditemukan di kedua repository', () => {
    primaryRepositoryStub.getItemById.returns(null);
    secondaryRepositoryStub.getItemById.returns(null);

    expect(() => service.getItemById(5)).to.throw('Item tidak ditemukan di kedua repository');
    expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
  });
});
