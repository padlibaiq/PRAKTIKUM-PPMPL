import { expect } from 'chai';
import { tambah, kali, kurang, bagi } from './math.js';

describe('Pengujian Fungsi Matematika', function() {
    it('seharusnya mengembalikan 4 saat menambahkan 2 + 2', function() {
        expect(tambah(2, 2)).to.equal(4);
    });

    it('seharusnya mengembalikan 6 saat mengalikan 2 * 3', function() {
        expect(kali(2, 3)).to.equal(6);
    });

    it('seharusnya mengembalikan 0 saat mengurangkan 2 - 2', function() {
        expect(kurang(2, 2)).to.equal(0);
    });

    it('seharusnya mengembalikan -1 saat mengurangkan 2 - 3 (menghasilkan angka negatif)', function() {
        expect(kurang(2, 3)).to.equal(-1);
    });

    it('seharusnya mengembalikan -5 saat mengurangkan -2 - 3', function() {
        expect(kurang(-2, 3)).to.equal(-5);
    });

    it('seharusnya mengembalikan 2 saat membagi 6 / 3', function() {
        expect(bagi(6, 3)).to.equal(2);
    });

    it('seharusnya mengembalikan error saat membagi dengan 0', function() {
        expect(() => bagi(6, 0)).to.throw('Tidak bisa membagi dengan nol');
    });

    // Negative case: dividing negative numbers
    it('seharusnya mengembalikan -2 saat membagi -6 / 3', function() {
        expect(bagi(-6, 3)).to.equal(-2);
    });

    it('seharusnya mengembalikan error saat input bukan angka untuk pengurangan', function() {
        expect(() => kurang(-5, 'a')).to.throw('Input harus berupa angka');
    });

});
